# Roadmap

This file defines the milestone roadmap for TV Project Platform.

## Current Project Status

Current phase:

Foundation stabilization and controlled implementation preparation.

The project workspace is not empty.

Foundation exists:

- pnpm monorepo configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose services
- Project Bible canonical tree
- AI handoff file
- Current project state file
- Development workflow document
- Department system document
- Department response rules
- Token economy rules
- Context Builder Engine rules
- Internal system migration plan
- Local setup guide
- Environment variables guide
- CONTRIBUTING.md
- LICENSE.md

The project is not MVP-ready yet.

## Product Direction

TV Project Platform is a Licensed IPTV Player Platform.

The backend may manage accounts, auth, roles, subscriptions, licenses, devices, payments, resellers, app versions, remote config, audit logs, and optional temporary encrypted web-to-device profile transfer.

The backend must not become a media provider, broadcast backend, CDN, relay, transcoder, catalog seller, public playlist marketplace, or default permanent profile authority.

## Management Direction

The project is managed by a Director-led milestone system.

Required workflow documents:

- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md

Operating rules:

- Owner approves major direction changes.
- Director controls execution order.
- Milestones define scope.
- AI Gate blocks unnecessary AI calls.
- Context Builder Engine builds the smallest useful context.
- Departments are single-task expert calls.
- Departments do not acknowledge instructions.
- Departments do not add filler text.
- Departments do not talk directly to each other.
- Accepted compact output becomes reusable memory.
- Full old conversations and full long documents are not sent as default AI context.
- Similar accepted answers are reused when reliable.
- Three failed attempts on the same problem stop the loop.
- Checkpoints protect known good states.
- AI output does not deploy itself.
- Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.
- AI token usage must be budgeted and logged.

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Approved system engines:

- Milestone Controller
- AI Gate
- Context Builder Engine
- Similar Task Cache
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

## Roadmap Status Values

Allowed statuses:

- NOT_STARTED
- IN_PROGRESS
- PARTIAL
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

## Milestone 0 - Foundation Constitution

Goal:

Lock project identity, operating rules, project memory, token economy, and safety boundaries.

Status:

PASSED

Completed:

- README.md exists and is current.
- PROJECT_STATE.md exists and is current.
- AI_HANDOFF.md exists and is current.
- ROADMAP.md exists and is current.
- docs/development-workflow.md exists.
- docs/department-system.md exists.
- docs/department-response-rules.md exists.
- docs/token-economy.md exists.
- docs/context-builder-engine.md exists.
- docs/internal-system-migration.md exists.
- docs/local-setup.md exists.
- docs/environment-variables.md exists.
- CONTRIBUTING.md exists.
- LICENSE.md exists.
- Product boundary is defined.
- Director/milestone/department model is approved.
- Three-fail loop breaker is approved.
- Token budget guard is approved.
- Context Builder Engine is approved.
- No filler department response rule is approved.
- Checkpoint and rollback rules are approved.

Completion rules:

- All handoff files describe the same current workflow.
- No foundation file claims the project has no implementation.
- Product boundary remains intact.
- Token economy rules are active.

## Milestone 1 - Local Install and Lockfile

Goal:

Run first dependency installation and save the generated lockfile.

Status:

NOT_STARTED

Scope:

- Run dependency install.
- Generate pnpm-lock.yaml.
- Save pnpm-lock.yaml.
- Validate root package scripts.
- Validate workspace package discovery.
- Record any install issue as an error package.

Completion rules:

- pnpm-lock.yaml exists.
- Dependency install completes or error package is created.
- Root scripts are still aligned with package scripts.

## Milestone 2 - Internal Validation Workflow

Goal:

Validate build/typecheck workflow after lockfile exists.

Status:

NOT_STARTED

Scope:

- Run typecheck where available.
- Run build where available.
- Confirm web, API, and shared package commands.
- Record validation results.
- Avoid AI calls unless debugging is needed.

Completion rules:

- Validation output is recorded.
- Failures are packaged into compact error packages.
- No repeated blind retries.

## Milestone 3 - Shared Package Foundation

Goal:

Finalize shared TypeScript constants, types, and validation strategy.

Status:

PARTIAL

Existing:

- packages/shared/package.json
- packages/shared/src/index.ts
- packages/shared/src/constants.ts
- packages/shared/src/types.ts
- packages/shared/src/validators.ts

Pending:

- final role constants
- API response codes
- device types
- subscription statuses
- payment statuses
- reseller credit transaction types
- shared response types
- validation schema strategy

Completion rules:

- Shared exports are stable.
- Web and API import shared values cleanly.
- No duplicated enums across layers without reason.

## Milestone 4 - API Foundation

Goal:

Create a stable NestJS API base.

Status:

PARTIAL

Existing:

- apps/api package skeleton
- apps/api/src/main.ts
- apps/api/src/app.module.ts
- apps/api/src/health.controller.ts

Pending:

- environment validation
- global response format
- global error handling
- validation pipe
- Prisma module
- Redis configuration
- common guards
- common decorators
- common filters
- common interceptors

Completion rules:

- API starts successfully.
- Health endpoint works.
- Standard error/response format exists.
- Environment requirements are documented.

## Milestone 5 - Database Foundation

Goal:

Create the first MVP-ready Prisma schema.

Status:

PARTIAL

Existing:

- apps/api/prisma/schema.prisma early schema

Required MVP models:

- User
- Session
- Plan
- Subscription
- Device
- LicenseCheck
- ResellerProfile
- ResellerCreditTransaction
- Payment
- PaymentEvent
- AppVersion
- RemoteConfig
- ProfileTransferRequest
- AuditLog

