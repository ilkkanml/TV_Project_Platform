# 02 - User Roles

This file defines the user roles, permission boundaries, and access rules for TV Project Platform.

The platform has three primary roles:

- Admin
- Reseller
- Customer

Every protected action must be checked on the backend.

Frontend route hiding is not enough.

## Role Summary

### Admin

Admin users manage the platform.

Admins have system-wide control over users, resellers, plans, subscriptions, payments, devices, app versions, remote config, and audit logs.

### Reseller

Reseller users manage their own customers and use reseller credit to assign or extend software subscriptions.

Resellers must only access their own customers and related records.

### Customer

Customer users manage their own account, subscription, devices, payment history, and optional web-to-device playlist profile transfer.

Customers must only access their own data.

## Product Boundary

All roles operate inside the licensed player platform model.

No role should manage or sell:

- TV channels
- Live streams
- VOD streams
- Stream sources
- Channel packages
- Playlist marketplace entries
- CDN stream routes
- Broadcast infrastructure

The platform is not a content provider.

The backend is not playlist source of truth.

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

## Admin User Management

Admins may:

- View users
- Create users
- Update users
- Disable users
- Assign roles
- Reset user access when needed
- View user status

Admins should not see plain text passwords.

Passwords must never be stored in plain text.

## Admin Reseller Management

Admins may:

- Create reseller accounts
- Update reseller accounts
- Disable reseller accounts
- View reseller customers
- View reseller sales
- View reseller credit balance
- Add reseller credit
- Adjust reseller credit when needed
- View reseller credit transactions

Every reseller credit change must create a transaction record.

Every reseller credit change must be audit logged.

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

## Admin Plan Management

Admins may:

- Create plans
- Update plans
- Disable plans
- Set plan duration
- Set plan price
- Set plan currency
- Set plan device limits
- Set plan visibility

Plan pricing must be calculated by the backend.

Frontend price values must not be trusted.

## Admin Subscription Management

Admins may:

- View subscriptions
- Create subscriptions
- Extend subscriptions
- Expire subscriptions
- Cancel subscriptions
- Block access when needed
- View subscription history

Subscription changes should be audit logged.

## Admin Payment Management

Admins may:

- View payments
- Create manual payment records
- Approve manual payments
- Reject manual payments
- View payment provider references
- View payment status

Admins must not store or view card data.

Payment webhook signatures must be verified when payment providers are integrated.

## Admin Device Management

Admins may:

- View devices
- View device owner
- View device license status
- Block devices
- Unblock devices
- View device metadata
- View device activation date

Device identity should use app_generated_device_id as primary identity.

MAC address must not be used as the primary identifier.

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

## Reseller Permissions

Reseller users may manage:

- Own customers
- Own credit balance
- Own credit transactions
- Own sales
- Own customer subscriptions
- Own customer device and license records

A reseller must not access customers owned by another reseller.

A reseller must not modify global system settings.

A reseller must not manage platform-wide payment provider settings.

## Reseller Customer Management

Resellers may:

- Create own customers
- View own customers
- Update own customers when allowed
- Assign software subscriptions to own customers
- Extend own customer subscriptions using reseller credit
- View own customer devices
- View own customer license status

Resellers must not see all platform users.

Resellers must not see customers from other resellers.

## Reseller Credit Management

Resellers may:

- View own credit balance
- View own credit transaction history
- Use credits for allowed subscription operations
- View own credit usage history

Resellers may not directly set their own balance.

Resellers may not create credit out of nothing.

Reseller credit additions must be admin-controlled.

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
- Act as content providers through the platform

## Customer Permissions

Customer users may manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional web-to-device playlist profile transfer

Customers must not access admin or reseller resources.

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

Customers must not modify their own subscription without valid payment, reseller operation, or admin action.

## Customer Device Management

Customers may:

- View own devices
- Activate own device when allowed
- Rename own device when allowed
- View own device status
- See whether a device is active, blocked, or expired

Customers must not access other users' devices.

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
- Be deleted after successful pickup when possible

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
| Add reseller credit | Yes | No | No |
| Use reseller credit | Yes | Yes | No |
| Manage app versions | Yes | No | No |
| Manage remote config | Yes | No | No |
| View audit logs | Yes | Limited if allowed | No |
| Activate own device | Yes | Limited customer scope | Yes |
| Optional playlist transfer | Yes | Limited customer scope | Own devices only |

## Backend Authorization Rules

Every protected backend endpoint must check:

- Authentication
- User role
- Resource ownership
- Resource status
- Action permission

Role checks alone are not enough.

Ownership checks are required for reseller and customer resources.

## Ownership Rules

Customer-owned resources must be scoped by customer ID.

Reseller-owned resources must be scoped by reseller ID.

Admin users may access global resources.

Reseller users may access only resources connected to their reseller account.

Customer users may access only resources connected to their own user account.

## Audit Requirements

The following role-related actions should be audit logged:

- Admin creates user
- Admin updates user
- Admin disables user
- Admin changes role
- Admin creates reseller
- Admin adds reseller credit
- Admin adjusts reseller credit
- Admin changes subscription
- Admin blocks device
- Admin changes app version rules
- Admin changes remote config
- Reseller creates customer
- Reseller uses credit
- Reseller extends subscription
- Customer creates playlist transfer
- App consumes playlist transfer

## Future Permissions

More granular permissions may be added later.

Examples:

- Support staff role
- Finance-only admin
- Read-only admin
- Reseller manager
- Affiliate role

These roles require separate approval before implementation.

## Final Rule

Keep role boundaries strict.

Do not let frontend checks replace backend authorization.

Do not let resellers access other reseller data.

Do not let customers access other user data.

Do not add content-provider permissions to any role.
