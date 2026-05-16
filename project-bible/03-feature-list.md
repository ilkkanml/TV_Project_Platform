# 03 - Feature List

This file defines the planned feature set for TV Project Platform.

Every feature must respect the licensed player platform model.

The platform must not become an IPTV provider, content provider, stream provider, channel seller, playlist provider, or broadcast backend.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The platform may provide features for:

- Software account management
- Player license management
- Subscription management
- Device activation
- Reseller management
- Payment tracking
- App version control
- Remote configuration
- Audit logging
- Optional temporary web-to-device playlist profile transfer

The platform must not provide features for:

- TV channels
- Live streams
- VOD streams
- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel packages
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
- Role-based access control
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
- Testing and QA
- DevOps and deployment

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
- Acceptable use policy page
- Contact or support entry point

The public website must clearly explain that the product is a player platform.

The public website must not imply that channels, streams, playlists, or content are included.

## Public Website Required Messaging

The website should clearly state:

TV Project Platform is a licensed player platform. It does not provide channels, streams, playlists, or content. Users are responsible for using their own legal playlist or provider information.

This message or a similar version should appear on important public pages.

## Authentication Features

Authentication should include:

- Register
- Login
- Logout
- Refresh token
- Current user endpoint
- Password hashing
- Role-aware session state
- Password reset later
- Email verification later
- Admin two-factor authentication later

MVP authentication should include:

- Login
- Register
- Logout
- Refresh token
- Password hashing
- Current user endpoint

## Role-Based Access Features

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

The customer panel should include:

- Dashboard overview
- Account profile
- Subscription status
- License status
- Device list
- Payment history
- Optional playlist profile transfer
- Settings
- Logout

Customer panel must only show the customer's own data.

Customer panel must not become a playlist marketplace.

Customer panel must not provide channel lists.

## Customer Dashboard Features

Customer dashboard should show:

- Current subscription status
- License status
- Active devices
- Payment history summary
- App download shortcut
- Optional playlist transfer shortcut
- Important notices
- Expiration warnings

## Customer Subscription Features

Customer subscription features should include:

- Current plan
- Subscription status
- Start date
- End date
- Remaining time
- Renewal options
- Expired subscription notice
- Payment history link

Subscriptions represent software/player access.

Subscriptions do not represent channel access, stream access, playlists, or content.

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
- Activation date
- Last seen date

MAC address must not be the primary device identifier.

Primary identity should be:

- app_generated_device_id

## Optional Customer Playlist Push Features

Optional playlist push features should include:

- Select own device
- Create temporary playlist profile transfer
- Send profile to device
- Show transfer status
- Show expiration status
- Expire transfer payload
- Delete or mark payload consumed after pickup when possible

This feature must remain a temporary encrypted transfer bridge.

The backend must not become playlist source of truth.

## Reseller Panel Features

The reseller panel should include:

- Dashboard overview
- Own customer list
- Create own customer
- View own customer subscriptions
- Create own customer subscriptions
- Extend own customer subscriptions
- View own customer devices
- View own customer license status
- View own credit balance
- View own credit transactions
- View own sales history
- Settings
- Logout

Resellers must only access their own customers.

Resellers must not sell channels, streams, playlists, or content through this platform.

## Reseller Dashboard Features

Reseller dashboard should show:

- Current credit balance
- Total own customers
- Active own subscriptions
- Expired own subscriptions
- Recent credit transactions
- Recent sales
- Recent customer activity
- Low credit warning later

All reseller dashboard data must be scoped to the logged-in reseller.

## Reseller Customer Features

Reseller customer features should include:

- Customer list
- Customer creation
- Customer detail
- Customer subscription status
- Customer device status
- Customer license status
- Customer subscription creation
- Customer subscription extension

Reseller must not access customers owned by another reseller.

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

Negative reseller balances must be prevented.

## Reseller Sales Features

Reseller sales history should represent software subscription operations only.

Sales history may include:

- Customer
- Plan
- Credit used
- Subscription start date
- Subscription end date
- Created date
- Created by reseller user

Sales history must not represent channel or stream sales.

## Admin Panel Features

The admin panel should include:

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

Admin panel must not include:

- Stream source management
- Channel package management
- Content catalog management
- Playlist marketplace management
- CDN stream route management

## Admin Dashboard Features

Admin dashboard should show:

- Total users
- Total customers
- Total resellers
- Active subscriptions
- Expired subscriptions
- Recent payments
- Recent reseller credit activity
- Recent device activations
- System status
- Important warnings

## Admin User Management Features

Admin user management should include:

- View users
- Create users
- Update users
- Disable users
- Suspend users
- Assign roles
- View user status
- View created date

Passwords must never be visible.

Passwords must never be stored in plain text.

Password hashes must never be returned by the API.

