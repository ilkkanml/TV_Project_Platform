# Department System

This file defines the department operating model for TV Project Platform.

The goal is to keep the project professional, controlled, low-cost, loop-resistant, and easy to continue in future sessions.

## Core Principle

Departments are not permanent chat rooms.

Departments are single-task expert calls.

Each department receives a limited context package, produces one structured output, and then closes.

Old department conversations are not reused as future AI context by default.

Accepted outputs, Director decisions, milestone state, checkpoint state, and code version references become the reusable memory.

## Authority Hierarchy

```txt
Owner / Founder
    |
    v
Director
    |
    v
Milestone Controller
    |
    v
AI Departments
    |
    v
Department Output Archive
    |
    v
Project Memory / Checkpoints / Code Versions
```

## Owner / Founder

The Owner is the final business authority.

The Owner approves major direction decisions.

The Owner can stop, redirect, or override the project direction.

The Owner does not need coding knowledge.

The system must guide the Owner step by step.

## Director

The Director is the central project manager.

The Director:

- Maintains the big picture.
- Preserves product boundaries.
- Selects the next milestone.
- Chooses the required department.
- Prepares the task package.
- Reviews department output.
- Approves or rejects the result.
- Decides when to create checkpoints.
- Decides when to deploy.
- Stops loops after repeated failures.

Only the Director coordinates between departments.

Departments must not talk to each other directly.

## Milestone Controller

The Milestone Controller is a system engine.

It is not an AI department.

It tracks:

- Active milestone
- Milestone scope
- Completion rules
- Status
- Required departments
- Fail counts
- Checkpoints
- Lock state

Allowed milestone statuses:

- NOT_STARTED
- IN_PROGRESS
- WAITING_APPROVAL
- PASSED
- FAILED
- LOCKED

No new milestone starts before the active milestone is closed, locked, or explicitly paused by the Director.

## Approved AI Departments

Only these departments are approved for the initial system:

1. Architect
2. Database
3. Backend
4. Frontend
5. QA Security
6. Memory Documentation

No other department is active by default.

Future departments require Director approval.

## Architect Department

Purpose:

The Architect protects structure and scope.

Responsibilities:

- Validate system architecture.
- Check folder structure.
- Check module boundaries.
- Prevent unnecessary complexity.
- Prevent scope drift.
- Identify missing foundation pieces.
- Review cross-module impact.

Allowed context:

- Active milestone
- Project constitution summary
- Relevant file tree
- Relevant architecture docs
- Current problem statement

Forbidden behavior:

- Writing long implementation code by default
- Expanding scope without approval
- Creating new departments without approval

Default token budget:

```txt
800 output tokens
```

## Database Department

Purpose:

The Database department designs and protects data structure.

Responsibilities:

- Define tables.
- Define relationships.
- Define indexes.
- Define version records.
- Define checkpoint records.
- Define audit records.
- Define AI usage logs.
- Protect rollback and history integrity.

Allowed context:

- Active milestone
- Relevant table list
- Relevant schema excerpt
- Required data behavior
- Current migration or SQL task

Forbidden behavior:

- Changing product direction
- Designing UI
- Calling deployment safe without QA

Default token budget:

```txt
1000 output tokens
```

## Backend Department

Purpose:

The Backend department builds application logic.

Responsibilities:

- Login and session logic
- API endpoints
- OpenAI API connection
- Streaming response logic
- Code version vault logic
- Deployment engine logic
- Rollback engine logic
- Server-side authorization
- Input validation

Allowed context:

- Active milestone
- Relevant backend file excerpts
- Database contract
- Security requirements
- Specific endpoint or function task

Forbidden behavior:

- Trusting frontend values for sensitive decisions
- Writing outside approved paths
- Deploying without Director approval
- Returning sensitive secrets in output

Default token budget:

```txt
1500 output tokens
```

## Frontend Department

Purpose:

The Frontend department builds user-facing screens.

Responsibilities:

- Login screen
- Dashboard shell
- Department task screen
- Milestone screen
- Code version screen
- Deployment and rollback controls
- Streaming answer display
- Clear non-technical guidance for the Owner

Allowed context:

- Active milestone
- Relevant UI file excerpts
- Required screen behavior
- API contract summary
- Design constraints

Forbidden behavior:

- Making security decisions in the browser
- Hiding backend authorization gaps with UI only
- Adding heavy UI complexity without approval

Default token budget:

```txt
1500 output tokens
```

## QA Security Department

Purpose:

The QA Security department checks correctness, safety, and release readiness.

Responsibilities:

- Test milestone completion.
- Review login protection.
- Review authorization logic.
- Review deployment safety.
- Review rollback safety.
- Review path whitelist behavior.
- Review repeated errors.
- Decide whether a task is safe to pass.

Allowed context:

- Active milestone
- Completion rules
- Error package
- Relevant file excerpts
- Deployment dry run output
- Last checkpoint summary

Forbidden behavior:

- Blind retries
- Expanding implementation scope
- Approving deployment without required evidence

Default token budget:

```txt
800 output tokens
```

