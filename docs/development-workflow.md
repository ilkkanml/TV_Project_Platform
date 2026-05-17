# Development Workflow

This file defines how TV Project Platform will be managed while the project grows.

The project uses a milestone-first workflow.

The goal is to prevent scope drift, repeated failed attempts, unnecessary token usage, and unsafe deployment behavior.

## Authority Model

Final authority belongs to the Director.

The user approves major direction changes.

AI departments do not make final product decisions.

AI departments do not talk to each other directly.

All department output returns to the Director first.

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
2. The system selects the required department.
3. The department receives only the required short context.
4. The department returns one structured answer.
5. The result is saved as department output.
6. The conversation is closed.
7. Old department messages are not reused as future API context.

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
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should use normal application logic whenever possible.

System engines should not call the AI API unless the Director explicitly asks for analysis.

## Token Budget Guard

Every AI task must have a maximum response budget.

Default limits:

- Architect: 800 tokens
- Database: 1000 tokens
- Backend: 1500 tokens
- Frontend: 1500 tokens
- QA Security: 800 tokens
- Memory Documentation: 500 tokens

Large outputs must be split into approved steps.

## Department Output Template

Every department response must follow this structure:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

Free-form long responses should be avoided.

## Sliding Context Rule

The AI context must stay small.

A task may include:

- Active milestone
- Project constitution summary
- Department role
- Current task
- Relevant decision records
- Relevant file or database excerpt
- Last error package when needed

A task must not include full old conversations by default.

## Output Archive Rule

Raw task messages may be archived for audit.

Archived messages are not automatically reused as AI context.

The reusable memory is the accepted department output, Director decision, milestone status, and checkpoint state.

## Three Fail Loop Breaker

A task may fail at most three times for the same problem.

After the third failure:

- The task is locked.
- The failure reason is recorded.
- No blind retry is allowed.
- The last successful checkpoint is identified.
- Rollback is prepared if needed.
- Director approval is required before continuing.

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

- Target path is allowed.
- Target path stays inside the project directory.
- File extension is allowed.
- Content is not empty.
- Backup can be created.
- Write permission exists.

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
- Last successful checkpoint
- Relevant code excerpt only

## Director Stop Rule

If the project direction becomes unclear, stop.

If the repository state conflicts with documentation, stop and reconcile the state first.

If a change risks the product boundary, stop and request Director review.
