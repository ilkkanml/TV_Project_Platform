# 00 - Project Rules

This file defines the non-negotiable project rules for TV Project Platform.

Every future feature, code change, documentation update, and architectural decision must follow these rules.

## Rule 1 - Product Identity

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a content platform.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Rule 2 - Backend Product Boundary

The backend must never provide, host, relay, transcode, package, sell, or distribute TV streams.

The backend must never operate as a CDN.

The backend must never become a broadcast backend.

The backend must never become the source of truth for playlist data.

## Rule 3 - Backend Allowed Scope

The backend may manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscriptions
- Player licenses
- Device activation
- Payment records
- Reseller accounts
- Reseller credit transactions
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary web-to-device playlist profile transfer

## Rule 4 - Backend Forbidden Scope

The backend must not manage or provide:

- TV channels
- Live streams
- VOD streams
- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel packages
- Playlist provider services
- Content ownership
- Broadcast infrastructure
- Permanent playlist credential authority

## Rule 5 - Playlist Storage

Playlist information is not backend source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the user device.

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

## Rule 6 - Optional Playlist Transfer

The user may optionally send a playlist profile from the web panel to their own device.

This feature must only work as a temporary encrypted transfer bridge.

The transfer payload must expire.

The transfer payload should be deleted after successful pickup when possible.

This feature must not turn the backend into permanent playlist storage.

This feature must not turn the backend into a playlist provider.

## Rule 7 - Encrypted Cloud Sync

Encrypted cloud sync is not part of the default architecture.

Encrypted cloud sync may be considered later only with explicit user consent.

If implemented later, it must be opt-in.

If implemented later, it must be encrypted.

If implemented later, it must not change the product into a playlist provider.

## Rule 8 - Device Identity

MAC address must not be used as the primary device identifier.

The primary device identifier should be:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## Rule 9 - User Roles

The system must support three main roles:

- Admin
- Reseller
- Customer

Each role must have isolated permissions.

Frontend route hiding is not enough.

Backend authorization is mandatory.

## Rule 10 - Admin Permissions

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
- Audit logs
- System settings

Admin actions that affect users, money, reseller credits, devices, subscriptions, or system configuration must be audit logged.

## Rule 11 - Reseller Permissions

Resellers may manage:

- Own customers
- Own credit balance
- Own sales
- Own customer subscriptions
- Own device and license records

A reseller must not access customers owned by another reseller.

A reseller must not modify system-wide settings unless explicitly permitted by an admin.

## Rule 12 - Customer Permissions

Customers may manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional playlist profile transfer to own device

Customers must not access admin or reseller resources.

Customers must not access other customers' data.

## Rule 13 - Reseller Credit System

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Every credit operation must create a transaction record.

The backend must calculate credit usage.

Frontend credit values must never be trusted.

Credit usage must happen inside database transactions.

Negative reseller balances must be prevented.

## Rule 14 - Reseller Credit Transaction Fields

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

## Rule 15 - Payment Rules

Card data must not be stored in this system.

Payment processing must use secure payment providers when real payments are enabled.

Manual payment records may be supported during MVP.

Subscription extension must happen only after verified payment confirmation.

Payment provider webhook signatures must be verified.

Frontend price values must never be trusted.

## Rule 16 - Password Security

Passwords must never be stored in plain text.

Passwords must be hashed before storage.

Recommended hashing options:

- Argon2
- bcrypt

Password hashing configuration must be production-safe.

## Rule 17 - Token Security

Authentication should use:

- Access tokens
- Refresh tokens
- Secure token expiration
- Refresh token validation
- Refresh token invalidation on logout

Access tokens should be short-lived.

Refresh tokens should be handled securely.

## Rule 18 - API Security

API endpoints must use:

- Input validation
- DTO validation
- Authentication guards
- Role guards
- Standard response format
- Standard error format
- Rate limiting for sensitive endpoints
- Audit logging for critical actions

## Rule 19 - Sensitive Data

Do not log sensitive data.

Logs must not contain:

- Plain text passwords
- Payment card data
- Playlist credentials
- Full access tokens
- Full refresh tokens
- Encryption keys
- Payment provider secrets

## Rule 20 - Environment Variables

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

The `.env.example` file may contain placeholder values only.

Production secrets must be generated securely.

## Rule 21 - Documentation First

Major architectural decisions must be documented.

Important decisions should be recorded in:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- project-bible/13-decision-log.md

## Rule 22 - Project Bible Authority

The project-bible directory is the long-term memory of the project.

Before making major changes, future assistants should check:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- project-bible directory

## Rule 23 - Code Structure

Do not build the project as a single-file application.

The project must remain modular.

The planned monorepo structure is:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

## Rule 24 - Frontend Rules

The web app should include:

- Public landing page
- Pricing page
- Device selector
- Download page
- Auth pages
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Checkout pages
- Legal pages

Frontend checks must not replace backend authorization.

## Rule 25 - Backend Rules

The API app should include:

- Auth module
- Users module
- Plans module
- Subscriptions module
- Devices module
- Licenses module
- Resellers module
- Payments module
- App versions module
- Remote config module
- Playlist push module
- Audit logs module
- Health module

## Rule 26 - Shared Package Rules

The shared package should include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Shared validation schemas
- Shared TypeScript types

## Rule 27 - Database Rules

Critical database writes must use transactions.

Transaction-required areas include:

- Reseller credit usage
- Reseller credit refunds
- Subscription extension
- Payment confirmation
- Device activation
- Playlist transfer consumption

## Rule 28 - Audit Log Rules

Audit logs should record:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

## Rule 29 - App Integration Rules

The app should:

- Generate app_generated_device_id
- Register or activate the device
- Check license status
- Check subscription status
- Check app version
- Fetch remote config
- Manage local playlist profiles
- Store playlist credentials securely on the device
- Support multiple playlist profiles
- Respect maintenance mode
- Respect force update rules

## Rule 30 - Marketing Rules

Marketing must describe the product as a licensed player platform.

Marketing must not imply:

- Included channels
- Included streams
- Included content
- IPTV subscription with content
- Channel package access
- Playlist provider access

## Rule 31 - Legal Pages

The public website should include:

- Terms of service
- Privacy policy
- Refund policy
- Acceptable use policy

These pages must clearly explain the player-only product model.

## Rule 32 - Manual Editing Workflow

Critical multiline files may be edited manually through GitHub web editor or Codespaces.

Automated GitHub connector updates previously caused files to collapse into long single-line content.

For critical documentation files, verify line counts through raw GitHub.

## Rule 33 - Raw GitHub Verification

After editing critical files, verify with:

```bash
curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_NAME | wc -l
