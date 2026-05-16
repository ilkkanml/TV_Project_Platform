# 13 - Decision Log

This file records approved product, architecture, security, payment, reseller, app integration, DevOps, UI, and documentation decisions for TV Project Platform.

Future developers and assistants must check this file before changing major direction.

Do not silently reverse these decisions.

## Decision Log Purpose

The decision log exists to prevent repeated confusion and accidental scope changes.

It records:

- What was decided
- Why it was decided
- What must not be changed without approval
- Which project areas are affected
- Which files should be updated when a decision changes

## Decision Status Values

Decision statuses:

- APPROVED
- PENDING
- REJECTED
- SUPERSEDED

Only APPROVED decisions are active project rules.

PENDING decisions require approval before implementation.

REJECTED decisions must not be implemented.

SUPERSEDED decisions were replaced by newer decisions.

## Decision Change Rule

Do not change an APPROVED decision unless the project owner explicitly approves the change.

When a decision changes, update:

- This file
- README.md when relevant
- PROJECT_STATE.md when relevant
- AI_HANDOFF.md when relevant
- ROADMAP.md when relevant
- Related project-bible files
- Related docs files

## Decision 001 - Product Type

Status: APPROVED

Decision:

TV Project Platform is a Licensed IPTV Player Platform.

Reason:

The product must remain a software platform for managing licensed player access, subscriptions, devices, payments, resellers, app version control, remote config, audit logs, and app integration.

Implications:

- The product is software.
- The product is not media.
- The product is not a content provider.
- The product is not an IPTV broadcast provider.
- The product is not a playlist provider.
- The product is not a channel seller.

Affected areas:

- Product
- Marketing
- Legal
- API
- Database
- UI
- App integration
- Support

## Decision 002 - Backend Is Not Content Provider

Status: APPROVED

Decision:

The backend must never provide, host, relay, transcode, package, sell, resell, or distribute TV streams.

Reason:

The backend must stay within the licensed player platform scope.

Implications:

Do not build:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package management
- Content catalog management
- Broadcast infrastructure

Affected areas:

- API
- Database
- DevOps
- Security
- Marketing
- UI

## Decision 003 - No Backend Channel Source Of Truth

Status: APPROVED

Decision:

The backend must not become the source of truth for TV channels, stream URLs, VOD streams, channel packages, playlists, or content catalogs.

Reason:

The platform must not become a content delivery or IPTV provider system.

Implications:

Do not create source-of-truth models or endpoints for:

- Channel
- StreamSource
- ChannelPackage
- ContentCatalog
- PlaylistMarketplaceItem
- BroadcastSchedule
- CdnRoute
- TranscodingJob

Affected areas:

- Database
- API
- Admin UI
- Reseller UI
- Public marketing

## Decision 004 - Playlist Local-First Model

Status: APPROVED

Decision:

Playlist information is local-first.

By default, users enter playlist or provider information inside the app.

The app stores playlist credentials on the device.

Reason:

The backend must not become permanent playlist authority.

Implications:

- App manages playlist profiles locally.
- App stores credentials securely.
- Backend does not permanently store playlist credentials by default.
- Web panel playlist transfer is optional and temporary only.

Affected areas:

- App integration
- Security
- Database
- API
- UI
- Support

## Decision 005 - Local Encrypted Playlist Storage

Status: APPROVED

Decision:

Playlist credentials stored on the device must use encrypted local storage.

Reason:

Playlist credentials may contain sensitive provider information.

Implications:

The app must protect:

- Playlist URL
- Server URL
- Username
- Password
- Provider credentials
- Related playlist access data

The app must not log playlist credentials.

Affected areas:

- App integration
- Security
- Testing
- Support

## Decision 006 - Multi-Profile App Support

Status: APPROVED

Decision:

The app should support multiple local playlist profiles.

Reason:

Users may need more than one profile and should be able to switch between them inside the app.

Implications:

The app should support:

- Add profile
- Edit profile
- Delete profile
- Rename profile
- Select active profile
- Switch active profile

Affected areas:

- App integration
- UI
- Testing

## Decision 007 - Optional Web-To-Device Playlist Transfer

Status: APPROVED

Decision:

The web panel may optionally allow a user to send a playlist profile to their own device.

This feature must work only as a temporary encrypted transfer bridge.

Reason:

This improves user convenience without making the backend playlist source of truth.

Implications:

Transfer payload must be:

- Temporary
- Encrypted
- User-scoped
- Device-scoped
- Expirable
- Deleted or marked consumed after pickup when possible

This feature must not become:

- Permanent cloud playlist storage
- Playlist marketplace
- Shared playlist library
- Public playlist search
- Playlist provider service

Affected areas:

- API
- Database
- App integration
- Security
- UI
- Testing

## Decision 008 - Encrypted Cloud Sync Not Default

Status: APPROVED

Decision:

Encrypted cloud sync is not part of the default architecture.

It may be considered later only with explicit approval and user consent.

Reason:

Default backend playlist storage would weaken the local-first product boundary.

Implications:

Do not build encrypted cloud sync without approval.

If approved later, it must be:

- Opt-in
- Encrypted
- Consent-based
- Clearly explained
- Not a playlist provider feature

Affected areas:

- Product
- Security
- App integration
- Database
- UI
- Legal

## Decision 009 - Primary Device Identity

Status: APPROVED

Decision:

MAC address must not be used as the primary device identifier.

The primary device identifier is:

- app_generated_device_id

Reason:

MAC address is not reliable, not always available, and should not be the primary identity.

Implications:

The app should generate app_generated_device_id on first launch and persist it securely.

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

Affected areas:

- App integration
- API
- Database
- License checks
- Testing

## Decision 010 - Backend-Authoritative License Checks

Status: APPROVED

Decision:

The backend is the authority for license status.

The app must not decide final license validity alone.

Reason:

License, subscription, device, account, app version, and maintenance rules must be centrally enforced.

Implications:

License status should consider:

- User status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Remote config rules
- Maintenance mode

Affected areas:

- API
- App integration
- Database
- Security
- Testing

## Decision 011 - Primary Roles

Status: APPROVED

Decision:

The platform has three primary roles:

- Admin
- Reseller
- Customer

Reason:

These roles cover the MVP product model clearly.

Implications:

Role checks must be enforced on the backend.

Frontend route hiding is not enough.

Affected areas:

- API
- Web app
- Shared package
- Database
- Security
- Testing

## Decision 012 - Backend Authorization Required

Status: APPROVED

Decision:

Every protected backend endpoint must enforce authentication, role authorization, ownership checks, resource status checks, and action permission checks.

Reason:

Frontend-only security is not real security.

Implications:

Protected endpoints must check:

- Authentication
- User role
- Resource ownership
- Resource status
- Action permission

Affected areas:

- API
- Security
- Testing
- UI

## Decision 013 - Reseller Customer Ownership

Status: APPROVED

Decision:

Resellers may only access their own customers and related records.

Reason:

Cross-reseller data access would be a serious security and business logic failure.

Implications:

Reseller-owned customer records should be scoped by reseller_id.

Resellers must not access:

- Other reseller customers
- Other reseller devices
- Other reseller subscriptions
- Other reseller payment data
- Global platform data

Affected areas:

- API
- Database
- Reseller UI
- Security
- Testing

## Decision 014 - Transaction-Based Reseller Credit

Status: APPROVED

Decision:

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Reason:

Credit changes require accountability, auditability, and reliable financial history.

Implications:

Every credit operation must create a transaction record.

Credit transactions should include:

- Reseller ID
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer
- Related subscription
- Created by
- IP address
- Note
- Created date

Affected areas:

- Database
- API
- Reseller UI
- Admin UI
- Security
- Testing

## Decision 015 - Backend Calculates Reseller Credit Usage

Status: APPROVED

