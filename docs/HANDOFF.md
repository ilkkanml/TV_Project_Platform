# HANDOFF

Status: Active compatibility entrypoint

## 1. Current Handoff Summary

Nexora / TV_Project_Platform is currently in ChatGPT-led coordination mode.

Active work:

- Planning.
- Documentation.
- Project memory.
- Department coordination.
- Scope control.
- Specialist prompt routing.

Paused work:

- Hosting.
- Railway.
- Live PostgreSQL setup.
- Prisma migration execution.
- Production deployment.
- Domain/server routing.
- Heavy backend implementation.
- Heavy Android implementation.

## 2. Product Identity

Nexora is a Core Media Player Ecosystem.

Project split:

- `TV_Project_Platform`: platform layer for account, device, license, app version, remote config, temporary encrypted profile transfer, and basic dashboard operations.
- `TV_Project`: first Android TV / Fire TV client.

Android TV / Fire TV remains first-client priority.

## 3. Non-Negotiable Boundary

The platform must not become a content provider.

Forbidden:

- Content hosting.
- Broadcasting.
- Channel package selling.
- Stream relay/proxy/transcoding.
- Provider scraping.
- Provider credential collection.
- DRM bypass.
- Unauthorized source collection.
- Backend source/channel catalog management.

## 4. Free Launch Rule

The first Android TV / Fire TV app remains free until final release level.

During free launch:

- Payment enforcement is deferred.
- Payment absence must not block eligible early usage.
- Billing/reseller behavior must not become first-run blocker.

## 5. Read First For Handoff

Read in this order:

1. `docs/START_HERE.md`
2. `docs/PROJECT_MEMORY.md`
3. `docs/MILESTONE_STATUS.md`
4. `docs/NEXT_TASK.md`
5. `docs/m24-compact-project-checkpoint-refresh.md`
6. `docs/m19-documentation-index-project-map.md`
7. `docs/m21-decision-gate-system.md`

## 6. Current Planning Chain

Completed and recorded:

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

## 7. Decision Rule For Next Operator

Do not continue creating documents automatically.

Next work should be decision-driven:

- Evaluate a concrete product idea through M21 gates.
- Prepare a specialist prompt through M23 if needed.
- Update a checkpoint only when project direction changes.
- Resume implementation/host work only if explicitly re-approved.

## 8. Stop Conditions

Stop immediately if a task asks for:

- Content hosting.
- Channel selling.
- Stream relay/proxy/transcoding.
- Provider scraping.
- Provider credential storage.
- DRM bypass.
- Unauthorized source collection.
- Payment-first blocking during free launch.
- Host/deploy/live database work without explicit re-approval.

## 9. Current Handoff Result

Result: APPROVED WITH LIMITS.

Approved:

- ChatGPT-led coordination mode.
- Documentation compatibility entrypoints.
- M10-M24 planning chain.
- Department protocol.
- Decision gate system.
- Specialist prompt library.

Limits:

- No automatic new planning milestones.
- No host/deploy/live database work.
- No heavy implementation.
- No content-provider behavior.
- No payment-first behavior during free launch.
