# M37 EA0 Backend Endpoint Implementation Checklist

Status: Active Draft
Mode: Backend implementation checklist only. No production deploy, payment enforcement, reseller workflow, customer portal implementation, or content/provider/source behavior until explicitly approved.

## 1. Purpose

M37 defines the implementation checklist for the five EA0 backend endpoints.

EA0 required endpoints:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

The goal is to implement the smallest safe backend that lets the app create records, receive free launch access, and keep those records compatible with future paid licensing.

## 2. Global Endpoint Rules

All EA0 endpoints must follow these rules:

- No customer email/name requirement.
- No MAC as primary product identity.
- No payment blocking during EA0.
- No reseller workflow.
- No provider/source/playlist data collection.
- No stream/channel/package management.
- No raw Activation Key logging.
- No raw Activation Key database storage.
- No activationKeyHash in client responses.

## 3. Shared Request Validation

Validate common client fields:

```txt
platform
appVersion
deviceId, when required
activationKey, when required
platformDeviceHash, when bootstrapping/recovering
```

Allowed initial platform:

```txt
android_tv
```

Future-compatible platforms may exist later, but EA0 first implementation should not over-expand.

## 4. GET /health Checklist

Purpose:

- Verify API reachability.

Implementation checklist:

```txt
Return status ok
Return service name
Return EA0 scope
Do not require auth
Do not query private data
Do not expose server internals
```

Expected response fields:

```txt
status
service
scope
```

Done when:

- App/backend smoke test can confirm API is reachable.

## 5. GET /app-version Checklist

Purpose:

- Let app know version policy.

Input:

```txt
platform
version
channel, optional
```

Implementation checklist:

```txt
Read AppVersion by platform/channel
Return currentRecommendedVersion
Return minimumSupportedVersion
Return forceUpdate
Return updateUrl if approved
Return releaseNotes
Return freeLaunch
Return safe fallback if record missing
```

Expected response fields:

```txt
platform
requestedVersion
currentRecommendedVersion
minimumSupportedVersion
forceUpdate
updateUrl
releaseNotes
freeLaunch
```

Rules:

- forceUpdate defaults false.
- updateUrl may be empty until APK hosting path is approved.
- No content/source/provider data.

## 6. GET /remote-config Checklist

Purpose:

- Provide safe runtime flags.

Input:

```txt
platform
version
channel, optional
```

Implementation checklist:

```txt
Read enabled RemoteConfig records
Filter only approved safe keys
Group response into simple objects
Return maintenance state
Return feature flags
Return support email
Return policy versions
Do not return unknown unsafe keys
```

Required safe response areas:

```txt
freeLaunch
maintenance
features
support
termsVersion
privacyVersion
legalBoundaryVersion
```

Forbidden response data:

```txt
stream URLs
playlist URLs
channel packages
provider credentials
source metadata
content catalog
```

## 7. POST /devices/bootstrap Checklist

Purpose:

- Create or recover DeviceAccessRecord.

Input:

```txt
platformDeviceHash
platform
appVersion
existingDeviceId, optional
existingActivationKey, optional
```

Implementation path A: existing credentials provided

```txt
Find DeviceAccessRecord by existingDeviceId
Verify existingActivationKey against activationKeyHash
If valid, update appVersion and lastSeenAt
Return current status without returning activationKey
```

Implementation path B: recovery by platformDeviceHash

```txt
Find recoverable DeviceAccessRecord by platformDeviceHash
Keep existing deviceId
Generate new Activation Key
Hash new Activation Key
Replace activationKeyHash
Update activationKeyHint
Set lastRecoveredAt
Update lastSeenAt
Return deviceId and new Activation Key once
```

Implementation path C: new record

```txt
Generate unique Device ID
Generate strong Activation Key
Hash Activation Key
Store activationKeyHash
Store activationKeyHint only
Create DeviceAccessRecord
Return deviceId and raw Activation Key once
```

Expected response fields:

```txt
deviceId
activationKey, only on create/recovery rotation
status
licenseState
freeLaunch
paymentRequired
message
```

Rules:

- Raw Activation Key never stored.
- Raw Activation Key never logged.
- activationKeyHash never returned.
- No email/name requirement.
- No provider/source/playlist data accepted.

## 8. POST /license/check Checklist

Purpose:

- Validate whether the app may operate.

Input:

```txt
deviceId
activationKey
platform
appVersion
```

Implementation checklist:

```txt
Find DeviceAccessRecord by deviceId
Verify Activation Key against activationKeyHash
Check status
Check licenseState
Check freeLaunch/paymentRequired
Update lastSeenAt
Return access decision
```

Expected response fields:

```txt
allowed
state
freeLaunch
paymentRequired
deviceId
deviceStatus
message
```

EA0 allowed result:

```txt
allowed = true
state = free_launch_active
freeLaunch = true
paymentRequired = false
deviceStatus = active
```

Denied states:

```txt
device_revoked
blocked
suspended
invalid_device_credentials
```

Rules:

- License check validates platform access only.
- License check does not validate streams, playlists, providers, or sources.
- Payment absence does not block EA0.

## 9. Rate Limit Checklist

Apply rate limits to:

```txt
POST /devices/bootstrap
POST /license/check
```

Recommended later:

```txt
GET /remote-config
GET /app-version
```

Rules:

- Do not reveal exact thresholds.
- Return calm generic rate-limit error.
- Audit repeated failures if enabled.

## 10. Logging Checklist

Logs may include:

```txt
endpoint name
status code
request time
platform
appVersion
deviceId masked if needed
result category
```

Logs must not include:

```txt
raw Activation Key
activationKeyHash
provider credentials
playlist/source payload
stream URLs
```

## 11. Audit Event Checklist

Recommended EA0 events:

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

Audit metadata must be redacted.

## 12. Security Checklist

Required:

```txt
Strong random Activation Key generation
Activation Key hashing
Safe hash comparison
No raw key database storage
No raw key logs
Generic invalid credential response
Environment-based secrets
Revoked/blocked/disabled state support
```

## 13. Future Paid Compatibility Checklist

Do not hardcode free forever logic.

Every license response must support:

```txt
allowed
state
freeLaunch
paymentRequired
message
```

Future paid response must be possible without changing app identity:

```txt
same deviceId
same activationKeyHash record
same DeviceAccessRecord
```

## 14. Endpoint Smoke Test Checklist

Minimum smoke test order:

```txt
1. GET /health returns ok
2. GET /app-version returns EA0 version
3. GET /remote-config returns freeLaunch enabled
4. POST /devices/bootstrap creates DeviceAccessRecord
5. Response includes deviceId + activationKey once
6. Database contains activationKeyHash but not raw Activation Key
7. POST /license/check with returned credentials returns allowed true
8. POST /license/check with wrong key returns invalid_device_credentials
9. Revoked/blocked record returns allowed false
10. Logs contain no raw Activation Key
```

## 15. Stop Conditions

Stop if endpoint implementation adds:

- Customer email/name requirement.
- MAC as primary product ID.
- Payment blocking during EA0.
- Reseller flow.
- Content/provider/source backend fields.
- Stream/channel validation.
- Shared hardcoded Activation Key.
- Raw Activation Key database storage.

## 16. Done Criteria

M37 is done when:

- All five EA0 endpoints have implementation requirements.
- Device bootstrap create/recovery flow is clear.
- License check allowed/denied behavior is clear.
- Rate-limit/logging/audit/security rules are clear.
- Smoke test checklist is ready.
- Future paid transition remains compatible.
- No media-provider behavior is introduced.
