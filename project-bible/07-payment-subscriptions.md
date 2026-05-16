# 07 - Payment Bible

This file defines the payment rules, payment flows, provider strategy, and payment security principles for TV Project Platform.

Payments must support the licensed player platform model only.

Payments must not be used for channels, streams, playlists, or content packages.

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

## Core Payment Rules

The payment system must follow these rules:

- Do not store card data.
- Do not store card numbers.
- Do not store CVV.
- Do not store full raw card payloads.
- Do not trust frontend price values.
- Do not trust frontend duration values.
- Do not extend subscriptions before verified payment success.
- Verify payment provider webhook signatures.
- Manual payment approvals must be admin-only.
- Payment actions should be audit logged.
- Payment status must be tracked clearly.

## MVP Payment Strategy

The MVP may start with manual payment records.

Manual payments are useful while the product foundation is being built.

Manual payment flow may include:

- Customer selects plan.
- Customer submits payment request or proof.
- Admin reviews payment.
- Admin approves or rejects payment.
- Approved payment extends the subscription.
- Rejected payment does not extend the subscription.
- Audit log records the admin decision.

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

Manual payment approval should be audit logged.

## Future Payment Providers

Future payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Provider selection requires approval before implementation.

The selected provider must support secure confirmation flow and webhook verification.

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

## Checkout Flow

Planned checkout flow:

1. User selects a plan.
2. Backend reads the plan from database.
3. Backend calculates amount and duration.
4. Backend creates payment record.
5. Backend creates provider checkout session if provider is enabled.
6. User completes payment.
7. Provider sends webhook.
8. Backend verifies webhook.
9. Backend marks payment as succeeded.
10. Backend extends subscription.
11. Backend records audit log.

The frontend must not decide the final price.

The frontend must not decide subscription duration.

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

## Subscription Extension Rules

Subscription extension can happen only after one of these:

- Admin-approved manual payment
- Verified provider payment success
- Valid reseller credit transaction
- Admin manual subscription action

Payment success must be verified by backend.

Frontend success pages must not extend subscriptions directly.

## Pricing Rules

Plan price must come from the backend database.

Frontend must not be trusted for:

- Amount
- Currency
- Discount
- Duration
- Device limit
- Reseller credit cost

The backend must calculate the payable amount.

## Currency Rules

Initial currency may be configured by the platform.

Possible currencies:

- TRY
- USD
- EUR
- GBP

Multi-currency support is post-MVP unless explicitly approved.

Currency must be stored with every payment record.

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

## Reseller Payment Visibility

Resellers may have limited visibility into payment-related records for their own customers.

Resellers may view:

- Own customer subscription status
- Own customer payment status when allowed
- Own credit usage
- Own credit transactions

Resellers must not access global payment data.

Resellers must not access provider settings.

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

## Failed Payments

Failed payments should be recorded.

Failed payment records may help:

- Customer support
- Admin review
- Provider debugging
- Fraud detection
- Retry handling

Failed payments must not extend subscriptions.

## Cancelled Payments

Cancelled payments should not extend subscriptions.

A cancelled payment may remain visible in customer payment history.

Cancelled payment data must not include sensitive card data.

## Fraud and Abuse Prevention

Payment system should consider:

- Rate limiting checkout creation
- Webhook verification
- Duplicate payment prevention
- Manual review for suspicious activity
- Audit logs for admin approvals
- Provider-side fraud tools

## Reporting

Admin reporting may be added later.

Possible reports:

- Total revenue
- Successful payments
- Failed payments
- Manual payments
- Reseller credit purchases
- Monthly recurring totals
- Customer payment history

Reporting is post-MVP unless explicitly requested.

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

## Final Rule

Payments are only for licensed player platform access.

Payments must never imply that the platform provides channels, streams, playlists, or content.

Do not store card data.

Do not extend subscriptions until payment success is verified by the backend.
