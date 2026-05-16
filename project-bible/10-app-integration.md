# 10 - App Integration

This file defines how the Android TV, Fire TV, Android Box, or supported player app should integrate with TV Project Platform.

The app integration must support licensed player access, device activation, license validation, app version control, remote configuration, secure local playlist profile management, and optional temporary web-to-device playlist transfer.

The app must not expect the backend to provide channels, streams, playlists, or content.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The app may integrate with the backend for:

- Device activation
- Device status
- License status
- Subscription status
- App version rules
- Remote configuration
- Maintenance mode
- Feature flags
- Optional temporary playlist profile transfer
- Account or activation flow

The app must not expect the backend to provide:

- TV channels
- Live streams
- VOD streams
- Stream URLs
- Channel packages
- Playlist marketplace data
- Content catalogs
- Broadcast schedules
- CDN stream routes

## App Role

The app is the player client.

The app should:

- Run on supported TV devices.
- Generate a stable app device identifier.
- Register or activate the device.
- Check license status with the backend.
- Check subscription status with the backend.
- Check app version rules with the backend.
- Fetch remote config.
- Manage playlist profiles locally.
- Store playlist credentials securely on the device.
- Support multiple playlist profiles.
- Allow profile switching.
- Respect maintenance mode.
- Respect force update rules.

## Backend Role

The backend is responsible for:

- User account validation
- Device activation validation
- Subscription validation
- License validation
- App version control
- Remote configuration
- Temporary playlist transfer bridge when enabled

The backend is not responsible for:

- Stream hosting
- Stream relay
- Stream transcoding
- Channel source management
- Playlist provider management
- Content delivery
- Permanent playlist credential storage by default

## Supported App Platforms

Initial supported platforms may include:

- Android TV
- Fire TV
- Android Box

Future supported platforms may include:

- Android Mobile
- Google TV
- Other Android-based TV platforms

Each platform should be identified clearly in app requests.

Suggested platform values:

- ANDROID_TV
- FIRE_TV
- ANDROID_BOX
- ANDROID_MOBILE
- OTHER

## Device Identity

MAC address must not be used as the primary device identifier.

The primary device identifier is:

- app_generated_device_id

The app should generate this identifier on first launch.

The app should persist this identifier securely.

The app should reuse the same identifier after normal app restarts.

The app should avoid regenerating the identifier unless the app data is cleared or a reset flow occurs.

## Secondary Device Signals

The app may send secondary device signals.

Secondary signals may include:

- Android ID
- Device model
- Device manufacturer
- Platform
- OS version
- App version code
- App version name
- Install metadata

Secondary signals help with:

- Support
- Debugging
- Fraud review
- Device management
- Compatibility checks

Secondary signals must not replace app_generated_device_id as the primary identity.

## Device Activation

Device activation connects the app installation to a user account and license context.

Device activation should validate:

- app_generated_device_id
- User account or activation code
- User status
- Subscription status
- Device limit
- Existing device record
- Device block status
- App version support
- Platform support

Device activation must be backend-authoritative.

The app should not decide final activation success alone.

## Possible Activation Methods

Possible activation methods:

- User login inside app
- Activation code entered on web panel
- QR code activation later
- Device code activation later

MVP may start with one simple activation method.

Activation method selection requires implementation approval.

## Activation By Login

Login-based activation flow:

1. User opens app.
2. App generates app_generated_device_id if missing.
3. User enters email and password.
4. App sends credentials and device metadata to backend.
5. Backend validates user credentials.
6. Backend validates user status.
7. Backend validates subscription and device limit.
8. Backend creates or updates device record.
9. Backend returns activation result.
10. App stores auth tokens securely when needed.
11. App starts license status check.

Rules:

- Password must be sent only over HTTPS in production.
- App must not log passwords.
- App must not log tokens.
- Backend must hash stored passwords.
- Backend must enforce device limit.

## Activation By Code

Activation-code flow:

1. App generates app_generated_device_id.
2. App requests or displays an activation code.
3. User opens web dashboard.
4. User enters activation code or scans QR code.
5. Backend links activation code to user's device.
6. App polls activation status.
7. Backend returns activation result.
8. App stores device activation state.
9. App starts license status check.

Rules:

- Activation codes must expire.
- Activation codes must be single-use when possible.
- Activation codes must be tied to app_generated_device_id.
- Activation codes must not expose sensitive data.
- Activation code polling should be rate limited.

## Device Activation Endpoint

Possible endpoint:

- POST /device/activate

Request may include:

