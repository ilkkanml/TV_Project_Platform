# M12 — Database Migration / Seed / Rollback / Retention Policy Draft

## Status

DRAFT / POLICY ONLY

## Purpose

This document defines the initial safe database policy direction for M12 before any implementation, Prisma migration execution, production database action, or API/database runtime work.

## Implementation Boundary

This document does not approve:

- Running Prisma migrations
- Creating production databases
- Mutating production data
- Backend/API implementation
- Android bridge implementation
- Payment enforcement
- Provider integration
- Content hosting
- Channel selling
- Stream source inventory
- Provider credential storage

## Migration Baseline Policy

### Direction

The first database migration should be treated as an explicit baseline migration after Director approval.

### Naming

Recommended naming style:

`YYYYMMDDHHMMSS_m12_initial_platform_database_baseline`

### Rules

- Migrations must be generated only after Director approval.
- Migration files must be reviewed before execution.
- No destructive migration is allowed without separate Director approval.
- Migration must preserve legal media player boundary.
- Migration must not introduce content catalog, channel package, stream inventory, or provider credential tables.
- Migration must not activate payment enforcement.

### Review Checklist

Before any migration execution:

1. Confirm active task explicitly allows migration work.
2. Confirm target environment is local/dev unless separately approved.
3. Confirm `DATABASE_URL` points to intended local/dev DB.
4. Confirm schema diff is expected.
5. Confirm no content/provider/payment enforcement tables are added outside scope.
6. Confirm rollback/reset plan exists.
7. Confirm seed policy is separate.
8. Confirm secrets are not committed.

## Local Database Validation Policy

Allowed validation target:

- Local Docker PostgreSQL only unless Director approves otherwise.

Allowed validation steps after approval:

1. Start local infra.
2. Confirm Postgres health.
3. Confirm Redis health if needed.
4. Confirm Prisma client generation.
5. Confirm local migration apply.
6. Confirm table creation.
7. Confirm no production endpoint or production DB is touched.

## Production Migration Policy

Production migration is OUT for current M12 policy draft.

Future production migration requires:

- Director approval.
- Environment confirmation.
- Backup/restore plan.
- Migration review.
- Rollback plan.
- Maintenance window decision.
- QA/release evidence if runtime behavior is affected.

## Seed Policy

### Allowed Seed Data

Safe seed candidates:

- Development-only admin placeholder if explicitly approved.
- Default legal-safe remote config keys.
- App version placeholder records for Android TV / Fire TV.
- Non-sensitive local/dev test records.

### Not Allowed Seed Data

Seeds must not include:

- Real user credentials.
- Real customer data.
- Real payment provider payloads.
- Provider credentials.
- Stream URLs.
- Channel packages.
- Bundled media/content.
- Illegal IPTV lists.
- DRM bypass or scraping data.

### Seed Execution Rule

Seed execution must be separate from migration execution.

Seed data must be clearly marked dev/local unless future Director approval expands it.

## Rollback Policy

### Local / Dev

Allowed rollback style:

- Reset disposable local DB.
- Re-run approved migration baseline.
- Re-run approved dev seed if needed.

### Production

Production rollback is not approved in current M12 scope.

Future production rollback requires:

- Backup verification.
- Manual review.
- Director approval.
- Release/QA coordination.

### Destructive Changes

Destructive schema changes require separate approval even in dev if they affect protected contract direction.

## Retention / Deletion Policy

### Activation Sessions

Recommended direction:

- Expire automatically.
- Keep minimal metadata for short audit window.
- Delete or archive expired records after defined retention window.

### Playlist Transfer Sessions

Recommended direction:

- Encrypted payload is temporary.
- Payload expires.
- Payload is one-time consumable.
- Payload must be deleted or irreversibly cleared after consume/expiry.
- Metadata may remain only if redacted and needed for audit.

### Audit Logs

Recommended direction:

- Store action, target, actor, timestamp.
- Redact sensitive payloads.
- Do not store stream URLs, provider credentials, or raw transfer payloads.

### Payment Events

Payment events are future-only.

Before payment work:

- Define minimal payload storage.
- Redaction policy.
- Retention window.
- Compliance review.

## Sensitive Data Policy

Sensitive fields include:

- Password hashes
- Transfer encrypted payload
- Payment event payloads
- Audit metadata
- Device/session identifiers

Rules:

- No raw secrets in repo.
- No provider credentials in database by default.
- No stream source list storage.
- No permanent playlist cloud sync without future Director approval.
- Transfer payload must be expiring and one-time consumable.

## Legal Boundary

The platform database must not support:

- Content hosting
- Broadcasting
- Channel selling
- Bundled streams
- Stream relay
- Unauthorized scraping
- DRM bypass
- Credential sharing
- Provider credential pooling
- Free paid-channel claims

Allowed development sources remain:

- Mock data
- Permitted test media
- Public demo media
- User-authorized legal sources
- Future licensed provider/API integrations with separate approval

## Recommended Next Step

Director may request Systems Architect or Security/Privacy review before implementation.

Builder must not start Prisma migration execution until Director opens a separate implementation task.
