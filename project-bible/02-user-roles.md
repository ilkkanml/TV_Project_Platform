# 02 - User Roles

Compact role and permission authority for TV Project Platform.

## Core Rule

Every protected action must be checked on the backend.

Frontend route hiding is not security.

## Primary Roles

- Admin
- Reseller
- Customer

## Admin

Admin manages platform-wide operations:

- users
- customers
- resellers
- plans
- subscriptions
- payments
- devices
- app versions
- remote config
- system settings
- audit logs

Admin actions must still be authenticated, authorized, validated, and audit logged when critical.

## Reseller

Reseller manages only own customers and related platform access operations.

Reseller may:

- create own customers
- view own customers
- assign or extend approved subscriptions through credit
- view own credit balance and transactions
- view own customer device/license state

Reseller must not access other reseller data.

## Customer

Customer manages only own account and own platform access state.

Customer may:

- view own subscription
- view own devices
- view own payment history
- activate own device when allowed
- use optional own-device transfer when enabled

Customer must not access admin or reseller resources.

## Backend Authorization Checks

Protected backend endpoints must check:

- authentication
- role
- ownership
- resource status
- action permission

Role alone is not enough.

## Ownership Rules

- Admin: global platform scope when allowed.
- Reseller: reseller-owned scope only.
- Customer: self-owned scope only.

Cross-reseller access is forbidden.

Cross-customer access is forbidden unless explicitly admin-authorized.

## Shared Constants

Roles must be defined once in shared package and reused across API and web where practical.

Do not create conflicting role strings.

## Audit Rule

Critical role and ownership actions must be audit logged.

Sensitive data must not be logged.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/06-security-bible.md
- project-bible/08-reseller-bible.md
- project-bible/13-decision-log.md
- SECURITY.md

## Final Role Rule

Backend decides access. UI only reflects access.
