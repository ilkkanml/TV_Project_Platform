# Project State

This file describes the current known state of TV Project Platform.

It should be updated whenever major project decisions, structure changes, documentation milestones, implementation milestones, or release milestones change.

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

The platform is a software/player licensing, subscription, reseller, device activation, payment, app version, remote config, and dashboard management system.

The platform is not an IPTV provider.

The platform is not a content provider.

The platform is not a stream provider.

The platform is not a channel seller.

The platform is not a playlist marketplace.

The platform is not a broadcast backend.

## Current Phase

Current phase:

Foundation and documentation stabilization.

The project is not yet in full application implementation phase.

The current priority is to stabilize:

- Project identity
- Product boundary
- Root documentation
- Project Bible
- Canonical docs
- Repository structure
- Handoff files
- Implementation rules

Application implementation should not move too far before the foundation files are stable.

## Current Status Summary

Completed or mostly stabilized:

- Product scope
- Licensed player platform boundary
- Core role model
- Reseller credit principles
- Payment principles
- Device identity principles
- Playlist handling principles
- Security principles
- App integration principles
- Testing principles
- Support principles
- Release principles
- Project Bible canonical tree

Still pending:

- CONTRIBUTING.md
- LICENSE.md
- Canonical docs completion
- Review and migration of existing non-canonical docs
- apps/web implementation
- apps/api implementation
- packages/shared implementation
- Prisma schema implementation
- CI workflow implementation
- Deployment configuration
- Production readiness

## Absolute Product Boundary

TV Project Platform must never become:

- IPTV provider
- Content provider
- Stream provider
- Channel seller
- Playlist seller
- Playlist marketplace
- CDN stream delivery system
- Stream relay system
- Stream transcoding system
- Broadcast backend
- Backend playlist source of truth

The platform must not provide:

- TV channels
- Live streams
- VOD streams
- Stream URLs
- IPTV playlists
- Channel packages
- Content catalogs
- Broadcast schedules
- Provider credentials
- Public playlist search
- Shared playlist library

The platform may manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscriptions
- Player licenses
- Device activation
- Device status
- Payments
- Resellers
- Reseller credit transactions
- App versions
- Remote config
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary encrypted playlist profile transfer bridge

## Playlist State

Playlist handling is local-first.

Default playlist behavior:

- Users enter playlist or provider information inside the app.
- Playlist profiles are stored on the user's device.
- Credentials are stored using encrypted local storage where supported.
- The app may support multiple local playlist profiles.
- Users may switch between local profiles.

Backend playlist behavior:

- Backend is not the playlist source of truth.
- Backend must not provide playlists.
- Backend must not provide stream URLs.
- Backend must not provide channel lists.
- Backend must not permanently store playlist credentials by default.
- Backend may optionally support temporary encrypted web-to-device playlist profile transfer.
- Temporary transfer payloads must expire.
- Temporary transfer payloads should be deleted or marked consumed after pickup.
- Temporary transfer must be scoped to the correct user and device.

Encrypted cloud playlist sync is not enabled by default.

Encrypted cloud playlist sync requires explicit product approval.

## Device Identity State

MAC address is not the primary device identity.

Primary device identity:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata
- Last seen timestamp

Device activation and license checks should be based on the app-generated identity as the primary identifier.

## Role State

The platform has three core roles:

- Admin
- Reseller
- Customer

Admin responsibilities:

- Manage users
- Manage resellers
- Manage plans
- Manage subscriptions
- Manage payments
- Manage devices
- Manage app versions
- Manage remote config
- Manage reseller credit
- View audit logs

Reseller responsibilities:

- Manage own customers
- Create own customer accounts
- Assign or extend subscriptions for own customers using reseller credit
- View own credit balance
- View own credit transactions
- View own sales/customer history

Customer responsibilities:

- Manage own account
- View own subscription
- View own devices
- View own payment history
- Use licensed player app
- Optionally use temporary playlist transfer for own devices when enabled

Backend role authorization and ownership checks are mandatory.

Frontend route hiding is not security.

## Reseller Credit State

Reseller credit must be transaction-based.

A balance field alone is not enough.

Every credit operation must create a transaction record.

A reseller credit transaction should include:

- reseller_id
- type
- amount
- balance_before
- balance_after
- related_customer_id when applicable
- related_subscription_id when applicable
- created_by_user_id
- IP address where practical
- note
- created_at

Credit operations must be backend-authoritative.

The frontend must not decide:

- final credit cost
- reseller balance
- subscription duration
- plan price
- discount result
- balance_after

Credit deduction and subscription creation or extension must happen safely in one database transaction.

Negative balances must be prevented.

