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

TV Project Platform is the web/API support platform for Nexora TV.

This repo owns website, admin/control panel, reseller panel, customer panel, backend API, platform database, user/customer/reseller records, device records, license/access records, app version metadata, remote configuration, payment records, reseller credit records, and audit logs.

The Android TV / Fire TV player application is developed separately.

Authority:

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- LEGAL_SCOPE.md
- PROJECT_STATE.md
- ROADMAP.md

## Decision 002 - Platform Boundary

Status: APPROVED

TV Project Platform provides approved app-support and platform-management information only.

It must not become a provider, distribution system, public catalog, marketplace, relay, playback controller, stream authority, media service, player app repository, or permanent user-profile authority.

Authority:

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/03-feature-list.md
- project-bible/05-api-bible.md
- project-bible/10-app-integration.md
- LEGAL_SCOPE.md
- SECURITY.md

## Decision 003 - Local-First Profile Direction

Status: APPROVED

User profile/provider data is local-first by default in the player app.

Optional web-to-device transfer may exist only as scoped, encrypted, expiring, user-owned transfer.

It must not become permanent backend profile storage, provider storage, stream storage, shared profile library, public profile search, or playback control.

Authority:

- project-bible/01-product-bible.md
- project-bible/10-app-integration.md
- project-bible/06-security-bible.md
- SECURITY.md

## Decision 004 - Primary Device Identity

Status: APPROVED

Primary device identity is app_generated_device_id / installId.

MAC address must not be primary identity.

Authority:

- project-bible/00-project-rules.md
- project-bible/10-app-integration.md

## Decision 005 - Role Model

Status: APPROVED

Main roles:

- Admin
- Reseller
- Customer

Backend authorization and ownership checks are mandatory.

Frontend visibility is not security.

Authority:

- project-bible/02-user-roles.md
- project-bible/06-security-bible.md

## Decision 006 - Reseller Credit Model

Status: APPROVED

Reseller credit must be transaction-based.

Frontend credit values must not be trusted.

Credit use and subscription/access changes must happen safely through backend logic.

Authority:

- project-bible/08-reseller-bible.md

## Decision 007 - Payment Safety

Status: APPROVED

Payments are for approved platform/software access only.

Payment card data must not be stored.

Payment approval must be backend-authoritative.

Payment must not represent provider access, content access, channel packages, stream access, playlist marketplace items, or public catalog products.

Authority:

- project-bible/07-payment-bible.md

## Decision 008 - Security Baseline

Status: APPROVED

Passwords must not be plain text.

Secrets must not be committed.

Sensitive data must not be logged.

Critical actions must be audit logged.

App-support endpoints must not return media sources, provider credentials, playlists, streams, or channel/catalog data.

Authority:

- SECURITY.md
- project-bible/06-security-bible.md

## Decision 009 - Approved Technical Stack

Status: APPROVED

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

Authority:

- project-bible/00-project-rules.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/12-devops-bible.md

## Decision 010 - Active Project Structure

Status: APPROVED

Active structure:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

README.md may exist as a lightweight repository overview, but it is not the main project authority.

Removed from active workflow:

- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

Authority:

- PROJECT_STATE.md
- ROADMAP.md
- AI_HANDOFF.md

## Decision 011 - Director-Led Workflow

Status: APPROVED

Owner approves major direction changes.

Director controls execution order.

Milestones control scope.

Departments are single-task expert calls.

GitHub Issues may be used for department tasks with department labels.

Authority:

- docs/development-workflow.md
- docs/department-system.md
- PROJECT_STATE.md
- ROADMAP.md

## Decision 012 - Active Department Labels

Status: APPROVED

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

Do not create department:app for this platform repo unless the repo scope changes by Owner approval.

Authority:

- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md

## Decision 013 - AI Operations

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

## Decision 014 - Bible Simplification

Status: APPROVED

Project Bible files should be compact authority documents.

Do not duplicate long rule text across files.

Use references to dedicated authority files.

Authority:

