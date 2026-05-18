# M12 — Local-only Migration Baseline Implementation Plan

## Status

PLAN ONLY / NOT IMPLEMENTED

## Purpose

This document defines the allowed implementation boundary for a future local-only Prisma migration baseline task.

It does not run migrations and does not approve production database work.

## Proposed Task

`M12-TASK-003 Local-only Migration Baseline Implementation Plan`

## Implementation Boundary

A future Builder task may only prepare and validate a local development migration baseline if Director explicitly approves it.

Allowed target:

- Local Docker PostgreSQL only.

Not allowed:

- Production database deployment.
- Production database mutation.
- Remote database target.
- Payment enforcement.
- Provider integration.
- Content hosting.
- Channel selling.
- Stream inventory.
- Provider credential storage.
- Android bridge implementation.
- Auth/session/token implementation.

## Allowed Future Files / Areas

Allowed only after Director implementation approval:

- `apps/api/prisma/schema.prisma` review only unless changes are explicitly requested.
- `apps/api/prisma/migrations/**` for local baseline migration creation.
- Prisma-related local scripts if required and separately approved.
- Documentation update after evidence is collected.

Not allowed:

- Android client code.
- Playback core.
- Auth/session implementation.
- API route implementation.
- Payment runtime logic.
- Provider integration files.
- Content catalog/source inventory files.

## Required Preflight Before Builder

Builder must confirm:

1. Runtime docs were read.
2. Active task explicitly allows local-only migration baseline work.
3. Target environment is local Docker PostgreSQL.
4. `DATABASE_URL` points to local/dev database only.
5. Production database is not configured or targeted.
6. Protected systems are not touched.
7. Legal database boundary remains preserved.
8. No content/provider/payment enforcement behavior is introduced.

## Candidate Commands After Approval

Potential commands for Builder evidence:

```bash
docker compose ps
pnpm install
pnpm db:generate
pnpm db:migrate
```

Exact command list must be confirmed by Builder based on repo state.

## Required Evidence If Implemented

Builder cannot return DONE without:

- Changed files list.
- Exact command list.
- Build/typecheck result if applicable.
- Prisma generate result.
- Local migration result.
- Confirmation target DB was local/dev.
- Confirmation no production DB was touched.
- Confirmation no Android/client code changed.
- Confirmation no payment/provider/content behavior was introduced.

## QA Requirement If Implemented

QA is required if migration files or scripts are changed.

QA must verify:

- Migration is local/dev scoped.
- Schema matches approved platform ownership.
- No content catalog/source inventory/provider credential tables added.
- No payment enforcement behavior added.
- No protected systems changed.
- Evidence is complete.

## Legal Boundary

The local database baseline must not create or enable:

- Content hosting.
- Broadcasting.
- Channel selling.
- Stream relay.
- Bundled streams.
- Provider credential pooling.
- Unapproved source extraction.
- Rights-bypass behavior.

## Director Decision Needed

Director must separately approve whether Builder may proceed from this plan to local-only implementation.

Until that approval exists, this document remains planning only.
