# 03 - Feature List

This file defines the planned product features for TV Project Platform.

The feature list must follow the player-only product boundary.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a content provider.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Forbidden Features

Do not build features for:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package management
- Playlist marketplace
- Public playlist search
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default permanent cloud playlist storage

## Core Feature Groups

The platform will include these feature groups:

- Public website
- Authentication
- Customer panel
- Reseller panel
- Admin panel
- Subscription system
- License system
- Device activation system
- Reseller credit system
- Payment system
- App version system
- Remote config system
- Optional playlist push bridge
- Audit log system
- Shared package
- API foundation
- Web foundation
- Documentation

## Public Website Features

The public website should include:

- Home page
- Pricing page
- Device selector page
- Download page
- FAQ page
- Terms of service page
- Privacy policy page
- Refund policy page
- Contact/support entry point

Messaging must clearly explain that the product is a player platform.

The public website must not imply that channels or streams are included.

## Authentication Features

Authentication should include:

- Register
- Login
- Logout
- Refresh token
- Password hashing
- Current user endpoint
- Role-based session state
- Password reset later
- Email verification later
- Admin 2FA later

MVP should include:

- Login
- Register
- Logout
- Refresh token
- Password hashing
- Current user endpoint

## Role Features

The platform has three primary roles:

- Admin
- Reseller
- Customer

Role features should include:

- Backend role guards
- Protected API routes
- Protected dashboard routes
- Resource ownership checks
- Admin-only actions
- Reseller-only actions
- Customer-only actions

Frontend route protection is not enough.

Backend authorization is mandatory.

## Customer Panel Features

Customer panel should include:

- Dashboard overview
- Subscription status
- License status
- Device list
- Payment history
- Account settings
- Optional playlist profile transfer
- Logout

Customer panel must only show the customer's own data.

## Customer Subscription Features

Customer subscription features should include:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Renewal options
- Expired subscription notice
- Payment history

Subscriptions represent software access.

Subscriptions do not represent channel access.

## Customer Device Features

Customer device features should include:

- Device list
- Device status
- Device activation state
- Device name
- Device platform
- App version
- License status
- Blocked status
- Last seen date

MAC address must not be the primary device identifier.

Primary identity should be app_generated_device_id.

## Optional Customer Playlist Push Features

Optional playlist push features should include:

- Select own device
- Create temporary playlist profile transfer
- Send profile to device
- Show transfer status
- Expire transfer payload
- Delete payload after pickup when possible

This feature must remain a temporary transfer bridge.

The backend must not become playlist source of truth.

## Reseller Panel Features

Reseller panel should include:

- Dashboard overview
- Own customer list
- Create own customer
- View own customer subscriptions
- View own customer devices
- View own credit balance
- View own credit transactions
- View own sales history
- Settings

Resellers must only access their own customers.

## Reseller Credit Features

Reseller credit features should include:

- Current credit balance
- Credit transaction history
- Credit usage for subscription assignment
- Credit usage for subscription extension
- Credit refund when allowed
- Admin credit addition
- Admin credit adjustment
- Audit logging

Every credit operation must create a transaction record.

Frontend credit values must not be trusted.

Credit usage must be handled inside database transactions.

## Admin Panel Features

Admin panel should include:

- Dashboard overview
- User management
- Customer management
- Reseller management
- Plan management
- Subscription management
- Payment management
- Device management
- App version management
- Remote config management
- Audit logs
- System settings

Admin panel must not include stream source management.

Admin panel must not include channel package management.

## Admin User Management Features

Admin user management should include:

- View users
- Create users
- Update users
- Disable users
- Assign roles
- View user status
- View user created date

Passwords must not be visible.

Passwords must never be stored in plain text.

## Admin Reseller Features

Admin reseller features should include:

- Create reseller
- Update reseller
- Disable reseller
- View reseller customers
- View reseller sales
- View reseller credit balance
- Add reseller credit
- Adjust reseller credit
- View reseller credit transactions

Credit changes must be audit logged.

## Admin Plan Features

Admin plan features should include:

- Create plan
- Update plan
- Disable plan
- Set duration
- Set price
- Set currency
- Set device limit
- Set visibility

Backend must calculate prices and durations.

Frontend values must not be trusted.

## Admin Subscription Features

Admin subscription features should include:

- View subscriptions
- Create subscription
- Extend subscription
- Cancel subscription
- Expire subscription
- View subscription history
- View related user
- View related plan

