# 04 - Database Bible

Compact database authority for TV Project Platform.

## Database Rule

Database design must support approved platform operations only.

Do not create source-of-truth models for provider, distribution, catalog, marketplace, relay, or permanent user-profile authority behavior.

## Stack

- PostgreSQL
- Prisma
- TypeScript

Primary schema:

- apps/api/prisma/schema.prisma

## MVP Model Areas

Required model areas:

- users
- roles / permissions where needed
- sessions / tokens where needed
- plans
- subscriptions
- devices
- license checks
- resellers
- reseller credit transactions
- payments
- app versions
- remote config
- temporary transfer records when enabled
- audit logs

## Forbidden Model Areas

Do not create source-of-truth models for:

- provider inventory
- stream sources
- relay routes
- transcoding jobs
- CDN delivery
- content catalogs
- public marketplace records
- channel packages
- broadcast schedules
- permanent user-profile credential authority
- shared profile libraries
- public profile search

## Data Safety

Database must not store:

- plain text passwords
- payment card data
- secrets
- sensitive provider/profile data by default
- full tokens when hashing is practical

## Transactions

Use database transactions for critical coupled writes:

- reseller credit changes
- subscription creation or extension
- payment approval effects
- device activation when tied to license state
- temporary transfer consumption when enabled

## Audit Logs

Audit critical actions without logging sensitive data.

Audit logs should capture actor, action, target, context, and timestamp.

## Indexing Direction

Indexes should support:

- auth lookup
- user status lookup
- reseller ownership lookup
- subscription status/expiry lookup
- device identity lookup
- payment review lookup
- audit filtering

## Status Fields

Use clear status fields for records that change lifecycle state.

Avoid ambiguous boolean-only modeling when lifecycle matters.

## Migration Rule

Schema changes must be milestone-scoped.

Do not claim a model is complete until Prisma schema, relations, indexes, and usage path are verified.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/10-app-integration.md
- apps/api/prisma/schema.prisma

## Final Database Rule

Store only what the approved platform needs, protect sensitive data, and keep critical business operations transaction-safe.
