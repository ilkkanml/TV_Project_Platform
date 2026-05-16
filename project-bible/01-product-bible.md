# 01 - Product Bible

This file defines the product identity, product scope, users, value proposition, and strict boundaries of TV Project Platform.

## Product Name

TV Project Platform

## Product Type

Licensed IPTV Player Platform

## Product Summary

TV Project Platform is a software platform for managing licensed player access, subscriptions, devices, reseller accounts, payments, app configuration, and optional secure web-to-device playlist profile transfer.

The platform supports an Android TV or Fire TV player app.

The platform does not provide TV content.

The platform does not provide streams.

The platform does not sell channels.

The platform does not act as a playlist provider.

## Core Product Decision

The product is a player platform.

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

## Reseller User

The reseller sells or manages software player licenses.

Reseller responsibilities include:

- Creating own customers
- Managing own customers
- Assigning subscriptions using credits
- Viewing own credit balance
- Viewing own credit transactions
- Viewing own sales history
- Viewing own customer device/license status

The reseller must not access customers owned by another reseller.

The reseller must not sell channels or content through this platform.

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
- Optional playlist profile transfer to user-owned devices
- Clear separation from content delivery

## Main Product Modules

The planned product modules are:

- Public website
- Customer panel
- Reseller panel
- Admin panel
- Authentication system
- Subscription system
- License system
- Device activation system
- Reseller credit system
- Payment system
- App version system
- Remote config system
- Optional playlist push bridge
- Audit log system

## Public Website

The public website should explain the platform clearly.

The website should include:

- Home page
- Pricing page
- Device selector page
- Download page
- FAQ page
- Legal pages

The website must explain that the platform is a player platform.

The website must not imply that channels or streams are included.

## Customer Panel

The customer panel should include:

- Account overview
- Subscription status
- Device list
- Payment history
- Optional playlist profile transfer
- Settings

The customer panel must not become a playlist marketplace.

The customer panel must not provide channel lists.

## Reseller Panel

The reseller panel should include:

- Dashboard overview
- Customer list
- Customer creation
- Customer subscription assignment
- Credit balance
- Credit transactions
- Sales history
- Settings

The reseller panel must not provide content-selling tools.

The reseller panel must not manage channel packages.

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
- The temporary payload should be deleted after pickup when possible.

## Multi-Profile Decision

The app should support multiple playlist profiles.

Example profiles:

- Home playlist
- Sports profile
- Family profile
- Test profile

Each profile should be managed locally in the app.

The user should be able to switch between profiles.

## License Product Decision

The backend is the authority for software license state.

The app must check license status before allowing access to player functionality.

License status may depend on:

- User account status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Remote config rules

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

## Subscription Product Decision

Subscriptions represent software access.

Subscriptions do not represent channel access.

Subscriptions do not represent stream access.

Subscriptions do not include content.

A subscription may control:

- Account access
- Player license validity
- Device activation limits
- Feature access
- App access

## Payment Product Decision

Payments are for software/player access.

Payments are not for channels.

Payments are not for streams.

Payments are not for playlists.

Payments are not for content packages.

Manual payment records may be supported during MVP.

Real payment integration should use approved payment providers.

## Reseller Product Decision

Reseller credit represents platform credit.

Reseller credit is used for software license and subscription operations.

Reseller credit must not represent content access.

Reseller credit operations must be transaction-based.

Every credit operation must create a transaction record.

## Marketing Positioning

Approved positioning:

- Licensed IPTV player platform
- Player license management platform
- Device activation platform
- Subscription management platform
- Reseller management platform
- App configuration platform

Avoid positioning:

- IPTV provider
- Channel provider
- Stream provider
- Content provider
- Playlist provider
- TV package seller

## Messaging Rules

Use phrases like:

- Manage your licensed player access
- Activate your device
- Manage your subscription
- Configure your player app
- Use your own legal playlist or provider information
- Secure player platform for supported devices

Avoid phrases like:

- Watch included channels
- Get IPTV channels
- Buy channel packages
- Stream our content
- Access our playlist
- We provide TV streams

## Legal Position

The platform is software.

The platform is not media.

The platform does not provide content.

The platform does not verify or endorse user playlist content.

Users must use only playlist or provider information that they are legally allowed to access.

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

## MVP Must Not Include

MVP must not include:

- Stream hosting
- Stream relay
- Channel selling
- Channel package management
- Playlist marketplace
- Content catalog
- CDN stream delivery
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
- Encrypted cloud playlist sync with explicit user consent

Each post-MVP idea requires separate approval.

## Success Criteria

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

## Failure Conditions

The product fails its intended scope if it becomes:

- Content provider
- IPTV provider
- Playlist provider
- Stream relay
- Channel package system
- CDN stream delivery system
- Backend playlist authority

## Final Product Rule

Keep the product focused on licensed player access.

Keep playlist credentials local to the app by default.

Keep the backend focused on accounts, licenses, subscriptions, payments, resellers, devices, app versions, remote config, and temporary secure transfer flows.

Do not turn the platform into a content provider.
