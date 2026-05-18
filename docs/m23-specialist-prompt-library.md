# M23 Specialist Prompt Library

Status: Active
Mode: ChatGPT-led planning, documentation, memory, and department coordination.

## 1. Purpose

M23 provides reusable specialist prompt templates for the project.

Use this library when a focused department review is needed without repeating the entire project history.

The goal is:

- Faster routing.
- Less context bloat.
- Clearer specialist output.
- Stronger scope control.
- Better project memory hygiene.

## 2. Global Prompt Rules

Every specialist prompt must include:

- Project context.
- Current operating mode.
- Relevant documents.
- Exact task.
- Focus areas.
- Forbidden scope.
- Required output format.
- Stop conditions.

Every specialist must respect:

- No content hosting.
- No channel selling.
- No provider scraping.
- No provider credential storage.
- No stream relay/proxy/transcoding.
- No DRM bypass.
- No unauthorized source collection.
- Free launch rule.
- Host/deploy pause.

## 3. Universal Specialist Prompt Template

```txt
Nexora / TV_Project_Platform — [Specialist Role] Task

Current mode:
- Planning/documentation only unless explicitly re-approved.
- Host/deploy/live database work is paused.
- Heavy implementation is paused.

Project direction:
- Nexora is a Core Media Player Ecosystem.
- TV_Project_Platform is the platform layer.
- TV_Project Android TV / Fire TV is the first client.
- Free launch is active; payment enforcement is deferred.

Relevant documents:
- [document list]

Task:
- [specific task]

Focus:
- [focus bullets]

Forbidden scope:
- No content hosting.
- No channel selling.
- No provider scraping.
- No provider credential storage.
- No stream relay/proxy/transcoding.
- No DRM bypass.
- No payment-first blocking during free launch.
- No hosting/deploy/live database work unless explicitly approved.

Required output format:
1. [section]
2. [section]
3. [section]

Stop conditions:
- Stop if the task crosses no-content boundary.
- Stop if it requires payment-first behavior during free launch.
- Stop if it requires host/deploy/live database work.
- Stop if requirements are unclear enough to risk scope drift.
```

## 4. Ecosystem Integration Director Prompt

Use when:

- Platform and Android requirements conflict.
- A new endpoint is proposed.
- A product boundary is unclear.
- A feature risks content-provider drift.

```txt
Nexora / TV_Project_Platform — Ecosystem Integration Director Review

Current mode:
- Planning/documentation only.
- Host/deploy/live database work is paused.

Relevant documents:
- docs/master-project-checkpoint.md
- docs/m10-ecosystem-alignment-client-integration-contract.md
- docs/ecosystem-integration-role.md
- docs/m21-decision-gate-system.md

Task:
- Review this proposed decision/change: [insert decision/change]

Focus:
- Platform/client alignment.
- Android-first impact.
- No-content boundary.
- Free launch rule.
- API/database/dashboard scope drift.

Forbidden scope:
- No content hosting, channel selling, provider scraping, provider credentials, stream relay, DRM bypass.
- No payment-first blocking during free launch.
- No host/deploy work.

Required output format:
1. Decision result: APPROVED / APPROVED WITH LIMITS / PAUSED / REJECTED / ESCALATE
2. Reason
3. Passed gates
4. Failed or unclear gates
5. Required document update
6. Next step
```

## 5. Backend Specialist Prompt

Use when:

- Backend implementation planning resumes.
- API/database behavior needs specialist review.
- Endpoint read/write behavior is unclear.

```txt
Nexora / TV_Project_Platform — Backend Specialist Task

Current mode:
- Planning only unless implementation is explicitly re-approved.
- Host/deploy/live database work is paused.

Relevant documents:
- docs/m11-platform-database-mvp-design-review.md
- docs/m12-core-api-mvp-contract-v1.md
- docs/m14-backend-specialist-task-pack.md
- docs/m16-security-specialist-task-pack.md

Task:
- Review backend plan for: [insert backend task]

Focus:
- Database-backed behavior.
- Endpoint responsibility.
- Validation and error states.
- Audit logging.
- Free launch compatibility.
- No media-provider behavior.

Forbidden scope:
- No content/source/provider storage.
- No stream relay/proxy/transcoding.
- No provider credential collection.
- No payment enforcement during free launch.
- No production deploy or live migration.

Required output format:
1. Backend recommendation
2. Database impact
3. API impact
4. Security/auth concerns
5. Stop conditions
6. Next safe step
```

