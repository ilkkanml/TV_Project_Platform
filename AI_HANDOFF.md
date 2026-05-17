# AI Handoff

This file is the primary handoff document for any new AI assistant or new ChatGPT conversation working on TV Project Platform.

Read this file first.

Then read:

- PROJECT_STATE.md
- README.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- docs/new-chat-start-message.md
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

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

The platform is a software/player licensing, subscription, reseller, device activation, payment, app version, remote config, and admin/customer/reseller management system.

The platform is not an IPTV provider.

The platform is not a content provider.

The platform is not a stream provider.

The platform is not a channel seller.

The platform is not a playlist marketplace.

The platform is not a broadcast backend.

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

## Playlist Rule

Playlist handling is local-first.

Default behavior:

- Playlist information is entered inside the app.
- Playlist profiles are stored on the user's device.
- Credentials are stored using encrypted local storage where supported.
- The app may support multiple local playlist profiles.
- Users may switch between local profiles.

Backend behavior:

- Backend is not the playlist source of truth.
- Backend must not permanently store playlist credentials by default.
- Backend must not provide playlists.
- Backend must not provide stream URLs.
- Backend must not provide channel lists.
- Backend may optionally support a temporary encrypted web-to-device playlist profile transfer bridge.
- Temporary transfer payloads must expire.
- Temporary transfer payloads should be deleted or marked consumed after pickup.
- Temporary transfer must be scoped to the correct user and device.
- Temporary transfer must not turn into permanent cloud playlist storage.

Encrypted cloud playlist sync is not enabled by default.

Encrypted cloud playlist sync requires explicit product approval.

## Device Identity Rule

MAC address is not the primary identity.

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

The backend should use app-generated identity as the primary activation and license identifier.

## User Roles

The platform has three core roles:

- Admin
- Reseller
- Customer

Admin:

- Can manage users
- Can manage resellers
- Can manage plans
- Can manage subscriptions
- Can manage payments
- Can manage devices
- Can manage app versions
- Can manage remote config
- Can manage reseller credit
- Can view audit logs

Reseller:

- Can manage own customers
- Can create own customer accounts
- Can assign or extend subscriptions for own customers using reseller credit
- Can view own credit balance
- Can view own credit transactions
- Can view own sales/customer history
- Cannot access another reseller's customers
- Cannot manage global platform settings
- Cannot add credit to themselves
- Cannot directly modify credit balance

Customer:

- Can manage own account
- Can view own subscription
- Can view own devices
- Can view own payment history
- Can use the licensed player app
- Can optionally use temporary playlist profile transfer for own devices when enabled
- Cannot access other customers' data

## Reseller Credit Rule

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

Credit deduction and subscription creation or extension must happen in one safe database transaction.

Negative balances must be prevented.

Credit transactions must not be silently deleted.

## Payment Rule

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

## Security Rules

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

## Tech Stack

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

## Current Known Project State

The project is in foundation and documentation stabilization phase.

The product boundary has been defined.

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

The latest known validation confirmed:

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

## Current Known Root Files

The latest known root-level files include:

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

The following root files were still missing at the latest known audit:

- CONTRIBUTING.md
- LICENSE.md

These should be added before moving too far into implementation.

## Current Known Docs Files

The latest known docs files include:

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

The following canonical docs were still missing at the latest known audit:

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

Existing non-canonical docs should not be deleted immediately.

First review and migrate useful content into canonical docs.

Then decide whether to remove, rename, or archive old docs.

## Existing Non-Canonical Docs

The following docs existed at the latest known audit but are not part of the canonical docs tree:

- docs/api-scope.md
- docs/database-model-outline.md
- docs/local-development.md
- docs/playlist-transfer-bridge.md

These may contain useful content.

Do not delete them before reviewing whether their contents should be migrated.

## Implementation Status

Do not assume that the full web app, API app, database schema, or shared package implementation exists.

Do not claim implementation is complete unless confirmed by actual repository files.

The project is still in setup and documentation foundation phase.

Known completed/stabilized areas:

- Product scope
- Legal/product boundary
- Project Bible structure
- Core architecture decisions
- Security principles
- Payment principles
- Reseller principles
- App integration principles
- Testing/support/release principles

Known pending areas:

- CONTRIBUTING.md
- LICENSE.md
- Canonical docs completion
- apps/web implementation
- apps/api implementation
- packages/shared implementation
- Prisma schema implementation
- Docker-based local development validation
- CI workflow implementation
- Deployment configuration

## Recommended Next Steps

The safest next steps are:

1. Update AI_HANDOFF.md with current project state.
2. Update PROJECT_STATE.md with current project state.
3. Update docs/new-chat-start-message.md with current handoff instructions.
4. Add CONTRIBUTING.md.
5. Add LICENSE.md.
6. Complete canonical docs files.
7. Review existing non-canonical docs and migrate useful content.
8. Stabilize apps/web, apps/api, and packages/shared structure.
9. Add shared constants, types, and schemas.
10. Add API foundation.
11. Add web foundation.
12. Add database schema.
13. Add tests.
14. Add CI checks.
15. Move toward MVP implementation.

## Assistant Behavior Rules

When working on this project:

- Preserve the licensed player platform boundary.
- Do not invent completed implementation.
- Do not assume a file exists unless it is visible in the current project context.
- Do not create old conflicting project-bible filenames.
- Do not create nested duplicate folders.
- Do not rename canonical files without approval.
- Do not introduce stream-provider features.
- Do not introduce channel-provider features.
- Do not introduce playlist-marketplace features.
- Do not introduce content-provider features.
- Do not introduce broadcast-backend features.
- Do not make backend playlist authority.
- Prefer clear, complete, copy-paste-ready file content.
- For important files, provide complete replacement content.
- Keep project decisions consistent across files.
- Update documentation when project state changes.

## Coding Rules

When generating code:

- Use TypeScript.
- Prefer strict typing.
- Avoid placeholder logic.
- Avoid empty classes.
- Avoid empty functions.
- Avoid commented-out unfinished functionality.
- Provide complete runnable examples when creating files.
- Keep backend authorization authoritative.
- Keep role and ownership checks server-side.
- Never trust frontend price, duration, role, credit, or ownership values.
- Validate input.
- Return safe error responses.
- Avoid logging sensitive data.
- Keep shared constants in packages/shared where appropriate.

## API Rules

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

## Web Rules

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

## App Integration Rules

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

## Support Rules

Support must help users with the software platform only.

Support may help with:

- Accounts
- Subscriptions
- Devices
- License status
- App updates
- Payments
- Reseller credit
- Dashboard usage
- Optional temporary playlist transfer

Support must not provide:

- Channels
- Streams
- Playlists
- Provider credentials
- Content recommendations
- Channel packages
- Illegal content access guidance

## Release Rules

No release should weaken the licensed player platform boundary.

Before release, verify:

- Product boundary remains intact
- Security rules remain intact
- Payment rules remain intact
- Reseller credit rules remain intact
- Device/license rules remain intact
- Documentation is updated
- Sensitive data is protected
- No forbidden content-provider features were introduced

## Final Instruction

This project is a Licensed IPTV Player Platform.

Always protect that boundary.

Build account, subscription, license, device, payment, reseller, app version, remote config, audit log, and optional temporary encrypted playlist transfer functionality.

Do not build IPTV provider functionality.

Do not build content provider functionality.

Do not build stream provider functionality.

Do not build channel seller functionality.

Do not build playlist marketplace functionality.

Do not build broadcast backend functionality.

Do not make the backend playlist source of truth.
