# 04 - Database Bible

This file defines the planned database structure, model responsibilities, data rules, transaction rules, indexing direction, and forbidden database areas for TV Project Platform.

The database must support the licensed player platform model.

The database must not turn the backend into a content provider, stream provider, channel seller, playlist provider, or broadcast backend.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The database should support:

- Users
- Roles
- Sessions
- Plans
- Subscriptions
- Devices
- License checks
- Resellers
- Reseller credit transactions
- Payments
- App versions
- Remote config
- Temporary playlist profile transfer
- Audit logs

The database must not be designed around channels, stream sources, channel packages, content catalogs, or broadcast infrastructure.

## Forbidden Database Areas

Do not create source-of-truth database tables for:

- Channel inventory
- Stream sources
- Stream relay routes
- Stream transcoding jobs
- CDN stream delivery
- Content catalogs
- Playlist marketplace
- Channel packages
- Broadcast schedules
- Permanent playlist credential authority
- Shared playlist libraries
- Public playlist search

These areas violate the product boundary.

## Core Database Principles

The database must follow these principles:

- Store only necessary data.
- Do not store plain text passwords.
- Do not store payment card data.
- Do not permanently store playlist credentials by default.
- Do not store provider secrets in normal business tables.
- Use transactions for critical financial and subscription operations.
- Use audit logs for critical admin and reseller actions.
- Use clear status fields.
- Use created_at and updated_at timestamps.
- Use soft delete or status fields where useful.
- Keep reseller credit history transaction-based.
- Keep backend license checks authoritative.
- Keep temporary playlist transfer expirable.

## Planned Database Technology

The planned database stack is:

- PostgreSQL
- Prisma ORM
- TypeScript
- Docker Compose for local development

Primary schema file location:

- apps/api/prisma/schema.prisma

## Recommended Initial Models

Initial database models:

- User
- Session
- Plan
- Subscription
- Device
- LicenseCheck
- Reseller
- ResellerCreditTransaction
- Payment
- AppVersion
- RemoteConfig
- PlaylistPushRequest
- AuditLog

Future models may be added only when needed and approved.

## User Model

The User model represents admin, reseller, and customer accounts.

Suggested fields:

- id
- email
- password_hash
- name
- role
- status
- reseller_id
- created_at
- updated_at
- deleted_at

Rules:

- email must be unique.
- password_hash must never contain plain text passwords.
- password_hash must never be returned by the API.
- role must be controlled by backend authorization.
- status controls account access.
- reseller_id may connect a customer to a reseller.
- deleted_at may be used for soft delete if needed.

Possible roles:

- ADMIN
- RESELLER
- CUSTOMER

Possible statuses:

- ACTIVE
- DISABLED
- SUSPENDED

## Session Model

The Session model stores refresh/session information.

Suggested fields:

- id
- user_id
- refresh_token_hash
- user_agent
- ip_address
- expires_at
- revoked_at
- created_at
- updated_at

Rules:

- refresh tokens should be hashed.
- logout should revoke the session.
- expired sessions should be ignored.
- revoked sessions should be ignored.
- session metadata may be used for security review.
- full refresh tokens must not be stored in plain text.

## Plan Model

The Plan model represents software/player access plans.

Plans do not represent channels.

Plans do not represent stream packages.

Plans do not represent content access.

Suggested fields:

- id
- name
- description
- duration_days
- price
- currency
- device_limit
- reseller_credit_cost
- is_active
- is_public
- created_at
- updated_at

Rules:

- price must be calculated by backend.
- duration must be controlled by backend.
- frontend plan values must not be trusted.
- device_limit controls licensed player device access.
- reseller_credit_cost controls reseller credit usage.
- plans must not describe channel access, stream access, or content access.

## Subscription Model

The Subscription model represents software/player access.

Suggested fields:

- id
- user_id
- plan_id
- status
- starts_at
- ends_at
- source
- created_by_user_id
- reseller_id
- payment_id
- created_at
- updated_at
- cancelled_at
- suspended_at

Possible statuses:

- ACTIVE
- EXPIRED
- CANCELLED
- SUSPENDED

Possible sources:

- ADMIN
- RESELLER
- PAYMENT
- MANUAL

Rules:

- subscriptions do not include content access.
- subscription extension should happen only after verified payment, valid reseller credit operation, or admin action.
- subscription changes should be audit logged.
- subscription dates must be calculated by backend.
- frontend duration values must not be trusted.

## Device Model