Subscription changes should be audit logged.

## Admin Payment Features

Admin payment features should include:

- View payments
- Create manual payment record
- Approve manual payment
- Reject manual payment
- View payment provider reference
- View payment status
- View customer payment history

Card data must not be stored.

Payment webhook signatures must be verified when providers are integrated.

## Admin Device Features

Admin device features should include:

- View devices
- View device owner
- View device platform
- View app version
- View license status
- Block device
- Unblock device
- View last seen date
- View activation date

Device blocking should affect license status.

## App Version Features

App version features should include:

- Version code
- Version name
- Platform
- Minimum version code
- Force update flag
- APK URL
- Changelog
- Active status

App-facing endpoint may include:

- GET /app/version

## Remote Config Features

Remote config features should include:

- Maintenance mode
- Maintenance message
- Announcement message
- Feature flags
- Minimum app version
- Platform-specific config

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled

App-facing endpoint may include:

- GET /remote-config

## License Features

License features should include:

- License status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Remote config rules
- Expiration handling
- Access allowed flag
- Access denied reason

App-facing endpoint may include:

- GET /license/status

## Device Activation Features

Device activation features should include:

- app_generated_device_id support
- Platform detection
- Device name
- App version metadata
- Device ownership
- Device status
- Activation date
- Last seen date

App-facing endpoints may include:

- POST /device/activate
- GET /device/status

## Payment Features

MVP payment features may include:

- Manual payment records
- Payment status tracking
- Admin approval
- Admin rejection
- Customer payment history
- Payment reference field

Post-MVP payment features may include:

- Iyzico integration
- PayTR integration
- Stripe integration
- Webhook verification
- Automatic subscription extension
- Invoice generation
- PDF receipts
- Multi-currency support

## Audit Log Features

Audit log features should include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Actions to audit include:

- Admin user changes
- Role changes
- Reseller creation
- Reseller credit changes
- Subscription changes
- Payment approvals
- Device blocking
- App version changes
- Remote config changes
- Playlist transfer creation
- Playlist transfer consumption

## API Foundation Features

API foundation should include:

- NestJS setup
- Environment config
- Prisma setup
- PostgreSQL connection
- Redis connection
- Global response format
- Global error format
- Validation pipe
- Exception filter
- Auth guards
- Role guards
- Health endpoint

## Web Foundation Features

Web foundation should include:

- Next.js setup
- TypeScript setup
- Tailwind CSS setup
- Root layout
- Global styles
- Public pages
- Auth pages
- Dashboard layouts
- Shared UI components
- API client
- Route constants
- Auth helpers
- Protected route middleware

## Shared Package Features

Shared package should include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Reseller transaction types
- Shared API response types
- Shared validation schemas
- Shared TypeScript types

## Documentation Features

Documentation should include:

- New chat start message
- Architecture guide
- Development workflow
- Local setup guide
- Deployment guide
- Environment variables guide
- API error codes guide
- App team handoff
- Admin guide
- Reseller guide
- Customer guide
- Payment provider notes

## MVP Feature Set

MVP should include:

- Auth
- Role-based access control
- Customer panel
- Reseller panel
- Admin panel
- Plan management
- Subscription management
- Device activation
- License status API
- App version API
- Remote config API
- Reseller credit system
- Manual payment records
- Audit logs

## Post-MVP Feature Set

Post-MVP may include:

- Real payment provider integration
- Email notifications
- SMS notifications
- Ticket system
- Affiliate system
- Referral codes
- Invoice generation
- PDF receipts
- Admin two-factor authentication
- Advanced device limits
- Encrypted cloud playlist sync with explicit user consent

## Feature Approval Rules

The following features require explicit approval before implementation:

- Encrypted cloud playlist sync
- Affiliate system
- SMS notifications
- Admin 2FA
- Multi-currency pricing
- Invoice generation
- Payment provider selection
- Advanced reseller commission models
- Support ticket system

## Never Add Without Approval

Do not add these features without explicit approval:

- Stream hosting
- Stream relay
- Stream transcoding
- Channel package management
- Playlist marketplace
- Content catalog
- CDN stream delivery
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage

## Final Rule

Every feature must respect the licensed player platform model.

If a feature makes the platform look like an IPTV provider, content provider, stream provider, playlist provider, or channel seller, it must not be implemented.
