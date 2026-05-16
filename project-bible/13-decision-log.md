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
