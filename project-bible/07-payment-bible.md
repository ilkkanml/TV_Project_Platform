# 07 - Payment Bible

This file defines the payment rules, payment flows, payment provider strategy, subscription extension rules, manual payment rules, reseller credit payment rules, webhook rules, and payment security principles for TV Project Platform.

Payments must support the licensed player platform model only.

Payments must not be used for channels, streams, playlists, content packages, broadcast access, or IPTV provider access.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Payments are for:

- Software access
- Player license access
- Subscription time
- Device activation rights
- Reseller credit
- Platform account features

Payments are not for:

- TV channels
- Live streams
- VOD streams
- Channel packages
- Playlist provider access
- Content packages
- Broadcast access
- Stream access

## Core Payment Rules

The payment system must follow these rules:

- Do not store card data.
- Do not store card numbers.
- Do not store CVV.
- Do not store full raw card payloads.
- Do not trust frontend price values.
- Do not trust frontend duration values.
- Do not trust frontend discount values.
- Do not extend subscriptions before verified payment success.
- Verify payment provider webhook signatures.
- Manual payment approvals must be admin-only.
- Payment actions should be audit logged.
- Payment status must be tracked clearly.
- Duplicate payment processing must be prevented.

## MVP Payment Strategy

The MVP may start with manual payment records.

Manual payments are useful while the platform foundation is being built.

Manual payment flow may include:

1. Customer selects a software access plan.
2. Customer submits payment request or payment proof.
3. Admin reviews the payment.
4. Admin approves or rejects the payment.
5. Approved payment extends the subscription.
6. Rejected payment does not extend the subscription.
7. Audit log records the admin decision.

Manual payments must not be described as payment for channels, streams, playlists, or content.

## Manual Payment Rules

Manual payment records should include:

- Customer ID
- Plan ID
- Amount
- Currency
- Status
- Admin note
- Customer note
- Payment reference
- Approved by
- Approved date
- Rejected by
- Rejected date
- Created date
- Updated date

Manual payment statuses may include:

- PENDING
- SUCCEEDED
- FAILED
- CANCELLED
- REFUNDED

Manual payment approval must require admin role.

Manual payment rejection must require admin role.

Manual payment approval should be audit logged.

Manual payment rejection should be audit logged.

## Future Payment Providers

Future payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Provider selection requires explicit approval before implementation.

The selected provider must support:

- Secure payment confirmation
- Webhook or callback verification
- Provider reference IDs
- Status validation
- Amount validation
- Currency validation
- Safe failure handling

## Payment Provider Rules

When a payment provider is integrated:

- Use the provider SDK or official API where possible.
- Validate payment status with the provider.
- Verify webhook signatures.
- Validate amount.
- Validate currency.
- Validate customer or order reference.
- Prevent duplicate webhook processing.
- Store provider reference IDs.
- Do not store card data.
- Do not trust browser success redirects alone.
- Do not extend subscriptions from frontend-only success state.

## Checkout Flow

Planned checkout flow:

1. User selects a plan.
2. Backend reads the plan from database.
3. Backend calculates amount and duration.
4. Backend creates payment record.
5. Backend creates provider checkout session if provider is enabled.
6. User completes payment.
7. Provider sends webhook or confirmation event.
8. Backend verifies webhook or confirmation.
9. Backend marks payment as succeeded.
10. Backend extends subscription.
11. Backend records audit log.

The frontend must not decide the final price.

The frontend must not decide subscription duration.

The frontend must not decide payment success.

## Payment Model

Recommended Payment model fields:

- id
- user_id
- plan_id
- subscription_id
- provider
- provider_reference
- amount
- currency
- status
- paid_at
- metadata
- created_at
- updated_at

Possible providers:

- MANUAL
- IYZICO
- PAYTR
- STRIPE
- OTHER

Possible statuses:

- PENDING
- SUCCEEDED
- FAILED
- CANCELLED
- REFUNDED

