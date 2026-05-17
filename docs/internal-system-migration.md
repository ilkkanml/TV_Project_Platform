# Internal System Migration Plan

This document defines what will happen after TV Project Platform gains its own internal project memory, version control, validation, deployment, and rollback system.

This is a future migration plan.

Do not delete current files before the internal system is implemented and verified.

## Migration Goal

The long-term goal is to move project knowledge and operational control from static files into the platform's own database-backed management system.

The future internal system will manage:

- Project constitution
- Product boundary rules
- Milestones
- Department definitions
- Department outputs
- Director decisions
- Checkpoints
- Code versions
- Deployment records
- Rollback records
- Audit logs
- AI usage logs
- Environment references
- Internal validation results

## Current Rule

Until the internal system is working, all current files remain active.

No documentation file should be deleted only because it will later move into the database.

No workflow file should be removed until the internal validation workflow is ready.

No project memory file should be archived until its content has been imported and verified.

## Migration Phases

## Phase A - Internal Memory Tables

Create database tables for:

- project_memory
- project_rules
- milestones
- milestone_checkpoints
- departments
- department_outputs
- director_decisions
- code_versions
- deployments
- rollback_records
- audit_logs
- ai_usage_logs
- system_settings

Completion rule:

The internal system can store and read project rules, milestone state, department outputs, and Director decisions.

## Phase B - Document Import

Import important file content into database-backed memory.

Import sources:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- docs/development-workflow.md
- docs/department-system.md
- docs/local-setup.md
- docs/environment-variables.md
- docs/new-chat-start-message.md
- project-bible directory

Completion rule:

Imported content must be visible from the internal management panel.

## Phase C - Internal Dashboard Readiness

The internal management panel must show:

- Current project identity
- Current milestone
- Current risks
- Approved departments
- System engines
- Active rules
- Recent Director decisions
- Checkpoints
- Deployment state
- Rollback state
- AI usage summary

Completion rule:

The Owner and Director can understand project state without reading static files manually.

## Phase D - Internal Validation Replacement

The future internal system will replace external validation-only workflows with an internal validation engine.

The internal validation engine should check:

- typecheck status
- build status
- schema validity
- environment requirements
- security checklist
- product boundary checklist
- milestone completion rules
- deployment dry run
- rollback availability

Completion rule:

The internal validation engine can block unsafe deployment.

## Phase E - Archive Static Project Memory

After database import and panel verification, static project memory files may be moved to an archive area.

Archive candidates:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- docs/new-chat-start-message.md
- project-bible directory
- docs/development-workflow.md
- docs/department-system.md

These files should not be deleted immediately.

They should first be archived for traceability.

## Phase F - Keep Required Project Files

Some files should remain even after internal migration.

Keep:

- LICENSE.md
- README.md or a shortened public-facing replacement
- SECURITY.md or a shortened security policy replacement
- LEGAL_SCOPE.md or a shortened legal boundary replacement
- .env.example
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml when still used
- apps directory when still used
- packages directory when still used
- infra directory when still used

If the technical stack changes later, these files must be reviewed by milestone decision, not deleted casually.

## Phase G - Legacy Cleanup Decision

After the internal system is stable, the Director may propose a cleanup milestone.

That cleanup milestone must classify every legacy file as:

- KEEP
- SHORTEN
- IMPORTED_AND_ARCHIVED
- REMOVE_AFTER_BACKUP
- REPLACE_WITH_INTERNAL_SYSTEM_RECORD

No file should be removed without a logged Director decision.

## Files That Will Eventually Lose Active Status

These files are expected to stop being active project-control sources after successful internal migration:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- docs/new-chat-start-message.md
- project-bible directory
- docs/development-workflow.md
- docs/department-system.md

They may remain as archived references.

## Files That Should Stay Longer

These files should remain longer because they support ownership, setup, security, or real application runtime:

- LICENSE.md
- README.md
- SECURITY.md
- LEGAL_SCOPE.md
- .env.example
- docs/local-setup.md
- docs/environment-variables.md
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- apps directory
- packages directory
- infra directory

## Final Migration Rule

Do not remove the ladder before the new staircase is built.

Static files remain active until the internal database-backed system can fully replace them.

After replacement, archive first, then remove only with Director approval and audit logging.
