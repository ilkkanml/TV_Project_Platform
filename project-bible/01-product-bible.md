# 01 - Product Bible

This file defines the product identity, product scope, users, value proposition, product modules, MVP scope, and strict product boundaries of TV Project Platform.

This file must be respected by all future implementation, documentation, UI, API, database, marketing, payment, reseller, support, and app integration work.

## Product Name

TV Project Platform

## Product Type

Licensed IPTV Player Platform

## Product Summary

TV Project Platform is a software platform for managing licensed player access, subscriptions, devices, reseller accounts, payments, app configuration, app version control, remote configuration, audit logs, and optional secure web-to-device playlist profile transfer.

The platform supports an Android TV or Fire TV player app.

The platform does not provide TV content.

The platform does not provide streams.

The platform does not sell channels.

The platform does not act as a playlist provider.

## Core Product Decision

The product is a licensed player platform.

The product is not a content platform.

The backend is responsible for software access and license management.

The app is responsible for playback and local playlist profile management.

Users are responsible for their own legal playlist or provider information.

## Product Is

The product is:

- A licensed player platform
- A software subscription platform
- A device activation platform
- A customer account platform
- A reseller management platform
- A payment management platform
- An app configuration platform
- A remote config platform
- A software license validation platform
- A platform for app version control
- A platform for audit logging
- A temporary secure profile transfer bridge when enabled

## Product Is Not

The product is not:

- IPTV provider
- Broadcast provider
- Content provider
- Channel provider
- Stream provider
- Playlist provider
- CDN provider
- Relay provider
- Transcoding provider
- Channel package seller
- Content marketplace
- Playlist marketplace
- Broadcast infrastructure
- Stream delivery infrastructure

## Main Product Boundary

The backend must never provide, host, relay, transcode, package, sell, resell, or distribute TV streams.

The backend must never operate as a CDN.

The backend must never become a stream relay.

The backend must never become a broadcast backend.

The backend must never become the source of truth for playlist data.

The backend must never sell channel lists.

The backend must never provide IPTV subscriptions that include content access.

## Target Users

The product has three primary user groups:

- Admin
- Reseller
- Customer

## Admin User

The admin manages the platform.

Admin responsibilities include:

- User management
- Customer management
- Reseller management
- Plan management
- Subscription management
- Payment management
- Device management
- App version management
- Remote config management
- Audit log review
- System settings

Admin users must not manage stream sources, channel packages, or backend-owned playlist content.

## Reseller User

The reseller sells or manages software player licenses.

Reseller responsibilities include:

- Creating own customers
- Managing own customers
- Assigning software subscriptions using credit
- Extending software subscriptions using credit
- Viewing own credit balance
- Viewing own credit transactions
- Viewing own sales history
- Viewing own customer device and license status

The reseller must not access customers owned by another reseller.

The reseller must not sell channels, streams, playlists, or content through this platform.

## Customer User

The customer uses the software player platform.

Customer responsibilities include:

- Managing own account
- Viewing own subscription
- Viewing own devices
- Viewing own payment history
- Activating own devices
- Optionally sending a playlist profile to own device

The customer provides their own legal playlist or provider information.

Customers must not access admin or reseller resources.

## Product Value

The platform provides value by offering:

- Centralized player license management
- Customer account management
- Device activation
- Subscription tracking
- Reseller credit management
- Payment tracking
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional playlist profile transfer to user-owned devices
- Clear separation from content delivery

## Main Product Modules

The planned product modules are:

- Public website
- Customer panel
- Reseller panel
- Admin panel
- Authentication system
- Role-based access control
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
- API application
- Web application

## Public Website

The public website should explain the platform clearly.

The website should include:

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

The website must explain that the platform is a player platform.

The website must not imply that channels or streams are included.

## Customer Panel

The customer panel should include:

- Account overview
- Subscription status
- License status
- Device list
- Payment history
- Optional playlist profile transfer
- Settings
- Logout

The customer panel must only show the customer's own data.

The customer panel must not become a playlist marketplace.

The customer panel must not provide channel lists.

## Reseller Panel