## Payment Security

Payment security is mandatory.

Do not store:

- Card number
- CVV
- Full card payload
- Payment provider secret
- Webhook secret in database
- Raw sensitive provider response
- Plain text sensitive customer data

Secrets must be stored in environment variables.

Webhook secrets must not be committed.

Card data must be handled by approved payment providers only.

## Webhook Rules

Payment webhook endpoints must:

- Verify provider signature.
- Validate event type.
- Validate provider reference.
- Validate payment status.
- Validate amount.
- Validate currency.
- Be idempotent.
- Avoid duplicate subscription extension.
- Log safe metadata.
- Avoid logging secrets.

Webhook processing should be safe to retry.

Duplicate webhook events must not create duplicate subscription extensions.

Duplicate webhook events must not create duplicate reseller credit additions.

## Webhook Security

Webhook security must include:

- Signature verification
- Provider reference validation
- Amount validation
- Currency validation
- Idempotency
- Safe logging
- Safe error handling
- Duplicate event prevention

Unsigned webhook payloads must never be trusted.

Invalid webhook signatures must be rejected.

## Subscription Extension Rules

Subscription extension can happen only after one of these:

- Admin-approved manual payment
- Verified provider payment success
- Valid reseller credit transaction
- Admin manual subscription action

Payment success must be verified by backend.

Frontend success pages must not extend subscriptions directly.

Subscription extension must be done through backend business logic.

Subscription extension should be audit logged.

## Pricing Rules

Plan price must come from the backend database.

Frontend must not be trusted for:

- Amount
- Currency
- Discount
- Duration
- Device limit
- Reseller credit cost
- Plan ID ownership
- Subscription extension result

The backend must calculate the payable amount.

The backend must calculate the subscription duration.

The backend must calculate the final subscription result.

## Currency Rules

Initial currency may be configured by the platform.

Possible currencies:

- TRY
- USD
- EUR
- GBP

Multi-currency support is post-MVP unless explicitly approved.

Currency must be stored with every payment record.

Amount and currency must be validated during webhook processing.

## Refund Rules

Refund support may be added later.

Refund records should not delete the original payment.

Refund behavior should include:

- Refund status
- Refund amount
- Refund reason
- Provider refund reference
- Admin note
- Created date

Refunds should be audit logged.

Refunds should not expose card data.

Refunds must not silently delete payment history.

## Reseller Credit Payments

Reseller credit may be purchased or assigned manually.

During MVP, reseller credit may be added by admin manually.

Later, reseller credit purchase may be connected to payment providers.

Rules:

- Reseller credit additions must create credit transactions.
- Payment success may trigger reseller credit addition.
- Credit addition must be transactional.
- Admin credit additions must be audit logged.
- Negative reseller balance must be prevented.
- Reseller credit must be for software/player subscription operations only.

## Reseller Credit Purchase Flow

Possible future flow:

1. Reseller selects credit package.
2. Backend calculates package price.
3. Backend creates payment record.
4. Provider checkout starts.
5. Provider sends verified payment confirmation.
6. Backend marks payment as succeeded.
7. Backend creates reseller credit transaction.
8. Backend updates reseller credit balance.
9. Backend creates audit log.

This flow is post-MVP unless explicitly approved.

## Customer Payment History

Customers should be able to view their own payment history.

Customer payment history may show:

- Payment date
- Amount
- Currency
- Status
- Plan name
- Provider
- Payment reference
- Subscription result

Customers must not see internal provider secrets.

Customers must not see other customers' payments.

Customers must not see card data.

## Admin Payment Management

Admins may:

- View payments
- Filter payments
- View payment details
- Create manual payment records
- Approve manual payments
- Reject manual payments
- View provider references
- Review failed payments
- Export payment reports later

Admin payment actions should be audit logged.

Admin users must not store or view card data.

## Reseller Payment Visibility

Resellers may have limited visibility into payment-related records for their own customers.

Resellers may view:

- Own customer subscription status
- Own customer payment status when allowed
- Own credit usage
- Own credit transactions

Resellers must not access global payment data.

Resellers must not access provider settings.

Resellers must not access payment provider secrets.

## Payment Error Codes

Payment-related API error codes may include:

- PAYMENT_PENDING
- PAYMENT_FAILED
- PAYMENT_CANCELLED
- PAYMENT_NOT_VERIFIED
- PAYMENT_ALREADY_PROCESSED
- PAYMENT_PROVIDER_ERROR
- PAYMENT_AMOUNT_MISMATCH
- PAYMENT_CURRENCY_MISMATCH
- PAYMENT_WEBHOOK_INVALID
- PAYMENT_WEBHOOK_SIGNATURE_INVALID
- PAYMENT_RECORD_NOT_FOUND
- PAYMENT_REFUND_FAILED
- PAYMENT_REFUND_NOT_ALLOWED

## Payment Audit Logs

Payment audit logs should record:

- Manual payment creation
- Manual payment approval
- Manual payment rejection
- Provider payment success
- Provider payment failure
- Subscription extension after payment
- Refund creation
- Reseller credit addition after payment

Audit logs must not include card data.

Audit logs must not include payment provider secrets.

Audit logs must not include full raw sensitive provider payloads.

## Payment Environment Variables

Possible environment variables:

- PAYMENT_PROVIDER
- PAYMENT_WEBHOOK_SECRET
- IYZICO_API_KEY
- IYZICO_SECRET_KEY
- IYZICO_BASE_URL
- PAYTR_MERCHANT_ID
- PAYTR_MERCHANT_KEY
- PAYTR_MERCHANT_SALT
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

`.env.example` must contain placeholders only.

Real secrets must never be committed.

Production secrets must be generated securely.

## Payment API Endpoints

Possible customer endpoints:

- GET /account/payments
- GET /account/payments/:id
- POST /checkout
- GET /payments/:id/status

Possible admin endpoints:

- GET /admin/payments
- GET /admin/payments/:id
- POST /admin/payments/manual
- PATCH /admin/payments/:id/approve
- PATCH /admin/payments/:id/reject
- PATCH /admin/payments/:id/refund

Possible webhook endpoints:

- POST /webhooks/iyzico
- POST /webhooks/paytr
- POST /webhooks/stripe

## Manual Payment API Rules

Manual payment APIs must follow these rules:

- Manual payment creation may be customer or admin initiated depending on MVP decision.
- Manual payment approval must be admin-only.
- Manual payment rejection must be admin-only.
- Manual payment approval must calculate subscription result on backend.
- Manual payment approval must be idempotent.
- Manual payment approval must create audit log.
- Manual payment rejection must create audit log.

## Idempotency

Payment operations must be idempotent where needed.

Idempotency is important for:

- Webhook processing
- Manual payment approval
- Subscription extension
- Refund handling
- Reseller credit addition

The same payment must not extend the same subscription multiple times.

The same payment must not add reseller credit multiple times.

The same webhook must not be processed as a new payment multiple times.

## Payment Metadata

Payment metadata may store safe extra information.

Safe metadata examples:

- Provider event ID
- Checkout session ID
- Order reference
- Failure reason code
- Admin note
- IP address
- User agent

Do not store sensitive card data in metadata.

Do not store provider secrets in metadata.

Do not store raw sensitive provider payloads in metadata.

## Failed Payments

Failed payments should be recorded.

Failed payment records may help:

- Customer support
- Admin review
- Provider debugging
- Fraud detection
- Retry handling

Failed payments must not extend subscriptions.

Failed payments must not add reseller credit.

## Cancelled Payments

Cancelled payments should not extend subscriptions.

Cancelled payments should not add reseller credit.

A cancelled payment may remain visible in customer payment history.

Cancelled payment data must not include sensitive card data.

## Pending Payments

Pending payments should not extend subscriptions.

