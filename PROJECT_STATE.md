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

The repository is no longer empty and must not be described as having no implementation.

The current codebase contains an early working foundation:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose for PostgreSQL, Redis, and pgAdmin
- GitHub Actions CI skeleton
- Project Bible canonical tree
- Core documentation foundation
- Milestone development workflow
- Department system constitution
- CONTRIBUTING.md
- LICENSE.md
- docs/local-setup.md
- docs/environment-variables.md

## Current Management Model

The project is managed with a Director-led milestone system.

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

Confirmed foundation files:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- LICENSE.md
- .env.example
- .gitignore
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- .github/workflows/ci.yml
- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- docs/development-workflow.md
- docs/department-system.md
- docs/local-setup.md
- docs/environment-variables.md

## Root Script State

The root API development script has been fixed.

Current correct command:

```txt
pnpm --filter @tv-platform/api run dev
```

## Documentation State

Critical foundation documentation is now present.

Canonical docs currently include:

- docs/new-chat-start-message.md
- docs/architecture.md
- docs/development-workflow.md
- docs/department-system.md
- docs/local-setup.md
- docs/environment-variables.md

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
- CI skeleton
- project management workflow docs
- department system docs
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

- Prisma schema is early and not yet MVP-complete.
- Real product modules are not implemented yet.
- Tests are not complete yet.
- Production deployment setup is not complete yet.
- New assistants must read the workflow and department-system docs or they may use the wrong operating model.

## Current Recommended Next Steps

1. Generate and commit pnpm-lock.yaml after first dependency install.
2. Finalize MVP Prisma schema in controlled smaller patches.
3. Validate CI after dependency lockfile exists.
4. Continue milestone-based implementation.

## Update Rule

Update this file whenever project state changes.

Do not claim a feature is complete unless the repository contains it and it has been verified.
