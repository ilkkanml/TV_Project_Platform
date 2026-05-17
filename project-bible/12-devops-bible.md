# 12 - DevOps Bible

Compact DevOps authority for TV Project Platform.

## DevOps Rule

DevOps must support approved platform operations only.

Infrastructure must not support provider, distribution, relay, transcoding, catalog, marketplace, broadcast, or permanent user-profile-authority behavior.

## Approved Stack

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

## Active Structure

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

Removed from active workflow:

- .github/workflows/ci.yml

## Local Development

Local development should support:

- PostgreSQL
- Redis
- API app
- web app
- Prisma generation/migration
- typecheck/build validation

## Environment Rules

- Real secrets must not be committed.
- .env.example may contain placeholders only.
- Required environment variables must be documented.
- Production secrets belong in hosting/runtime secret storage.

## Deployment Rules

Deployment requires:

- Director approval
- dry run
- path whitelist
- backup/checkpoint
- audit log
- rollback plan

AI may not silently deploy generated output.

## Internal Validation Direction

Validation is internal-first.

External CI workflow has been removed from active use.

Future validation should be handled by internal validation engine when implemented.

Until then, local/manual validation commands may be used.

## Runtime Infrastructure

Allowed runtime infrastructure:

- web app hosting
- API app hosting
- PostgreSQL
- Redis
- logs
- monitoring
- backups
- APK/file storage for app distribution when needed
- payment webhook handling when providers are integrated
- temporary transfer storage when enabled

Forbidden runtime infrastructure:

- provider/distribution infrastructure
- relay infrastructure
- transcoding workers
- broadcast systems
- public marketplace hosting
- catalog distribution infrastructure

## Backup / Rollback

Critical deployments must have rollback path.

Backup/checkpoint should exist before risky writes.

Rollback actions must be logged.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/16-release-bible.md
- docs/development-workflow.md
- docs/internal-system-migration.md
- PROJECT_STATE.md

## Final DevOps Rule

Keep infrastructure minimal, private, secure, reversible, and inside the approved platform boundary.
