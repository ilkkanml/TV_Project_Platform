# Development Workflow

Compact development workflow authority for TV Project Platform.

## Workflow Rule

The project is milestone-driven, Director-led, and token-conscious.

## Authority Model

- Owner approves major direction changes.
- Director controls execution order.
- Milestones control scope.
- AI departments do not make final product decisions.
- Departments do not talk directly to each other.

## Required Workflow Documents

- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- project-bible/17-ai-operations-bible.md

## Milestone System

Every project step must belong to a milestone.

A milestone should define:

- number
- name
- goal
- scope
- completion rules
- risks
- status

Allowed statuses:

- NOT_STARTED
- IN_PROGRESS
- PARTIAL
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

Do not mark a milestone PASSED unless completion rules are met.

## Department Workflow

1. Director defines task.
2. AI Gate checks whether AI is needed.
3. Context Builder creates the smallest useful package.
4. One department receives one task.
5. Department returns structured output.
6. Director accepts, rejects, revises, or escalates.
7. Accepted output becomes compact reusable memory.

## Approved AI Departments

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

## System Engines

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

System engines should use deterministic logic whenever possible.

## Three-Fail Rule

A task may fail at most three times for the same issue.

After the third failure, stop blind retry and require Director decision.

## Checkpoint Rule

Create checkpoints after meaningful successful states.

Rollback should use the latest known successful checkpoint.

## Deployment Rule

AI may propose code.

AI may not silently deploy its own code.

Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.

## Context Rule

Do not send full long docs, full old conversations, full codebase, or unrelated outputs by default.

Use compact summaries and relevant excerpts.

Detailed context rules:

- docs/token-economy.md
- docs/context-builder-engine.md
- project-bible/17-ai-operations-bible.md

## Stop Rule

Stop and reconcile before continuing if:

- project direction is unclear
- docs and actual state conflict
- product boundary is at risk
- context is too large
- task is outside active milestone

## Related Authority Files

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- project-bible/00-project-rules.md
- project-bible/13-decision-log.md
- project-bible/17-ai-operations-bible.md

## Final Workflow Rule

Move in small verified milestones, avoid loops, preserve boundary, and keep context minimal.
