# M12 Core API MVP Contract v1

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work.

## 1. Purpose

M12 defines the first backend API contract for the Core Media Player Ecosystem.

The API exists to support:

- Android TV / Fire TV first-client integration.
- Device activation.
- License check.
- App version check.
- Remote config.
- Temporary encrypted profile transfer.
- Basic health verification.

The API must not become a media provider API.

## 2. Global API Boundary

All endpoints must respect these rules:

- No media source hosting.
- No media source selling.
- No source scraping.
- No provider credential collection.
- No backend stream relay.
- No backend stream transformation.
- No channel package management.
- No profile payload inspection.

Allowed backend role:

- Identity.
- Device state.
- License state.
- Version policy.
- Safe remote configuration.
- Temporary encrypted transfer coordination.

## 3. Base Client Assumptions

Initial client:

- Android TV / Fire TV.

Client integration order:

1. Health check.
2. App version check.
3. Remote config fetch.
4. Device identity load/create.
5. Activation session start.
6. Activation session polling.
7. License check.
8. Optional temporary profile transfer.

## 4. Endpoint Summary

Initial endpoint set:

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

## 5. GET /health

Purpose:

- Confirms API reachability.

Used by:

- Web dashboard.
- Android client diagnostics.
- Internal smoke tests.

Request:

- No body.

Response:

- `status`
- `service`
- `scope`

Database:

- No database read required.
- No database write required.

Rules:

- Must be lightweight.
- Must not expose secrets.
- Must not expose infrastructure details.

## 6. GET /app-version

Purpose:

- Tells the client whether its app version is supported.

Used by:

- Android TV / Fire TV client at startup and safe intervals.

Query parameters:

- `platform`
- `version`
- optional `channel`

Response:

- `platform`
- `requestedVersion`
- `currentRecommendedVersion`
- `minimumSupportedVersion`
- `forceUpdate`
- `updateUrl`
- `releaseNotes`
- `freeLaunch`

Database:

- Reads AppVersion records.
- No write required for basic MVP.

Rules:

- Force update must be conservative.
- Missing records should return safe defaults.
- Must not return media source data.

## 7. GET /remote-config

Purpose:

- Provides safe runtime configuration for clients.

Used by:

- Android TV / Fire TV client.
- Future clients.

Query parameters:

- `platform`
- `version`
- optional `channel`

Response:

- `freeLaunch`
- `maintenance`
- `features`
- `polling`
- `support`

Database:

- Reads enabled RemoteConfig records.
- No write required for client request.

Allowed config:

- Feature flags.
- Free launch status.
- Maintenance banner.
- Support link/email.
- Safe polling intervals.
- Profile transfer availability.

Forbidden config:

- Media source URLs.
- Channel package data.
- Provider credentials.
- Scraped metadata.

## 8. POST /devices/activation-sessions

Purpose:

- Starts TV device activation flow.

Used by:

- Android TV / Fire TV client.

Request body:

- `platform`
- `deviceName`
- `deviceKey`
- `appVersion`

Response:

- `sessionId`
- `activationCode`
- `status`
- `platform`
- `expiresAt`
- `pollingSeconds`

Database:

- Writes ActivationSession.
- May not create Device until approval.

Rules:

- Activation code must expire.
- Session must be single-use.
- Polling interval must be controlled.
- Response must not include profile payloads.
- Response must not include media source data.

## 9. GET /devices/activation-sessions/:id

Purpose:

- Allows TV client to poll activation status.

Used by:

- Android TV / Fire TV client.

Path parameters:

- `id`

Response:

- `sessionId`
- `status`
- `activated`
- `deviceId`
- optional `message`

Database:

- Reads ActivationSession.
- May read Device if approved.

Rules:

- Polling must be rate-limited at API/service level.
- Expired sessions return expired state.
- Consumed sessions return final state.
- No profile or media data returned.

## 10. POST /devices/activation-sessions/:id/approve

Purpose:

- Allows authenticated web/mobile user to approve a TV activation code.

Used by:

- Web dashboard or future mobile account flow.

