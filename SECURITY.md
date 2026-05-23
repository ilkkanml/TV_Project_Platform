# Security Policy

Compact security policy for TV Project Platform.

## Security Rule

Security decisions apply to backend, frontend, database, payments, reseller operations, app-support API integration, deployment, support, and temporary transfer flows.

## Product Boundary

TV Project Platform is the web/API support platform for Nexora TV.

It must not become a provider, distribution system, relay, catalog, marketplace, playback controller, stream authority, media service, player app repository, player distribution system, or permanent user-profile authority.

Detailed boundary authority:

- LEGAL_SCOPE.md
- project-bible/00-project-rules.md
- project-bible/06-security-bible.md

## Core Principles

- Never store plain text passwords.
- Never store payment card data.
- Never commit real secrets.
- Never trust frontend-provided prices, credit values, roles, ownership, or permissions.
- Always validate input.
- Always enforce backend authorization.
- Always check ownership and resource status.
- Always audit critical actions.
- Never log sensitive data.
- Never return provider credentials, playlists, stream URLs, channel catalogs, or playback-control commands from app-support endpoints.

## Authentication

Passwords must be hashed before storage.

Password hashes must never be returned or logged.

Access tokens should be short-lived.

Refresh tokens should be protected and hashed where practical.

Disabled users must not access protected resources.

## Authorization

Every protected endpoint must check:

- authentication
- role
- ownership
- resource status
- action permission

Frontend route protection is not security.

## Sensitive Data

Do not expose or log:

- passwords
- password hashes
- payment card data
- full tokens
- secrets
- encryption keys
- provider/profile sensitive data
- webhook secrets
- database credentials

## Payments

Payment card data must not be stored.

Frontend success pages must not directly extend subscriptions or platform access.

Real payment webhooks must be verified before applying backend effects.

## Resellers

Resellers may access only own customers and related records.

Credit operations must be backend-calculated, transaction-based, and audit logged.

## Devices and Licenses

License/access checks are backend-authoritative inside approved platform scope.

Primary device identity is app_generated_device_id / installId.

Device block/status rules must be enforced server-side.

## App-Support Boundary

App-support endpoints may provide approved platform information only:

- device status
- license/access status
- app version metadata
- maintenance status
- remote config values

App-support endpoints must not control playback, provide media sources, store provider credentials by default, or manage channel/content catalogs.

## Temporary Transfer

Temporary transfer must be scoped, expiring, protected, and consumed safely.

It must not become permanent backend profile storage, provider storage, stream storage, shared profile library, public profile search, or playback-control mechanism.

## Deployment

Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.

AI may not silently deploy its own output.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/06-security-bible.md
- project-bible/12-devops-bible.md
- docs/development-workflow.md

## Final Security Rule

Trust backend authority, protect sensitive data, and keep security milestone-scoped and platform-boundary safe.