# M40 EA0 Database Preparation Task Group B

Status: Active Draft
Mode: Database preparation planning only. No live migration, production deploy, payment enforcement, reseller workflow, or content/provider/source behavior until explicitly approved.

## 1. Purpose

M40 completes Task Group B from M38.

This group prepares the EA0 database work before any actual migration or live database change.

This group includes:

- Database environment decision notes.
- DeviceAccessRecord implementation checklist.
- AppVersion seed checklist.
- RemoteConfig seed checklist.
- AuditLog setup checklist.
- Dry validation checklist.

This group does not execute:

- Actual production database migration.
- Actual production connection.
- Secret insertion.
- Credential generation logic.
- Live endpoint writes.

## 2. Database Environment Decision

Required environments:

```txt
development
staging
production, later
```

EA0 flow:

```txt
Development first
Staging second
Production only after smoke test approval
```

Rules:

- Do not connect public APK users to an untested database.
- Do not reuse production database credentials in development.
- Do not commit database credentials to repo.
- Do not expose database admin UI publicly.

## 3. Required EA0 Tables / Collections

EA0 required:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog, recommended
```

Deferred:

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

Reason:

- EA0 needs device/license records only.
- Customer portal/payment/reseller can attach later.

## 4. DeviceAccessRecord Checklist

Purpose:

- Store early access device/customer access identity.

Required fields:

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

Default EA0 values:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

Required indexes:

```txt
unique(deviceId)
index(platformDeviceHash)
index(status)
index(licenseState)
index(lastSeenAt)
index(platform, appVersion)
```

Rules:

- Raw Activation Key field must not exist.
- activationKeyHash is backend-only.
- activationKeyHint must be masked only.
- platformDeviceHash must not expose raw invasive device identifiers.

## 5. AppVersion Checklist

Purpose:

- Serve app update/version policy.

Required fields:

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

Initial seed:

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

Rules:

- updateUrl may stay empty until download path is approved.
- forceUpdate must stay false until tested.
- No media/source/provider values.

## 6. RemoteConfig Checklist

Purpose:

- Serve safe runtime flags.

Required fields:

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

Initial seed keys:

```txt
freeLaunch.enabled = true
maintenance.enabled = false
maintenance.message = empty
features.licenseCheck.enabled = true
features.deviceBootstrap.enabled = true
features.diagnostics.enabled = true
features.support.enabled = true
support.email = project@thenightssecret.com
terms.version = 1.0
privacy.version = 1.0
legalBoundary.version = 1.0
emergency.forceReadOnlyMode = false
emergency.disableDeviceBootstrap = false
emergency.disableLicenseGranting = false
```

Forbidden values:

```txt
stream.url
playlist.url
channel.package
provider.username
provider.password
m3u.source
epg.source
content.catalog
```

Rules:

- Only safe keys should be returned to clients.
- Remote config must not become source/content delivery.

## 7. AuditLog Checklist

Purpose:

- Record operational/security events without secrets.

Required fields:

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

Recommended EA0 actions:

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
- Do not store provider/source/playlist values.
- Metadata must be redacted.

## 8. Dry Validation Checklist

Before backend writes are connected:

```txt
DeviceAccessRecord can be created in development
unique(deviceId) rejects duplicates
platformDeviceHash lookup works
status lookup works
licenseState lookup works
lastSeenAt update works
AppVersion seed can be read
RemoteConfig seed can be read
AuditLog can write redacted metadata
No raw Activation Key field exists
No provider/source/content fields exist
```

## 9. Critical Single Tasks Not Included

These must be done one by one later:

```txt
Actual database migration/schema creation
Actual production database connection
Actual secret insertion
Activation Key generation logic
Activation Key hashing logic
Device bootstrap endpoint writes
License check verification
```

Reason:

- These touch security, data integrity, or live access continuity.

## 10. Future Paid Compatibility Check

Before EA0 public use, confirm:

```txt
paymentRequired exists
licenseState supports expired / suspended / active
paidUntil can be added later
DeviceAccessRecord can map to CustomerAccess / Device / LicenseGrant later
Device ID can stay stable
Activation Key does not need to change by default
```

## 11. Stop Conditions

Stop if database preparation adds:

- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during EA0.
- Reseller tables before approval.
- Stream/source/provider fields.
- Playlist catalog fields.
- Watch history fields.
- Raw Activation Key storage.

## 12. Group B Done Criteria

Task Group B is complete when:

- EA0 database environments are defined.
- Required tables/collections are listed.
- DeviceAccessRecord fields and indexes are clear.
- AppVersion seed is clear.
- RemoteConfig seed is clear.
- AuditLog structure is clear.
- Dry validation checklist is ready.
- Critical live database tasks remain isolated.
