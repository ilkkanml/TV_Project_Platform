# M14 Scope

Milestone: M14 First Working Release / Internal Alpha Smoke Gate

Status: SCOPING OPEN

Director result: APPROVED WITH LIMITS

## 1. Purpose

M14 defines the first working internal alpha smoke gate for the Nexora Android TV / Fire TV client and the local Platform API foundation.

M14 is not a production release.

M14 is not backend expansion.

M14 is not Android bridge implementation.

M14 is not auth, payment, provider, or content-source work.

## 2. M14 IN

- Android TV / Fire TV app cold launch smoke check.
- Crash-free launch expectation.
- Home shell visibility.
- Navigation shell basic remote/focus behavior.
- Player screen shell opens without requiring real stream playback.
- Settings/basic shell may be included only if already present or needed for smoke flow.
- Local Platform API `/health` check.
- Local Platform API `/ready` check.
- `/ready` remains limited to `DATABASE_URL` presence and DB ping.
- Legal media-player boundary remains preserved.

## 3. M14 OUT

- Production deploy.
- Live database setup.
- Railway/hosting/domain/server work.
- Payment enforcement.
- Provider integration.
- Content hosting.
- Channel selling.
- Backend-owned stream/channel catalog.
- Android bridge implementation.
- Auth/session/token implementation.
- Migration auto-run.
- Seed execution.
- Redis runtime/session expansion.
- Heavy Android implementation.
- Heavy backend implementation.
- Protected system rewrite.
- Illegal IPTV/source behavior.
- DRM bypass or unauthorized scraping.

## 4. Release Gate Checklist

M14 cannot be considered passed unless user local evidence confirms:

- App launches on Android TV / Fire TV target or emulator.
- No launch crash is observed.
- Home shell is visible.
- Basic remote/focus navigation works enough for smoke validation.
- Player screen shell opens.
- App does not require real stream/provider data to pass smoke.
- Local API starts successfully.
- `GET /health` returns expected liveness response.
- `GET /ready` returns expected readiness response.
- No mutation, seed, migration auto-run, auth, payment, provider, or content behavior is introduced.

## 5. Evidence Required

Minimum evidence to record later:

- Android TV / Fire TV launch result.
- Home shell result.
- Navigation/focus result.
- Player shell result.
- Local API `/health` result.
- Local API `/ready` result.
- Any crash/error observed.
- Confirmation that no legal boundary change occurred.

## 6. Lock Rule

M14 status cannot become PASSED until user local test confirms success.

M14 status cannot become LOCKED until QA review confirms no blocker and Director approves lock.

## 7. Department Routing Rule

Director handles normal M14 scope directly.

Extra departments are not required unless:

- Code or patch planning begins.
- QA review is needed.
- Documentation record is needed after test evidence.
- Legal, security, auth, architecture, playback, Android, backend, database, release, or UI/UX risk becomes genuinely specialist-level.

## 8. Next Safe Action

Prepare a minimal Builder handoff only if implementation/testing is explicitly resumed.

Builder handoff must stay limited to smoke readiness and must not open production, payment, provider, auth, Android bridge, or content-source work.
