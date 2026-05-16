# Legal Scope

## Product Classification

TV Project Platform is a Licensed IPTV Player Platform management system.

It is a software access, account, license, subscription, reseller, device activation, payment, app version, remote configuration, and optional user-owned profile transfer platform.

## Explicitly Out Of Scope

The platform must not:

- Provide TV streams
- Host TV streams
- Sell channel lists
- Sell playlists
- Operate a CDN
- Operate a relay
- Transcode streams
- Package copyrighted media
- Act as a media source
- Scrape or distribute third-party content
- Store playlist data as the platform source of truth
- Promote unauthorized access to copyrighted content

## Playlist Handling

Playlist/profile data belongs to the user.

Default flow:

1. User enters playlist/profile information inside the application.
2. Application stores that information locally on the device using encrypted storage.
3. The platform verifies software license and device activation, not media rights.

Optional bridge flow:

1. User enters their own playlist/profile in the web panel.
2. Backend encrypts and temporarily transfers it to the user's own activated device.
3. Backend deletes temporary transfer material according to retention policy.
4. Backend does not become a hosted playlist service.

## Required Product Language

Use language such as:

- Licensed player platform
- User-provided playlist profile
- Device activation
- License management
- Remote configuration
- Temporary encrypted transfer bridge

Avoid language such as:

- IPTV provider
- Channel package
- Free channels
- Premium streams
- Hosted playlist
- Content source
- Streaming service provider
