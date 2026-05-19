# M41 EA0 Critical Database Schema / Migration Plan

Status: Active Draft
Mode: Critical single-task planning only. No live migration, no production deploy, no payment enforcement, no reseller workflow.

## 1. Purpose

M41 isolates the first critical database task after Task Group B.

This file prepares the actual EA0 schema and migration order without executing it.

Critical reason:

- EA0 records will become future customer/license continuity records.
- Device ID must remain stable.
- Activation Key must be hash-only in the database.
- Future paid licensing must attach to the same records.

## 2. Scope

This task covers:

- Table/collection creation order.
- Field definitions.
- Index definitions.
- Seed order.
- Rollback direction.
- Dry validation checks.

This task does not run:

- Production migration.
- Production database connection.
- Live secret setup.
- Activation Key generation logic.
- Device bootstrap endpoint.
- License check endpoint.

## 3. Migration Order

Recommended order:

```txt
1. Create DeviceAccessRecord
2. Create AppVersion
3. Create RemoteConfig
4. Create AuditLog
5. Add indexes
6. Add AppVersion seed
7. Add RemoteConfig seed
8. Run dry validation
```

## 4. DeviceAccessRecord Schema

Create:

```txt
DeviceAccessRecord
```

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

Required rules:

- `deviceId` is unique.
- `activationKeyHash` is required.
- Raw Activation Key field must not exist.
- `status` is required.
- `licenseState` is required.
- `freeLaunch` is required.
- `paymentRequired` is required.
- timestamps are required.

Nullable fields:

```txt
platformDeviceHash
activationKeyHint
lastRecoveredAt
ownerNote
```

## 5. DeviceAccessRecord Indexes

Required indexes:

```txt
unique(deviceId)
index(platformDeviceHash)
index(status)
index(licenseState)
index(lastSeenAt)
index(platform, appVersion)
```

Optional later indexes:

```txt
index(freeLaunch)
index(paymentRequired)
index(createdAt)
```

## 6. AppVersion Schema

Create:

```txt
AppVersion
```

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

Indexes:

```txt
unique(platform, version, channel)
index(platform, currentRecommended)
index(platform, enabled)
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

`updateUrl` may remain empty until APK download path is approved.

## 7. RemoteConfig Schema

Create:

```txt
RemoteConfig
```

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

Indexes:

```txt
unique(scope, key, platform)
index(platform, enabled)
```

Initial seed keys:

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

Only safe operational keys are allowed.

## 8. AuditLog Schema

Create:

```txt
AuditLog
```

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

Indexes:

```txt
index(action)
index(targetType, targetId)
index(actorType, actorId)
index(createdAt)
```

Rules:

- Metadata must be redacted.
- No raw Activation Key.
- No Activation Key hash.
- No customer private payloads.

## 9. Seed Order

Seed order:

```txt
1. AppVersion android_tv / 0.1.0 / ea0
2. RemoteConfig freeLaunch.enabled = true
3. RemoteConfig feature flags
4. RemoteConfig support/legal versions
5. RemoteConfig emergency flags
```

No DeviceAccessRecord seed is required for production.

Development fixtures may use fake records only.

## 10. Dry Validation

Before endpoint connection, verify:

```txt
DeviceAccessRecord exists
AppVersion exists
RemoteConfig exists
AuditLog exists
unique(deviceId) works
platformDeviceHash lookup works
AppVersion seed reads correctly
RemoteConfig seed reads correctly
AuditLog can write redacted metadata
No raw Activation Key field exists
No out-of-scope product data fields exist
```

## 11. Rollback Direction

Before public EA0 users exist, development/staging rollback may recreate EA0 tables and seeds.

After public users exist:

- DeviceAccessRecord must be treated as customer/license continuity data.
- No destructive rollback without backup and explicit approval.

## 12. Future Paid Compatibility

Later paid fields may be added directly or through separate tables:

```txt
planId
paymentStatus
paidUntil
paymentProviderCustomerId
subscriptionId
lastPaymentAt
renewalStatus
```

Do not require changing:

```txt
deviceId
activationKeyHash
DeviceAccessRecord identity
```

## 13. Critical Stop Conditions

Stop immediately if migration design adds:

- Raw Activation Key field.
- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during EA0.
- Reseller tables before approval.
- Out-of-scope media/source/account fields.
- Watch history fields.

## 14. Acceptance Criteria

M41 is acceptable when:

- Migration order is clear.
- DeviceAccessRecord schema is safe.
- AppVersion seed is clear.
- RemoteConfig seed is clear.
- AuditLog is redacted.
- Rollback direction is clear.
- Future paid licensing remains compatible.
- No out-of-scope provider behavior is introduced.