- app_generated_device_id
- android_id
- device_name
- device_model
- device_manufacturer
- platform
- os_version
- app_version_code
- app_version_name
- activation_code
- login token or credentials depending on flow

Response may include:

- activated
- device_id
- device_status
- license_status
- subscription_status
- message
- next_action
- access_token when login flow is used
- refresh_token when login flow is used

The response must not include stream URLs.

The response must not include channel lists.

The response must not include playlist marketplace data.

## Device Status Endpoint

Possible endpoint:

- GET /device/status

The app may call this endpoint to check the current device state.

Response may include:

- device_id
- device_status
- platform
- app_version_code
- app_version_name
- activated_at
- last_seen_at
- blocked_at
- license_status
- subscription_status

Possible device statuses:

- ACTIVE
- BLOCKED
- INACTIVE
- PENDING

Blocked devices must not pass license checks.

## Device Heartbeat Endpoint

Possible endpoint:

- PATCH /device/heartbeat

The app may send heartbeat data.

Heartbeat may include:

- app_generated_device_id
- app_version_code
- app_version_name
- platform
- current_time
- basic diagnostic metadata

Heartbeat should update:

- last_seen_at
- app version metadata
- platform metadata when useful

Heartbeat must not send playlist credentials.

Heartbeat must not send stream URLs.

Heartbeat must not send sensitive logs.

## License Status

The backend is the license authority.

The app must check license status with the backend.

License status should consider:

- User status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Maintenance mode
- Remote config rules

The app may cache limited license status for user experience.

The backend remains authoritative.

## License Status Endpoint

Possible endpoint:

- GET /license/status

Response may include:

- allowed
- result
- reason
- subscription_status
- subscription_ends_at
- device_status
- force_update_required
- maintenance_mode
- message
- checked_at

Possible result values:

- ALLOWED
- DENIED

Possible denial reasons:

- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- USER_DISABLED
- APP_VERSION_UNSUPPORTED

## License Check Behavior

The app should call license status:

- After activation
- On app startup
- Before entering licensed player area
- Periodically while app is used
- After app version update
- After remote config refresh
- When user manually refreshes account status

The app should avoid excessive calls.

The backend may rate limit license checks.

## License Denied UX

When license is denied, the app should show a clear user-friendly message.

Examples:

- Subscription expired.
- Device is blocked.
- Device is not activated.
- App update required.
- Service is under maintenance.
- Account is disabled.

The app should not show raw backend stack traces.

The app should not expose internal security details.

## Subscription Status

The app may display subscription status.

Subscription data may include:

- Status
- Plan name
- Start date
- End date
- Remaining time
- Device limit
- Renewal message

Subscription data must represent software/player access only.

Subscription data must not imply channels, streams, playlists, or content are included.

## App Version Integration

The app should check app version rules from the backend.

Possible endpoint:

- GET /app/version

Response may include:

- platform
- latest_version_code
- latest_version_name
- minimum_version_code
- force_update
- apk_url
- changelog
- message

The app should compare its current version code with backend rules.

## Force Update Behavior

When force update is required:

- App should block normal usage.
- App should show update required screen.
- App should show latest version information.
- App should provide download or update instructions.
- App should avoid entering licensed player area.

Force update message should be clear.

Example:

A new app version is required. Please update your app to continue using licensed player access.

## Minimum Version Behavior

When app version is below minimum_version_code:

- App should show update required.
- App should not continue into licensed player area.
- App should provide update instructions.

The backend may also return license denial reason:

- APP_VERSION_UNSUPPORTED
- FORCE_UPDATE_REQUIRED

## Remote Config Integration

The app should fetch remote config from the backend.

Possible endpoint:

- GET /remote-config

Response may include:

- maintenance_mode
- maintenance_message
- announcement
- minimum_version_code
- feature_flags
- updated_at

Remote config must not include secrets.

Remote config must not include playlist credentials.

Remote config must not include stream URLs.

## Maintenance Mode

When maintenance mode is active:

- App should show maintenance screen or banner.
- App should stop licensed player access if backend requires it.
- App should show maintenance message.
- App should retry later according to app behavior.

Maintenance message should be user-friendly.

The app must respect backend maintenance mode.

## Feature Flags

Feature flags may control app behavior.

Possible flags:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled
- manual_payment_enabled
- reseller_enabled

Feature flags should not be treated as secrets.

Feature flags should not replace backend authorization.

Feature flags should not expose sensitive configuration.

## Playlist Philosophy

Playlist information is local-first.