Decision:

The backend must calculate reseller credit cost and balance changes.

Frontend credit values must not be trusted.

Reason:

Frontend values can be manipulated.

Implications:

The backend must calculate:

- Plan credit cost
- Balance before
- Balance after
- Subscription result

Negative balances must be prevented.

Affected areas:

- API
- Database
- Security
- Testing

## Decision 016 - Reseller Credit Operations Use Database Transactions

Status: APPROVED

Decision:

Reseller credit operations must happen inside database transactions.

Reason:

Credit deduction and subscription creation or extension must succeed or fail together.

Implications:

If credit deduction succeeds but subscription update fails, the operation must rollback.

If subscription update succeeds but credit transaction fails, the operation must rollback.

Affected areas:

- API
- Database
- Testing

## Decision 017 - Payments Are For Software Access Only

Status: APPROVED

Decision:

Payments are for software/player access only.

Reason:

The platform must not sell content, streams, channels, playlists, or broadcast access.

Payments may be for:

- Software access
- Player license access
- Subscription time
- Device activation rights
- Reseller credit
- Platform account features

Payments must not be for:

- Channels
- Streams
- Playlists
- Content packages
- Broadcast access

Affected areas:

- Payment
- Marketing
- Legal
- UI
- Support

## Decision 018 - Manual Payment MVP

Status: APPROVED

Decision:

The MVP may start with manual payment records.

Reason:

Manual payments allow the platform foundation to be built before real provider integration.

Implications:

Manual payment approval must be admin-only.

Manual payment rejection must be admin-only.

Manual payment approval may extend subscriptions only through backend logic.

Affected areas:

- Payment
- Admin UI
- API
- Database
- Audit logs

## Decision 019 - No Card Data Storage

Status: APPROVED

Decision:

The platform must not store payment card data.

Reason:

Card data requires strict payment compliance and should be handled by approved payment providers.

Implications:

Do not store:

- Card numbers
- CVV
- Full raw card payloads
- Payment provider secrets in database
- Webhook secrets in database

Affected areas:

- Payment
- Security
- Database
- API
- Logging

## Decision 020 - Payment Webhook Verification

Status: APPROVED

Decision:

When payment providers are integrated, webhook signatures must be verified.

Reason:

Unsigned or unverified webhooks cannot be trusted.

Implications:

Subscription extension must happen only after verified payment confirmation.

Frontend success pages must not directly extend subscriptions.

Affected areas:

- Payment
- API
- Security
- Testing

## Decision 021 - Planned Payment Providers

Status: APPROVED

Decision:

Possible future payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Reason:

Provider selection should remain flexible until implementation.

Implications:

No provider should be hardcoded as final without approval.

Affected areas:

- Payment
- API
- DevOps
- Documentation

## Decision 022 - Passwords Must Be Hashed

Status: APPROVED

Decision:

Passwords must never be stored in plain text.

Reason:

Plain text password storage is unacceptable.

Implications:

Use a strong password hashing algorithm such as:

- Argon2
- bcrypt

Password hashes must never be returned by the API.

Password hashes must never be logged.

Affected areas:

- Auth
- API
- Database
- Security
- Testing

## Decision 023 - Token Security

Status: APPROVED

Decision:

Authentication should use secure access and refresh token handling.

Reason:

Tokens protect account access and must be handled carefully.

Implications:

- Access tokens should be short-lived.
- Refresh tokens should be handled securely.
- Refresh tokens should be stored as hashes where practical.
- Logout should invalidate refresh tokens where possible.
- Tokens must not be logged.

Affected areas:

- API
- Web app
- App integration
- Security

## Decision 024 - Audit Logs Required For Critical Actions

Status: APPROVED

Decision:

Critical platform actions should be audit logged.

Reason:

Audit logs support security review, accountability, support, reseller credit tracking, payment review, and incident investigation.

Implications:

Audit logs should include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Sensitive data must not be logged.

Affected areas:

- API
- Database
- Admin UI
- Security

## Decision 025 - App Version Control

Status: APPROVED

Decision:

The platform should support app version control.

Reason:

The app may need minimum version rules, force update behavior, APK URLs, and changelogs.

Implications:

Admin should be able to manage:

- Platform
- Version code
- Version name
- Minimum version code
- Force update flag
- APK URL
- Changelog
- Active status

Affected areas:

- API
- Database
- Admin UI
- App integration
- DevOps

## Decision 026 - Remote Config

Status: APPROVED

Decision:

The platform should support remote configuration.

Reason:

The app and platform need central control for maintenance mode, announcements, and feature flags.

Implications:

Remote config may include:

- Maintenance mode
- Maintenance message
- Announcement
- Feature flags
- Minimum version code
- Platform-specific config

Remote config must not contain secrets.

Affected areas:

- API
- Database
- Admin UI
- App integration
- Security

## Decision 027 - Maintenance Mode

Status: APPROVED

Decision:

The platform should support maintenance mode through remote config.

Reason:

Maintenance mode helps safely control app and platform access during incidents or risky deployments.

Implications:

The app must respect maintenance mode.

The web dashboard may show maintenance banners.

Admin access may remain available when needed.

Affected areas:

- Remote config
- App integration
- Web UI
- DevOps

## Decision 028 - Planned Technical Stack

Status: APPROVED

Decision:

The planned technical stack is:

- pnpm monorepo
- Next.js
- React
- TypeScript
- Tailwind CSS
- NestJS
- Prisma
- PostgreSQL
- Redis
- Docker Compose

Reason:

This stack supports modern full-stack TypeScript development with clear separation between web, API, shared types, database, cache, and local development infrastructure.

Implications:

Do not change the stack without approval.

Affected areas:

- DevOps
- Web app
- API
- Shared package
- Documentation

## Decision 029 - Monorepo Structure

Status: APPROVED

Decision:

The planned monorepo structure is:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra
- .github

Reason:

This keeps frontend, backend, shared code, documentation, infrastructure, and workflows organized.

Implications:

Do not create duplicate nested folders such as:

- project-bible/project-bible
- docs/docs
- apps/apps
- packages/packages

Affected areas:

- Repository structure
- DevOps
- Documentation
- Future implementation

## Decision 030 - Stable Project Bible Tree

Status: APPROVED

Decision:

The stable project-bible tree is:

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

Reason:

The project-bible must stay predictable and easy to use as long-term project memory.

Implications:

Do not rename these files without approval.

Do not create conflicting alternative Bible files.

Affected areas:

- Documentation
- AI handoff
- Future development

## Decision 031 - Deprecated Bible Names

Status: APPROVED

Decision:

The following old or conflicting Bible names should not be used:

- 02-legal-boundaries.md
- 03-playlist-philosophy.md
- 04-architecture-principles.md
- 05-reseller-credit-system.md
- 06-device-activation.md
- 07-payment-subscriptions.md
- 08-remote-config-versioning.md
- 09-security-privacy.md
- 10-ops-and-deployment.md
- 11-ui-product-guidelines.md
- 12-testing-strategy.md

Reason:

The project-bible tree must be stable and avoid duplicate concepts.

Implications:

Useful content from old names should be moved into the stable tree.

Old conflicting files should be removed after migration.

Affected areas:

- Documentation
- Repository structure

## Decision 032 - Manual Editing Workflow For Critical Docs

Status: APPROVED

Decision:

Critical multiline files may be edited manually through GitHub web editor or Codespaces.

Reason:

Automated GitHub connector updates previously caused multiline files to collapse into long single-line content.

Implications:

For critical documentation files, verify line counts through raw GitHub.

Affected areas:

- Documentation workflow
- GitHub workflow
- AI handoff

## Decision 033 - Raw GitHub Line Count Verification

Status: APPROVED

Decision:

Critical documentation files should be verified with raw GitHub line count checks.

