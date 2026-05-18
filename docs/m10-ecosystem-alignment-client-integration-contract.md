# M10 Ecosystem Alignment and Client Integration Contract

Status: Active Draft
Scope: TV_Project_Platform and the first Android TV / Fire TV client

## 1. Ecosystem Direction

Nexora is now a Core Media Player Ecosystem.

Product responsibilities:

- `TV_Project_Platform`: account, device, license, admin, remote config, app version, and temporary profile transfer center.
- `TV_Project`: first Android TV / Fire TV client application.
- Future clients: Android Mobile, iOS, Apple TV, Samsung Tizen, LG webOS, and Web Player.

This contract is the required gate before backend implementation or Android integration tasks begin.

## 2. Core Boundary

The platform is not a media provider. It must not provide, sell, distribute, relay, transform, index, collect, or operate third-party media sources.

Allowed model:

- User-owned sources.
- Legally authorized sources.
- Local client-side profile ownership.

Backend scope:

- Identity.
- Device activation.
- License state.
- App version state.
- Remote config.
- Temporary encrypted profile transfer.

## 3. Free Launch Rule

The first Android TV / Fire TV app remains free until the project reaches final release level.

During this period:

- Payment enforcement is not production blocking.
- Subscription payment gates must not block initial usage.
- Account, device, and license infrastructure will still be built.
- License checks may return free-launch eligible states.
- Payment logic must stay additive and disabled by default.

## 4. Immediate Platform Priority

Dashboard expansion must wait.

Priority order:

1. Ecosystem contract.
2. Database MVP.
3. Core API MVP.
4. Device activation.
5. License check.
6. App version check.
7. Remote config.
8. Temporary profile transfer session.
9. Basic admin/customer dashboard.
10. Reseller later.

## 5. Device Identity Policy

The Android TV / Fire TV client must maintain a stable app-level device identity.

Rules:

- Do not require invasive hardware identifiers.
- Prefer an app-generated device key stored locally.
- Identity should survive normal app restarts.
- Identity may reset after app data clear or reinstall.
- Backend treats device identity as an app device record, not as proof of physical ownership.

Suggested fields:

- `deviceId`
- `deviceKey`
- `deviceName`
- `platform`
- `appVersion`
- `status`

## 6. Activation Session Flow

Flow:

1. TV client requests activation session.
2. Backend returns short code, session id, and expiration time.
3. TV displays code and waiting state.
4. User signs in on web/mobile and enters code.
5. Backend binds session to the user account.
6. TV polls session status.
7. Approved session activates the device.
8. Expired or rejected sessions fail cleanly.

Rules:

- Codes expire.
- Sessions are single use.
- Polling is rate limited.
- Activation binds account/device/license only.

## 7. License Check Flow

Client periodically checks whether the device may operate.

Input direction:

- Device identity.
- App version.
- Platform.
- Account/device token when available.

Output direction:

- License state.
- Free launch eligibility.
- Device state.
- Optional user-facing message.

Initial states:

- `free_launch_active`
- `active`
- `trialing`
- `expired`
- `suspended`
- `device_revoked`
- `blocked`

## 8. App Version Endpoint

Required response:

- Current recommended version.
- Minimum supported version.
- Force update flag.
- Update URL or store route when available.
- Release notes.
- Platform-specific config.

Force update must be used carefully during early launch.

## 9. Remote Config Endpoint

Allowed remote config examples:

- Feature flags.
- UI hints.
- Free launch status flag.
- Maintenance banner.
- Support links.
- Safe polling intervals.
- Profile transfer availability.

Remote config must not carry media source data.

## 10. Temporary Profile Transfer Session

Temporary profile transfer helps users move their own profile configuration between owned devices or from web to TV.

Rules:

- Sessions expire.
- Payload is encrypted before backend storage.
- Backend stores encrypted payload only temporarily.
- Backend does not inspect profile contents.
- Backend is not source of truth for profiles.
- Consumed sessions are marked consumed.
- Expired sessions become inaccessible.

Suggested fields:

- `sessionId`
- `userId`
- `deviceId`
- `encryptedPayload`
- `expiresAt`
- `consumedAt`
- `createdAt`

## 11. Backend Storage Boundary

Backend may store:

- User records.
- Device records.
- Activation sessions.
- License status.
- App version records.
- Remote config records.
- Audit logs.
- Temporary encrypted transfer payloads.

Backend must not store third-party media source data as business data.

## 12. Android First Client Rules

Android TV / Fire TV must integrate in this order:

1. Health/API reachability check.
2. App version check.
3. Remote config fetch.
4. Device identity creation/loading.
5. Activation session start and polling.
6. License check.
7. Optional temporary profile transfer.

Android client must not assume payment enforcement is active during free launch.

## 13. API Surface Draft

Initial endpoint direction:

- `GET /health`
- `GET /app-version?platform=android_tv&version=x.y.z`
- `GET /remote-config?platform=android_tv&version=x.y.z`
- `POST /devices/activation-sessions`
- `GET /devices/activation-sessions/:id`
- `POST /devices/activation-sessions/:id/approve`
- `POST /license/check`
- `POST /profile-transfer-sessions`
- `GET /profile-transfer-sessions/:id`
- `POST /profile-transfer-sessions/:id/consume`

Endpoint names may be refined during implementation, but the boundary rules must remain stable.

## 14. Implementation Gate

Before backend or Android implementation starts:

- This contract must be accepted as the integration baseline.
- Database MVP must follow this contract.
- API MVP must expose only contract-safe endpoints.
- Android client must consume platform services without requesting media provider services.

Any request outside this boundary must be rejected as out of scope.
