# M22 Project Memory Update Template

Status: Active
Mode: ChatGPT-led planning, documentation, memory, and department coordination.

## 1. Purpose

M22 defines the standard memory update format for the project.

Use this template when:

- A project checkpoint must be summarized.
- A new ChatGPT window needs compact context.
- A specialist department needs only the relevant memory.
- The user asks to record where the project stands.
- The project direction changes.

The goal is to keep memory short, useful, and decision-focused.

## 2. Memory Rule

Project memory should preserve decisions, not every conversation detail.

Keep:

- Current work mode.
- Active product direction.
- Approved boundaries.
- Active milestones.
- Key completed records.
- Paused work.
- Deferred work.
- Next recommended step.

Do not over-preserve:

- Small wording changes.
- Temporary thoughts.
- Repeated explanations.
- Old debugging details that are no longer active.
- Abandoned options unless they affect future decisions.

## 3. Compact Memory Format

Use this format for fast context transfer:

```txt
Project: Nexora / TV_Project_Platform
Mode: ChatGPT-led planning, documentation, memory, and department coordination
Host/Deploy: Paused
Primary Boundary: No content hosting, no channel selling, no provider scraping, no backend stream relay
Free Launch: Android TV / Fire TV remains free until final release level
First Client: TV_Project Android TV / Fire TV
Platform Role: Account, device, license, app version, remote config, temporary encrypted profile transfer
Current Chain: M10-M22 planning/checkpoint system
Next Step: [insert next milestone]
```

## 4. Full Memory Update Template

Use this when a fuller handoff is needed:

```txt
PROJECT MEMORY UPDATE

Project:
- Nexora / TV_Project_Platform

Current Mode:
- ChatGPT web is the main coordination workspace.
- Planning, documentation, memory, and department coordination are active.
- Hosting, Railway, live database, production deploy, and heavy implementation are paused.

Core Product Direction:
- Nexora is a Core Media Player Ecosystem.
- TV_Project_Platform is the platform layer.
- TV_Project Android TV / Fire TV is the first client.

Non-Negotiable Boundary:
- No content hosting.
- No broadcasting.
- No channel package selling.
- No stream relay/proxy/transcoding.
- No provider scraping.
- No provider credential collection.
- No DRM bypass.
- No unauthorized source collection.

Free Launch Rule:
- Android TV / Fire TV app remains free until final release level.
- Payment enforcement is disabled/deferred.
- License/account/device infrastructure may exist, but payment absence must not block eligible early usage.

Active Documents:
- master-project-checkpoint.md
- m10-ecosystem-alignment-client-integration-contract.md
- ecosystem-integration-role.md
- m11-platform-database-mvp-design-review.md
- m12-core-api-mvp-contract-v1.md
- m13-android-first-client-integration-checklist.md
- m14-backend-specialist-task-pack.md
- m15-android-specialist-task-pack.md
- m16-security-specialist-task-pack.md
- m17-auth-specialist-task-pack.md
- m18-basic-dashboard-scope-pack.md
- m19-documentation-index-project-map.md
- m20-department-operating-protocol.md
- m21-decision-gate-system.md
- m22-project-memory-update-template.md

Completed Planning Chain:
- M10 Ecosystem alignment.
- M11 Database MVP design.
- M12 Core API MVP contract.
- M13 Android first-client checklist.
- M14 Backend task pack.
- M15 Android task pack.
- M16 Security task pack.
- M17 Auth task pack.
- M18 Dashboard scope pack.
- M19 Documentation index.
- M20 Department operating protocol.
- M21 Decision gate system.
- M22 Memory update template.

Paused Work:
- Railway deployment.
- Live PostgreSQL setup.
- Prisma migration execution.
- Production hosting/domain/server work.
- Heavy backend implementation.
- Heavy Android implementation.

Deferred Work:
- Payment enforcement.
- Billing portal.
- Reseller panel.
- Credit ledger.
- Advanced analytics.
- Support tickets.
- Organization/team accounts.
- Media/source/channel management.

Decision Gates:
- Core Ecosystem Gate.
- No-Content Boundary Gate.
- Free Launch Gate.
- Android-First Gate.
- Host/Deploy Pause Gate.
- Security Gate.
- Auth Gate.
- Dashboard Scope Gate.
- Payment/Reseller Deferral Gate.
- Documentation Need Gate.

Next Recommended Step:
- [insert next milestone]
```

## 5. Specialist Department Memory Format

Use this shorter format when sending work to a department:

```txt
Context:
- Nexora / TV_Project_Platform is a Core Media Player Ecosystem.
- Current mode is planning only unless explicitly re-approved.
- Host/deploy/live database work is paused.
- Android TV / Fire TV is the first client.
- Free launch is active; payment enforcement is deferred.
- No content hosting, channel selling, provider scraping, provider credentials, stream relay, or DRM bypass.

Relevant Documents:
- [list only the documents this department needs]

Task:
- [specific task]

Output Required:
- [format]

Stop Conditions:
- Stop if the request crosses no-content boundary, payment-first behavior, or host/deploy pause.
```

## 6. Checkpoint Update Format

Use this after a completed milestone:

```txt
CHECKPOINT UPDATE

Milestone:
- [name]

Result:
- APPROVED / APPROVED WITH LIMITS / PAUSED / REJECTED / ESCALATE

What changed:
- [short list]

Approved:
- [short list]

Paused:
- [short list]

Deferred:
- [short list]

Controlling document:
- [file]

Next step:
- [next action]
```

## 7. Decision Update Format

Use this when a single decision is made:

```txt
DECISION UPDATE

Decision:
- [decision]

Result:
- APPROVED / APPROVED WITH LIMITS / PAUSED / REJECTED / ESCALATE

Reason:
- [short reason]

Passed gates:
- [gate list]

Failed/unclear gates:
- [gate list or none]

Document update needed:
- yes/no + file

Next step:
- [next action]
```

## 8. What Not To Put In Memory

Do not put these in project memory unless they directly affect a future decision:

- Repeated chat confirmations.
- Temporary debugging attempts.
- Full terminal logs.
- Full API responses already recorded elsewhere.
- Old host/deploy experiments now paused.
- Personal frustration notes.
- Duplicate copies of the same rule.

## 9. Priority Memory Items

Highest priority memory items:

1. Host/deploy pause.
2. No-content boundary.
3. Free launch rule.
4. Android-first direction.
5. Platform/client separation.
6. Active document map.
7. Decision gate system.
8. Specialist department protocol.

## 10. Memory Update Trigger

Update memory when:

- Work mode changes.
- A major milestone is added.
- A boundary changes.
- A paused item becomes active again.
- A deferred item becomes active.
- A specialist output becomes approved project direction.

Do not update memory for every small chat exchange.

## 11. Acceptance Criteria

M22 is acceptable when:

- New context can be transferred quickly.
- Specialist departments receive only relevant memory.
- Project memory stays short and decision-focused.
- Host/deploy pause is preserved.
- No-content boundary is preserved.
- Free launch rule is preserved.
- Android-first direction is preserved.

## 12. Next Step

After M22:

- M23 Specialist Prompt Library.
- Then perform a compact project checkpoint refresh.
