# M17 Auth Specialist Task Pack

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M17 defines the authentication and authorization direction for `TV_Project_Platform` after the EA0 launch-scope correction.

The platform does not need a normal customer email/name account system for launch MVP.

Launch MVP / EA0 auth must support:

- One OWNER login for the site/operator, when owner dashboard is enabled.
- Device/customer access by Device ID plus Activation Key.
- Device/license/access records tied to Device ID identity.
- Single-page customer portal later.
- Future reseller accounts after launch MVP stability.

Auth must not create a staff/task/department role system for the website.

## 2. Corrected Role Model

Active launch MVP roles:

- OWNER
- CUSTOMER_ACCESS

Deferred future role:

- RESELLER

Not needed for current product:

- Email/name based customer account system.
- Extra ADMIN role.
- SUPPORT role.
- Staff/task role system.
- Department permission system.
- Complex organization/team permission matrix.

Rules:

- The project owner is the only site owner/admin.
- Customers/devices use Device ID plus Activation Key.
- Customers only manage their own linked device/profile/license/payment-status area when the portal is enabled.
- Resellers will exist later, but are not part of the immediate launch MVP.

## 3. Owner Role

OWNER means the single site owner/operator.

OWNER login may use a normal secure admin credential model.

OWNER may control:

- Website/admin dashboard.
- Device/customer access records.
- Device registration records.
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

- Read user local playlist/source contents as plaintext backend data.
- Store provider usernames/passwords.
- Force stream URLs to be uploaded as backend-visible data.
- Use remote config to distribute channel packages.
- Turn platform tools into content-provider tools.

## 4. Customer Access Model

CUSTOMER_ACCESS is not a traditional account with name/email.

Customer/device identity uses:

- Device ID.
- Activation Key.

Minimum rules:

- Backend generates Device ID.
- Backend generates Activation Key.
- Backend stores only `activationKeyHash`.
- Raw Activation Key is returned only during first bootstrap or recovery rotation.
- App stores Device ID + Activation Key locally.
- Activation Key verification must use safe hash comparison.
- Portal session, when enabled, must expire.
- Rate limiting must apply to failed attempts.

CUSTOMER_ACCESS may:

- Open the single-page customer portal later.
- View own device/access/license/payment-status information.
- Edit/save own playlist/profile area according to storage boundary when enabled.
- Send/sync own profile to linked device if enabled.

CUSTOMER_ACCESS must not:

- See other customers/devices.
- Access owner dashboard.
- Manage global config.
- Manage reseller functions.
- Upload provider credentials as platform account data.

## 5. Future Reseller Role

RESELLER is deferred until after launch MVP is stable.

When approved later, RESELLER may manage only reseller-scoped platform records:

- Own customers/devices.
- Own customer access/license actions within limits.
- Own credit balance and usage.
- Own activity history.

RESELLER remains below OWNER authority.

RESELLER must not:

- Become owner/admin.
- Manage global config.
- Manage app version policy.
- Use emergency controls.
- See all customers.
- Sell channels/IPTV/content/provider access.
- Store stream URLs or provider credentials as backend-visible data.

## 6. Auth Mission

Auth exists to prove:

- Who the OWNER is.
- Which Device ID + Activation Key pair may access platform services.
- Which device/license/access record belongs to that access record.
- Which future reseller owns which reseller-scoped records.

Auth does not prove ownership of media content, streams, providers, channels, or third-party sources.

## 7. EA0 Device Bootstrap Direction

EA0 should support:

- Device bootstrap without customer portal.
- Backend-generated Device ID.
- Backend-generated Activation Key.
- Hash-only Activation Key storage.
- Free launch license/access.

App bootstrap flow:

1. App starts.
2. App checks local Device ID + Activation Key.
3. If missing, app creates/sends privacy-safe `platformDeviceHash` if supported.
4. App calls `POST /devices/bootstrap`.
5. Backend creates or recovers DeviceAccessRecord.
6. Backend returns Device ID and raw Activation Key once.
7. App stores both locally.

Rules:

- No required customer email.
- No required customer name.
- No required phone/address.
- Activation Key must not be stored in plaintext in database.
- Device bootstrap must not ask for provider credentials.
- Device bootstrap must not ask for playlist/source ownership proof.
- Device bootstrap must not require payment during free launch.

## 8. Owner Login Direction

Owner login should support:

- Secure owner credential.
- Safe error messages.
- Session/token creation.
- Rate limiting.
- Strong secret handling.

Rules:

- Do not reveal whether username/email/password was the exact failure cause.
- Do not log password attempts.
- Do not expose tokens in logs.
- Do not allow unlimited login attempts.

## 9. Activation Key Security Direction

Activation Key handling must include:

- Backend-generated strong keys.
- Hash-only database storage.
- No plaintext database storage after generation/display.
- No Activation Key logging.
- Owner reset/regenerate capability later.

Recommended owner behavior:

- Owner can reset Activation Key for a Device ID / customer access record.
- Raw Activation Key is shown only at generation/reset/recovery time.
- After that, only masked key metadata is visible.

## 10. Session / Token Direction

Auth may use secure sessions or signed tokens depending on implementation choice.

Minimum requirements:

- Tokens/sessions must expire.
- Secrets must be stored only in secure environment variables.
- OWNER session is more sensitive than customer portal session.
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

## 12. Device Identity Direction

Device identity for EA0 uses:

- Backend Device ID.
- Activation Key.
- Optional `platformDeviceHash` for best-effort reinstall recovery.

Rules:

- Avoid MAC as the primary identifier.
- Avoid invasive hardware fingerprinting beyond what the app/platform legitimately provides.
- Device can be revoked or blocked.
- Device status must not depend on playlist/provider validation.
- Device record must not store provider credentials.

## 13. License Auth Direction

License/access check should verify Device ID + Activation Key platform permission.

It should not verify media permission.

Rules:

- License check requires Device ID + Activation Key.
- Free launch eligible devices receive access without payment blocking.
- Suspended, revoked, or blocked devices receive clear blocked states.
- License check must not inspect playlists, provider credentials, or source URLs.

## 14. Owner/Admin Auth Direction

OWNER dashboard access should protect:

- Device/customer access management.
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
- User playlist contents as plaintext backend data.
- Source scraping rules.

Rules:

- OWNER actions must be audited.
- OWNER UI must not expose secrets.
- OWNER UI must not expose raw Activation Keys after generation/reset/recovery.

## 15. Free Launch Auth Behavior

During free launch:

- Device ID / Activation Key infrastructure may exist.
- Payment enforcement is disabled by default.
- Payment absence must not block eligible Android TV / Fire TV usage.
- Subscription-first UI must not become the first-run blocker.

Auth exists to protect ownership and abuse boundaries, not to force payment early.

## 16. Rate Limit Direction

Auth-related rate limits should apply to:

- Device bootstrap.
- License check.
- Customer portal Device ID / Activation Key attempts later.
- Owner login.
- Activation Key reset later.
- Profile save/sync if backend is used.

Error response should be calm and not reveal internal thresholds.

## 17. Audit Direction

Auth-related audit events:

- device_access.created
- device_access.recovered
- device_access.key.rotated
- device_access.disabled
- device.bootstrap.success
- device.bootstrap.failed_limited
- device.registered
- device.revoked
- license.checked
- owner.login.success
- owner.login.failed_limited
- owner.device_access.updated
- owner.device.revoked
- owner.license.updated
- owner.download.updated
- owner.remote_config.updated

Audit metadata must not include:

- Raw Activation Keys.
- Passwords.
- Tokens.
- Secrets.
- Stream URLs.
- Provider credentials.
- Plaintext playlist/profile payloads.

## 18. Error Direction

Auth errors should be typed and safe.

Examples:

- invalid_device_credentials
- rate_limited
- session_expired
- unauthorized
- forbidden
- device_revoked
- license_suspended

Errors must not expose:

- Stack traces.
- Token internals.
- Hash details.
- Secret names/values.
- Provider/source details.

## 19. Deferred Auth Work

Deferred until needed:

- Customer email/password accounts.
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

- Customer email/name registration becomes mandatory for launch MVP.
- Auth requires provider credential storage.
- Auth requires plaintext playlist/source inspection.
- Auth becomes payment-first blocking during free launch.
- Owner/admin scope expands into channel/source/content management.
- Extra staff/task roles are added without explicit approval.
- Token/session storage rules are unclear.
- APK contains a hardcoded universal Activation Key.
- MAC becomes the primary product/contract identifier.

## 21. Acceptance Criteria

Auth direction is acceptable when:

- OWNER and CUSTOMER_ACCESS support launch MVP.
- RESELLER remains deferred until later.
- No customer email/name registration is required.
- No extra website staff/task role system exists.
- Device ID + Activation Key ownership is clear.
- License/access ownership is clear without media-provider drift.
- Free launch remains non-payment-blocking.
- Secrets, tokens, owner password, and raw Activation Keys are protected.
- Owner control remains platform/legal, not content/provider/source control.