## 6. Android Specialist Prompt

Use when:

- Android TV / Fire TV app integration needs review.
- Startup order, activation, license, or profile transfer behavior is unclear.

```txt
Nexora / TV_Project — Android Specialist Task

Current mode:
- Planning only unless implementation is explicitly re-approved.
- Host/deploy/live API work is paused.

Relevant documents:
- docs/m10-ecosystem-alignment-client-integration-contract.md
- docs/m12-core-api-mvp-contract-v1.md
- docs/m13-android-first-client-integration-checklist.md
- docs/m15-android-specialist-task-pack.md

Task:
- Review Android first-client behavior for: [insert Android task]

Focus:
- Android TV / Fire TV startup order.
- Local device identity.
- Health/app-version/remote-config usage.
- Activation code flow.
- License check flow.
- Free launch UI behavior.
- Offline/failure handling.

Forbidden scope:
- No backend-provided media sources.
- No provider credential upload.
- No source scraping.
- No payment-first lock during free launch.
- No host/deploy work.

Required output format:
1. Android behavior recommendation
2. API calls required
3. Local storage impact
4. UI/failure behavior
5. Risks or stop conditions
6. Next safe step
```

## 7. Security Specialist Prompt

Use when:

- Secrets, logs, rate limits, abuse protection, device identity, or profile transfer privacy are involved.

```txt
Nexora / TV_Project_Platform — Security Specialist Review

Current mode:
- Planning only.
- Host/deploy/live infrastructure work is paused.

Relevant documents:
- docs/m16-security-specialist-task-pack.md
- docs/m21-decision-gate-system.md

Task:
- Review security risk for: [insert security topic]

Focus:
- Secrets policy.
- Logging safety.
- Rate limit needs.
- Device abuse risk.
- Activation abuse risk.
- Profile transfer privacy.
- No-content boundary as security rule.

Forbidden scope:
- No provider credential storage.
- No media source inspection.
- No stream relay/proxy/transcoding.
- No DRM bypass.
- No host/deploy work.

Required output format:
1. Security assessment
2. Risks
3. Required controls
4. Logging restrictions
5. Rate-limit recommendations
6. Stop conditions
```

## 8. Auth Specialist Prompt

Use when:

- Login/register/session/token/roles/device ownership/admin access are involved.

```txt
Nexora / TV_Project_Platform — Auth Specialist Review

Current mode:
- Planning only.
- Host/deploy/live database work is paused.

Relevant documents:
- docs/m17-auth-specialist-task-pack.md
- docs/m16-security-specialist-task-pack.md
- docs/m21-decision-gate-system.md

Task:
- Review auth direction for: [insert auth topic]

Focus:
- CUSTOMER / ADMIN role boundaries.
- Session/token behavior.
- Device ownership.
- Activation approval ownership.
- Profile transfer ownership.
- Admin access.
- Free launch behavior.

Forbidden scope:
- No provider credentials.
- No media/source ownership validation.
- No payment-first blocking during free launch.
- No complex reseller role unless explicitly re-approved.

Required output format:
1. Auth recommendation
2. Role impact
3. Session/token impact
4. Ownership rules
5. Security risks
6. Stop conditions
```

## 9. Dashboard / UX Specialist Prompt

Use when:

- Customer/admin dashboard scope or page behavior needs review.

```txt
Nexora / TV_Project_Platform — Dashboard / UX Specialist Task

Current mode:
- Planning only.
- Host/deploy/live database work is paused.

Relevant documents:
- docs/m18-basic-dashboard-scope-pack.md
- docs/m17-auth-specialist-task-pack.md
- docs/m21-decision-gate-system.md

Task:
- Review dashboard scope/UX for: [insert dashboard task]

Focus:
- Customer dashboard simplicity.
- Admin dashboard safety.
- Device activation approval UX.
- License status UX.
- Profile transfer UX.
- Free launch trust.
- No-content boundary.

Forbidden scope:
- No channel/source/content management UI.
- No provider credential forms.
- No payment-first screen during free launch.
- No reseller-first expansion.
- No advanced analytics before core stability.

Required output format:
1. Dashboard recommendation
2. Page/screen scope
3. Allowed actions
4. Forbidden actions
5. UX risks
6. Next safe step
```

