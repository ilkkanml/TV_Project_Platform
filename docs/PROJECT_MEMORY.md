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

## Current Operating Model

The project is now using a simplified operating model.

Default workflow:

- Director handles scope, decisions, roadmap, and documentation directly.
- Documentation Producer department is disabled for routine work; Director records docs directly.
- Extra departments are disabled by default to reduce process overhead.
- Builder is used only for code/patch/build implementation work.
- QA remains required before any milestone can be marked LOCKED.
- A dedicated Premium UI / Art Direction role is allowed for visual quality, UX polish, and premium streaming feel.

Use departments only when needed:

- Builder: code/patch/build work
- QA: lock gate and regression review
- Premium UI / Art Direction: visual design, TV-first UI polish, premium feel

Do not route normal decisions through extra departments.

## Premium UI Direction

Nexora must feel like a premium streaming product, not a raw prototype.

UI direction principles:

- TV-first visual hierarchy
- Remote-friendly focus clarity
- Large-screen readability
- Premium dark cinematic atmosphere
- Clean spacing and composition
- High-quality cards, rows, titles, and player shell
- Smooth but restrained motion
- Distinct identity from generic IPTV apps
- User should feel they received a polished, high-quality app

M15 should include UI/UX polish direction before handoff readiness.

Recommended next milestone candidate:

`M15 Internal Alpha UI/UX Polish Direction & Handoff Readiness`

Purpose:

- Define premium UI/UX polish scope
- Improve perceived product quality before broader internal handoff
- Preserve current smoke-passed behavior
- Prepare internal APK handoff/install guidance
- Avoid production/store/payment/provider/content expansion

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

## Current Rule

Do not open another milestone unless Director explicitly scopes it.

Host/deploy/live database work remains paused unless explicitly approved.

Heavy backend and heavy Android implementation remain paused unless explicitly approved.
