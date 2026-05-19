# PLATFORM_CLIENT_SYNC_PROTOCOL

Status: Active

## 1. Purpose

This document prevents scope drift between `TV_Project_Platform` and `TV_Project`.

It defines what belongs to the platform project, what belongs to the Android/client project, and what must stay synchronized between both projects.

## 2. Project Ownership Boundary

### TV_Project_Platform owns

- Official website.
- Download page metadata.
- Admin/customer dashboard.
- User registration and login policy.
- Auth/session policy.
- Database records.
- Device registration and activation records.
- License/access records.
- App version policy.
- Remote config keys.
- Reseller management.
- Reseller credits and credit ledger.
- Audit logs.
- Legal, Terms, Privacy, and public policy copy.
- Support contact and safe diagnostics policy.

### TV_Project owns

- Android TV / Fire TV application.
- App screens and UX.
- Player behavior.
- Local profile UI.
- Local source management UI.
- First-run Terms acceptance screen.
- TV remote navigation.
- Offline app behavior.
- APK implementation/build behavior.
- Client-side storage.
- Client-side encryption before profile transfer.

## 3. Platform Must Not Decide As App UX

The platform project may define policy, contract, IDs, allowed states, and backend/dashboard behavior.

The platform project must not design or approve detailed Android app screens as if they are platform implementation.

If Android UX is discussed inside platform planning, it must be recorded as a handoff note for `TV_Project`, not as platform scope.

## 4. Client Must Not Redefine Platform Policy

The Android/client project may implement app behavior, screens, local storage, player UX, and client-side flows.

The Android/client project must not redefine:

- Legal boundary.
- Terms version policy.
- License state names.
- Device activation state names.
- Remote config key names.
- API endpoint contract.
- Reseller/platform policy.
- No-content boundary.

If the app needs a new shared value, it must request synchronization through the bridge role.

## 5. Bridge Role

The bridge role is the Ecosystem Integration Director.

Bridge responsibilities:

- Keep shared policy consistent across both repos.
- Identify values that must exist in both projects.
- Send platform-owned policy/contract changes to `TV_Project`.
- Send client implementation requirements back to `TV_Project_Platform` when backend/database/admin support is required.
- Stop work if either side crosses scope boundary.

## 6. Shared Contract Items

These items must be synchronized between both projects:

- API base URL configuration name.
- API endpoint paths.
- Request/response field names.
- Device activation states.
- License states.
- App version policy fields.
- Remote config key names.
- Feature flag names.
- Emergency control names.
- Terms version ID.
- Privacy/legal boundary copy version.
- Support email.
- Platform identifiers.
- App/client platform identifiers.
- Error category codes.
- Diagnostics safe field names.

## 7. Shared Identifiers

Initial shared platform identifiers:

- `android_tv`
- `fire_tv`
- `android_mobile`
- `ios`
- `apple_tv`
- `samsung_tizen`
- `lg_webos`
- `web_player`

Initial license states:

- `free_launch_active`
- `active`
- `trialing`
- `expired`
- `suspended`
- `device_revoked`
- `blocked`

Initial activation states:

- `pending`
- `approved`
- `expired`
- `rejected`
- `consumed`

Initial error categories:

- `connection_error`
- `unsupported_app_version`
- `activation_session_expired`
- `activation_session_consumed`
- `device_revoked`
- `license_suspended`
- `profile_transfer_expired`
- `profile_transfer_consumed`
- `rate_limited`
- `unauthorized`
- `forbidden`

## 8. Shared Remote Config Keys

Initial shared remote config keys:

- `freeLaunch.enabled`
- `maintenance.enabled`
- `maintenance.message`
- `features.activation.enabled`
- `features.licenseCheck.enabled`
- `features.profileTransfer.enabled`
- `features.diagnostics.enabled`
- `features.support.enabled`
- `features.localProfile.enabled`
- `features.sourceManagement.enabled`
- `features.settings.enabled`
- `features.offlineMode.enabled`
- `features.appNotices.enabled`
- `features.payments.enabled`
- `features.reseller.enabled`
- `polling.activationSeconds`
- `polling.licenseCheckMinutes`
- `support.email`
- `support.statusPageUrl`
- `app.notice.enabled`
- `app.notice.message`
- `app.notice.level`
- `emergency.forceReadOnlyMode`
- `emergency.disableActivation`
- `emergency.disableNewDeviceLinking`
- `emergency.disableLicenseGranting`
- `emergency.disableProfileTransfer`
- `emergency.disableResellerActions`
- `emergency.disableCustomerSelfActions`
- `emergency.maintenanceLock`

## 9. Terms / Policy Sync

Platform owns:

- Terms text.
- Privacy text.
- Legal boundary text.
- Terms version ID.
- Policy version ID.

Android/client owns:

- Showing the first-run Terms screen.
- Storing local acceptance.
- Blocking setup until accepted.
- Re-prompting if Terms version changes.

Shared value examples:

- `terms.version`
- `privacy.version`
- `legalBoundary.version`

## 10. Download / APK Boundary

Platform owns:

- Website download page.
- APK metadata.
- Current version display.
- Minimum supported version.
- Release notes.
- Download enabled/disabled state.
- Official download warning.

TV_Project owns:

- APK build.
- APK signing.
- APK file generation.
- App implementation.

Signing keys and build secrets must never be stored in either public docs, frontend, chat, or screenshots.

## 11. No-Content Boundary Applies To Both Projects

Both projects must reject:

- Content hosting.
- Channel selling.
- Stream relay/proxy/transcoding.
- Provider scraping.
- Provider credential collection.
- DRM bypass.
- Unauthorized source collection.
- Backend playlist/source ownership.

## 12. Bridge Handoff Rule

When a platform decision affects the Android app, create a handoff note for `TV_Project`.

When an Android requirement affects backend/database/admin/dashboard, create a handoff note for `TV_Project_Platform`.

Handoff note must include:

- Source project.
- Target project.
- Decision.
- Shared IDs/keys affected.
- Owner of implementation.
- Forbidden scope.
- Required confirmation.

## 13. Stop Conditions

Stop and escalate if:

- Platform starts deciding Android-only screen behavior as implementation.
- Android starts redefining platform policy or API state names.
- Either repo introduces content/provider/source behavior.
- Terms/legal copy differs between website and app.
- Remote config keys drift between repos.
- License/activation states drift between repos.
- Reseller/payment behavior starts before explicit approval.

## 14. Current Correction

Correction recorded:

- Platform owns web, database, users, licensing, device records, reseller credits, admin/customer dashboard, legal copy, and shared policy.
- TV_Project owns Android app UX and implementation.
- First-run Terms screen belongs to TV_Project implementation.
- First-run Terms policy/version/copy belongs to TV_Project_Platform and must be handed off to TV_Project.
