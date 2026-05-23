# Project State

Current state summary for TV Project Platform.

## Current Phase

Web/API platform scope sync and local validation preparation.

The project workspace is not empty.

Foundation code and foundation documentation exist.

Do not describe the project as not started.

## Current Product Scope

TV Project Platform owns:

- public website foundation
- admin/control panel
- reseller panel
- customer panel
- backend API
- platform database
- user/customer/reseller records
- device records
- license/access records
- app version metadata
- remote configuration
- payment records
- reseller credit records
- audit logs

TV Project Platform does not own:

- Android TV / Fire TV player development
- playback implementation
- player UI
- player distribution policy
- TV market publishing
- Downloader-code distribution decisions
- playlist/provider account storage by default
- stream/channel/content catalog
- media distribution

The Android TV / Fire TV player application is developed separately.

This platform may provide approved app-support information only.

## Confirmed Foundation

Code foundation:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- MySQL / MariaDB-compatible local database direction
- API health endpoint
- device install endpoint foundation
- app version endpoint foundation
- remote config endpoint foundation
- license check endpoint foundation
- Docker Compose local services
- Web landing page shell

Documentation and workflow foundation:

- README.md lightweight repository overview
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- LICENSE.md
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- docs/local-setup.md
- docs/environment-variables.md
- project-bible/00-project-rules.md
- project-bible/17-ai-operations-bible.md
- project-bible canonical tree

Removed from active use:

- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

README.md is present again as a lightweight overview only. It is not the main authority file.

## Management Model

The project is managed with a Director-led milestone system.

Core rules:

- Owner approves major direction decisions.
- Director controls execution order.
- Milestones control scope.
- GitHub Issues may be used for department tasks with department labels.
- AI Gate blocks unnecessary AI calls.
- Context Builder Engine builds the smallest useful context package.
- Departments are single-task expert calls.
- Departments answer only with structured output.
- Departments do not acknowledge instructions.
- Departments do not add filler text.
- Department raw outputs may be archived.
- Accepted compact outputs become reusable memory.
- Full old conversations are not reused as default AI context.
- Three failures on the same task stop the loop.
- Last successful checkpoint must be used before risky retry.
- AI output does not deploy itself.
- Deployment requires Director approval, dry run, whitelist, backup/checkpoint, and audit logging.
- AI usage should be logged and token budgets should be enforced.

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

## Current Project Structure

Expected active root structure:

```txt
TV_Project_Platform/
├── README.md
├── PROJECT_STATE.md
├── AI_HANDOFF.md
├── ROADMAP.md
├── SECURITY.md
├── LEGAL_SCOPE.md
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

Important API validation command:

```txt
pnpm --filter @tv-platform/api ea0:db:prepare
```

## Implementation State

Completed foundation areas:

- shared package skeleton
- API app skeleton
- health endpoint
- ready endpoint foundation
- device install endpoint foundation
- app version endpoint foundation
- remote config endpoint foundation
- license check endpoint foundation
- web app skeleton
- public landing shell
- Prisma schema foundation
- local Docker services
- MySQL / MariaDB alignment in docs/config
- EA0 database validation script corrected for MySQL
- internal validation direction
- project workflow docs
- department system docs
- token economy docs
- context builder docs
- AI operations bible
- local setup docs
- environment variable docs

Pending verification:

- dependency install
- pnpm-lock.yaml creation
- Prisma generate
- migration run
- EA0 seed
- EA0 database validation
- API typecheck
- API build

Not complete yet:

- authentication
- role-based authorization
- user management
- plan management
- subscription engine
- license engine beyond EA0 foundation
- device activation engine beyond foundation
- reseller credit engine
- payment records UI/API flow
- app version admin management UI
- remote config admin management UI
- temporary transfer bridge
- audit log module UI/API flow
- admin panel
- reseller panel
- customer panel
- tests
- production deployment
- finalized MVP Prisma schema
- pnpm-lock.yaml after first dependency install

## Current Risks

- Local install and DB validation have not been run in this workspace yet.
- Prisma schema is foundation-level and not full MVP-complete.
- Real product modules are not implemented yet.
- Tests are not complete yet.
- Production deployment setup is not complete yet.
- Long documents must not be sent to AI as full context.
- Platform must not drift into player app, playback, provider, playlist, stream, or catalog responsibilities.

## Current Recommended Next Steps

1. Run dependency install.
2. Generate and save pnpm-lock.yaml.
3. Run EA0 database preparation and validation.
4. Run API typecheck/build.
5. If validation passes, mark M2/M3 completed in ROADMAP.md.
6. Continue to Core Backend API Foundation.

## Update Rule

Update this file whenever project state changes.

Do not claim a feature is complete unless the project workspace contains it and it has been verified.