## Memory Documentation Department

Purpose:

The Memory Documentation department keeps project knowledge concise and reusable.

Responsibilities:

- Create milestone summaries.
- Update handoff records.
- Convert department output into reusable memory.
- Keep future chat startup instructions short.
- Prevent context bloat.
- Record decisions without long conversation history.

Allowed context:

- Active milestone
- Accepted department outputs
- Director decisions
- Checkpoint summaries
- Changed files

Forbidden behavior:

- Reusing full raw conversation as active AI context
- Creating duplicate documentation structures
- Changing product decisions without approval

Default token budget:

```txt
500 output tokens
```

## System Engines

System engines perform deterministic application work.

They are not AI agents by default.

Approved system engines:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should use PHP and MySQL application logic when this system is implemented under the private project folder.

## Department Task Lifecycle

Every department task follows this lifecycle:

1. Director creates task.
2. Task is linked to active milestone.
3. Required department is selected.
4. Context package is built.
5. Token budget is assigned.
6. AI response is streamed if using OpenAI API.
7. Department output is saved.
8. Director reviews output.
9. Output is accepted, rejected, or sent for one revision.
10. Accepted output becomes reusable memory.
11. Raw task conversation is archived but not reused as context by default.

## Required Department Output Format

Every department must answer in this format:

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

## Context Package Standard

A department receives only the smallest useful context.

Default context package:

- Project identity summary
- Active milestone
- Department role
- Task instruction
- Relevant decision records
- Relevant file or database excerpt
- Error package when needed

Context must not include:

- Full old chat history
- Unrelated department outputs
- Entire repository by default
- Long documentation dumps when a short summary is enough

## Knowledge Types

The system separates knowledge into these types:

### Project Constitution

Permanent rules and product boundaries.

### Milestone State

Current phase, scope, completion rules, and status.

### Department Output

One-task result from a department.

### Director Decision

Accepted, rejected, changed, paused, or locked decision.

### Checkpoint

Known good project state.

### Code Version

Versioned text representation of a file.

### Deployment Log

Record of what was written, when, by which version, and why.

### Audit Log

Security and administrative action record.

### AI Usage Log

Cost and token usage record.

## Interdepartment Communication Rule

Departments do not communicate directly.

Wrong pattern:

```txt
Backend -> Database -> Frontend -> QA
```

Correct pattern:

```txt
Database -> Director -> Backend
Backend -> Director -> QA
Frontend -> Director -> QA
QA -> Director -> Checkpoint Manager
```

This prevents uncontrolled loops and token waste.

## Three Fail Rule

A task may fail three times for the same issue.

After the third failure:

- Task status becomes LOCKED_AFTER_3_FAILS.
- No blind retry is allowed.
- Last error is saved.
- Last successful checkpoint is identified.
- Director must decide rollback, redesign, or manual inspection.

Rule:

```txt
3 FAIL = STOP
```

## Escalation Rules

Escalation path:

```txt
Department failure 1 -> same department may revise
Department failure 2 -> QA Security reviews error package
Department failure 3 -> task locks and Director reviews checkpoint rollback
Architecture conflict -> Architect review
Security conflict -> QA Security review
Database conflict -> Database review
Deployment conflict -> Deployment Engine dry run only
```

## Checkpoint Rules

Create checkpoints after successful important states:

- Database foundation created
- Login works
- Dashboard works
- Department task flow works
- OpenAI stream works
- Code version vault works
- Deployment dry run works
- Rollback works
- Milestone passes QA

A checkpoint should know which code versions are active.

## Deployment Rules

AI-generated code must not deploy itself.

Deployment requires:

- Director approval
- Active code version
- Dry run passed
- Path whitelist passed
- Backup or checkpoint available
- Audit log record

## Rollback Rules

Rollback must restore a known good state.

Rollback may use:

- Previous active code version
- Checkpoint file map
- Physical backup
- Database version state

Rollback must be logged.

## Token Economy Rules

- One task should usually equal one AI call.
- Old department messages are not reused by default.
- Accepted output becomes compact memory.
- Large tasks are split into milestones.
- Low-risk summaries use low-cost models.
- High-risk architecture, debugging, and code generation may use stronger models.
- Every AI call should be logged.

## Default Model Routing

Model routing should be configurable.

Suggested routing:

- Memory Documentation: low-cost model
- QA Security simple review: low-cost model
- Architect: stronger model when architecture risk is high
- Backend code generation: stronger model
- Database design: stronger model when schema risk is high
- Frontend simple UI changes: medium or low-cost model

## Permission Scope Summary

Architect sees structure and decisions.

Database sees schema and data rules.

Backend sees backend code and API contracts.

Frontend sees UI files and API summaries.

QA Security sees error packages, test results, and relevant excerpts.

Memory Documentation sees accepted outputs and decisions.

No department sees everything by default.

## Final Rule

Director controls the workflow.

Milestones control the scope.

Departments produce single-use expert outputs.

System engines enforce safety.

Database memory preserves continuity.

Token usage is intentional, logged, and minimized.
