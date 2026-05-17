# Local Setup

This file explains how to prepare TV Project Platform for local development.

## Current Stack

- Node.js 20+
- pnpm 9+
- Docker Compose
- PostgreSQL
- Redis
- Next.js web app
- NestJS API app
- Prisma

## Repository Setup

Clone the repository and install dependencies:

```bash
pnpm install
```

After the first successful install, commit the generated `pnpm-lock.yaml` file.

The lockfile is expected to exist after installation.

## Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Then update secrets before using anything beyond local development.

Never use placeholder secrets in production.

## Start Local Infrastructure

Start PostgreSQL and Redis:

```bash
pnpm infra:up
```

Optional pgAdmin tools profile:

```bash
pnpm infra:up:tools
```

Stop infrastructure:

```bash
pnpm infra:down
```

View logs:

```bash
pnpm infra:logs
```

## Database Setup

Generate Prisma client:

```bash
pnpm db:generate
```

Run development migration when migrations are ready:

```bash
pnpm db:migrate
```

Open Prisma Studio:

```bash
pnpm db:studio
```

## Run Applications

Run all development apps:

```bash
pnpm dev
```

Run only the web app:

```bash
pnpm dev:web
```

Run only the API app:

```bash
pnpm dev:api
```

Expected local URLs:

- Web: http://localhost:3000
- API: http://localhost:4000
- API health: http://localhost:4000/health
- pgAdmin with tools profile: http://localhost:5050

## Validation Commands

Typecheck:

```bash
pnpm typecheck
```

Build:

```bash
pnpm build
```

Lint:

```bash
pnpm lint
```

Tests:

```bash
pnpm test
```

Some commands may remain partial until the related milestone is complete.

## Browser-Based Development Note

The project can be managed from a browser-based workflow, but the repository state must remain clean.

Before major edits:

- Check PROJECT_STATE.md.
- Check AI_HANDOFF.md.
- Check ROADMAP.md.
- Check docs/development-workflow.md.
- Check docs/department-system.md.

Use the milestone system and do not skip foundation checks.

## Safety Rules

Do not commit real secrets.

Do not change the product boundary.

Do not add forbidden provider, delivery, relay, marketplace, catalog, or default permanent profile-authority features.

Do not deploy AI-generated code without Director approval, dry run, backup/checkpoint, and audit logging.
