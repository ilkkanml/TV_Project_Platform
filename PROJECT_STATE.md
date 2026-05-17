# Project State

This file is the current state summary for TV Project Platform.

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

The platform manages software/player access, accounts, subscriptions, licenses, devices, payments, reseller operations, app version control, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

The platform is not a media provider, broadcast backend, channel seller, playlist marketplace, CDN, relay, transcoder, or backend source of truth for user playlist/profile data.

## Current Phase

Current phase:

Foundation stabilization and controlled implementation preparation.

The project workspace already contains foundation code and foundation documentation.

Do not describe the project as empty or not started.

## Confirmed Foundation

Code foundation:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose local services

Documentation and workflow foundation:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- LICENSE.md
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- docs/local-setup.md
- docs/environment-variables.md
- docs/new-chat-start-message.md
- project-bible canonical tree

## Management Model

The project is managed with a Director-led milestone system.

Core rules:

- Owner approves major direction decisions.
- Director controls execution order.
- Milestones control scope.
- AI Gate blocks unnecessary AI calls.
- Context Builder Engine builds the smallest useful context package.
- Departments are single-task expert calls, not permanent chat rooms.
- Departments answer only with structured output.
- Departments do not acknowledge instructions.
- Departments do not add filler text.
- Department raw outputs are archived.
- Accepted compact outputs become reusable memory.
- Full old conversations are not reused as default AI context.
- Three failures on the same task stop the loop.
- Last successful checkpoint must be used before risky retry.
- AI output does not deploy itself.
- Deployment requires Director approval, dry run, whitelist, backup/checkpoint, and audit logging.
- AI usage must be logged and token budgets must be enforced.

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Approved system engines:

- Milestone Controller
- AI Gate
- Context Builder Engine
- Similar Task Cache
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

## Current Project Structure

Expected root structure:

```txt
TV_Project_Platform/
├── README.md
├── PROJECT_STATE.md
├── AI_HANDOFF.md
├── ROADMAP.md
├── CHANGELOG.md
├── SECURITY.md
├── LEGAL_SCOPE.md
├── CONTRIBUTING.md
├── LICENSE.md
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── docker-compose.yml
├── project-bible/
├── docs/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
└── infra/
```

## Root Script State

Current API development command:

```txt
pnpm --filter @tv-platform/api run dev
```

Common root commands:

```txt
pnpm install
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm typecheck
pnpm build
pnpm infra:up
pnpm infra:down
pnpm db:generate
pnpm db:migrate
```

## Documentation State

Critical foundation documentation is present.

Older non-canonical docs may still exist.

Do not delete older docs blindly.

Review and migrate useful content before removal, rename, or archive decisions.

## Implementation State

Completed foundation areas:

- shared package skeleton
- API app skeleton
- health endpoint
- web app skeleton
- public landing shell
- Prisma early schema
- local Docker services
- internal validation direction
- project workflow docs
- department system docs
- token economy docs
- context builder docs
- local setup docs
- environment variable docs

Not complete yet:

- authentication
- role-based authorization
- user management
- plan management
- subscription engine
- license engine
- device activation engine
- reseller credit engine
- payment records
- app version module
- remote config module
- temporary profile transfer bridge
- audit log module
- admin panel
- reseller panel
- customer panel
- tests
- production deployment
- finalized MVP Prisma schema
- pnpm-lock.yaml after first dependency install

## Product Boundary

Allowed backend areas:

- accounts
- authentication
- role-based access control
- customer subscriptions
- player licenses
- device activation
- payment records
- reseller accounts
- reseller credit transactions
- app version control
- remote configuration
- maintenance mode
- feature flags
- audit logs
- optional temporary encrypted web-to-device profile transfer

Forbidden backend areas:

- channel inventory
- media catalog
- content distribution
- media relay
- transcoding jobs
- CDN behavior
- public playlist marketplace
- provider credential distribution
- permanent backend playlist/profile authority by default

## Current Risks

- Prisma schema is early and not MVP-complete.
- Real product modules are not implemented yet.
- Tests are not complete yet.
- Production deployment setup is not complete yet.
- Long documents must not be sent to AI as full context.
- New assistants must read token economy, context builder, and department response rules.

## Current Recommended Next Steps

1. Generate and save pnpm-lock.yaml after first dependency install.
2. Finalize MVP Prisma schema in controlled smaller patches.
3. Validate internal build/typecheck workflow after lockfile exists.
4. Continue milestone-based implementation.

## Update Rule

Update this file whenever project state changes.

Do not claim a feature is complete unless the project workspace contains it and it has been verified.
