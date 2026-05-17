# Local Setup

Compact local setup guide.

## Requirements

- Node.js 20+
- pnpm 9+
- Docker Compose

## Install

Run dependency install with pnpm.

After first successful install, save `pnpm-lock.yaml`.

## Environment

Create local environment file from `.env.example`.

Use placeholders only for local development.

Never use placeholder secrets in production.

## Infrastructure

Use root scripts to start, stop, and inspect local services.

Local services:

- PostgreSQL
- Redis

## Database

Use root database scripts for:

- Prisma client generation
- development migrations
- Prisma Studio when needed

## Applications

Use root scripts to run:

- all development apps
- web app only
- API app only

## Validation

Use root scripts for:

- typecheck
- build

Record failures as compact error packages.

## Current Notes

- Lockfile is pending until first successful install.
- Real MVP modules are not complete yet.
- Setup must stay milestone-scoped.

## Related Authority Files

- PROJECT_STATE.md
- ROADMAP.md
- docs/environment-variables.md
- docs/development-workflow.md
- project-bible/12-devops-bible.md

## Final Rule

Keep setup simple, repeatable, and aligned with the current milestone.
