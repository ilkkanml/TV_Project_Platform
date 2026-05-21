# 01 - Product Bible

Compact product authority for TV Project Platform.

## Product Identity

TV Project Platform is the web/API support platform for the Nexora TV Android TV / Fire TV player application.

The Android TV / Fire TV app is the player client.

The platform manages approved platform information and access state, including accounts, subscriptions, licenses, devices, reseller operations, payment records, app version rules, remote configuration, audit logs, and optional temporary encrypted web-to-device transfer.

## Product Boundary

The platform is not a provider, distributor, relay, transcoder, catalog, public marketplace, playback controller, stream authority, or permanent user-profile authority.

User profile/provider information is local-first by default.

Temporary transfer may exist only as scoped, encrypted, expiring, user-owned transfer.

## Primary Users

- Admin
- Reseller
- Customer

## Admin Scope

Admin manages platform operations:

- users
- customers
- resellers
- plans
- subscriptions
- payments
- devices
- app versions
- remote config
- audit logs
- system settings

Admin scope must stay inside platform management and must not become media/source management.

## Reseller Scope

Reseller manages own customers and approved software access operations.

Reseller may use credit for approved subscription/license actions.

Reseller must not access other reseller data.

Reseller scope must not include selling or distributing media content through the platform.

## Customer Scope

Customer manages own account, subscription, devices, payment history, and optional own-device transfer.

Customer-owned provider/profile data remains local-first.

## Product Modules

MVP modules:

- authentication
- role-based access control
- customer panel
- reseller panel
- admin panel
- plan management
- subscription management
- device activation
- license status API
- app version API
- remote config API
- reseller credit system
- manual payment records
- audit logs
- app integration foundation

## Public / Legal Pages

Public/legal pages are allowed only when they support clear product boundary and software-access messaging.

They are not the current internal workflow authority.

## App Relationship

The app is the player client.

The app should:

- own playback behavior
- own local source/profile entry behavior
- generate app_generated_device_id
- activate/register device with backend when needed
- check license/subscription/app version/remote config
- manage local profiles
- store sensitive profile data securely on device
- respect maintenance and force update rules

## Backend Relationship

Backend authority covers approved platform information and access state only.

Backend may inform the app, but it must not control playback, provide media sources, provide stream URLs, manage content catalogs, or become default permanent source for user profile/provider data.

## Payment Product Decision

Payments are for approved platform access only.

Payment card data must not be stored.

Manual payment records are acceptable for MVP.

Real provider integration requires approval.

## Reseller Product Decision

Reseller credit is platform credit.

Credit operations must be transaction-based and backend-calculated.

## Success Criteria

Product succeeds when it provides:

- clear app-support platform identity
- secure account management
- reliable subscription/license validation
- clean device activation
- safe reseller credit
- safe payment workflow
- useful admin/reseller/customer panels
- app integration readiness
- strong boundary protection

## Failure Conditions

Product fails if it becomes a provider, distribution system, public marketplace, relay, catalog, playback controller, stream authority, or permanent user-profile authority.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/02-user-roles.md
- project-bible/03-feature-list.md
- project-bible/07-payment-bible.md
- project-bible/08-reseller-bible.md
- project-bible/10-app-integration.md
- project-bible/13-decision-log.md
- project-bible/17-ai-operations-bible.md
- LEGAL_SCOPE.md
- SECURITY.md

## Final Product Rule

Keep the product focused, private, controlled, and inside the approved app-support platform boundary.