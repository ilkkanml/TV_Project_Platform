# 00 - Project Rules

Compact constitution for TV Project Platform.

This file keeps only non-negotiable project rules.

Detailed rules live in dedicated Bible and docs files.

## Rule 1 - Product Identity

TV Project Platform is a licensed player platform.

It manages platform access, accounts, subscriptions, licenses, devices, payments, reseller operations, app version rules, remote configuration, audit logs, and optional temporary encrypted web-to-device transfer.

The platform must not drift outside its approved product boundary.

Detailed boundary rules:

- LEGAL_SCOPE.md
- SECURITY.md
- project-bible/01-product-bible.md

## Rule 2 - Product Boundary

The backend manages platform authority only.

It must not become a provider, distribution, catalog, marketplace, relay, or permanent user-profile authority.

User profile handling is local-first by default.

Temporary transfer is allowed only as scoped, expiring, user-owned transfer.

## Rule 3 - Device Identity

Primary device identity is:

- app_generated_device_id

Secondary signals may support debugging and fraud review, but must not replace the primary identity.

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

Payment card data must not be stored.

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
- PostgreSQL
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

Do not create duplicate nested folders.

## Rule 10 - Director-Led Workflow

Owner approves major direction changes.

Director controls execution order.

Milestones control scope.

Departments are single-task expert calls.

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

## Rule 12 - Three-Fail Stop

A task may fail at most three times for the same issue.

After the third failure:

- stop blind retries
- record the failure
- identify last successful checkpoint
- Director decides rollback, redesign, or manual inspection

## Rule 13 - Deployment Safety

AI may propose code.

AI may not silently deploy its own code.

Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.

## Rule 14 - Stable Bible Tree

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

## Rule 15 - Documentation Authority

Important decisions should be recorded in the most relevant active document.

Do not duplicate long rule text across multiple files.

Use references instead.

## Rule 16 - Do Not Change Without Approval

Do not change these without explicit Owner approval:

- product identity
- product boundary
- local-first profile direction
- temporary transfer boundary
- app-generated device identity
- main role model
- reseller credit transaction model
- payment safety baseline
- approved technical stack
- Director-led workflow
- three-fail stop rule
- no self-deployment rule
- AI Gate and Context Builder rules

## Final Rule

Keep the project focused, private, controlled, token-efficient, and milestone-driven.
