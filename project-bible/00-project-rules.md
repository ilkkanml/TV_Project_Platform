# 00 - Project Rules

This file defines the non-negotiable project rules for TV Project Platform.

Every future feature, code change, documentation update, architecture decision, UI decision, API decision, database decision, reseller decision, payment decision, app integration decision, and marketing decision must follow these rules.

## Rule 1 - Product Identity

TV Project Platform is a Licensed IPTV Player Platform.

It is a software platform.

It is not an IPTV broadcast provider.

It is not a media provider.

It is not a content provider.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Rule 2 - Product Must Stay Player-Only

The product must stay focused on licensed player access.

The platform may manage software subscriptions, licenses, device activation, reseller operations, payments, app versions, remote configuration, and account access.

The platform must not become a content platform.

The platform must not become a broadcast platform.

The platform must not become a playlist marketplace.

## Rule 3 - Backend Product Boundary

The backend must never provide, host, relay, transcode, package, sell, resell, or distribute TV streams.

The backend must never operate as a CDN.

The backend must never become a stream relay.

The backend must never become a broadcast backend.

The backend must never become the source of truth for playlist data.

## Rule 4 - Backend Allowed Scope

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

## Rule 5 - Backend Forbidden Scope

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

## Rule 6 - No Content Provider Features

Do not add features for:

- Channel inventory
- Channel packages
- Stream source management
- Stream relay routes
- Stream transcoding jobs
- CDN stream delivery
- Broadcast schedules
- Content catalogs
- Playlist marketplaces
- Public playlist search
- Shared playlist libraries

These features violate the product boundary.

## Rule 7 - Playlist Storage Decision

Playlist information is not backend source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the user device.

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

## Rule 8 - Local-First Playlist Model

The app is responsible for playlist profile management.

The app should support:

- Adding playlist profiles
- Editing playlist profiles
- Deleting playlist profiles
- Selecting an active profile
- Switching between profiles
- Storing credentials securely on the device

The backend must not be required for normal playlist storage.

## Rule 9 - Optional Playlist Transfer

The user may optionally send a playlist profile from the web panel to their own device.

This feature must only work as a temporary encrypted transfer bridge.

The transfer payload must be temporary.

The transfer payload must expire.

The transfer payload should be deleted or marked consumed after successful pickup when possible.

This feature must not turn the backend into permanent playlist storage.

This feature must not turn the backend into a playlist provider.

## Rule 10 - Encrypted Cloud Sync

Encrypted cloud sync is not part of the default architecture.

Encrypted cloud sync may be considered later only with explicit user consent.

If implemented later, it must be opt-in.

If implemented later, it must be encrypted.

If implemented later, it must not change the product into a playlist provider.

Encrypted cloud sync requires explicit approval before implementation.

## Rule 11 - Device Identity

MAC address must not be used as the primary device identifier.

The primary device identifier is:

- app_generated_device_id

The app should generate this identifier on first launch and persist it securely.

## Rule 12 - Secondary Device Signals

Secondary device signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

Secondary signals may help with debugging, fraud review, and device management.

Secondary signals must not replace app_generated_device_id as the primary identity.

## Rule 13 - User Roles

The system must support three main roles:

- Admin
- Reseller
- Customer

Each role must have isolated permissions.

Frontend route hiding is not enough.

Backend authorization is mandatory.

## Rule 14 - Admin Scope

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

Admin actions that affect users, money, reseller credits, devices, subscriptions, app versions, remote config, or system configuration must be audit logged.

## Rule 15 - Reseller Scope

Resellers may manage:

- Own customers
- Own credit balance
- Own credit transactions
- Own sales
- Own customer subscriptions
- Own customer device and license records

A reseller must not access customers owned by another reseller.

A reseller must not modify system-wide settings unless explicitly permitted by an admin.

A reseller must not manage channels, streams, playlists, or content through this platform.

## Rule 16 - Customer Scope

Customers may manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional playlist profile transfer to own device

Customers must not access admin resources.

Customers must not access reseller resources.

Customers must not access other customers' data.

## Rule 17 - Backend Authorization

Every protected backend endpoint must check:

- Authentication
- User role
- Resource ownership
- Resource status
- Action permission

Role checks alone are not enough.

Ownership checks are required for reseller and customer resources.

## Rule 18 - Reseller Credit System

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Every credit operation must create a transaction record.

The backend must calculate credit usage.

Frontend credit values must never be trusted.

Credit usage must happen inside database transactions.

Negative reseller balances must be prevented.

## Rule 19 - Reseller Credit Transaction Fields

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

Corrections should use adjustment or reversal records.

Transaction history should not be silently deleted.

## Rule 20 - Reseller Credit Transaction Types

