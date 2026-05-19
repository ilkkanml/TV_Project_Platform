# M38 EA0 Grouped Task Execution Plan

Status: Active Draft
Mode: Task organization only. No live database, production deploy, payment enforcement, reseller workflow, or content/provider/source behavior until explicitly approved.

## 1. Purpose

M38 defines how the remaining EA0 work should be executed in grouped batches.

Rule:

```txt
Group normal planning/implementation tasks.
Do critical/security-sensitive tasks alone.
Do not mix dangerous or irreversible work into a bulk group.
```

## 2. Current EA0 Direction

EA0 active direction:

```txt
Download-only early access
Backend-generated Device ID
Backend-generated Activation Key
Database stores activationKeyHash only
App stores Device ID + Activation Key locally
License check uses Device ID + Activation Key
Free launch access active
Website/customer portal later
Payment/reseller later
```

## 3. Execution Rule

Use grouped execution for:

- Documentation alignment.
- Checklist cleanup.
- Endpoint planning.
- Seed planning.
- Smoke test planning.
- Non-destructive backend scaffolding.

Use single-task execution for:

- Database schema creation.
- Migration generation.
- Secret handling.
- Activation Key generation logic.
- Hash verification logic.
- Rate-limit/security middleware.
- Production deploy.
- Any task that can break app access or leak secrets.

## 4. Task Group A — EA0 Backend Foundation

Group these together:

1. Backend folder/module map.
2. Config/environment variable plan.
3. Health endpoint scaffold.
4. Shared response format.
5. Shared error codes.

Output expected:

```txt
Backend foundation implementation checklist
```

Critical inside group:

- None, if only planning/scaffolding.

Stop if:

- Secrets are added to repo.
- Production deploy is attempted.

## 5. Task Group B — Database Preparation

Group planning only:

1. Database provider/environment decision notes.
2. DeviceAccessRecord schema implementation checklist.
3. AppVersion seed checklist.
4. RemoteConfig seed checklist.
5. AuditLog setup checklist.

Critical single tasks inside this area:

```txt
Actual database migration/schema creation
Actual production database connection
Actual credential insertion
```

These must be done one by one, not grouped.

## 6. Task Group C — Endpoint Implementation Planning

Group these together:

1. `/health` implementation checklist.
2. `/app-version` implementation checklist.
3. `/remote-config` implementation checklist.
4. Endpoint response format verification.

Critical single tasks:

```txt
/devices/bootstrap implementation
/license/check implementation
```

Reason:

- These touch credentials, hash validation, access decisions, and future paid continuity.

## 7. Critical Single Task 1 — Activation Key Generation

Must be done alone.

Scope:

- Generate strong Activation Key.
- Store only hash.
- Store only masked hint.
- Return raw key only once.
- Prevent logging.

Acceptance:

```txt
Raw Activation Key never appears in database or logs.
```

## 8. Critical Single Task 2 — Device Bootstrap

Must be done alone.

Scope:

- Create DeviceAccessRecord.
- Recover by platformDeviceHash.
- Rotate Activation Key on recovery.
- Avoid duplicate records.
- Return correct EA0 state.

Acceptance:

```txt
First launch creates record.
Repeated launch does not duplicate.
Reinstall recovery reuses Device ID when possible.
```

## 9. Critical Single Task 3 — License Check

Must be done alone.

Scope:

- Validate Device ID + Activation Key.
- Return allowed/denied state.
- Support revoked/blocked/disabled states.
- Keep future paid response fields.

Acceptance:

```txt
Valid device receives free_launch_active.
Invalid credentials receive generic denial.
No source/provider/playlist data is involved.
```

## 10. Task Group D — App Handoff / TV_Project Alignment

Group these together:

1. Confirm shared endpoint names.
2. Confirm request/response fields.
3. Confirm local secure storage requirement.
4. Confirm no hardcoded Activation Key.
5. Confirm future paid response compatibility.

Critical single task:

```txt
Actual Android implementation of credential storage
```

Reason:

- Credential storage is security-sensitive and app-specific.

## 11. Task Group E — QA / Smoke Test Planning

Group these together:

1. API smoke test checklist.
2. Database verification checklist.
3. App bootstrap test checklist.
4. Reinstall recovery test checklist.
5. Log redaction test checklist.

Critical single tasks:

```txt
Testing with real production database
Testing with public APK users
```

These require explicit approval.

## 12. Task Group F — Download-Only Early Access Preparation

Group planning only:

1. APK download path decision.
2. Version metadata update plan.
3. Release notes draft.
4. Install guide draft.
5. Early access support copy.

Critical single tasks:

```txt
Publishing real APK download link
Enabling public access
```

## 13. Deferred Groups

Do not execute yet:

```txt
Customer portal implementation
Owner dashboard implementation
Payment enforcement
Reseller system
Credit ledger
Profile sync backend
Analytics dashboard
Support ticketing
```

These come after EA0 backend/database foundation is stable.

## 14. Recommended Next Work Order

Next work should proceed as:

```txt
1. Group A — EA0 Backend Foundation
2. Group B — Database Preparation, planning only
3. Critical Single Task — Actual database schema/migration
4. Group C — Safe public endpoints: health/app-version/remote-config
5. Critical Single Task — Activation Key generation
6. Critical Single Task — Device bootstrap
7. Critical Single Task — License check
8. Group D — TV_Project app alignment
9. Group E — Smoke test planning
10. Critical Single Task — EA0 smoke test against staging database
11. Group F — Download-only release preparation
```

## 15. Stop Conditions

Stop if any grouped task tries to include:

- Raw Activation Key storage.
- Activation Key logging.
- Production deploy.
- Payment blocking.
- Reseller flow.
- Customer email/name requirement.
- MAC as primary product identity.
- Content/provider/source storage.
- Public APK release without smoke test.

## 16. Acceptance Criteria

M38 is acceptable when:

- Remaining EA0 tasks are grouped logically.
- Critical tasks are isolated.
- Database/security/deploy work is not bundled casually.
- Work order is clear.
- Future paid transition remains protected.
- No media-provider behavior is introduced.
