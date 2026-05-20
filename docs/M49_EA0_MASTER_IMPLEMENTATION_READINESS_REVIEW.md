# M49 EA0 Master Implementation Readiness Review

Status: Active Draft
Mode: Final readiness review only. No production deploy, no live database migration, no payment enforcement, no reseller workflow.

## 1. Purpose

M49 consolidates the EA0 planning chain and checks whether the project is ready to move from planning into controlled implementation.

EA0 target:

```txt
Download-only early access
Backend-generated Device ID
Backend-generated Activation Key
Database stores activationKeyHash only
App stores Device ID + Activation Key locally
License check grants free launch access
Future paid licensing can attach to the same records
```

## 2. Reviewed Planning Range

This review covers:

```txt
M31 EA0 Database Bootstrap
M32 EA0 to Paid License Transition
M33 EA0 Final Launch Checklist
M34 EA0 Backend Implementation Plan
M35 EA0 Database Schema Blueprint
M36 EA0 Database Setup and Seed Plan
M37 EA0 Backend Endpoint Implementation Checklist
M38 EA0 Grouped Task Execution Plan
M39 Backend Foundation Group A
M40 Database Preparation Group B
M41 Critical Database Schema / Migration Plan
M42 Critical Activation Key Generation / Hashing Plan
M43 Critical Device Bootstrap Implementation Plan
M44 Critical License Check Implementation Plan
M45 Safe Public Endpoints Group C
M46 TV_Project Alignment Group D
M47 QA / Smoke Test Group E
M48 Download-Only Preparation Group F
```

## 3. Final EA0 Architecture Decision

Approved architecture:

```txt
App starts
App checks local Device ID + Activation Key
If missing, app calls POST /devices/bootstrap
Backend creates or recovers DeviceAccessRecord
Backend returns Device ID + Activation Key once
App stores credentials locally
App calls POST /license/check
Backend returns free_launch_active if valid
```

Rules:

- No email/name required.
- No MAC as primary identity.
- No payment blocking during EA0.
- No reseller workflow during EA0.
- No content/provider/source backend behavior.

## 4. Implementation Readiness Status

Readiness status:

```txt
READY FOR CONTROLLED IMPLEMENTATION PLANNING
NOT READY FOR PUBLIC RELEASE YET
```

Meaning:

- The project may start implementation work in development/staging.
- Production deploy is not approved by this document.
- Public APK distribution is not approved by this document.
- Live database migration is not approved by this document.

## 5. Ready Items

The following are ready at planning level:

```txt
DeviceAccessRecord model
AppVersion model
RemoteConfig model
AuditLog model
/health endpoint plan
/app-version endpoint plan
/remote-config endpoint plan
/devices/bootstrap endpoint plan
/license/check endpoint plan
Activation Key hash-only rule
Reinstall recovery rule
Future paid transition rule
TV_Project handoff
QA/smoke test plan
Download-only release preparation
```

## 6. Not Yet Approved Items

The following are not approved yet:

```txt
Production database migration
Production backend deploy
Public APK download enablement
Payment enforcement
Reseller system
Customer portal implementation
Owner dashboard implementation
Profile sync backend
Real customer payment collection
```

## 7. Critical Implementation Order

Recommended implementation order:

```txt
1. Create development/staging backend foundation
2. Add config/env placeholder structure
3. Add database schema in development only
4. Seed AppVersion and RemoteConfig in development only
5. Implement GET /health
6. Implement GET /app-version
7. Implement GET /remote-config
8. Implement Activation Key generation/hash helpers
9. Implement POST /devices/bootstrap
10. Implement POST /license/check
11. Run development smoke tests
12. Run staging smoke tests
13. Align TV_Project app integration
14. Prepare APK download-only release gate
```

## 8. Critical Single Tasks Still Requiring Care

These must remain single controlled tasks during implementation:

```txt
Actual database migration
Activation Key generation/hash helper implementation
Device bootstrap implementation
License check implementation
Log redaction verification
Staging smoke test
Production smoke test
Public APK release enablement
```

Do not bundle these casually with unrelated changes.

## 9. Security Readiness Check

Security decisions are ready:

```txt
Activation Key backend-generated
Activation Key hash-only database storage
Raw Activation Key returned only once
Raw Activation Key not logged
activationKeyHash never returned to clients
Generic invalid credential errors
Rate limit bootstrap and license check
Redacted audit metadata
```

Security blockers before public release:

```txt
Confirm logs do not contain raw Activation Key
Confirm database has no raw Activation Key field
Confirm wrong key fails license check
Confirm rate limit behavior exists
Confirm no shared hardcoded Activation Key in APK
```

## 10. App Alignment Readiness Check

TV_Project alignment is ready at handoff level.

App must implement:

```txt
Call /devices/bootstrap when local credentials are missing
Store Device ID + Activation Key locally
Call /license/check with Device ID + Activation Key
Preserve credentials across normal update
Use platformDeviceHash for best-effort recovery
Handle free_launch_active
Handle future paymentRequired response
```

App must not implement:

```txt
Shared hardcoded Activation Key
Email/name requirement for EA0
MAC as primary identity
Free forever hardcoding
Provider/source upload to platform identity endpoints
```

## 11. Database Readiness Check

Database design is ready at planning level.

Required EA0 records:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog
```

Must verify during implementation:

```txt
unique(deviceId)
index(platformDeviceHash)
activationKeyHash required
raw Activation Key absent
AppVersion seed readable
RemoteConfig seed readable
AuditLog redacted
```

## 12. Future Paid Transition Readiness

Future paid transition is protected.

The same EA0 record can later support:

```txt
paymentRequired = true
licenseState = expired / active / suspended
paidUntil
subscriptionId
paymentProviderCustomerId
```

Do not require by default:

```txt
new Device ID
new Activation Key
app reinstall
customer email/name registration
```

## 13. QA Gate Before Public EA0

Public EA0 cannot begin until these pass:

```txt
Development smoke test passed
Staging smoke test passed
Fresh install bootstrap passed
Repeated launch no-duplicate test passed
Reinstall recovery test passed where possible
Invalid credentials test passed
Revoked/blocked state test passed
Log redaction test passed
Future paid response simulation passed
TV_Project app integration test passed
```

## 14. Release Gate Before Public APK Link

Before public APK download is enabled:

```txt
APK version matches AppVersion
updateUrl is official and controlled
RemoteConfig freeLaunch.enabled = true
features.deviceBootstrap.enabled = true
features.licenseCheck.enabled = true
maintenance.enabled = false
support copy is ready
install guide is ready
rollback/emergency controls are ready
```

## 15. Stop Conditions

Stop implementation immediately if any task adds:

```txt
Raw Activation Key database storage
Raw Activation Key logging
activationKeyHash in client response
Customer email/name requirement for EA0
MAC as primary identity
Payment blocking during EA0
Reseller workflow
Provider/source/content storage
Stream/channel/package validation
Public APK release before smoke tests
```

## 16. Final Readiness Verdict

Verdict:

```txt
EA0 planning is ready.
Implementation may begin in development/staging.
Public release is not approved until smoke tests pass.
Production deploy is not approved by this review.
```

## 17. Next Recommended Step

Next step:

```txt
Start controlled backend implementation in development environment.
```

First implementation task:

```txt
Create backend foundation scaffolding for config, shared response, health, app-version, and remote-config.
```

Critical credential endpoints should wait until the foundation and database schema are working in development.
