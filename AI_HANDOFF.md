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
- project-bible/00-project-rules.md
- project-bible directory as needed
- docs directory as needed

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

The platform manages software/player access, accounts, subscriptions, licenses, devices, payments, reseller operations, app versions, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

The product boundary is defined in README.md, LEGAL_SCOPE.md, SECURITY.md, and project-bible/00-project-rules.md.

## Current State

The project workspace is in foundation stabilization and controlled implementation preparation.

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
- Internal validation workflow direction
- Project Bible canonical tree
- development workflow rules
- department system rules
- department direct-response rules
- token economy rules
- context builder engine rules
- internal migration plan
- local setup documentation
- environment variable documentation
- CONTRIBUTING.md
- LICENSE.md

Still pending before full MVP implementation:

- pnpm-lock.yaml after first dependency install
- finalized MVP Prisma schema
- real API modules beyond health
- real dashboard implementation
- tests
- production deployment setup

## Operating Model

This project is controlled by a Director-led milestone system.

Required operating documents:

- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md

Rules:

- Owner approves major direction decisions.
- Director controls workflow and final execution order.
- Milestones control scope.
- AI Gate blocks unnecessary AI calls.
- Context Builder Engine builds the smallest useful context package.
- Departments are single-task expert calls, not permanent chat rooms.
- Departments answer only with structured output.
- Departments do not acknowledge instructions.
- Departments do not add filler text.
- Department outputs are archived.
- Accepted compact outputs become reusable memory.
- Old department conversations are not reused as default AI context.
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
- AI Gate
- Context Builder Engine
- Similar Task Cache
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should not call AI unless the Director explicitly asks for analysis.

## Department Output Format

Department output is controlled by docs/department-response-rules.md.

Default format:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

No acknowledgement.

No filler.

No closing sentence.

Only structured result.

## Token Economy Rules

Token use is controlled by docs/token-economy.md and docs/context-builder-engine.md.

Core rules:

- One task usually equals one AI call.
- AI Gate checks whether AI is needed.
- Context Builder sends only the smallest useful context.
- Full long documents are not sent by default.
- Full old conversations are not sent by default.
- Full codebase is not sent by default.
- Similar accepted answers are reused without AI.
- Large outputs must be split into approved milestones.
- Low-risk summaries should use low-cost models.
- Complex architecture, debugging, and code generation may use stronger models.

## Core Technical Stack

- pnpm monorepo
- apps/web: Next.js, React, TypeScript, Tailwind CSS
- apps/api: NestJS, TypeScript, Prisma
- packages/shared: shared types, constants, schemas, utilities
- PostgreSQL
- Redis
- Docker Compose

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

## Current Next Steps

1. Run dependency install and save the generated pnpm-lock.yaml.
2. Validate the internal build/typecheck workflow after lockfile exists.
3. Finalize MVP Prisma schema in controlled patches.
4. Continue implementation through milestones only.

## Assistant Rules

- Preserve the licensed-player-only boundary.
- Follow token economy and context builder rules.
- Do not assume missing implementation exists.
- Do not create duplicate folders.
- Do not recreate deprecated project-bible filenames.
- Do not allow direct department-to-department loops.
- Do not retry the same failing task more than three times.
- Do not deploy AI output without Director approval.
- Keep answers concise unless complete file content is requested.
