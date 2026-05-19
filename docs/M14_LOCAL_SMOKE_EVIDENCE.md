# M14 Local Smoke Evidence

Milestone: M14 First Working Release / Internal Alpha Smoke Gate

Status: QA PASSED / READY FOR DIRECTOR LOCK

Director lock status: NOT LOCKED

## Scope

M14 validates internal alpha smoke readiness only.

No code patch was required for this documentation update.

Builder result:

- NO PATCH REQUIRED

## Platform Smoke Evidence

- `/health`: CONFIRMED
- `/ready`: CONFIRMED

`/ready` response:

```json
{"ready":true}
```

## Android Smoke Evidence

User local smoke path was confirmed:

- APK generated: yes
- app run: yes
- splash: yes
- login: yes
- activation `demo123`: yes
- home: yes
- focus/navigation: yes
- detail: yes
- player shell: yes
- crash/error: no

Accepted smoke path:

Splash -> Login -> Activation demo123 -> Home -> Detail -> Play Mock -> Player shell

## QA Accepted Checks

Platform API smoke accepted:

- `/health` liveness
- `/ready` DB readiness

Android app smoke accepted:

- Cold launch path reached
- Splash displayed
- Login reached
- Demo activation accepted
- Home reached
- Basic focus/navigation worked
- Detail screen reached
- Mock play opened Player shell
- No crash/error observed

## M14 Out Of Scope Preserved

M14 does not approve:

- Production deploy
- Live database setup
- Hosting/domain/server work
- Payment enforcement
- Provider integration
- Content hosting
- Channel selling
- Android bridge implementation
- Auth/session/token implementation
- Migration auto-run
- Seed execution
- Heavy Android implementation
- Heavy backend implementation
- Protected system rewrite

## Boundary Confirmation

- Legal media-player boundary preserved.
- Protected systems not rewritten.
- No real provider/content integration added.
- No backend expansion added.

## Process Warning

Some canonical docs are still missing by exact path in Platform repo.

Missing exact paths recorded from QA warning:

- `docs/PROTECTED_SYSTEMS.md`
- `docs/SAFE_CODE_ENGINE.md`
- `docs/agents/QA_TESTER.md`

Classification:

- Documentation/path hygiene warning
- Not a code blocker
- Not a legal blocker
- Not a protected-system rewrite

Documentation Producer boot note:

- `docs/agents/DOCUMENTATION_MEMORY.md` is also unavailable by exact path in Platform repo during this pass.
- Classified under the same documentation/path hygiene category.

## Result

M14 evidence is recorded as QA PASSED / ready for Director lock review.

This document does not lock M14.
