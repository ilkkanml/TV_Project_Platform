# 07 - Payment Bible

Compact payment authority for TV Project Platform.

## Payment Rule

Payments are for approved platform access only.

Payments must not represent provider, distribution, catalog, marketplace, content, or permanent user-profile access.

## MVP Strategy

MVP may start with manual payment records.

Manual payment approval and rejection are admin-only actions.

Approved payment effects must be applied by backend logic.

## Payment Safety

Payment system must:

- not store card data
- not store CVV
- not store full raw card payloads
- not trust frontend price values
- not trust frontend duration values
- not trust frontend discount values
- prevent duplicate processing
- track clear payment status
- audit critical payment actions

## Manual Payment Record

Manual payment records may include:

- customer_id
- plan_id
- amount
- currency
- status
- admin_note
- customer_note
- payment_reference
- reviewed_by
- reviewed_at
- created_at

## Subscription Extension

Subscription extension must be backend-authoritative.

Frontend success screens must not directly extend subscriptions.

## Real Provider Integration

Real payment provider integration requires approval.

Possible providers:

- Iyzico
- PayTR
- Stripe
- other approved provider

When integrated, webhook signatures must be verified before applying subscription effects.

## Reseller Credit Payment

Reseller credit purchases or adjustments must be admin-controlled and auditable.

Credit changes must use the reseller credit transaction model.

## Forbidden Payment Behavior

Do not create payment products for:

- provider access
- content access
- channel packages
- stream access
- playlist marketplace items
- public catalog products

## Audit Rule

Audit:

- payment creation
- payment approval
- payment rejection
- subscription extension caused by payment
- reseller credit change caused by payment

Do not log sensitive payment data.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/06-security-bible.md
- project-bible/08-reseller-bible.md
- project-bible/13-decision-log.md
- SECURITY.md

## Final Payment Rule

Payment changes platform access only after trusted backend verification.
