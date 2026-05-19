# M31 Early Access Database Bootstrap

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M31 defines the interim launch step before the full website/customer portal is ready.

The first early access release may be distributed without the full website flow.

During this phase:

- The APK may be shared/downloaded directly.
- The full customer portal may be disabled.
- The platform database must still start collecting device/customer access records.
- Access is based on Device ID plus Activation Key.
- Only activation key hash is stored, not the raw key/password.
- Free launch access remains active.

## 2. Early Access Phase Name

Approved phase name:

```txt
EA0_DOWNLOAD_ONLY_DATABASE_BOOTSTRAP
```

Meaning:

- Website is not required for customer self-service yet.
- Customer portal is not required yet.
- Reseller is not active.
- Payment enforcement is not active.
- Database foundation begins now.

## 3. Final EA0 Identity Decision

Approved EA0 model:

```txt
Backend-generated Device ID + Backend-generated Activation Key
```

The app must not ship with a hardcoded shared activation key.

The database must not store the raw activation key.

Correct ownership:

```txt
Backend generates Device ID
Backend generates Activation Key
Backend stores activationKeyHash only
App stores Device ID + raw Activation Key locally after first registration
App sends Device ID + Activation Key for license/access checks
```

Reason:

- Backend guarantees uniqueness.
- Backend can revoke/reset keys.
- Raw secrets do not live in database.
- The APK does not contain a universal shared secret.
- Download-only early access can still create records automatically.

## 4. Active Scope

EA0 active scope:

- Device ID record.
- Activation Key hash record.
- Device/platform/app version record.
- Platform device fingerprint hash for reinstall recovery.
- Free launch license/access state.
- Last seen/check metadata.
- Basic app version/update metadata.
- Basic remote config.
- Owner-visible records later.

EA0 inactive scope:

- Full customer portal.
- Customer email/name registration.
- Payment enforcement.
- Reseller panel.
- Credit ledger.
- Advanced analytics.
- Support ticketing.

## 5. Identity Model

Approved terms:

- `deviceId`
- `activationKey`
- `activationKeyHash`
- `platformDeviceHash`

Rules:

- `deviceId` is the public platform identifier used for lookup and display.
- `activationKey` is the device/customer secret.
- `activationKeyHash` is the only activation key value stored in database.
- `platformDeviceHash` helps recover the same physical/app-scoped device after reinstall.
- Raw `activationKey` must not be stored after generation/validation.
- Raw platform identifiers should not be stored if a hash can support the flow.
- A masked hint may be stored, such as last 4 characters.

Avoid primary naming:

- MAC address.
- access key.
- customer email.
- customer name.

## 6. Minimum Database Entity

EA0 may use one compact entity first, then later split into CustomerAccess / Device / LicenseGrant if needed.

Recommended compact entity:

```txt
DeviceAccessRecord
```

Minimum fields:

```txt
id
deviceId
platformDeviceHash
activationKeyHash
activationKeyHint
platform
appVersion
status
licenseState
freeLaunch
paymentRequired
firstSeenAt
lastSeenAt
lastRecoveredAt, optional
createdAt
updatedAt
ownerNote, optional
```

Recommended statuses:

```txt
active
pending
disabled
blocked
revoked
```

Recommended license states:

```txt
free_launch_active
active
expired
suspended
device_revoked
blocked
```

Rules:

- `deviceId` must be unique.
- `platformDeviceHash` should be unique when available.
- `activationKeyHash` must never be returned to clients.
- Raw activation key must never be logged.
- No playlist/source/provider fields belong in this entity.

## 7. Reinstall Recognition Rule

Normal app update:

- App keeps local Device ID + Activation Key.
- Same device is recognized through stored local credentials.

App uninstall/reinstall:

- App-private local storage may be removed.
- The app may lose locally stored Device ID + Activation Key.
- Backend can still recognize the same device if the app provides the same `platformDeviceHash`.
- If matched, backend may return the existing Device ID and rotate/generate a new Activation Key.
- Old Activation Key should be invalidated after recovery.

Not guaranteed cases:

- Factory reset.
- App signing key change.
- Different Android user/profile.
- Platform identifier unavailable or changed.
- Backup/restore disabled or unavailable.

Rule:

- Reinstall recognition should be supported as best-effort, not guaranteed forever.
- Owner dashboard must allow manual revoke/reset/merge support later.

## 8. Future-Compatible Mapping

When the full website/customer portal launches, `DeviceAccessRecord` can map into:

```txt
CustomerAccess
  -> Device
  -> LicenseGrant
```

Mapping:

```txt
DeviceAccessRecord.deviceId -> CustomerAccess.deviceId / Device.deviceId
DeviceAccessRecord.platformDeviceHash -> Device.platformDeviceHash
DeviceAccessRecord.activationKeyHash -> CustomerAccess.activationKeyHash
DeviceAccessRecord.status -> CustomerAccess.status / Device.status
DeviceAccessRecord.licenseState -> LicenseGrant.state
DeviceAccessRecord.freeLaunch -> LicenseGrant.freeLaunch
DeviceAccessRecord.lastSeenAt -> Device.lastSeenAt
```

