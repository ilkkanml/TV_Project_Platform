# Context Builder Engine

This document defines the Context Builder Engine.

The Context Builder Engine decides what information is allowed to enter an AI request.

Its goal is minimum token usage with enough context to complete the current task.

## Core Responsibility

Before any AI department call, the engine builds the smallest useful context package.

It decides:

- what to include
- what to exclude
- which summary to use
- which section excerpt to use
- which file excerpt to use
- whether AI is needed at all
- whether the task should be split

## AI Gate

Every task passes through AI Gate first.

AI Gate asks:

```txt
Does this task require AI?
```

No AI should be used for deterministic work such as:

- milestone status change
- fail count update
- checkpoint creation
- rollback candidate lookup
- path whitelist check
- dry run validation
- audit log write
- code version activation
- token cost calculation

AI may be used for:

- architecture reasoning
- schema design
- code generation
- complex debugging
- security review
- approved summary generation

## Context Package Order

The context package must be built in this order:

```txt
Project Compact Summary
Active Milestone Summary
Department Role
Task Instruction
Relevant Accepted Decisions
Relevant Section Summaries
Relevant File Excerpts
Error Package if needed
Required Output Format
Stop Condition
```

## No Full Document Rule

The engine must not send full long documents by default.

Do not send:

- full project-bible directory
- full long Bible files
- full documentation set
- full codebase
- full old conversation
- full raw department output archive

Use compact summaries and relevant excerpts instead.

## Section Index Rule

Long documents must be indexed into sections.

Each section should have:

```txt
section_id
document_id
title
keywords
compact_summary
full_text
last_updated_at
```

The engine should retrieve one to three relevant sections only.

## Accepted Output Cache

When a department output is accepted, store both:

```txt
raw_output
compact_output
```

Future AI calls should use `compact_output` by default.

Use `raw_output` only when the Director explicitly requests deep review.

## Similar Task Cache

Before calling AI, the engine checks whether a similar accepted answer already exists.

If a reliable cached answer exists, return it without AI.

Cache match sources:

- accepted department outputs
- Director decisions
- milestone summaries
- compact project memory
- documented rules

## Diff-Only Code Context

For code tasks, send only the smallest relevant code context.

Include:

- target file path
- relevant imports
- relevant function/component/class
- related type definitions
- API contract if needed
- current error message if any

Exclude:

- full codebase
- unrelated files
- generated output
- lockfile unless dependency resolution is the task

## ID Reference Rule

Use stable IDs instead of repeating long rule text.

Examples:

```txt
Rule Package: SECURITY_AUTH_V1
Milestone: M5_AUTH
Department: BACKEND
Checkpoint: CP_LOGIN_WORKING
```

IDs should resolve to compact summaries and full archived records internally.

## One Question One Department

A task should go to one department at a time.

Do not send the same broad question to multiple departments in parallel.

Preferred sequence:

```txt
Architect -> Director -> Database -> Director -> Backend -> Director -> QA Security
```

Only call the next department when needed.

## Explain Only If Asked

Departments should not include reasoning unless the task requires reasoning.

Default output should be compact result fields.

Detailed explanation requires explicit Director request.

## Token Alarm

If estimated context is too large, stop before calling AI.

Return:

```txt
Director Action Needed: Split Task
```

The task must be divided into smaller tasks.

## Model Routing

The engine recommends the cheapest capable model.

Suggested routing:

- deterministic action: no AI
- simple formatting: low-cost model
- compact summary: low-cost model
- checklist review: low-cost or medium model
- code generation: stronger model when needed
- architecture decision: stronger model when needed
- three-fail analysis: stronger model with error package only

## Database Recommendations

Future internal system should include:

```txt
context_packages
context_items
document_sections
memory_summaries
accepted_output_cache
similar_task_cache
ai_gate_logs
model_routing_rules
```

## Final Rule

The Context Builder Engine is the gatekeeper of AI context.

No AI department receives raw project history by default.

AI sees only what is needed for the current task.
