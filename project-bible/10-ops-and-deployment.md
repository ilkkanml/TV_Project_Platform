# 10 - App Integration

This file defines how the Android TV or Fire TV player app should integrate with TV Project Platform.

The app must support the licensed player platform model.

The app must not depend on the backend as a content provider, stream provider, or playlist provider.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The backend manages software access, subscriptions, devices, app configuration, and optional temporary playlist profile transfer.

The backend does not provide:

- TV channels
- Live streams
- VOD streams
- Stream hosting
- Stream relay
- Stream transcoding
- Channel packages
- Playlist provider service
- Content catalog
- Broadcast infrastructure

## App Role

The app is the secure player client.

The app should:

- Generate a stable app device ID
- Activate the device with the backend
- Check license status
- Check subscription status
- Check app version
- Fetch remote config
- Manage local playlist profiles
- Store playlist credentials securely on the device
- Support multiple playlist profiles
- Switch between playlist profiles
- Respect maintenance mode
- Respect force update rules

## Backend Role

The backend should provide app-facing APIs for:

- Device activation
- Device status
- License status
- App version rules
- Remote configuration
- Optional temporary playlist profile transfer consumption

The backend should not provide stream URLs or channel lists.

## Device Identity

MAC address must not be used as the primary device identifier.

The primary device identifier should be:

- app_generated_device_id

Secondary device signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## app_generated_device_id

The app should generate a stable device identifier on first launch.

Rules:

- Generate once.
- Store securely.
- Reuse across app launches.
- Do not regenerate on every launch.
- Do not use MAC address as primary identity.
- Send this ID to backend during activation and license checks.

The backend should use this ID to identify the app installation/device record.

## Device Activation Flow

Recommended activation flow:

1. User installs app.
2. App generates app_generated_device_id.
3. App collects device metadata.
4. User logs in or enters activation code.
5. App sends activation request to backend.
6. Backend validates account and subscription rules.
7. Backend creates or updates device record.
8. Backend returns activation result.
9. App stores activation state locally.
10. App checks license status before player access.

## Device Activation Data

The app may send:

- app_generated_device_id
- Android ID
- Device model
- Platform
- App version code
- App version name
- App build number
- Install metadata
- Activation code if used
- User authentication token if login-based

The backend must validate all incoming data.

## Device Activation Endpoint

Possible endpoint:

- POST /device/activate

Request may include:

- app_generated_device_id
- android_id
- device_model
- platform
- app_version_code
- app_version_name
- activation_code
- device_name

Response may include:

- activated
- device_id
- device_status
- license_status
- subscription_status
- message
- next_action

## Device Status Endpoint

Possible endpoint:

- GET /device/status

Response may include:

- device_id
- device_name
- platform
- status
- activated_at
- last_seen_at
- blocked
- app_version_code
- app_version_name

Possible statuses:

- ACTIVE
- BLOCKED
- INACTIVE
- PENDING

## License Status Flow

The app should check license status before opening player features.

Recommended flow:

1. App starts.
2. App loads local device identity.
3. App checks app version rules.
4. App fetches remote config.
5. App checks license status.
6. Backend evaluates subscription and device status.
7. App receives allow or deny result.
8. App opens player only if access is allowed.

## License Status Endpoint

Possible endpoint:

- GET /license/status

Request context may include:

- Authorization token
- app_generated_device_id
- platform
- app_version_code
- app_version_name

Response may include:

- access_allowed
- result
- reason
- subscription_status
- subscription_ends_at
- device_status
- force_update
- maintenance_mode
- message

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

## License Authority

The backend is the license authority.

The app must not decide final license validity alone.

The app may cache limited license state for user experience.

Cached license state must not override backend denial when online.

Offline grace may be considered later, but it requires explicit approval.

## Subscription Handling In App

The app should display subscription information clearly.

App may show:

- Subscription status
- Expiration date
- Remaining time
- Renewal message
- Expired message
- Device limit message

The app must not imply that subscription includes channels or content.

Subscriptions represent software/player access only.

## App Version Check

The app should check version rules from the backend.

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

The app should compare its own version_code with minimum_version_code.

If force_update is true and app version is too old, the app should block access and show update instructions.

## Remote Config

The app should fetch remote config from backend.

Possible endpoint:

- GET /remote-config

Response may include:

- maintenance_mode
- maintenance_message
- announcement
- minimum_version_code
- feature_flags

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled

Remote config must not include secrets.

