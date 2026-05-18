# TV Project Platform — START HERE

## Source of Truth

This repository is the Platform source-of-truth for the Nexora TV ecosystem.

Chat history is not source of truth.

## Current Role

`TV_Project_Platform` supports the Android TV / Fire TV client through platform-side account, device, license, app version, remote config, and temporary profile transfer foundations.

## Current Milestone Context

Active external milestone:

`M11 Platform Source-of-Truth Audit`

M11 is audit/documentation only.

## Read First

1. `README.md`
2. `docs/START_HERE.md`
3. `docs/PLATFORM_SOURCE_OF_TRUTH.md`
4. `docs/API_CONTRACT_ALIGNMENT.md`
5. `docs/DATABASE_BASELINE.md`
6. `docs/SECURITY_SESSION_POLICY.md`
7. `docs/LEGAL_BOUNDARY.md`

## Current Stack

- pnpm workspace
- Next.js web app in `apps/web`
- NestJS API app in `apps/api`
- Prisma schema in `apps/api/prisma/schema.prisma`
- Shared TypeScript package in `packages/shared`
- PostgreSQL and Redis through `docker-compose.yml`

## Current Runtime Truth

- Platform repo exists
- Web app exists
- API app exists
- Shared package exists
- Prisma schema exists
- Local infra compose exists
- API endpoints are early/static foundation endpoints
- Database schema exists but migration baseline is not finalized
- Auth/session/token implementation is not finalized
- Payment enforcement is not active
- Provider integration is not approved

## M11 Guardrails

M11 does not approve:

- Backend implementation beyond existing audit state
- Database migration execution
- Android bridge implementation
- Payment enforcement
- Provider integration
- Content hosting
- Broadcasting
- Channel selling
- Bundled streams
- Unauthorized source extraction
- Credential sharing
- Protected-system rewrite

## Required Next Step

Align platform docs and contracts before implementation milestones.