Initial reseller credit transaction types may include:

- CREDIT_ADD
- CREDIT_USE
- CREDIT_REFUND
- MANUAL_ADJUSTMENT
- REVERSAL

Every type must be processed by the backend.

Every type must be auditable.

## Rule 21 - Payment Scope

Payments are for software/player access only.

Payments may be for:

- Software access
- Player license access
- Subscription time
- Device activation rights
- Reseller credit
- Platform account features

Payments must not be for:

- TV channels
- Live streams
- VOD streams
- Channel packages
- Playlists
- Content packages
- Broadcast access

## Rule 22 - Payment Security

Card data must not be stored in this system.

Do not store:

- Card numbers
- CVV
- Full raw card payloads
- Payment provider secrets in database
- Webhook secrets in database

Payment processing must use secure payment providers when real payments are enabled.

Manual payment records may be supported during MVP.

## Rule 23 - Payment Verification

Subscription extension must happen only after verified payment confirmation.

Payment provider webhook signatures must be verified.

Frontend payment success pages must not directly extend subscriptions.

Frontend price values must never be trusted.

Frontend duration values must never be trusted.

The backend must calculate the final amount and subscription result.

## Rule 24 - Manual Payment MVP

Manual payment records may be used during MVP.

Manual payment approval must be admin-only.

Manual payment rejection must be admin-only.

Manual payment approval should create an audit log.

Manual payment rejection should create an audit log.

Manual payment approval may extend a subscription only through backend logic.

## Rule 25 - Password Security

Passwords must never be stored in plain text.

Passwords must be hashed before storage.

Recommended hashing options:

- Argon2
- bcrypt

Password hashes must never be returned by the API.

Password hashes must never be exposed in logs.

## Rule 26 - Token Security

Authentication should use:

- Access tokens
- Refresh tokens
- Secure token expiration
- Refresh token validation
- Refresh token invalidation on logout

Access tokens should be short-lived.

Refresh tokens should be handled securely.

Refresh tokens should be stored as hashes where practical.

## Rule 27 - API Security

API endpoints must use:

- Input validation
- DTO validation
- Authentication guards
- Role guards
- Ownership checks
- Standard response format
- Standard error format
- Rate limiting for sensitive endpoints
- Audit logging for critical actions

## Rule 28 - Sensitive Data

Do not log sensitive data.

Logs must not contain:

- Plain text passwords
- Payment card data
- Playlist credentials
- Full access tokens
- Full refresh tokens
- Encryption keys
- Payment provider secrets
- Database passwords

## Rule 29 - Environment Variables

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

The `.env.example` file may contain placeholder values only.

Production secrets must be generated securely.

Default secrets must never be used in production.

## Rule 30 - Database Transactions

Critical database writes must use transactions.

Transaction-required areas include:

- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription extension
- Payment confirmation
- Device activation
- Playlist transfer consumption

If one critical step fails, the full operation should rollback.

## Rule 31 - Audit Logs

Audit logs should record important platform actions.

Audit logs should include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Audit logs must not contain sensitive data.

Audit logs must not contain playlist credentials.

Audit logs must not contain payment card data.

## Rule 32 - Actions That Must Be Audited

The following actions should be audit logged:

- User creation
- User update
- User disable
- Role change
- Reseller creation
- Reseller update
- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription creation
- Subscription extension
- Subscription cancellation
- Payment approval
- Payment rejection
- Device block
- Device unblock
- App version change
- Remote config change
- Playlist transfer creation
- Playlist transfer consumption

## Rule 33 - App Integration

The Android TV or Fire TV app should:

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

## Rule 34 - License Authority

The backend is the license authority.

The app must not decide final license validity alone.

License checks should consider:

- User status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Maintenance mode
- Remote config rules

## Rule 35 - App-Facing Endpoints

App-facing endpoints may include:

- POST /device/activate
- GET /device/status
- PATCH /device/heartbeat
- GET /license/status
- GET /app/version
- GET /remote-config
- POST /playlist-push/consume

These endpoints must not return channel lists, stream URLs, playlist marketplaces, or content catalogs.

## Rule 36 - Technical Stack

The planned technical stack is:

- pnpm monorepo
- Next.js
- React
- TypeScript
- Tailwind CSS
- NestJS
- Prisma
- PostgreSQL
- Redis
- Docker Compose

Do not change the planned stack without approval.

## Rule 37 - Monorepo Structure

The planned repository structure is:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra
- .github

Do not create duplicate nested folders.

Wrong examples:

- project-bible/project-bible
- docs/docs
- apps/apps
- packages/packages

## Rule 38 - Web App Responsibility

The web app should include:

- Public landing page
- Pricing page
- Device selector
- Download page
- Login page
- Register page
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Checkout pages
- Legal pages

