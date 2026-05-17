# 13 - Decision Log

Compact decision log for TV Project Platform.

This file records active decisions and cleanup history.

Detailed rule text belongs in dedicated Bible/docs files, not here.

## Status Values

- APPROVED
- PENDING
- REJECTED
- SUPERSEDED
- REMOVED_FROM_ACTIVE_USE

## Active Decisions

## Decision 001 - Product Identity

Status: APPROVED

TV Project Platform is a licensed player platform.

It manages approved platform access and operational control.

It must not become a provider, distribution system, public catalog, marketplace, relay, or permanent user-profile authority.

Authority:

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- LEGAL_SCOPE.md

## Decision 002 - Local-First Profile Direction

Status: APPROVED

User profile/provider data is local-first by default.

Optional web-to-device transfer may exist only as scoped, encrypted, expiring, user-owned transfer.

Authority:

- project-bible/01-product-bible.md
- project-bible/10-app-integration.md
- SECURITY.md

## Decision 003 - Primary Device Identity

Status: APPROVED

Primary device identity is app_generated_device_id.

MAC address must not be primary identity.

Authority:

- project-bible/10-app-integration.md

## Decision 004 - Role Model

Status: APPROVED

Main roles:

- Admin
- Reseller
- Customer

Backend authorization and ownership checks are mandatory.

Authority:

- project-bible/02-user-roles.md
- project-bible/06-security-bible.md

## Decision 005 - Reseller Credit Model

Status: APPROVED

Reseller credit must be transaction-based.

Frontend credit values must not be trusted.

Authority:

- project-bible/08-reseller-bible.md

## Decision 006 - Payment Safety

Status: APPROVED

Payments are for approved platform access only.

Payment card data must not be stored.

Payment approval must be backend-authoritative.

Authority:

- project-bible/07-payment-bible.md

## Decision 007 - Security Baseline

Status: APPROVED

Passwords must not be plain text.

Secrets must not be committed.

Sensitive data must not be logged.

Critical actions must be audit logged.

Authority:

- SECURITY.md
- project-bible/06-security-bible.md

## Decision 008 - Approved Technical Stack

Status: APPROVED

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

Authority:

- project-bible/12-devops-bible.md

## Decision 009 - Active Project Structure

Status: APPROVED

Active structure:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

Removed from active structure:

- .github/workflows/ci.yml

Authority:

- PROJECT_STATE.md
- ROADMAP.md

## Decision 010 - Director-Led Workflow

Status: APPROVED

Owner approves major direction changes.

Director controls execution order.

Milestones control scope.

Departments are single-task expert calls.

Authority:

- docs/development-workflow.md
- docs/department-system.md

## Decision 011 - AI Operations

Status: APPROVED

AI is not the default path.

AI Gate checks whether AI is needed.

Context Builder sends the smallest useful context.

Departments answer with structured output only.

Authority:

- project-bible/17-ai-operations-bible.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/department-response-rules.md

## Decision 012 - Cleanup Direction

Status: APPROVED

The project is private/internal-first.

Public/helper files that do not support the internal workflow may be removed.

Removed from active use:

- README.md
- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

Authority:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- docs/internal-system-migration.md

## Decision 013 - Bible Simplification

Status: APPROVED

Project Bible files should be compact authority documents.

Do not duplicate long rule text across files.

Use references to dedicated authority files.

Authority:

- project-bible/00-project-rules.md
- project-bible/17-ai-operations-bible.md

## Active Bible Tree

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

## Pending Decisions

## Pending 001 - Final App Activation Method

Status: PENDING

Options:

- app login
- activation code
- QR activation
- device code activation
- hybrid approach

Do not implement final activation flow without approval.

## Pending 002 - Final Payment Provider

Status: PENDING

Possible providers:

- Iyzico
- PayTR
- Stripe
- other approved provider

MVP may use manual payment records.

Do not implement real provider integration without approval.

## Pending 003 - Production Hosting

Status: PENDING

Production hosting requires approval.

Local development uses Docker Compose.

## Pending 004 - Encrypted Cloud Profile Sync

Status: PENDING

Not part of default architecture.

May be considered later only with explicit user consent and approval.

## Pending 005 - Multi-Language UI

Status: PENDING

Initial UI may be English.

Turkish support may be added later if approved.

## Rejected Decisions

## Rejected 001 - Backend Provider/Distribution Behavior

Status: REJECTED

Do not implement provider, distribution, relay, marketplace, catalog, or permanent profile authority behavior.

## Rejected 002 - Frontend-Trusted Payment Success

Status: REJECTED

Do not extend subscriptions directly from frontend payment success.

Payment confirmation must be backend-authoritative.

## Rejected 003 - Simple Reseller Balance Without Transactions

Status: REJECTED

Do not use only a balance field without transaction history.

## Rejected 004 - MAC Address As Primary Device ID

Status: REJECTED

Use app_generated_device_id instead.

## Superseded / Removed Files

## Removed 001 - README.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

Private/internal-first workflow does not need a public entry file.

## Removed 002 - CONTRIBUTING.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

No external contributors are expected.

## Removed 003 - CHANGELOG.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

Project progress is tracked through ROADMAP.md, PROJECT_STATE.md, and future internal memory.

## Removed 004 - docs/new-chat-start-message.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

AI_HANDOFF.md is the active startup source.

## Removed 005 - External CI Workflow

Status: REMOVED_FROM_ACTIVE_USE

Reason:

Validation direction is internal-first.

## Update Rule

When a major decision changes:

- mark the old decision SUPERSEDED or REMOVED_FROM_ACTIVE_USE
- add the new approved decision
- update PROJECT_STATE.md and ROADMAP.md when relevant
- update dedicated Bible/docs files when relevant

Do not silently reverse active decisions.
