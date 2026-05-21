# 12 - DevOps Bible

Compact DevOps authority for TV Project Platform.

## DevOps Rule

DevOps must support approved platform operations only.

Infrastructure must not support provider, distribution, relay, transcoding, catalog, marketplace, broadcast, playback-control, stream-authority, or permanent user-profile-authority behavior.

## Approved Stack

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

- MySQL / MariaDB-compatible database
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
- Database provider references must stay aligned across Prisma schema, Docker Compose, and env examples.

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
- MySQL / MariaDB-compatible database
- Redis
- logs
- monitoring
- backups
- APK/file storage for controlled app distribution when needed
- payment webhook handling when providers are integrated
- temporary transfer storage when enabled

Forbidden runtime infrastructure:

- provider/distribution infrastructure
- relay infrastructure
- transcoding workers
- broadcast systems
- public marketplace hosting
- catalog distribution infrastructure
- backend playback-control infrastructure
- stream-authority infrastructure

## Early Access Distribution Infrastructure

Early access is controlled distribution, not marketplace launch.

Approved early access app distribution:

- Downloader-code / direct APK installation flow
- APK/file storage only when needed for controlled app distribution

Do not prioritize public TV/app market publishing infrastructure during early access.

Core reliability has priority over store visibility.

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

Keep infrastructure minimal, private, secure, reversible, app-support-only, and inside the approved platform boundary.
