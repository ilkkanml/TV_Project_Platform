# Changelog

All notable changes to TV Project Platform will be documented in this file.

This project follows a clear project-memory-first workflow.

## Current Status

The project is currently in the foundation and documentation preparation phase.

The real application implementation has not started yet.

## 0.0.1 - Foundation Preparation

Status:

- In progress

### Added

- Created the initial repository structure.
- Created monorepo folder layout.
- Added apps/web directory.
- Added apps/api directory.
- Added packages/shared directory.
- Added project-bible directory.
- Added docs directory.
- Added infra directory.
- Added .github directory.
- Added root package.json.
- Added pnpm-workspace.yaml.
- Added tsconfig.base.json.
- Added docker-compose.yml.
- Added .env.example.
- Added .gitignore.
- Added README.md.
- Added PROJECT_STATE.md.
- Added AI_HANDOFF.md.
- Added ROADMAP.md.
- Added CHANGELOG.md.
- Added SECURITY.md.
- Added LEGAL_SCOPE.md.

### Fixed

- Fixed root package.json formatting.
- Fixed pnpm-workspace.yaml formatting.
- Fixed tsconfig.base.json formatting.
- Fixed docker-compose.yml formatting.
- Fixed .env.example formatting.
- Fixed README.md formatting.
- Converted critical root config files into real multiline files.
- Converted README.md into real multiline Markdown.

### Verified

The following files were manually fixed and verified through raw GitHub line-count checks:

- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- .env.example
- README.md

Known verified line counts:

- package.json: 36 lines
- docker-compose.yml: 54 lines
- .env.example: 25 lines
- tsconfig.base.json: 22 lines
- pnpm-workspace.yaml: 2 lines
- README.md: 395 lines

### Product Decisions

The following product decisions were confirmed:

- The project is a Licensed IPTV Player Platform.
- The project is not an IPTV broadcast provider.
- The project is not a media provider.
- The project is not a content platform.
- The project is not a playlist provider.
- The project is not a channel seller.
- The project is not a stream hosting service.

### Backend Scope Decisions

The backend is allowed to manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscription status
- License validation
- Device activation
- Payment records
- Reseller accounts
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary web-to-device playlist profile transfer

### Backend Exclusion Decisions

The backend must not provide or manage:

- TV channels
- Live streams
- VOD streams
- Stream relay
- Stream hosting
- Stream transcoding
- CDN delivery
- Channel packages
- Playlist provider services
- Content ownership
- Broadcast infrastructure
- Permanent playlist credential authority

### Playlist Decisions

The following playlist decisions were confirmed:

- Backend is not playlist source of truth.
- Playlist information is entered inside the app by default.
- Playlist credentials are stored on the device.
- Playlist credentials must be stored using encrypted local storage.
- Backend should not permanently store playlist credentials by default.
- Web-to-device playlist profile transfer is optional.
- Optional playlist profile transfer must be temporary.
- Optional playlist profile transfer must be encrypted.
- Temporary playlist profile transfer payloads must expire.
- Encrypted cloud sync may be considered later only with explicit user consent.

### App Integration Decisions

The following app integration decisions were confirmed:

- The app should generate an app device ID.
- The app should register or activate the device.
- The app should check license status.
- The app should check subscription status.
- The app should check app version.
- The app should fetch remote config.
- The app should manage local playlist profiles.
- The app should store playlist credentials securely on the device.
- The app should support multiple playlist profiles.
- The app should switch between profiles.
- The app should open the player only when license rules allow it.

### Device Identity Decisions

The following device identity decisions were confirmed:

- MAC address must not be used as the primary device identifier.
- app_generated_device_id should be the primary device identifier.
- Android ID may be used only as a secondary signal.
- Device model may be used as a secondary signal.
- Platform may be used as a secondary signal.
- App version code may be used as a secondary signal.
- App version name may be used as a secondary signal.
- Install metadata may be used as a secondary signal.

### Role Decisions

The following roles were confirmed:

- Admin
- Reseller
- Customer

### Reseller Decisions

The following reseller decisions were confirmed:

- Reseller credit system must be transaction-based.
- A simple balance field is not enough.
- Every credit operation must create a transaction record.
- Frontend credit values must not be trusted.
- Credit usage must be validated inside database transactions.
- Negative reseller balances must be prevented.
- Resellers must only access their own customers.

### Payment Decisions

The following payment decisions were confirmed:

- Card data must not be stored in this system.
- Manual payment records may be supported during MVP.
- Real payment integration should use a secure payment provider.
- Payment webhook signatures must be verified.
- Subscription extension should happen only after verified payment confirmation.

### Security Decisions

The following security decisions were confirmed:

- Passwords must never be stored in plain text.
- Payment card data must never be stored directly.
- Frontend values must not be trusted for pricing, credits, roles, or permissions.
- Role-based access control is required.
- Auth endpoints must be rate limited.
- Critical admin and reseller actions must be audit logged.
- Device license checks must be backend authoritative.
- Temporary playlist transfer payloads must expire.

### Technical Direction

The planned technical stack was confirmed:

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

### Known Workflow Issue

Automated GitHub connector updates previously caused files to collapse into very long single-line content.

Because of this, critical multiline files are currently edited manually through GitHub web editor or Codespaces.

### Next Documentation Tasks

The next documentation files to complete are:

- SECURITY.md
- LEGAL_SCOPE.md
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
- Remaining project-bible files
- docs files

## Upcoming 0.0.2 - Documentation Foundation Completion

Planned:

- Complete SECURITY.md.
- Complete LEGAL_SCOPE.md.
- Complete all project-bible files.
- Complete docs files.
- Verify critical documentation files through raw GitHub line-count checks.

## Upcoming 0.1.0 - Shared Package Foundation

Planned:

- Implement packages/shared.
- Add shared roles.
- Add shared API codes.
- Add shared device types.
- Add shared subscription statuses.
- Add shared payment statuses.
- Add shared validation schemas.
- Add shared TypeScript types.

## Upcoming 0.2.0 - API Foundation

Planned:

- Implement NestJS foundation.
- Add Prisma setup.
- Add PostgreSQL connection.
- Add Redis connection.
- Add health endpoint.
- Add standard response format.
- Add standard error format.
- Add global validation.
- Add global exception handling.

## Upcoming 0.3.0 - Auth and Role Foundation

Planned:

- Add authentication.
- Add register flow.
- Add login flow.
- Add refresh token flow.
- Add logout flow.
- Add password hashing.
- Add JWT access token.
- Add role-based access control.
- Add admin, reseller, and customer guards.

## Upcoming 0.4.0 - License and Device Foundation

Planned:

- Add subscription engine.
- Add license status endpoint.
- Add device activation endpoint.
- Add app_generated_device_id support.
- Add device status endpoint.
- Add app version endpoint.
- Add remote config endpoint.

## Upcoming 0.5.0 - Reseller and Payment Foundation

Planned:

- Add reseller accounts.
- Add reseller credit transactions.
- Add reseller customer management.
- Add manual payment records.
- Add checkout foundation.
- Add payment webhook-ready structure.

## Changelog Rules

Every meaningful project change should update this file.

Do not remove historical entries without recording the reason.

Do not hide major architectural decisions.

Do not add content-provider features to the roadmap or changelog.

If a decision changes, record it clearly in project-bible/13-decision-log.md.
