# Roadmap

Milestone roadmap for TV Project Platform.

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
- AI operations bible
- Internal system migration plan
- Local setup guide
- Environment variables guide
- LICENSE.md

Removed from active use:

- README.md

Temporary / review later:

- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- external validation workflow files

The project is not MVP-ready yet.

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
- project-bible/17-ai-operations-bible.md

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
- README.md removed from active use.

Completion rules:

- Active handoff files describe the same current workflow.
- No foundation file claims the project has no implementation.
- Token economy rules are active.

## Milestone 1 - Cleanup and Simplification

Goal:

Remove or archive files that are no longer useful for the private internal workflow, then simplify oversized project documents.

Status:

IN_PROGRESS

Scope:

- Remove confirmed unnecessary public-facing files.
- Remove or archive old startup/helper files.
- Remove external-only workflow files after internal validation direction is confirmed.
- Keep LICENSE.md.
- Keep technical config and application code.
- Simplify oversized Bible files after cleanup.

Potential cleanup candidates:

- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- external validation workflow files

Do not remove yet:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- LICENSE.md
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- project-bible/00-project-rules.md
- project-bible/17-ai-operations-bible.md

Completion rules:

- Unneeded files are removed only after Director decision.
- Remaining docs do not reference removed active files.
- Oversized docs are marked for simplification.

## Milestone 2 - Bible Simplification

Goal:

Reduce oversized project Bible documents into compact authority files.

Status:

NOT_STARTED

Scope:

- Simplify project-bible/00-project-rules.md.
- Keep only non-negotiable rules in 00.
- Move AI/token details to 17-ai-operations-bible.md.
- Leave security/payment/reseller/testing/release details in their own Bible files.
- Avoid duplicating long rule text.

Completion rules:

- 00-project-rules.md becomes compact.
- No critical rule is lost.
- Detailed rules remain in dedicated files.
- Token burden is reduced.

## Milestone 3 - Local Install and Lockfile

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

## Milestone 4 - Internal Validation Workflow

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

## Milestone 5 - Shared Package Foundation

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

## Milestone 6 - API Foundation

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

## Milestone 7 - Database Foundation

Goal:

Create the first MVP-ready Prisma schema.

Status:

PARTIAL

Existing:

- apps/api/prisma/schema.prisma early schema

Completion rules:

- Schema contains all MVP models.
- Relations and indexes support expected access patterns.
- Migration path is documented.

## Milestone 8 - Authentication and Authorization

Goal:

Build secure user identity and role access.

Status:

NOT_STARTED

Completion rules:

- Admin, reseller, and customer roles are enforced server-side.
- Frontend route hiding is not treated as security.
- Password hash never returns from API.

## Milestone 9 - Core Product Engines

Goal:

Build subscription, license, device, reseller, payment, app version, remote config, and audit foundations.

Status:

NOT_STARTED

Completion rules:

- License checks are backend-authoritative.
- Device identity uses app_generated_device_id.
- Reseller credit operations are transaction-based.
- Payment records do not store card data.
- Critical actions are audit logged.

## Milestone 10 - Panels and Public Pages

Goal:

Build customer, reseller, admin, and required public/legal page foundations.

Status:

NOT_STARTED

Completion rules:

- Each role sees only allowed data.
- Critical actions are server-authorized and audit logged.
- Public messaging stays within product boundary.

## Milestone 11 - Testing and Security Hardening

Goal:

Create validation coverage and staging-level safety.

Status:

NOT_STARTED

Completion rules:

- Critical flows are tested.
- QA Security signs off milestone completion.
- Sensitive data is not exposed.

## Milestone 12 - Deployment Preparation

Goal:

Prepare staging and production deployment.

Status:

NOT_STARTED

Completion rules:

- Staging plan exists.
- Production plan exists.
- Backup and rollback plans exist.

## Milestone 13 - MVP Release

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

## Roadmap Update Rule

Update this roadmap whenever a milestone status changes.

Do not remove historical decisions without recording the reason in project-bible/13-decision-log.md.
