# M15 Android Specialist Task Pack

Status: Active Draft
Mode: Planning only. No Android implementation, production deploy, hosting, or live integration work until explicitly re-approved.

## 1. Purpose

This task pack defines what the Android Specialist should implement later inside `TV_Project`, the Android TV / Fire TV first-client application.

Android work must follow:

- Master Project Checkpoint.
- M10 Ecosystem Alignment and Client Integration Contract.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.
- M14 Backend Specialist Task Pack.

## 2. Android Mission

Build the first client for the Core Media Player Ecosystem.

The Android TV / Fire TV client should connect to `TV_Project_Platform` for:

- API reachability check.
- App version policy.
- Remote config.
- Device identity.
- Device activation.
- License check.
- Temporary encrypted profile transfer.

The Android client must not turn the platform into a media provider.

## 3. Non-Negotiable Boundary

Android must not request, expect, or depend on backend support for:

- Media stream hosting.
- Channel list delivery.
- Provider account delivery.
- Provider credential storage.
- Source scraping.
- Backend stream relay.
- Backend playlist hosting.
- DRM bypass.
- Unauthorized source collection.
- Payment-first blocking during the free launch period.

If a feature needs any of the above, stop and escalate to the Ecosystem Integration Director.

## 4. First Integration Order

Android implementation should follow this order:

1. Local app boot shell.
2. Local device identity generation/loading.
3. `GET /health` integration.
4. `GET /app-version` integration.
5. `GET /remote-config` integration.
6. Activation-needed decision.
7. `POST /devices/activation-sessions` integration.
8. Activation code display UI.
9. `GET /devices/activation-sessions/:id` polling.
10. Activated state storage.
11. `POST /license/check` integration.
12. Free launch allowed app shell.
13. Temporary encrypted profile transfer later.

Do not begin payment-first UI or reseller flows during first integration.

## 5. Local Device Identity Tasks

Android Specialist should implement:

- App-level device key creation.
- Local persistent storage for device key.
- Safe device label generation.
- Platform value detection: `android_tv` or `fire_tv`.
- App version value inclusion in platform requests.

Rules:

- Avoid invasive hardware fingerprinting.
- Do not require privileged hardware identifiers.
- Do not send playlist/profile payloads with device identity.
- Treat reinstall or app data clear as possible identity reset.

## 6. Health Check Tasks

Endpoint:

- `GET /health`

Implementation tasks:

- Add API reachability check.
- Show calm connection error if unavailable.
- Do not erase local data on failure.
- Do not force logout on health failure alone.

Expected success:

- `status: ok`
- platform scope identifies Core Media Player Ecosystem.

## 7. App Version Tasks

Endpoint:

- `GET /app-version?platform=android_tv&version=x.y.z`

Implementation tasks:

- Send platform and app version.
- Read current recommended version.
- Read minimum supported version.
- Read force update flag.
- Show non-blocking update notice by default.
- Block only when force update is true.

Rules:

- Do not request media data from app version endpoint.
- Do not block early launch users unless backend explicitly requires it.

## 8. Remote Config Tasks

Endpoint:

- `GET /remote-config?platform=android_tv&version=x.y.z`

Implementation tasks:

- Read free launch flag.
- Read maintenance flag.
- Read feature flags.
- Read polling intervals.
- Read support contact.
- Apply safe defaults on failure.

Rules:

- Remote config must not be used for media source delivery.
- Remote config must not contain provider credentials.
- Unknown config fields should be ignored safely.

## 9. Activation Session Tasks

Create endpoint:

- `POST /devices/activation-sessions`

Poll endpoint:

- `GET /devices/activation-sessions/:id`

Implementation tasks:

- Create activation session when device is not activated.
- Display activation code clearly on TV.
- Display expiration state.
- Poll using backend-provided interval.
- Stop polling when final state is reached.
- Store activated device state after approval.

Rules:

- Do not poll aggressively.
- Do not create endless sessions.
- Do not include profile payload in activation request.
- Do not require payment during free launch activation.

## 10. License Check Tasks

Endpoint:

- `POST /license/check`

Implementation tasks:

- Send device identity, platform, and app version.
- Handle license state.
- Allow app shell for `free_launch_active`, `active`, and `trialing`.
- Show calm account/license message for blocked states.
- Do not delete local data on temporary license check failure.

Free launch behavior:

- `paymentRequired: false` must not block usage.
- The first Android TV / Fire TV release remains free until final release level.
- Payment UI must not become the first-run blocker.

## 11. Temporary Profile Transfer Tasks

Endpoints:

- `POST /profile-transfer-sessions`
- `GET /profile-transfer-sessions/:id`
- `POST /profile-transfer-sessions/:id/consume`

Implementation tasks:

- Encrypt profile payload before transfer.
- Treat backend as temporary encrypted bridge only.
- Import payload locally on receiving device.
- Mark session consumed after successful import.
- Handle expired or consumed sessions gracefully.

Rules:

- Backend is not profile source of truth.
- Android must not expect backend to inspect profile contents.
- Payload must not be logged in plaintext.

## 12. Offline and Failure Behavior

Android should be resilient and calm.

Required behavior:

- API unreachable: show connection message, keep local data.
- App version failure: use safe defaults.
- Remote config failure: use safe defaults.
- Activation failure: allow retry.
- License check failure: do not destroy local profile state.
- Transfer failure: allow retry if session is still valid.

## 13. UI Rules During Free Launch

During free launch:

- Do not show aggressive payment prompts.
- Do not lock the app behind subscription screens.
- Do not overbuild customer billing UI.
- Do show activation and license status clearly.
- Do preserve trust with simple, calm messaging.

## 14. Client Storage Rules

Android may store locally:

- Device key.
- Activated device state.
- App settings.
- User-owned profile data.
- User-owned source configuration.

Android must protect locally stored profile data according to platform capabilities.

Android must not upload profile contents except through the temporary encrypted transfer flow.

## 15. API Error Handling

Android should handle typed errors calmly.

Expected categories:

- connection_error
- unsupported_app_version
- activation_session_expired
- activation_session_consumed
- device_revoked
- license_suspended
- profile_transfer_expired
- profile_transfer_consumed

Unknown errors should display a generic retry/support message.

## 16. Manual Test Checklist

Before Android integration is considered acceptable:

- App can call health endpoint.
- App can call app version endpoint.
- App can call remote config endpoint.
- App can create activation session.
- App can display activation code.
- App can poll activation status.
- App can call license check.
- Free launch state allows app shell.
- App does not request media-provider behavior from backend.
- Profile transfer flow is encrypted and temporary when implemented.

## 17. Stop Conditions

Stop Android implementation and escalate if:

- Android requires backend-provided media sources.
- Android requires backend provider credential storage.
- Android requires payment-first blocking during free launch.
- Android needs an endpoint not covered by M12.
- Android needs profile transfer behavior outside encrypted temporary bridge.
- Android introduces source scraping or unauthorized source collection.

## 18. Acceptance Criteria

Android first-client integration is acceptable when:

- Startup order follows M13.
- M12 endpoints are consumed correctly.
- Free launch behavior is preserved.
- No media-provider dependency exists.
- Device identity is app-level and privacy-safe.
- Activation and license states are handled calmly.
- Profile transfer remains encrypted and temporary.

## 19. Next Specialist Pack

After M15:

- Security Specialist Task Pack.
- Auth Specialist Task Pack.
- Basic Dashboard Scope Pack.
