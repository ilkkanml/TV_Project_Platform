# 02 - User Roles

This file defines the user roles, permission boundaries, ownership rules, access rules, and role-based security expectations for TV Project Platform.

Every protected action must be checked on the backend.

Frontend route hiding is not enough.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

All roles operate inside the player-only product model.

No role should manage, sell, provide, or distribute:

- TV channels
- Live streams
- VOD streams
- Stream sources
- Stream relay routes
- Channel packages
- Playlist marketplace entries
- CDN stream routes
- Broadcast infrastructure
- Content catalogs

The platform is not a content provider.

The backend is not playlist source of truth.

## Primary Roles

The platform has three primary roles:

- Admin
- Reseller
- Customer

These roles must be used consistently across:

- API authorization
- Web dashboard routing
- Database records
- Audit logs
- Shared package constants
- Tests
- Documentation

## Role Summary

### Admin

Admin users manage the full platform.

Admins have system-wide control over users, customers, resellers, plans, subscriptions, payments, devices, app versions, remote config, system settings, and audit logs.

### Reseller

Reseller users manage their own customers and use reseller credit to create or extend software/player subscriptions.

Resellers must only access their own customers and related records.

### Customer

Customer users manage their own account, subscription, devices, payment history, and optional temporary playlist profile transfer to their own device.

Customers must only access their own data.

## Backend Authorization Requirement

Every protected backend endpoint must check:

- Authentication
- User role
- Resource ownership
- Resource status
- Action permission

Role checks alone are not enough.

Ownership checks are required for reseller and customer resources.

Frontend route protection is helpful for user experience, but it is not security.

Backend authorization is mandatory.

## Role Values

Initial role values should be:

- ADMIN
- RESELLER
- CUSTOMER

These values should be defined in:

- packages/shared

The API and web app should import shared role constants when possible.

## Admin Permissions

Admin users may manage:

- Users
- Customers
- Resellers
- Plans
- Subscriptions
- Payments
- Devices
- App versions
- Remote config
- Maintenance mode
- Feature flags
- Audit logs
- System settings

Admins may access platform-wide records.

Admin access must still be authenticated and audited for critical actions.

## Admin User Management

Admins may:

- View users
- Create users
- Update users
- Disable users
- Suspend users
- Assign roles
- Change user status
- View user status
- View user created date
- Reset access when needed

Admins must not see plain text passwords.

Passwords must never be stored in plain text.

Password hashes must never be returned by the API.

## Admin Customer Management

Admins may:

- View customers
- Create customers
- Update customers
- Disable customers
- View customer subscriptions
- View customer devices
- View customer payment records
- View customer license status

Admins must not manage customer playlist content as backend-owned data.

Admins must not turn customer data into channel package or stream package records.

## Admin Reseller Management

Admins may:

- Create reseller accounts
- Update reseller accounts
- Disable reseller accounts
- Suspend reseller accounts
- View reseller customers
- View reseller sales
- View reseller credit balance
- Add reseller credit
- Adjust reseller credit
- View reseller credit transactions

Every reseller credit change must create a transaction record.

Every reseller credit change must be audit logged.

## Admin Plan Management

Admins may:

- Create plans
- Update plans
- Disable plans
- Set plan duration
- Set plan price
- Set plan currency
- Set plan device limits
- Set reseller credit cost
- Set plan visibility

Plan pricing must be calculated by the backend.

Frontend price values must not be trusted.

Plans must represent software/player access only.

Plans must not represent channel packages, stream packages, playlists, or content.

## Admin Subscription Management

Admins may:

- View subscriptions
- Create subscriptions
- Extend subscriptions
- Expire subscriptions
- Cancel subscriptions
- Suspend subscriptions
- View subscription history
- View subscription source

Subscription changes should be audit logged.

Subscriptions represent software/player access only.

## Admin Payment Management

Admins may:

- View payments
- Create manual payment records
- Approve manual payments
- Reject manual payments
- View payment provider references
- View payment status
- View customer payment history

Admins must not store or view card data.

Manual payment approval must be admin-only.

Payment webhook signatures must be verified when payment providers are integrated.

## Admin Device Management

Admins may:

- View devices
- View device owner
- View device license status
- View device metadata
- View device activation date
- View last seen date
- Block devices
- Unblock devices

Device identity should use app_generated_device_id as primary identity.

MAC address must not be used as the primary identifier.

Device blocking should affect license status.

## Admin App Configuration

Admins may manage:

- App versions
- Minimum version code
- Force update rules
- APK URL
- Changelog
- Remote config
- Maintenance mode
- Announcement messages
- Feature flags

These changes should be audit logged.

Remote config must not include secrets.

Remote config must not include playlist credentials.

## Admin Audit Log Access

Admins may view audit logs.

Audit logs may include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Audit logs must not expose sensitive data.

Audit logs must not expose playlist credentials.

Audit logs must not expose payment card data.

## Admin Restrictions

Admins must not use the platform to manage:

- Channel inventory
- Stream sources
- IPTV packages
- Playlist marketplace data
- CDN stream routes
- Broadcast schedules
- Content catalogs

