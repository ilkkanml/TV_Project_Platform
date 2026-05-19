# M34 EA0 Backend Implementation Plan

Status: Active Draft
Mode: Implementation planning only. No production deploy, no payment enforcement, no reseller workflow.

## 1. Purpose

M34 defines the smallest backend implementation plan for EA0.

EA0 means:

- Download-only early access.
- Backend creates Device ID and Activation Key.
- Database starts forming future customer/device/license records.
- Free launch access is active.
- Website/customer portal can come later.

## 2. Required EA0 Backend Scope

Build only these backend areas first:

- Health check.
- App version metadata.
- Remote config.
- Device bootstrap.
- License check.
- DeviceAccessRecord database model.
- Basic audit, recommended.

Do not build first:

- Customer portal.
- Payment enforcement.
- Reseller workflow.
- Credit ledger.
- Advanced analytics.
- Content/provider/source systems.

## 3. Database Model

EA0 starts with one compact record:

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
lastRecoveredAt
createdAt
updatedAt
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
deviceId unique
platformDeviceHash lookup
status lookup
lastSeenAt lookup
```

## 4. Required Endpoints

Implement in this order:

```txt
1. GET /health
2. GET /app-version
3. GET /remote-config
4. POST /devices/bootstrap
5. POST /license/check
```

## 5. Health Endpoint

`GET /health` returns simple service status.

Rules:

- No internal infrastructure details.
- No database dump.
- No private values.

## 6. App Version Endpoint

`GET /app-version` returns:

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

- Force update starts false.
- No content/source/provider data.

## 7. Remote Config Endpoint

`GET /remote-config` returns safe runtime flags only.

Initial safe keys:

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

Rules:

- Unknown unsafe keys are not returned.
- Runtime config must not become content/source delivery.

## 8. Device Bootstrap Endpoint

`POST /devices/bootstrap` creates or recovers a DeviceAccessRecord.

Input fields:

```txt
platformDeviceHash
platform
appVersion
existingDeviceId, optional
existingActivationKey, optional
```

Behavior:

1. Validate basic input.
2. If existing credentials are valid, update lastSeenAt and return current state.
3. If local credentials are missing, check platformDeviceHash for recovery.
4. If recovery matches, keep existing Device ID and rotate Activation Key.
5. If no record exists, create new Device ID and new Activation Key.
6. Store only activationKeyHash.
7. Return raw Activation Key only on create/recovery.

Output fields:

```txt
deviceId
activationKey, only when newly generated or rotated
status
licenseState
freeLaunch
paymentRequired
message
```

## 9. License Check Endpoint

`POST /license/check` validates app access.

Input fields:

```txt
deviceId
activationKey
platform
appVersion
```

Behavior:

1. Find DeviceAccessRecord by deviceId.
2. Verify Activation Key against stored hash.
3. Check device status.
4. Check license state.
5. Update lastSeenAt.
6. Return access decision.

Output fields:

```txt
allowed
state
freeLaunch
paymentRequired
deviceId
deviceStatus
message
```

Free launch active behavior:

```txt
allowed = true
state = free_launch_active
freeLaunch = true
paymentRequired = false
```

## 10. Security Rules

Required:

- Backend generates Activation Keys.
- Store only hashed Activation Key.
- Do not store raw Activation Key.
- Do not log raw Activation Key.
- Use generic invalid credential errors.
- Rate-limit bootstrap and license check.
- Support disabled / blocked / revoked states.

Recommended:

- Store only masked Activation Key hint.
- Rotate key during reinstall recovery.
- Add audit events.
- Redact sensitive request fields from logs.

## 11. Error Codes

EA0 error codes:

```txt
invalid_device_credentials
rate_limited
unsupported_app_version
maintenance_active
device_revoked
access_blocked
license_suspended
connection_error
server_error
```

## 12. Future Paid Compatibility

EA0 must not be coded as permanently free.

The app and backend must continue using:

```txt
allowed
state
freeLaunch
paymentRequired
message
```

Future paid licensing will attach to the same DeviceAccessRecord.

Later payment fields may include:

```txt
planId
paymentStatus
paidUntil
paymentProviderCustomerId
subscriptionId
lastPaymentAt
renewalStatus
```

## 13. Stop Conditions

Stop if implementation starts adding:

- Customer email/name requirement.
- MAC as primary product ID.
- Payment blocking during EA0.
- Reseller flow.
- Content/provider/source backend storage.
- Stream testing.
- Channel/package management.
- Shared hardcoded Activation Key in APK.

## 14. EA0 Backend Done Criteria

EA0 backend is done when:

- `/health` works.
- `/app-version` returns safe version metadata.
- `/remote-config` returns safe config.
- `/devices/bootstrap` creates and recovers records.
- `/license/check` validates Device ID + Activation Key.
- Raw Activation Key is not stored or logged.
- Database records form correctly.
- Free launch access works.
- Records can transition to paid licensing later.
- No media-provider behavior exists.
