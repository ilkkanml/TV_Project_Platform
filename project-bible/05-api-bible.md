# 05 - API Bible

Compact API authority for TV Project Platform.

## API Rule

The API must support approved platform operations only.

The API may provide approved app-support information to the Nexora TV app.

Do not expose provider, distribution, relay, catalog, marketplace, playback-control, stream-authority, or permanent user-profile-authority behavior.

## Stack

- NestJS
- TypeScript
- Prisma
- MySQL / MariaDB-compatible local database
- Redis when needed
- DTO validation
- server-side authorization
- standard error/response handling

API app path:

- apps/api

## MVP Modules

API modules may include:

- auth
- users
- plans
- subscriptions
- devices
- licenses
- resellers
- payments
- app versions
- remote config
- temporary transfer when enabled
- audit logs
- health

## App-Facing Endpoints

App-facing API may support information-only checks:

- device activation/status
- heartbeat when needed
- license/access status
- app version check
- remote config
- maintenance / force-update status
- temporary transfer consume when enabled

These endpoints must not provide media content, provider catalogs, stream lists, channel packages, or playback-control commands.

## Web Panel Endpoints

Web panel API may support:

- account/session operations
- customer dashboard
- reseller dashboard
- admin dashboard
- plan/subscription management
- reseller credit operations
- payment record management
- device management
- app version management
- remote config management
- audit log review

Web panel endpoints must stay inside platform management and must not become source/media management.

## Authorization Rule

Every protected endpoint must check:

- authentication
- role
- ownership
- resource status
- action permission

Frontend values must not be trusted for pricing, roles, ownership, subscription duration, reseller credit, or payment approval.

## Response Rule

Use predictable API response and error shapes.

Do not leak sensitive internals in errors.

Backend responses should inform the app, not take over app playback or local source/profile behavior.

## Forbidden API Areas

Do not create endpoints for:

- provider inventory
- stream URLs as platform catalog data
- relay routes
- transcoding jobs
- CDN delivery
- channel/package management
- public marketplace
- content catalogs
- broadcast schedules
- backend playback-control commands
- permanent user-profile credential authority
- public profile search
- shared profile library

## Security Rule

Validate input.

Authorize server-side.

Audit critical actions.

Never return password hashes, secrets, sensitive provider/profile data, tokens, or payment card data.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/02-user-roles.md
- project-bible/04-database-bible.md
- project-bible/06-security-bible.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/10-app-integration.md
- apps/api

## Final API Rule

The API is the backend authority for approved platform access information, not a provider, distribution backend, media catalog, or playback controller.