Rule:

- EA0 must not create a dead-end schema.
- The compact entity may be temporary, but naming must remain compatible with the later model.

## 9. Early Access API Minimum

EA0 minimum API endpoints:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

Optional owner-only/internal endpoint later:

```txt
GET /owner/device-access-records
POST /owner/device-access-records
POST /owner/device-access-records/:id/reset-activation-key
PATCH /owner/device-access-records/:id/status
```

No customer portal endpoints are required for EA0 unless explicitly enabled later.

## 10. POST /devices/bootstrap

Purpose:

- Create or recover an early access device/customer access record.

Input:

```txt
platformDeviceHash
platform
appVersion
existingDeviceId, optional
existingActivationKey, optional
```

Database behavior:

- If existingDeviceId + existingActivationKey are valid, update appVersion/lastSeenAt and return current access state.
- If platformDeviceHash matches an existing active/recoverable record, return the existing deviceId and generate a new activationKey.
- If no match exists, create a new DeviceAccessRecord with new deviceId and new activationKey.
- Store activationKeyHash only.
- Return raw activationKey only once to the app.

Response:

```txt
deviceId
activationKey, returned only on first create or recovery rotation
status
licenseState
freeLaunch
paymentRequired
message
```

Rules:

- Payment required remains false during free launch.
- No email/name is required.
- No provider/source/playlist data is accepted.
- Raw activation key must not be logged.

## 11. POST /license/check

Purpose:

- Confirm whether the early access device may operate.

Input:

```txt
deviceId
activationKey
platform
appVersion
```

Database behavior:

- Find DeviceAccessRecord by deviceId.
- Verify activationKey against activationKeyHash.
- Update lastSeenAt.
- Return free launch access if record is active.

Response:

```txt
allowed
state
freeLaunch
paymentRequired
deviceId
deviceStatus
message
```

Rules:

- Active free launch device returns allowed.
- Disabled/blocked/revoked device returns not allowed.
- License check never validates stream/provider/source data.

## 12. Activation Key Generation Mode

Final EA0 mode:

```txt
App-first bootstrap with backend-generated Device ID and Activation Key
```

Flow:

1. App starts for the first time.
2. App creates a privacy-safe `platformDeviceHash` from the app/device-scoped identifier.
3. App calls `POST /devices/bootstrap`.
4. Backend creates DeviceAccessRecord if none exists.
5. Backend generates unique Device ID.
6. Backend generates strong Activation Key.
7. Backend stores only activationKeyHash.
8. Backend returns Device ID and raw Activation Key once.
9. App stores Device ID and Activation Key locally.
10. License checks use Device ID + Activation Key.

Best for:

- Download-only public early access.
- Automatic device/customer record creation.
- No website requirement for first testers.

Abuse response:

- If abuse appears, switch new records to `pending` instead of auto-active.
- Owner can later approve/disable/block records.

## 13. Security Rules

Required:

- Backend generates activation keys.
- Hash activation keys.
- Never store raw activation keys.
- Never log raw activation keys.
- Never hardcode shared activation key inside APK.
- Rate-limit bootstrap/license check.
- Allow owner to revoke/block device.
- Use generic error messages.

Recommended:

- Activation key length should be strong enough to prevent guessing.
- Store only masked hint.
- Add createdAt/lastSeenAt for abuse review.
- Rotate activation key on reinstall recovery.

## 14. Owner Visibility Later

Even if the full owner dashboard is not live yet, records should support future owner visibility:

Owner should later see:

- Device ID.
- Masked activation key hint.
- Platform.
- App version.
- Status.
- License state.
- Free launch flag.
- First seen.
- Last seen.
- Last recovered, if any.

Owner should not see:

- Raw activation key after generation.
- Activation key hash.
- Raw platform device identifier.
- Provider credentials.
- Playlist/source contents.

## 15. No-Content Boundary

EA0 database must not store:

- Stream URLs.
- Playlist contents.
- Provider username/password.
- Channel package data.
- IPTV package data.
- EPG source data.
- User watch history.

EA0 is only for platform access records.

## 16. Stop Conditions

Stop and escalate if EA0 starts adding:

- Required email/name registration.
- Payment blocking.
- Reseller workflow.
- Channel/package/source management.
- Provider credential storage.
- Backend playlist/source catalog.
- Android UX decisions inside platform docs.
- Hardcoded shared activation key in APK.

## 17. Acceptance Criteria

EA0 database bootstrap is acceptable when:

- Device ID plus Activation Key is the only customer/device access identity.
- Backend generates Device ID and Activation Key.
- Raw activation key is never stored in database.
- App stores Device ID and Activation Key locally.
- Reinstall recognition is best-effort through platformDeviceHash.
- Device/customer access records start forming without full website/customer portal.
- Free launch access can be granted.
- App version/update metadata can be served.
- Owner can later view/manage records.
- The schema can evolve into CustomerAccess / Device / LicenseGrant without rewrite.
- No media-provider behavior is introduced.
