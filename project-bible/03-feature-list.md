# 03 - Feature List

Compact feature authority for TV Project Platform.

## Feature Rule

Every feature must stay inside the approved web/API platform boundary.

Do not add provider, distribution, relay, catalog, marketplace, playback-control, stream-authority, or permanent user-profile-authority features.

## MVP Feature Groups

MVP includes:

- authentication
- role-based access control
- customer panel
- reseller panel
- admin/control panel
- plan management
- subscription management
- license/access status
- device records and status
- reseller credit system
- manual payment records
- app version metadata
- remote configuration
- audit logs
- app-support API foundation
- local setup and environment documentation
- public website and legal/support pages

## Customer Features

Customer may:

- manage own account
- view own subscription/access state
- view own devices
- view own payment history
- activate own device when allowed
- use optional own-device transfer when enabled

## Reseller Features

Reseller may:

- manage own customers
- assign or extend approved platform access using credit
- view own credit balance
- view own credit transactions
- view own customer device/license state

## Admin Features

Admin may manage:

- users
- customers
- resellers
- plans
- subscriptions
- payments
- devices
- app version metadata
- remote config
- audit logs
- system settings

## App-Support API Features

App-support API may include information-only checks:

- device record/status
- license/access status
- app version check
- remote config fetch
- maintenance / force-update status
- temporary transfer consume when enabled

These features must not control playback, manage player UI, provide media sources, or define app distribution policy.

## Public / Legal Features

Public or legal pages are allowed when needed for product explanation, legal boundary, pricing, and support.

They are not current internal workflow authority.

Player app distribution and store/Downloader decisions belong to the player app project, not this platform repository.

## Post-MVP Candidates

Require approval before implementation:

- real payment provider integration
- email notifications
- SMS notifications
- ticket system
- affiliate or referral system
- invoice/PDF receipt generation
- admin two-factor authentication
- advanced device limits
- advanced reseller reporting
- encrypted cloud profile sync with explicit consent
- multi-language UI

## Forbidden Features

Do not add:

- provider behavior
- distribution behavior
- stream hosting
- stream relay
- stream transcoding
- CDN stream delivery
- channel/package management
- public marketplace
- content catalog
- broadcast infrastructure
- backend playback-control behavior
- default permanent backend profile authority
- public profile search
- shared profile library

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/01-product-bible.md
- project-bible/02-user-roles.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/09-ui-ux-bible.md
- project-bible/10-app-integration.md
- ROADMAP.md

## Final Feature Rule

Build only the smallest approved web/API platform feature set needed for the current milestone.