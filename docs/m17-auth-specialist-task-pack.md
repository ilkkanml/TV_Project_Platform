# M17 Auth Specialist Task Pack

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M17 defines the authentication and authorization direction for the Core Media Player Ecosystem.

Auth must support:

- Customer accounts.
- Admin accounts.
- Device activation approval.
- License ownership.
- Temporary encrypted profile transfer ownership.
- Basic dashboard access.

Auth must not create media-provider behavior.

## 2. Governing Documents

Auth work must follow:

- Master Project Checkpoint.
- M10 Ecosystem Alignment and Client Integration Contract.
- M11 Platform Database MVP Design Review.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.
- M14 Backend Specialist Task Pack.
- M15 Android Specialist Task Pack.
- M16 Security Specialist Task Pack.

## 3. Auth Mission

Auth exists to prove who owns an account, who may approve a device, and who may manage platform records.

Auth does not prove ownership of media content, streams, providers, channels, or third-party sources.

## 4. Non-Negotiable Boundary

Auth must not be used to manage or validate:

- Stream URLs.
- Channel packages.
- Provider accounts.
- Provider credentials.
- Backend playlist contents.
- Scraped source data.
- DRM bypass flows.

If an auth requirement depends on media-provider behavior, stop and escalate to the Ecosystem Integration Director.

## 5. MVP Roles

Initial roles:

- CUSTOMER
- ADMIN

Deferred role:

- RESELLER

Rules:

- CUSTOMER owns their account, devices, license state, and temporary transfer sessions.
- ADMIN manages platform operation records.
- RESELLER exists later and must not drive MVP behavior.
- Roles must remain simple until the core flow is stable.

## 6. Account Registration Direction

Registration should eventually support:

- Email.
- Password.
- Basic profile creation.
- Email normalization.
- Duplicate email protection.

Rules:

- Password must never be stored in plaintext.
- Password hash only.
- Registration must not ask for provider credentials.
- Registration must not ask for playlist/source ownership proof.
- Registration must not require payment during free launch.

## 7. Login Direction

Login should eventually support:

- Email and password.
- Safe error messages.
- Session/token creation.
- Rate limiting.
- Optional email verification later.

Rules:

- Do not reveal whether email or password was the exact failure cause.
- Do not log password attempts.
- Do not expose tokens in logs.
- Do not allow unlimited login attempts.

## 8. Password Security Direction

Password handling must include:

- Modern password hashing.
- Unique salt behavior from the hashing algorithm.
- Minimum password policy.
- Password reset flow later.
- No plaintext storage.
- No password logging.

Password reset is deferred until account MVP requires it.

## 9. Session / Token Direction

Auth may use secure sessions or signed tokens depending on future implementation choice.

Minimum requirements:

- Tokens/sessions must expire.
- Secrets must be stored only in secure environment variables.
- Refresh behavior must be explicit if added.
- Admin sessions should be more sensitive than customer sessions.
- Logout should invalidate or abandon client session state safely.

Rules:

- Tokens must never be stored in repo.
- Tokens must never be sent to unrelated clients.
- Tokens must never be included in public endpoint responses.

## 10. Public Endpoint Direction