The reseller panel should include:

- Dashboard overview
- Own customer list
- Customer creation
- Customer subscription assignment
- Customer subscription extension
- Credit balance
- Credit transactions
- Sales history
- Settings
- Logout

The reseller panel must not provide content-selling tools.

The reseller panel must not manage channel packages.

The reseller panel must not manage stream sources.

## Admin Panel

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

The admin panel must not include stream source management.

The admin panel must not include channel package management.

The admin panel must not include content catalog management.

## App Relationship

The Android TV or Fire TV app is the player client.

The app should:

- Generate an app device ID
- Activate the device with the backend
- Check license status
- Check subscription status
- Check app version
- Fetch remote config
- Manage local playlist profiles
- Store playlist credentials securely on the device
- Support multiple playlist profiles
- Allow profile switching
- Respect maintenance mode
- Respect force update rules

The app must not expect the backend to provide channels, streams, playlists, or content.

## Backend Relationship

The backend should provide app-facing APIs for:

- Authentication
- Device activation
- Device status
- License status
- Subscription status
- App version rules
- Remote configuration
- Optional temporary playlist profile transfer consumption

The backend must not provide:

- Stream URLs
- Channel lists
- Playlist marketplace data
- Content catalogs
- Broadcast schedules
- CDN stream routes

## Playlist Product Decision

Playlist information is not backend source of truth.

By default:

- The user enters playlist information inside the app.
- The app stores playlist credentials locally.
- The app uses encrypted local storage.
- The backend does not permanently store playlist credentials.

Optional feature:

- The user may send a playlist profile from the web panel to their own device.
- The backend acts only as a temporary encrypted transfer bridge.
- The temporary payload expires.
- The temporary payload should be deleted or marked consumed after pickup when possible.

## Local-First Playlist Model

The app should manage playlist profiles locally.

The app should support:

- Add profile
- Edit profile
- Delete profile
- Rename profile
- Select active profile
- Switch profile
- Store credentials securely
- Keep profile data local by default

The backend must not be required for normal playlist profile storage.

## Multi-Profile Decision

The app should support multiple playlist profiles.

Example profiles:

- Home profile
- Family profile
- Sports profile
- Test profile
- Provider A profile
- Provider B profile

Each profile should be managed locally in the app by default.

The user should be able to switch between profiles.

## Optional Playlist Transfer Decision

The optional web-to-device playlist profile transfer exists only for convenience.

It must not become permanent backend playlist storage.

It must not become a playlist provider feature.

It must not become a shared playlist library.

It must not become a playlist marketplace.

The transfer payload must be:

- Temporary
- Encrypted
- User-scoped
- Device-scoped
- Expirable
- Deleted or marked consumed after pickup when possible

## License Product Decision

The backend is the authority for software license state.

The app must check license status before allowing access to licensed player functionality.

License status may depend on:

- User account status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Remote config rules
- Maintenance mode

The app must not decide final license validity alone.

## Device Product Decision

MAC address must not be the primary device identifier.

Primary identity:

- app_generated_device_id

Secondary signals:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

The app should generate app_generated_device_id on first launch and persist it securely.

## Subscription Product Decision

Subscriptions represent software/player access.

Subscriptions do not represent channel access.

Subscriptions do not represent stream access.

Subscriptions do not include content.

A subscription may control:

- Account access
- Player license validity
- Device activation limits
- Feature access
- App access
- Subscription expiration
- Renewal flow

## Plan Product Decision

Plans represent software access options.

Plans may include:

- Name
- Description
- Duration
- Price
- Currency
- Device limit
- Reseller credit cost
- Active status
- Visibility status

Plans must not represent:

- Channel packages
- Stream packages
- Content bundles
- Playlist provider access

## Payment Product Decision

Payments are for software/player access.

Payments are not for channels.

Payments are not for streams.

Payments are not for playlists.

Payments are not for content packages.

Manual payment records may be supported during MVP.

Real payment integration should use approved payment providers.

Possible payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

## Reseller Product Decision

Reseller credit represents platform credit.

Reseller credit is used for software license and subscription operations.