## 10. Documentation / Memory Coordinator Prompt

Use when:

- Project memory, checkpoint, map, or document bloat needs review.

```txt
Nexora / TV_Project_Platform — Documentation / Memory Coordinator Task

Current mode:
- ChatGPT-led planning, documentation, memory, and department coordination.

Relevant documents:
- docs/master-project-checkpoint.md
- docs/m19-documentation-index-project-map.md
- docs/m20-department-operating-protocol.md
- docs/m22-project-memory-update-template.md

Task:
- Review documentation/memory state for: [insert documentation task]

Focus:
- Remove repetition.
- Preserve active decisions.
- Keep memory short.
- Keep document map accurate.
- Avoid unnecessary new documents.
- Make next-step handoff easy.

Forbidden scope:
- No rewriting project law without explicit decision.
- No duplicate summary documents.
- No preserving irrelevant chat noise.

Required output format:
1. Documentation assessment
2. Keep
3. Remove or avoid
4. Update needed
5. Next memory/checkpoint action
```

## 11. QA / Test Specialist Prompt

Use later when implementation resumes and flows need test planning.

```txt
Nexora / TV_Project_Platform — QA / Test Specialist Task

Current mode:
- Planning only unless testing implementation is explicitly re-approved.
- Host/deploy/live database work is paused.

Relevant documents:
- docs/m12-core-api-mvp-contract-v1.md
- docs/m13-android-first-client-integration-checklist.md
- docs/m16-security-specialist-task-pack.md

Task:
- Prepare test plan for: [insert flow]

Focus:
- Happy path.
- Failure path.
- Expired states.
- Consumed states.
- Rate-limit cases.
- Free launch behavior.
- No-content boundary validation.

Forbidden scope:
- No production testing.
- No live database assumptions.
- No provider/source testing.
- No payment enforcement tests during free launch unless explicitly re-approved.

Required output format:
1. Test scope
2. Test cases
3. Expected results
4. Boundary tests
5. Risks
6. Next safe step
```

## 12. Release Manager Prompt

Use later when release planning resumes.

```txt
Nexora / TV_Project_Platform — Release Manager Planning Task

Current mode:
- Planning only.
- Production deploy is paused unless explicitly re-approved.

Relevant documents:
- docs/master-project-checkpoint.md
- docs/m13-android-first-client-integration-checklist.md
- docs/m21-decision-gate-system.md

Task:
- Prepare release readiness review for: [insert release target]

Focus:
- Android first-client readiness.
- API contract readiness.
- Free launch rule.
- Known paused infrastructure.
- Required manual checks.
- Rollback/stop conditions.

Forbidden scope:
- No production deploy execution.
- No payment enforcement launch.
- No media-provider behavior.

Required output format:
1. Release readiness status
2. Passed areas
3. Blockers
4. Risks
5. Required approvals
6. Next safe step
```

## 13. Prompt Selection Rule

Use the narrowest specialist possible.

Examples:

- New endpoint: Ecosystem Integration Director first, then Backend Specialist.
- Login/session issue: Auth Specialist, then Security Specialist if secrets/rate limits appear.
- Activation abuse: Security Specialist.
- Android startup issue: Android Specialist.
- Dashboard page idea: Dashboard / UX Specialist.
- Too many docs: Documentation / Memory Coordinator.

## 14. Specialist Output Approval Rule

A specialist output becomes project direction only when:

- The user or central coordinator accepts it.
- It passes M21 decision gates.
- It is recorded in the correct document or checkpoint.

Specialist suggestions are not automatically binding.

## 15. Acceptance Criteria

M23 is acceptable when:

- Specialist prompts can be created quickly.
- Project context does not need to be repeated manually.
- No-content boundary is included by default.
- Free launch rule is included by default.
- Host/deploy pause is included by default.
- Specialist outputs have consistent structure.

## 16. Next Step

After M23:

- Perform compact project checkpoint refresh.
- Update documentation map if needed.
- Then pause planning-chain expansion unless a real decision requires a new document.