Frontend checks must not replace backend authorization.

## Rule 39 - API App Responsibility

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

## Rule 40 - Shared Package Responsibility

The shared package should include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Reseller transaction types
- Shared validation schemas
- Shared TypeScript types

## Rule 41 - Documentation First

Major architectural decisions must be documented.

Important decisions should be recorded in:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- project-bible/13-decision-log.md

Do not silently change important decisions.

## Rule 42 - Project Bible Authority

The project-bible directory is the long-term memory of the project.

Before making major changes, future assistants and developers should check:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

## Rule 43 - Stable Project Bible Tree

The stable project-bible tree is:

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

Do not rename these files without approval.

Do not create conflicting alternative Bible file names.

## Rule 44 - Deprecated Bible Names

Do not use these old or conflicting names:

- 02-legal-boundaries.md
- 03-playlist-philosophy.md
- 04-architecture-principles.md
- 05-reseller-credit-system.md
- 06-device-activation.md
- 07-payment-subscriptions.md
- 08-remote-config-versioning.md
- 09-security-privacy.md
- 10-ops-and-deployment.md
- 11-ui-product-guidelines.md
- 12-testing-strategy.md

If these exist, their useful content should be moved into the stable Bible tree and the old files should be removed.

## Rule 45 - Manual Editing Workflow

Critical multiline files may be edited manually through GitHub web editor or Codespaces.

Automated GitHub connector updates previously caused files to collapse into long single-line content.

For critical documentation files, verify line counts through raw GitHub.

## Rule 46 - Raw GitHub Verification

After editing critical files, verify with:

```bash
curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_PATH | wc -l

Multiline documentation files should not return 1.

Rule 47 - Repository Tree Safety

Before creating new files or folders, inspect the real repository tree.

Do not assume a file exists.

Do not assume a folder structure exists.

Do not create duplicate nested folders.

Do not continue blindly if the real tree differs from the expected tree.

Rule 48 - Marketing Rules

Marketing must describe the product as a licensed player platform.

Marketing must not imply:

Included channels
Included streams
Included content
IPTV subscription with content
Channel package access
Playlist provider access
Rule 49 - Legal Pages

The public website should include:

Terms of service
Privacy policy
Refund policy
Acceptable use policy

These pages must clearly explain the player-only product model.

Rule 50 - Support Rules

Support may help with:

Account issues
Login issues
Subscription status
Device activation
License status
App updates
Payment status
Reseller credit questions
Temporary playlist transfer issues

Support must not provide:

Channel lists
Stream URLs
IPTV playlists
Provider credentials
Content recommendations
Rule 51 - Testing Rules

Testing must verify:

Authentication
Role-based access control
Ownership rules
Reseller credit transactions
Payment verification
Subscription logic
Device activation
License checks
App version rules
Remote config
Playlist transfer expiration
Sensitive data protection
Product boundary protection

Tests must not assume the backend provides streams, channels, playlists, or content.

Rule 52 - DevOps Rules

Infrastructure may support:

Web application
API application
PostgreSQL database
Redis cache
Background jobs
APK release files
Logs
Monitoring
Backups

Infrastructure must not support:

Stream hosting
Stream relay
Stream transcoding
CDN stream delivery
Channel package delivery
Broadcast infrastructure
Rule 53 - Release Rules

No release should go live unless the following are checked:

Product boundary is preserved
Security checks pass
Role permissions work
Reseller credit transactions work
Payment rules are safe
Device license checks work
App version rules work
Remote config works
Sensitive data is not exposed
Documentation is updated
Rule 54 - Do Not Change Without Approval

Do not change these decisions without explicit approval:

Player-only product model
Backend is not a content provider
Backend is not playlist source of truth
Playlist credentials are stored locally in the app by default
Multi-profile app support
Optional temporary web-to-device playlist profile transfer
App-generated device ID as primary identity
Reseller credit transactions
Role-based access control
No card data storage
No plain text passwords
Backend-authoritative license checks
Manual-first payment MVP
pnpm monorepo structure
Next.js web app
NestJS API app
Prisma PostgreSQL backend

Rule 55 - Implementation Has Not Started Yet

The project is still in foundation and documentation stabilization phase unless PROJECT_STATE.md says otherwise.

Do not assume the real backend is complete.

Do not assume the real frontend is complete.

Do not assume the Prisma schema is final.

Do not assume admin, reseller, or customer dashboards are implemented.

Rule 56 - Final Rule

Keep the project focused on licensed player access, subscriptions, devices, payments, resellers, app versions, remote config, audit logs, and app integration.

Do not add stream-hosting features.

Do not add channel-selling features.

Do not add content-provider features.

Do not make the backend the playlist authority.