Recommended command:

```bash
curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_PATH | wc -l
```

Reason:

This catches collapsed single-line files.

Implications:

Multiline documentation files should not return `1`.

Affected areas:

- Documentation
- GitHub workflow

## Decision 034 - Public Website Required

Status: APPROVED

Decision:

The platform should include a public website.

Reason:

The product needs clear communication, pricing, device support, app downloads, FAQ, and legal pages.

Implications:

Public website should include:

- Home page
- Pricing page
- Device selector page
- Download page
- FAQ page
- Terms of service page
- Privacy policy page
- Refund policy page
- Acceptable use policy page
- Support entry point

Affected areas:

- Web app
- Marketing
- Legal
- UI

## Decision 035 - Legal Boundary Pages Required

Status: APPROVED

Decision:

The public website should include legal boundary pages.

Reason:

The product must clearly communicate its software/player-only scope.

Implications:

Required pages:

- Terms of service
- Privacy policy
- Refund policy
- Acceptable use policy

These pages must clearly state that the platform does not provide channels, streams, playlists, or content.

Affected areas:

- Legal
- Marketing
- UI
- Support

## Decision 036 - Marketing Must Be Player-Only

Status: APPROVED

Decision:

Marketing must describe the product as a licensed player platform.

Reason:

Marketing must not create confusion that the product includes IPTV content.

Implications:

Marketing must not imply:

- Included channels
- Included streams
- Included content
- IPTV subscription with content
- Channel package access
- Playlist provider access

Affected areas:

- Marketing
- UI
- Legal
- Support

## Decision 037 - Support Must Not Provide Content

Status: APPROVED

Decision:

Support may help with platform, account, subscription, device, license, payment, reseller, app version, remote config, and temporary transfer issues.

Support must not provide channels, streams, playlists, provider credentials, or content recommendations.

Reason:

Support must respect the product boundary.

Implications:

Support can help with:

- Account issues
- Login issues
- Subscription status
- Device activation
- License status
- App updates
- Payment status
- Reseller credit questions
- Temporary playlist transfer issues

Support must not help users find IPTV content.

Affected areas:

- Support
- Legal
- Marketing
- UI

## Decision 038 - Infrastructure Must Not Support Stream Delivery

Status: APPROVED

Decision:

Infrastructure must not be designed for stream hosting, stream relay, transcoding, CDN stream delivery, channel package delivery, or broadcast infrastructure.

Reason:

DevOps must reinforce the licensed player platform boundary.

Implications:

Allowed infrastructure:

- Web app
- API app
- PostgreSQL
- Redis
- Background jobs
- APK storage
- Logs
- Monitoring
- Backups

Forbidden infrastructure:

- Stream servers
- Transcoding workers
- CDN stream routes
- Broadcast systems

Affected areas:

- DevOps
- Architecture
- Security

## Decision 039 - Redis Usage

Status: APPROVED

Decision:

Redis may be used for platform operations such as rate limiting, cache, queues, temporary state, and expiring temporary transfer data.

Reason:

Redis is useful for backend operations but must not become permanent playlist or stream infrastructure.

Implications:

Redis must not store permanent playlist credentials.

Redis must not be used for stream delivery.

Affected areas:

- API
- DevOps
- Security

## Decision 040 - APK Storage Is Allowed

Status: APPROVED

Decision:

APK storage and APK download links are allowed for app distribution.

Reason:

The platform supports app version management and app downloads.

Implications:

APK storage may support:

- Approved APK URL
- Versioned app releases
- Admin-managed app version records
- Changelogs

APK storage must not be mixed with stream hosting infrastructure.

Affected areas:

- App integration
- DevOps
- Web app
- Admin UI

## Decision 041 - UI Must Not Look Like Content Provider

Status: APPROVED

Decision:

The UI must not make the product look like an IPTV content provider.

Reason:

The user experience must match the licensed player platform identity.

Implications:

Do not create UI for:

- Channel lists
- Stream source management
- Channel package builder
- Content catalog
- Playlist marketplace
- Public playlist search
- Broadcast schedule

Affected areas:

- UI
- Marketing
- Legal
- Product

## Decision 042 - Checkout Copy Must Clarify Software Access

Status: APPROVED

Decision:

Checkout pages must clearly state that payment is for software/player access only.

Reason:

Payment pages must not imply channels, streams, playlists, or content are included.

Implications:

Checkout should include a boundary statement similar to:

Payment is for software/player access only. TV Project Platform does not provide channels, streams, playlists, or content.

Affected areas:

- Payment
- UI
- Marketing
- Legal

## Decision 043 - Feature Flags Are Not Security

Status: APPROVED

Decision:

Feature flags may hide or enable features, but they must not replace backend authorization.

Reason:

Frontend visibility is not security.

Implications:

Backend must still check roles, ownership, status, and permissions even when a feature flag hides UI.

Affected areas:

- API
- Web app
- App integration
- Security

## Decision 044 - Production Secrets Must Not Be Committed

Status: APPROVED

Decision:

Production secrets must never be committed to the repository.

Reason:

Committed secrets can compromise the platform.

Implications:

`.env.example` may contain placeholders only.

Real secrets must be stored in environment variables or hosting provider secret configuration.

Affected areas:

- DevOps
- Security
- API
- Web app

## Decision 045 - MVP Foundation First

Status: APPROVED

Decision:

The project should stabilize documentation, architecture, and repository foundation before rushing implementation.

Reason:

The product boundary, role model, reseller credit model, payment rules, app integration, and project structure must be clear before coding.

Implications:

Foundation phase includes:

- README
- PROJECT_STATE
- AI_HANDOFF
- ROADMAP
- project-bible
- docs
- root config files
- local setup files

Affected areas:

- Project management
- Documentation
- Future implementation

## Decision 046 - MVP Feature Scope

Status: APPROVED

Decision:

MVP should include:

- Auth
- Role-based access control
- Customer panel
- Reseller panel
- Admin panel
- Plan management
- Subscription management
- Device activation
- License status API
- App version API
- Remote config API
- Reseller credit system
- Manual payment records
- Audit logs
- Basic public website
- Basic legal pages

Reason:

This is the minimum platform foundation for licensed player access operations.

Implications:

Do not add post-MVP features before MVP foundation is stable unless approved.

Affected areas:

- Roadmap
- API
- Web app
- Database
- Testing

## Decision 047 - MVP Must Not Include Content Features

Status: APPROVED

Decision:

MVP must not include:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel selling
- Channel package management
- Playlist marketplace
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage

Reason:

MVP must protect the product boundary.

Affected areas:

- Product
- API
- Database
- UI
- DevOps
- Marketing

## Decision 048 - Post-MVP Features Need Approval

Status: APPROVED

Decision:

Post-MVP features require explicit approval before implementation.

Reason:

The project must avoid accidental scope creep.

Post-MVP candidates include:

- Real payment provider integration
- Email notifications
- SMS notifications
- Ticket system
- Affiliate system
- Referral codes
- Invoice generation
- PDF receipts
- Admin two-factor authentication
- Advanced device limits
- Advanced reseller reporting
- Encrypted cloud playlist sync with explicit user consent

Affected areas:

- Roadmap
- Product
- API
- Web app
- App integration

## Decision 049 - Testing Must Include Boundary Protection

Status: APPROVED

Decision:

Testing must verify that the platform does not expose content-provider behavior.

Reason:

Boundary protection is a core product and legal requirement.

Implications:

Tests should verify:

- No channel management endpoints exist.
- No stream source endpoints exist.
- No playlist marketplace endpoints exist.
- Public copy does not imply included content.
- Backend does not return stream URLs.
- Reseller cannot sell channel packages.
- Payment copy is software-access-only.

Affected areas:

- Testing
- API
- UI
- Marketing

