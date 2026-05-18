# M14 Backend Specialist Task Pack

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

This task pack defines what the Backend Specialist should implement when backend coding is re-approved.

The backend must follow:

- Master Project Checkpoint.
- M10 Ecosystem Alignment and Client Integration Contract.
- M11 Platform Database MVP Design Review.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.

## 2. Backend Mission

Build the platform core for the Core Media Player Ecosystem.

The backend supports:

- Account identity.
- Device activation.
- License state.
- App version policy.
- Remote config.
- Temporary encrypted profile transfer.
- Audit logging.

The backend must not become a media provider backend.

## 3. Non-Negotiable Boundary

The backend must not implement:

- Media stream hosting.
- Channel list selling.
- Provider scraping.
- Provider credential collection.
- Backend stream relay.
- Stream transcoding.
- DRM bypass.
- Unauthorized source collection.
- Content catalog storage.

If a requested feature crosses this boundary, stop and escalate to the Ecosystem Integration Director.

## 4. Implementation Priority

When coding resumes, order is:

1. Database MVP models.
2. Prisma client generation.
3. Health endpoint stability.
4. App version endpoint.
5. Remote config endpoint.
6. Device activation session creation.
7. Device activation polling.
8. Activation approval flow.
9. License check flow.
10. Temporary profile transfer create/read/consume.
11. Audit logging.
12. Basic admin/customer dashboard support APIs later.

Do not start reseller, payment enforcement, analytics, or advanced dashboard before this core is stable.

## 5. Database Work

Use the M11 entity set:

- User
- Device
- ActivationSession
- LicenseGrant
- AppVersion
- RemoteConfig
- ProfileTransferSession
- AuditLog

Required backend behavior:

- Keep models narrow.
- Add indexes for lookup and cleanup paths.
- Avoid storing media source data.
- Avoid storing unencrypted profile payloads.
- Keep payment/subscription enforcement disabled during free launch.

## 6. API Work

Implement the M12 endpoint set:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`
- `POST /devices/activation-sessions`
- `GET /devices/activation-sessions/:id`
- `POST /devices/activation-sessions/:id/approve`
- `POST /license/check`
- `POST /profile-transfer-sessions`
- `GET /profile-transfer-sessions/:id`
- `POST /profile-transfer-sessions/:id/consume`

Each endpoint must include:

- Input validation.
- Safe defaults.
- Clear error response.
- Audit logging where appropriate.
- No media-provider behavior.

## 7. Device Activation Requirements

Activation flow must:

- Generate short activation codes.
- Expire codes.
- Keep sessions single-use.
- Support TV polling.
- Create/bind Device only after approval.
- Avoid profile/media payloads in activation response.

Approval flow must:

- Require authenticated user context when auth is implemented.
- Reject expired sessions.
- Reject reused sessions.
- Create free-launch license grant when appropriate.
- Write audit log.

## 8. License Check Requirements

License check must:

- Read device state.
- Read license grant state.
- Respect free launch.
- Return clear allow/block state.
- Update lastSeenAt / lastCheckedAt when appropriate.

During free launch:

- `paymentRequired` remains false for eligible devices.
- Paid subscription enforcement is not production blocking.
- Payment absence must not block the first Android TV / Fire TV release.

License check must not:

- Inspect playlists.
- Validate provider credentials.
- Validate stream URLs.
- Contact media providers.

## 9. App Version Requirements

App version endpoint must:

- Accept platform and version.
- Return current recommended version.
- Return minimum supported version.
- Return force update flag.
- Return release notes when configured.
- Fall back safely if no database record exists.

Force update must be conservative during early launch.

## 10. Remote Config Requirements

Remote config endpoint may return:

- Free launch flag.
- Maintenance flag.
- Feature flags.
- Support contact.
- Polling intervals.
- Profile transfer availability.

Remote config must not return:

- Media sources.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 11. Profile Transfer Requirements

Profile transfer must:

- Accept encrypted payload only.
- Store payload temporarily.
- Expire quickly.
- Mark consumed sessions.
- Hide payload after expiration or consumption.
- Avoid logging payload contents.

Backend must not decrypt, parse, inspect, validate, or index profile payload contents.

## 12. Audit Requirements

Audit log should record:

- Activation session created.
- Activation approved.
- Device revoked.
- License checked.
- App version updated.
- Remote config updated.
- Profile transfer created.
- Profile transfer consumed.

Audit metadata must be redacted and must not contain media source payloads.

## 13. Auth Direction

Initial auth direction:

- Public: health, app-version, remote-config.
- Rate-limited public: activation session creation and polling.
- Authenticated later: activation approval, profile transfer, admin mutation endpoints.
- Device identity protected later: license check.

Full auth implementation requires a separate task pack.

## 14. Rate Limit Direction

Rate limits should be applied to:

- Activation creation.
- Activation polling.
- License check.
- Profile transfer creation.
- Profile transfer read/consume.

Redis can be used later if infrastructure work is re-approved.

## 15. Error Handling Direction

Errors should be calm, typed, and safe.

Examples:

- `activation_session_expired`
- `activation_session_consumed`
- `device_revoked`
- `license_suspended`
- `profile_transfer_expired`
- `profile_transfer_consumed`
- `unsupported_app_version`

Do not expose stack traces, secrets, database URLs, tokens, or provider information.

## 16. Testing Direction

Backend Specialist should prepare tests for:

- Health endpoint.
- App version safe default.
- Remote config safe default.
- Activation session creation.
- Activation expiration.
- License free launch state.
- Profile transfer expiration and consumption.
- Boundary protection cases.

## 17. Stop Conditions

Stop implementation and escalate if:

- A requirement asks backend to provide media sources.
- A requirement asks backend to store provider credentials.
- Payment enforcement becomes required before free launch ends.
- Android needs an endpoint not covered by M12.
- Database models begin drifting into media-provider behavior.
- Auth/security requirements are unclear.

## 18. Acceptance Criteria

Backend MVP is acceptable when:

- M12 endpoints are implemented with database-backed behavior.
- M11 storage boundary is respected.
- Free launch behavior is enforced correctly.
- Android first-client can integrate without guessing.
- No media-provider functionality exists.
- Tests cover main contract paths.

## 19. Next Specialist Pack

After this task pack:

- Android Specialist Task Pack.
- Security Specialist Task Pack.
- Auth Specialist Task Pack.
- Basic Dashboard Scope Pack.
