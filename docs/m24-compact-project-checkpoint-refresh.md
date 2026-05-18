# M24 Compact Project Checkpoint Refresh

Status: Active
Mode: Compact checkpoint after M10-M23 planning chain.

## 1. Current Project Mode

The project now operates through ChatGPT web as the main coordination workspace.

Active:

- Planning.
- Documentation.
- Project memory.
- Department coordination.
- Scope control.
- Specialist task routing.

Paused:

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

Project roles:

- `TV_Project_Platform`: platform layer for account, device, license, app version, remote config, temporary encrypted profile transfer, and basic dashboard operations.
- `TV_Project`: first Android TV / Fire TV client.

Future clients remain possible but must not disrupt Android-first readiness.

## 3. Non-Negotiable Boundary

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

- User-owned or legally authorized source usage on client side.
- Platform-level account/device/license operations.
- Safe remote config.
- App version policy.
- Temporary encrypted profile transfer without backend inspection.

## 4. Free Launch Rule

The first Android TV / Fire TV app remains free until final release level.

During free launch:

- Payment enforcement is deferred.
- Payment absence must not block eligible early usage.
- License infrastructure may exist.
- Device/account infrastructure may exist.
- Billing/reseller behavior must not become first-run blocker.

## 5. Completed Planning Chain

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

## 6. Active Control Documents

Read order for future work:

1. `docs/master-project-checkpoint.md`
2. `docs/m24-compact-project-checkpoint-refresh.md`
3. `docs/m19-documentation-index-project-map.md`
4. `docs/m21-decision-gate-system.md`
5. Relevant specialist or milestone document.

## 7. MVP Platform Scope

Approved platform MVP concepts:

- User.
- Device.
- ActivationSession.
- LicenseGrant.
- AppVersion.
- RemoteConfig.
- ProfileTransferSession.
- AuditLog.

Deferred:

- Payment enforcement.
- Billing portal.
- Reseller panel.
- Credit ledger.
- Advanced analytics.
- Support ticketing.
- Organization/team accounts.
- Media/source/channel management.

## 8. Core API Contract Scope

Approved API contract set:

- `GET /health`
- `GET /app-version`
- `GET /remote-config`
- `POST /devices/activation-sessions`
- `GET /devices/activation-sessions/:id`
- `POST /devices/activation-sessions/:id/approve`
- `POST /license/check`
- `POST /profile-transfer-sessions`
- `GET /profile-transfer-sessions/:id`
- `POST /profile-transfer-sessions/:id/consume`

These endpoints support platform behavior only, not media-provider behavior.

## 9. Android First-Client Scope

Android TV / Fire TV startup order:

1. Local boot.
2. Load/create local app-level device identity.
3. Health check.
4. App version check.
5. Remote config fetch.
6. Activation if needed.
7. Activation polling.
8. License check.
9. Free launch allowed app shell.
10. Optional temporary encrypted profile transfer.

Android must not request backend-provided media sources, provider credentials, or channel packages.

## 10. Department System

Active specialist roles:

- Ecosystem Integration Director.
- Backend Specialist.
- Android Specialist.
- Security Specialist.
- Auth Specialist.
- Dashboard / UX Specialist.
- Documentation / Memory Coordinator.
- QA / Test Specialist later.
- Release Manager later.

Departments are specialist lenses, not separate product authorities.

Specialist output becomes active only after it passes decision gates and is recorded.

## 11. Decision Gates

Every new decision must pass:

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

Decision outcomes:

- APPROVED.
- APPROVED WITH LIMITS.
- PAUSED.
- REJECTED.
- ESCALATE.

## 12. Dashboard Scope

Customer dashboard may include:

- Account.
- Devices.
- Activation approval.
- License status.
- Temporary encrypted profile transfer.

Admin dashboard may include:

- Users.
- Devices.
- Licenses.
- App versions.
- Remote config.
- Basic audit logs.

Dashboard must not include:

- Channel/source/content management.
- Provider credential forms.
- Billing-first UI during free launch.
- Reseller-first expansion.

## 13. Security/Auth Baseline

Security baseline:

- No secrets in frontend.
- No secrets in repo.
- No unsafe logs.
- No profile payload logs.
- No provider/source data in logs.
- Rate limits for activation, polling, license checks, and transfer flows.

Auth baseline:

- MVP roles: CUSTOMER and ADMIN.
- RESELLER deferred.
- Activation approval requires authenticated ownership later.
- Profile transfer requires ownership context.
- Auth never validates media/source/provider rights.

## 14. Stop Conditions

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

## 15. Current Next Best Step

Planning-chain expansion should pause unless a real decision requires a new document.

Recommended next practical actions:

1. Use the M19 document map as the main navigation file.
2. Use M21 decision gates for every new feature idea.
3. Use M23 prompt library only when a specialist review is needed.
4. Keep future updates short through M22 memory template.
5. Resume actual product planning only around a concrete next decision.

## 16. Checkpoint Result

Result: APPROVED WITH LIMITS.

Approved:

- ChatGPT-led coordination mode.
- M10-M23 planning chain.
- Compact checkpoint refresh.
- Department protocol.
- Decision gate system.
- Specialist prompt library.

Limits:

- No host/deploy/live database work.
- No heavy implementation.
- No content-provider behavior.
- No payment-first behavior during free launch.
- No unnecessary new documents without decision value.
