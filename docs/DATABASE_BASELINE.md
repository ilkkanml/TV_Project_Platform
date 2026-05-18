# Database Baseline

## Purpose

This document records the current database direction for `TV_Project_Platform`.

## Current M12 Context

Active milestone:

`M12 Platform Database Baseline & Migration Foundation`

Status:

OPEN / DIRECTOR SCOPING

M12 is database baseline and migration foundation scoping only.

M12 scope details:

- `docs/M12_DATABASE_BASELINE_SCOPE.md`

## Current State

Prisma schema exists at:

`apps/api/prisma/schema.prisma`

Database provider:

- PostgreSQL

Local infrastructure:

- PostgreSQL through `docker-compose.yml`
- Redis through `docker-compose.yml`

## Current Schema Areas

Observed schema areas:

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

## Baseline Direction

The platform database may become source of truth for:

- Account state
- Device state
- Activation session state
- License state
- App version rules
- Remote config state
- Temporary encrypted profile transfer session state
- Audit event records

The platform database must not become source of truth for:

- Content catalog
- Channel packages
- Stream source lists
- Provider credentials
- User media library by default
- Permanent playlist/profile cloud sync without future approval

## M12 Baseline Work Areas

M12 may define:

1. Prisma migration baseline policy.
2. Local development migration validation flow.
3. Migration naming/versioning policy.
4. Seed policy.
5. Rollback policy.
6. Data retention/deletion policy.
7. Sensitive temporary profile-transfer lifecycle rules.
8. Audit-log baseline expectations.
9. Database connection/service foundation plan.

## Migration Status

A Prisma schema exists.

A migration baseline was not confirmed during M11 audit.

Before database implementation:

1. Create migration baseline plan.
2. Confirm local development migration flow.
3. Confirm production migration policy.
4. Confirm seed policy.
5. Confirm rollback policy.
6. Confirm data retention/deletion policy.

## Sensitive Data Rules

Temporary profile transfer payloads must be treated as sensitive.

Before implementation, define:

- Encryption ownership
- Key management
- Redaction rules
- Expiration policy
- One-time consume behavior
- Deletion after consume/expiry
- Audit logging rules

## Payment / Subscription Rule

Subscription/payment-related schema may exist as future foundation.

Payment enforcement remains inactive until a future Director-approved milestone.

## Legal Boundary

The database must not be used to host, sell, relay, scrape, unlock, bypass, or bundle streams/channels/content.

The platform database must not become a provider credential store or platform-owned content catalog without future Director and Legal approval.

## Implementation Rule

This document is baseline documentation only.

M12 opening does not approve migrations, production database changes, API/database implementation, payment enforcement, provider integration, content hosting, or Android bridge work.