The Device model represents a licensed app device.

MAC address must not be the primary identifier.

Primary app identity:

- app_generated_device_id

Suggested fields:

- id
- user_id
- app_generated_device_id
- android_id
- device_name
- device_model
- platform
- app_version_code
- app_version_name
- status
- last_seen_at
- activated_at
- blocked_at
- created_at
- updated_at

Possible statuses:

- ACTIVE
- BLOCKED
- INACTIVE
- PENDING

Possible platforms:

- ANDROID_TV
- FIRE_TV
- ANDROID_BOX
- ANDROID_MOBILE
- OTHER

Rules:

- app_generated_device_id should be unique where appropriate.
- android_id is only a secondary signal.
- MAC address must not be primary identity.
- license checks should validate device status.
- blocked devices should not receive access.
- device ownership must be enforced.

## LicenseCheck Model

The LicenseCheck model records app license checks.

Suggested fields:

- id
- user_id
- device_id
- result
- reason
- app_version_code
- app_version_name
- platform
- ip_address
- user_agent
- checked_at

Possible results:

- ALLOWED
- DENIED

Possible reasons:

- OK
- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- USER_DISABLED
- APP_VERSION_UNSUPPORTED

Rules:

- license check logs help debugging and abuse detection.
- license check logs must not store playlist credentials.
- license decision must be backend-authoritative.
- license checks should not expose sensitive internals.

## Reseller Model

The Reseller model represents reseller account metadata.

Suggested fields:

- id
- user_id
- status
- credit_balance
- commission_rate
- created_at
- updated_at
- suspended_at
- disabled_at

Possible statuses:

- ACTIVE
- DISABLED
- SUSPENDED

Rules:

- credit_balance may exist for fast reads.
- credit history must come from ResellerCreditTransaction.
- reseller account must connect to a user.
- reseller access must be scoped.
- disabled or suspended resellers cannot use credit.

## ResellerCreditTransaction Model

The ResellerCreditTransaction model is the auditable source for reseller credit history.

A simple balance field is not enough.

Suggested fields:

- id
- reseller_id
- type
- amount
- balance_before
- balance_after
- related_customer_id
- related_subscription_id
- created_by_user_id
- ip_address
- note
- created_at

Possible types:

- CREDIT_ADD
- CREDIT_USE
- CREDIT_REFUND
- MANUAL_ADJUSTMENT
- REVERSAL

Rules:

- every credit operation must create a transaction record.
- frontend credit values must not be trusted.
- backend must calculate balance_before and balance_after.
- credit usage must happen inside a database transaction.
- negative balances must be prevented.
- credit changes must be audit logged.
- transaction history must not be silently deleted.
- corrections should use adjustment or reversal records.

## Payment Model

The Payment model stores payment records.

Card data must not be stored.

Suggested fields:

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

Rules:

- do not store card numbers.
- do not store CVV.
- do not store raw card data.
- do not store payment provider secrets.
- verify provider webhook signatures.
- subscription extension should happen only after verified payment success.
- frontend price values must not be trusted.
- manual payment approval must be admin-only.

## AppVersion Model

The AppVersion model controls app update behavior.

Suggested fields:

- id
- platform
- version_code
- version_name
- minimum_version_code
- force_update
- apk_url
- changelog
- is_active
- created_at
- updated_at

Rules:

- app-facing endpoint should return current version rules.
- force_update should block old versions when needed.
- apk_url can point to approved download storage.
- app version changes should be audit logged.
- app version rules must not include secrets.

## RemoteConfig Model

The RemoteConfig model controls app configuration.

Suggested fields:

- id
- platform
- maintenance_mode
- maintenance_message
- announcement
- minimum_version_code
- features
- created_at
- updated_at

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled
- manual_payment_enabled
- reseller_enabled

Rules:

- remote config should not include secrets.
- remote config should not include playlist credentials.
- maintenance mode should be respected by the app.
- remote config changes should be audit logged.

## PlaylistPushRequest Model

The PlaylistPushRequest model supports optional web-to-device playlist profile transfer.

This model must not become permanent playlist storage.

Suggested fields:

- id
- user_id
- device_id
- encrypted_payload
- status
- expires_at
- consumed_at
- created_at
- updated_at

Possible statuses:

- PENDING
- CONSUMED
- EXPIRED
- CANCELLED

Rules:

- payload must be encrypted.
- payload must be temporary.
- payload must expire.
- payload should be deleted or marked consumed after pickup.
- payload must be tied to authenticated user and target device.
- backend must not become playlist source of truth.
- payload must not be logged.
- payload must not become permanent playlist storage.

## AuditLog Model

The AuditLog model records important platform actions.

Suggested fields:

- id
- actor_user_id
- actor_role
- action
- target_type
- target_id
- ip_address
- user_agent
- metadata
- created_at

Actions to audit include:

- USER_CREATED
- USER_UPDATED
- USER_DISABLED
- ROLE_CHANGED
- RESELLER_CREATED
- RESELLER_UPDATED
- RESELLER_DISABLED
- RESELLER_CREDIT_ADDED
- RESELLER_CREDIT_USED
- RESELLER_CREDIT_REFUNDED
- RESELLER_CREDIT_ADJUSTED
- SUBSCRIPTION_CREATED
- SUBSCRIPTION_EXTENDED
- SUBSCRIPTION_CANCELLED
- PAYMENT_APPROVED
- PAYMENT_REJECTED
- DEVICE_BLOCKED
- DEVICE_UNBLOCKED
- APP_VERSION_CHANGED
- REMOTE_CONFIG_CHANGED
- PLAYLIST_PUSH_CREATED
- PLAYLIST_PUSH_CONSUMED

Rules:

- audit logs should be append-only where possible.
- sensitive data must not be written to audit logs.
- audit logs should not contain playlist credentials.
- audit logs should not contain payment card data.
- audit logs should not contain tokens or secrets.

## Model Relationships

Suggested relationships:

- User has many Sessions
- User has many Subscriptions
- User has many Devices
- User has many Payments
- User may belong to a Reseller through reseller_id
- User may own one Reseller account
- Reseller has many reseller customers through User.reseller_id
- Reseller has many ResellerCreditTransactions
- Plan has many Subscriptions
- Plan has many Payments
- Subscription belongs to User
- Subscription belongs to Plan
- Subscription may belong to Reseller
- Payment belongs to User
- Payment may belong to Plan
- Payment may belong to Subscription
- Device belongs to User
- LicenseCheck belongs to User
- LicenseCheck belongs to Device
- PlaylistPushRequest belongs to User
- PlaylistPushRequest belongs to Device

## Transaction Requirements

Database transactions are required for:

- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription creation through reseller credit
- Subscription extension through reseller credit
- Manual payment approval
- Payment webhook confirmation
- Subscription extension after payment
- Device activation
- Playlist push consumption

If any critical step fails, the full operation should rollback.

## Reseller Credit Transaction Flow

Recommended flow for reseller credit use:

1. Start database transaction.
2. Load reseller account.
3. Validate reseller status.
4. Load customer and verify reseller ownership.
5. Load plan and calculate credit cost.
6. Check current reseller balance.
7. Prevent negative balance.
8. Create or extend subscription.
9. Create reseller credit transaction.
10. Update reseller credit balance.
11. Create audit log.
12. Commit transaction.

If any step fails, rollback the transaction.

## Payment Confirmation Flow

Recommended flow for payment confirmation:

1. Verify payment provider webhook or admin approval.
2. Load payment record.
3. Validate amount.
4. Validate currency.
5. Validate payment status.
6. Prevent duplicate processing.
7. Mark payment as succeeded.
8. Create or extend subscription.
9. Create audit log.
10. Commit transaction.

Frontend success pages must not directly extend subscriptions.

## Device Activation Flow

Recommended flow for device activation:

1. Start database transaction when needed.
2. Validate authenticated user or activation code.
3. Validate user status.
4. Validate subscription status.
5. Validate plan device limit.
6. Load or create device by app_generated_device_id.
7. Store device metadata.
8. Mark device active when allowed.
9. Create audit log when needed.
10. Commit transaction.

MAC address must not be required as primary identity.

## Playlist Transfer Consumption Flow

Recommended flow for playlist transfer consumption:

1. Validate authenticated app or device context.
2. Validate device ownership.
3. Load pending transfer.
4. Check expiration.
5. Return encrypted payload to target device.
6. Mark transfer as consumed or delete it.
7. Create audit log when needed.
8. Commit transaction.

Expired payloads must not be consumed.

Consumed payloads should not be reusable when single-use behavior is enabled.

## Data That Must Never Be Stored

Never store:

- Plain text passwords
- Payment card numbers
- CVV codes
- Full raw card data
- Full access tokens
- Full refresh tokens
- Payment provider secrets
- Encryption keys
- Playlist credentials permanently by default
- Stream sources
- Channel inventories
- Channel package data
- CDN stream routes

