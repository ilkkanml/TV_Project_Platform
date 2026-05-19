# PLATFORM_CLIENT_SYNC_PROTOCOL

Status: Active

## 1. Purpose

This document prevents scope drift between `TV_Project_Platform` and `TV_Project`.

It defines what belongs to the platform project, what belongs to the Android/client project, and what must stay synchronized between both projects.

## 2. Project Ownership Boundary

### TV_Project_Platform owns

- Official website.
- Download page metadata.
- Owner dashboard.
- Single-page customer portal, later.
- Device ID plus Activation Key customer/device access policy.
- Owner auth/session policy.
- Customer portal session policy, later.
- Database records.
- Device registration/status records.
- License/access records.
- App version policy.
- Remote config keys.
- Audit logs.
- Legal, Terms, Privacy, and public policy copy.
- Support contact and safe diagnostics policy.
- Future reseller management after launch MVP stability.
- Future reseller credits and credit ledger after explicit approval.

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
- APK signing/build output.
- Client-side storage of Device ID and Activation Key.
- Client-side generation of a privacy-safe platform device hash if supported.
- Reading platform update/version/license/remote-config responses.

## 3. Current Early Access Access Model

EA0 / early access customer-device access uses:

- Device ID.
- Activation Key.
- Optional platformDeviceHash for reinstall recovery.

Launch MVP does not require:

- Customer email.
- Customer name.
- Customer phone.
- Customer address.
- Full customer account profile.

Rules:

- Backend generates Device ID.
- Backend generates Activation Key.
- Backend stores activationKeyHash only.
- App stores raw Device ID and Activation Key locally after bootstrap.
- Raw Activation Key is never stored in the database.
- Raw Activation Key is never logged.
- Customer portal, when enabled later, uses Device ID plus Activation Key.
- Android/client must not redefine customer login as email/password unless a future decision changes the model.

## 4. Platform Must Not Decide As App UX

The platform project may define policy, contract, IDs, allowed states, API responses, database records, and backend/dashboard behavior.

The platform project must not design or approve detailed Android app screens as if they are platform implementation.

If Android UX is discussed inside platform planning, it must be recorded as a handoff note for `TV_Project`, not as platform implementation scope.

## 5. Client Must Not Redefine Platform Policy

The Android/client project may implement app behavior, screens, local storage, player UX, and client-side flows.

The Android/client project must not redefine:

- Legal boundary.
- Terms version policy.
- License state names.
- Device status names.
- Remote config key names.
- API endpoint contract.
- App version response fields.
- Free launch/payment-required behavior.
- No-content boundary.
- Device ID plus Activation Key access model.

If the app needs a new shared value, it must request synchronization through the bridge role.

## 6. Bridge Role

The bridge role is the Ecosystem Integration Director.

Bridge responsibilities:

- Keep shared policy consistent across both repos.
- Identify values that must exist in both projects.
- Send platform-owned policy/contract changes to `TV_Project`.
- Send client implementation requirements back to `TV_Project_Platform` when backend/database/admin support is required.
- Stop work if either side crosses scope boundary.

## 7. Shared Contract Items

These items must be synchronized between both projects:

- API base URL configuration name.
- API endpoint paths.
- Request/response field names.
- Device ID naming.
- Activation Key naming.
- platformDeviceHash naming and behavior.
- Device status values.
- License state values.
- App version policy fields.
- Download metadata fields.
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
- Free launch/paymentRequired response behavior.

## 8. Shared Identifiers

Initial platform identifiers:

- `android_tv`
- `fire_tv`
- `android_mobile`
- `ios`
- `apple_tv`
- `samsung_tizen`
- `lg_webos`
- `web_player`

Initial device statuses:

- `active`
- `pending`
- `disabled`
- `blocked`
- `revoked`

Initial license states:

- `free_launch_active`
- `active`
- `expired`
- `suspended`
- `device_revoked`
- `blocked`

Initial profile modes, later portal phase:

- `CLIENT_ENCRYPTED`
- `LOCAL_ONLY`
- `DISABLED`

Initial payment/status placeholders, later portal phase:

- `FREE_LAUNCH`
- `NOT_REQUIRED`
- `PAYMENT_DISABLED`
- `ACTIVE_LATER`
- `EXPIRED_LATER`

Initial error categories:

- `connection_error`
- `unsupported_app_version`
- `invalid_device_credentials`
- `session_expired`
- `access_disabled`
- `access_blocked`
- `device_revoked`
- `license_suspended`
- `profile_disabled`
- `profile_save_failed`
- `rate_limited`
- `unauthorized`
- `forbidden`

