# 09 - UI UX Bible

Compact UI/UX authority for TV Project Platform.

## UI Rule

UI must support approved web/API platform operations only.

UI must not make the product look like a provider, distribution system, catalog, marketplace, relay, playback controller, stream authority, or permanent user-profile authority.

## Product Language

Use clear platform language:

- platform access
- app access status
- software access
- subscription/access status
- device record
- device activation/status
- license/access status
- app version metadata
- remote config
- reseller credit
- payment history
- own device transfer when enabled

Avoid language implying included content, channels, streams, packages, marketplaces, provider services, playback control, or player distribution policy.

## Design Goals

UI should be:

- clean
- fast
- simple
- role-aware
- accessible
- responsive
- trustworthy
- easy to maintain
- clear about product scope

## Role-Based UI

UI must reflect backend authorization but never replace it.

Admin UI:

- platform management
- users/customers/resellers
- plans/subscriptions/payments
- devices/app versions/remote config
- audit logs

Reseller UI:

- own customers
- own credit
- own customer subscription/license/access state

Customer UI:

- own account
- own subscription/access state
- own devices
- own payment history
- optional own-device transfer

## Forbidden UI Areas

Do not build UI for:

- provider inventory
- stream source management
- channel/package management
- public marketplace
- content catalog
- broadcast schedule
- relay/CDN route management
- backend playback control
- player distribution policy
- permanent user-profile credential authority
- shared profile library
- public profile search

## UX Safety

Critical actions should be clear, confirmable, and audit-friendly:

- payment approval/rejection
- reseller credit changes
- subscription/access extension
- device block/unblock
- app version force update metadata
- remote config changes

## Copy Rule

UI copy must be honest and boundary-safe.

Payments, plans, and reseller actions must clearly relate to approved platform/software access only.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/02-user-roles.md
- project-bible/03-feature-list.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/11-marketing-bible.md
- LEGAL_SCOPE.md

## Final UI Rule

UI shows what the backend authorizes and communicates the web/API platform boundary clearly.