# M12 Local Verification Evidence

## Scope

Milestone: `M12 Platform Database Baseline & Migration Foundation`

Task: `M12-TASK-003 Local-only Migration Baseline Implementation Plan`

Evidence type: user-local Windows PowerShell run against local Docker Desktop infrastructure.

Status: `EVIDENCE RECORDED / READY FOR QA REVIEW`

This document does not mark M12 as PASSED or LOCKED. QA review is still required.

## Local Environment Evidence

User local path:

```text
C:\Users\ilkkan\OneDrive\Masaüstü\TV_Project_Platform
```

Docker evidence:

- Docker Desktop started successfully.
- Docker client/server reported active `desktop-linux` context.
- Docker server reported Linux/WSL2 backend active.
- `docker compose up -d` completed.
- `tv_platform_postgres` started.
- `tv_platform_redis` started.
- `docker compose ps` later reported both containers as `healthy`.

## Dependency Evidence

Command:

```powershell
pnpm.cmd install
```

Result:

- Workspace install completed.
- Lockfile was already up to date after repository pull.
- Root dev dependencies resolved on pinned versions including:
  - Prisma `6.19.3`
  - TypeScript `5.7.3`
  - Turbo `2.9.14`
  - `@types/node` `22.19.19`

## Prisma Generate Evidence

Command:

```powershell
pnpm.cmd db:generate
```

Result:

- Prisma schema loaded from `prisma/schema.prisma`.
- Prisma Client generated successfully with Prisma `6.19.3`.

## Local Migration Evidence

Temporary local environment variable used:

```powershell
$env:DATABASE_URL="postgresql://tv_platform:tv_platform_password@localhost:5432/tv_project_platform?schema=public"
```

Command:

```powershell
pnpm.cmd db:migrate
```

Result:

- Prisma connected to PostgreSQL database `tv_project_platform`, schema `public`, at `localhost:5432`.
- Migration applied:
  - `20260518120000_m12_initial_platform_database_baseline/migration.sql`
- Prisma reported: database is now in sync with schema.
- Prisma Client regenerated successfully.

## Typecheck Evidence

Command:

```powershell
pnpm.cmd --filter @tv-platform/api run typecheck
```

Result:

- `tsc --noEmit` ran for `@tv-platform/api`.
- No TypeScript error output was present in the user-provided terminal output after the M12 support fixes.

## Support Fixes Applied During Verification

The following support fixes were required to make the existing local verification path compatible with the M12 baseline:

1. API Prisma dependency pin
   - `apps/api/package.json`
   - `@prisma/client` pinned to `6.19.3`
   - `prisma` pinned to `6.19.3`
   - Reason: `latest` resolved to Prisma 7, which rejected the existing Prisma 6 datasource format.

2. API TypeScript config cleanup
   - `apps/api/tsconfig.json`
   - Removed invalid `ignoreDeprecations: "6.0"` setting.
   - Reason: TypeScript `5.7.3` rejected the setting during `tsc --noEmit`.

## Guardrail Confirmation

This verification was local-only.

No approval or evidence is recorded for:

- Production database deployment
- Production database mutation
- Payment enforcement
- Provider integration
- Content hosting
- Channel selling
- Platform-owned stream catalog
- Android bridge implementation
- Auth/session/token implementation outside the current database baseline scope
- Legal media player boundary changes

## QA Requirement

M12-TASK-003 may now move to QA review.

QA must independently evaluate the recorded evidence and confirm whether the task can be marked PASSED.

Director lock is not allowed until QA and documentation flow are complete.
