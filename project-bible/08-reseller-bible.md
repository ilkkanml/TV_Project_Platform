# 08 - Reseller Bible

This file defines the reseller system, reseller permissions, reseller customer ownership, credit rules, transaction requirements, sales rules, dashboard behavior, and security boundaries for TV Project Platform.

The reseller system must support licensed player subscriptions only.

Resellers must not sell channels, streams, playlists, content packages, or broadcast access through this platform.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Resellers may manage:

- Own customers
- Own customer software subscriptions
- Own customer device/license status
- Own credit balance
- Own credit transactions
- Own sales history

Resellers must not use this platform as:

- IPTV provider system
- Channel seller system
- Stream seller system
- Playlist marketplace
- Content distribution system
- Broadcast management system

## Reseller Purpose

The reseller system exists to let approved resellers manage their own customer base and sell licensed player access.

A reseller may:

- Create own customers
- Manage own customers
- Assign software subscriptions
- Extend software subscriptions
- View own customer devices
- View own customer license status
- View own credit balance
- View own credit transactions
- View own sales history

## Reseller Must Not

A reseller must not:

- Access customers owned by another reseller
- Access global admin data
- Change system-wide plans
- Change payment provider settings
- Change app version settings
- Change remote config
- View full audit logs
- Sell channel packages
- Sell stream access
- Sell playlist provider access
- Manage stream sources
- Manage channel lists
- Manage content catalogs
- Use the platform as a content provider

## Reseller Role

The reseller role is:

- RESELLER

Reseller permissions must be enforced on the backend.

Frontend route hiding is not enough.

Every reseller API must check:

- Authentication
- Reseller role
- Reseller account status
- Resource ownership
- Action permission

## Reseller Account

A reseller account should be connected to a platform user.

Recommended Reseller model fields:

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

- A disabled reseller cannot perform reseller operations.
- A suspended reseller cannot create customers.
- A suspended reseller cannot use credit.
- A suspended reseller cannot extend customer subscriptions.
- Reseller account must be linked to a user account.
- Reseller user email must be unique through the User model.

## Reseller Customer Ownership

Every customer created by a reseller should be linked to that reseller.

Suggested customer ownership field:

- reseller_id

Rules:

- Reseller can only view customers where reseller_id matches their reseller account.
- Reseller can only edit customers where reseller_id matches their reseller account.
- Reseller can only create subscriptions for their own customers.
- Reseller can only extend subscriptions for their own customers.
- Reseller can only view devices for their own customers.
- Reseller cannot transfer customers to another reseller unless admin approves.

## Reseller Credit System

The reseller credit system must be transaction-based.

A simple balance field is not enough.

The balance field may exist for fast reads, but the transaction history is the source of accountability.

Every credit operation must create a transaction record.

Credit operations must be calculated by the backend.

Frontend credit values must never be trusted.

Credit usage must happen inside database transactions.

Negative reseller balances must be prevented.

## Credit Transaction Model

Recommended ResellerCreditTransaction fields:

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

Possible transaction types:

- CREDIT_ADD
- CREDIT_USE
- CREDIT_REFUND
- MANUAL_ADJUSTMENT
- REVERSAL

## Credit Add

Credit add means an admin adds credit to a reseller account.

Rules:

- Only admin can add reseller credit.
- Credit add must create a transaction.
- Credit add must update reseller balance.
- Credit add must be audit logged.
- Amount must be positive.
- Backend must calculate balance_before.
- Backend must calculate balance_after.
- Frontend balance values must not be trusted.

Example:

- Current balance: 100
- Admin adds: 50
- New balance: 150
- Transaction type: CREDIT_ADD

## Credit Use

Credit use means reseller spends credit to create or extend a customer software subscription.

Rules:

- Reseller can only use credit for own customers.
- Backend must calculate required credit cost.
- Frontend credit cost must not be trusted.
- Credit usage must create a transaction.
- Credit usage must update reseller balance.
- Credit usage must be audit logged.
- Negative balance must be prevented.
- Subscription must be created or extended inside the same database transaction.

Example:

- Current balance: 100
- Plan cost: 20
- New balance: 80
- Transaction type: CREDIT_USE

## Credit Refund

Credit refund means previously used credit is returned when allowed.

Rules:

- Refund must reference related customer or subscription when possible.
- Refund must create a transaction.
- Refund must update reseller balance.
- Refund must be audit logged.
- Refund rules must be controlled by backend.
- Refund must not create invalid subscription state.

Example:

- Current balance: 80
- Refund amount: 20
- New balance: 100
- Transaction type: CREDIT_REFUND

## Manual Adjustment

Manual adjustment is an admin-only correction.

Rules:

- Only admin can create manual adjustments.
- Manual adjustment must create a transaction.
- Manual adjustment must include a note.
- Manual adjustment must be audit logged.
- Backend must prevent invalid negative balance unless explicitly allowed by approved business rules.
- Manual adjustment should be rare.

Example:

- Current balance: 100
- Adjustment: -10
- New balance: 90
- Transaction type: MANUAL_ADJUSTMENT

## Reversal

Reversal may be used to reverse an incorrect credit operation.

Rules:

- Reversal must reference the original transaction when possible.
- Reversal must create a new transaction.
- Reversal must not delete the original transaction.
- Reversal must be audit logged.
- Backend must calculate resulting balance.
- Reversal must not silently modify historical transaction data.

## Reseller Credit Transaction Rules

Every transaction must record:

- Reseller ID
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer when applicable
- Related subscription when applicable
- Created by user
- IP address
- Note when applicable
- Created date

Transactions should never be silently deleted.

Corrections should use reversal or adjustment records.

## Subscription Assignment

A reseller may assign a software subscription to their own customer.

Rules:

- Customer must belong to reseller.
- Reseller account must be active.
- Plan must be active.
- Backend must calculate plan credit cost.
- Reseller must have enough credit.
- Credit must be deducted inside a database transaction.
- Subscription must be created or extended inside the same transaction.
- Audit log should be created.

Subscriptions represent software/player access only.

Subscriptions must not represent channel access, stream access, playlist access, or content packages.

## Subscription Extension

A reseller may extend a subscription for their own customer.

Rules:

- Customer must belong to reseller.
- Subscription must belong to reseller customer.
- Plan must be active.
- Backend must calculate extension duration.
- Backend must calculate credit cost.
- Reseller must have enough credit.
- Credit transaction and subscription update must happen together.
- Extension must be audit logged.

## Reseller Customer Creation

Reseller customer creation should include:

- Customer email
- Customer name
- Initial password or invite flow
- Optional phone number
- Optional note

Rules:

- Reseller can only create customers under own reseller account.
- Customer email must be unique.
- Password must be hashed.
- Reseller must not assign admin or reseller role to customer.
- Created customer role must be CUSTOMER.

## Reseller Customer Management

Resellers may:

- View own customers
- Create own customers
- Update own customer basic info when allowed
- View own customer subscription status
- View own customer devices
- View own customer license status

Resellers must not:

- Delete customers globally
- Change customer role
- Access unrelated customers
- Modify payment provider records
- Modify system plans
- Manage channels
- Manage streams
- Manage playlists as backend-owned data

## Reseller Device Visibility

Resellers may view devices belonging to their own customers.

Visible device fields may include:

- Device name
- Platform
- App version
- Device status
- License status
- Activation date
- Last seen date

Resellers must not see:

- Sensitive app secrets
- Playlist credentials
- Other reseller devices
- Other customer devices outside their ownership scope

## Reseller Dashboard

The reseller dashboard should show:

- Credit balance
- Total own customers
- Active own subscriptions
- Expired own subscriptions
- Recent credit transactions
- Recent sales
- Recent customer activity

Dashboard data must be scoped to the logged-in reseller.

Dashboard data must not include global platform totals unless explicitly allowed by admin.

## Reseller Sales History

Sales history should represent software subscription operations.

Sales history may include:

- Customer
- Plan
- Credit used
- Subscription start date
- Subscription end date
- Created date
- Created by reseller user

Sales history must not represent:

- Channel sales
- Stream sales
- Playlist sales
- Content package sales
- IPTV package sales

## Reseller API Endpoints

Possible reseller endpoints:

- GET /reseller/dashboard
- GET /reseller/customers
- POST /reseller/customers
- GET /reseller/customers/:id
- PATCH /reseller/customers/:id
- GET /reseller/customers/:id/subscription
- POST /reseller/customers/:id/subscriptions
- PATCH /reseller/customers/:id/subscriptions/:subscriptionId/extend
- GET /reseller/customers/:id/devices
- GET /reseller/credits
- GET /reseller/credit-transactions
- GET /reseller/sales

## Admin Reseller API Endpoints

Possible admin endpoints:

- GET /admin/resellers
- GET /admin/resellers/:id
- POST /admin/resellers
- PATCH /admin/resellers/:id
- PATCH /admin/resellers/:id/status
- GET /admin/resellers/:id/customers
- GET /admin/resellers/:id/credit-transactions
- POST /admin/resellers/:id/credits/add
- POST /admin/resellers/:id/credits/adjust
- GET /admin/resellers/:id/sales

## Reseller Credit API Rules

Credit APIs must follow strict backend rules.

Required checks:

- Authenticated user
- Correct role
- Active reseller account
- Valid customer ownership
- Valid plan
- Enough balance
- Transactional database write
- Audit log creation

Never accept final balance from frontend.

Never accept trusted credit cost from frontend.

Never update subscription without recording credit transaction.

## Database Transaction Flow For Credit Use

Recommended flow:

1. Start database transaction.
2. Load reseller account with lock if supported.
3. Validate reseller status.
4. Load customer and verify ownership.
5. Load plan and calculate credit cost.
6. Check current balance.
7. Prevent negative balance.
8. Create or extend subscription.
9. Create credit transaction.
10. Update reseller balance.
11. Create audit log.
12. Commit transaction.

If any step fails, rollback the transaction.

## Audit Logs

Reseller actions that should be audit logged:

- Admin creates reseller
- Admin updates reseller
- Admin disables reseller
- Admin suspends reseller
- Admin adds reseller credit
- Admin adjusts reseller credit
- Reseller creates customer
- Reseller updates customer
- Reseller creates subscription
- Reseller extends subscription
- Reseller uses credit
- Credit refund
- Credit reversal

Audit logs must not contain sensitive data.

Audit logs must not contain playlist credentials.

Audit logs must not contain payment card data.

## Reseller Security

Reseller security must protect against:

- Cross-reseller data access
- Credit manipulation
- Negative balance
- Fake frontend prices
- Fake plan durations
- Fake credit costs
- Unauthorized subscription extension
- Unauthorized customer access
- Unauthorized device access

Backend must be the authority.

## Reseller Restrictions

Resellers must not manage:

- App versions
- Remote config
- Global plans
- Payment provider settings
- System settings
- Admin users
- Other resellers
- Audit logs outside allowed scope
- Channels
- Streams
- Playlists as backend-owned data
- Content catalogs
- Broadcast infrastructure

## Reseller Status Effects

ACTIVE:

- Can access reseller panel.
- Can manage own customers.
- Can use credit if balance is enough.

DISABLED:

- Cannot perform reseller operations.
- May be blocked from login depending on user status.

SUSPENDED:

- May view limited account information if allowed.
- Cannot create customers.
- Cannot use credit.
- Cannot extend subscriptions.

## Reseller Plan Pricing

Plans may have reseller credit cost.

Recommended Plan fields:

- price
- currency
- duration_days
- reseller_credit_cost
- device_limit

Rules:

- Backend calculates credit cost.
- Frontend must not send trusted cost.
- Admin controls plan credit cost.
- Plan must be active before reseller can use it.
- Plan must represent software/player access only.

## Reseller Notifications

Future reseller notifications may include:

- Low credit warning
- Customer subscription expiring
- Customer subscription expired
- Credit added
- Credit used
- Device activated

Notifications are post-MVP unless explicitly requested.

## Reseller Reports

Future reseller reports may include:

- Monthly sales
- Credit usage
- Active customers
- Expired customers
- Subscription extensions
- Device activation summary

Reports must be reseller-scoped.

Reports must not include channel, stream, playlist, or content sales.

## MVP Reseller Scope

MVP reseller scope should include:

- Reseller login
- Reseller dashboard
- Own customer list
- Create own customer
- View own customer subscription
- Create own customer subscription using credit
- Extend own customer subscription using credit
- View own credit balance
- View own credit transactions
- Admin add reseller credit
- Admin view reseller transactions

## Post-MVP Reseller Features

Post-MVP reseller features may include:

- Reseller reports
- Low credit notifications
- Customer import
- Reseller commission model
- Reseller tiers
- Reseller branding
- Sub-reseller model
- Invoice/PDF receipt support
- Automated reseller credit purchase

Each post-MVP feature requires separate approval.

## Forbidden Reseller Features

Do not add these reseller features:

- Channel package selling
- Stream source management
- Playlist marketplace management
- Content catalog management
- CDN route management
- Broadcast infrastructure management
- Backend playlist provider tools
- Content package sales
- IPTV package sales with included channels

## Reseller Testing Requirements

Tests should verify:

- Reseller can view own customers.
- Reseller cannot view another reseller's customers.
- Reseller can create own customers.
- Reseller cannot create admin users.
- Reseller can use credit for own customer subscription.
- Reseller cannot use credit for another reseller's customer.
- Credit use creates transaction.
- Credit use updates balance.
- Negative balance is prevented.
- Frontend credit values are ignored.
- Frontend plan cost is ignored.
- Suspended reseller cannot use credit.
- Disabled reseller cannot perform reseller operations.

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

Do not create conflicting alternative reseller files.

## Final Rule

The reseller system exists only for licensed player platform operations.

Reseller credit is for software access, subscriptions, and device/player licensing.

Do not allow resellers to become content sellers through this platform.
