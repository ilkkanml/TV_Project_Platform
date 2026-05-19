# M36 EA0 Database Setup and Seed Plan

Status: Active Draft
Mode: Database setup planning only. No live migration, production deploy, payment enforcement, reseller workflow, or content/provider/source behavior until explicitly approved.

## 1. Purpose

M36 defines the practical setup order for the EA0 database after the schema blueprint is approved.

Goal:

- Prepare the database foundation for download-only early access.
- Allow Device ID + Activation Key records to be created safely.
- Seed app version and remote config values.
- Keep future paid licensing compatible.

## 2. Setup Order

Recommended order:

```txt
1. Choose database environment
2. Create DeviceAccessRecord table/collection
3. Create AppVersion table/collection
4. Create RemoteConfig table/collection
5. Create AuditLog table/collection, recommended
6. Add required indexes
7. Add seed records
8. Run dry validation
9. Connect backend endpoints
10. Run EA0 smoke test
```

## 3. Environment Rule

Use separate environments:

```txt
development
staging
production, later
```

EA0 should be tested in development/staging before any public distribution.

Rules:

- Do not test first public users directly on an unverified database.
- Do not store database credentials in repo.
- Do not expose database admin panels publicly.

## 4. Required Tables / Collections

EA0 required:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog, recommended
```

Not required yet:

```txt
CustomerAccess
PaymentStatus
Subscription
ResellerProfile
CreditLedgerEntry
CustomerProfileStore
SupportTicket
```

## 5. DeviceAccessRecord Setup

Create fields:

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

Required defaults:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

Required indexes:

```txt
deviceId unique
platformDeviceHash lookup
status lookup
licenseState lookup
lastSeenAt lookup
platform + appVersion lookup
```

Rules:

- Raw Activation Key is never stored.
- activationKeyHash is backend-only.
- activationKeyHint may show only a masked hint.

## 6. AppVersion Seed

Initial seed record:

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

- updateUrl can stay empty until APK hosting/download path is approved.
- forceUpdate must stay false until update flow is tested.

## 7. RemoteConfig Seed

Initial seed values:

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

## 8. AuditLog Setup

Recommended fields:

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

EA0 audit actions:

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

- Audit metadata must not include raw Activation Key.
- Audit metadata must not include activationKeyHash.
- Audit metadata must not include provider/source/playlist values.

## 9. Dry Validation Checklist

Before connecting app/backend:

```txt
DeviceAccessRecord can be created
DeviceAccessRecord deviceId uniqueness works
platformDeviceHash lookup works
AppVersion seed can be read
RemoteConfig seed can be read
AuditLog can write safe metadata
No raw Activation Key field exists
No provider/source/content field exists
```

## 10. Backend Connection Checklist

After database setup, connect endpoints in this order:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

Do not connect yet:

```txt
payment endpoints
reseller endpoints
customer portal endpoints
profile upload endpoints
```

## 11. EA0 Smoke Test

Minimum smoke test:

```txt
1. App/backend calls /health
2. App/backend calls /app-version
3. App/backend calls /remote-config
4. App/backend calls /devices/bootstrap without local credentials
5. Database creates DeviceAccessRecord
6. Backend returns Device ID + Activation Key once
7. App/backend calls /license/check with Device ID + Activation Key
8. Backend returns allowed=true and free_launch_active
9. Database updates lastSeenAt
10. No raw Activation Key appears in database/logs
```

## 12. Future Paid Compatibility Check

Before EA0 release, confirm:

```txt
paymentRequired field exists
licenseState can later become active / expired / suspended
paidUntil can be added later
DeviceAccessRecord can map into CustomerAccess / Device / LicenseGrant later
Device ID does not need to change for paid transition
Activation Key does not need to change by default for paid transition
```

## 13. Stop Conditions

Stop if database setup adds:

- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during EA0.
- Reseller records before approval.
- Stream/source/provider fields.
- Playlist catalog fields.
- Watch history fields.
- Raw Activation Key storage.

## 14. Setup Done Criteria

EA0 database setup is ready when:

- Required tables/collections exist.
- Required indexes exist.
- AppVersion seed exists.
- RemoteConfig seed exists.
- DeviceAccessRecord can be created.
- Activation Key raw value is not stored.
- AuditLog stores no secrets.
- Backend endpoints can be connected safely.
- Future paid transition remains possible.