Pending payments may remain visible until:

- Payment succeeds
- Payment fails
- Payment is cancelled
- Payment expires

Pending payment expiration rules may be defined later.

## Fraud And Abuse Prevention

Payment system should consider:

- Rate limiting checkout creation
- Webhook verification
- Duplicate payment prevention
- Manual review for suspicious activity
- Audit logs for admin approvals
- Provider-side fraud tools
- Failed payment monitoring
- Suspicious account activity review

## Reporting

Admin reporting may be added later.

Possible reports:

- Total revenue
- Successful payments
- Failed payments
- Manual payments
- Refunded payments
- Reseller credit purchases
- Monthly recurring totals
- Customer payment history

Reporting is post-MVP unless explicitly requested.

## Support Rules For Payments

Support may help with:

- Payment status
- Manual payment review
- Failed payment explanation
- Subscription extension status
- Refund policy questions
- Payment reference lookup

Support must not ask for:

- Full card number
- CVV
- Payment provider secret
- User password

Support notes must not contain card data.

## Product Language Rules

Payment pages must say that payments are for:

- Software access
- Player license access
- Subscription time
- Device activation rights
- Reseller credit

Payment pages must not say that payments are for:

- Channels
- Streams
- IPTV packages
- Playlist access
- Content packages
- Broadcast access

## MVP Payment Scope

MVP payment scope:

- Manual payment records
- Admin approval
- Admin rejection
- Customer payment history
- Subscription extension after approval
- Audit logs
- Payment status tracking

MVP does not require real payment provider integration unless approved.

## Post-MVP Payment Scope

Post-MVP payment scope may include:

- Iyzico integration
- PayTR integration
- Stripe integration
- Webhook processing
- Automatic subscription extension
- Refund processing
- Invoice generation
- PDF receipts
- Multi-currency support
- Reseller credit purchase
- Payment reports

Each post-MVP payment feature requires approval before implementation.

## Forbidden Payment Behavior

Do not implement:

- Card data storage
- CVV storage
- Plain text payment secrets
- Subscription extension from frontend success page only
- Payment success without backend verification
- Content package payments
- Channel package payments
- Stream access payments
- Playlist provider payments
- Broadcast access payments
- Payment records that imply included channels or streams

## Payment Testing Requirements

Payment tests should verify:

- Manual payment can be created.
- Manual payment can be approved by admin.
- Manual payment can be rejected by admin.
- Customer cannot approve payment.
- Reseller cannot approve payment.
- Payment approval extends subscription once.
- Payment rejection does not extend subscription.
- Payment amount comes from backend plan.
- Frontend price is ignored.
- Card data is not stored.
- Payment actions create audit logs.
- Duplicate approval does not duplicate subscription extension.

## Webhook Testing Requirements

When payment providers are added, webhook tests should verify:

- Valid signature is accepted.
- Invalid signature is rejected.
- Amount mismatch is rejected.
- Currency mismatch is rejected.
- Duplicate webhook does not duplicate subscription extension.
- Failed payment does not extend subscription.
- Successful payment extends subscription once.
- Webhook secrets are not logged.

## Stable Project Bible Link

This file is part of the stable project-bible tree:

- 00-project-rules.md
- 01-product-bible.md
- 02-user-roles.md
- 03-feature-list.md
- 04-database-bible.md
- 05-api-bible.md
- 06-security-bible.md
- 07-payment-bible.md
- 08-reseller-bible.md
- 09-ui-ux-bible.md
- 10-app-integration.md
- 11-marketing-bible.md
- 12-devops-bible.md
- 13-decision-log.md
- 14-testing-bible.md
- 15-support-bible.md
- 16-release-bible.md

Do not rename this file without approval.

Do not create conflicting alternative payment files.

## Final Rule

Payments are only for licensed player platform access.

Payments must never imply that the platform provides channels, streams, playlists, or content.

Do not store card data.

Do not extend subscriptions until payment success is verified by the backend.
