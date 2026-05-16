# 04 - Database Bible

This file defines the planned database structure for TV Project Platform.

The database must support the licensed player platform model.

The database must not turn the backend into a content provider or playlist source of truth.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The database must not be designed around channels, stream sources, channel packages, or content catalogs.

The database should support:

- Users
- Roles
- Sessions
- Plans
- Subscriptions
- Devices
- Licenses
- Resellers
- Reseller credit transactions
- Payments
- App versions
- Remote config
- Temporary playlist profile transfer
- Audit logs

## Forbidden Database Areas

Do not create tables for:

- Channel inventory
- Stream sources
- Stream relay routes
- Stream transcoding jobs
- CDN stream delivery
- Content catalogs
- Playlist marketplace
- Channel packages
- Permanent playlist credential authority

## Core Database Principles

The database must follow these principles:

- Store only necessary data.
- Do not store plain text passwords.
- Do not store payment card data.
- Do not permanently store playlist credentials by default.
- Use transactions for critical financial and subscription operations.
- Use audit logs for critical admin and reseller actions.
- Use clear status fields.
- Use created_at and updated_at timestamps.
- Use soft delete or status fields where useful.
- Keep reseller credit history transaction-based.

## Recommended Models

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

Rules:

- email must be unique.
- password_hash must never contain plain text passwords.
- role must be controlled by backend authorization.
- status can be active, disabled, or suspended.
- reseller_id may connect a customer to a reseller.

## User Roles

Initial roles:

- ADMIN
- RESELLER
- CUSTOMER

Role values should be shared through packages/shared.

Role checks must be enforced on the backend.

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
- session metadata may be used for security review.

## Plan Model

The Plan model represents software access plans.

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
- created_at
- updated_at

Rules:

- price must be calculated by backend.
- duration must be controlled by backend.
- frontend plan values must not be trusted.
- device_limit controls licensed player device access.

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
- created_at
- updated_at

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
- subscription extension should happen only after verified payment or valid reseller/admin operation.
- subscription changes should be audit logged.

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

Rules:

- app_generated_device_id should be unique where appropriate.
- android_id is only a secondary signal.
- platform may be android_tv or fire_tv.
- license checks should validate device status.
- blocked devices should not receive access.

## LicenseCheck Model

The LicenseCheck model records app license checks.

Suggested fields:

- id
- user_id
- device_id
- result
- reason
- app_version_code
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

Rules:

- license check logs help debugging and abuse detection.
- do not store playlist credentials in license checks.

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

Possible statuses:

- ACTIVE
- DISABLED
- SUSPENDED

Rules:

- credit_balance may exist for fast reads.
- credit history must come from ResellerCreditTransaction.
- reseller account must connect to a user.
- reseller access must be scoped.

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
- verify provider webhook signatures.
- subscription extension should happen only after verified payment success.

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

Rules:

- remote config should not include secrets.
- remote config should not include playlist credentials.
- maintenance mode should be respected by the app.

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
- RESELLER_CREDIT_ADDED
- RESELLER_CREDIT_USED
- SUBSCRIPTION_CREATED
- SUBSCRIPTION_EXTENDED
- SUBSCRIPTION_CANCELLED
- PAYMENT_APPROVED
- DEVICE_BLOCKED
- APP_VERSION_CHANGED
- REMOTE_CONFIG_CHANGED
- PLAYLIST_PUSH_CREATED
- PLAYLIST_PUSH_CONSUMED

Rules:

- audit logs should be append-only where possible.
- sensitive data must not be written to audit logs.
- audit logs should not contain playlist credentials.

## Transaction Requirements

Database transactions are required for:

- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription extension
- Payment confirmation
- Device activation
- Playlist push consumption

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

## Indexing Recommendations

Recommended indexes:

- users.email
- users.role
- users.status
- subscriptions.user_id
- subscriptions.status
- subscriptions.ends_at
- devices.user_id
- devices.app_generated_device_id
- devices.status
- payments.user_id
- payments.status
- resellers.user_id
- reseller_credit_transactions.reseller_id
- audit_logs.actor_user_id
- audit_logs.action
- playlist_push_requests.device_id
- playlist_push_requests.expires_at

## Future Database Ideas

Future models may include:

- SupportTicket
- EmailNotification
- Invoice
- ReferralCode
- AffiliateAccount
- ApiKey
- WebhookEvent
- LoginAttempt

These require separate approval before implementation.

## Final Rule

The database must support licensed player platform operations only.

Do not design the database as a content provider system.

Do not add stream source tables.

Do not add channel package tables.

Do not make playlist credentials permanent backend authority.
