# NEXT_TASK

Status: Active compatibility entrypoint

## Current Next Task

No new planning milestone should be opened automatically.

The current next task is:

- Wait for a concrete product decision, specialist review request, or explicit implementation re-approval.

## Current Operating Rule

If the user says `devam` or `+`:

1. Do not create extra documents unless one is needed for compatibility, handoff, or a real decision.
2. Use `docs/m21-decision-gate-system.md` to evaluate the next concrete idea.
3. Director handles normal scoping, gate checks, release readiness framing, and short roadmap decisions directly.
4. Do not use extra departments for routine decisions that do not require code, patch planning, QA, legal/security/auth review, or special technical/design expertise.
5. Use `docs/m23-specialist-prompt-library.md` only if a specialist department is actually needed.
6. Keep updates short using `docs/m22-project-memory-update-template.md`.

## Department Usage Rule

Default mode:

- Director decides and summarizes directly.

Use extra departments only when one of these is true:

- Code or patch work is being planned.
- QA review is required before milestone status changes.
- Documentation update/release record is required.
- Legal/licensing risk appears.
- Security, auth, session, token, privacy, or abuse risk appears.
- Architecture, playback, Android, backend, database, release, UI/UX, or other specialist expertise is genuinely needed.
- The user explicitly asks for a department report.

Do not add department hops just to make the process look formal.

## Paused Tasks

Do not proceed with these unless explicitly re-approved:

- Railway deployment.
- Live PostgreSQL setup.
- Prisma migration execution.
- Production hosting/domain/server work.
- Heavy backend implementation.
- Heavy Android implementation.

## Safe Next Actions

Allowed next actions:

- Evaluate a new product idea through M21 gates.
- Prepare a specialist prompt from M23 only when needed.
- Update a checkpoint if project direction changes.
- Review existing documentation for consistency.
- Prepare a short roadmap decision without implementation.
- Define Director-level scope/checklists directly when no specialist is needed.

## Not Allowed As Automatic Next Task

Do not automatically start:

- New backend coding.
- New Android coding.
- Hosting setup.
- Database migration.
- Payment enforcement.
- Reseller system.
- Content/source/channel/provider features.
- Unnecessary department routing.

## Current Recommendation

Next real work should be decision-driven, not document-driven.

Recommended next prompt from user:

- A concrete product decision to evaluate.
- A department review request only when special expertise is needed.
- A roadmap priority question.
- An explicit re-approval if implementation work should resume later.