Remote config must not include playlist credentials.

## Maintenance Mode

If maintenance_mode is true, the app should show the maintenance message.

The app should not allow normal player access during forced maintenance unless backend explicitly allows a bypass.

Maintenance behavior must be controlled by backend remote config.

## Force Update

If force update is required, the app should:

- Show update required screen
- Show current app version
- Show required minimum version
- Provide download/update link when available
- Block player access until update is completed

Force update rules must come from backend.

## Playlist Management

Playlist information is not backend source of truth.

By default, the app handles playlist entry and playlist profile management.

The app should allow the user to enter their own legal playlist or provider information.

The app should store playlist credentials locally on the device.

The app should use encrypted local storage.

## Playlist Credential Storage

Playlist credentials must be protected.

The app should not store credentials in plain text.

The app should use secure local storage options available on the target platform.

Stored playlist data may include:

- Profile name
- Playlist URL
- Username
- Password
- Provider type
- Last selected profile
- Created date
- Updated date

Sensitive fields must be encrypted.

## Multi-Profile Support

The app should support multiple playlist profiles.

User should be able to:

- Add profile
- Edit profile
- Delete profile
- Select active profile
- Switch profile
- Rename profile
- Test profile connection when possible

Profiles should remain local to the app by default.

The backend should not become permanent playlist storage.

## Optional Playlist Push Bridge

The web panel may optionally send a playlist profile to the user's own device.

This feature is optional.

This feature must only work as a temporary encrypted transfer bridge.

The backend must not become playlist source of truth.

The backend must not permanently store playlist credentials by default.

## Playlist Push Creation Flow

Recommended web-to-device flow:

1. User logs into customer web panel.
2. User selects own activated device.
3. User enters playlist profile details.
4. Web app sends request to backend.
5. Backend validates user and device ownership.
6. Backend encrypts temporary payload.
7. Backend stores payload with expiration.
8. App checks for pending transfer.
9. App consumes transfer payload.
10. App stores profile in encrypted local storage.
11. Backend marks payload consumed or deletes it.

## Playlist Push Consume Endpoint

Possible endpoint:

- POST /playlist-push/consume

Request may include:

- app_generated_device_id
- device_id
- transfer_id when available

Response may include:

- has_payload
- transfer_id
- encrypted_payload
- expires_at
- status

Rules:

- Device must belong to authenticated user.
- Payload must be temporary.
- Payload must expire.
- Payload should be single-use when possible.
- Payload should be deleted or marked consumed after pickup.
- Payload must not be logged.

## Playlist Push Security

Playlist push payloads must:

- Be encrypted
- Be temporary
- Be tied to a user
- Be tied to a device
- Expire automatically
- Be consumed only by the target device
- Be deleted or marked consumed after pickup when possible

Payloads must not:

- Become permanent cloud playlist storage
- Be exposed in logs
- Be shared across users
- Be shared across devices
- Become a playlist marketplace

## Authentication From App

The app may authenticate using one of these flows:

- Email and password login
- Activation code flow
- Device pairing code flow

MVP can choose the simplest secure flow.

Login-based flow:

- User enters email and password in app.
- App receives access and refresh tokens.
- App activates device.
- App checks license status.

Pairing-code flow:

- App shows code.
- User enters code in web panel.
- Backend links device to account.
- App polls activation status.
- App receives activation result.

Pairing-code flow may be better for TV devices, but it can be post-MVP if needed.

## Token Handling In App

The app should handle tokens securely.

Rules:

- Do not log tokens.
- Store tokens securely.
- Refresh tokens when needed.
- Logout should clear tokens.
- Expired tokens should trigger re-authentication.
- Do not expose tokens in crash logs.

## App Error Handling

The app should show user-friendly messages.

Important error states:

- Not activated
- Subscription expired
- Device blocked
- License invalid
- Force update required
- Maintenance mode
- Network error
- Server unavailable
- Rate limited
- Playlist transfer expired

The app should avoid exposing raw backend stack traces or internal errors.

## App-Facing Error Codes

The backend may return these app-facing error codes:

- UNAUTHORIZED
- FORBIDDEN
- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- APP_VERSION_UNSUPPORTED
- PLAYLIST_TRANSFER_NOT_FOUND
- PLAYLIST_TRANSFER_EXPIRED
- RATE_LIMITED
- SERVER_ERROR

The app should map these codes to clear UI messages.

## App Startup Sequence

