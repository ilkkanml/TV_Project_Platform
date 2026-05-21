# 10 - App Integration

Compact app integration authority for TV Project Platform.

## App Integration Rule

The Android TV / Fire TV app is the player client.

TV Project Platform is the web/API support layer.

The app integrates with backend only for approved platform information and access-state checks.

The app must not expect backend provider, distribution, catalog, marketplace, relay, playback-control, stream-authority, or permanent user-profile-authority behavior.

## Supported Platforms

Initial supported platforms may include:

- Android TV
- Fire TV
- Android Box
- Google TV where compatible

## App Responsibilities

The app should:

- own playback behavior
- own local source/profile entry behavior
- generate app_generated_device_id
- persist device identity securely
- activate/register device with backend when needed
- check license status
- check subscription/access status when needed
- check app version rules
- fetch remote config
- respect maintenance mode
- respect force update rules
- manage user profiles locally by default
- store sensitive profile data securely on device
- support multiple local profiles when implemented

## Backend Responsibilities

Backend may provide information only in approved places:

- account/activation validation
- device activation/status
- license/subscription/access status
- app version rules
- remote configuration
- maintenance or force-update status
- temporary transfer bridge when enabled

Backend must not control playback, provide media sources, provide stream URLs, manage content catalogs, or become default permanent authority for user profile/provider data.

## Device Identity

Primary identity:

- app_generated_device_id

Secondary signals may include:

- platform
- app version
- device model
- Android ID when available and appropriate
- install metadata

MAC address must not be the primary identity.

## Temporary Transfer

Temporary web-to-device transfer may exist only when enabled.

It must be:

- user-scoped
- device-scoped when applicable
- encrypted when sensitive
- expiring
- consumable once where practical
- deleted or marked consumed after pickup

It must not become cloud profile storage, shared profile library, public search, marketplace, provider storage, or app playback control.

## App-Facing API Needs

App may call:

- device activate/status
- heartbeat when needed
- license status
- app version check
- remote config
- temporary transfer consume when enabled

These calls send or receive platform information only.

They must not create provider, catalog, stream, playlist marketplace, or playback-control behavior.

## Security

The app must not log sensitive provider/profile data.

Backend responses must not expose secrets or unrelated user data.

License, access, version, and device decisions are backend-authoritative only inside approved platform-access scope.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/13-decision-log.md
- SECURITY.md

## Final App Rule

The app owns playback and local profile behavior; backend provides approved platform information and access authority only.