## Sensitive Data That Must Not Be Logged

Do not log:

- Plain text passwords
- Password hashes
- Payment card data
- Full tokens
- Refresh tokens
- Playlist credentials
- Encryption keys
- Payment provider secrets
- Database passwords
- Raw sensitive provider payloads

## Indexing Recommendations

Recommended indexes:

- users.email
- users.role
- users.status
- users.reseller_id
- sessions.user_id
- sessions.expires_at
- subscriptions.user_id
- subscriptions.plan_id
- subscriptions.status
- subscriptions.ends_at
- subscriptions.reseller_id
- devices.user_id
- devices.app_generated_device_id
- devices.status
- devices.last_seen_at
- license_checks.user_id
- license_checks.device_id
- license_checks.checked_at
- payments.user_id
- payments.status
- payments.provider_reference
- resellers.user_id
- resellers.status
- reseller_credit_transactions.reseller_id
- reseller_credit_transactions.type
- reseller_credit_transactions.created_at
- audit_logs.actor_user_id
- audit_logs.action
- audit_logs.created_at
- playlist_push_requests.device_id
- playlist_push_requests.user_id
- playlist_push_requests.status
- playlist_push_requests.expires_at

## Status Enum Recommendations

Recommended shared status enums:

UserStatus:

- ACTIVE
- DISABLED
- SUSPENDED

SubscriptionStatus:

- ACTIVE
- EXPIRED
- CANCELLED
- SUSPENDED

DeviceStatus:

- ACTIVE
- BLOCKED
- INACTIVE
- PENDING

PaymentStatus:

- PENDING
- SUCCEEDED
- FAILED
- CANCELLED
- REFUNDED

ResellerStatus:

- ACTIVE
- DISABLED
- SUSPENDED

PlaylistPushStatus:

- PENDING
- CONSUMED
- EXPIRED
- CANCELLED

LicenseResult:

- ALLOWED
- DENIED

## Data Retention

Retention rules should be defined later for:

- Sessions
- Audit logs
- License checks
- Payment records
- Device activity
- Playlist transfer payloads
- Support tickets later

Temporary playlist payload retention must be short.

Expired playlist transfer payloads should be deleted or marked expired.

Payment records may need longer retention for accounting and support.

Audit logs may need longer retention for security and accountability.

## Prisma Naming Direction

Prisma models should use clear names.

Recommended model names:

- User
- Session
- Plan
- Subscription
- Device
- LicenseCheck
- Reseller
- ResellerCreditTransaction
- Payment
- AppVersion
- RemoteConfig
- PlaylistPushRequest
- AuditLog

Database table names may use snake_case if mapped through Prisma.

Example:

- users
- sessions
- plans
- subscriptions
- devices
- license_checks
- resellers
- reseller_credit_transactions
- payments
- app_versions
- remote_configs
- playlist_push_requests
- audit_logs

## Migration Rules

Database migrations must be handled carefully.

Rules:

- Keep migrations committed.
- Review migrations before production.
- Do not run destructive migrations without backup.
- Do not reset production database.
- Avoid manual production schema edits.
- Use seed scripts only for safe initial data.

## Seed Data

Initial seed may include:

- Admin user
- Default plans
- Default remote config
- Initial app version placeholder

Seed rules:

- Admin seed password must come from environment variable.
- Seed password must be hashed.
- Do not seed real payment data.
- Do not seed playlist credentials.
- Do not seed stream sources or channels.

## Future Database Ideas

Future models may include:

- SupportTicket
- SupportTicketMessage
- EmailNotification
- SmsNotification
- Invoice
- ReferralCode
- AffiliateAccount
- ApiKey
- WebhookEvent
- LoginAttempt
- PasswordResetToken
- EmailVerificationToken

These require separate approval before implementation.

## Forbidden Future Models

Do not add models for:

- Channel
- ChannelPackage
- StreamSource
- StreamRelay
- TranscodingJob
- CdnRoute
- ContentCatalog
- PlaylistMarketplaceItem
- PublicPlaylist
- BroadcastSchedule

These models violate the product boundary.

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

Do not create conflicting alternative database bible files.

## Final Rule

The database must support licensed player platform operations only.

Do not design the database as a content provider system.

Do not add stream source tables.

Do not add channel package tables.

Do not add content catalog tables.

Do not make playlist credentials permanent backend authority.
