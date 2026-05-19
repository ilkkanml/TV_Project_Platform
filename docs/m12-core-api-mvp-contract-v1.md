# M12 Core API MVP Contract v1

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work.

## 1. Purpose

M12 defines the first backend API contract for EA0 and the later platform launch MVP.

The API exists to support:

- Download-only early access.
- Backend-generated Device ID.
- Backend-generated Activation Key.
- Device bootstrap.
- License / free launch access check.
- App version check.
- Remote config.
- Future official website.
- Future owner dashboard.
- Future single-page customer portal.
- Future optional encrypted playlist/profile storage.
- Basic health verification.

The API must not become a media provider API.

## 2. Global API Boundary

All endpoints must respect these rules:

- No media source hosting.
- No media source selling.
- No source scraping.
- No provider credential collection.
- No backend stream relay.
- No backend stream transformation.
- No channel package management.
- No public/shared playlist catalog.
- No profile payload inspection when encrypted storage is used later.

Allowed backend role:

- Device/customer access identity.
- Device state.
- License/access state.
- Version policy.
- Safe remote configuration.
- Download metadata later.
- Owner control later.
- Customer-owned profile bridge/storage under boundary rules later.

## 3. Corrected EA0 Access Model

EA0 does not require normal customer email/name registration.

EA0 app/device access uses:

- `deviceId`
- `activationKey`
- optional `platformDeviceHash` for best-effort reinstall recovery

Rules:

- Backend generates Device ID.
- Backend generates Activation Key.
- Backend stores only `activationKeyHash`.
- Raw Activation Key is returned only once during first bootstrap or recovery rotation.
- App stores Device ID + Activation Key locally.
- License check uses Device ID + Activation Key.
- No email/name/phone/address is required.
- MAC address is not the primary product/contract identifier.

Owner access remains separate and uses a secure owner login model when owner dashboard is enabled.

## 4. Endpoint Summary

