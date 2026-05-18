# M12 — Database Architect Report

## Status

REPORT ONLY / ADVISORY

## Database Result

The current Prisma schema is suitable as an early platform database foundation candidate.

It covers the expected platform-owned areas:

- Users
- Devices
- Activation sessions
- License grants
- Subscriptions
- Reseller profile
- Credit ledger entries
- Remote config
- App versions
- Playlist transfer sessions
- Payment events
- Audit logs

The schema is not yet ready for migration execution until baseline, seed, rollback, retention, and sensitive-data policies are finalized.

## Proposed Entities

Approved baseline candidate areas:

1. User/account state.
2. Device registry state.
3. Activation session state.
4. License grant state.
5. App version state.
6. Remote config state.
7. Temporary encrypted profile-transfer state.
8. Audit log state.

Future-only / guarded areas:

- Subscription/payment tables may remain placeholders.
- Payment enforcement remains inactive.
- Reseller/payment runtime behavior is not approved.

Not approved:

- Content catalog tables.
- Channel package tables.
- Stream source inventory.
- Provider credential storage.
- Permanent playlist/profile cloud sync.

## Data Ownership

Platform may own:

- Account/device/license/config/app-version records.
- Temporary transfer-session metadata.
- Audit events.

Android client remains owner of:

- Local user-authorized profile storage by default.
- Playback execution.
- Local legal source handling.

Platform must not become default source of truth for user media libraries or stream lists.

## Privacy / Retention Risks

### High Risk

`PlaylistTransferSession.encryptedPayload` is sensitive.

Before implementation, define:

- Encryption ownership.
- Key management.
- Redaction rules.
- Expiration behavior.
- One-time consume behavior.
- Deletion after consume/expiry.
- Audit logging rules.

### Medium Risk

`PaymentEvent.payloadJson` may store sensitive provider payloads in future.

Before payment work, define:

- Redaction policy.
- Minimal payload storage rules.
- Retention period.
- Legal/payment compliance review.

### Medium Risk

`RemoteConfig.valueJson` must not contain secrets, media source lists, provider credentials, executable behavior, or protected-system replacement instructions.

### Medium Risk

`AuditLog.metadata` needs redaction rules before production use.

## Migration Baseline Recommendation

Before Builder patch, define a migration plan with:

1. Baseline migration name convention.
2. Dev-only migration command.
3. Production migration approval rule.
4. Migration review checklist.
5. Rollback strategy.
6. Seed separation from migration.
7. No destructive migration without Director approval.

Recommended baseline direction:

- Use Prisma migration flow only after Director approval.
- Start with a single initial baseline migration.
- Keep seed data minimal and non-sensitive.
- Do not seed payment/provider/content records.

## Local DB Validation Path

Safe validation path candidate:

1. Start local PostgreSQL/Redis through docker compose.
2. Validate database connectivity through `DATABASE_URL` placeholder.
3. Run Prisma generate.
4. Run migration only after Director approval.
5. Confirm tables exist locally.
6. Confirm seed policy separately.

## Seed Policy Recommendation

Allowed seed candidates:

- Safe development admin placeholder if needed.
- Default remote config keys with legal-safe flags.
- App version placeholder for Android TV / Fire TV.

Not allowed in seed:

- Real user credentials.
- Real payment payloads.
- Provider credentials.
- Stream URLs.
- Channel packages.
- Bundled content.

## Rollback Recommendation

M12 should define rollback as policy before migrations run:

- Dev rollback may use reset only for local disposable DB.
- Production rollback must be manual, reviewed, and backup-aware.
- Destructive schema changes require separate Director approval.

## Retention / Deletion Recommendation

Define retention before implementation:

- Activation sessions: delete or archive after expiry window.
- Transfer sessions: delete encrypted payload after consume/expiry.
- Audit logs: retain metadata only with redaction.
- Payment events: future-only; retention requires payment compliance review.

## Blockers Before Builder Patch

BLOCKED until Director approves the next implementation task.

Builder patch should not start until:

1. Migration baseline policy is accepted.
2. Sensitive transfer-data lifecycle is accepted.
3. Seed policy is accepted.
4. Rollback policy is accepted.
5. Retention/deletion policy is accepted.
6. Legal boundary remains confirmed.

## Recommendation to Director

Proceed with M12 as planning-first.

Recommended next Director action:

Open a documentation/planning task to define:

- Migration baseline policy.
- Seed policy.
- Rollback policy.
- Retention/deletion policy.

Do not approve Prisma migration execution yet.

Do not approve payment enforcement, provider integration, content hosting, channel selling, Android bridge, or auth/session implementation.
