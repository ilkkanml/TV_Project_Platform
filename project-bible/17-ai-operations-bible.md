# 17 - AI Operations Bible

Status: APPROVED

This file defines AI usage, token economy, context control, and department response rules.

## Authority

Works with:

- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- AI_HANDOFF.md
- PROJECT_STATE.md
- ROADMAP.md

## Core Rule

AI is not the default path.

Deterministic system logic must be used when AI is not required.

## AI Gate

Every task must pass AI Gate before an AI call.

AI Gate checks:

- Is AI needed?
- Can deterministic logic complete this?
- Is the task inside the active milestone?
- Is the task assigned to one department?
- Is the context small enough?
- Has the three-fail rule been reached?

If AI is not needed, no AI call is allowed.

## Context Builder

Context Builder Engine creates the smallest useful task package.

Default package:

- Project Summary
- Active Milestone
- Department Role
- Task
- Relevant Decisions
- Relevant Excerpts
- Required Output Format
- Stop Condition

Do not include by default:

- full old conversations
- full long documents
- full Bible files
- full codebase
- unrelated department outputs
- large logs without filtering

## No Full Document Context

Long documents must be stored and indexed, not sent fully.

AI receives only:

- compact summary
- relevant section summary
- exact excerpt when needed

## Similar Task Cache

Before calling AI, the system checks accepted compact outputs.

If a reliable accepted answer exists, reuse it without AI.

## Accepted Output

Every accepted department output creates:

- raw_output
- compact_output

Future AI calls use compact_output by default.

Raw output is used only when the Director requests deep review.

## Department Direct Output

Departments must not acknowledge tasks.

Departments must not add filler text.

Departments must not write greetings or closing sentences.

Departments answer only with the required structured output.

Default format:

- Department
- Task
- Result
- Risk
- Required Files
- Director Action Needed

## One Question One Department

Send a task to one department at a time.

Do not ask multiple departments the same broad question in parallel.

## Diff-Only Code Context

For code tasks, send only:

- target file path
- relevant imports
- relevant function or component
- related type definitions
- API contract when needed
- current error message when needed

Do not send the full codebase.

## Token Ledger

Every AI call should log:

- task_id
- milestone_id
- department_id
- model
- input tokens
- output tokens
- estimated cost
- context items used
- created_at

## Model Routing

Use the cheapest capable model.

Routing:

- deterministic work: no AI
- simple summary: low-cost model
- formatting cleanup: low-cost model
- checklist review: low-cost or medium model
- architecture decision: stronger model when needed
- code generation: stronger model when needed
- repeated failure analysis: stronger model with error package only

## Stop Rule

Stop before spending tokens when:

- the same task failed three times
- context is too large
- task is outside active milestone
- task is not clearly assigned
- deterministic logic can solve it
- Director approval is required but missing

## Final Rule

AI should see only what it needs for the current task.

Everything else stays stored, searchable, and outside active AI context.
