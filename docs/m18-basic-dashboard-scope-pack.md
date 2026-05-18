# M18 Basic Dashboard Scope Pack

Status: Active Draft
Mode: Planning only. No production deploy, hosting, live database, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M18 defines the safe MVP dashboard scope for the Core Media Player Ecosystem.

The dashboard exists to support platform operations, not content management.

It should remain narrow, calm, and useful.

## 2. Governing Documents

Dashboard work must follow:

- Master Project Checkpoint.
- M10 Ecosystem Alignment and Client Integration Contract.
- M11 Platform Database MVP Design Review.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.
- M14 Backend Specialist Task Pack.
- M15 Android Specialist Task Pack.
- M16 Security Specialist Task Pack.
- M17 Auth Specialist Task Pack.

## 3. Dashboard Mission

The dashboard should help users and admins manage platform-level records:

- Account identity.
- Devices.
- Activation flow.
- License status.
- App version policy.
- Remote config.
- Temporary encrypted profile transfer.
- Basic audit visibility.

The dashboard must not manage media content, streams, channels, or providers.

## 4. Non-Negotiable Boundary

The dashboard must not include:

- Channel package management.
- Stream URL management.
- Provider account management.
- Provider credential forms.
- Backend playlist editor.
- Source scraping tools.
- IPTV package sales UI.
- Content catalog pages.
- Media analytics based on third-party sources.

If a dashboard feature crosses this boundary, stop and escalate to the Ecosystem Integration Director.

## 5. MVP Dashboard Areas

Allowed MVP areas:

1. Customer account area.
2. Customer device area.
3. Device activation approval page.
4. License status page.
5. Temporary encrypted profile transfer page.
6. Basic admin user/device/license view.
7. App version management.
8. Remote config management.
9. Basic audit log view.

Deferred areas:

- Billing portal.
- Subscription enforcement UI.
- Reseller panel.
- Advanced analytics.
- Support ticket system.
- Organization/team management.
- Content/source management.

## 6. Customer Dashboard Scope

Customer may see:

- Account email.
- Active devices.
- Device names.
- Device platform.
- Device last seen time.
- Device status.
- License state.
- Free launch status.
- Activation approval screen.
- Profile transfer tools.

Customer may do:

- Rename own device.
- Revoke own device.
- Approve activation code.
- Create encrypted profile transfer session.
- Consume/import encrypted profile transfer session if applicable.

Customer must not see or manage:

- Stream URLs stored by backend.
- Channel packages.
- Provider accounts.
- Other users' devices.
- Raw audit internals.
- Secrets or tokens.
- Unencrypted profile payloads.

## 7. Activation Approval Page

Purpose:

- Lets authenticated customer approve a TV activation code.

Page should include:

- Activation code input.
- Device name/platform if available.
- Expiration notice.
- Approve button.
- Calm success/failure state.

Rules:

- No payment gate during free launch.
- Expired code shows retry message.
- Consumed code shows already-used message.
- Approval creates/binds device later when backend implementation resumes.

## 8. Device Management Page

Purpose:

- Lets customer manage their own activated devices.

Page should include:

- Device list.
- Device platform.
- Device status.
- Last seen.
- Rename action.
- Revoke action.

Rules:

- Revocation should be clear and confirmable.
- Device management must not expose hardware fingerprint data.
- Device page must not show playlist/source contents.

## 9. License Status Page

Purpose:

- Shows platform access state.

Page may show:

- Free launch active.
- Active.
- Trialing.
- Expired.
- Suspended.
- Device revoked.
- Blocked.

Free launch behavior:

- PaymentRequired false should be clear where relevant.
- Do not pressure early users with subscription-first UI.
- Billing upgrade prompts are deferred.

Rules:

- License status is platform permission only.
- License does not validate media/source/provider rights.

## 10. Profile Transfer Page

Purpose:

- Lets users move local profile data through a temporary encrypted bridge.

Page may include:

- Create transfer session.
- Show expiration time.
- Show transfer code/link if used later.
- Consume/import transfer session.
- Show expired/consumed state.

Rules:

- Payload must be encrypted before backend storage.
- Dashboard must not display raw encrypted payload unnecessarily.
- Dashboard must never display decrypted payload.
- Backend is not profile source of truth.

## 11. Admin Dashboard Scope

Admin may view/manage:

- Users.
- Devices.
- License states.
- App versions.
- Remote config.
- Basic audit logs.

Admin may do:

- Revoke/block device.
- Update license state.
- Manage app version policy.
- Manage safe remote config.
- Review audit events.

Admin must not manage:

- Channel packages.
- Stream catalogs.
- Provider accounts.
- User playlist contents.
- Source scraping rules.
- Raw profile transfer payloads.

## 12. Owner/Admin Full Control Principle

The project owner/admin should have full control over the legal platform layer.

This means owner/admin may control:

- User account status.
- User roles.
- Device activation state.
- Device revoke/block state.
- License/access state.
- Free launch access state.
- App version policy.
- Force update policy.
- Maintenance mode.
- Feature flags.
- Remote config.
- Profile transfer availability.
- Safe support diagnostics.
- Audit log visibility.
- Abuse response controls.
- Platform-wide notices.
- Emergency feature disable switches.

Owner/admin may control the user application through safe platform controls:

- Enable or disable platform features.
- Require supported app versions.
- Show maintenance messages.
- Adjust polling intervals.
- Disable profile transfer if needed.
- Revoke or block abusive devices.
- Suspend or restore platform access.

Owner/admin full control does not mean unrestricted access to private local user data.

Owner/admin must not:

- Read user local playlist/source contents from backend.
- Read provider usernames or passwords.
- Force the app to upload stream URLs.
- Use remote config to deliver channel packages.
- Inspect decrypted profile payloads.
- View raw encrypted profile payloads in normal dashboard UI.
- Turn diagnostics into stream/source validation.
- Use admin tools to operate as a content provider.

Rule:

- Full control applies to platform operation, access, safety, configuration, and legal compliance.
- Full control does not convert the backend into owner of user media sources, provider accounts, or private local profiles.

Destructive owner/admin actions should be audited and should require clear confirmation.

## 13. App Version Admin Scope

Admin may manage:

- Platform.
- Version.
- Channel.
- Minimum supported version.
- Recommended version.
- Force update flag.
- Release notes.
- Update URL.

Rules:

- Force update must be conservative.
- App version records must not include media source data.

## 14. Remote Config Admin Scope

Admin may manage safe config:

- Free launch flag.
- Maintenance flag.
- Feature flags.
- Support contact.
- Polling intervals.
- Profile transfer availability.

Admin must not configure:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraping instructions.
- Payment secrets.
- Admin secrets.

Remote config changes should be audited.

## 15. Audit Log Scope

Admin may see basic audit events:

- User registration.
- Login limited events.
- Activation created/approved.
- Device revoked.
- License checked/updated.
- App version updated.
- Remote config updated.
- Profile transfer created/consumed.

Audit view must not show:

- Passwords.
- Tokens.
- Secrets.
- Provider credentials.
- Stream URLs.
- Playlist contents.
- Raw profile payloads.

## 16. UI Tone Direction

Dashboard should feel:

- Simple.
- Calm.
- Operational.
- Trustworthy.
- Not sales-pressure heavy.

Avoid:

- Popup spam.
- Subscription pressure during free launch.
- Complex admin overload.
- Reseller-first UI.
- Media-provider look and feel.

## 17. Payment and Reseller Deferral

Payment UI is deferred because:

- Free launch rule is active.
- First Android TV / Fire TV app must reach final release level first.
- Payment enforcement is not production blocking.

Reseller UI is deferred because:

- Core account/device/license flow is not yet final.
- Reseller logic can add scope pressure too early.
- Credit ledger and reseller operations need separate contract later.

## 18. Dashboard MVP Page List

Customer pages:

- Login/Register later.
- Account overview.
- My devices.
- Activate device.
- License status.
- Profile transfer.

Admin pages:

- Admin overview.
- Users.
- Devices.
- Licenses.
- App versions.
- Remote config.
- Audit log.

Deferred pages:

- Billing.
- Reseller.
- Analytics.
- Support tickets.
- Channel/source management.

## 19. Stop Conditions

Stop and escalate if:

- Dashboard asks for stream URL storage.
- Dashboard asks for provider credential fields.
- Dashboard starts selling channel packages.
- Dashboard becomes payment-first during free launch.
- Dashboard exposes profile payload contents.
- Dashboard expands into reseller/analytics before core stability.
- Admin UI shows secrets or unsafe logs.

## 20. Acceptance Criteria

Dashboard scope is acceptable when:

- Customer dashboard supports account, devices, license, activation, and transfer only.
- Admin dashboard supports platform operation records only.
- Owner/admin has full legal platform control without private local content/provider drift.
- Free launch is respected.
- Payment/reseller remain deferred.
- No content/provider/source management exists.
- Profile transfer privacy is protected.
- Dashboard remains simple and operational.

## 21. Next Step

After M18:

- M19 Documentation Index / Project Map.
- M20 Department Operating Protocol.
- M21 Decision Gate System.
