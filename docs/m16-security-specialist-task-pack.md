# M16 Security Specialist Task Pack

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M16 defines the security direction for the Core Media Player Ecosystem.

Security must protect:

- User accounts.
- Device activation.
- License checks.
- Remote configuration.
- Temporary encrypted profile transfer.
- Platform secrets.
- No-content boundary.

Security must not introduce media-provider behavior.

## 2. Governing Documents

Security work must follow:

- Master Project Checkpoint.
- M10 Ecosystem Alignment and Client Integration Contract.
- M11 Platform Database MVP Design Review.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.
- M14 Backend Specialist Task Pack.
- M15 Android Specialist Task Pack.

## 3. Security Mission

Protect the platform while keeping the product calm, trustworthy, and lightweight.

The security layer should:

- Prevent abuse.
- Protect secrets.
- Protect profile transfer privacy.
- Protect device activation.
- Protect license checks.
- Prevent accidental content-provider drift.
- Avoid over-engineering before MVP stability.

## 4. Non-Negotiable Security Boundary

The system must not secure or operate as if it owns media content.

Security must not add infrastructure for:

- Stream hosting.
- Stream relay.
- Stream transcoding.
- Provider scraping.
- Provider credential collection.
- Channel package control.
- Backend playlist inspection.
- DRM bypass.

If security work requires inspecting media sources, stop and escalate.

## 5. Secrets Policy

Secrets must never be stored in frontend code.

Protected secrets include:

- API keys.
- Database URLs.
- Auth signing secrets.
- Redis URLs.
- Payment provider secrets.
- Admin tokens.
- Third-party service credentials.

Rules:

- Secrets live only in secure environment variables.
- Secrets are never committed to repo.
- Secrets are never logged.
- Secrets are never sent to the Android client.
- Screenshots containing secrets must be treated as sensitive.

## 6. Logging Policy

Logs must be useful but safe.

Allowed logs:

- Endpoint name.
- Request result.
- Error category.
- Request timing.
- User/device ids where safe.
- Audit event name.

Forbidden logs:

- Passwords.
- Tokens.
- API keys.
- Database URLs.
- Provider credentials.
- Stream URLs.
- Playlist contents.
- Raw encrypted profile payloads.
- Decrypted profile data.

## 7. Rate Limit Direction

Rate limiting is required for abuse-prone endpoints.

Protect:

- `POST /devices/activation-sessions`
- `GET /devices/activation-sessions/:id`
- `POST /license/check`
- `POST /profile-transfer-sessions`
- `GET /profile-transfer-sessions/:id`
- `POST /profile-transfer-sessions/:id/consume`
- Future auth login endpoints.

Initial direction:

- Use conservative IP/device based limits.
- Return calm typed errors.
- Avoid exposing exact internal thresholds.
- Redis-backed rate limits can be added later if infrastructure work resumes.

## 8. Device Activation Security

Activation must protect against code guessing, spam, and reuse.

Rules:

- Activation codes expire quickly.
- Sessions are single-use.
- Polling interval is controlled by backend.
- Approval requires authenticated user when auth is implemented.
- Expired sessions cannot be approved.
- Consumed sessions cannot be reused.
- Activation response never includes profile payloads.
- Activation response never includes media source data.

Audit events:

- activation created.
- activation approved.
- activation expired.
- activation rejected.
- suspicious activation attempts.

## 9. Device Identity Security

Device identity must be privacy-safe.

Rules:

- Use app-level device key.
- Avoid invasive hardware fingerprinting.
- Avoid privileged hardware identifiers.
- Allow reinstall/app-data-clear to create a new identity when needed.
- Device can be revoked.
- Device can be blocked for abuse.

Device identity must not include:

- Provider credentials.
- Playlist contents.
- Stream URLs.
- Personal fingerprint data beyond MVP need.

## 10. License Check Security

License check must verify platform permission, not media permission.

Rules:

