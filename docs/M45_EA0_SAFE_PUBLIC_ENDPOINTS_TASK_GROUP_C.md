# M45 EA0 Safe Public Endpoints Task Group C

Status: Active Draft
Mode: Endpoint planning only. No production deploy, no live secrets, no payment enforcement, no reseller workflow.

## 1. Purpose

M45 completes Task Group C from M38.

This group covers the safe public/read-only EA0 endpoints before critical credential endpoints are implemented.

Included endpoints:

```txt
GET /health
GET /app-version
GET /remote-config
```

Not included in this group:

```txt
POST /devices/bootstrap
POST /license/check
```

Reason:

- Bootstrap and license check touch Activation Key handling and access decisions.
- They must remain critical single tasks.

## 2. Group C Scope

This group defines:

- Public endpoint response shapes.
- Read-only database behavior.
- Safe fallback behavior.
- Frontend/app compatibility.
- No-secret/no-content boundary.
- Smoke test expectations.

This group does not define:

- Activation Key generation.
- Activation Key hashing.
- DeviceAccessRecord creation.
- License access decision logic.

## 3. Shared Public Endpoint Rules

All Group C endpoints must:

- Be safe for app startup.
- Return predictable JSON.
- Avoid secrets.
- Avoid stack traces.
- Avoid database internals.
- Avoid source/content/provider values.
- Work before customer portal exists.

## 4. GET /health

Purpose:

- Confirm backend reachability.

Response:

```json
{
  "ok": true,
  "data": {
    "status": "ok",
    "service": "nexora-platform",
    "scope": "ea0"
  },
  "error": null
}
```

Database behavior:

```txt
No database read required
No database write required
```

Rules:

- No auth required.
- No infrastructure detail.
- No build secrets.
- No deployment metadata unless explicitly approved.

Done when:

- App can confirm API is reachable.
- Response is stable and safe.

## 5. GET /app-version

Purpose:

- Tell the app version policy.

Query:

```txt
platform
version
channel, optional
```

Read source:

```txt
AppVersion
```

Response data:

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

Recommended response:

```json
{
  "ok": true,
  "data": {
    "platform": "android_tv",
    "requestedVersion": "0.1.0",
    "currentRecommendedVersion": "0.1.0",
    "minimumSupportedVersion": "0.1.0",
    "forceUpdate": false,
    "updateUrl": "",
    "releaseNotes": "EA0 free launch build",
    "freeLaunch": true
  },
  "error": null
}
```

Rules:

- `forceUpdate` starts false.
- `updateUrl` may be empty until APK download path is approved.
- Missing AppVersion record should return safe fallback or controlled error.
- No content/source/provider values.

Done when:

- Android TV EA0 version seed is readable.
- App can understand whether update is required.
- Force update does not accidentally block early testers.

## 6. GET /remote-config

Purpose:

- Provide safe runtime flags.

Query:

```txt
platform
version
channel, optional
```

Read source:

```txt
RemoteConfig
```

Allowed response areas:

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

Recommended response:

```json
{
  "ok": true,
  "data": {
    "freeLaunch": { "enabled": true },
    "maintenance": { "enabled": false, "message": "" },
    "features": {
      "licenseCheck": { "enabled": true },
      "deviceBootstrap": { "enabled": true },
      "diagnostics": { "enabled": true },
      "support": { "enabled": true }
    },
    "support": { "email": "project@thenightssecret.com" },
    "termsVersion": "1.0",
    "privacyVersion": "1.0",
    "legalBoundaryVersion": "1.0",
    "emergency": {
      "forceReadOnlyMode": false,
      "disableDeviceBootstrap": false,
      "disableLicenseGranting": false
    }
  },
  "error": null
}
```

Rules:

- Return only approved safe keys.
- Unknown unsafe keys must not be returned.
- Remote config must not become source/content delivery.
- Maintenance state must be app-readable.

Done when:

- App receives freeLaunch enabled.
- App receives safe feature flags.
- App receives support/legal versions.
- No unsafe config leaks.

## 7. Shared Error Format

Recommended error response:

```json
{
  "ok": false,
  "data": null,
  "error": {
    "code": "invalid_request",
    "message": "Invalid request."
  }
}
```

Allowed Group C error codes:

```txt
invalid_request
unsupported_platform
maintenance_active
server_error
```

Rules:

- Do not expose stack trace.
- Do not expose database errors.
- Do not expose secret names.

## 8. Safe Fallback Behavior

If AppVersion seed is missing:

```txt
Return controlled server_error or safe default.
Do not crash.
Do not expose database internals.
```

If RemoteConfig seed is missing:

```txt
Return safe default values.
Do not enable risky features by accident.
```

Safe defaults:

```txt
freeLaunch.enabled = true for EA0
maintenance.enabled = false unless emergency config says otherwise
features.licenseCheck.enabled = true
features.deviceBootstrap.enabled = true
forceUpdate = false
```

## 9. Logging Rules

Logs may include:

```txt
endpoint
platform
version
channel
status code
result category
timestamp
```

Logs must not include:

```txt
Activation Key
Activation Key hash
private tokens
provider/source/profile values
```

## 10. Group C Smoke Test

Minimum smoke test:

```txt
1. GET /health returns ok.
2. GET /app-version?platform=android_tv&version=0.1.0 returns EA0 metadata.
3. GET /remote-config?platform=android_tv&version=0.1.0 returns freeLaunch enabled.
4. No response includes secrets.
5. No response includes content/source/provider values.
6. Missing/unknown platform returns safe error or safe fallback.
```

## 11. TV_Project Alignment

TV_Project should consume:

```txt
GET /health
GET /app-version
GET /remote-config
```

The app should not expect:

```txt
customer email login
MAC identity
payment-required first run
provider/source config
```

## 12. Critical Work Still Separate

Still separate critical single tasks:

```txt
Activation Key generation
Device bootstrap implementation
License check implementation
Production database migration
Production deploy
```

## 13. Stop Conditions

Stop if Group C adds:

- Customer identity creation.
- Activation Key handling.
- Payment blocking.
- Reseller flow.
- Source/content/provider config.
- Stream/channel package values.
- Production deployment.

## 14. Acceptance Criteria

M45 is acceptable when:

- Health endpoint plan is clear.
- AppVersion endpoint plan is clear.
- RemoteConfig endpoint plan is clear.
- Response shapes are app-compatible.
- Safe fallbacks are defined.
- Smoke test is ready.
- No credential logic is mixed into this group.