Reseller credit must not represent content access.

Reseller credit operations must be transaction-based.

Every credit operation must create a transaction record.

A simple reseller balance field is not enough.

## Reseller Credit Product Rules

The reseller credit system must:

- Track balance
- Track every transaction
- Prevent negative balances
- Use backend-calculated credit costs
- Ignore frontend-provided trusted credit values
- Use database transactions
- Create audit logs for critical changes

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

## App Version Product Decision

The platform should support app version control.

Admin should be able to manage:

- Platform
- Version code
- Version name
- Minimum version code
- Force update flag
- APK URL
- Changelog
- Active status

The app should fetch app version rules and respect force update decisions.

## Remote Config Product Decision

The platform should support remote configuration.

Remote config may include:

- Maintenance mode
- Maintenance message
- Announcement
- Feature flags
- Minimum version code
- Platform-specific configuration

Remote config must not include secrets.

Remote config must not include playlist credentials.

## Audit Log Product Decision

Critical platform actions must be audit logged.

Audit logs should help with:

- Security review
- Reseller credit tracking
- Payment review
- Subscription changes
- Device blocking
- Admin accountability
- Support investigation

Audit logs must not contain sensitive data.

Audit logs must not contain playlist credentials.

Audit logs must not contain payment card data.

## Marketing Positioning

Approved positioning:

- Licensed IPTV player platform
- Player license management platform
- Device activation platform
- Subscription management platform
- Reseller management platform
- App configuration platform
- Software access platform for supported TV devices

Avoid positioning:

- IPTV provider
- Channel provider
- Stream provider
- Content provider
- Playlist provider
- TV package seller
- Content marketplace
- Playlist marketplace

## Messaging Rules

Use phrases like:

- Manage your licensed player access
- Activate your device
- Manage your subscription
- Configure your player app
- Use your own legal playlist or provider information
- Secure player platform for supported devices
- Manage reseller credit and software subscriptions

Avoid phrases like:

- Watch included channels
- Get IPTV channels
- Buy channel packages
- Stream our content
- Access our playlist
- We provide TV streams
- Browse our channel list
- Get premium content

## Legal Position

The platform is software.

The platform is not media.

The platform does not provide content.

The platform does not verify, endorse, sell, provide, or distribute user playlist content.

Users must use only playlist or provider information that they are legally allowed to access.

Payments are for software/player access only.

Reseller credit is for software subscription operations only.

## MVP Product Scope

MVP should include:

- Authentication
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

## Post-MVP Product Ideas

Possible future features:

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

Each post-MVP idea requires separate approval.

## Future Approval Required

These features require explicit approval before implementation:

- Real payment provider integration
- Encrypted cloud playlist sync
- Affiliate or referral system
- SMS notifications
- Admin two-factor authentication
- Advanced reseller commission model
- Invoice and PDF receipt generation
- Support ticket system
- Multi-currency pricing
- Sub-reseller model

## Forbidden Product Features

Do not add:

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
- Public playlist search
- Shared playlist library
- Channel inventory management

## Product Success Criteria

The product is successful if it provides:

- Clear player-only positioning
- Secure account management
- Reliable subscription tracking
- Reliable license validation
- Clean device activation
- Safe reseller credit system
- Safe payment workflow
- Clear admin panel
- Clear reseller panel
- Clear customer panel
- App integration readiness
- Strong product boundary protection
- Clear legal messaging

## Product Failure Conditions

The product fails its intended scope if it becomes:

- Content provider
- IPTV provider
- Playlist provider
- Stream relay
- Stream hosting service
- Channel package system
- CDN stream delivery system
- Backend playlist authority
- Broadcast management platform

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

Do not create conflicting alternative product bible files.

## Final Product Rule

Keep the product focused on licensed player access.

Keep playlist credentials local to the app by default.

Keep the backend focused on accounts, licenses, subscriptions, payments, resellers, devices, app versions, remote config, audit logs, and temporary secure transfer flows.

Do not turn the platform into a content provider.

Do not turn the backend into playlist authority.

Do not add stream-hosting or channel-selling features.
