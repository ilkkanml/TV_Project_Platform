# M39 EA0 Backend Foundation Task Group A

Status: Active Draft
Mode: Backend foundation planning only. No production deploy, no live secrets, no payment enforcement, no reseller workflow.

## 1. Purpose

M39 completes Task Group A from M38.

This group prepares the backend foundation before touching critical credential logic.

This group includes:

- Backend module map.
- Environment/config plan.
- Health endpoint scaffold direction.
- Shared response format.
- Shared error code shape.

This group does not implement:

- Activation Key generation.
- Device bootstrap credential flow.
- License validation logic.
- Production database migration.
- Production deployment.

## 2. Backend Foundation Modules

Recommended EA0 backend modules:

```txt
src/config
src/security
src/rateLimit
src/health
src/appVersion
src/remoteConfig
src/deviceAccess
src/license
src/audit
src/shared
```

Meaning:

- `config`: environment variables and safe runtime configuration.
- `security`: key hashing, comparison, redaction helpers later.
- `rateLimit`: request limiting for sensitive endpoints.
- `health`: `/health` endpoint.
- `appVersion`: `/app-version` endpoint.
- `remoteConfig`: `/remote-config` endpoint.
- `deviceAccess`: DeviceAccessRecord business logic later.
- `license`: license check business logic later.
- `audit`: safe event recording.
- `shared`: response helpers, error codes, validation helpers.

## 3. Environment Variable Plan

Required environment groups:

```txt
APP_ENV
API_PORT
DATABASE_URL
ACTIVATION_KEY_HASH_SECRET or hashing configuration
RATE_LIMIT_CONFIG
LOG_LEVEL
CORS_ALLOWED_ORIGINS
```

Rules:

- Never commit real secrets.
- Use `.env.example` only with placeholders.
- Production secrets must live outside repo.
- Logs must redact Activation Key values.

## 4. Environment Separation

Use three environments:

```txt
development
staging
production
```

EA0 public testing should happen only after development and staging smoke tests pass.

Rules:

- Do not connect first public APK users to an untested database.
- Do not mix staging and production records.
- Do not reuse production secrets in development.

## 5. Health Endpoint Foundation

Endpoint:

```txt
GET /health
```

Response shape:

```json
{
  "status": "ok",
  "service": "nexora-platform",
  "scope": "ea0"
}
```

Rules:

- No authentication required.
- No secrets returned.
- No database internals returned.
- No version control or server details returned unless explicitly approved.

## 6. Shared Response Format

Recommended success response shape:

```json
{
  "ok": true,
  "data": {},
  "error": null
}
```

Recommended error response shape:

```json
{
  "ok": false,
  "data": null,
  "error": {
    "code": "invalid_device_credentials",
    "message": "Invalid device credentials."
  }
}
```

Rules:

- Error messages must be calm and generic.
- Do not expose stack traces.
- Do not expose hash/secret details.
- Do not reveal whether Device ID or Activation Key failed.

## 7. Shared Error Codes

EA0 error codes:

```txt
invalid_request
invalid_device_credentials
rate_limited
unsupported_app_version
maintenance_active
device_revoked
access_blocked
license_suspended
feature_disabled
server_error
```

Future-compatible paid codes:

```txt
license_expired
payment_required
subscription_inactive
```

Do not use error codes that reveal secret validation internals.

## 8. Shared Platform Values

Initial platform values:

```txt
android_tv
fire_tv
```

EA0 first implementation may only enable:

```txt
android_tv
```

Future platforms should remain data-compatible but not be implemented early without need.

## 9. Shared Status Values

Device/access status values:

```txt
active
pending
disabled
blocked
revoked
```

License state values:

```txt
free_launch_active
active
expired
suspended
device_revoked
blocked
```

Rules:

- Do not invent app-only names outside shared contract.
- Keep values synchronized with TV_Project handoff.

## 10. Request Validation Foundation

Validation helpers should support:

```txt
platform
appVersion
deviceId
activationKey
platformDeviceHash
```

Rules:

- Validate required fields before database access.
- Keep error messages generic.
- Do not log raw request bodies for sensitive endpoints.

## 11. Redaction Foundation

Redact these fields from logs and audit metadata:

```txt
activationKey
activationKeyHash
password
token
secret
provider credentials
playlist/source payload
stream URL
```

Allowed safe log fields:

```txt
endpoint
status code
platform
appVersion
deviceId masked if needed
result category
timestamp
```

## 12. Rate Limit Foundation

Sensitive endpoints later requiring rate limit:

```txt
POST /devices/bootstrap
POST /license/check
```

Recommended future additional limits:

```txt
POST /customer-access/login
POST /owner/login
```

Rules:

- Do not expose exact thresholds to client.
- Return `rate_limited` with calm message.
- Log repeated abuse without secrets.

## 13. Critical Work Not Included In This Group

The following must be handled as separate critical tasks:

```txt
Activation Key generation
Activation Key hashing implementation
Device bootstrap implementation
License check implementation
Production database migration
Production deployment
```

Reason:

- These can affect security, access continuity, or secret exposure.

## 14. Group A Done Criteria

Task Group A is complete when:

- Backend module map is clear.
- Environment/config plan is clear.
- Health endpoint response shape is clear.
- Shared response format is clear.
- Error code vocabulary is clear.
- Redaction and rate-limit foundations are defined.
- No critical credential logic has been mixed into the group.
