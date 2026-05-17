# Internal System Migration Plan

Future migration plan for moving project memory, validation, deployment, and rollback control into the platform's own internal system.

## Current Decision

This is a future migration plan.

Public/static helper files that are no longer useful may be removed by Director decision.

Core project memory files stay until their content is imported, replaced, or intentionally simplified.

## Migration Goal

Move project knowledge and operational control from static files into a database-backed management system.

The future internal system will manage:

- project constitution
- product boundary rules
- milestones
- department definitions
- department outputs
- Director decisions
- checkpoints
- code versions
- deployment records
- rollback records
- audit logs
- AI usage logs
- environment references
- internal validation results

## Current Active Static Memory

Active memory/control files:

- AI_HANDOFF.md
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

Removed from active use:

- README.md
- CONTRIBUTING.md
- CHANGELOG.md
- docs/new-chat-start-message.md
- .github/workflows/ci.yml

## Phase A - Internal Memory Tables

Create database tables for:

- project_memory
- project_rules
- document_sections
- memory_summaries
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
- context_packages
- context_items
- accepted_output_cache
- similar_task_cache
- ai_gate_logs
- model_routing_rules
- system_settings

Completion rule:

The internal system can store and read project rules, milestone state, department outputs, context packages, and Director decisions.

## Phase B - Document Import

Import useful static file content into database-backed memory.

Import sources:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md
- docs/local-setup.md
- docs/environment-variables.md
- project-bible directory

Removed files should not be imported unless needed for history.

Completion rule:

Imported content must be visible from the internal management panel.

## Phase C - Internal Dashboard Readiness

The internal management panel must show:

- current project identity
- current milestone
- current risks
- approved departments
- system engines
- active rules
- recent Director decisions
- checkpoints
- deployment state
- rollback state
- AI usage summary

Completion rule:

Owner and Director can understand project state without reading static files manually.

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

After database import and panel verification, static project memory files may be archived.

Archive candidates:

- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md
- project-bible directory
- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md

Archive first when traceability matters.

Delete only after Director decision.

## Phase F - Keep Required Runtime / Ownership Files

Keep unless a later milestone replaces them:

- LICENSE.md
- SECURITY.md or shortened replacement
- LEGAL_SCOPE.md or shortened replacement
- .env.example
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml when still used
- apps directory
- packages directory
- infra directory

## Phase G - Legacy Cleanup Decision

After the internal system is stable, the Director may propose cleanup.

Each legacy file must be classified as:

- KEEP
- SHORTEN
- IMPORTED_AND_ARCHIVED
- REMOVE_AFTER_BACKUP
- REPLACE_WITH_INTERNAL_SYSTEM_RECORD

## Final Migration Rule

Do not remove project memory before it is replaced, imported, or intentionally simplified.

After replacement, archive first when useful, then remove only with Director approval and audit logging.
