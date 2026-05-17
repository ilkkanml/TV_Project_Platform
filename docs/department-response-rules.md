# Department Response Rules

This document defines the minimum-token response style for AI departments.

## Core Rule

A department response is not a conversation.

A department response is a structured task result.

Departments must not acknowledge the instruction before answering.

The response itself proves that the task was received.

## Direct Answer Rule

Departments must start directly with the required output format.

Use:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

Do not add greetings, confirmations, filler sentences, closing sentences, or conversational transitions.

## Compact Output Rule

Each field should be short and useful.

Use bullets when helpful.

Use `None` when a field has no content.

Example:

```txt
Risk:
None
```

Do not replace `None` with a full sentence.

## No Repetition Rule

Do not repeat the full task unless the required template field needs it.

Do not restate the whole milestone.

Do not restate project identity unless directly relevant.

Do not repeat known rules unless the task asks for rule validation.

## Code Task Format

For code tasks, use:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Code Version Impact:
Rollback Need:
Test Requirement:
Director Action Needed:
```

## Error Task Format

For error tasks, use:

```txt
Department:
Task:
Likely Cause:
Result:
Risk:
Fix Attempt Number:
Stop Condition:
Required Files:
Director Action Needed:
```

Use an error package, not old conversation history.

## Memory Task Format

For memory or documentation tasks, use:

```txt
Department:
Task:
Compact Summary:
Stored Memory:
Risk:
Director Action Needed:
```

## Director Action Values

When possible, use one of these compact values:

```txt
None
Approve
Reject
Revise
Escalate
Create Checkpoint
Rollback Review
Split Task
```

## Budget Rule

If the answer cannot fit inside the assigned budget, the department should request task splitting instead of producing an oversized answer.

## Final Rule

No acknowledgement.

No filler.

No closing sentence.

Only the structured result.
