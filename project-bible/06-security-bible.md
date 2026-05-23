# 06 - Security Bible

Compact security authority for TV Project Platform.

## Security Rule

Security is mandatory across API, web panels, database, reseller operations, payments, app-support API integration, deployment, support, and temporary transfer flows.

This platform must not take responsibility for player playback, player UI, player distribution policy, provider accounts, playlist storage by default, streams, channels, or media catalogs.

## Authentication

- Passwords must be hashed.
- Plain text passwords must never be stored.
- Password hashes must never be returned or logged.
- Login/register should be rate limited.
- Disabled users must not access protected resources.
- Refresh tokens should be protected and hashed where practical.

## Authorization

Every protected backend action must check:

- authentication
- role
- ownership
- resource status
- action permission

Frontend route hiding is not security.

## Sensitive Data

Never log or expose:

- plain text passwords
- password hashes
- payment card data
- secrets
- full tokens
- sensitive provider/profile data
- encryption keys
- webhook secrets
- database credentials

## Payment Security

- Do not store card data.
- Backend verifies payment status.
- Frontend success pages must not extend subscriptions directly.
- Webhook signatures must be verified when real providers are integrated.

## Reseller Security

- Resellers access only own customers and related records.
- Credit costs are backend-calculated.
- Credit operations must be transaction-based.
- Critical credit changes must be audit logged.

## Device / License / App-Support Security

- License/access checks are backend-authoritative inside approved platform scope.
- app_generated_device_id / installId is primary device identity.
- Device block/status rules must be enforced server-side.
- App version metadata and remote config must not contain secrets.
- App-support endpoints must not return media sources, provider credentials, playlists, streams, or channel/catalog data.
- App-support endpoints must not control playback or local profile/source behavior.

## Temporary Transfer Security

Temporary transfer must be:

- user-scoped
- device-scoped when applicable
- encrypted when sensitive
- expiring
- consumable once where practical
- deleted or marked consumed after pickup

It must not become permanent backend profile storage, shared profile storage, provider storage, stream storage, or player playback control.

## Audit Logs

Audit critical actions.

Audit logs should include actor, action, target, context, and timestamp.

Audit logs must not include sensitive data.

## Deployment Security

Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.

AI may not silently deploy its own output.

## Related Authority Files

- SECURITY.md
- project-bible/00-project-rules.md
- project-bible/02-user-roles.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/10-app-integration.md
- project-bible/12-devops-bible.md

## Final Security Rule

Trust the backend, validate everything, log safely, protect app-support boundaries, and never expose sensitive data.