By default:

- User enters playlist information inside the app.
- App stores playlist profiles locally.
- App stores playlist credentials securely.
- Backend does not permanently store playlist credentials.
- Backend is not playlist source of truth.

The app must not depend on backend playlist storage for normal playback setup.

## Local Playlist Profiles

The app should support multiple local playlist profiles.

Profile actions should include:

- Add profile
- Edit profile
- Delete profile
- Rename profile
- Select active profile
- Switch active profile

Each profile should be stored locally by default.

Each profile should be protected with encrypted local storage.

## Playlist Profile Fields

A local playlist profile may include:

- Profile name
- Provider type
- Server URL or playlist URL
- Username when applicable
- Password when applicable
- Last updated date
- Active profile flag
- Optional local settings

Profile data must be stored securely.

Sensitive fields must not be logged.

## Local Encrypted Storage

Playlist credentials must be stored using encrypted local storage.

The app should protect:

- Playlist URL
- Server URL
- Username
- Password
- Provider credentials
- Access tokens related to playlist provider when applicable

The app should avoid storing credentials in plain text files.

The app should avoid exposing credentials in crash logs.

## Multi-Profile Support

The app should support multiple profiles.

Users should be able to:

- Create more than one profile.
- Switch between profiles.
- Rename profiles.
- Delete profiles.
- Choose default active profile.

Multi-profile support should be controlled by app capability and remote config where useful.

The backend should not be required as permanent profile storage.

## Optional Web-To-Device Playlist Transfer

The optional playlist transfer feature allows a user to send a playlist profile from web dashboard to their own device.

This feature is only a temporary encrypted transfer bridge.

It must not become:

- Permanent backend playlist storage
- Playlist provider service
- Playlist marketplace
- Shared playlist library
- Public playlist search
- Backend playlist authority

## Playlist Transfer Creation

A user may create a playlist transfer from the web dashboard.

Backend should validate:

- Authenticated customer
- Target device ownership
- Device status
- Feature flag status
- Payload size
- Expiration time

The payload should be encrypted.

The payload should be temporary.

The payload should expire.

## Playlist Transfer Consumption

Possible endpoint:

- POST /playlist-push/consume

The app may call this endpoint to pick up a pending transfer.

Backend should validate:

- Device identity
- Device ownership
- Transfer status
- Transfer expiration
- Single-use behavior when enabled

After successful pickup:

- Payload should be marked consumed or deleted.
- consumed_at should be recorded when retained.
- Audit log should be created when needed.

Expired payloads must not be consumed.

Consumed payloads should not be reusable.

## Playlist Transfer UX In App

When a transfer is available, the app may show:

- New profile received
- Profile name
- Confirmation prompt
- Save as new profile
- Replace existing profile when allowed
- Cancel import

The app should never show that the backend provides playlists.

The app should explain that the transfer came from the user's own web dashboard action.

## Playlist Transfer Security

Playlist transfer payload must follow security rules:

- Encrypted at rest where stored temporarily
- Expirable
- User-scoped
- Device-scoped
- Single-use when practical
- Not logged
- Not exposed to other users
- Deleted or marked consumed after pickup

The app must not log transferred credentials.

## App Authentication

Depending on activation flow, the app may use:

- User login tokens
- Device activation token
- Device session token
- Activation code polling

Token strategy must be approved before implementation.

Tokens must be stored securely.

Tokens must not be logged.

Expired tokens should trigger refresh or re-authentication.

Logout should clear tokens where applicable.

## App Logout

Logout should:

- Clear user tokens.
- Keep or clear app_generated_device_id according to approved product decision.
- Keep local playlist profiles only when user expects them to remain.
- Allow user to sign in again.
- Avoid deleting profiles without confirmation.

Playlist profiles are local app data.

Deleting profiles should be explicit.

## App Data Reset

App reset behavior should be explicit.

Possible reset actions:

- Clear login tokens
- Clear activation state
- Clear local playlist profiles
- Clear cached remote config
- Clear cached license status

Deleting playlist profiles should require confirmation.

The app should explain that local playlist profiles are stored on the device.

## App Startup Flow

Recommended startup flow:

1. Load app_generated_device_id.
2. Generate app_generated_device_id if missing.
3. Load secure local settings.
4. Fetch app version rules.
5. Fetch remote config.
6. Check maintenance mode.
7. Check activation state.
8. Check license status.
9. Load local playlist profiles.
10. Enter appropriate screen based on status.

The app should not enter licensed player area when backend denies access.