## 9. Shared Endpoint Contract

EA0 app/system endpoints:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`
- `POST /devices/bootstrap`
- `POST /license/check`

Later public/customer portal endpoints:

- `GET /download-metadata`
- `POST /customer-access/login`
- `POST /customer-access/logout`
- `GET /customer-portal/summary`
- `GET /customer-portal/profile`
- `PUT /customer-portal/profile`
- `POST /customer-portal/profile/sync-request`, optional

Owner endpoints stay platform/website-only unless a future approved app/admin client exists.

## 10. Shared Remote Config Keys

Initial shared remote config keys:

- `freeLaunch.enabled`
- `maintenance.enabled`
- `maintenance.message`
- `features.licenseCheck.enabled`
- `features.deviceBootstrap.enabled`
- `features.deviceRegistration.enabled`
- `features.customerPortal.enabled`
- `features.profileManager.enabled`
- `features.diagnostics.enabled`
- `features.support.enabled`
- `features.localProfile.enabled`
- `features.sourceManagement.enabled`
- `features.settings.enabled`
- `features.offlineMode.enabled`
- `features.appNotices.enabled`
- `features.payments.enabled`
- `features.reseller.enabled`
- `polling.licenseCheckMinutes`
- `support.email`
- `support.statusPageUrl`
- `terms.version`
- `privacy.version`
- `legalBoundary.version`
- `app.notice.enabled`
- `app.notice.message`
- `app.notice.level`
- `emergency.forceReadOnlyMode`
- `emergency.disableDeviceBootstrap`
- `emergency.disableCustomerPortalLogin`
- `emergency.disableDeviceRegistration`
- `emergency.disableLicenseGranting`
- `emergency.disableProfileManager`
- `emergency.disableApkDownload`
- `emergency.disableResellerActions`
- `emergency.disableCustomerSelfActions`
- `emergency.maintenanceLock`

Forbidden remote config keys or values:

- `stream.url`
- `playlist.url`
- `channel.package`
- `provider.username`
- `provider.password`
- `m3u.source`
- `epg.source`
- `scraper.enabled`
- `drm.bypass`
- `content.catalog`

## 11. Terms / Policy Sync

Platform owns:

- Terms text.
- Privacy text.
- Legal boundary text.
- Terms version ID.
- Privacy version ID.
- Legal boundary version ID.

Android/client owns:

- Showing the first-run Terms screen.
- Storing local acceptance.
- Blocking setup until accepted.
- Re-prompting if Terms version changes.

Shared values:

- `terms.version`
- `privacy.version`
- `legalBoundary.version`

## 12. Download / APK Boundary

Platform owns:

- Website download page, later.
- APK metadata.
- Current version display.
- Minimum supported version.
- Release notes.
- Download enabled/disabled state.
- Official download warning.
- SHA-256 checksum display.

TV_Project owns:

- APK build.
- APK signing.
- APK file generation.
- App implementation.

Signing keys and build secrets must never be stored in public docs, frontend, chat, or screenshots.

## 13. No-Content Boundary Applies To Both Projects

Both projects must reject:

- Content hosting.
- Channel selling.
- Stream relay/proxy/transcoding.
- Provider scraping.
- Provider credential collection as platform account data.
- DRM bypass.
- Unauthorized source collection.
- Backend playlist/source ownership.
- Public/shared playlist catalog.

## 14. Bridge Handoff Rule

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

## 15. Stop Conditions

Stop and escalate if:

- Platform starts deciding Android-only screen behavior as implementation.
- Android starts redefining platform policy or API state names.
- Android expects customer email/name login during launch MVP.
- Platform forces customer email/name registration during launch MVP.
- Either repo introduces content/provider/source behavior.
- Terms/legal copy differs between website and app.
- Remote config keys drift between repos.
- License/device states drift between repos.
- Reseller/payment enforcement starts before explicit approval.
- Any APK contains a hardcoded universal Activation Key.

## 16. Current Correction

Correction recorded:

- Platform owns website, owner dashboard, future single-page customer portal, database, Device ID / Activation Key access records, device records, license/free launch records, download metadata, app version policy, remote config, legal copy, and shared policy.
- TV_Project owns Android app UX and implementation.
- First-run Terms screen belongs to TV_Project implementation.
- First-run Terms policy/version/copy belongs to TV_Project_Platform and must be handed off to TV_Project.
- EA0 uses backend-generated Device ID plus backend-generated Activation Key.
- The app stores Device ID plus Activation Key locally.
- Reinstall recovery is best-effort through platformDeviceHash.
