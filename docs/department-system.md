# Department System

This file defines the department operating model for TV Project Platform.

The goal is a controlled, low-cost, loop-resistant project workflow.

## Required Companion Rules

This file must be used with:

- docs/development-workflow.md
- docs/department-response-rules.md
- docs/token-economy.md
- docs/context-builder-engine.md

## Core Principle

Departments are not permanent chat rooms.

Departments are single-task expert calls.

Each department receives a limited task package, produces one structured output, and closes.

Old department conversations are not reused as future AI context by default.

Accepted compact outputs, Director decisions, milestone state, checkpoint state, and code version references become reusable memory.

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
AI Gate
    |
    v
Context Builder Engine
    |
    v
AI Department
    |
    v
Department Output Archive
    |
    v
Compact Project Memory / Checkpoints / Code Versions
```

## Owner / Founder

The Owner is the final business authority.

The Owner approves major direction decisions.

The Owner can stop, redirect, or override the project direction.

## Director

The Director is the central project manager.

The Director:

- maintains the big picture
- preserves product boundaries
- selects the next milestone
- chooses the required department
- approves the task package
- reviews department output
- accepts, rejects, or escalates results
- decides when to checkpoint
- decides when to deploy
- stops loops after repeated failures

Only the Director coordinates between departments.

Departments must not talk to each other directly.

## Approved AI Departments

Only these departments are active by default:

1. Architect
2. Database
3. Backend
4. Frontend
5. QA Security
6. Memory Documentation

Future departments require Director approval.

## Approved System Engines

These are system engines, not AI departments:

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

System engines should use deterministic application logic whenever possible.

System engines should not call AI unless the Director explicitly asks for analysis.

## AI Gate

Every task must pass AI Gate before an AI call.

If deterministic logic can complete the task, no AI call is allowed.

No AI is needed for:

- milestone status updates
- fail count updates
- checkpoint creation
- rollback candidate lookup
- path whitelist checks
- dry run validation
- audit log writes
- code version activation
- token cost calculation

## Context Builder Engine

Before any AI department call, Context Builder Engine creates the smallest useful task package.

Default task package:

```txt
Project Summary:
Active Milestone:
Department Role:
Task:
Relevant Decisions:
Relevant Excerpts:
Required Output Format:
Stop Condition:
```

Do not include by default:

- full old chat history
- full long documents
- full project-bible directory
- full codebase
- unrelated department outputs
- large logs without filtering

## Architect Department

Purpose:

Protect structure, scope, and long-term architecture.

Responsibilities:

- validate architecture
- check module boundaries
- prevent scope drift
- identify missing foundation pieces
- review cross-module impact

Allowed context:

- active milestone summary
- project constitution summary
- relevant structure excerpt
- relevant architecture notes
- current problem statement

Default output budget:

```txt
800 tokens
```

## Database Department

Purpose:

Design and protect data structure.

Responsibilities:

- define tables
- define relationships
- define indexes
- define version records
- define checkpoint records
- define audit records
- define AI usage logs

Allowed context:

- active milestone summary
- relevant schema excerpt
- required data behavior
- current migration or SQL task

Default output budget:

```txt
1000 tokens
```

## Backend Department

Purpose:

Build application logic.

Responsibilities:

- API endpoints
- auth/session logic
- AI API connection
- streaming response logic
- code version vault logic
- deployment engine logic
- rollback engine logic
- server-side authorization
- input validation

Allowed context:

- active milestone summary
- relevant backend excerpt
- database contract
- security requirement summary
- specific endpoint or function task

Default output budget:

```txt
1500 tokens
```

## Frontend Department

Purpose:

Build user-facing screens and workflows.

Responsibilities:

- login screen
- dashboard shell
- department task screen
- milestone screen
- code version screen
- deployment and rollback controls
- streaming answer display

Allowed context:

- active milestone summary
- relevant UI excerpt
- required screen behavior
- API contract summary
- design constraints

Default output budget:

```txt
1500 tokens
```

## QA Security Department

Purpose:

Check correctness, safety, and release readiness.

Responsibilities:

- test milestone completion
- review auth protection
- review authorization logic
- review deployment safety
- review rollback safety
- review path whitelist behavior
- review repeated errors

Allowed context:

- active milestone summary
- completion rules
- error package
- relevant file excerpts
- dry run output
- last checkpoint summary

Default output budget:

```txt
800 tokens
```

## Memory Documentation Department

Purpose:

Keep project knowledge compact and reusable.

Responsibilities:

- create milestone summaries
- convert accepted outputs into compact memory
- prevent context bloat
- record decisions without long conversation history

Allowed context:

- active milestone summary
- accepted compact outputs
- Director decisions
- checkpoint summaries
- changed files

Default output budget:

```txt
500 tokens
```

## Department Task Lifecycle

1. Director creates task.
2. Task is linked to active milestone.
3. AI Gate decides whether AI is needed.
4. Similar Task Cache checks for reusable accepted output.
5. Context Builder creates minimal task package.
6. One department is selected.
7. Token budget is assigned.
8. Department returns one structured output.
9. Output is saved.
10. Director reviews output.
11. Accepted output becomes compact reusable memory.
12. Raw task output is archived but not reused by default.

## Required Department Output

Departments must follow docs/department-response-rules.md.

Departments must not include acknowledgement, filler, greetings, closings, or conversational transitions.

Default format:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

## One Question One Department

A task should go to one department at a time.

Do not send the same broad question to multiple departments in parallel.

Preferred sequence:

```txt
Architect -> Director -> Database -> Director -> Backend -> Director -> QA Security
```

## Interdepartment Communication Rule

Departments do not communicate directly.

Wrong:

```txt
Backend -> Database -> Frontend -> QA
```

Correct:

```txt
Backend -> Director -> QA
Database -> Director -> Backend
Frontend -> Director -> QA
```

## Three Fail Rule

A task may fail three times for the same issue.

After the third failure:

- task status becomes LOCKED_AFTER_3_FAILS
- no blind retry is allowed
- last error is saved
- last successful checkpoint is identified
- Director decides rollback, redesign, or manual inspection

Rule:

```txt
3 FAIL = STOP
```

## Checkpoint Rules

Create checkpoints after successful important states:

- database foundation created
- login works
- dashboard works
- department task flow works
- AI stream works
- code version vault works
- deployment dry run works
- rollback works
- milestone passes QA

## Deployment Rules

AI-generated code must not deploy itself.

Deployment requires:

- Director approval
- active code version
- dry run passed
- path whitelist passed
- backup or checkpoint available
- audit log record

## Rollback Rules

Rollback must restore a known good state.

Rollback may use:

- previous active code version
- checkpoint file map
- physical backup
- database version state

Rollback must be logged.

## Permission Scope Summary

Architect sees structure and decisions.

Database sees schema and data rules.

Backend sees backend code and API contracts.

Frontend sees UI files and API summaries.

QA Security sees error packages, test results, and relevant excerpts.

Memory Documentation sees accepted compact outputs and decisions.

No department sees everything by default.

## Final Rule

Director controls workflow.

Milestones control scope.

AI Gate prevents unnecessary AI calls.

Context Builder minimizes context.

Departments produce single-use structured outputs.

Database memory preserves continuity.

Token usage is intentional, logged, and minimized.