These features are outside product scope.

## Reseller Permissions

Reseller users may manage:

- Own dashboard
- Own customers
- Own credit balance
- Own credit transactions
- Own sales
- Own customer subscriptions
- Own customer device and license records

A reseller must not access customers owned by another reseller.

A reseller must not modify global system settings.

A reseller must not manage platform-wide payment provider settings.

A reseller must not manage app version rules.

A reseller must not manage remote config.

## Reseller Account Status

A reseller account may have statuses such as:

- ACTIVE
- DISABLED
- SUSPENDED

ACTIVE:

- Can access reseller dashboard.
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

## Reseller Customer Management

Resellers may:

- Create own customers
- View own customers
- Update own customer basic information when allowed
- Assign software subscriptions to own customers
- Extend own customer subscriptions using reseller credit
- View own customer devices
- View own customer license status

Resellers must not see all platform users.

Resellers must not see customers from other resellers.

Resellers must not assign admin or reseller roles to customers.

Customers created by resellers must have CUSTOMER role.

## Reseller Customer Ownership

Every reseller-created customer should be linked to that reseller.

Suggested ownership field:

- reseller_id

Rules:

- Reseller can only view customers where reseller_id matches their reseller account.
- Reseller can only update customers where reseller_id matches their reseller account.
- Reseller can only create subscriptions for customers they own.
- Reseller can only view devices for customers they own.
- Reseller cannot transfer customers to another reseller unless admin approves.

## Reseller Credit Permissions

Resellers may:

- View own credit balance
- View own credit transaction history
- Use credits for allowed subscription operations
- View own credit usage history
- View related customer and subscription records for own transactions

Resellers may not:

- Directly set their own balance
- Add credit to themselves
- Create credit without admin action or verified payment flow
- Modify credit transactions
- Delete credit transactions
- Use credit for another reseller's customer

## Reseller Credit Rules

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Every credit operation must create a transaction record.

Credit transactions should include:

- Reseller ID
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer
- Related subscription
- Created by
- IP address
- Note
- Created date

The backend must calculate credit usage.

The frontend must not send trusted final credit values.

Negative reseller balances must be prevented.

Credit usage must happen inside database transactions.

## Reseller Subscription Operations

Resellers may create or extend software subscriptions for their own customers.

Rules:

- Customer must belong to reseller.
- Reseller account must be active.
- Plan must be active.
- Backend must calculate plan credit cost.
- Reseller must have enough credit.
- Credit deduction must create transaction.
- Subscription creation or extension must happen in the same database transaction.
- Audit log should be created.

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

Resellers must not see sensitive app secrets.

Resellers must not access devices from other resellers.

## Reseller Dashboard

The reseller dashboard may show:

- Current credit balance
- Total own customers
- Active own subscriptions
- Expired own subscriptions
- Recent credit transactions
- Recent sales
- Recent customer activity

All dashboard data must be scoped to the logged-in reseller.

## Reseller Restrictions

Resellers must not:

- Access other reseller customers
- Access admin-only APIs
- Modify system-wide plans
- Modify payment provider settings
- Modify app version rules
- Modify remote config
- View full audit logs
- Sell channel packages through this platform
- Manage stream sources
- Manage channel lists
- Act as content providers through the platform
- Use the platform as a playlist marketplace

## Customer Permissions

Customer users may manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional web-to-device playlist profile transfer

Customers must not access admin resources.

Customers must not access reseller resources.

Customers must not access another customer account.

## Customer Account Management

Customers may:

- View own profile
- Update own profile when allowed
- Change password
- View own subscription
- View own payment history
- Logout from sessions

Customers must not assign themselves roles.

Customers must not modify their own subscription dates directly.

Customers must not modify their own payment status.

Customers must not bypass license rules.

## Customer Subscription Access

Customers may view:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Renewal options when available
- Expired status

Subscriptions represent software/player access only.

Subscriptions do not represent channels, streams, playlists, or content.

## Customer Device Management

Customers may:

- View own devices
- Activate own device when allowed
- Rename own device when allowed
- View own device status
- View own device activation date
- View own device license state

Customers must not access other users' devices.

Device activation must respect plan device limits.

Device license status must be backend-authoritative.

## Customer Payment Access

Customers may view their own payment history.

Customer payment history may include:

- Payment date
- Amount
- Currency
- Status
- Plan name
- Provider
- Payment reference
- Subscription result

Customers must not see:

- Other customers' payments
- Payment provider secrets
- Card data
- Internal webhook secrets

## Customer Playlist Transfer

Customers may optionally send a playlist profile from the web panel to their own device.

This feature must follow the temporary transfer bridge model.

The backend must not become playlist source of truth.

Transfer payloads should:

- Be temporary
- Be encrypted
- Be tied to the authenticated customer
- Be tied to the target device
- Expire automatically
- Be deleted or marked consumed after successful pickup when possible

Customers must only create transfers for their own devices.

## Customer Restrictions

Customers must not:

- Access admin APIs
- Access reseller APIs
- Access other customer accounts
- Modify plan prices
- Modify subscription dates directly
- Modify payment records
- Modify license rules
- Modify app version rules
- Modify remote config
- Manage channel lists
- Manage stream sources
- Access playlist marketplace features
- Access backend-owned content catalogs

## Permission Matrix

| Feature | Admin | Reseller | Customer |
|---|---:|---:|---:|
| Manage all users | Yes | No | No |
| Manage own account | Yes | Yes | Yes |
| Manage all customers | Yes | No | No |
| Manage own customers | Yes | Yes | No |
| View own subscription | Yes | Yes | Yes |
| Manage plans | Yes | No | No |
| Manage payments | Yes | Limited own records | Own records only |
| Approve manual payments | Yes | No | No |
| Add reseller credit | Yes | No | No |
| Adjust reseller credit | Yes | No | No |
| Use reseller credit | Yes | Yes | No |
| Manage app versions | Yes | No | No |
| Manage remote config | Yes | No | No |
| View audit logs | Yes | Limited if allowed | No |
| Activate own device | Yes | Limited customer scope | Yes |
| Optional playlist transfer | Yes | Limited customer scope | Own devices only |
| Manage stream sources | No | No | No |
| Manage channel packages | No | No | No |
| Manage playlist marketplace | No | No | No |

## Ownership Rules

Customer-owned resources must be scoped by customer ID.

Reseller-owned resources must be scoped by reseller ID.

Admin users may access global resources.

Reseller users may access only resources connected to their reseller account.

Customer users may access only resources connected to their own user account.

Ownership checks are mandatory for:

- Customer profile
- Customer subscription
- Customer payments
- Customer devices
- Customer playlist transfers
- Reseller customers
- Reseller credit transactions
- Reseller sales records
- Reseller customer subscriptions
- Reseller customer devices

## Resource Status Rules

Authorization must also consider resource status.

Examples:

- Disabled user cannot access protected resources.
- Suspended reseller cannot create customers.
- Suspended reseller cannot use credit.
- Blocked device cannot pass license check.
- Expired subscription cannot allow licensed access.
- Cancelled payment cannot extend subscription.
- Expired playlist transfer cannot be consumed.

## API Authorization Rules

Every protected API endpoint should validate:

- Access token
- User status
- User role
- Resource ownership
- Resource status
- Action permission

Admin endpoints require admin role.

Reseller endpoints require reseller role and reseller ownership.

Customer endpoints require customer ownership.

App-facing endpoints must validate device and license context.

## Web Route Rules

Suggested web route groups:

- /admin
- /reseller
- /dashboard
- /login
- /register
- /pricing
- /download

Route behavior:

- Admin users route to /admin.
- Reseller users route to /reseller.
- Customer users route to /dashboard.
- Unauthenticated users route to /login where needed.

Frontend routing must not replace backend authorization.

## Audit Requirements

The following role-related actions should be audit logged:

- Admin creates user
- Admin updates user
- Admin disables user
- Admin changes role
- Admin creates reseller
- Admin disables reseller
- Admin adds reseller credit
- Admin adjusts reseller credit
- Admin changes subscription
- Admin approves manual payment
- Admin rejects manual payment
- Admin blocks device
- Admin unblocks device
- Admin changes app version rules
- Admin changes remote config
- Reseller creates customer
- Reseller updates customer
- Reseller uses credit
- Reseller extends subscription
- Customer creates playlist transfer
- App consumes playlist transfer

Audit logs must not contain sensitive data.

## Sensitive Data Restrictions

No role should receive these values from the API:

- password_hash
- refresh_token_hash
- full access token of another session
- full refresh token
- payment card data
- payment provider secrets
- encryption keys
- playlist credentials from backend storage
- internal secrets

## Future Roles

More granular roles may be added later only with approval.

Possible future roles:

- Support staff
- Finance admin
- Read-only admin
- Reseller manager
- Affiliate
- Developer operator

These roles require separate approval before implementation.

## Future Permission System

The MVP may use simple role-based access control.

A later version may support more granular permissions.

Possible future permission areas:

- users.read
- users.write
- resellers.read
- resellers.write
- payments.read
- payments.approve
- devices.block
- app_versions.write
- remote_config.write
- audit_logs.read

Do not add complex permission systems before MVP unless approved.

## Role Testing Requirements

Tests should verify:

- Admin can access admin endpoints.
- Reseller cannot access admin endpoints.
- Customer cannot access admin endpoints.
- Customer cannot access reseller endpoints.
- Reseller cannot access another reseller's customers.
- Customer cannot access another customer's data.
- Reseller credit cannot be modified from frontend values.
- Disabled users cannot access protected resources.
- Suspended resellers cannot use credit.
- Blocked devices cannot pass license checks.

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

Do not create conflicting alternative user role files.

## Final Rule

Keep role boundaries strict.

Do not let frontend checks replace backend authorization.

Do not let resellers access other reseller data.

Do not let customers access other user data.

Do not add content-provider permissions to any role.

No role should manage channels, streams, playlists as backend-owned data, content catalogs, or broadcast infrastructure.
