# Development Workflow

This file defines how TV Project Platform is managed while the project grows.

The project uses a milestone-first workflow.

The goal is to prevent scope drift, repeated failed attempts, unnecessary token usage, and unsafe deployment behavior.

## Authority Model

Final authority belongs to the Director.

The Owner approves major direction changes.

AI departments do not make final product decisions.

AI departments do not talk to each other directly.

All department output returns to the Director first.

## Required Workflow Documents

The workflow is controlled by these documents:

- docs/development-workflow.md
- docs/department-system.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md
- docs/internal-system-migration.md

## Milestone System

Every project step must belong to a milestone.

A milestone must define:

- Milestone number
- Milestone name
- Goal
- Scope
- Required departments
- Completion rules
- Risks
- Director decision
- Status

Allowed milestone statuses:

- NOT_STARTED
- IN_PROGRESS
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

No milestone may be marked PASSED unless its completion rules are met.

## Ephemeral Department Model

Departments are not permanent chat rooms.

A department is a single-use expert call.

The workflow is:

1. Director creates a task.
2. AI Gate checks whether AI is needed.
3. Context Builder Engine builds the smallest useful context.
4. The system selects one required department.
5. The department receives only the approved task package.
6. The department returns one structured answer.
7. The result is saved as department output.
8. The conversation is closed.
9. Old department messages are not reused as future AI context.

This protects cost, speed, and focus.

## Approved AI Departments

The approved AI departments are:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

No new department should be added unless the Director approves it.

## System Engines

The following are system engines, not AI departments:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Context Builder Engine
- AI Gate
- Similar Task Cache
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should use normal application logic whenever possible.

System engines should not call the AI API unless the Director explicitly asks for analysis.

## AI Gate Rule

Every task must pass AI Gate before an AI call.

AI Gate must ask:

```txt
Does this task require AI?
```

If deterministic logic can complete the task, no AI call is allowed.

No AI is needed for:

- milestone status changes
- fail count updates
- checkpoint creation
- rollback candidate lookup
- path whitelist checks
- dry run validation
- audit log writes
- code version activation
- token cost calculation

## Context Builder Rule

AI context must be built by the Context Builder Engine.

The context package must include only the smallest useful set:

- compact project summary
- active milestone summary
- department role
- task instruction
- relevant accepted decisions
- relevant section summaries
- relevant file excerpts
- error package when needed
- required output format
- stop condition

The Context Builder must not include full long documents, full old conversations, full codebase, or unrelated department outputs by default.

## Token Budget Guard

Every AI task must have input and output limits.

Default output limits:

- Architect: 800 tokens
- Database: 1000 tokens
- Backend: 1500 tokens
- Frontend: 1500 tokens
- QA Security: 800 tokens
- Memory Documentation: 500 tokens

Large outputs must be split into approved steps.

## Department Output Template

Every department response must follow the required structure from docs/department-response-rules.md.

Departments must not add acknowledgement, filler, greeting, closing, or conversational text.

Receiving the task is implied by the structured answer.

## Sliding Context Rule

The AI context must stay small.

A task may include:

- active milestone
- compact project summary
- department role
- current task
- relevant decision records
- relevant file or database excerpt
- last error package when needed

A task must not include full old conversations by default.

## Output Archive Rule

Raw task messages may be archived for audit.

Archived messages are not automatically reused as AI context.

The reusable memory is the accepted compact department output, Director decision, milestone status, and checkpoint state.

## Accepted Output Cache Rule

Every accepted department output must produce:

- raw_output archive
- compact_output active memory

Future AI calls should use compact_output by default.

Raw output is used only when the Director requests deep review.

## Similar Task Cache Rule

Before calling AI, the system checks whether a similar accepted output already exists.

If a reliable accepted answer exists, return it without an AI call.

## One Question One Department Rule

A task should go to one department at a time.

Do not send the same broad question to multiple departments in parallel.

Preferred sequence:

```txt
Architect -> Director -> Database -> Director -> Backend -> Director -> QA Security
```

Only call the next department when needed.

## Three Fail Loop Breaker

A task may fail at most three times for the same problem.

After the third failure:

- the task is locked
- the failure reason is recorded
- no blind retry is allowed
- the last successful checkpoint is identified
- rollback is prepared if needed
- Director approval is required before continuing

Rule:

```txt
3 FAIL = STOP
```

## Checkpoint Rule

A checkpoint must be created after a meaningful successful state.

A checkpoint may include:

- Milestone ID
- Description
- Related files
- Active code version IDs
- Database migration state
- Created timestamp

Rollback should use the latest known successful checkpoint.

## Code Version Vault Rule

Generated or edited code should be stored as versioned text before deployment.

Each code version should include:

- File path
- Version number
- Content
- Active flag
- Change reason
- Created timestamp
- Activated timestamp
- Deployment timestamp

Only one version of a file should be active at a time.

## No Self Deployment Rule

AI may propose code.

AI may not silently deploy its own code.

Director approval is required before deployment.

## Deployment Safety Rule

Deployment must use dry run before writing files.

Dry run must verify:

- target path is allowed
- target path stays inside the project directory
- file extension is allowed
- content is not empty
- backup can be created
- write permission exists

Only after dry run passes may the Deployment Engine write real files.

## File Path Whitelist Rule

The Deployment Engine may only write to approved application paths.

Sensitive config, secret, backup, vendor, and system files must not be writable through AI-generated deployment.

## Cost Ledger Rule

Every AI API call should be logged.

The log should include:

- Department
- Task ID
- Model
- Input tokens
- Output tokens
- Estimated cost
- Context items used
- Created timestamp

## Model Routing Rule

Use the cheapest capable model for the task.

Simple summaries and QA checks should use a low-cost model.

Architecture, complex debugging, and code generation may use a stronger model.

## Error Package Rule

When debugging, do not send the whole history.

Send a small error package:

- Active milestone
- Task ID
- File path
- Operation
- Error message
- Expected behavior
- Actual behavior
- Last successful checkpoint
- Relevant code excerpt only
- Fix attempt number
- Stop condition

## Director Stop Rule

If the project direction becomes unclear, stop.

If the project state conflicts with documentation, stop and reconcile the state first.

If a change risks the product boundary, stop and request Director review.