- Validate device state.
- Validate license state.
- Respect free launch rule.
- Do not inspect media sources.
- Do not validate provider credentials.
- Do not contact third-party media providers.
- Do not block payment during free launch unless project direction changes.

Potential states:

- free_launch_active.
- active.
- trialing.
- expired.
- suspended.
- device_revoked.
- blocked.

## 11. Remote Config Security

Remote config must be safe and narrow.

Allowed config:

- Feature flags.
- Free launch flag.
- Maintenance flag.
- Support contact.
- Polling intervals.
- Profile transfer availability.

Forbidden config:

- Stream URLs.
- Channel lists.
- Provider credentials.
- Scraping instructions.
- Payment secrets.
- Admin secrets.

Rules:

- Unknown fields should be ignored by clients.
- Config changes should be audited.
- Dangerous config values should be rejected.

## 12. Profile Transfer Security

Profile transfer is the highest privacy-sensitive MVP flow.

Rules:

- Payload must be encrypted before backend storage.
- Backend must not decrypt payload.
- Backend must not parse payload.
- Backend must not index payload contents.
- Backend must not log payload contents.
- Transfer sessions expire quickly.
- Consumed sessions become inaccessible.
- Expired sessions must not expose payload.

Backend role:

- Temporary encrypted bridge only.

Backend is not:

- Profile source of truth.
- Playlist owner.
- Content authority.
- Provider credential manager.

## 13. Auth Security Direction

Auth implementation is deferred but must follow these rules later:

- Passwords are hashed with modern secure hashing.
- Sessions/tokens are short enough for safety.
- Admin actions require admin role.
- Activation approval requires authenticated user.
- Profile transfer requires authenticated user/device context.
- Admin mutations are audited.

MVP auth must not be used to justify media-provider behavior.

## 14. Admin Security Direction

Admin dashboard must be narrow at MVP.

Admin may manage:

- Users.
- Devices.
- License states.
- App versions.
- Remote config.
- Basic audit visibility.

Admin must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- User playlist contents.
- Source scraping rules.

## 15. Error Response Security

Errors should be clear but not revealing.

Good error categories:

- activation_session_expired.
- activation_session_consumed.
- rate_limited.
- device_revoked.
- license_suspended.
- profile_transfer_expired.
- profile_transfer_consumed.
- unsupported_app_version.

Errors must not expose:

- Stack traces.
- SQL details.
- Environment variables.
- Internal tokens.
- Provider details.
- Secret validation logic.

## 16. Abuse Scenarios To Test

Security Specialist should test:

- Activation code brute force.
- Activation session spam.
- Polling spam.
- License check spam.
- Profile transfer replay.
- Consumed transfer reuse.
- Expired transfer access.
- Remote config unsafe value injection.
- Secret leakage in logs.
- Invalid device state handling.

## 17. Free Launch Security

Free launch must be safe but not hostile.

Rules:

- Free launch access can be allowed without payment enforcement.
- Abuse protection still applies.
- Device revocation/blocking remains available.
- Payment absence does not block eligible early users.
- Payment UI must not become a security workaround requirement.

## 18. Stop Conditions

Stop and escalate if:

- A security requirement asks backend to inspect media sources.
- A feature asks to store provider credentials.
- A log would expose playlist/profile payloads.
- Remote config starts carrying source/channel data.
- Payment enforcement becomes required before free launch ends.
- Android needs unsafe hardware fingerprinting.
- Auth requirements are unclear for sensitive endpoints.

## 19. Acceptance Criteria

Security direction is acceptable when:

- Secrets policy is clear.
- Logging policy is safe.
- Activation abuse protection is defined.
- License check boundary is clear.
- Profile transfer privacy boundary is protected.
- Remote config cannot carry media-provider data.
- Free launch remains protected without payment-first blocking.
- No-content boundary is enforced as a security rule.

## 20. Next Specialist Pack

After M16:

- M17 Auth Specialist Task Pack.
- M18 Basic Dashboard Scope Pack.
- M19 Documentation Index / Project Map.