Credit transactions must not be silently deleted.

## Payment State

The platform must not store card data.

The platform must not store:

- Full card number
- CVV
- Card PIN
- Raw sensitive payment credentials

MVP may use manual payment approval.

Future payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved providers

Provider webhook signatures must be validated.

Subscription extension must happen only after verified payment confirmation.

Frontend payment success screens must not extend subscriptions directly.

Payment amount, duration, plan result, and subscription result must be calculated by the backend.

## Security State

Security-sensitive decisions must be enforced by the backend.

Required security principles:

- No plaintext passwords
- Passwords must be hashed
- Password hashes must not be returned by API
- Role-based access control is mandatory
- Ownership checks are mandatory
- Rate limits are required for sensitive endpoints
- Audit logs are required for critical actions
- Payment webhook validation is required when providers are enabled
- Backend license checks are authoritative
- Sensitive data must not be logged
- Temporary playlist payloads must expire
- Feature flags must not replace backend authorization

Sensitive data must not be exposed in API responses, UI, logs, support notes, or audit logs.

## Tech Stack State

The planned technical stack is:

- pnpm monorepo
- apps/web: Next.js, React, TypeScript, Tailwind CSS
- apps/api: NestJS, TypeScript, Prisma
- packages/shared: shared types, constants, schemas, utilities
- PostgreSQL
- Redis
- Docker Compose

## Canonical Repository Structure

The intended repository structure is:

```txt
TV_Project_Platform/
├── README.md
├── PROJECT_STATE.md
├── AI_HANDOFF.md
├── ROADMAP.md
├── CHANGELOG.md
├── SECURITY.md
├── LEGAL_SCOPE.md
├── CONTRIBUTING.md
├── LICENSE.md
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── docker-compose.yml
├── project-bible/
├── docs/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── infra/
└── .github/
```

## Root File State

Known root files currently present:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- .env.example
- .gitignore
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml

Known root files still missing:

- CONTRIBUTING.md
- LICENSE.md

These should be added before moving too far into implementation.

## Project Bible State

The canonical project-bible tree has been defined.

The project-bible tree should contain exactly these files:

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/02-user-roles.md
- project-bible/03-feature-list.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/09-ui-ux-bible.md
- project-bible/10-app-integration.md
- project-bible/11-marketing-bible.md
- project-bible/12-devops-bible.md
- project-bible/13-decision-log.md
- project-bible/14-testing-bible.md
- project-bible/15-support-bible.md
- project-bible/16-release-bible.md

Latest known validations:

- project-bible/14-testing-bible.md exists and has 1225 lines
- project-bible/15-support-bible.md exists and has 1472 lines
- project-bible/16-release-bible.md exists and has 1618 lines
- No old or nested project-bible files were found after cleanup validation

## Deprecated Project Bible Names

The following older or conflicting project-bible names should not be used as active canonical files:

- project-bible/02-legal-boundaries.md
- project-bible/03-playlist-philosophy.md
- project-bible/04-architecture-principles.md
- project-bible/05-reseller-credit-system.md
- project-bible/06-device-activation.md
- project-bible/07-payment-subscriptions.md
- project-bible/08-remote-config-versioning.md
- project-bible/09-security-privacy.md
- project-bible/10-ops-and-deployment.md
- project-bible/11-ui-product-guidelines.md
- project-bible/12-testing-strategy.md
- project-bible/project-bible/

Useful content from older documents should be migrated into the canonical project-bible tree before removal.

Do not recreate old or conflicting Bible filenames.

## Docs State

Known docs files currently present:

- docs/api-scope.md
- docs/architecture.md
- docs/database-model-outline.md
- docs/local-development.md
- docs/new-chat-start-message.md
- docs/playlist-transfer-bridge.md

The intended canonical docs tree is:

- docs/new-chat-start-message.md
- docs/architecture.md
- docs/development-workflow.md
- docs/local-setup.md
- docs/deployment.md
- docs/environment-variables.md
- docs/api-error-codes.md
- docs/app-team-handoff.md
- docs/admin-guide.md
- docs/reseller-guide.md
- docs/customer-guide.md
- docs/payment-provider-notes.md

Known canonical docs still missing:

- docs/development-workflow.md
- docs/local-setup.md
- docs/deployment.md
- docs/environment-variables.md
- docs/api-error-codes.md
- docs/app-team-handoff.md
- docs/admin-guide.md
- docs/reseller-guide.md
- docs/customer-guide.md
- docs/payment-provider-notes.md

## Existing Non-Canonical Docs

The following docs exist but are not part of the canonical docs tree:

- docs/api-scope.md
- docs/database-model-outline.md
- docs/local-development.md
- docs/playlist-transfer-bridge.md

