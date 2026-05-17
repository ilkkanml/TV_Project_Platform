# Roadmap

This file defines the milestone roadmap for TV Project Platform.

## Current Project Status

Current phase:

Foundation stabilization and controlled implementation preparation.

The repository is not empty.

Confirmed foundation exists:

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
- CONTRIBUTING.md

The project is not MVP-ready yet.

## Product Direction

TV Project Platform is a Licensed IPTV Player Platform.

The backend must focus only on:

- User accounts
- Authentication
- Role-based access control
- Subscriptions
- Player licensing
- Device activation
- Payment records
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary encrypted web-to-device profile transfer

The backend must not become a media provider, broadcast backend, CDN, relay, transcoder, catalog seller, public playlist marketplace, or default permanent profile authority.

## Management Direction

The project is managed by a Director-led milestone system.

Required workflow documents:

- docs/development-workflow.md
- docs/department-system.md

Operating rules:

- Owner approves major direction changes.
- Director controls execution order.
- Milestones define scope.
- Departments are single-task expert calls.
- Departments do not talk directly to each other.
- Three failed attempts on the same problem stop the loop.
- Checkpoints protect known good states.
- AI output does not deploy itself.
- Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.
- AI token usage should be budgeted and logged.

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Approved system engines:

- Milestone Controller
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
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

## Milestone 0 - Foundation Constitution

Goal:

Lock project identity, operating rules, repository memory, and safety boundaries.

Status:

IN_PROGRESS

Completed:

- README.md exists.
- PROJECT_STATE.md updated to current state.
- AI_HANDOFF.md updated to current workflow.
- docs/development-workflow.md added.
- docs/department-system.md added.
- CONTRIBUTING.md added.
- Product boundary defined.
- Director/milestone/department model approved.
- Three-fail loop breaker approved.
- Token budget guard approved.
- Checkpoint and rollback rules approved.

Pending:

- LICENSE.md
- .github/workflows CI
- project-bible/00-project-rules.md operating model update
- docs/new-chat-start-message.md workflow update
- verify older docs for conflicts

Completion rules:

- All handoff files describe the same current workflow.
- No root foundation file claims the repository has no implementation.
- LICENSE.md exists.
- CI skeleton exists.
- Product boundary remains intact.

## Milestone 1 - Repository and CI Stabilization

Goal:

Make the repository safe to continue from any browser-based workflow.

Status:

NOT_STARTED

Scope:

- Add LICENSE.md.
- Add GitHub Actions CI skeleton.
- Validate package scripts.
- Validate pnpm workspace setup.
- Confirm web, api, and shared typecheck/build commands.
- Record known local development commands.

Completion rules:

- CI runs install, typecheck, and build where possible.
- Root scripts match package scripts.
- Missing setup steps are documented.

## Milestone 2 - Shared Package Foundation

Goal:

Create the shared TypeScript foundation used by web and API.

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
- No duplicated enums across layers without a reason.

## Milestone 3 - API Foundation

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

## Milestone 4 - Database Foundation

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
- PlaylistPushRequest
- AuditLog

Rules:

- Passwords are hashed.
- Payment card data is not stored.
- Reseller credit history is transaction-based.
- Device identity uses app_generated_device_id.
- Temporary profile transfer expires and can be consumed or revoked.
- Backend does not become default permanent profile authority.

Completion rules:

- Schema contains all MVP models.
- Relations and indexes support expected access patterns.
- Migration path is documented.

## Milestone 5 - Authentication and Authorization

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

## Milestone 6 - Subscription and License Engine

Goal:

Build core subscription and app license validation.

Status:

NOT_STARTED

Scope:

- plan management
- subscription creation
- subscription extension
- expiration logic
- license status endpoint
- device status endpoint
- license check records
- blocked device handling

Completion rules:

- App can ask backend whether a device is allowed.
- Expired subscription blocks access.
- Blocked device blocks access.
- License checks are logged safely.

## Milestone 7 - Device Activation System

Goal:

Support app-generated device identity and device ownership.

Status:

NOT_STARTED

Scope:

- device activation endpoint
- device status endpoint
- device heartbeat
- device naming
- platform and app version tracking
- ownership validation
- admin, reseller, and customer visibility rules

Completion rules:

- app_generated_device_id is primary.
- MAC address is not primary.
- Device ownership is enforced server-side.

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

Allow user-owned web-to-device encrypted temporary profile transfer without changing the product boundary.

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

## Milestone 13 - Customer Panel

Goal:

Build customer dashboard.

Status:

NOT_STARTED

Scope:

- account overview
- subscription status
- devices
- payment history
- optional transfer screen
- settings

Completion rules:

- Customer sees only own data.
- Customer actions are server-authorized.

## Milestone 14 - Reseller Panel

Goal:

Build reseller dashboard.

Status:

NOT_STARTED

Scope:

- overview
- own customers
- customer creation
- subscription assignment
- credit balance
- credit transactions
- sales history
- settings

Completion rules:

- Reseller sees only own customers.
- Credit actions are backend-authoritative.

## Milestone 15 - Admin Panel

Goal:

Build admin dashboard.

Status:

NOT_STARTED

Scope:

- users
- customers
- resellers
- plans
- subscriptions
- payments
- devices
- app versions
- remote config
- audit logs
- system settings

Completion rules:

- Admin actions are authorized.
- Critical actions are audit logged.

## Milestone 16 - Public Website and Legal Pages

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

## Milestone 17 - Testing and QA

Goal:

Create test and validation coverage.

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
- dashboard permission checks

Completion rules:

- Critical flows are tested.
- QA Security signs off milestone completion.

## Milestone 18 - Security Hardening

Goal:

Prepare for staging-level safety.

Status:

NOT_STARTED

Scope:

- rate limiting
- security headers
- CORS rules
- JWT secret handling
- refresh token rotation
- audit log coverage
- webhook verification pattern
- input validation
- sensitive data review

Completion rules:

- Sensitive data is not exposed.
- Critical endpoints have guards and validation.

## Milestone 19 - Deployment Preparation

Goal:

Prepare staging and production deployment.

Status:

NOT_STARTED

Scope:

- Dockerfiles
- environment variables
- database migration flow
- backup strategy
- GitHub Actions CI
- deployment notes
- monitoring plan

Completion rules:

- Staging plan exists.
- Production plan exists.
- Backup and migration plans exist.

## Milestone 20 - MVP Release

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
