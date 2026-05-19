# NEXT_TASK

Status: Runtime next-action entrypoint

## Current Active Milestone

None — next milestone pending Director scoping.

## Last Locked Milestone

`M14 First Working Release / Internal Alpha Smoke Gate` — LOCKED

## Current Next Task

Director should scope the next milestone candidate:

`M15 Internal Alpha Handoff & Install Package Readiness`

## M15 Candidate Purpose

M15 should prepare the internal alpha package handoff without expanding product scope.

Focus:

- Internal APK handoff/install guidance
- APK location/path expectation
- Install instructions for Android TV / Fire TV / emulator
- Internal smoke checklist for repeat testing
- Current smoke-passed state preservation
- Clear known limitations
- No production/store release claim

## M15 Candidate IN

- APK handoff checklist
- Internal install instructions
- Repeatable smoke test checklist
- Version/build evidence expectations
- Local Platform API optional check guidance
- Known limitations record
- Legal media-player boundary reminder

## M15 Candidate OUT

- Production deploy
- Store release
- Payment enforcement
- Provider integration
- Content hosting/channel selling
- Android bridge implementation
- Auth/session/token implementation
- Heavy backend implementation
- Heavy Android implementation
- New playback/provider work
- APK signing/release keystore unless separately approved

## Current Operating Rule

If the user says `devam` or `+`:

1. Do not create extra documents unless one is needed for compatibility, handoff, or a real decision.
2. Director may scope M15 directly because this is handoff/readiness, not feature implementation.
3. Use extra departments only if code, QA, documentation record, legal/security/auth risk, or specialist review is actually needed.
4. Do not start Builder implementation unless Director explicitly approves it.

## Paused Tasks

Do not proceed with these unless explicitly re-approved:

- Railway deployment
- Live PostgreSQL setup
- Prisma migration execution
- Production hosting/domain/server work
- Heavy backend implementation
- Heavy Android implementation
- Payment enforcement
- Provider/content/source work

## Safe Next Action

Open Director scoping for M15.

Recommended next prompt:

- `Nexora TV devam — Director scoping M15 Internal Alpha Handoff & Install Package Readiness`
