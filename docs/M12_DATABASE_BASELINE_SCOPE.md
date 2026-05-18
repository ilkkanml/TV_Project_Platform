# M12 — Platform Database Baseline & Migration Foundation

## Status

OPEN / DIRECTOR SCOPING

## Purpose

M12 defines the safe database baseline and migration foundation for `TV_Project_Platform` before implementation.

This milestone is planning/scoping first.

## Scope IN

M12 may define:

- Prisma migration baseline policy
- Local PostgreSQL setup validation plan
- Migration naming/versioning policy
- Migration review checklist
- Seed policy
- Rollback policy
- Data retention/deletion policy
- Sensitive temporary profile-transfer lifecycle rules
- Audit-log baseline expectations
- Database connection/service foundation plan
- Environment variable expectations for database/Redis placeholders

## Scope OUT

M12 does not approve:

- Production database deployment
- Production database mutation
- Running real Prisma migrations
- Payment enforcement
- Provider integration
- Content hosting
- Channel selling
- Platform-owned content catalog
- Stream source storage as platform content inventory
- Android bridge implementation
- Auth/session/token implementation unless separately scoped
- Reseller/payment runtime behavior
- Public launch behavior

## Database Boundary

The platform database may become source of truth for:

- Account state
- Device state
- Activation session state
- License state
- App version rules
- Remote config state
- Temporary encrypted profile-transfer session state
- Audit event records

The platform database must not become source of truth for:

- Content catalog
- Channel packages
- Stream source lists
- Provider credentials
- User media library by default
- Permanent playlist/profile cloud sync without future Director approval

## Legal Guardrail

Nexora remains a legal Core Media Player Ecosystem.

The platform must not provide, host, sell, relay, scrape, unlock, bypass, or bundle streams/channels/content.

Allowed development sources remain:

- Mock data
- Permitted test media
- Public demo media
- User-authorized legal sources
- Future licensed provider/API integrations with separate approval

## Required Department Report

Before implementation, Database Architect should report:

1. Current Prisma schema readiness.
2. Migration baseline risk.
3. Local DB validation path.
4. Seed policy recommendation.
5. Rollback recommendation.
6. Retention/deletion recommendation.
7. Sensitive transfer-data lifecycle recommendation.
8. Audit-log baseline recommendation.
9. Blockers before Builder patch.

## Implementation Rule

No Builder patch is approved by this document.

Director must approve any implementation task separately after the Database Architect report.
