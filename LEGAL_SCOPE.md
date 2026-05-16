# Legal Scope

This file defines the legal and product boundary for TV Project Platform.

It exists to keep the project clearly positioned as a licensed player platform, not as a content provider.

## Product Position

TV Project Platform is a Licensed IPTV Player Platform.

It is a software platform.

It is not an IPTV broadcast provider.

It is not a media provider.

It is not a content provider.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Strict Boundary

The platform must not provide, host, relay, transcode, package, resell, or distribute TV streams.

The platform must not sell channel lists.

The platform must not operate as a CDN.

The platform must not operate as a stream relay.

The platform must not operate as a broadcast backend.

The platform must not become a playlist marketplace.

The platform must not become the source of truth for playlist data.

## Backend Scope

The backend may manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscriptions
- Player licenses
- Device activation
- Payment records
- Reseller accounts
- Reseller credit transactions
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary web-to-device playlist profile transfer

## Backend Out of Scope

The backend must not manage or provide:

- TV channels
- Channel packages
- Live streams
- VOD streams
- Stream hosting
- Stream relay
- Stream transcoding
- CDN delivery
- Broadcast infrastructure
- Permanent playlist credential authority
- Playlist provider services
- Content ownership
- Content delivery

## User Responsibility

Users are responsible for their own playlist or provider information.

Users must only use playlist or provider information that they are legally allowed to access.

Users must comply with applicable laws, provider terms, and content rights.

The platform does not verify, endorse, sell, provide, or distribute user playlist content.

## Playlist Storage Position

Backend is not playlist source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the user device.

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

## Optional Playlist Transfer

The user may optionally send a playlist profile from the web panel to their own device.

This feature must be designed only as a temporary encrypted transfer bridge.

The transfer payload must be temporary.

The transfer payload must expire.

The transfer payload should be deleted after successful pickup when possible.

This feature must not turn the backend into permanent playlist storage.

This feature must not turn the backend into a playlist provider.

## Encrypted Cloud Sync

Encrypted cloud sync is not part of the default architecture.

Encrypted cloud sync may be considered later only with explicit user consent.

If implemented later, it must be opt-in.

If implemented later, it must be encrypted.

If implemented later, it must not change the product into a playlist provider.

## App Position

The Android TV or Fire TV app is a player client.

The app may allow users to enter their own playlist or provider information.

The app may store playlist profiles locally.

The app may support multiple playlist profiles.

The app should verify license status with the backend.

The app should not imply that the platform provides content.

## Marketing Rules

Marketing must describe the product as:

- Licensed IPTV player platform
- Player management platform
- Device activation platform
- Subscription and license management platform
- Reseller management platform for player licenses

Marketing must not describe the product as:

- IPTV provider
- Channel provider
- Stream provider
- Content provider
- Playlist provider
- Broadcast service
- TV package seller

## Website Language Rules

The website should clearly state:

- The product is a player platform.
- The product does not provide channels.
- The product does not provide streams.
- The product does not sell playlists.
- Users use their own legal playlist or provider information.

The website should avoid language that suggests:

- Included channels
- Included streams
- Included content
- IPTV subscription with content
- Channel package access
- Guaranteed provider content

## Payment Scope

Payments are for software access, player licensing, account features, device activation, or reseller credit.

Payments are not for TV channels.

Payments are not for stream access.

Payments are not for content packages.

Payments are not for playlist provider access.

## Reseller Scope

Resellers may sell or manage player licenses, customer accounts, or subscription time for the software platform.

Resellers must not be positioned as channel sellers through this platform.

Resellers must not be given tools that make the platform a content distribution system.

Reseller credit is platform credit for player licensing and account management.

## Admin Scope

Admins may manage:

- Platform users
- Resellers
- Customers
- Plans
- Software subscriptions
- Player licenses
- Device activations
- App versions
- Remote config
- Payments
- Audit logs

Admins must not manage:

- Channel inventory
- Stream sources
- IPTV content packages
- CDN stream routes
- Relay infrastructure
- Broadcast schedules

## Prohibited Platform Features

Do not add the following features without explicit legal and product approval:

- Stream hosting
- Stream relay
- Channel package management
- Playlist marketplace
- Content catalog ownership
- CDN delivery for streams
- Transcoding pipeline
- Provider credential resale
- Default cloud playlist credential storage
- Permanent playlist authority backend
- Public playlist search
- Shared playlist library

## Legal Pages Needed

The public website should include:

- Terms of service
- Privacy policy
- Refund policy
- Acceptable use policy

These pages should clearly communicate the player-only model.

## Terms of Service Direction

The Terms of Service should explain:

- The platform is software only.
- The platform does not provide content.
- Users are responsible for their own provider or playlist information.
- Users must not use the service for unlawful content access.
- The platform may suspend abusive or illegal use.
- Payments are for software licensing and platform access.

## Privacy Policy Direction

The Privacy Policy should explain what data may be processed.

Possible data categories:

- Account information
- Email address
- Login metadata
- Device metadata
- Subscription records
- Payment status records
- Reseller credit records
- Audit logs
- Temporary playlist transfer metadata

The Privacy Policy should also explain that playlist credentials are not stored permanently by default.

## Refund Policy Direction

The Refund Policy should clearly explain:

- Payments relate to software/player license access.
- Refund rules for subscriptions.
- Refund rules for reseller credit if applicable.
- Non-refundable cases where legally allowed.
- Contact/support process.

## Acceptable Use Direction

The Acceptable Use Policy should prohibit:

- Illegal content access
- Unauthorized playlist usage
- Credential sharing abuse
- Payment fraud
- Reseller abuse
- Attempts to bypass licensing
- Attempts to reverse engineer or tamper with the app
- Use of the platform as a content distribution tool

## Compliance Notes

The project should be developed with privacy and data minimization in mind.

Store only necessary data.

Avoid storing sensitive playlist credentials on the backend by default.

Do not store payment card data.

Use secure payment providers.

Use encrypted storage where sensitive temporary transfer data is required.

## Development Rule

Every new feature should be checked against this legal scope.

If a feature moves the backend closer to content hosting, stream delivery, playlist authority, or channel selling, it should not be implemented without explicit approval.

## Final Rule

Keep the product as a licensed player platform.

Do not turn it into an IPTV provider.

Do not turn it into a content provider.

Do not turn it into a playlist provider.

Do not turn the backend into the source of truth for playlist data.
