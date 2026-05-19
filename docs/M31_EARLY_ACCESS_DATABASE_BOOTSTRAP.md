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

## 3. Active Scope

EA0 active scope:

- Device ID record.
- Activation Key hash record.
- Device/platform/app version record.
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

## 4. Identity Model

Approved terms:

- `deviceId`
- `activationKey`
- `activationKeyHash`

Rules:

- `deviceId` is the public device identifier used for lookup.
- `activationKey` is the customer/device secret.
- Raw `activationKey` must not be stored after generation/validation.
- Only `activationKeyHash` is stored.
- A masked hint may be stored, such as last 4 characters.

Avoid primary naming:

- MAC address.
- access key.
- customer email.
- customer name.

## 5. Minimum Database Entity

EA0 may use one compact entity first, then later split into CustomerAccess / Device / LicenseGrant if needed.

Recommended compact entity:

```txt
DeviceAccessRecord
```

Minimum fields:

```txt
id
deviceId
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
- `activationKeyHash` must never be returned to clients.
- Raw activation key must never be logged.
- No playlist/source/provider fields belong in this entity.

## 6. Future-Compatible Mapping

When the full website/customer portal launches, `DeviceAccessRecord` can map into:

```txt
CustomerAccess
  -> Device
  -> LicenseGrant
```

Mapping:

```txt
DeviceAccessRecord.deviceId -> CustomerAccess.deviceId / Device.deviceId
DeviceAccessRecord.activationKeyHash -> CustomerAccess.activationKeyHash
DeviceAccessRecord.status -> CustomerAccess.status / Device.status
DeviceAccessRecord.licenseState -> LicenseGrant.state
DeviceAccessRecord.freeLaunch -> LicenseGrant.freeLaunch
DeviceAccessRecord.lastSeenAt -> Device.lastSeenAt
```

Rule:

- EA0 must not create a dead-end schema.
- The compact entity may be temporary, but naming must remain compatible with the later model.

## 7. Early Access API Minimum

EA0 minimum API endpoints:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/register
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

## 8. POST /devices/register

Purpose:

- Create/update an early access device/customer access record.

Input:

```txt
deviceId
platform
appVersion
activationKey, optional depending on flow
```

Database behavior:

- If `deviceId` does not exist, create DeviceAccessRecord.
- If activation key is generated server-side, return it once or show through owner flow only.
- If activation key is supplied by app/user, verify hash or store hash on first approved registration depending on chosen flow.
- Update appVersion and lastSeenAt.

Response:

```txt
deviceId
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

## 9. POST /license/check

Purpose:

- Confirm whether the early access device may operate.

Input:

```txt
deviceId
activationKey, if required by security mode
platform
appVersion
```

Database behavior:

- Find DeviceAccessRecord by deviceId.
- Verify activation key if required.
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

## 10. Activation Key Generation Modes

Two acceptable modes exist.

### Mode A: Owner-generated key

Flow:

1. Owner creates DeviceAccessRecord.
2. Owner enters/generates Device ID.
3. System generates Activation Key.
4. System stores activationKeyHash only.
5. Raw key is shown once.
6. Customer uses Device ID + Activation Key.

Best for:

- Controlled early access.
- Small tester group.

### Mode B: App-first registration

Flow:

1. App generates or displays Device ID.
2. App calls register endpoint.
3. Backend creates pending DeviceAccessRecord.
4. Owner later approves/enables record or system auto-enables during free launch.
5. Activation Key is generated/assigned depending on security choice.

Best for:

- Download-only public early access.
- Faster device collection.

Recommended for first EA0:

```txt
Mode B with free_launch auto-enable, unless abuse becomes a problem.
```

## 11. Security Rules

Required:

- Hash activation keys.
- Never store raw activation keys.
- Never log raw activation keys.
- Rate-limit register/license check.
- Allow owner to revoke/block device.
- Use generic error messages.

Recommended:

- Activation key length should be strong enough to prevent guessing.
- Store only masked hint.
- Add createdAt/lastSeenAt for abuse review.

## 12. Owner Visibility Later

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

Owner should not see:

- Raw activation key after generation.
- Activation key hash.
- Provider credentials.
- Playlist/source contents.

## 13. No-Content Boundary

EA0 database must not store:

- Stream URLs.
- Playlist contents.
- Provider username/password.
- Channel package data.
- IPTV package data.
- EPG source data.
- User watch history.

EA0 is only for platform access records.

## 14. Stop Conditions

Stop and escalate if EA0 starts adding:

- Required email/name registration.
- Payment blocking.
- Reseller workflow.
- Channel/package/source management.
- Provider credential storage.
- Backend playlist/source catalog.
- Android UX decisions inside platform docs.

## 15. Acceptance Criteria

EA0 database bootstrap is acceptable when:

- Device ID plus Activation Key is the only customer/device access identity.
- Raw activation key is never stored.
- Device/customer access records start forming without full website/customer portal.
- Free launch access can be granted.
- App version/update metadata can be served.
- Owner can later view/manage records.
- The schema can evolve into CustomerAccess / Device / LicenseGrant without rewrite.
- No media-provider behavior is introduced.
