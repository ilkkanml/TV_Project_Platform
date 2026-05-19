# M27 Customer Portal Endpoint / Database Mapping

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M27 maps the later single-page customer portal flow to API endpoints and database reads/writes.

EA0 can operate before this portal exists.

The launch MVP customer portal is intentionally minimal:

- Device ID plus Activation Key login.
- Single-page portal.
- Device/access/license/payment-status summary.
- Optional playlist/profile save under strict storage boundary.
- Download/update info.

No customer email/name account is required for launch MVP.

## 2. EA0 Relationship

EA0 active flow:

1. App calls `POST /devices/bootstrap`.
2. Backend generates Device ID.
3. Backend generates Activation Key.
4. Backend stores only `activationKeyHash`.
5. App stores Device ID + Activation Key locally.
6. App calls `POST /license/check`.

Later customer portal reads the same records.

The portal must not require customers to get new credentials unless reset/recovery is needed.

## 3. Core Customer Portal Flow, Later

Customer flow:

1. Customer opens website portal.
2. Customer enters Device ID and Activation Key.
3. Platform validates Device ID plus Activation Key hash.
4. Platform creates a short-lived customer portal session.
5. Portal loads one-page summary.
6. Customer edits/saves profile if enabled.
7. Customer views license/payment/download status.
8. Customer leaves; no regular return is expected.

## 4. Database Entities Used

EA0 required:

- `DeviceAccessRecord`
- `AppVersion`
- `RemoteConfig`
- `AuditLog`, recommended

Later split entities:

- `CustomerAccess`
- `Device`
- `LicenseGrant`
- `AppVersion`
- `RemoteConfig`
- `AuditLog`

Optional / boundary-controlled later:

- `CustomerProfileStore`
- `PaymentStatus` / Subscription

Owner-only later:

- `OwnerUser`

## 5. Endpoint Mapping Summary

EA0 app/system endpoints:

- `POST /devices/bootstrap`
- `POST /license/check`
- `GET /app-version`
- `GET /remote-config`
- `GET /health`

Later customer portal endpoints:

- `POST /customer-access/login`
- `POST /customer-access/logout`
- `GET /customer-portal/summary`
- `GET /customer-portal/profile`
- `PUT /customer-portal/profile`
- `POST /customer-portal/profile/sync-request`, optional

Later public website endpoints:

- `GET /download-metadata`
- `GET /app-version`
- `GET /remote-config`

## 6. POST /devices/bootstrap

Purpose:

- Create or recover an EA0 DeviceAccessRecord.

Used by:

- Android TV / Fire TV app on first launch or recovery.

Input:

- `platformDeviceHash`
- `platform`
- `appVersion`
- `existingDeviceId`, optional
- `existingActivationKey`, optional

Database reads:

- `DeviceAccessRecord` by existingDeviceId, if provided.
- `DeviceAccessRecord` by platformDeviceHash, if recovery is needed.

Database writes:

- Create new DeviceAccessRecord if no match exists.
- Generate unique Device ID.
- Generate unique Activation Key.
- Store only `activationKeyHash`.
- Store masked `activationKeyHint` only.
- Update appVersion/lastSeenAt.
- Write AuditLog event if enabled.

Response:

- `deviceId`
- `activationKey`, only on first create or recovery rotation
- `status`
- `licenseState`
- `freeLaunch`
- `paymentRequired`
- `message`

Rules:

- Backend generates Device ID.
- Backend generates Activation Key.
- Raw Activation Key must never be stored.
- Raw Activation Key must never be logged.
- No customer email/name required.
- No provider/source/playlist data accepted.

## 7. POST /license/check

Purpose:

- Tell the app whether the device may operate.

Input:

- `deviceId`
- `activationKey`
- `platform`
- `appVersion`

Database reads:

- `DeviceAccessRecord` by deviceId.
- `RemoteConfig.freeLaunch.enabled`, if used.
- `LicenseGrant`, later if split.

Database writes:

- Update lastSeenAt.
- Update license lastCheckedAt if split LicenseGrant exists later.
- Optional AuditLog event, rate-controlled.

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

Rules:

- Verify Activation Key against activationKeyHash.
- Free launch valid device returns allowed access.
- Payment absence must not block EA0/free launch.
- License check does not inspect playlists, streams, providers, or source URLs.

## 8. POST /customer-access/login, Later

Purpose:

- Validate Device ID plus Activation Key.
- Open customer portal session.

Input:

- `deviceId`
- `activationKey`

Database reads:

- `DeviceAccessRecord` by deviceId, or `CustomerAccess` by deviceId after split.

Database writes:

- Update lastPortalLoginAt on success, if field exists.
- Write AuditLog event.

Audit events:

- `customer_access.login.success`
- `customer_access.login.failed_limited`

Rules:

- Compare Activation Key against `activationKeyHash`.
- Never store or log raw Activation Key.
- Return generic `invalid_device_credentials` on failure.
- Apply rate limit.
- No customer email/name required.

## 9. GET /customer-portal/summary, Later

Purpose:

- Load the complete single-page portal in one response.

Auth:

- Requires valid customer portal session.

Database reads:

- `DeviceAccessRecord` or `CustomerAccess`.
- `Device` by deviceId/customerAccessId if split.
- `LicenseGrant` by customerAccessId/deviceId if split.
- `PaymentStatus`, if present.
- `CustomerProfileStore` metadata only, if enabled.
- `AppVersion` / download metadata.
- `RemoteConfig` for flags/support/legal versions.

Database writes:

- None required.

Response must include:

- Access status.
- Masked Device ID.
- Device status.
- License/free launch state.
- Payment status placeholder.
- Profile metadata.
- Download/update metadata.
- Support/legal version fields.

Response must not include:

- Raw Activation Key.
- activationKeyHash.
- Owner/admin notes unless safe.
- Provider credentials.
- Plaintext stream URLs.
- Other customer records.

## 10. GET /customer-portal/profile, Later

Purpose:

- Load customer-owned profile payload for editing if enabled.

Auth:

- Requires valid customer portal session.

Database reads:

- `CustomerProfileStore` for current DeviceAccessRecord / CustomerAccess.

Database writes:

- None.

Allowed response:

- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred mode
- `lastUpdatedAt`
- `status`

Rules:

- Preferred mode is `CLIENT_ENCRYPTED`.
- Backend does not parse encrypted payload.
- Backend does not extract channel/provider/source data.

## 11. PUT /customer-portal/profile, Later

Purpose:

- Save customer-owned playlist/profile data under approved boundary.

Auth:

- Requires valid customer portal session.

Input:

- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred

Database reads:

- Current DeviceAccessRecord / CustomerAccess session context.
- Existing `CustomerProfileStore`, if any.

Database writes:

- Create/update `CustomerProfileStore`.
- Write `AuditLog` event.

Audit events:

- `profile.saved`

Rules:

- Preferred profile mode: `CLIENT_ENCRYPTED`.
- Backend must not inspect encrypted payload.
- Backend must not store provider credentials as account fields.
- Backend must not turn saved profile into shared/public catalog.

## 12. POST /customer-portal/profile/sync-request, Optional Later

Purpose:

- Mark that the linked device should fetch/sync latest profile when client flow supports it.

Auth:

- Requires valid customer portal session.

Database reads:

- `DeviceAccessRecord` / `CustomerAccess`.
- `Device`, if split.
- `CustomerProfileStore` metadata, if enabled.

Database writes:

- Optional sync metadata.
- `AuditLog` event.

Rules:

- Actual device behavior belongs to `TV_Project`.
- Platform only records/request-coordinates the sync.
- No plaintext stream/provider values may be pushed through logs.

## 13. GET /download-metadata, Later

Purpose:

- Provide website/app download details.

Database reads:

- `AppVersion` / download metadata.

Database writes:

- None required.

Rules:

- Official APK metadata only.
- No playlist/channel/source package downloads.

## 14. GET /app-version

Purpose:

- Provide app update policy.

Database reads:

- `AppVersion`.

Database writes:

- None required.

Rules:

- Force update must be conservative.
- No media/source/provider data returned.

## 15. GET /remote-config

Purpose:

- Provide safe runtime configuration.

Database reads:

- `RemoteConfig`.

Database writes:

- None required.

Allowed keys:

- Free launch flag.
- Maintenance flag.
- Feature flags.
- Device bootstrap flag.
- Support email.
- Legal/Terms/Privacy versions.
- Safe polling intervals.

Forbidden keys:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 16. Owner-Only Data Flow, Later

Owner creates or manages device access:

1. Owner creates or views DeviceAccessRecord.
2. System generates or resets Activation Key when needed.
3. System stores `activationKeyHash` only.
4. Raw Activation Key is shown only once at generation/reset/recovery time.
5. Audit event is written.

Owner may manage:

- Device/customer access status.
- Activation Key reset.
- Device status.
- License/access state.
- App version/download metadata.
- Remote config.

Owner must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- Plaintext user playlist contents as admin feature.

## 17. Minimal Database Relationship

EA0 relationship:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog
```

Future relationship:

```txt
OwnerUser

CustomerAccess
  -> Device[]
  -> LicenseGrant[]
  -> CustomerProfileStore?
  -> PaymentStatus?

Device
  -> CustomerAccess
  -> LicenseGrant?

LicenseGrant
  -> CustomerAccess
  -> Device?

AppVersion
RemoteConfig
AuditLog
```

## 18. Implementation Guardrails

Do not implement:

- Required customer email/name registration.
- Customer multi-page SaaS account center.
- MAC as primary contract identifier.
- Provider credential storage.
- Backend stream checker.
- Channel/package manager.
- Reseller workflow before launch MVP stability.
- Paid access blocking before free launch ends.
- APK with hardcoded universal Activation Key.

## 19. Acceptance Criteria

M27 is acceptable when:

- EA0 bootstrap and license endpoints map to database reads/writes.
- Later customer portal endpoints map to database reads/writes.
- Device ID plus Activation Key login is clear.
- Single-page portal can be rendered from summary data later.
- Profile save/load remains boundary-controlled.
- Device/license/free launch behavior is clear.
- Owner actions are separated and audited.
- No media-provider API behavior is introduced.
