# New Chat Start Message

Use this message when starting a new ChatGPT session for TV Project Platform.

Copy the section below and paste it into the new chat.

---

## Message To Paste Into New Chat

We are continuing the GitHub repository:

https://github.com/ilkkanml/TV_Project_Platform

Project name:

TV Project Platform

Product type:

Licensed IPTV Player Platform

Before doing anything, read and respect these files:

- AI_HANDOFF.md
- PROJECT_STATE.md
- README.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- docs/development-workflow.md
- docs/department-system.md
- project-bible/00-project-rules.md
- project-bible directory as needed
- docs directory as needed

## Current Operating Model

This project uses a Director-led milestone system.

Rules:

- Owner approves major direction changes.
- Director controls execution order.
- Milestones control scope.
- AI departments are single-task expert calls.
- Departments do not talk directly to each other.
- Old department conversations are not reused as default AI context.
- Accepted department output becomes compact reusable memory.
- Three failed attempts on the same issue stop the task.
- Last successful checkpoint must be used before risky retry or rollback.
- AI output may not deploy itself.
- Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.
- Token usage must be budgeted and minimized.

## Approved AI Departments

Only these AI departments are active by default:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Departments answer once, in a structured format, then close.

## Approved System Engines

These are deterministic system engines, not AI departments:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should not call AI unless the Director explicitly asks for analysis.

## Required Department Output Format

Every department must answer with:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

For code tasks, add:

```txt
Code Version Impact:
Rollback Need:
Test Requirement:
```

For error tasks, add:

```txt
Likely Cause:
Fix Attempt Number:
Stop Condition:
```

## Project Identity

TV Project Platform is a licensed player platform.

It manages software/player access, accounts, subscriptions, licenses, devices, payments, reseller operations, app version control, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

It must not become a media provider, broadcast backend, CDN, relay, transcoder, catalog seller, public playlist marketplace, or default permanent profile authority.

## Allowed Backend Scope

The backend may manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscriptions
- Player licenses
- Device activation
- Payment records
- Reseller accounts
- Reseller credit transactions
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary encrypted web-to-device profile transfer

## Forbidden Backend Scope

The backend must not add:

- Media catalog features
- Channel inventory features
- Media delivery features
- Relay/transcoding features
- CDN behavior
- Public playlist marketplace features
- Provider credential distribution
- Default permanent backend playlist/profile authority

## Core Decisions

Do not change these without explicit Owner approval:

- Licensed-player-only product model
- Backend is not the source of truth for user playlist/profile data by default
- User profile credentials are local-first in the app by default
- App-generated device ID is the primary device identity
- Reseller credit operations are transaction-based
- Role-based access control is mandatory
- Payment card data is not stored
- Plain text passwords are not stored
- License checks are backend-authoritative
- Manual-first payment MVP
- pnpm monorepo
- Next.js web app
- NestJS API app
- Prisma PostgreSQL backend

## Technical Stack

The planned stack is:

- pnpm monorepo
- Next.js
- React
- TypeScript
- Tailwind CSS
- NestJS
- Prisma
- PostgreSQL
- Redis
- Docker Compose

## Current Repository Reality

Do not say implementation has not started.

The repository already has foundation code:

- apps/web skeleton
- apps/api skeleton
- packages/shared skeleton
- Prisma early schema
- API health endpoint
- Web landing shell
- Docker Compose services
- Department workflow docs
- Milestone workflow docs

Still not complete:

- LICENSE.md
- CI workflow
- finalized MVP schema
- real API modules beyond health
- real dashboards
- tests
- production deployment

## Repository Safety Rules

Do not redefine the product.

Do not restart the architecture.

Do not rename canonical files unless approved.

Do not create duplicate nested folders.

Wrong examples:

- project-bible/project-bible
- docs/docs
- apps/apps
- packages/packages

Do not continue blindly if the real repository tree differs from PROJECT_STATE.md.

If repository state and docs conflict, stop and reconcile state first.

## Final Instruction

Continue from the current repository state.

Use the milestone system.

Use departments only as single-task expert calls.

Keep context small.

Protect the product boundary.

First stabilize, then implement.