Completion rules:

- Schema contains all MVP models.
- Relations and indexes support expected access patterns.
- Migration path is documented.

## Milestone 6 - Authentication and Authorization

Goal:

Build secure user identity and role access.

Status:

NOT_STARTED

Scope:

- login
- logout
- refresh token
- password hashing
- session records
- role guards
- current user decorator
- rate limiting for sensitive endpoints
- audit logs for sensitive actions

Completion rules:

- Admin, reseller, and customer roles are enforced server-side.
- Frontend route hiding is not treated as security.
- Password hash never returns from API.

## Milestone 7 - Subscription, License, and Device Foundation

Goal:

Build core subscription, license validation, and device activation foundations.

Status:

NOT_STARTED

Scope:

- plan management
- subscription creation and extension
- expiration logic
- device activation endpoint
- device status endpoint
- license status endpoint
- license check records
- blocked device handling

Completion rules:

- App can ask backend whether a device is allowed.
- Expired subscription blocks access.
- Blocked device blocks access.
- app_generated_device_id is primary.

## Milestone 8 - Reseller Credit System

Goal:

Build secure reseller credit accounting.

Status:

NOT_STARTED

Scope:

- reseller profile
- credit add
- credit use
- refund
- manual adjustment
- reseller customer creation
- reseller subscription assignment
- credit transaction history
- admin reseller overview
- audit logs

Completion rules:

- Every credit operation creates a transaction.
- Frontend credit values are not trusted.
- Negative balances are prevented.
- Credit use and subscription change happen safely together.

## Milestone 9 - Payment Records

Goal:

Create payment records and manual payment approval flow.

Status:

NOT_STARTED

Scope:

- manual payment records
- payment status tracking
- payment approval
- payment history
- admin payment overview
- webhook-ready structure for future providers

Completion rules:

- Card data is not stored.
- Payment result is backend-authoritative.
- Subscription extension happens only after approved payment state.

## Milestone 10 - App Version and Remote Config

Goal:

Allow backend-controlled app rules.

Status:

NOT_STARTED

Scope:

- app version records
- minimum version code
- force update flag
- update URL
- release notes
- remote config records
- maintenance mode
- feature flags
- announcement message

Completion rules:

- App can fetch version rules.
- App can fetch remote configuration.
- Admin can manage safe config values.

## Milestone 11 - Temporary Profile Transfer Bridge

Goal:

Allow user-owned encrypted temporary profile transfer without changing the product boundary.

Status:

NOT_STARTED

Scope:

- create temporary transfer request
- encrypted payload storage
- device scoping
- app consume endpoint
- expiration
- consumed/revoked state
- audit log

Completion rules:

- Transfer expires.
- Transfer is scoped to user and device.
- Transfer does not become permanent default storage.

## Milestone 12 - Web Foundation

Goal:

Create the web application structure.

Status:

PARTIAL

Existing:

- apps/web package skeleton
- root layout
- global CSS
- public landing shell

Pending:

- auth pages
- dashboard layouts
- shared UI components
- API client
- route constants
- protected route middleware

Completion rules:

- Web app starts.
- Landing shell exists.
- Auth and dashboard shells exist.

## Milestone 13 - Panels

Goal:

Build customer, reseller, and admin dashboard foundations.

Status:

NOT_STARTED

Scope:

- customer overview, subscription, devices, payments
- reseller overview, customers, credit, sales
- admin users, resellers, plans, subscriptions, payments, devices, app versions, remote config, audit logs

Completion rules:

- Each role sees only allowed data.
- Critical actions are server-authorized and audit logged.

## Milestone 14 - Public Website and Legal Pages

Goal:

Build public-facing pages with clear product positioning.

Status:

NOT_STARTED

Scope:

- home
- pricing
- download
- device selector
- FAQ
- privacy policy
- terms of service
- refund policy

Completion rules:

- Messaging states software/player access only.
- No page implies bundled media access.

## Milestone 15 - Testing and Security Hardening

Goal:

Create validation coverage and staging-level safety.

Status:

NOT_STARTED

Scope:

- auth tests
- role permission tests
- subscription tests
- license tests
- device tests
- reseller credit tests
- payment tests
- temporary transfer expiration tests
- sensitive data review
- rate limiting
- security headers
- input validation

Completion rules:

- Critical flows are tested.
- QA Security signs off milestone completion.

## Milestone 16 - Deployment Preparation

Goal:

Prepare staging and production deployment.

Status:

NOT_STARTED

Scope:

- deployment notes
- environment variables
- database migration flow
- backup strategy
- monitoring plan
- rollback path

Completion rules:

- Staging plan exists.
- Production plan exists.
- Backup and rollback plans exist.

## Milestone 17 - MVP Release

Goal:

Release the first usable MVP.

Status:

NOT_STARTED

MVP must include:

- auth
- roles
- customer panel
- reseller panel
- admin panel
- plans
- subscriptions
- device activation
- license status API
- app version API
- remote config API
- reseller credit system
- manual payment records
- audit logs

MVP must not include:

- media delivery
- catalog-selling features
- relay/transcoding features
- public playlist marketplace
- default permanent backend profile authority

## Post-MVP Ideas

These require separate approval:

- real payment provider integration
- email notifications
- SMS notifications
- ticket system
- referral system
- encrypted opt-in cloud profile sync
- advanced app analytics
- admin 2FA
- reseller commission models
- invoice/PDF receipts
- multi-currency pricing
- advanced device limits

## Roadmap Update Rule

Update this roadmap whenever a milestone status changes.

Do not remove historical decisions without recording the reason in project-bible/13-decision-log.md.
