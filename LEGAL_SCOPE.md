# Legal Scope

Compact legal and product-boundary scope for TV Project Platform.

## Legal Position

TV Project Platform is the web/API support platform for the Nexora TV Android TV / Fire TV player app.

It is a software/access management support layer.

It provides approved platform information where the app needs it.

It is not a provider, media service, content platform, channel seller, relay, CDN, broadcaster, catalog, marketplace, playback controller, stream authority, or permanent user-profile authority.

## Backend Scope

Backend may manage approved platform information:

- accounts
- authentication
- roles and authorization
- customer subscriptions
- player licenses
- device activation/status
- payment records
- reseller accounts
- reseller credit transactions
- app version control
- remote configuration
- maintenance mode
- feature flags
- audit logs
- optional temporary web-to-device transfer

## Backend Out of Scope

Backend must not manage, provide, or control:

- Android playback behavior
- provider inventory
- content catalog
- stream URLs as a platform catalog
- stream hosting
- stream relay
- stream transcoding
- CDN delivery
- broadcast infrastructure
- channel packages
- public marketplace
- permanent user-profile credential authority
- shared profile library
- public profile search

## User Responsibility

Users are responsible for their own lawful provider/profile information.

Users must comply with applicable laws, provider terms, and content rights.

The platform does not verify, endorse, sell, provide, or distribute third-party content or provider data.

## Local-First Profile Position

User profile/provider information is local-first by default.

The app may store sensitive profile data locally and securely on the user's device.

Backend is not the default permanent source of truth for this data.

## Optional Temporary Transfer

Optional transfer may exist only as scoped, protected, expiring, user-owned transfer to the user's own device.

It must not become permanent backend storage, marketplace, shared library, provider service, or playback-control mechanism.

## Payments

Payments are for approved platform access only.

Payments must not imply content, channel, stream, package, provider, marketplace, or broadcast access.

## Resellers

Resellers manage approved platform access operations for their own customers.

Resellers must not sell content, channels, streams, provider access, packages, or marketplace items through the platform.

## Public Messaging

Any public, UI, pricing, support, or marketing copy must preserve this boundary.

Public messaging may describe platform support, app access, device/license status, and app version support.

Public messaging must not imply included media content or backend playback/source control.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/06-security-bible.md
- project-bible/10-app-integration.md
- project-bible/11-marketing-bible.md
- SECURITY.md

## Final Legal Rule

Keep the platform legally and operationally positioned as an app-support software/access management layer only.