Path parameters:

- `id`

Request body:

- authenticated user context
- optional device label

Response:

- `sessionId`
- `status`
- `deviceId`
- `approvedAt`

Database:

- Reads ActivationSession.
- Creates or updates Device.
- Updates ActivationSession.
- May create LicenseGrant with free launch state.
- Writes AuditLog.

Rules:

- Requires authenticated user.
- Must reject expired sessions.
- Must reject reused sessions.
- Must not require payment during free launch.

## 11. POST /license/check

Purpose:

- Tells the client whether the activated device may operate.

Used by:

- Android TV / Fire TV client.
- Future clients.

Request body:

- `deviceId`
- `deviceKey`
- `platform`
- `appVersion`

Response:

- `state`
- `allowed`
- `freeLaunch`
- `paymentRequired`
- `platform`
- `appVersion`
- `deviceId`
- `deviceStatus`
- `message`

Database:

- Reads Device.
- Reads LicenseGrant.
- May update Device.lastSeenAt.
- May update LicenseGrant.lastCheckedAt.
- May write AuditLog.

Free launch behavior:

- Activated valid devices may receive `free_launch_active`.
- Payment enforcement remains disabled.
- Payment missing must not block initial Android TV / Fire TV release usage.

Rules:

- Must not validate stream sources.
- Must not inspect profile data.
- Must not check provider credentials.

## 12. POST /profile-transfer-sessions

Purpose:

- Creates temporary encrypted profile transfer session.

Used by:

- Web dashboard.
- Android client in controlled transfer flows.

Request body:

- `userId`
- `deviceId`
- `encryptedPayload`
- `payloadVersion`

Response:

- `sessionId`
- `status`
- `payloadStored`
- `payloadVersion`
- `expiresAt`

Database:

- Writes ProfileTransferSession.
- May write AuditLog.

Rules:

- Payload must already be encrypted.
- Backend must not inspect payload contents.
- Session must expire quickly.
- Backend is not profile source of truth.

## 13. GET /profile-transfer-sessions/:id

Purpose:

- Reads transfer session availability.

Used by:

- Receiving client.

Path parameters:

- `id`

Response:

- `sessionId`
- `status`
- `encryptedPayload`
- `expiresAt`
- `consumedAt`

Database:

- Reads ProfileTransferSession.

Rules:

- Expired sessions must not expose payload.
- Consumed sessions must not expose payload.
- Unauthorized users/devices must be rejected.

## 14. POST /profile-transfer-sessions/:id/consume

Purpose:

- Marks transfer session consumed.

Used by:

- Receiving client after successful import.

Path parameters:

- `id`

Response:

- `sessionId`
- `status`
- `consumedAt`

Database:

- Reads ProfileTransferSession.
- Updates consumedAt.
- May write AuditLog.

Rules:

- Consumption is one-way.
- Consumed sessions should not be reused.
- Payload should become inaccessible after consumption.

## 15. Authentication Direction

MVP planning assumption:

- Public lightweight endpoints: health, app-version, remote-config.
- Activation creation may be unauthenticated but rate-limited.
- Activation approval requires authenticated user.
- License check requires valid device identity or device token.
- Profile transfer requires authenticated user/device context.

Full auth implementation is deferred until backend implementation is re-approved.

## 16. Rate Limit Direction

Rate limits should apply to:

- Activation session creation.
- Activation polling.
- License check.
- Profile transfer creation.
- Profile transfer retrieval.

Rate limit store may use Redis later, but live infrastructure is currently paused.

## 17. M12 Acceptance Criteria

M12 is acceptable when:

- Every Android-first endpoint has a clear purpose.
- Each endpoint maps to database intent.
- Free launch behavior is preserved.
- No endpoint introduces media-provider behavior.
- Profile transfer privacy boundary is preserved.
- Implementation can be resumed later without contract ambiguity.

## 18. Next Step

After M12:

- Prepare Android First Client Integration Checklist.
- Prepare Backend Specialist Task Pack for future implementation.
- Keep hosting/deploy work paused unless explicitly re-approved.
