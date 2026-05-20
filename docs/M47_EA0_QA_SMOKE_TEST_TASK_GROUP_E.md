# M47 EA0 QA / Smoke Test Task Group E

Status: Active Draft
Mode: QA planning only. No production deploy, no public APK release, no payment enforcement, no reseller workflow.

## 1. Purpose

M47 completes Task Group E from M38.

This group defines the QA and smoke test plan for EA0 after database, backend foundation, public endpoints, device bootstrap, and license check planning are ready.

Goal:

```txt
Prove EA0 backend + app handoff works safely before any public early access distribution.
```

## 2. Scope

This group covers:

- API smoke test checklist.
- Database verification checklist.
- App bootstrap test checklist.
- Reinstall recovery test checklist.
- Log redaction test checklist.
- Future paid compatibility test checklist.

This group does not execute:

- Production database test.
- Public APK distribution.
- Payment enforcement.
- Reseller workflow.
- Customer portal launch.

## 3. Test Environments

Recommended order:

```txt
development
staging
production, later only after approval
```

Rules:

- Do not test public users on development.
- Do not connect APK public download to unverified database.
- Do not use production secrets in development/staging.
- Do not run destructive tests after public EA0 users exist.

## 4. API Smoke Test Checklist

Required test order:

```txt
1. GET /health
2. GET /app-version
3. GET /remote-config
4. POST /devices/bootstrap
5. POST /license/check
```

Pass criteria:

- `/health` returns ok.
- `/app-version` returns EA0 metadata.
- `/remote-config` returns freeLaunch enabled.
- `/devices/bootstrap` creates one DeviceAccessRecord.
- `/license/check` allows the returned Device ID + Activation Key.

Fail conditions:

- Any endpoint returns stack trace.
- Any endpoint exposes internal database details.
- Any endpoint exposes raw Activation Key outside allowed bootstrap create/recovery response.
- Any endpoint returns content/source/provider values.

## 5. Database Verification Checklist

After first bootstrap, verify database contains:

```txt
deviceId
platformDeviceHash, if provided
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
```

Database must not contain:

```txt
raw Activation Key
plain Activation Key
customer email/name requirement
MAC as primary identity
provider/source/profile payload
watch history
```

Pass criteria:

- DeviceAccessRecord exists.
- deviceId is unique.
- activationKeyHash exists.
- raw Activation Key does not exist.
- freeLaunch is true.
- paymentRequired is false.

## 6. App Bootstrap Test Checklist

Fresh install test:

```txt
1. App has no local Device ID / Activation Key.
2. App calls /devices/bootstrap.
3. Backend returns Device ID + Activation Key once.
4. App stores both locally.
5. App calls /license/check.
6. Access is allowed.
```

Expected result:

```txt
allowed = true
state = free_launch_active
freeLaunch = true
paymentRequired = false
```

Pass criteria:

- App does not require customer email/name.
- App does not ask for MAC as primary identity.
- App does not require payment.
- App does not send provider/source/playlist values.

## 7. Repeated Launch Test Checklist

Repeated launch test:

```txt
1. App already has local Device ID + Activation Key.
2. App calls /license/check.
3. Access is allowed.
4. App should not create duplicate DeviceAccessRecord.
```

Pass criteria:

- Existing Device ID remains the same.
- No duplicate database record is created.
- Activation Key is not returned again unnecessarily.

## 8. Reinstall Recovery Test Checklist

Reinstall simulation:

```txt
1. Remove local app credentials in test environment.
2. Keep platformDeviceHash stable if possible.
3. App calls /devices/bootstrap.
4. Backend finds existing record by platformDeviceHash.
5. Backend keeps existing Device ID.
6. Backend rotates Activation Key.
7. App stores new Activation Key.
8. Old Activation Key fails license check.
9. New Activation Key passes license check.
```

Pass criteria:

- Device ID continuity is preserved when recovery works.
- New Activation Key is returned once.
- Old Activation Key becomes invalid.
- lastRecoveredAt updates.

Known limitation:

```txt
Recovery is best-effort, not guaranteed after factory reset, signing key change, or Android user/profile change.
```

## 9. Invalid Credential Test Checklist

Test cases:

```txt
unknown deviceId + random activationKey
valid deviceId + wrong activationKey
missing deviceId
missing activationKey
```

Expected response:

```txt
allowed = false
state = invalid_device_credentials
message = Invalid device credentials.
```

Rules:

- Do not reveal whether Device ID or Activation Key failed.
- Do not expose hash details.
- Do not expose database lookup details.

## 10. Disabled / Blocked / Revoked Test Checklist

Test status changes:

```txt
status = disabled
status = blocked
status = revoked
```

Expected:

- disabled returns allowed false.
- blocked returns allowed false.
- revoked returns allowed false.
- response does not expose owner notes.

Pass criteria:

- App can show safe state.
- Backend does not leak internal reason details.

## 11. Log Redaction Test Checklist

Inspect backend logs after bootstrap and license check.

Logs may contain:

```txt
endpoint
platform
appVersion
deviceId masked if needed
result category
timestamp
```

Logs must not contain:

```txt
raw Activation Key
activationKeyHash
full sensitive request body
provider/source/profile values
```

Pass criteria:

- Raw Activation Key appears only in allowed response to app on create/recovery, not in logs.
- Hash values are not logged.

## 12. Remote Config Safety Test Checklist

Verify `/remote-config` returns only safe values:

```txt
freeLaunch
maintenance
features
support
termsVersion
privacyVersion
legalBoundaryVersion
emergency
```

Must not return:

```txt
content/source/provider values
stream or playlist delivery values
private secrets
```

Pass criteria:

- App receives required flags.
- Unsafe keys are filtered or absent.

## 13. Future Paid Compatibility Test Checklist

Simulate future paid response shape in staging only:

```txt
allowed = false
state = expired
freeLaunch = false
paymentRequired = true
message = Please activate your license.
```

Pass criteria:

- App does not crash.
- App does not assume freeLaunch is always true.
- App does not require new Device ID.
- Backend identity remains same DeviceAccessRecord.

## 14. Public Release Gate

Before public EA0 APK distribution, confirm:

```txt
All API smoke tests passed
Database verification passed
Fresh install bootstrap passed
Repeated launch passed
Invalid credential tests passed
Revoked/blocked tests passed
Log redaction passed
Remote config safety passed
Future paid compatibility passed
```

No public release if:

- Raw Activation Key appears in logs/database.
- Duplicate records appear during repeated launch.
- License check allows invalid credentials.
- Payment blocks free launch.
- App requires customer email/name.
- App sends provider/source/profile data.

## 15. Critical Tests Still Separate

These must be done as single controlled actions:

```txt
Staging database smoke test
Production database smoke test
Public APK download enablement
Production deploy
```

## 16. Stop Conditions

Stop if QA reveals:

- Raw Activation Key stored or logged.
- activationKeyHash exposed to client.
- Duplicate DeviceAccessRecord creation on normal launch.
- Device ID changes during normal update.
- Payment blocking during EA0.
- Customer email/name requirement.
- MAC as primary product identity.
- Out-of-scope content/provider/source behavior.

## 17. Group E Done Criteria

Task Group E is complete when:

- QA checklist is ready.
- Smoke test order is clear.
- Database verification is clear.
- App bootstrap/reinstall tests are clear.
- Log redaction test is clear.
- Public release gate is clear.
- Critical live tests remain isolated.
