# M27 Customer Portal Endpoint / Database Mapping

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M27 maps the single-page customer portal flow to API endpoints and database reads/writes.

The launch MVP customer portal is intentionally minimal:

- MAC address plus access key login.
- Single-page portal.
- Device/access/license/payment-status summary.
- Optional playlist/profile save under strict storage boundary.
- Download/update info.

No customer email/name account is required for launch MVP.

## 2. Core Launch Flow

Customer flow:

1. Customer opens website portal.
2. Customer enters MAC address and access key.
3. Platform validates normalized MAC plus access key hash.
4. Platform creates a short-lived customer portal session.
5. Portal loads one-page summary.
6. Customer edits/saves profile if enabled.
7. Customer views license/payment/download status.
8. Customer leaves; no regular return is expected.

## 3. Database Entities Used

Required:

- `CustomerAccess`
- `Device`
- `LicenseGrant`
- `AppVersion`
- `RemoteConfig`
- `AuditLog`

Optional / boundary-controlled:

- `CustomerProfileStore`
- `PaymentStatus`

Owner-only:

- `OwnerUser`

## 4. Endpoint Mapping Summary

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

Public website endpoints:

- `GET /download-metadata`
- `GET /app-version`
- `GET /remote-config`

## 5. POST /customer-access/login

Purpose:

- Validate MAC address plus access key.
- Open customer portal session.

Input:

- `macAddress`
- `accessKey`

Database reads:

- `CustomerAccess` by normalized MAC.

Database writes:

- Update `CustomerAccess.lastPortalLoginAt` on success.
- Write `AuditLog` event.

Audit events:

- `customer_access.login.success`
- `customer_access.login.failed_limited`

Rules:

- Normalize MAC before lookup.
- Compare access key against `accessKeyHash`.
- Never store or log raw access key.
- Return generic `invalid_access` on failure.
- Apply rate limit.

## 6. GET /customer-portal/summary

Purpose:

- Load the complete single-page portal in one response.

Auth:

- Requires valid customer portal session.

Database reads:

- `CustomerAccess`
- `Device` by `customerAccessId` or normalized MAC.
- `LicenseGrant` by `customerAccessId` / `deviceId`.
- `PaymentStatus`, if present.
- `CustomerProfileStore` metadata only, if enabled.
- `AppVersion` / download metadata.
- `RemoteConfig` for flags/support/legal versions.

Database writes:

- None required.

Response must include:

- Access status.
- Masked MAC.
- Device status.
- License/free launch state.
- Payment status placeholder.
- Profile metadata.
- Download/update metadata.
- Support/legal version fields.

Response must not include:

- Raw access key.
- Owner/admin notes unless safe.
- Provider credentials.
- Plaintext stream URLs.
- Other customer records.

## 7. GET /customer-portal/profile

Purpose:

- Load customer-owned profile payload for editing if enabled.

Auth:

- Requires valid customer portal session.

Database reads:

- `CustomerProfileStore` for current `customerAccessId`.

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

## 8. PUT /customer-portal/profile

Purpose:

- Save customer-owned playlist/profile data under approved boundary.

Auth:

- Requires valid customer portal session.

Input:

- `profileMode`
- `payloadVersion`
- `encryptedPayload`, preferred

Database reads:

- `CustomerAccess` session context.
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

## 9. POST /customer-portal/profile/sync-request, Optional

Purpose:

- Mark that the linked device should fetch/sync latest profile when client flow supports it.

Auth:

- Requires valid customer portal session.

Database reads:

- `CustomerAccess`
- `Device`
- `CustomerProfileStore` metadata, if enabled.

Database writes:

- Optional sync metadata.
- `AuditLog` event.

Rules:

- Actual device behavior belongs to `TV_Project`.
- Platform only records/request-coordinates the sync.
- No plaintext stream/provider values may be pushed through logs.

## 10. POST /devices/register

Purpose:

- Create/update device record using MAC/device identity.

Used by:

- Android TV / Fire TV app.
- Owner dashboard manual action, if needed.

Input:

- `platform`
- `macAddress`
- `deviceKey`, optional
- `deviceName`, optional
- `appVersion`

Database reads:

- `Device` by normalized MAC or device key.
- `CustomerAccess` by normalized MAC, if exists.
- `LicenseGrant`, if linked.

Database writes:

- Create/update `Device`.
- Link `Device.customerAccessId` if matching CustomerAccess exists.
- Create/update free launch `LicenseGrant` if eligible.
- Write `AuditLog` event.

Audit events:

- `device.registered`
- `license.updated`, if license changes.

Rules:

- No customer email/name required.
- No payment requirement during free launch.
- No media source data returned.

## 11. POST /license/check

Purpose:

- Tell client whether the device may operate.

Input:

- `macAddress`
- `deviceId`, optional
- `deviceKey`, optional
- `platform`
- `appVersion`

Database reads:

- `Device`
- `CustomerAccess`, if linked.
- `LicenseGrant`
- `RemoteConfig.freeLaunch.enabled`

Database writes:

- Update `Device.lastSeenAt`.
- Update `LicenseGrant.lastCheckedAt`.
- Optional `AuditLog` event, rate-controlled.

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

- Free launch valid device returns allowed access.
- Payment absence must not block launch MVP.
- License check does not inspect playlists, streams, providers, or source URLs.

## 12. GET /download-metadata

Purpose:

- Provide website/app download details.

Database reads:

- `AppVersion` / download metadata.

Database writes:

- None required.

Rules:

- Official APK metadata only.
- No playlist/channel/source package downloads.

## 13. GET /app-version

Purpose:

- Provide app update policy.

Database reads:

- `AppVersion`.

Database writes:

- None required.

Rules:

- Force update must be conservative.
- No media/source/provider data returned.

## 14. GET /remote-config

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
- Support email.
- Legal/Terms/Privacy versions.
- Safe polling intervals.

Forbidden keys:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 15. Owner-Only Data Flow

Owner creates customer access:

1. Owner enters normalized or raw MAC.
2. System normalizes MAC.
3. System generates access key.
4. System stores `accessKeyHash` only.
5. Raw key is shown once.
6. Audit event is written.

Owner may manage:

- Customer access status.
- Access key reset.
- Device status.
- License/access state.
- App version/download metadata.
- Remote config.

Owner must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- Plaintext user playlist contents as admin feature.

## 16. Minimal Database Relationship

Recommended relationship:

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

## 17. Implementation Guardrails

Do not implement:

- Required customer email/name registration.
- Customer multi-page SaaS account center.
- Provider credential storage.
- Backend stream checker.
- Channel/package manager.
- Reseller workflow before launch MVP stability.
- Paid access blocking before free launch ends.

## 18. Acceptance Criteria

M27 is acceptable when:

- Every customer portal endpoint maps to database reads/writes.
- MAC plus access key login is clear.
- Single-page portal can be rendered from summary data.
- Profile save/load remains boundary-controlled.
- Device/license/free launch behavior is clear.
- Owner actions are separated and audited.
- No media-provider API behavior is introduced.
