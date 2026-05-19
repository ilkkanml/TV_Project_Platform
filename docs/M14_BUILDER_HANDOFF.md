# M14 Builder Handoff

Milestone: M14 First Working Release / Internal Alpha Smoke Gate

Status: BUILDER HANDOFF READY

Director result: APPROVED WITH LIMITS

## 1. Builder Task

Prepare minimal smoke-test readiness for M14.

This handoff does not approve broad implementation.

This handoff does not approve production release.

This handoff does not approve backend expansion, Android bridge, auth, payment, provider integration, or content-source work.

## 2. Allowed Work

Builder may inspect the current repository state and prepare only the minimal changes or test steps required to confirm:

- Android TV / Fire TV app can cold launch.
- Launch does not crash.
- Home shell is visible.
- Basic remote/focus navigation works enough for smoke validation.
- Player screen shell opens without requiring real stream playback.
- Local Platform API can run.
- `GET /health` returns expected liveness response.
- `GET /ready` returns expected readiness response.

## 3. Not Allowed

Builder must not add or expand:

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

## 4. Expected Builder Output

Builder should return a short handoff report with:

1. Files inspected.
2. Current smoke readiness status.
3. Minimal patch needed, if any.
4. Exact local test commands or steps.
5. Expected pass/fail evidence.
6. Risks or blockers.
7. Confirmation that M14 boundaries remain preserved.

If no patch is needed, Builder must say `NO PATCH REQUIRED`.

If a patch is needed, Builder must keep it minimal and explain why it is required before implementation.

## 5. User Test Evidence Needed Later

M14 cannot be marked passed without user local evidence for:

- Android TV / Fire TV app launch result.
- Crash/no-crash result.
- Home shell result.
- Navigation/focus result.
- Player shell result.
- Local API `/health` result.
- Local API `/ready` result.
- Confirmation that no legal boundary change occurred.

## 6. Lock Rule

M14 cannot become PASSED until user local test confirms success.

M14 cannot become LOCKED until QA review confirms no blocker and Director approves lock.
