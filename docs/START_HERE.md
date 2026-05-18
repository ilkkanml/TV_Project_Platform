# TV Project Platform — START HERE

## 1. Source of Truth

This repository is the Platform source-of-truth for the Nexora / TV_Project ecosystem.

Chat history is not source-of-truth. Approved project direction must be recorded in docs.

## 2. Current Work Mode

Current mode:

- ChatGPT web is the main coordination workspace.
- Planning, documentation, project memory, and department coordination are active.
- Hosting, Railway, live database setup, production deploy, and heavy implementation are paused.

This pause remains active until explicitly re-approved.

## 3. Current Product Identity

Nexora is a Core Media Player Ecosystem.

Project roles:

- `TV_Project_Platform`: platform layer for account, device, license, app version, remote config, temporary encrypted profile transfer, and basic dashboard operations.
- `TV_Project`: first Android TV / Fire TV client.

Future clients may exist later, but Android TV / Fire TV remains first-client priority.

## 4. Non-Negotiable Boundary

The platform must not become a content provider.

Forbidden:

- Content hosting.
- Broadcasting.
- Channel package selling.
- Stream relay/proxy.
- Stream transcoding.
- Provider scraping.
- Provider credential collection.
- DRM bypass.
- Unauthorized playlist/source collection.
- Backend source/channel catalog management.

Allowed:

- Account/device/license platform behavior.
- App version policy.
- Safe remote config.
- Temporary encrypted profile transfer without backend inspection.
- User-owned or legally authorized local source usage on the client side.

## 5. Free Launch Rule

The first Android TV / Fire TV app remains free until final release level.

During free launch:

- Payment enforcement is deferred.
- Payment absence must not block eligible early usage.
- Account/device/license infrastructure may exist.
- Billing/reseller behavior must not become first-run blocker.

## 6. Read First

Read in this order:

1. `docs/START_HERE.md`
2. `docs/master-project-checkpoint.md`
3. `docs/m24-compact-project-checkpoint-refresh.md`
4. `docs/m19-documentation-index-project-map.md`
5. `docs/m21-decision-gate-system.md`
6. Relevant milestone or specialist document.

## 7. Active Control Documents

Core control:

- `docs/master-project-checkpoint.md`
- `docs/m10-ecosystem-alignment-client-integration-contract.md`
- `docs/ecosystem-integration-role.md`
- `docs/m19-documentation-index-project-map.md`
- `docs/m20-department-operating-protocol.md`
- `docs/m21-decision-gate-system.md`
- `docs/m22-project-memory-update-template.md`
- `docs/m23-specialist-prompt-library.md`
- `docs/m24-compact-project-checkpoint-refresh.md`

Milestone/specialist records:

- `docs/m11-platform-database-mvp-design-review.md`
- `docs/m12-core-api-mvp-contract-v1.md`
- `docs/m13-android-first-client-integration-checklist.md`
- `docs/m14-backend-specialist-task-pack.md`
- `docs/m15-android-specialist-task-pack.md`
- `docs/m16-security-specialist-task-pack.md`
- `docs/m17-auth-specialist-task-pack.md`
- `docs/m18-basic-dashboard-scope-pack.md`

## 8. Current Runtime Truth

Current runtime/implementation truth:

- Platform repo exists.
- Web app exists.
- API app exists.
- Shared package exists.
- Prisma schema exists.
- Local infra compose exists.
- API endpoints are early/static foundation endpoints.
- Railway/API mock test experiment succeeded earlier but host/deploy work is now paused.
- Database schema exists but migration execution is not approved.
- Auth/session/token implementation is not finalized.
- Payment enforcement is not active.
- Provider integration is not approved.

## 9. Current Planning Chain

Completed planning chain:

- M10 Ecosystem Alignment and Client Integration Contract.
- M11 Platform Database MVP Design Review.
- M12 Core API MVP Contract v1.
- M13 Android First Client Integration Checklist.
- M14 Backend Specialist Task Pack.
- M15 Android Specialist Task Pack.
- M16 Security Specialist Task Pack.
- M17 Auth Specialist Task Pack.
- M18 Basic Dashboard Scope Pack.
- M19 Documentation Index / Project Map.
- M20 Department Operating Protocol.
- M21 Decision Gate System.
- M22 Project Memory Update Template.
- M23 Specialist Prompt Library.
- M24 Compact Project Checkpoint Refresh.

## 10. Required Next Step

Do not create more planning documents unless a real decision requires it.

Next safe action:

- Use M21 gates to evaluate the next concrete product decision.
- Use M23 only when a specialist department is actually needed.
- Keep updates short using M22.

No Builder implementation, hosting, database migration, or deploy work is approved yet.
