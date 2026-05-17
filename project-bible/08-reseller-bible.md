# 08 - Reseller Bible

Compact reseller authority for TV Project Platform.

## Reseller Rule

Reseller system manages approved platform access operations only.

Resellers must not sell provider access, content, channel packages, stream access, marketplace items, or permanent user-profile services.

## Reseller Scope

Reseller may:

- create own customers
- manage own customers
- assign or extend approved subscriptions
- view own customer devices
- view own customer license state
- view own credit balance
- view own credit transactions
- view own sales history

## Reseller Restrictions

Reseller must not:

- access another reseller's customers
- access global admin data
- change system-wide plans
- change payment provider settings
- change app version settings
- change remote config
- view full platform audit logs
- bypass backend credit rules

## Backend Authorization

Every reseller endpoint must check:

- authentication
- reseller role
- reseller account status
- resource ownership
- action permission

Frontend route hiding is not security.

## Credit Model

Reseller credit must be transaction-based.

A simple balance field is not enough.

Credit operations must be backend-calculated and auditable.

Credit operations should use database transactions.

## Credit Transactions

Credit transactions should capture:

- reseller_id
- transaction_type
- amount
- balance_before
- balance_after
- related_customer_id when applicable
- related_subscription_id when applicable
- created_by
- note
- created_at

## Credit Safety

Backend must prevent:

- negative balances unless explicitly approved by future decision
- frontend-provided trusted credit costs
- subscription changes without successful credit operation
- credit operation without transaction record

## Customer Ownership

Reseller-owned customers must be scoped by reseller ownership.

Cross-reseller access is forbidden.

## Audit Rule

Audit critical reseller actions:

- customer creation
- subscription assignment
- subscription extension
- credit add
- credit use
- credit refund
- manual credit adjustment
- reseller status change

Do not log sensitive data.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/02-user-roles.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/07-payment-bible.md
- project-bible/13-decision-log.md

## Final Reseller Rule

Reseller operations are ownership-scoped, backend-authoritative, transaction-based, and audit-safe.