Public lightweight endpoints:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`

Rules:

- These endpoints should not require login for normal client startup.
- They must not expose secrets.
- They must not expose media source data.
- Remote config must remain safe and narrow.

## 11. Activation Auth Direction

Activation creation:

- TV client may create activation session without login.
- Must be rate-limited.
- Must expire.
- Must not create a final Device before approval.

Activation approval:

- Requires authenticated CUSTOMER or ADMIN context.
- Binds activation session to a user.
- Creates or updates Device.
- May create free-launch LicenseGrant.
- Writes AuditLog.

Rules:

- Expired sessions cannot be approved.
- Consumed sessions cannot be reused.
- Payment must not be required during free launch activation.

## 12. Device Auth Direction

Device identity should be app-level and privacy-safe.

Device-authenticated operations later may include:

- License check.
- Activation status polling.
- Profile transfer receive flow.

Rules:

- Do not rely on invasive hardware fingerprinting.
- Do not send unnecessary personal device data.
- Device tokens, if added later, must be revocable.
- Revoked devices must not pass license checks.

## 13. License Auth Direction

License check should verify account/device permission.

It should not verify media permission.

Rules:

- License check may require device identity.
- License check may require device token later.
- Free launch eligible devices receive access without payment blocking.
- Suspended, revoked, or blocked devices receive clear blocked states.
- License check must not inspect playlists, provider credentials, or source URLs.

## 14. Profile Transfer Auth Direction

Profile transfer is sensitive and must require ownership context.

Create transfer session:

- Requires authenticated user.
- Requires user-owned device or approved target flow.
- Accepts encrypted payload only.

Read/consume transfer session:

- Requires valid receiving context.
- Must reject expired sessions.
- Must reject consumed sessions.
- Must not expose payload to unrelated users/devices.

Rules:

- Backend must not decrypt payload.
- Backend must not parse payload.
- Backend must not log payload.
- Backend is temporary bridge only.

## 15. Admin Auth Direction

Admin access should eventually protect:

- User management.
- Device management.
- License state management.
- App version management.
- Remote config management.
- Audit log visibility.

Admin must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- User playlist contents.
- Source scraping rules.

Rules:

- Admin role required for admin mutations.
- Admin actions must be audited.
- Admin UI must not expose secrets.
- Admin UI must not show encrypted profile payloads.

## 16. Free Launch Auth Behavior

During free launch:

- Account/device infrastructure may exist.
- Payment enforcement is disabled by default.
- Login may support account/device ownership.
- Payment absence must not block eligible Android TV / Fire TV usage.
- Subscription-first UI must not become the first-run blocker.

Auth exists to protect ownership and abuse boundaries, not to force payment early.

## 17. Rate Limit Direction

Auth-related rate limits should apply to:

- Registration.
- Login.
- Password reset later.
- Activation creation.
- Activation approval attempts.
- License check.
- Profile transfer create/read/consume.

Error response should be calm and not reveal internal thresholds.

## 18. Audit Direction

Auth-related audit events:

- user.registered
- user.login.success
- user.login.failed_limited
- user.logout
- user.password_reset_requested
- device.activation.approved
- admin.user.updated
- admin.device.revoked
- admin.license.updated

Audit metadata must not include:

- Passwords.
- Tokens.
- Secrets.
- Stream URLs.
- Provider credentials.
- Profile payloads.

## 19. Error Direction

Auth errors should be typed and safe.

Examples:

- invalid_credentials
- rate_limited
- session_expired
- unauthorized
- forbidden
- activation_auth_required
- device_revoked
- profile_transfer_unauthorized

Errors must not expose:

- Stack traces.
- Token internals.
- Password hash details.
- Secret names/values.
- Provider/source details.

## 20. Deferred Auth Work

Deferred until core MVP needs it:

- Social login.
- Multi-factor authentication.
- Advanced account recovery.
- Reseller role enforcement.
- Organization/team accounts.
- Complex permission matrix.
- Payment-provider customer portal auth.

## 21. Stop Conditions

Stop and escalate if:

- Auth requires provider credential storage.
- Auth requires playlist/source inspection.
- Auth becomes payment-first blocking during free launch.
- Admin scope expands into channel/source management.
- Device identity requires invasive hardware fingerprinting.
- Profile transfer cannot stay encrypted and temporary.
- Token/session storage rules are unclear.

## 22. Acceptance Criteria

Auth direction is acceptable when:

- CUSTOMER and ADMIN roles are clear.
- Activation approval ownership is clear.
- License ownership is clear without media-provider drift.
- Profile transfer ownership is protected.
- Free launch remains non-payment-blocking.
- Secrets, tokens, and passwords are protected.
- Admin scope remains narrow.

## 23. Next Specialist Pack

After M17:

- M18 Basic Dashboard Scope Pack.
- M19 Documentation Index / Project Map.
- M20 Department Operating Protocol.