- project-bible/00-project-rules.md
- project-bible/17-ai-operations-bible.md

## Decision 015 - App Release Boundary

Status: APPROVED

This platform repo may manage only app-support metadata and configuration:

- app version metadata
- minimum supported version metadata
- force update flag
- maintenance status
- remote config values
- app-support API contracts

Player app release, APK/file hosting, marketplace publishing, sideloading, Downloader-code decisions, and player distribution strategy belong to the separate player app project.

Authority:

- project-bible/03-feature-list.md
- project-bible/11-marketing-bible.md
- project-bible/12-devops-bible.md
- project-bible/16-release-bible.md

## Decision 016 - Current Milestone Direction

Status: APPROVED

Current execution order:

1. Finish M2 verification by keeping ROADMAP.md and project-bible/13-decision-log.md synchronized.
2. Run M3 local install and database validation.
3. If M3 passes, begin M4 Core Backend API Foundation.
4. Do not start panel construction before M3 validation passes unless Director explicitly approves.

Authority:

- ROADMAP.md
- PROJECT_STATE.md
- AI_HANDOFF.md

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

## Pending 004 - Temporary Own-Device Transfer

Status: PENDING

Temporary web-to-device transfer is not part of default architecture.

It may be considered later only with explicit user consent, encryption where sensitive, expiry, one-time consumption where practical, and Owner approval.

## Pending 005 - Multi-Language UI

Status: PENDING

Initial UI may be English.

Turkish support may be added later if approved.

## Rejected Decisions

## Rejected 001 - Backend Provider/Distribution Behavior

Status: REJECTED

Do not implement provider, distribution, relay, marketplace, catalog, stream-authority, media service, player-distribution-policy, playback-control, or permanent profile authority behavior.

## Rejected 002 - Frontend-Trusted Payment Success

Status: REJECTED

Do not extend subscriptions or platform access directly from frontend payment success.

Payment confirmation must be backend-authoritative.

## Rejected 003 - Simple Reseller Balance Without Transactions

Status: REJECTED

Do not use only a balance field without transaction history.

## Rejected 004 - MAC Address As Primary Device ID

Status: REJECTED

Use app_generated_device_id / installId instead.

## Rejected 005 - Player Distribution Decisions In Platform Repo

Status: REJECTED

Do not define marketplace publishing, sideloading, APK hosting, Downloader-code, or player distribution strategy in this repository.

These belong to the separate player app project.

## Superseded / Removed Files

## Superseded 001 - README.md Removed From Active Use

Status: SUPERSEDED

Old decision:

README.md was removed from active use.

Current decision:

README.md may exist as a lightweight repository overview, but it is not the main project authority.

Authority:

- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md

## Removed 002 - CONTRIBUTING.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

No external contributors are expected for current private/internal-first workflow.

## Removed 003 - CHANGELOG.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

Project progress is tracked through ROADMAP.md, PROJECT_STATE.md, and decision/milestone records.

## Removed 004 - docs/new-chat-start-message.md

Status: REMOVED_FROM_ACTIVE_USE

Reason:

AI_HANDOFF.md is the active startup source.

## Removed 005 - External CI Workflow

Status: REMOVED_FROM_ACTIVE_USE

Reason:

Validation direction is internal-first.

## Superseded Decisions

## Superseded 002 - Licensed Player Platform Wording

Status: SUPERSEDED

Old wording:

TV Project Platform was described as a licensed player platform.

Current wording:

TV Project Platform is the web/API support platform for Nexora TV. The Android TV / Fire TV player application is developed separately.

## Superseded 003 - PostgreSQL Stack Reference

Status: SUPERSEDED

Old stack reference:

PostgreSQL.

Current stack reference:

MySQL / MariaDB-compatible local database.

## Update Rule

When a major decision changes:

- mark the old decision SUPERSEDED or REMOVED_FROM_ACTIVE_USE
- add the new approved decision
- update PROJECT_STATE.md and ROADMAP.md when relevant
- update dedicated Bible/docs files when relevant

Do not silently reverse active decisions.