## Recommended Screen Flow

Possible app screens:

- Splash screen
- Update required screen
- Maintenance screen
- Login or activation screen
- Subscription expired screen
- Device blocked screen
- Home screen
- Profile selection screen
- Add profile screen
- Player screen
- Settings screen
- Support info screen

## App Home Screen

The app home screen may show:

- Active profile
- Profile switcher
- Subscription status summary
- License status
- App version
- Settings shortcut
- Add profile shortcut
- Sync or transfer check shortcut when enabled

The app home screen must not show backend-provided channel lists.

Channel rendering should come only from user-provided playlist data inside the app.

## Profile Selection Screen

Profile selection screen should allow:

- View profile list
- Select active profile
- Add profile
- Edit profile
- Delete profile
- Import transferred profile when available

The UI should make it clear that profiles are user-provided.

## Add Profile Screen

Add profile screen may include:

- Profile name
- Playlist type
- Server URL or playlist URL
- Username when applicable
- Password when applicable
- Save button
- Test connection button when appropriate

The app should store saved profile data securely.

The app should not send saved profile data to backend by default.

## Player Behavior

The app player may use user-provided playlist data.

The app must not rely on backend-provided streams.

The backend must not inject stream URLs.

The backend must not provide channel lists.

The app should respect license status before enabling licensed player functionality.

## EPG, VOD, Series, Favorites

The app may support player features such as:

- EPG
- VOD
- Series
- Favorites
- Recently watched
- Search
- Parental controls later

These features should operate from local/user-provided playlist data or app-local state.

The backend should not become content catalog authority.

Remote config may enable or disable feature areas.

## App Settings

App settings may include:

- Account status
- Subscription status
- Device information
- App version
- Remote config refresh
- Profile management
- Clear cache
- Logout
- Support information
- Legal links

Settings must not expose sensitive tokens.

Settings must not expose playlist passwords in plain text after saved unless explicitly designed with reveal controls.

## Device Information Screen

Device information may show:

- Device name
- Platform
- App version name
- App version code
- Device status
- License status
- Subscription status
- Last check time
- Support code when implemented

Avoid showing unnecessary internal IDs unless useful for support.

## Support Code

A support code may be added later.

Support code may help support identify:

- User account
- Device
- App version
- License status
- Last check time

Support code must not expose:

- Passwords
- Tokens
- Playlist credentials
- Payment secrets
- Encryption keys

## App Error Handling

The app should handle errors gracefully.

Examples:

- Network unavailable
- Backend unavailable
- Token expired
- License denied
- Subscription expired
- Device blocked
- App update required
- Maintenance mode
- Playlist profile invalid
- Transfer expired

Errors should be clear and actionable.

## Offline Behavior

Offline behavior requires careful design.

The app may cache limited data for user experience.

Cached data may include:

- Last known remote config
- Last known license status
- Last subscription summary
- Local playlist profiles

The backend remains the authority.

Offline access rules require explicit approval before implementation.

## Caching Rules

The app may cache:

- Remote config for a short time
- App version response for a short time
- License status for a short time
- Local playlist profiles
- Non-sensitive UI state

The app must not cache:

- Plain text playlist credentials outside secure storage
- Plain text tokens
- Payment secrets
- Backend secrets

## Network Rules

Production app communication must use HTTPS.

The app should handle:

- Timeouts
- Retries
- Offline state
- Slow network
- Backend errors
- Invalid responses

Retries should avoid creating duplicate operations.

Device activation and playlist transfer consumption should be idempotent where possible.

## App Logging Rules

The app may log safe diagnostic information.

Safe logs may include:

- App version
- Device model
- Platform
- Error code
- Screen name
- Request status
- Timestamp

The app must not log:

- Passwords
- Tokens
- Playlist URLs with credentials
- Playlist usernames
- Playlist passwords
- Payment data
- Encryption keys
- Raw sensitive API responses

## Crash Reporting

Crash reporting may be added later.

Crash reports must not include:

- Tokens
- Passwords
- Playlist credentials
- Payment data
- Encryption keys
- Sensitive provider data

Crash reporting provider selection requires approval.

## App API Error Mapping

The app should map backend error codes to user-friendly messages.

Examples:

- UNAUTHORIZED: Please sign in again.
- FORBIDDEN: You do not have permission to use this action.
- DEVICE_NOT_ACTIVATED: This device is not activated.
- DEVICE_BLOCKED: This device is blocked.
- SUBSCRIPTION_EXPIRED: Your subscription has expired.
- FORCE_UPDATE_REQUIRED: Please update the app to continue.
- MAINTENANCE_MODE: Service is temporarily under maintenance.
- PLAYLIST_TRANSFER_EXPIRED: The profile transfer has expired.

