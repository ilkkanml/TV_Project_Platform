# Roadmap

Milestone roadmap for TV Project Platform.

## Current Project Status

Current phase:

Platform scope synchronized and local validation preparation.

The project workspace is not empty.

Foundation exists:

- pnpm monorepo configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma foundation schema
- MySQL / MariaDB-compatible local database direction
- API health endpoint
- ready endpoint foundation
- device install endpoint foundation
- app version endpoint foundation
- remote config endpoint foundation
- license check endpoint foundation
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
- AI operations bible
- Internal system migration plan
- Local setup guide
- Environment variables guide
- LICENSE.md

README.md exists as a lightweight repository overview only. It is not the main authority file.

Removed from active workflow:

- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

The project is not MVP-ready yet.

## Current Product Scope

TV Project Platform owns:

- public website foundation
- admin/control panel
- reseller panel
- customer panel
- backend API
- platform database
- user/customer/reseller records
- device records
- license/access records
- app version metadata
- remote configuration
- payment records
- reseller credit records
- audit logs

TV Project Platform does not own:

- Android TV / Fire TV player development
- playback implementation
- player UI
- player distribution policy
- TV market publishing
- Downloader-code distribution decisions
- playlist/provider account storage by default
- stream/channel/content catalog
- media distribution

The Android TV / Fire TV player application is developed separately.

This platform may provide approved app-support information only.

## Management Direction

The project is managed by a Director-led milestone system.

Required workflow documents:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- project-bible/00-project-rules.md
- project-bible/13-decision-log.md
- project-bible/17-ai-operations-bible.md

Operating rules:

- Owner approves major direction changes.
- Director controls execution order.
- Milestones define scope.
- GitHub Issues may be used for department tasks with department labels.
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
- AI token usage should be budgeted and logged.

Active department labels:

- department:director
- department:product
- department:engineering
- department:backend
- department:database
- department:web
- department:security
- department:qa
- department:docs

Optional integration label:

- integration:app

## Roadmap Status Values

Allowed statuses:

- NOT_STARTED
- IN_PROGRESS
- PARTIAL
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

## Milestone Summary

| Milestone | Name | Status |
|---|---|---|
| M0 | Project Boundary & Constitution | PASSED |
| M1 | Web Platform Scope Cleanup | PASSED |
| M2 | Database + Bible Foundation Alignment | PARTIAL |
| M3 | Local Install + DB Validation | NOT_STARTED |
| M4 | Core Backend API Foundation | NOT_STARTED |
| M5 | Admin Control Panel Foundation | NOT_STARTED |
| M6 | App Version + Remote Config Management | NOT_STARTED |
| M7 | User / Customer / Reseller Auth | NOT_STARTED |
| M8 | Subscription / License / Payment Records | NOT_STARTED |
| M9 | Reseller Panel | NOT_STARTED |
| M10 | Customer Panel | NOT_STARTED |
| M11 | Public Website + Legal Pages | NOT_STARTED |
| M12 | QA / Security / Release Hardening | NOT_STARTED |
| M13 | Production Deployment Preparation | NOT_STARTED |
| M14 | Web Platform MVP Release | NOT_STARTED |

## Milestone 0 - Project Boundary & Constitution

Goal:

Lock project identity, operating rules, project memory, token economy, and safety boundaries.

Status:

PASSED

Completed:

- PROJECT_STATE.md exists.
- AI_HANDOFF.md exists.
- ROADMAP.md exists.
- docs/development-workflow.md exists.
- docs/department-system.md exists.
- docs/department-response-rules.md exists.
- docs/token-economy.md exists.
- docs/context-builder-engine.md exists.
- docs/internal-system-migration.md exists.
- docs/local-setup.md exists.
- docs/environment-variables.md exists.
- project-bible/00-project-rules.md exists.
- project-bible/17-ai-operations-bible.md exists.
- LICENSE.md exists.
- Product boundary is defined.
- Director/milestone/department model is approved.
- Three-fail loop breaker is approved.
- Token budget guard is approved.
- Context Builder Engine is approved.
- No-filler department response rule is approved.
- Checkpoint and rollback rules are approved.

## Milestone 1 - Web Platform Scope Cleanup

Goal:

Align the repository with the approved web/API platform scope and remove old player-app or distribution drift.

Status:

PASSED

Completed:

- Platform defined as web/API support platform, not the player app.
- Android TV / Fire TV player work separated from this repo.
- App distribution policy separated from this repo.
- Downloader-code / direct APK decisions excluded from platform authority.
- Provider/playlist/stream/catalog/playback boundaries reinforced.
- README.md restored as lightweight repository overview only.
- CONTRIBUTING.md removed from active workflow.
- CHANGELOG.md removed from active workflow.
- docs/new-chat-start-message.md removed from active workflow.
- external CI workflow removed from active workflow.
- PROJECT_STATE.md synchronized with scope.
- AI_HANDOFF.md synchronized with scope.
- Project Bible files synchronized with scope.

