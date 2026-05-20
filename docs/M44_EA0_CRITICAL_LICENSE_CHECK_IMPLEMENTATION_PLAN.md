# M44 EA0 Critical License Check Implementation Plan

Status: Active Draft
Mode: Critical single-task planning only. No production deploy, no live secrets, no payment enforcement, no reseller workflow.

## 1. Purpose

M44 isolates the License Check implementation plan.

This is a critical single task because `/license/check` decides whether an app/device may operate.

It controls:

- Device credential verification.
- Free launch access.
- Disabled / blocked / revoked device behavior.
- Future paid licensing behavior.
- Safe denial without leaking credential details.

## 2. Endpoint

```txt
POST /license/check
```

Purpose:

- Validate Device ID plus Activation Key.
- Return current access decision.
- Update lastSeenAt.
- Preserve future paid licensing compatibility.

## 3. Request Fields

Expected request:

```txt
deviceId
activationKey
platform
appVersion
```

Rules:

- `deviceId` is required.
- `activationKey` is required.
- `platform` is required.
- `appVersion` is required.
- No customer email/name fields are accepted.
- No MAC address is accepted as primary identity.
- No provider/source/profile fields are accepted.

## 4. Response Fields

Allowed response fields:

```txt
allowed
state
freeLaunch
paymentRequired
deviceId
deviceStatus
message
```

Optional response fields later:

```txt
paidUntil
minimumSupportedVersion
forceUpdate
supportEmail
```

Rules:

- Never return Activation Key.
- Never return activationKeyHash.
- Never return raw internal error details.
- Never return provider/source/playlist data.

## 5. Validation Flow

Flow:

```txt
1. Validate required fields.
2. Apply rate limit.
3. Check maintenance/emergency flags if enabled.
4. Find DeviceAccessRecord by deviceId.
5. If not found, return generic invalid_device_credentials.
6. Verify activationKey against activationKeyHash.
7. If verification fails, return generic invalid_device_credentials.
8. Check DeviceAccessRecord status.
9. Check licenseState / freeLaunch / paymentRequired.
10. Update lastSeenAt and appVersion if safe.
11. Return access decision.
```

## 6. Valid EA0 Device Behavior

For active free launch device:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

Response:

```json
{
  "allowed": true,
  "state": "free_launch_active",
  "freeLaunch": true,
  "paymentRequired": false,
  "deviceStatus": "active",
  "message": "Free launch access is active."
}
```

## 7. Invalid Credential Behavior

If Device ID is missing, unknown, or Activation Key verification fails:

```json
{
  "allowed": false,
  "state": "invalid_device_credentials",
  "freeLaunch": false,
  "paymentRequired": false,
  "message": "Invalid device credentials."
}
```

Rules:

- Do not reveal whether Device ID or Activation Key failed.
- Do not reveal hash comparison details.
- Do not reveal whether a Device ID exists.

## 8. Disabled / Blocked / Revoked Behavior

Disabled device response:

```txt
allowed = false
state = access_disabled
deviceStatus = disabled
```

Blocked device response:

```txt
allowed = false
state = blocked
deviceStatus = blocked
```

Revoked device response:

```txt
allowed = false
state = device_revoked
deviceStatus = revoked
```

Rules:

- These states may be shown to the app as safe user-facing status.
- Do not include internal owner notes in response.

## 9. Future Paid Behavior

The endpoint must be future-compatible with paid licensing.

Future unpaid/expired response:

```json
{
  "allowed": false,
  "state": "expired",
  "freeLaunch": false,
  "paymentRequired": true,
  "message": "Please activate your license."
}
```

Future paid active response:

```json
{
  "allowed": true,
  "state": "active",
  "freeLaunch": false,
  "paymentRequired": false,
  "message": "License active."
}
```

Rules:

- Do not hardcode free forever.
- Do not assume paymentRequired is always false.
- Do not require new Device ID or new Activation Key for paid transition.

## 10. App Version Compatibility

License check may optionally consider app version status.

If app version is unsupported:

```txt
allowed = false
state = unsupported_app_version
message = Please update the app.
```

Rules:

- Force update should be conservative.
- App version behavior must stay aligned with `/app-version`.
- Unsupported version must not expose internal version policy details.

## 11. Rate Limit Requirement

Rate limit:

```txt
POST /license/check
```

Reason:

- Prevent Activation Key guessing.
- Reduce abuse during public early access.
- Protect backend/database load.

Client response:

```txt
rate_limited
```

Do not reveal exact threshold.

## 12. Logging Rules

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

## 13. Audit Events

Recommended events:

```txt
license.checked
license.denied
```

Optional security event:

```txt
license.invalid_credentials_limited
```

Audit metadata may include:

```txt
deviceId
platform
appVersion
result category
```

Audit metadata must be redacted.

## 14. Emergency / Remote Config Respect

Before returning allowed access, backend should respect:

```txt
features.licenseCheck.enabled
emergency.disableLicenseGranting
maintenance.enabled
```

If disabled, return safe feature-disabled or maintenance response.

## 15. No-Content Boundary

License check must never:

- Validate streams.
- Validate playlists.
- Validate provider accounts.
- Check channel package entitlement.
- Inspect user source data.
- Return media/source/provider data.

License check validates platform/device access only.

## 16. Stop Conditions

Stop immediately if implementation adds:

- Raw Activation Key logs.
- activationKeyHash returned to client.
- Device ID-only access.
- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during EA0 without approval.
- Reseller logic.
- Content/provider/source validation.
- Stream/channel package checks.

## 17. Acceptance Criteria

M44 is acceptable when:

- License check validation flow is clear.
- Valid EA0 device returns free_launch_active.
- Invalid credentials return generic denial.
- Disabled/blocked/revoked states are clear.
- Future paid states are supported.
- Rate-limit/logging/audit rules are clear.
- No out-of-scope provider behavior is introduced.
