# M12 Core API MVP Contract v1

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work.

## 1. Purpose

M12 defines the first backend API contract for the platform launch MVP.

The API exists to support:

- Official website.
- Owner dashboard.
- MAC address plus access key customer portal access.
- Single-page customer portal.
- Device registration / status.
- License / free launch access check.
- App version check.
- Remote config.
- Download metadata.
- Optional encrypted playlist/profile storage.
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
- No profile payload inspection when encrypted storage is used.

Allowed backend role:

- Owner control.
- Customer access identity.
- Device state.
- License/access state.
- Version policy.
- Safe remote configuration.
- Download metadata.
- Customer-owned profile bridge/storage under boundary rules.

## 3. Corrected Launch MVP Access Model

Launch MVP does not require normal customer email/name registration.

Customer portal access uses:

- MAC address / normalized device identifier.
- Access key / customer key.

Rules:

- MAC address must be normalized before lookup.
- Access key must never be stored in plaintext.
- API verifies the access key against `accessKeyHash`.
- Customer portal sessions must expire.
- Failed attempts must be rate-limited.
- No email/name/phone/address is required for customer portal access.

Owner access remains separate and uses a secure owner login model.

## 4. Endpoint Summary

Initial endpoint set:

Public/system endpoints:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`
- `GET /download-metadata`

Customer portal endpoints:

- `POST /customer-access/login`
- `POST /customer-access/logout`
- `GET /customer-portal/summary`
- `GET /customer-portal/profile`
- `PUT /customer-portal/profile`
- `POST /customer-portal/profile/sync-request`, optional

Device/license endpoints:

- `POST /devices/register`
- `POST /license/check`

Owner endpoints:

- `POST /owner/login`
- `POST /owner/logout`
- `GET /owner/customer-access-records`
- `POST /owner/customer-access-records`
- `POST /owner/customer-access-records/:id/reset-key`
- `PATCH /owner/customer-access-records/:id/status`
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

- Website.
- Owner dashboard.
- Android client diagnostics.
- Internal smoke tests.

Request:

- No body.

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
- Website download/status UI.

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

- Provides safe runtime configuration for clients and website.

Used by:

- Android TV / Fire TV client.
- Website/customer portal.
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
- Profile manager availability.
- Legal/Terms/Privacy version IDs.

Forbidden config:

- Media source URLs.
- Channel package data.
- Provider credentials.
- Scraped metadata.

## 8. GET /download-metadata

Purpose:

- Provides official APK download metadata for the website.

Used by:

- Website download page.
- Owner dashboard preview.

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

## 9. POST /customer-access/login

Purpose:

- Allows customer to open the single-page portal using MAC address plus access key.

Used by:

- Website customer portal.

Request body:

- `macAddress`
- `accessKey`

Response:

- `status`
- `customerAccessId`
- `sessionExpiresAt`
- `deviceStatus`
- `licenseState`
- `freeLaunch`
- optional `message`

Database:

- Reads CustomerAccess by normalized MAC.
- Verifies access key against accessKeyHash.
- May update lastPortalLoginAt.
- May write AuditLog.

Rules:

- No customer email/name required.
- Invalid MAC/key returns generic `invalid_access`.
- Raw access key must not be logged.
- Access key must not be returned.
- Must be rate-limited.
- Must not ask for provider credentials.

## 10. POST /customer-access/logout

Purpose:

- Ends customer portal session.

Used by:

- Website customer portal.

Request:

- Authenticated customer portal session.

Response:

- `status`

Database:

- May write AuditLog.

Rules:

- Must not expose token/session internals.

## 11. GET /customer-portal/summary

Purpose:

- Loads the single-page customer portal summary.

Used by:

- Website customer portal after MAC/key login.

Request:

- Authenticated customer portal session.

Response:

- `customerAccessId`
- `accessStatus`
- `normalizedMacMasked`
- `device`
- `license`
- `paymentStatus`
- `profileStatus`
- `download`
- `support`
- `termsVersion`
- `privacyVersion`

Database:

- Reads CustomerAccess.
- Reads Device.
- Reads LicenseGrant.
- Reads PaymentStatus placeholder if present.
- Reads AppVersion/Download metadata.
- Reads profile metadata only if profile storage is enabled.

Rules:

- Must return only the current customer access record.
- Must not return other customers/devices.
- Must not return provider credentials.
- Must not expose plaintext playlist data unless explicitly allowed by a later storage decision.

## 12. GET /customer-portal/profile

Purpose:

- Loads customer-owned profile/playlist data for editing, if the feature is enabled.

Used by:

- Website customer portal.

Request:

- Authenticated customer portal session.

Response:

- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred mode
- `lastUpdatedAt`
- `status`

Database:

- Reads CustomerProfileStore for the current CustomerAccess.

Rules:

- Preferred mode is encrypted profile payload.
- Backend must not parse encrypted payload.
- Backend must not convert profile data into shared catalog data.
- Backend must not sell, validate, scrape, or redistribute sources.

## 13. PUT /customer-portal/profile

Purpose:

- Saves customer-owned profile/playlist data from the single-page portal.

Used by:

- Website customer portal.

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

## 14. POST /customer-portal/profile/sync-request, Optional

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

- Reads CustomerAccess and Device.
- May update profile sync metadata.
- May write AuditLog.

Rules:

- Must not push plaintext streams through backend logs.
- Actual client implementation belongs to `TV_Project`.

## 15. POST /devices/register

Purpose:

- Creates or updates a platform device record based on MAC/device identity.

Used by:

- Android TV / Fire TV client.
- Owner dashboard if manually registering.

Request body:

- `platform`
- `macAddress`
- optional `deviceKey`
- optional `deviceName`
- `appVersion`

Response:

- `deviceId`
- `status`
- `platform`
- `licenseState`
- `freeLaunch`
- optional `message`

Database:

- Reads or creates Device.
- May read CustomerAccess by normalized MAC.
- May create or update LicenseGrant if eligible.
- May write AuditLog.

Rules:

- MAC must be normalized.
- Device registration must not require customer email/name.
- Device registration must not return media source data.
- Device registration must not require payment during free launch.

## 16. POST /license/check

Purpose:

- Tells the client whether the device may operate.

Used by:

- Android TV / Fire TV client.
- Future clients.

Request body:

- `macAddress`
- optional `deviceId`
- optional `deviceKey`
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

- Reads Device by normalized MAC/deviceId.
- Reads CustomerAccess if linked.
- Reads LicenseGrant.
- May update Device.lastSeenAt.
- May update LicenseGrant.lastCheckedAt.
- May write AuditLog.

Free launch behavior:

- Valid devices may receive `free_launch_active`.
- Payment enforcement remains disabled.
- Payment missing must not block initial Android TV / Fire TV release usage.

Rules:

- Must not validate stream sources.
- Must not inspect profile data.
- Must not check provider credentials.

## 17. POST /owner/login

Purpose:

- Allows the single site owner/operator to access the owner dashboard.

Used by:

- Owner dashboard.

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

## 18. Owner Customer Access Management Endpoints

Purpose:

- Allows owner to create/manage MAC/access key customer records.

Endpoints:

- `GET /owner/customer-access-records`
- `POST /owner/customer-access-records`
- `POST /owner/customer-access-records/:id/reset-key`
- `PATCH /owner/customer-access-records/:id/status`

Rules:

- Owner can create a customer access record for a normalized MAC.
- Owner can generate/reset access key.
- Raw access key is shown only at generation/reset time.
- Only accessKeyHash is stored.
- Owner can disable/block/restore customer access.
- Owner must not see plaintext profile payloads as normal admin data.

## 19. Owner Device / License / Config Endpoints

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

MVP planning assumption:

- Public lightweight endpoints: health, app-version, remote-config, download-metadata.
- Customer portal requires MAC address plus access key login.
- Owner dashboard requires owner login.
- Device registration/license check may use MAC/device identity.
- Profile save/load requires valid customer portal session.

Full production auth implementation is deferred until backend implementation is re-approved.

## 21. Rate Limit Direction

Rate limits should apply to:

- Customer MAC/access key login.
- Owner login.
- Device registration.
- License check.
- Profile save/load.
- Owner access key generation/reset.

Rate limit store may use Redis later, but live infrastructure is currently paused.

## 22. M12 Acceptance Criteria

M12 is acceptable when:

- The API supports MAC address plus access key customer portal access.
- No customer email/name registration is required.
- Owner dashboard access is separate and protected.
- Free launch behavior is preserved.
- App version/update metadata is available.
- Download metadata is available.
- Optional profile/playlist storage remains private and boundary-controlled.
- No endpoint introduces media-provider behavior.
- Implementation can be resumed later without contract ambiguity.

## 23. Next Step

After M12:

- Align platform-client shared contract with MAC/access key model.
- Prepare single-page customer portal data model.
- Prepare owner dashboard MVP page map.
- Keep hosting/deploy work paused unless explicitly re-approved.
