# M46 EA0 TV_Project Alignment Task Group D

Status: Active Draft
Mode: Cross-project alignment planning only. No Android implementation, no production deploy, no live secrets, no payment enforcement.

## 1. Purpose

M46 completes Task Group D from M38.

This group aligns `TV_Project_Platform` with `TV_Project` for EA0 device bootstrap and license check behavior.

This group covers:

- Shared endpoint names.
- Shared request/response fields.
- Local credential storage expectations.
- No hardcoded Activation Key rule.
- Future paid response compatibility.
- App/platform boundary confirmation.

This group does not implement Android code.

## 2. Shared EA0 Model

Approved model:

```txt
Backend generates Device ID
Backend generates Activation Key
Backend stores activationKeyHash only
App stores Device ID + Activation Key locally
License check uses Device ID + Activation Key
```

Rules:

- App must not generate permanent Activation Key as final authority.
- APK must not include shared/global Activation Key.
- Platform must not require customer email/name for EA0.
- MAC must not be primary product identity.

## 3. Shared Endpoint Names

EA0 app-facing endpoints:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

Rules:

- Endpoint names must stay synchronized across both repos.
- App must not invent alternate endpoint names.
- Platform must not silently rename endpoints without handoff.

## 4. POST /devices/bootstrap Shared Contract

Request fields:

```txt
platformDeviceHash
platform
appVersion
existingDeviceId, optional
existingActivationKey, optional
```

Response fields:

```txt
deviceId
activationKey, only on create/recovery rotation
status
licenseState
freeLaunch
paymentRequired
message
```

App expectations:

- If local credentials are missing, call bootstrap.
- If activationKey is returned, store it securely.
- If activationKey is not returned, continue using existing local key.
- Do not log activationKey.

## 5. POST /license/check Shared Contract

Request fields:

```txt
deviceId
activationKey
platform
appVersion
```

Response fields:

```txt
allowed
state
freeLaunch
paymentRequired
deviceId
deviceStatus
message
```

App expectations:

- Respect `allowed` as the main access decision.
- Display or react to `state` safely.
- Treat `paymentRequired` as future-compatible.
- Do not assume free launch is permanent.

## 6. Shared Status Values

Device statuses:

```txt
active
pending
disabled
blocked
revoked
```

License states:

```txt
free_launch_active
active
expired
suspended
device_revoked
blocked
```

Error categories:

```txt
invalid_device_credentials
rate_limited
unsupported_app_version
maintenance_active
device_revoked
access_blocked
license_suspended
feature_disabled
server_error
connection_error
```

Rules:

- App and platform should use the same names.
- App should handle unknown future states gracefully.

## 7. Local Secure Storage Requirement

TV_Project should store locally:

```txt
deviceId
activationKey
```

Rules:

- Preserve credentials during normal app update.
- Avoid plain unprotected storage for Activation Key when possible.
- Do not write Activation Key to logs.
- Do not include Activation Key in crash reports.
- Do not display full Activation Key in normal UI unless later support/recovery flow approves it.

## 8. Reinstall Recovery Alignment

App should provide:

```txt
platformDeviceHash
```

Purpose:

- Best-effort reinstall recovery.

Expected behavior:

```txt
If local credentials are lost and platformDeviceHash matches a recoverable record,
backend keeps the existing Device ID and rotates Activation Key.
```

Limitations:

- Factory reset may break recognition.
- Different Android user/profile may break recognition.
- App signing key changes may break recognition.
- Recovery is best-effort, not guaranteed.

## 9. App Version / Remote Config Alignment

TV_Project should consume:

```txt
GET /app-version
GET /remote-config
```

App should respect:

```txt
minimumSupportedVersion
currentRecommendedVersion
forceUpdate
freeLaunch.enabled
maintenance.enabled
features.licenseCheck.enabled
features.deviceBootstrap.enabled
support.email
terms.version
privacy.version
legalBoundary.version
```

App should ignore or reject any config that behaves like source/content/provider delivery.

## 10. Future Paid Compatibility

The app must support future responses such as:

```txt
allowed = false
state = expired
freeLaunch = false
paymentRequired = true
message = Please activate your license.
```

Rules:

- Do not hardcode free forever.
- Do not hardcode paymentRequired as always false.
- Do not require new Device ID by default when paid phase starts.
- Do not require app reinstall for paid transition.

## 11. Platform / App Boundary

Platform owns:

```txt
Device ID generation
Activation Key generation
activationKeyHash storage
DeviceAccessRecord
license/access response
remote config
app version policy
```

TV_Project owns:

```txt
Android UI
local secure storage
startup flow
license response handling
first-run screen
TV remote UX
```

Rules:

- Platform docs should not dictate detailed Android screen implementation.
- App docs should not redefine platform policy or endpoint names.

## 12. Forbidden Cross-Project Drift

Stop if either repo adds:

- Customer email/name requirement for EA0.
- MAC as primary product identity.
- Shared hardcoded Activation Key in APK.
- App-generated permanent Activation Key as final authority.
- Provider/source/playlist data in bootstrap/license calls.
- Payment blocking during EA0.
- Reseller flow before approval.

## 13. Group D Done Criteria

Task Group D is complete when:

- Shared endpoint names are confirmed.
- Shared request/response fields are confirmed.
- Shared status/error values are confirmed.
- App local storage responsibilities are clear.
- Reinstall recovery expectations are clear.
- Future paid response compatibility is clear.
- Platform/app ownership boundary is clear.