Recommended startup sequence:

1. Load local app_generated_device_id.
2. Generate one if missing.
3. Load local auth state.
4. Fetch app version rules.
5. Fetch remote config.
6. Check maintenance mode.
7. Check force update.
8. Check device activation.
9. Check license status.
10. Load selected playlist profile from encrypted local storage.
11. Open player if access is allowed.

## App Logout Behavior

When user logs out, the app should:

- Clear local auth tokens.
- Keep or remove playlist profiles based on user choice.
- Clear temporary transfer state.
- Return to login or activation screen.

The app should not accidentally expose one user's playlist profile to another user.

## Device Removal Behavior

If a device is blocked or removed from backend:

- License status should return denied.
- App should show clear blocked or deactivated message.
- App should not allow normal player access.
- App may provide support or reactivation instructions.

## Heartbeat

The app may send periodic heartbeat updates.

Possible endpoint:

- PATCH /device/heartbeat

Heartbeat may update:

- last_seen_at
- app_version_code
- app_version_name
- platform
- device model
- IP metadata on backend side

Heartbeat should not include playlist credentials.

## App Logs

App logs must not include:

- Playlist username
- Playlist password
- Full playlist URL if sensitive
- Access token
- Refresh token
- Encryption keys
- Payment data

Safe logs may include:

- App version
- Platform
- Device status
- License result code
- Non-sensitive error code

## App UI States

The app should include screens or states for:

- Login
- Activation
- Pairing code if used
- Subscription active
- Subscription expired
- Device blocked
- Force update required
- Maintenance mode
- Playlist profile selection
- Add playlist profile
- Edit playlist profile
- Player screen
- Settings
- Logout

## App Settings

App settings may include:

- Account status
- Device information
- App version
- Subscription status
- License status
- Playlist profiles
- Clear cache
- Logout
- Support link

Settings must not expose sensitive internal tokens.

## App Version Metadata

The app should send version metadata with key requests.

Useful metadata:

- app_version_code
- app_version_name
- build_number
- platform
- device_model

This helps backend enforce update rules and debug issues.

## Network Behavior

The app should handle network failures gracefully.

Recommended behavior:

- Show clear network error.
- Retry safe requests when appropriate.
- Avoid infinite request loops.
- Do not spam license endpoint.
- Use timeouts.
- Use exponential backoff where useful.

## Rate Limit Awareness

If backend returns rate limit error:

- App should slow down retries.
- App should show temporary error message.
- App should not keep retrying aggressively.

License checks and heartbeat requests should be balanced.

## Security Requirements

The app must:

- Protect local playlist credentials.
- Protect tokens.
- Avoid logging secrets.
- Respect backend license status.
- Respect device block status.
- Respect force update.
- Respect maintenance mode.
- Validate server responses.
- Use HTTPS in production.

## Production API Base URL

The app should use environment-based API URLs.

Examples:

- Development API URL
- Staging API URL
- Production API URL

Production builds must not point to local development URLs.

## MVP App Integration Scope

MVP app integration should include:

- app_generated_device_id
- Device activation
- License status check
- Subscription status display
- App version check
- Remote config fetch
- Maintenance mode handling
- Force update handling
- Local encrypted playlist storage
- Multiple playlist profiles
- Basic error handling

## Post-MVP App Integration Ideas

Post-MVP ideas may include:

- Pairing-code activation
- Push notifications
- Support ticket link
- Advanced diagnostics
- Offline grace rules
- Encrypted cloud playlist sync with explicit user consent
- Advanced analytics
- In-app update helper
- Multi-language app UI

Each post-MVP feature requires approval.

## App Team Handoff Notes

The app team should understand:

- Backend does not provide content.
- Backend does not provide playlists.
- Backend does not provide streams.
- User playlist data is local-first.
- License status comes from backend.
- Device identity uses app_generated_device_id.
- MAC address is not primary identity.
- Playlist push is temporary and optional.
- Multi-profile support is required.

## Forbidden App Integration Behavior

Do not build app integration that expects backend to provide:

- Channel lists
- Stream URLs
- VOD catalogs
- Playlist marketplace
- Broadcast schedules
- CDN routes
- Transcoding output
- Provider credentials

## Final Rule

The app integrates with the backend for licensing, activation, subscription status, app version, remote config, and optional temporary profile transfer only.

The app manages playlist profiles locally by default.

The backend must not become a content provider.

The backend must not become playlist source of truth.