These may contain useful content.

Do not delete them before reviewing whether their contents should be migrated.

After canonical docs are complete, decide whether these files should be:

- Migrated
- Renamed
- Archived
- Removed

## Implementation State

Do not assume that the full web app, API app, database schema, or shared package implementation exists.

Do not claim implementation is complete unless confirmed by actual project files.

Known completed or stabilized areas:

- Product scope
- Legal/product boundary
- Project Bible structure
- Core architecture decisions
- Security principles
- Payment principles
- Reseller principles
- Device identity principles
- Playlist local-first principles
- App integration principles
- Testing principles
- Support principles
- Release principles

Known pending implementation areas:

- apps/web structure
- apps/api structure
- packages/shared structure
- Prisma schema
- API modules
- Web pages
- Shared constants
- Shared schemas
- Test setup
- CI workflow
- Deployment setup
- Production environment setup

## Planned API Modules

The API should eventually include modules for:

- Health
- Auth
- Users
- Plans
- Subscriptions
- Devices
- Licenses
- Resellers
- Payments
- App versions
- Remote config
- Playlist push
- Audit logs

The API must not include modules for:

- Channels
- Streams
- Stream sources
- Channel packages
- Playlist marketplace
- Content catalog
- CDN stream delivery
- Transcoding jobs
- Broadcast schedules

## Planned Web Areas

The web app should eventually include:

- Public home page
- Pricing/software plans page
- Login page
- Register page when enabled
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Payment pages
- Support pages
- Legal pages
- App download page
- FAQ page

The web app must not include:

- Channel marketplace
- Stream marketplace
- Playlist marketplace
- Content catalog
- Channel package builder
- Stream source manager
- Provider recommendation page

Marketing and checkout copy must clearly state that the platform provides software/player access only and does not provide channels, streams, playlists, or content.

## Planned App Integration

The backend should support app integration for:

- Device activation
- Device status
- Device heartbeat
- License status
- App version
- Remote config
- Optional temporary playlist transfer consumption

App-facing responses must not include:

- Channel lists
- Stream URLs
- Playlist marketplace data
- Content catalogs
- Broadcast schedules

## Current Risk Areas

Current risks:

- New conversations may assume implementation exists when it does not.
- Old docs may conflict with canonical docs.
- Non-canonical docs may contain useful but unmigrated content.
- Missing CONTRIBUTING.md and LICENSE.md may make root setup incomplete.
- Canonical docs are not complete yet.
- App/API/shared implementation is not yet stabilized.
- Product boundary must be repeated consistently in web copy, API design, support docs, and release docs.

## Current Recommended Next Steps

Recommended next steps:

1. Update AI_HANDOFF.md with current handoff state.
2. Update PROJECT_STATE.md with current project state.
3. Update docs/new-chat-start-message.md with current new-chat instructions.
4. Add CONTRIBUTING.md.
5. Add LICENSE.md.
6. Complete canonical docs files.
7. Review existing non-canonical docs.
8. Migrate useful content from non-canonical docs into canonical docs.
9. Decide whether to archive or remove non-canonical docs.
10. Stabilize apps/web, apps/api, and packages/shared structure.
11. Add shared constants, roles, statuses, and schemas.
12. Add API foundation.
13. Add web foundation.
14. Add Prisma schema.
15. Add tests.
16. Add CI checks.
17. Move toward MVP implementation.

## Documentation Update Rules

Update this file when:

- Major project state changes
- Project Bible files change
- Canonical docs are added
- Root files are added
- App/API/shared structure is added
- Prisma schema is added
- CI is added
- Deployment setup changes
- MVP milestones are completed
- Product decisions change
- Security decisions change
- Payment decisions change
- Reseller decisions change
- Playlist transfer decisions change

Do not claim work is complete unless it is actually complete.

## Assistant Handoff Rule

New AI assistants should treat this file as the current state summary.

They should also read:

- AI_HANDOFF.md
- README.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- docs/new-chat-start-message.md
- project-bible files

Assistants must preserve all product boundary decisions.

Assistants must not introduce forbidden content-provider features.

Assistants must not assume missing implementation exists.

## Final State Rule

The project is currently in foundation and documentation stabilization phase.

The project-bible tree is intended to be complete and stable.

Root documentation is not fully complete yet.

Canonical docs are not fully complete yet.

Application implementation should proceed only after the foundation state is clear and documented.

TV Project Platform must remain a Licensed IPTV Player Platform.

It must not become an IPTV provider, content provider, stream provider, channel seller, playlist marketplace, CDN stream delivery system, broadcast backend, or backend playlist source of truth.
