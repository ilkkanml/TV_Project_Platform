# 00 - Project Rules

Compact constitution for TV Project Platform.

This file keeps only non-negotiable project rules.

Detailed rules live in dedicated Bible and docs files.

## Rule 1 - Product Identity

TV Project Platform is the web/API support platform for Nexora TV.

This repo owns the website, admin/control panel, reseller panel, customer panel, backend API, platform database, device records, license/access records, app version metadata, remote configuration, payment records, reseller records, and audit logs.

The Android TV / Fire TV player application is developed separately.

## Rule 2 - Product Boundary

The platform provides approved platform information and management tools only.

It must not become a provider, distribution system, catalog, marketplace, relay, playback controller, stream authority, or permanent provider/profile authority.

User profile/provider handling is local-first in the player app by default.

Temporary transfer is allowed only as scoped, expiring, user-owned transfer when explicitly approved.

Detailed boundary rules:

- LEGAL_SCOPE.md
- SECURITY.md
- project-bible/01-product-bible.md
- project-bible/10-app-integration.md

## Rule 3 - Device Identity

Primary device identity is:

- app_generated_device_id / installId

Secondary signals may support debugging and fraud review, but must not replace the primary identity.

MAC address must not be the primary device identity.

## Rule 4 - Roles and Authorization

Main roles:

- Admin
- Reseller
- Customer

Backend authorization and ownership checks are mandatory.

Frontend visibility is not security.

Detailed role rules:

- project-bible/02-user-roles.md
- project-bible/06-security-bible.md

## Rule 5 - Reseller Credit

Reseller credit must be transaction-based.

Frontend credit values must not be trusted.

Credit use and subscription changes must happen safely through backend logic.

Detailed rules:

- project-bible/08-reseller-bible.md

## Rule 6 - Payment Safety

Payments are for approved platform access only.

Payment approval must be backend-authoritative.

Detailed rules:

- project-bible/07-payment-bible.md

## Rule 7 - Security Baseline

Passwords must not be stored in plain text.

Secrets must not be committed.

Sensitive data must not be logged.

Critical actions must be audit logged.

Detailed rules:

- SECURITY.md
- project-bible/06-security-bible.md

## Rule 8 - Approved Technical Stack

Approved stack:

- pnpm monorepo
- Next.js
- React
- TypeScript
- Tailwind CSS
- NestJS
- Prisma
- MySQL / MariaDB-compatible local database
- Redis
- Docker Compose

Do not change the stack without Owner approval.

## Rule 9 - Active Structure

Active project structure:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

README.md may exist as a lightweight repository overview, but it is not the main project authority.

Do not create duplicate nested folders.

## Rule 10 - Director-Led Workflow

Owner approves major direction changes.

Director controls execution order.

Milestones control scope.

Departments are single-task expert calls.

GitHub Issues may be used for department tasks with department labels.

System engines enforce deterministic safety.

Detailed workflow rules:

- docs/development-workflow.md
- docs/department-system.md

## Rule 11 - AI Operations

AI is not the default path.

AI Gate must check whether AI is needed.

Context Builder must send the smallest useful context.

Departments must answer with structured output only.

Detailed AI rules:

- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- project-bible/17-ai-operations-bible.md

## Rule 12 - Truthfulness

All project answers must be honest and uncertainty-aware.

Do not present unverified information as confirmed.

If something is unknown, missing, inferred, or not checked, label it clearly.

A task is not complete unless completion is verified.

## Rule 13 - Three-Fail Stop

A task may fail at most three times for the same issue.

After the third failure:

- stop blind retries
- record the failure
- identify last successful checkpoint
- Director decides rollback, redesign, or manual inspection

## Rule 14 - Deployment Safety

AI may propose code.

AI may not silently deploy its own code.

Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.

## Rule 15 - Stable Bible Tree

Active project-bible files:

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
- 17-ai-operations-bible.md

Do not create conflicting Bible files.

## Rule 16 - Documentation Authority

Important decisions should be recorded in the most relevant active document.

Do not duplicate long rule text across multiple files.

Use references instead.

## Rule 17 - Do Not Change Without Approval

Do not change these without explicit Owner approval:

- product identity
- product boundary
- app-support platform boundary
- local-first provider/profile direction
- temporary transfer boundary
- app-generated device identity
- main role model
- reseller credit transaction model
- payment safety baseline
- approved technical stack
- Director-led workflow
- truthfulness rule
- three-fail stop rule
- no self-deployment rule
- AI Gate and Context Builder rules

## Final Rule

Keep the project focused, private, controlled, truthful, token-efficient, app-support-only, and milestone-driven.