## Admin Reseller Features

Admin reseller features should include:

- Create reseller
- Update reseller
- Disable reseller
- Suspend reseller
- View reseller customers
- View reseller sales
- View reseller credit balance
- Add reseller credit
- Adjust reseller credit
- View reseller credit transactions

Credit changes must create transaction records.

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
- Set reseller credit cost
- Set visibility

Backend must calculate prices, durations, device limits, and credit costs.

Frontend values must not be trusted.

Plans must represent software/player access only.

## Admin Subscription Features

Admin subscription features should include:

- View subscriptions
- Create subscription
- Extend subscription
- Cancel subscription
- Suspend subscription
- Expire subscription
- View subscription history
- View related user
- View related plan
- View source

Subscription changes should be audit logged.

Subscriptions must not represent channel packages or stream packages.

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

Payment provider secrets must not be exposed.

Payment webhook signatures must be verified when providers are integrated.

## Admin Device Features

Admin device features should include:

- View devices
- View device owner
- View device platform
- View app version
- View license status
- View activation date
- View last seen date
- Block device
- Unblock device

Device blocking should affect license status.

Device identity should use app_generated_device_id as primary identity.

## App Version Features

App version features should include:

- Platform
- Version code
- Version name
- Minimum version code
- Force update flag
- APK URL
- Changelog
- Active status

App-facing endpoint may include:

- GET /app/version

The app should respect force update and minimum version rules.

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

Remote config must not include secrets.

Remote config must not include playlist credentials.

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

The backend is the license authority.

The app must not decide final license validity alone.

## Device Activation Features

Device activation features should include:

- app_generated_device_id support
- Platform detection
- Device name
- Device model
- App version metadata
- Device ownership
- Device status
- Activation date
- Last seen date

App-facing endpoints may include:

- POST /device/activate
- GET /device/status
- PATCH /device/heartbeat

MAC address must not be the primary identity.

## Payment Features

MVP payment features may include:

- Manual payment records
- Payment status tracking
- Admin approval
- Admin rejection
- Customer payment history
- Payment reference field
- Subscription extension after approval
- Audit logging

Post-MVP payment features may include:

- Iyzico integration
- PayTR integration
- Stripe integration
- Webhook verification
- Automatic subscription extension
- Refund processing
- Invoice generation
- PDF receipts
- Multi-currency support
- Reseller credit purchase

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
- Payment rejections
- Device blocking
- App version changes
- Remote config changes
- Playlist transfer creation
- Playlist transfer consumption

Audit logs must not include sensitive data.

## API Foundation Features

API foundation should include:

- NestJS setup
- TypeScript setup
- Environment validation
- Prisma setup
- PostgreSQL connection
- Redis connection
- Global response format
- Global error format
- Validation pipe
- Exception filter
- Auth guards
- Role guards
- Ownership checks
- Health endpoint

## Web Foundation Features

Web foundation should include:

- Next.js setup
- React setup
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
- Shared constants

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

## Testing Features

Testing should include:

- Auth tests
- Role permission tests
- Ownership tests
- Subscription tests
- License tests
- Device activation tests
- Reseller credit transaction tests
- Manual payment tests
- Payment webhook tests later
- App version tests
- Remote config tests
- Playlist transfer expiration tests
- Audit log tests
- Web UI tests

## DevOps Features

DevOps should include:

- Local Docker Compose
- PostgreSQL service
- Redis service
- API build
- Web build
- Environment validation
- Prisma migration flow
- Health checks
- Deployment notes
- Backup notes
- Monitoring plan later
- CI/CD later

Infrastructure must not be designed for stream hosting or content delivery.

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
- Basic public website
- Basic legal pages

## MVP Must Not Include

MVP must not include:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel selling
- Channel package management
- Playlist marketplace
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage

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
- Advanced reseller reporting
- Encrypted cloud playlist sync with explicit user consent

Each post-MVP feature requires approval before implementation.

## Feature Approval Required

The following features require explicit approval before implementation:

- Real payment provider integration
- Encrypted cloud playlist sync
- Affiliate system
- Referral system
- SMS notifications
- Admin two-factor authentication
- Multi-currency pricing
- Invoice generation
- PDF receipt generation
- Advanced reseller commission models
- Sub-reseller model
- Support ticket system

## Forbidden Features

Do not build features for:

- Stream hosting
- Stream relay
- Stream transcoding
- Channel package management
- Playlist marketplace
- Public playlist search
- Content catalog
- CDN stream delivery
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage
- Shared playlist library
- Channel inventory management

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

Do not create conflicting alternative feature list files.

## Final Rule

Every feature must respect the licensed player platform model.

If a feature makes the platform look like an IPTV provider, content provider, stream provider, playlist provider, channel seller, or broadcast backend, it must not be implemented.
