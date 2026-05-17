# 14 - Testing Bible

Compact testing authority for TV Project Platform.

## Testing Rule

Testing must verify approved platform behavior and prevent boundary drift.

Tests must not assume provider, distribution, catalog, marketplace, relay, or permanent user-profile-authority behavior exists.

## MVP Test Areas

MVP testing should cover:

- authentication
- backend authorization
- role permissions
- ownership checks
- subscription lifecycle
- license status
- device activation/status
- reseller credit transactions
- manual payment records
- app version rules
- remote config
- audit logs
- temporary transfer when enabled
- UI boundary-safe copy

## Security Tests

Test that:

- passwords are not exposed
- sensitive data is not logged
- protected endpoints require auth
- role checks are enforced server-side
- ownership boundaries cannot be bypassed
- frontend values are not trusted

## Reseller Tests

Test that:

- reseller sees only own customers
- credit operations are backend-calculated
- negative balance is prevented unless approved later
- subscription changes and credit use stay transaction-safe
- credit history is recorded

## Payment Tests

Test that:

- manual payment approval is admin-only
- rejected payment does not extend subscription
- subscription extension happens through backend logic
- duplicate processing is prevented where applicable
- no card data is stored

## Device / App Tests

Test that:

- app_generated_device_id is primary identity
- license status is backend-authoritative
- blocked devices are rejected
- app version and remote config rules work
- temporary transfer expires and consumes safely when enabled

## Forbidden Behavior Tests

Testing should catch accidental creation of forbidden areas such as:

- provider inventory
- stream URL endpoints
- channel/package management
- public marketplace
- content catalog
- relay/transcoding/CDN behavior
- permanent user-profile credential authority

## Validation Direction

Validation is internal-first.

External CI workflow has been removed from active use.

Until internal validation exists, use local/manual validation commands and record failures as compact error packages.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/02-user-roles.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/10-app-integration.md
- project-bible/12-devops-bible.md
- project-bible/16-release-bible.md

## Final Testing Rule

A milestone does not pass until critical behavior, security, ownership, and boundary rules are verified.
