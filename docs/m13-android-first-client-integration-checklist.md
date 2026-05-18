# M13 Android First Client Integration Checklist

Status: Active Draft
Mode: Planning only. No Android implementation, hosting, live database, or production deploy work.

## 1. Purpose

M13 defines the first-client integration checklist for the Android TV / Fire TV application.

The goal is to make `TV_Project` consume `TV_Project_Platform` safely and predictably without creating media-provider behavior.

## 2. Integration Owner

The Ecosystem Integration Director owns cross-project alignment between:

- `TV_Project_Platform`: account, device, license, app version, remote config, and temporary profile transfer center.
- `TV_Project`: Android TV / Fire TV first client.

If Android needs something that changes the platform boundary, the integration contract must be updated before implementation continues.

## 3. First Client Rule

Android TV / Fire TV is the first supported client.

Future clients must not force new assumptions into the first-client contract until Android first-client flow is stable.

## 4. Client Startup Order

The Android app should start platform integration in this order:

1. Local app boot.
2. Load local app device identity.
3. Call `GET /health` for API reachability.
4. Call `GET /app-version`.
5. Call `GET /remote-config`.
6. Decide whether activation is needed.
7. If not activated, start activation session.
8. Poll activation session.
9. After activation, call `POST /license/check`.
10. Enable app shell if license state allows free launch access.
11. Optional profile transfer flow only after activation.

## 5. Local Device Identity Checklist

Android client must:

- Create an app-level device key if one does not exist.
- Store device key locally.
- Reuse device key across normal app restarts.
- Treat app data clear/reinstall as possible device identity reset.
- Avoid invasive hardware fingerprinting.

Android client must not:

- Depend on unsafe hardware identifiers.
- Send unnecessary personal/device fingerprint data.
- Send profile or source payloads during device identity creation.

## 6. Health Check Checklist

Endpoint:

- `GET /health`

Client expectations:

- Confirms API is reachable.
- Failure should show a calm connection message.
- Failure should not delete local profile data.
- Failure should not force logout by itself.

## 7. App Version Checklist

Endpoint:

- `GET /app-version?platform=android_tv&version=x.y.z`

Client expectations:

- Reads recommended version.
- Reads minimum supported version.
- Reads force update flag.
- Shows non-blocking update message unless force update is true.

Rules:

- Early launch should avoid aggressive blocking unless required.
- App version response must not contain media source data.

## 8. Remote Config Checklist

Endpoint:

- `GET /remote-config?platform=android_tv&version=x.y.z`

Client expectations:

- Reads free launch state.
- Reads maintenance flag.
- Reads feature flags.
- Reads support contact.
- Reads safe polling intervals.

Allowed remote config use:

- UI hints.
- Maintenance message.
- Profile transfer availability.
- Safe retry intervals.

Forbidden remote config use:

- Media source delivery.
- Channel package configuration.
- Provider credential delivery.
- Source scraping instructions.

## 9. Activation Session Checklist

Create endpoint:

- `POST /devices/activation-sessions`

Poll endpoint:

- `GET /devices/activation-sessions/:id`

Client flow:

1. Request activation session.
2. Display activation code clearly on TV.
3. Display expiration state.
4. Poll according to backend polling interval.
5. Stop polling when approved, expired, rejected, or consumed.
6. Store activated device state after success.

Rules:

- Do not poll aggressively.
- Do not generate endless activation sessions.
- Do not request payment during free launch activation.
- Do not include profile payloads in activation session request.

## 10. License Check Checklist

Endpoint:

- `POST /license/check`

Client request should include:

- deviceId when available.
- deviceKey when available.
- platform.
- appVersion.

Client response handling:

- `free_launch_active`: allow app shell.
- `active`: allow app shell.
- `trialing`: allow app shell.
- `expired`: show calm account/license message.
- `suspended`: show account support message.
- `device_revoked`: show device revoked message.
- `blocked`: stop access and show support message.

Free launch rule:

- During free launch, paymentRequired false must not block usage.
- Client must not create payment-first lock before final release.

License check must not:

- Validate source URLs.
- Inspect profile data.
- Send provider credentials.

## 11. Temporary Profile Transfer Checklist

Create endpoint:

- `POST /profile-transfer-sessions`

Read endpoint:

- `GET /profile-transfer-sessions/:id`

Consume endpoint:

- `POST /profile-transfer-sessions/:id/consume`

Client expectations:

- Encrypt profile payload before sending.
- Treat backend as temporary encrypted bridge only.
- Consume session after successful import.
- Handle expired sessions gracefully.

Rules:

- Backend is not profile source of truth.
- Client must not assume backend can read profile contents.
- Transfer payload must not be exposed in logs or UI.

## 12. Offline and Failure Behavior

Android client should be calm under failures.

Rules:

- API unreachable should not erase local data.
- License check failure should use safe cached state only if policy allows later.
- Activation failure should allow retry.
- Remote config failure should fall back to safe defaults.
- App version failure should not block unless previously known minimum policy requires it.

## 13. UI Behavior During Free Launch

During free launch:

- Avoid payment pressure.
- Avoid subscription-first screens.
- Avoid upgrade popups.
- Show free launch state only if useful.
- Preserve trust by making limitations clear and calm.

## 14. Android Must Not Request

Android client must not request the platform to provide:

- Media streams.
- Channel lists.
- Provider accounts.
- Provider credentials.
- Source scraping.
- Backend stream relay.
- Backend playlist hosting.
- Payment-first blocking during free launch.

## 15. Initial Manual Test Checklist

Before deeper implementation:

- Health endpoint returns ok.
- App version endpoint returns safe version policy.
- Remote config endpoint returns free launch and feature flags.
- Activation session can be created.
- Activation session can be polled.
- License check returns free launch access.
- Profile transfer session can be created and consumed.

## 16. M13 Acceptance Criteria

M13 is acceptable when:

- Android startup integration order is clear.
- Each platform endpoint has a client-side usage rule.
- Free launch behavior is protected.
- No media-provider behavior is introduced.
- Profile transfer privacy boundary is protected.
- Future Android implementation can proceed from the checklist without guessing.

## 17. Next Step

After M13:

- Prepare Backend Specialist Task Pack.
- Prepare Android Specialist Task Pack.
- Keep hosting/deploy work paused unless explicitly re-approved.
