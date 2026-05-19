# PROJECT_MEMORY

Status: Runtime source-of-truth entrypoint

## Current Memory Summary

Project: Nexora / TV_Project_Platform

Product identity:

- Nexora is a Core Media Player Ecosystem.
- `TV_Project_Platform` is the platform layer.
- `TV_Project` Android TV / Fire TV is the first client.
- Android TV / Fire TV remains first-client priority.

## Current Milestone Truth

Current active milestone: none.

Last locked implementation milestone:

- `M14 First Working Release / Internal Alpha Smoke Gate` — LOCKED

Previous locked implementation milestone:

- `M13 Platform API Service Foundation & Environment Contract` — LOCKED

## M14 Lock Summary

M14 validated the first working internal alpha smoke readiness.

M14 completed:

- Builder result: NO PATCH REQUIRED
- APK generated: CONFIRMED
- Android app run: CONFIRMED
- Splash: CONFIRMED
- Login: CONFIRMED
- Activation `demo123`: CONFIRMED
- Home shell: CONFIRMED
- Focus/navigation: CONFIRMED
- Detail screen: CONFIRMED
- Player shell: CONFIRMED
- Crash/error: NONE REPORTED
- Platform `/health`: CONFIRMED
- Platform `/ready`: CONFIRMED with `{ "ready": true }`
- QA Result: PASS
- Documentation recorded
- Director lock approved

M14 records:

- `docs/M14_SCOPE.md`
- `docs/M14_BUILDER_HANDOFF.md`
- `docs/M14_LOCAL_SMOKE_EVIDENCE.md`
- `docs/M14_QA_REVIEW.md`
- `docs/M14_LOCK_REPORT.md`

## M13 Lock Summary

M13 established the local-only Platform API service foundation and environment contract.

M13 completed:

- Local-only API runtime/config baseline
- `.env.example` `DATABASE_URL` aligned with docker-compose local PostgreSQL password
- `/health` preserved as static liveness
- `/ready` endpoint added
- `PrismaService` added
- `/ready` checks only `DATABASE_URL` presence and DB ping
- Local evidence confirmed
- QA passed with process warning
- Director lock approved

## Non-Negotiable Boundary

Nexora remains a legal Core Media Player Ecosystem.

Forbidden:

- Content hosting
- Broadcasting
- Channel package selling
- Stream relay/proxy/transcoding
- Provider scraping
- Provider credential collection
- DRM bypass
- Unauthorized source collection
- Backend source/channel catalog management

## Free Launch Rule

The first Android TV / Fire TV app remains free until final release level.

During free launch:

- Payment enforcement is deferred.
- Payment absence must not block eligible early usage.
- Billing/reseller behavior must not become first-run blocker.

## Current Direction

Recommended next milestone candidate:

`M15 Internal Alpha Handoff & Install Package Readiness`

Purpose:

- Prepare internal alpha APK handoff/install guidance
- Preserve current smoke-passed state
- Define package evidence requirements
- Define internal install/test instructions
- Avoid production/store/payment/provider/content expansion

## Current Rule

Do not open another milestone unless Director explicitly scopes it.

Host/deploy/live database work remains paused unless explicitly approved.

Heavy backend and heavy Android implementation remain paused unless explicitly approved.
