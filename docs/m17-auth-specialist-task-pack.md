# M17 Auth Specialist Task Pack

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M17 defines the authentication and authorization direction for `TV_Project_Platform`.

Auth must support:

- The single site owner/admin.
- Customer accounts.
- Customer login.
- Customer dashboard access.
- Device registration / activation ownership.
- License/access ownership.
- Future reseller accounts, after launch MVP.

Auth must not create a staff/task/department role system for the website.

## 2. Corrected Role Model

The website/platform role model is intentionally simple.

Active launch MVP roles:

- OWNER
- CUSTOMER

Deferred future role:

- RESELLER

Not needed for current product:

- Extra ADMIN role.
- SUPPORT role.
- Staff/task role system.
- Department permission system.
- Complex organization/team permission matrix.

Rule:

- The project owner is the only site owner/admin.
- Customers only manage their own account, devices, activation, and access status.
- Resellers will exist later, but are not part of the immediate launch MVP.

## 3. Owner Role

OWNER means the single site owner/operator.

OWNER may control:

- Website/admin dashboard.
- Customer records.
- Customer account status.
- Device registration and activation records.
- Device revoke/block state.
- License/access records.
- Free launch access.
- App version policy.
- Update metadata.
- Remote config.
- Download metadata.
- Legal/Terms/Privacy versions.
- Audit logs.
- Future reseller records and credit controls after reseller phase is approved.

OWNER must not use platform authority to manage private media/source/provider data.

OWNER must not:

- Read user local playlist/source contents from backend.
- Store provider usernames/passwords.
- Force stream URLs to be uploaded.
- Use remote config to distribute channel packages.
- Turn platform tools into content-provider tools.

## 4. Customer Role

CUSTOMER may control only their own platform account area.

CUSTOMER may:

- Register.
- Log in.
- View account status.
- View own devices.
- Approve/link own device activation.
- View own license/access status.
- Use customer dashboard basics.

CUSTOMER must not:

- See other customers.
- See other devices.
- Manage global license/access states.
- Access admin dashboard.
- Access reseller functions unless later assigned through reseller model.

## 5. Future Reseller Role

RESELLER is deferred until after launch MVP is stable.

When approved later, RESELLER may manage only reseller-scoped platform records:

- Own customers.
- Own customer devices.
- Own customer access/license actions within limits.
- Own credit balance and usage.
- Own activity history.

RESELLER remains below OWNER authority.

RESELLER must not:

- Become an admin.
- Manage global config.
- Manage app version policy.
- Use emergency controls.
- See all customers.
- Sell channels/IPTV/content/provider access.
- Store stream URLs or provider credentials.

## 6. Auth Mission

Auth exists to prove:

- Who the OWNER is.
- Who the CUSTOMER is.
- Which customer owns which account/device/license record.
- Which future reseller owns which reseller-scoped customer/device/license records.

Auth does not prove ownership of media content, streams, providers, channels, or third-party sources.

## 7. Registration Direction

Customer registration should support:

- Email.
- Password.
- Basic customer account record.
- Email normalization.
- Duplicate email protection.

Rules:

- Password must never be stored in plaintext.
- Password hash only.
- Registration must not ask for provider credentials.
- Registration must not ask for playlist/source ownership proof.
- Registration must not require payment during free launch.

## 8. Login Direction

Login should support:

- Email and password.
- Safe error messages.
- Session/token creation.
- Rate limiting.

Rules:

- Do not reveal whether email or password was the exact failure cause.
- Do not log password attempts.
- Do not expose tokens in logs.
- Do not allow unlimited login attempts.

## 9. Password Security Direction

Password handling must include:

- Modern password hashing.
- Unique salt behavior from the hashing algorithm.
- Minimum password policy.
- Password reset flow later if needed.
- No plaintext storage.
- No password logging.

## 10. Session / Token Direction

Auth may use secure sessions or signed tokens depending on future implementation choice.

Minimum requirements:

- Tokens/sessions must expire.
- Secrets must be stored only in secure environment variables.
- Refresh behavior must be explicit if added.
- OWNER session is more sensitive than customer session.
- Logout should invalidate or abandon client session state safely.

Rules:

- Tokens must never be stored in repo.
- Tokens must never be sent to unrelated clients.
- Tokens must never be included in public endpoint responses.

## 11. Public Endpoint Direction

Public lightweight endpoints:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`

Rules:

- These endpoints should not require login for normal client startup.
- They must not expose secrets.
- They must not expose media source data.
- Remote config must remain safe and narrow.

## 12. Activation Auth Direction

Activation creation:

- TV client may create activation session without login.
- Must be rate-limited.
- Must expire.
- Must not create a final Device before approval/linking.

Activation approval/linking:

- Requires authenticated CUSTOMER or OWNER context.
- Binds activation session to a customer.
- Creates or updates Device.
- May create free-launch LicenseGrant.
- Writes AuditLog.

Rules:

- Expired sessions cannot be approved.
- Consumed sessions cannot be reused.
- Payment must not be required during free launch activation.

## 13. License Auth Direction

License/access check should verify account/device platform permission.

It should not verify media permission.

Rules:

- License check may require device identity.
- Free launch eligible devices receive access without payment blocking.
- Suspended, revoked, or blocked devices receive clear blocked states.
- License check must not inspect playlists, provider credentials, or source URLs.

## 14. Owner/Admin Auth Direction

OWNER dashboard access should protect:

- Customer management.
- Device management.
- License/access state management.
- App version management.
- Remote config management.
- Download metadata management.
- Legal/Terms/Privacy version management.
- Audit log visibility.
- Future reseller/credit management after approval.

OWNER must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- User playlist contents.
- Source scraping rules.

Rules:

- OWNER actions must be audited.
- OWNER UI must not expose secrets.
- OWNER UI must not show encrypted profile payloads as normal dashboard data.

## 15. Free Launch Auth Behavior

During free launch:

- Account/device infrastructure may exist.
- Payment enforcement is disabled by default.
- Login may support account/device ownership.
- Payment absence must not block eligible Android TV / Fire TV usage.
- Subscription-first UI must not become the first-run blocker.

Auth exists to protect ownership and abuse boundaries, not to force payment early.

## 16. Rate Limit Direction

Auth-related rate limits should apply to:

- Registration.
- Login.
- Password reset later.
- Activation creation.
- Activation approval attempts.
- License check.

Error response should be calm and not reveal internal thresholds.

## 17. Audit Direction

Auth-related audit events:

- customer.registered
- customer.login.success
- customer.login.failed_limited
- customer.logout
- customer.password_reset_requested
- device.activation.approved
- owner.customer.updated
- owner.device.revoked
- owner.license.updated
- owner.download.updated
- owner.remote_config.updated

Audit metadata must not include:

- Passwords.
- Tokens.
- Secrets.
- Stream URLs.
- Provider credentials.
- Profile payloads.

## 18. Error Direction

Auth errors should be typed and safe.

Examples:

- invalid_credentials
- rate_limited
- session_expired
- unauthorized
- forbidden
- activation_auth_required
- device_revoked

Errors must not expose:

- Stack traces.
- Token internals.
- Password hash details.
- Secret names/values.
- Provider/source details.

## 19. Deferred Auth Work

Deferred until needed:

- Social login.
- Multi-factor authentication.
- Advanced account recovery.
- Reseller role enforcement.
- Payment-provider customer portal auth.

Explicitly not planned:

- Separate staff admin system.
- Support role system.
- Complex department/task permissions inside the website.
- Organization/team accounts.

## 20. Stop Conditions

Stop and escalate if:

- Auth requires provider credential storage.
- Auth requires playlist/source inspection.
- Auth becomes payment-first blocking during free launch.
- Owner/admin scope expands into channel/source/content management.
- Extra staff/task roles are added without explicit approval.
- Device identity requires invasive hardware fingerprinting.
- Token/session storage rules are unclear.

## 21. Acceptance Criteria

Auth direction is acceptable when:

- OWNER and CUSTOMER roles support launch MVP.
- RESELLER remains deferred until later.
- No extra website staff/task role system exists.
- Activation approval ownership is clear.
- License/access ownership is clear without media-provider drift.
- Free launch remains non-payment-blocking.
- Secrets, tokens, and passwords are protected.
- Owner control remains platform/legal, not content/provider/source control.
