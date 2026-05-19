# M35 EA0 Database Schema Blueprint

Status: Active Draft
Mode: Database planning only. No live migration, production deploy, payment enforcement, reseller workflow, or content/provider/source behavior until explicitly approved.

## 1. Purpose

M35 defines the first database schema blueprint for EA0.

EA0 database goal:

- Store early access device/customer access records.
- Support backend-generated Device ID.
- Support backend-generated Activation Key.
- Store only Activation Key hash.
- Grant free launch access.
- Support future paid licensing without replacing existing records.

## 2. Required Tables

EA0 requires only these tables first:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog, recommended
```

Do not create these yet unless explicitly approved later:

```txt
CustomerAccess
Device
LicenseGrant
PaymentStatus
Subscription
ResellerProfile
CreditLedgerEntry
CustomerProfileStore
SupportTicket
```

## 3. DeviceAccessRecord

Purpose:

- Main EA0 access record.
- Represents one app/device access identity.
- Later can map into CustomerAccess, Device, and LicenseGrant.

Fields:

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
lastRecoveredAt

createdAt
updatedAt
ownerNote
```

Recommended types:

```txt
id: uuid or database id
deviceId: string, unique
platformDeviceHash: string, nullable, indexed
activationKeyHash: string
activationKeyHint: string, nullable
platform: string
appVersion: string
status: string
licenseState: string
freeLaunch: boolean
paymentRequired: boolean
firstSeenAt: datetime
lastSeenAt: datetime
lastRecoveredAt: datetime, nullable
createdAt: datetime
updatedAt: datetime
ownerNote: text, nullable
```

## 4. DeviceAccessRecord Defaults

Default EA0 values:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

Default timestamps:

```txt
firstSeenAt = now
lastSeenAt = now
createdAt = now
updatedAt = now
```

## 5. DeviceAccessRecord Status Values

Allowed `status` values:

```txt
active
pending
disabled
blocked
revoked
```

Meaning:

- active: device may use free launch if license state allows.
- pending: record exists but may require later approval.
- disabled: temporarily unavailable.
- blocked: blocked due to abuse or owner decision.
- revoked: credential/device access revoked.

## 6. License State Values

Allowed `licenseState` values:

```txt
free_launch_active
active
expired
suspended
device_revoked
blocked
```

EA0 normal state:

```txt
free_launch_active
```

Future paid states:

```txt
active
expired
suspended
```

## 7. Required Indexes

Required indexes:

```txt
unique(deviceId)
index(platformDeviceHash)
index(status)
index(licenseState)
index(lastSeenAt)
index(platform, appVersion)
```

Optional later:

```txt
index(createdAt)
index(freeLaunch)
index(paymentRequired)
```

## 8. AppVersion

Purpose:

- Stores app update/version policy.

Fields:

```txt
id
platform
version
channel
currentRecommended
minimumSupported
updateUrl
forceUpdate
enabled
releaseNotes
createdAt
updatedAt
```

Recommended seed:

```txt
platform = android_tv
version = 0.1.0
channel = ea0
currentRecommended = true
minimumSupported = 0.1.0
forceUpdate = false
enabled = true
releaseNotes = EA0 free launch build
```

Indexes:

```txt
unique(platform, version, channel)
index(platform, currentRecommended)
index(platform, enabled)
```

## 9. RemoteConfig

Purpose:

- Stores safe runtime flags.

Fields:

```txt
id
scope
key
platform
valueJson
enabled
createdAt
updatedAt
```

Recommended seed keys:

```txt
freeLaunch.enabled
maintenance.enabled
maintenance.message
features.licenseCheck.enabled
features.deviceBootstrap.enabled
features.diagnostics.enabled
features.support.enabled
support.email
terms.version
privacy.version
legalBoundary.version
emergency.forceReadOnlyMode
emergency.disableDeviceBootstrap
emergency.disableLicenseGranting
```

Indexes:

```txt
unique(scope, key, platform)
index(platform, enabled)
```

Rules:

- Remote config must not carry media/source/provider values.
- Unknown unsafe keys should not be returned to clients.

## 10. AuditLog

Purpose:

- Records security and operational events.

Fields:

```txt
id
actorType
actorId
action
targetType
targetId
metadata
createdAt
```

EA0 actions:

```txt
device_access.created
device_access.recovered
device_access.key_rotated
device.bootstrap.success
device.bootstrap.failed_limited
license.checked
license.denied
app_version.checked
remote_config.read
```

Rules:

- Do not store raw Activation Key.
- Do not store activationKeyHash.
- Do not store provider credentials.
- Do not store playlist/source contents.

Indexes:

```txt
index(action)
index(targetType, targetId)
index(createdAt)
index(actorType, actorId)
```

## 11. Activation Key Storage Rule

Database stores:

```txt
activationKeyHash
activationKeyHint
```

Database never stores:

```txt
activationKey raw value
```

The raw Activation Key may be returned only when:

```txt
first device bootstrap creates the record
reinstall recovery rotates the key
owner reset later generates a new key
```

## 12. Reinstall Recovery Rule

Recovery lookup may use:

```txt
platformDeviceHash
```

Recovery behavior:

- If platformDeviceHash matches a recoverable record, keep existing deviceId.
- Rotate Activation Key.
- Update activationKeyHash and activationKeyHint.
- Set lastRecoveredAt.
- Return new Activation Key once.

Recovery is best-effort, not guaranteed.

## 13. Future Paid Migration Compatibility

EA0 DeviceAccessRecord must be kept.

Later paid fields can be added directly or split into new tables:

```txt
planId
paymentStatus
paidUntil
paymentProviderCustomerId
subscriptionId
lastPaymentAt
renewalStatus
```

Future split mapping:

```txt
DeviceAccessRecord.deviceId -> CustomerAccess.deviceId / Device.deviceId
DeviceAccessRecord.activationKeyHash -> CustomerAccess.activationKeyHash
DeviceAccessRecord.platformDeviceHash -> Device.platformDeviceHash
DeviceAccessRecord.status -> CustomerAccess.status / Device.status
DeviceAccessRecord.licenseState -> LicenseGrant.state
DeviceAccessRecord.freeLaunch -> LicenseGrant.freeLaunch
DeviceAccessRecord.paymentRequired -> LicenseGrant.paymentRequired
DeviceAccessRecord.lastSeenAt -> Device.lastSeenAt
```

## 14. No-Content Boundary

EA0 schema must not include fields for:

- Stream URLs.
- Playlist contents.
- Provider username/password.
- Channel package data.
- IPTV package data.
- EPG source data.
- Watch history.
- Public playlist catalog.

## 15. Schema Done Criteria

EA0 database schema is acceptable when:

- DeviceAccessRecord supports Device ID + Activation Key hash.
- Raw Activation Key is not stored.
- Free launch access can be represented.
- App version metadata can be represented.
- Remote config can be represented safely.
- Audit events can be stored without secrets.
- Records can transition to future paid licensing.
- No media-provider behavior exists.
