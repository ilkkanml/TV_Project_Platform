# Token Economy and Context Optimization

This document defines how TV Project Platform minimizes AI token usage.

The goal is to keep AI calls small, predictable, cheap, and useful.

## Core Rule

Stored information does not cost tokens.

Information costs tokens only when it is sent to an AI model as context.

Therefore, large project files, long Bible documents, archived conversations, and full code files must not be sent to AI by default.

## No Full Bible Context Rule

Never send the full project-bible directory to an AI department by default.

Never send a full long Bible file when only one section is needed.

Use this order instead:

1. Compact project summary
2. Active milestone summary
3. Department role
4. Current task
5. Relevant decision records
6. Relevant section excerpt only
7. Relevant file excerpt only
8. Error package when needed

## Context Layers

The system must separate knowledge into layers.

### Layer 1 - Permanent Archive

Full source documents and raw records.

Examples:

- Full Bible files
- Full documentation files
- Raw department outputs
- Raw task conversations
- Full historical audit records
- Full code versions

Default AI context:

```txt
Do not include.
```

### Layer 2 - Compact Memory

Short summaries approved by the Director.

Examples:

- project_constitution_summary
- active_milestone_summary
- department_scope_summary
- latest_director_decisions
- current_risk_summary

Default AI context:

```txt
Include when relevant.
```

### Layer 3 - Indexed Sections

Searchable sections extracted from long documents.

Examples:

- Security rules for auth
- Database rules for reseller credit
- Deployment rules for rollback
- UI rules for dashboard screens

Default AI context:

```txt
Include only the matching sections.
```

### Layer 4 - Task Package

The smallest useful package for the current task.

Default AI context:

```txt
Always include.
```

## Department Context Budget

Every department receives a maximum context budget.

Default input budget targets:

- Architect: 1200 input tokens
- Database: 1500 input tokens
- Backend: 1800 input tokens
- Frontend: 1800 input tokens
- QA Security: 1200 input tokens
- Memory Documentation: 900 input tokens

Default output budget targets:

- Architect: 800 output tokens
- Database: 1000 output tokens
- Backend: 1500 output tokens
- Frontend: 1500 output tokens
- QA Security: 800 output tokens
- Memory Documentation: 500 output tokens

If a task needs more context, split the task into smaller milestone tasks.

## Department Context Package

A department should receive this structure:

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

A department should not receive:

- Full conversation history
- Full project Bible
- Full repository tree
- Full unrelated files
- Multiple departments' old raw outputs
- Large logs without filtering
- Multiple failed attempts without a compact error summary

## Error Package Rule

When debugging, send only an error package.

Error package structure:

```txt
Active Milestone:
Task ID:
Department:
Fix Attempt Number:
File Path:
Operation:
Error Message:
Expected Behavior:
Actual Behavior:
Last Successful Checkpoint:
Relevant Code Excerpt:
Stop Condition:
```

Do not send the full old conversation.

Do not send every previous failed patch.

Summarize previous failed attempts in 3 to 8 bullet points.

## Output Compression Rule

Every accepted department output should be converted into compact reusable memory.

Store:

- Full raw output in archive
- Compact accepted summary in active memory
- Director decision separately
- Related milestone ID
- Related files
- Related code version IDs

Future AI calls should use the compact accepted summary, not the full raw output.

## Sliding Context Rule

If conversational context is needed, use only the smallest recent window.

Default:

```txt
Last 10 to 15 relevant messages only.
```

For department tasks:

```txt
No raw conversation by default.
```

For debugging:

```txt
Use error package, not conversation history.
```

## Large File Rule

Large files must be sectioned before AI use.

A large file should be stored as:

- full_content
- compact_summary
- section_index
- section_summaries
- searchable_keywords
- last_updated_at

AI should receive only:

- compact_summary
- one to three matching sections
- exact relevant code excerpt when needed

## Code Context Rule

Do not send full codebase to AI.

For code tasks, send:

- file path
- relevant imports
- relevant function/class/component
- related type definitions
- API contract if needed
- current error if any

Do not send unrelated files.

Do not send generated build output.

Do not send dependency lockfile unless the task is dependency resolution.

## Retrieval Rule

Before building AI context, the system should retrieve relevant records using:

- milestone_id
- department_id
- file_path
- rule_category
- keyword search
- section tags
- latest accepted decision
- latest successful checkpoint

The system should rank relevant items and include only the smallest useful set.

## Token Ledger Rule

Every AI call should be logged.

Log fields:

- task_id
- milestone_id
- department_id
- model
- input_tokens
- output_tokens
- estimated_cost
- context_items_used
- created_at

The Director should be able to see which departments use the most tokens.

## Cost Guard Rule

Before sending an AI request, the system should check:

- Is AI needed?
- Can deterministic logic answer this?
- Is the context too large?
- Can the task be split?
- Is the department correct?
- Is this a repeated failed attempt?
- Has the three-fail rule been reached?

If AI is not needed, do not call AI.

## Deterministic First Rule

Use normal application logic instead of AI when possible.

No AI needed for:

- milestone status changes
- fail count increments
- checkpoint creation
- rollback state lookup
- deployment dry run checks
- path whitelist checks
- audit log writes
- token cost calculations
- exact file version activation

AI may be used for:

- architecture reasoning
- code generation
- difficult debugging
- security review
- summary generation when approved
- documentation rewriting when approved

## Summary Refresh Rule

Do not summarize after every message automatically.

Summaries are created only when:

- A department output is accepted
- A milestone changes status
- A checkpoint is created
- A Director decision changes project direction
- A long document is imported
- A handoff snapshot is requested

## Model Routing Rule

Use cheaper capable models for low-risk work.

Suggested routing:

- deterministic system action: no AI
- simple summary: low-cost model
- formatting cleanup: low-cost model
- QA checklist review: low-cost or medium model
- database schema design: stronger model when needed
- backend code generation: stronger model when needed
- architecture decision: stronger model when needed
- repeated failure analysis: stronger model, but only through error package

## Stop Conditions

Stop and do not spend more tokens when:

- The same task failed three times
- The required context is too large
- The task is outside the active milestone
- The task is not clearly assigned to one department
- The project boundary is at risk
- A deterministic engine can solve it without AI
- The Director has not approved a risky action

## Database Design Recommendation

Future internal system should include these token-related tables or fields:

```txt
ai_usage_logs
context_items
memory_summaries
document_sections
department_outputs.compact_summary
department_outputs.raw_output_archive
milestones.compact_summary
project_rules.compact_summary
```

## Final Rule

The AI should see only what it needs to complete the current task.

Everything else stays stored, searchable, and available, but outside the active AI context.