## Decision 050 - Future Assistants Must Read Project Memory

Status: APPROVED

Decision:

Future assistants and developers must read project memory files before making major changes.

Reason:

The project has many fixed decisions that must not be rediscovered or accidentally reversed.

Required memory files:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

Affected areas:

- Documentation
- AI workflow
- Development workflow

## Pending Decision 001 - Final App Activation Method

Status: PENDING

Decision needed:

Choose the final app activation method for MVP.

Options:

- Login inside app
- Activation code entered in web panel
- QR code activation
- Device code activation
- Hybrid approach

Current direction:

MVP may start with the simplest approved method.

Do not implement final app activation flow without approval.

## Pending Decision 002 - Final Payment Provider

Status: PENDING

Decision needed:

Choose the final real payment provider when moving beyond manual payment MVP.

Options:

- Iyzico
- PayTR
- Stripe
- Other approved provider

Current direction:

MVP may start with manual payment records.

Do not implement real provider integration without approval.

## Pending Decision 003 - Hosting Provider

Status: PENDING

Decision needed:

Choose the production hosting provider.

Options may include:

- VPS
- Docker-based deployment
- Managed platform
- Cloud provider
- Managed PostgreSQL
- Managed Redis

Current direction:

Local development uses Docker Compose.

Production hosting requires approval.

## Pending Decision 004 - Encrypted Cloud Playlist Sync

Status: PENDING

Decision needed:

Decide whether encrypted cloud playlist sync will ever be added.

Current direction:

Not part of default architecture.

May be considered later only with explicit user consent and approval.

Do not implement by default.

## Pending Decision 005 - Multi-Language UI

Status: PENDING

Decision needed:

Decide whether the UI will support multiple languages.

Current direction:

Initial UI may be English.

Turkish support may be added later if approved.

## Rejected Decision 001 - Backend Stream Hosting

Status: REJECTED

Rejected idea:

Use backend to host, relay, transcode, or distribute streams.

Reason:

This violates the product boundary.

Do not implement.

## Rejected Decision 002 - Channel Package Sales

Status: REJECTED

Rejected idea:

Sell channel packages through plans, reseller dashboard, admin dashboard, or payment system.

Reason:

The product sells software/player access only.

Do not implement.

## Rejected Decision 003 - Backend Playlist Marketplace

Status: REJECTED

Rejected idea:

Create a backend marketplace for public or shared playlists.

Reason:

The backend must not become playlist provider or playlist marketplace.

Do not implement.

## Rejected Decision 004 - Frontend-Trusted Payment Success

Status: REJECTED

Rejected idea:

Extend subscriptions directly from frontend payment success page.

Reason:

Payment success must be verified by backend.

Do not implement.

## Rejected Decision 005 - Simple Reseller Balance Without Transactions

Status: REJECTED

Rejected idea:

Use only a reseller balance field without credit transaction history.

Reason:

Credit history must be auditable and transaction-based.

Do not implement.

## Rejected Decision 006 - MAC Address As Primary Device ID

Status: REJECTED

Rejected idea:

Use MAC address as the primary device identifier.

Reason:

MAC address is not reliable and must not be the primary identity.

Use app_generated_device_id instead.

## Rejected Decision 007 - Permanent Backend Playlist Credential Storage By Default

Status: REJECTED

Rejected idea:

Store all user playlist credentials permanently in backend by default.

Reason:

The project uses local-first playlist management.

Do not implement.

## Decision Update Template

Use this template when adding a new decision:

```md
## Decision XXX - Title

Status: APPROVED

Decision:

What was decided.

Reason:

Why this decision was made.

Implications:

What this means for the project.

Affected areas:

- Area 1
- Area 2
- Area 3
```

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

Do not create conflicting alternative decision log files.

## Final Rule

This decision log is a source of project truth.

Do not reverse approved decisions silently.

Do not implement rejected decisions.

Do not implement pending decisions without approval.

When in doubt, preserve the licensed player platform boundary.
