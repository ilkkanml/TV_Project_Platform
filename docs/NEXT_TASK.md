# NEXT_TASK

Status: Runtime next-action entrypoint

## Current Active Milestone

None — next milestone pending Director scoping.

## Last Locked Milestone

`M14 First Working Release / Internal Alpha Smoke Gate` — LOCKED

## Current Next Task

Director should scope the next milestone candidate:

`M15 Internal Alpha UI/UX Polish Direction & Handoff Readiness`

## Reason For Scope Adjustment

After M14 smoke pass, the app is functional but visually/raw experience is not ready enough for a clean internal alpha handoff.

M15 should include UI/UX design direction before final handoff readiness.

## M15 Candidate Purpose

M15 should define a minimal TV-first UI/UX polish pass and prepare internal alpha handoff without expanding product scope.

Focus:

- TV-first UI polish direction
- Home / navigation / player shell visual cleanup
- Remote-friendly focus clarity
- Premium streaming feel baseline
- Internal APK handoff/install guidance
- APK location/path expectation
- Install instructions for Android TV / Fire TV / emulator
- Internal smoke checklist for repeat testing
- Current smoke-passed state preservation
- Clear known limitations
- No production/store release claim

## M15 Candidate IN

- UI/UX design review and polish direction
- TV-first layout/readability checklist
- Focus state clarity checklist
- Home shell visual polish checklist
- Navigation shell polish checklist
- Player shell visual polish checklist
- Internal APK handoff checklist
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
- Full redesign/rewrite
- Design system rewrite
- New feature flood
- APK signing/release keystore unless separately approved

## Current Operating Rule

If the user says `devam` or `+`:

1. Director should scope M15 with UI/UX polish direction included.
2. Use UI/UX Designer or Product Designer report before Builder if implementation is requested.
3. Do not start Builder implementation until design scope is approved.
4. Keep the polish pass minimal and TV-first.
5. Preserve M14 smoke-passed behavior.
6. Do not create production/store/payment/provider/content scope.

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

Open Director scoping for M15 with UI/UX polish direction included.

Recommended next prompt:

- `Nexora TV devam — Director scoping M15 Internal Alpha UI/UX Polish Direction & Handoff Readiness`
