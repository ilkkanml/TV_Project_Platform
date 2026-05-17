# AI Handoff

Primary handoff document for TV Project Platform.

## Read First

- PROJECT_STATE.md
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
- project-bible directory as needed
- docs directory as needed

## Project Identity

Project name:

TV Project Platform

Product type:

Licensed player platform.

Product boundary is defined in LEGAL_SCOPE.md, SECURITY.md, and project-bible/00-project-rules.md.

## Current State

The project workspace is in cleanup and simplification before implementation.

Do not describe the project as empty or not started.

Foundation exists:

- pnpm monorepo root configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose local services
- Project Bible canonical tree
- development workflow rules
- department system rules
- department direct-response rules
- token economy rules
- context builder engine rules
- AI operations bible
- internal migration plan
- local setup documentation
- environment variable documentation
- LICENSE.md

Removed from active use:

- README.md
- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

Still pending before full MVP implementation:

- pnpm-lock.yaml after first dependency install
- finalized MVP Prisma schema
- real API modules beyond health
- real dashboard implementation
- tests
- production deployment setup

## Operating Model

This project is controlled by a Director-led milestone system.

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

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

## Approved System Engines

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

## Department Output Rule

Controlled by docs/department-response-rules.md.

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

Only structured result.

## Token Economy Rule

Controlled by:

- docs/token-economy.md
- docs/context-builder-engine.md
- project-bible/17-ai-operations-bible.md

Core rule:

AI should see only what it needs for the current task.

## Core Technical Stack

- pnpm monorepo
- apps/web: Next.js, React, TypeScript, Tailwind CSS
- apps/api: NestJS, TypeScript, Prisma
- packages/shared: shared types, constants, schemas, utilities
- PostgreSQL
- Redis
- Docker Compose

## Current Next Steps

1. Finish cleanup reference synchronization.
2. Simplify oversized Bible files.
3. Run dependency install and save pnpm-lock.yaml.
4. Continue implementation through milestones only.

## Assistant Rules

- Follow token economy and context builder rules.
- Do not assume missing implementation exists.
- Do not create duplicate folders.
- Do not allow direct department-to-department loops.
- Do not retry the same failing task more than three times.
- Do not deploy AI output without Director approval.
- Keep answers concise unless complete file content is requested.
