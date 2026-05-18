# M21 Decision Gate System

Status: Active
Mode: ChatGPT-led planning, documentation, memory, and department coordination.

## 1. Purpose

M21 defines the decision gates every new feature, document, department request, API idea, database field, dashboard page, or Android integration change must pass before it becomes part of the project.

The goal is to move fast without drifting into the wrong product.

## 2. Gate Order

Every new decision should pass these gates in order:

1. Core Ecosystem Gate.
2. No-Content Boundary Gate.
3. Free Launch Gate.
4. Android-First Gate.
5. Host/Deploy Pause Gate.
6. Security Gate.
7. Auth Gate.
8. Dashboard Scope Gate.
9. Payment/Reseller Deferral Gate.
10. Documentation Need Gate.

If a decision fails any gate, it stops until clarified or explicitly re-approved.

## 3. Core Ecosystem Gate

Question:

- Does this support Nexora as a Core Media Player Ecosystem?

Allowed:

- Account identity.
- Device activation.
- License state.
- App version policy.
- Remote config.
- Temporary encrypted profile transfer.
- Basic customer/admin platform dashboard.

Reject or pause:

- Anything that turns the project into a content service.
- Anything that makes platform/backend responsible for media ownership.
- Anything that distracts from Android TV / Fire TV first-client readiness.

## 4. No-Content Boundary Gate

Question:

- Does this avoid content-provider behavior?

Must reject:

- Content hosting.
- Broadcasting.
- Channel package selling.
- Stream relay/proxy.
- Stream transcoding.
- Provider scraping.
- Provider credential collection.
- DRM bypass.
- Unauthorized playlist/source collection.
- Backend channel/source catalog management.

Allowed:

- User-owned or legally authorized source usage on client side.
- Temporary encrypted profile transfer without backend inspection.
- Platform records that do not contain media source data.

If this gate fails, stop immediately.

## 5. Free Launch Gate

Question:

- Does this respect the free launch rule?

Current rule:

- First Android TV / Fire TV app stays free until final release level.
- Payment enforcement is not production blocking.
- Subscription absence must not block eligible early usage.

Allowed:

- License infrastructure.
- Free launch license state.
- Device/account ownership.
- Future payment placeholders if disabled and non-blocking.

Reject or pause:

- Payment-first onboarding.
- Subscription wall before app final release.
- Aggressive billing dashboard.
- Paid access requirement during free launch.

## 6. Android-First Gate

Question:

- Does this help the Android TV / Fire TV first client?

Allowed:

- Startup endpoint order.
- Device identity.
- Activation flow.
- License check.
- App version check.
- Remote config.
- Temporary encrypted profile transfer.
- Calm offline/failure behavior.

Pause:

- Future client requirements that force schema/API complexity before Android is stable.
- Web/mobile-only features that do not help first-client readiness.

## 7. Host/Deploy Pause Gate

Question:

- Does this require hosting, Railway, live database, production deploy, migration, or domain work?

Current status:

- Host/deploy/live database work is paused.

Allowed:

- Planning.
- Contracts.
- Task packs.
- Documentation.
- Mock-level design.
- Future implementation instructions.

Reject or pause:

- Railway setup.
- PostgreSQL live setup.
- Prisma migration execution.
- Production API/domain testing.
- Deployment debugging.
- Server routing.

Only resume if the user explicitly re-approves host/deploy work.

## 8. Security Gate

Question:

- Does this protect secrets, devices, transfers, logs, and abuse surfaces?

Required checks:

- No secrets in frontend.
- No secrets in repo.
- No unsafe logs.
- No profile payload logging.
- No stream/provider data in logs.
- Rate limits for abuse-prone endpoints.
- Safe activation code behavior.
- Safe profile transfer expiration/consumption.

Escalate to Security Specialist if unclear.

## 9. Auth Gate

Question:

- Does this require account, role, session, token, device ownership, or admin access?

Required checks:

- CUSTOMER / ADMIN roles remain simple.
- Activation approval requires authenticated ownership later.
- Profile transfer requires authenticated ownership context.
- Admin mutations require admin role.
- Auth never validates media/source/provider rights.

Escalate to Auth Specialist if unclear.

## 10. Dashboard Scope Gate

Question:

- Does this fit the basic dashboard scope?

Allowed customer dashboard:

- Account.
- Devices.
- Activation.
- License status.
- Profile transfer.

Allowed admin dashboard:

- Users.
- Devices.
- Licenses.
- App versions.
- Remote config.
- Audit log.

Reject or pause:

- Channel/source management.
- Provider credential UI.
- Stream URL editor.
- Billing-first UI.
- Reseller-first UI.
- Advanced analytics before core stability.

## 11. Payment/Reseller Deferral Gate

Question:

- Does this prematurely expand payment or reseller logic?

Current status:

- Payment enforcement deferred.
- Reseller panel deferred.
- Credit ledger deferred.

Allowed:

- Non-blocking future placeholders.
- Documentation of future direction.
- License states that support future paid mode later.

Pause:

- Billing portal implementation.
- Subscription enforcement.
- Reseller dashboard.
- Credit ledger workflows.
- Commission or package sales flows.

## 12. Documentation Need Gate

Question:

- Does this decision need a new document, or can it be a short checkpoint?

Create a document only if:

- It defines reusable project law.
- It controls a milestone.
- It is a specialist task pack.
- It prevents future confusion.
- It becomes a handoff source.

Do not create a document for:

- Tiny notes.
- Duplicate summaries.
- Temporary thoughts.
- Rewording existing decisions.

## 13. Decision Result Types

Every decision should end as one of these:

- APPROVED: passes all gates.
- APPROVED WITH LIMITS: allowed only under stated constraints.
- PAUSED: useful later but not now.
- REJECTED: violates project boundary.
- ESCALATE: specialist review required.

## 14. Quick Decision Template

Use this short template when evaluating a new idea:

- Decision:
- Result:
- Reason:
- Passed gates:
- Failed/unclear gates:
- Required document update:
- Next step:

## 15. Escalation Map

Escalate to Ecosystem Integration Director when:

- Platform/client conflict appears.
- New endpoint is proposed.
- No-content boundary is at risk.
- Free launch rule is at risk.

Escalate to Security Specialist when:

- Secrets, logs, rate limits, profile transfer, or abuse protection are involved.

Escalate to Auth Specialist when:

- Login, roles, sessions, tokens, device ownership, or admin access are involved.

Escalate to Dashboard Specialist when:

- Customer/admin dashboard scope changes.

Escalate to Backend or Android Specialist only when implementation planning resumes.

## 16. Stop Conditions

Stop immediately if a task asks for:

- Content hosting.
- Channel selling.
- Stream relay/proxy.
- Stream transcoding.
- Provider scraping.
- Provider credential storage.
- DRM bypass.
- Unauthorized source collection.
- Payment-first blocking during free launch.
- Host/deploy/live database work without explicit re-approval.

## 17. Acceptance Criteria

M21 is acceptable when:

- New decisions can be evaluated quickly.
- Scope drift has clear stop points.
- No-content boundary is protected.
- Free launch rule is protected.
- Android-first direction is protected.
- Host/deploy pause is respected.
- Documentation bloat is controlled.

## 18. Next Step

After M21:

- M22 Project Memory Update Template.
- M23 Specialist Prompt Library.
