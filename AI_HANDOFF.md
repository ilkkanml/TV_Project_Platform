# AI Handoff

This file is the primary handoff document for any new AI assistant or new ChatGPT conversation working on TV Project Platform.

Read this file first.

Then read:

- PROJECT_STATE.md
- README.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- docs/development-workflow.md
- docs/department-system.md
- docs/new-chat-start-message.md
- project-bible/00-project-rules.md
- project-bible directory as needed
- docs directory as needed

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

The platform manages software/player access, accounts, subscriptions, licenses, devices, payments, reseller operations, app versions, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

The platform is not a media provider, broadcast backend, channel seller, playlist marketplace, CDN, relay, transcoder, or backend source of truth for user playlist/profile data.

## Current State

The repository is in foundation stabilization and controlled implementation preparation.

Do not describe the project as empty or not started.

Confirmed foundation exists:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose local services
- Project Bible canonical tree
- docs/development-workflow.md
- docs/department-system.md
- CONTRIBUTING.md

Still pending:

- LICENSE.md
- .github/workflows CI
- finalized MVP Prisma schema
- real API modules beyond health
- real dashboard implementation
- tests
- production deployment setup

## Operating Model

This project is now controlled by a Director-led milestone system.

Required operating documents:

- docs/development-workflow.md
- docs/department-system.md

Rules:

- Owner approves major direction decisions.
- Director controls workflow and final execution order.
- Milestones control scope.
- Departments are single-task expert calls, not permanent chat rooms.
- Department outputs are archived.
- Old department conversations are not reused as default AI context.
- Accepted outputs, Director decisions, milestones, checkpoints, and code versions become reusable memory.
- Three failures on the same problem stop the loop.
- Rollback must use the last successful checkpoint when needed.
- AI output may not deploy itself.
- Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.
- AI usage should be logged and token budgets should be enforced.

## Approved AI Departments

Only these AI departments are active by default:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Departments must not talk to each other directly.

Correct pattern:

```txt
Department -> Director -> Department
```

Wrong pattern:

```txt
Department -> Department
```

## System Engines

These are deterministic system engines, not AI departments:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should not call AI unless the Director explicitly asks for analysis.

## Department Output Format

Every department output must use:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

For code tasks, also include:

```txt
Code Version Impact:
Rollback Need:
Test Requirement:
```

For error tasks, also include:

```txt
Likely Cause:
Fix Attempt Number:
Stop Condition:
```

## Token Economy Rules

- One task usually equals one AI call.
- Use the smallest useful context package.
- Do not include full old conversations by default.
- Use active milestone, project summary, department role, task, relevant decision records, and relevant file excerpts only.
- Large outputs must be split into approved milestones.
- Low-risk summaries should use low-cost models.
- Complex architecture, debugging, and code generation may use stronger models.

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

- media catalog
- channel inventory
- media distribution
- media relay
- transcoding jobs
- CDN behavior
- public playlist marketplace
- provider credential distribution
- permanent backend playlist/profile authority by default

## Core Technical Stack

- pnpm monorepo
- apps/web: Next.js, React, TypeScript, Tailwind CSS
- apps/api: NestJS, TypeScript, Prisma
- packages/shared: shared types, constants, schemas, utilities
- PostgreSQL
- Redis
- Docker Compose

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

## Current Next Steps

1. Keep handoff, state, roadmap, and project rules aligned.
2. Add LICENSE.md.
3. Add .github/workflows CI.
4. Finalize MVP Prisma schema in controlled patches.
5. Continue implementation through milestones only.

## Assistant Rules

- Preserve the licensed-player-only boundary.
- Do not assume missing implementation exists.
- Do not create duplicate folders.
- Do not recreate deprecated project-bible filenames.
- Do not allow direct department-to-department loops.
- Do not retry the same failing task more than three times.
- Do not deploy AI output without Director approval.
- Keep answers concise unless complete file content is requested.
