# M43 EA0 Critical Device Bootstrap Implementation Plan

Status: Active Draft
Mode: Critical single-task planning only. No production deploy, no live secrets, no payment enforcement, no reseller workflow.

## 1. Purpose

M43 isolates the Device Bootstrap implementation plan.

This is a critical single task because `/devices/bootstrap` is the first endpoint that creates or recovers real device/customer access records.

It controls:

- First app launch identity.
- DeviceAccessRecord creation.
- Device ID continuity.
- Activation Key return rules.
- Reinstall recovery.
- Future paid license continuity.

## 2. Endpoint

```txt
POST /devices/bootstrap
```

Purpose:

- Create a new DeviceAccessRecord when the app has no local credentials.
- Validate existing local credentials when available.
- Recover an existing record through platformDeviceHash when possible.
- Return free launch access state.

## 3. Request Fields

Expected request:

```txt
platformDeviceHash
platform
appVersion
existingDeviceId, optional
existingActivationKey, optional
```

Rules:

- `platform` is required.
- `appVersion` is required.
- `platformDeviceHash` is recommended for recovery.
- Existing credentials are optional.
- No email/name fields are accepted.
- No provider/source/profile fields are accepted.

## 4. Response Fields

Common response:

```txt
deviceId
status
licenseState
freeLaunch
paymentRequired
message
```

Only on create/recovery rotation:

```txt
activationKey
```

Rules:

- Do not return Activation Key on normal existing-credential validation.
- Do not return activationKeyHash ever.
- Do not expose platformDeviceHash back unless explicitly needed for diagnostics.

## 5. Path A — Existing Credentials Valid

When request includes:

```txt
existingDeviceId
existingActivationKey
```

Flow:

```txt
1. Find DeviceAccessRecord by existingDeviceId.
2. If not found, continue to recovery/new-record path.
3. Verify existingActivationKey against activationKeyHash.
4. If valid, update appVersion and lastSeenAt.
5. Return current access state.
6. Do not return activationKey.
```

Expected result:

```txt
Same Device ID continues.
No duplicate record created.
No Activation Key rotation needed.
```

## 6. Path B — Recovery By platformDeviceHash

When local credentials are missing or invalid, and platformDeviceHash matches a recoverable record:

Flow:

```txt
1. Find DeviceAccessRecord by platformDeviceHash.
2. Confirm record is recoverable.
3. Keep existing Device ID.
4. Generate new Activation Key.
5. Store new activationKeyHash.
6. Store new activationKeyHint.
7. Set lastRecoveredAt.
8. Update appVersion and lastSeenAt.
9. Return existing Device ID and new raw Activation Key once.
```

Expected result:

```txt
Same Device ID is preserved.
Old Activation Key becomes invalid.
App receives new Activation Key once.
```

Recovery is best-effort and not guaranteed.

## 7. Path C — New Record

When no existing credentials are valid and no platformDeviceHash match exists:

Flow:

```txt
1. Generate unique Device ID.
2. Generate strong Activation Key.
3. Hash Activation Key.
4. Create activationKeyHint.
5. Create DeviceAccessRecord.
6. Set EA0 defaults.
7. Return Device ID and raw Activation Key once.
```

EA0 defaults:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

Expected result:

```txt
New early access device/customer record is created.
App stores Device ID and Activation Key locally.
```

## 8. Duplicate Prevention

Bootstrap must prevent accidental duplicates.

Rules:

- Existing valid credentials must not create a new record.
- platformDeviceHash match should recover when safe.
- deviceId uniqueness must be enforced by database.
- If Device ID generation collides, generate again.

## 9. Rate Limit Requirement

Rate limit:

```txt
POST /devices/bootstrap
```

Reason:

- Prevent abuse.
- Prevent rapid fake record creation.
- Protect Activation Key generation flow.

Client response:

```txt
rate_limited
```

Do not reveal exact threshold.

## 10. Logging Rules

Logs may include:

```txt
endpoint
platform
appVersion
result category
deviceId masked if needed
timestamp
```

Logs must not include:

```txt
activationKey
activationKeyHash
full sensitive request body
```

## 11. Audit Events

Recommended events:

```txt
device_access.created
device_access.recovered
device_access.key_rotated
device.bootstrap.success
device.bootstrap.failed_limited
```

Audit metadata must be redacted.

## 12. Failure Behavior

Use generic safe errors:

```txt
invalid_request
invalid_device_credentials
rate_limited
feature_disabled
server_error
```

Do not reveal:

- Device ID exists but Activation Key failed.
- Hash comparison details.
- Database internals.
- Exact rate-limit thresholds.

## 13. Remote Config / Emergency Respect

Before creating/recovering records, backend should respect:

```txt
features.deviceBootstrap.enabled
emergency.disableDeviceBootstrap
maintenance.enabled
```

If disabled, return safe feature-disabled or maintenance response.

## 14. Future Paid Compatibility

Bootstrap must not assume free forever.

It must return:

```txt
freeLaunch
paymentRequired
licenseState
```

Future paid transition should not require replacing:

```txt
deviceId
activationKeyHash
DeviceAccessRecord
```

## 15. Stop Conditions

Stop immediately if implementation adds:

- Raw Activation Key storage.
- Raw Activation Key logs.
- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during EA0.
- Reseller flow.
- Content/provider/source data collection.
- Shared hardcoded Activation Key in APK.

## 16. Acceptance Criteria

M43 is acceptable when:

- Device bootstrap create flow is clear.
- Existing credential validation flow is clear.
- Reinstall recovery flow is clear.
- Activation Key return rules are clear.
- Duplicate prevention is clear.
- Logging/audit redaction is clear.
- Future paid licensing remains compatible.
- No out-of-scope provider behavior is introduced.