Completion rules:

- Active authority docs describe this repo as web/API platform.
- Player app implementation and distribution decisions are not platform responsibilities.
- Removed workflow files are not referenced as active dependencies.

## Milestone 2 - Database + Bible Foundation Alignment

Goal:

Align database, documentation, and Bible authority with the current platform architecture.

Status:

PARTIAL

Completed:

- project-bible/00-project-rules.md compacted and synchronized.
- project-bible/03-feature-list.md synchronized.
- project-bible/06-security-bible.md synchronized.
- project-bible/09-ui-ux-bible.md synchronized.
- project-bible/15-support-bible.md synchronized.
- project-bible/16-release-bible.md synchronized.
- AI_HANDOFF.md synchronized.
- PROJECT_STATE.md synchronized.
- PostgreSQL references removed from active authority docs.
- MySQL / MariaDB-compatible local database direction recorded.
- DeviceInstallRecord foundation is present in schema.
- EA0 database validation script was corrected for MySQL.

Remaining verification:

- ROADMAP.md must be kept current after milestone changes.
- project-bible/13-decision-log.md must record final scope decisions.
- Local dependency install has not been verified.
- Prisma generate has not been verified.
- Migration has not been verified.
- EA0 seed has not been verified.
- EA0 database validation has not been verified.

Completion rules:

- Authority docs contain no PostgreSQL / player-distribution / Downloader drift.
- Decision log matches current platform scope.
- Database validation command passes locally.

Primary validation command:

```txt
pnpm --filter @tv-platform/api ea0:db:prepare
```

## Milestone 3 - Local Install + DB Validation

Goal:

Prove the platform foundation works locally before building panels.

Status:

NOT_STARTED

Scope:

- Run dependency install.
- Generate pnpm-lock.yaml.
- Validate root package scripts.
- Validate workspace package discovery.
- Run Prisma generate.
- Run migration.
- Run EA0 seed.
- Run EA0 database validation.
- Run API typecheck/build where available.
- Record any install or validation failure as a compact error package.

Completion rules:

- pnpm-lock.yaml exists.
- Dependency install completes or error package is created.
- Prisma generate completes.
- Migration completes.
- EA0 seed completes.
- EA0 database validation completes.
- API typecheck/build completes or documented error package exists.
- No repeated blind retries.

Department labels:

- department:engineering
- department:database
- department:qa

## Milestone 4 - Core Backend API Foundation

Goal:

Create a stable backend API base for platform and app-support information.

Status:

NOT_STARTED

Scope:

- health endpoint
- ready endpoint
- device record/status endpoint foundation
- license/access status endpoint foundation
- app version metadata endpoint foundation
- remote config endpoint foundation
- standard response shape
- basic error handling
- DTO validation direction

Out of scope:

- payment provider integration
- full auth system
- reseller credit engine
- admin panel UI
- player playback control
- provider/playlist/stream/catalog endpoints

Completion rules:

- API endpoints build/typecheck.
- Endpoints stay inside platform boundary.
- No provider/playlist/stream/catalog data is returned.
- App-facing endpoints are information-only.

Department labels:

- department:backend
- department:database
- department:security
- department:qa

## Milestone 5 - Admin Control Panel Foundation

Goal:

Create the first admin/control panel shell.

Status:

NOT_STARTED

Scope:

- admin dashboard shell
- users list placeholder
- devices list
- app versions list
- remote config list
- audit logs placeholder
- role-aware layout direction

Completion rules:

- Next.js admin route structure exists.
- Panel layout exists.
- API connection points are clear.
- Any real data read is authorized server-side.

Department labels:

- department:web
- department:backend
- department:product
- department:qa

## Milestone 6 - App Version + Remote Config Management

Goal:

Manage app-support metadata from the platform.

Status:

NOT_STARTED

Scope:

- latestVersion
- minimumSupportedVersion
- forceUpdate flag
- updateUrl metadata when approved
- releaseNotes metadata
- platform/channel fields
- maintenance mode
- feature flags
- remote config values

Out of scope:

- APK installation flow
- Downloader code
- TV market publishing
- player update implementation
- player distribution strategy

Completion rules:

- Admin can create/update app version metadata.
- Admin can create/update remote config.
- App-facing API returns correct app-support information.
- Metadata does not contain secrets or player source data.

Department labels:

- department:web
- department:backend
- department:database
- department:qa

## Milestone 7 - User / Customer / Reseller Auth

Goal:

Build secure identity and role access for the platform panels.

Status:

NOT_STARTED

Scope:

- admin login
- reseller login
- customer login
- role-based access
- protected routes
- server-side authorization
- session/token handling

Completion rules:

- Admin can access admin scope only when authorized.
- Reseller sees only reseller-owned resources.
- Customer sees only self-owned resources.
- Password hashes are never returned.
- Frontend route hiding is not treated as security.

Department labels:

- department:backend
- department:web
- department:security
- department:qa

## Milestone 8 - Subscription / License / Payment Records

Goal:

Manage platform access records safely.

Status:

NOT_STARTED

Scope:

- plans
- subscriptions
- license/access status
- manual payment records
- payment approval/reject flow
- audit logs for critical actions

Out of scope:

- real payment provider integration
- automatic provider webhooks
- content/channel/package sales

Completion rules:

- Admin can manage manual payment records.
- Subscription/license/access changes are backend-authoritative.
- Frontend success screens cannot grant access.
- Audit logs are created for critical changes.

Department labels:

- department:backend
- department:database
- department:web
- department:security
- department:qa

## Milestone 9 - Reseller Panel

Goal:

Allow reseller to manage only own customers and platform access operations.

Status:

NOT_STARTED

Scope:

- reseller dashboard
- own customers list
- own subscriptions/access records
- credit balance display
- credit ledger
- create/extend customer access when allowed

Completion rules:

- Reseller cannot see other reseller data.
- Credit operations are backend-calculated.
- Every credit movement has ledger record.
- Critical reseller actions are audit logged.

Department labels:

- department:web
- department:backend
- department:database
- department:security
- department:qa

## Milestone 10 - Customer Panel

Goal:

Allow customer to view and manage own platform access state.

Status:

NOT_STARTED

Scope:

- customer dashboard
- subscription/access status
- license/access status
- registered devices
- payment history
- app version notice
- support/legal links

Out of scope:

- playlist entry
- provider account storage
- stream/channel list
- playback control

Completion rules:

- Customer sees only self-owned data.
- Device/license/payment information is readable.
- Sensitive provider data is not stored or displayed.

Department labels:

- department:web
- department:backend
- department:security
- department:qa

## Milestone 11 - Public Website + Legal Pages

Goal:

Create the public website and legal/support pages.

Status:

NOT_STARTED

Scope:

- Home
- Pricing / Plans
- Device Support
- FAQ
- Contact / Support
- Terms
- Privacy
- Refund Policy
- Acceptable Use Policy
- Legal Boundary

Completion rules:

- Public copy stays inside platform/software-access boundary.
- No page implies included content, channels, streams, packages, provider access, marketplace, or playback control.
- Legal pages align with LEGAL_SCOPE.md.

Department labels:

- department:web
- department:product
- department:security
- department:docs
- department:qa

## Milestone 12 - QA / Security / Release Hardening

Goal:

Validate MVP behavior before production deployment.

Status:

NOT_STARTED

Scope:

- auth security
- role isolation
- reseller ownership
- customer ownership
- payment safety
- device/license/access checks
- audit logs
- env secrets
- build/typecheck
- endpoint tests where available
- legal boundary check

Completion rules:

- QA checklist passed.
- Security checklist passed.
- No provider/media scope drift.
- No sensitive data leak.
- Critical flows are verified.

Department labels:

- department:qa
- department:security
- department:engineering
- department:docs

## Milestone 13 - Production Deployment Preparation

Goal:

Prepare platform deployment safely.

Status:

NOT_STARTED

Scope:

- production environment plan
- database backup plan
- deployment checklist
- rollback plan
- domain/configuration plan
- server/hosting decision
- logs/monitoring
- admin seed strategy

Completion rules:

- Deploy dry-run is ready.
- Rollback plan is ready.
- Secrets are not committed.
- Director approval is required before deploy.

Department labels:

- department:engineering
- department:security
- department:qa
- department:director

## Milestone 14 - Web Platform MVP Release

Goal:

Release the first usable web/API platform MVP.

Status:

NOT_STARTED

MVP must include:

- admin/control panel
- reseller panel
- customer panel
- device records
- app version metadata management
- remote config management
- manual payment records
- subscription/license/access status
- basic audit logs
- public legal website

MVP must not include:

- real payment gateway unless separately approved
- advanced analytics
- marketplace
- content/catalog system
- playlist cloud sync
- player app development
- player app distribution strategy

Completion rules:

- Admin can manage platform operations.
- Reseller can manage own customers/access only.
- Customer can view own access state only.
- App can receive required platform information.
- Legal/security boundary is preserved.

## Current Execution Order

1. Finish M2 verification by keeping ROADMAP.md and project-bible/13-decision-log.md synchronized.
2. Run M3 local install and database validation.
3. If M3 passes, begin M4 Core Backend API Foundation.
4. Do not start panel construction before M3 validation passes unless Director explicitly approves.

## Roadmap Update Rule

Update this roadmap whenever a milestone status changes.

Do not remove historical decisions without recording the reason in project-bible/13-decision-log.md.