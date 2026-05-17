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

The repository is no longer empty and should not be described as having no implementation.

The current codebase contains an early working foundation:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose for PostgreSQL, Redis, and pgAdmin
- Project Bible canonical tree
- Core documentation foundation
- Milestone development workflow
- Department system constitution
- CONTRIBUTING.md

## Current Management Model

The project is now managed with a milestone-first system.

Approved management documents:

- docs/development-workflow.md
- docs/department-system.md

Core workflow rules:

- Director controls the project flow.
- Owner approves major direction decisions.
- Milestones control scope.
- Departments are single-task expert calls, not permanent chat rooms.
- Department outputs are archived.
- Old department conversations are not reused as default AI context.
- Three failures on the same task stop the loop.
- Last successful checkpoint must be used before retrying risky work.
- AI output does not deploy itself.
- Deployment requires Director approval, dry run, whitelist, backup/checkpoint, and audit logging.
- AI usage should be logged and token budgets should be enforced.

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Approved system engines:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

## Current Repository Structure

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
├── infra/
└── .github/
```

Confirmed present or created:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- .env.example
- .gitignore
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- docs/development-workflow.md
- docs/department-system.md

Still pending:

- LICENSE.md
- .github/workflows CI
- production deployment configuration
- complete docs coverage
- finalized MVP Prisma schema
- real API modules beyond health
- real web dashboards beyond landing shell
- tests

## Root Script State

The root API development script has been fixed.

Current correct command:

```txt
pnpm --filter @tv-platform/api run dev
```

## Documentation State

Canonical docs now include at least:

- docs/new-chat-start-message.md
- docs/architecture.md
- docs/development-workflow.md
- docs/department-system.md

Older non-canonical docs may still exist.

Do not delete older docs blindly.

Review and migrate useful content before removal, rename, or archive decisions.

## Implementation State

Current implementation is foundation-level only.

Completed foundation areas:

- shared package skeleton
- API app skeleton
- health endpoint
- web app skeleton
- public landing shell
- Prisma early schema
- local Docker services
- project management workflow docs
- department system docs

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
- playlist/profile transfer bridge
- audit log module
- admin panel
- reseller panel
- customer panel
- CI workflow
- tests
- production deployment

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

- Some older documents may still describe the project as pre-implementation.
- Prisma schema is early and not yet MVP-complete.
- CI is not yet present.
- LICENSE.md is still pending.
- New assistants must read the workflow and department-system docs or they may use the wrong operating model.

## Current Recommended Next Steps

1. Update AI_HANDOFF.md to include the new workflow and department documents.
2. Update ROADMAP.md to reflect foundation implementation already exists.
3. Update docs/new-chat-start-message.md to include the Director/milestone/department rules.
4. Update project-bible/00-project-rules.md with the new operating model reference.
5. Add LICENSE.md.
6. Add .github/workflows CI.
7. Finalize MVP Prisma schema in a controlled smaller patch.
8. Continue milestone-based implementation.

## Update Rule

Update this file whenever project state changes.

Do not claim a feature is complete unless the repository contains it and it has been verified.