EA0 active endpoints:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`
- `POST /devices/bootstrap`
- `POST /license/check`

Later public/system endpoints:

- `GET /download-metadata`

Later customer portal endpoints:

- `POST /customer-access/login`
- `POST /customer-access/logout`
- `GET /customer-portal/summary`
- `GET /customer-portal/profile`
- `PUT /customer-portal/profile`
- `POST /customer-portal/profile/sync-request`, optional

Later owner endpoints:

- `POST /owner/login`
- `POST /owner/logout`
- `GET /owner/device-access-records`
- `POST /owner/device-access-records`
- `POST /owner/device-access-records/:id/reset-activation-key`
- `PATCH /owner/device-access-records/:id/status`
- `GET /owner/devices`
- `PATCH /owner/devices/:id/status`
- `GET /owner/licenses`
- `PATCH /owner/licenses/:id`
- `GET /owner/app-versions`
- `PUT /owner/app-versions/:id`
- `GET /owner/remote-config`
- `PUT /owner/remote-config/:id`
- `GET /owner/audit-logs`

## 5. GET /health

Purpose:

- Confirms API reachability.

Used by:

- Android client diagnostics.
- Website later.
- Owner dashboard later.
- Internal smoke tests.

Response:

- `status`
- `service`
- `scope`

Database:

- No database read required.
- No database write required.

Rules:

- Must be lightweight.
- Must not expose secrets.
- Must not expose infrastructure details.

## 6. GET /app-version

Purpose:

- Tells the client whether its app version is supported.

Used by:

- Android TV / Fire TV client at startup and safe intervals.
- Website download/status UI later.

Query parameters:

- `platform`
- `version`
- optional `channel`

Response:

- `platform`
- `requestedVersion`
- `currentRecommendedVersion`
- `minimumSupportedVersion`
- `forceUpdate`
- `updateUrl`
- `releaseNotes`
- `freeLaunch`

Database:

- Reads AppVersion records.
- No write required for basic MVP.

Rules:

- Force update must be conservative.
- Missing records should return safe defaults.
- Must not return media source data.

## 7. GET /remote-config

Purpose:

- Provides safe runtime configuration for clients and website later.

Used by:

- Android TV / Fire TV client.
- Website/customer portal later.
- Future clients.

Query parameters:

- `platform`
- `version`
- optional `channel`

Response:

- `freeLaunch`
- `maintenance`
- `features`
- `polling`
- `support`
- `termsVersion`
- `privacyVersion`
- `legalBoundaryVersion`

Database:

- Reads enabled RemoteConfig records.
- No write required for client request.

Allowed config:

- Feature flags.
- Free launch status.
- Maintenance banner.
- Support link/email.
- Safe polling intervals.
- Device bootstrap availability.
- Profile manager availability later.
- Legal/Terms/Privacy version IDs.

Forbidden config:

- Media source URLs.
- Channel package data.
- Provider credentials.
- Scraped metadata.

## 8. POST /devices/bootstrap

Purpose:

- Create or recover an EA0 device/customer access record.

Used by:

- Android TV / Fire TV client on first launch or recovery.

Request body:

- `platformDeviceHash`
- `platform`
- `appVersion`
- optional `existingDeviceId`
- optional `existingActivationKey`

Response:

- `deviceId`
- `activationKey`, returned only on first create or recovery rotation
- `status`
- `licenseState`
- `freeLaunch`
- `paymentRequired`
- `message`

Database:

- If existingDeviceId + existingActivationKey are valid, reads DeviceAccessRecord and updates appVersion/lastSeenAt.
- If platformDeviceHash matches an existing active/recoverable record, recovers existing deviceId and rotates Activation Key.
- If no match exists, creates DeviceAccessRecord with new Device ID and new Activation Key.
- Stores only activationKeyHash.
- May write AuditLog.

Rules:

- Backend generates Device ID.
- Backend generates Activation Key.
- Raw Activation Key must not be logged.
- Raw Activation Key must not be stored.
- Payment required remains false during free launch.
- No email/name is required.
- No provider/source/playlist data is accepted.

## 9. POST /license/check

Purpose:

- Tells the client whether the device may operate.

Used by:

- Android TV / Fire TV client.
- Future clients.

Request body:

- `deviceId`
- `activationKey`
- `platform`
- `appVersion`

Response:

- `state`
- `allowed`
- `freeLaunch`
- `paymentRequired`
- `platform`
- `appVersion`
- `deviceId`
- `deviceStatus`
- `message`

Database:

- Reads DeviceAccessRecord by deviceId.
- Verifies activationKey against activationKeyHash.
- May update lastSeenAt.
- May update license lastCheckedAt if split LicenseGrant exists later.
- May write AuditLog, preferably rate-controlled.

Free launch behavior:

- Active valid device returns `free_launch_active`.
- Payment enforcement remains disabled.
- Payment missing must not block initial Android TV / Fire TV release usage.

Rules:

- Must not validate stream sources.
- Must not inspect profile data.
- Must not check provider credentials.

## 10. GET /download-metadata, Later

Purpose:

- Provides official APK download metadata for the website.

Used by:

- Website download page later.
- Owner dashboard preview later.

Query parameters:

- optional `platform`
- optional `channel`

Response:

- `platform`
- `currentVersion`
- `fileName`
- `downloadUrl`
- `fileSize`
- `sha256`
- `releaseNotes`
- `releaseDate`
- `downloadEnabled`
- `minimumSupportedVersion`
- `forceUpdate`

Database:

- Reads AppVersion / Download metadata records.

Rules:

- Must only describe official app files.
- Must not provide playlist/channel/source packages.

## 11. POST /customer-access/login, Later

Purpose:

- Allows customer to open the single-page portal using Device ID plus Activation Key.

Used by:

- Website customer portal later.

Request body:

- `deviceId`
- `activationKey`

Response:

- `status`
- `customerAccessId` or `deviceAccessRecordId`
- `sessionExpiresAt`
- `deviceStatus`
- `licenseState`
- `freeLaunch`
- optional `message`

Database:

- Reads CustomerAccess / DeviceAccessRecord by Device ID.
- Verifies Activation Key against activationKeyHash.
- May update lastPortalLoginAt.
- May write AuditLog.

Rules:

- No customer email/name required.
- Invalid device/key returns generic `invalid_device_credentials`.
- Raw Activation Key must not be logged.
- Activation Key must not be returned.
- Must be rate-limited.
- Must not ask for provider credentials.

## 12. POST /customer-access/logout, Later

Purpose:

- Ends customer portal session.

Used by:

- Website customer portal later.

Request:

- Authenticated customer portal session.

Response:

- `status`

Database:

- May write AuditLog.

Rules:

- Must not expose token/session internals.

## 13. GET /customer-portal/summary, Later

Purpose:

- Loads the single-page customer portal summary.

Used by:

- Website customer portal after Device ID / Activation Key login.

Request:

- Authenticated customer portal session.

Response:

- `customerAccessId` or `deviceAccessRecordId`
- `accessStatus`
- `deviceIdMasked`
- `device`
- `license`
- `paymentStatus`
- `profileStatus`
- `download`
- `support`
- `termsVersion`
- `privacyVersion`

Database:

- Reads CustomerAccess / DeviceAccessRecord.
- Reads Device, if split.
- Reads LicenseGrant, if split.
- Reads PaymentStatus placeholder if present.
- Reads AppVersion/Download metadata.
- Reads profile metadata only if profile storage is enabled.

Rules:

- Must return only the current customer access record.
- Must not return other customers/devices.
- Must not return provider credentials.
- Must not expose plaintext playlist data unless explicitly allowed by a later storage decision.

## 14. GET /customer-portal/profile, Later

Purpose:

- Loads customer-owned profile/playlist data for editing, if the feature is enabled.

Used by:

- Website customer portal later.

Request:

- Authenticated customer portal session.

Response:

- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred mode
- `lastUpdatedAt`
- `status`

Database:

- Reads CustomerProfileStore for the current CustomerAccess / DeviceAccessRecord.

Rules:

- Preferred mode is encrypted profile payload.
- Backend must not parse encrypted payload.
- Backend must not convert profile data into shared catalog data.
- Backend must not sell, validate, scrape, or redistribute sources.

## 15. PUT /customer-portal/profile, Later

Purpose:

- Saves customer-owned profile/playlist data from the single-page portal.

Used by:

- Website customer portal later.

Request:

- Authenticated customer portal session.
- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred

Response:

- `status`
- `profileSaved`
- `lastUpdatedAt`

Database:

- Creates/updates CustomerProfileStore.
- May write AuditLog.

Rules:

- Preferred mode is client-side encrypted payload.
- Backend must not inspect encrypted payload.
- Raw provider credentials must not be stored as platform account fields.
- Saved profile must remain private to that customer access record.
- No public/shared playlist directory is allowed.

## 16. POST /customer-portal/profile/sync-request, Optional Later

Purpose:

- Requests the linked device to fetch or receive the latest profile when supported by the app flow.

Used by:

- Website customer portal.
- Future client integration.

Request:

- Authenticated customer portal session.
- `deviceId`, optional if only one device exists.

Response:

- `status`
- `syncRequested`
- `message`

Database:

- Reads CustomerAccess / DeviceAccessRecord and Device.
- May update profile sync metadata.
- May write AuditLog.

Rules:

- Must not push plaintext streams through backend logs.
- Actual client implementation belongs to `TV_Project`.

## 17. POST /owner/login, Later

Purpose:

- Allows the single site owner/operator to access the owner dashboard.

Used by:

- Owner dashboard later.

Request body:

- `loginId` or `email`
- `password`

Response:

- `status`
- `role: OWNER`
- `sessionExpiresAt`

Database:

- Reads OwnerUser.
- May update lastLoginAt.
- May write AuditLog.

Rules:

- Safe generic error on failure.
- Password must not be logged.
- Must be rate-limited.

## 18. Owner Device Access Management Endpoints, Later

Purpose:

- Allows owner to manage Device ID / Activation Key customer-device records.

Endpoints:

- `GET /owner/device-access-records`
- `POST /owner/device-access-records`
- `POST /owner/device-access-records/:id/reset-activation-key`
- `PATCH /owner/device-access-records/:id/status`

Rules:

- Owner can create a device access record.
- Owner can generate/reset Activation Key.
- Raw Activation Key is shown only at generation/reset/recovery time.
- Only activationKeyHash is stored.
- Owner can disable/block/restore device access.
- Owner must not see plaintext profile payloads as normal admin data.

## 19. Owner Device / License / Config Endpoints, Later

Purpose:

- Allows owner to manage launch-critical platform records.

Endpoint groups:

- `GET /owner/devices`
- `PATCH /owner/devices/:id/status`
- `GET /owner/licenses`
- `PATCH /owner/licenses/:id`
- `GET /owner/app-versions`
- `PUT /owner/app-versions/:id`
- `GET /owner/remote-config`
- `PUT /owner/remote-config/:id`
- `GET /owner/audit-logs`

Rules:

- Owner mutations must be audited.
- Owner dashboard must not expose secrets.
- Owner dashboard must not include source/provider/channel management.

## 20. Authentication Direction

EA0 planning assumption:

- Public lightweight endpoints: health, app-version, remote-config.
- Device bootstrap uses platformDeviceHash and returns Device ID + Activation Key only when needed.
- License check requires Device ID + Activation Key.
- Customer portal later requires Device ID plus Activation Key login.
- Owner dashboard later requires owner login.
- Profile save/load later requires valid customer portal session.

Full production auth implementation is deferred until backend implementation is re-approved.

## 21. Rate Limit Direction

Rate limits should apply to:

- Device bootstrap.
- License check.
- Customer Device ID / Activation Key login later.
- Owner login later.
- Profile save/load later.
- Owner Activation Key generation/reset later.

Rate limit store may use Redis later, but live infrastructure is currently paused.

## 22. M12 Acceptance Criteria

M12 is acceptable when:

- The API supports backend-generated Device ID plus Activation Key.
- No customer email/name registration is required.
- EA0 can operate without website/customer portal.
- License check uses Device ID plus Activation Key.
- Free launch behavior is preserved.
- App version/update metadata is available.
- Download metadata can be added later.
- Optional profile/playlist storage remains private and boundary-controlled later.
- No endpoint introduces media-provider behavior.
- Implementation can be resumed later without contract ambiguity.

## 23. Next Step

After M12:

- Keep platform-client shared contract aligned with Device ID plus Activation Key.
- Prepare final launch MVP checklist.
- Keep hosting/deploy work paused unless explicitly re-approved.