## Security Requirements

The app must:

- Use HTTPS in production.
- Store tokens securely.
- Store playlist credentials securely.
- Avoid logging sensitive data.
- Respect backend license denial.
- Respect force update.
- Respect maintenance mode.
- Validate local forms.
- Handle expired sessions.
- Clear sensitive data on logout where appropriate.

## App Build And Versioning

App releases should use clear versioning.

Version metadata should include:

- version_code
- version_name
- platform
- changelog
- release date
- minimum supported version when needed

The backend AppVersion model should control app update rules.

## APK Distribution

APK distribution may be handled through:

- Approved download storage
- Public download page
- Admin-managed APK URL
- External app store later when approved

APK URLs should be controlled through app version records.

APK hosting must not be mixed with stream hosting infrastructure.

## App Release Notes

Release notes should include:

- New features
- Fixes
- Security updates
- Compatibility notes
- Required update notice when applicable

Release notes must not mention included channels or content.

## App Team Handoff

The app team should receive:

- API endpoint list
- Auth or activation flow decision
- Device identity rules
- License status rules
- App version rules
- Remote config rules
- Playlist local storage rules
- Playlist transfer bridge rules
- Error codes
- Test scenarios

The app team must understand that backend does not provide channels, streams, playlists, or content.

## App Testing Requirements

App integration tests should verify:

- app_generated_device_id is generated.
- app_generated_device_id persists.
- Device activation works.
- Device blocked state is respected.
- Subscription expired state is respected.
- License denied state is respected.
- Force update state is respected.
- Maintenance mode is respected.
- Remote config is applied.
- Local playlist profile can be created.
- Multiple profiles can be managed.
- Playlist credentials are stored securely.
- Optional playlist transfer can be consumed.
- Expired playlist transfer cannot be consumed.
- Sensitive data is not logged.

## Backend Testing For App Integration

Backend tests should verify:

- Device activation validates user status.
- Device activation respects device limits.
- Device activation uses app_generated_device_id.
- License status checks subscription state.
- License status blocks blocked devices.
- License status blocks unsupported app versions.
- Remote config response excludes secrets.
- App version response works.
- Playlist transfer validates ownership.
- Playlist transfer expires correctly.
- Playlist transfer cannot be consumed by another device.
- Playlist transfer is marked consumed or deleted after pickup.

## MVP App Integration Scope

MVP app integration should include:

- app_generated_device_id
- Device activation
- Device status
- License status
- Subscription status
- App version check
- Remote config
- Maintenance mode
- Force update
- Local playlist profile management
- Encrypted local playlist credential storage
- Multi-profile support when feasible

Optional MVP feature:

- Temporary web-to-device playlist transfer

## Post-MVP App Integration Ideas

Post-MVP app integration may include:

- QR code activation
- Device code activation
- Push notifications
- Advanced diagnostics
- Support code
- Crash reporting
- Encrypted cloud playlist sync with explicit approval
- Parental controls
- Advanced profile backup
- Advanced app analytics
- App store distribution

Each post-MVP feature requires approval.

## Forbidden App Integration Behavior

Do not implement app integration that requires backend-provided:

- Channel lists
- Stream URLs
- Stream sources
- Channel packages
- Content catalogs
- Playlist marketplace entries
- Broadcast schedules
- CDN stream routes

Do not make the backend playlist authority.

Do not permanently store playlist credentials in backend by default.

## Stable Project Bible Link

This file is part of the stable project-bible tree:

- 00-project-rules.md
- 01-product-bible.md
- 02-user-roles.md
- 03-feature-list.md
- 04-database-bible.md
- 05-api-bible.md
- 06-security-bible.md
- 07-payment-bible.md
- 08-reseller-bible.md
- 09-ui-ux-bible.md
- 10-app-integration.md
- 11-marketing-bible.md
- 12-devops-bible.md
- 13-decision-log.md
- 14-testing-bible.md
- 15-support-bible.md
- 16-release-bible.md

Do not rename this file without approval.

Do not create conflicting alternative app integration files.

## Final Rule

The app integrates with the backend for licensed player access, device activation, subscription validation, app version control, remote config, and optional temporary profile transfer.

The app manages playlist profiles locally by default.

The backend must not provide channels, streams, playlists, or content.

The backend must not become playlist source of truth.
