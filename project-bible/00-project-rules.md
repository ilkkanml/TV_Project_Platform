# 00 - Project Rules

This file defines the non-negotiable rules for TV Project Platform.

Every future feature, code change, documentation update, architecture decision, UI decision, API decision, database decision, reseller decision, payment decision, app integration decision, and release decision must follow these rules.

## Rule 1 - Product Identity

TV Project Platform is a Licensed IPTV Player Platform.

It is a software/player access platform.

It manages accounts, subscriptions, licenses, devices, payments, reseller operations, app version control, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

It is not a media provider.

It is not a broadcast backend.

It is not a CDN, relay, transcoder, channel seller, content catalog, public playlist marketplace, or default permanent backend authority for user playlist/profile data.

## Rule 2 - Product Must Stay Player-Only

The product must stay focused on licensed player access.

The platform may manage:

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
- Optional temporary encrypted web-to-device profile transfer

The platform must not become a content platform, broadcast platform, media delivery platform, or public marketplace for provider data.

## Rule 3 - Backend Product Boundary

The backend must never become the default source of truth for user playlist/profile data.

The backend must not provide, host, relay, transcode, package, sell, resell, or distribute media access.

The backend must not operate as a CDN, relay, transcoding service, broadcast backend, or channel package system.

## Rule 4 - Forbidden Backend Scope

The backend must not manage or provide:

- Channel inventory
- Stream source management
- Media delivery
- Relay routes
- Transcoding jobs
- CDN delivery
- Channel packages
- Public provider search
- Public playlist marketplace
- Content catalogs
- Broadcast schedules
- Default permanent profile credential storage

## Rule 5 - Local-First Profile Decision

User playlist/profile information is local-first by default.

By default:

- User profile information is entered inside the app.
- User profile credentials are stored on the user's device.
- Credentials must use encrypted local storage where supported.
- The app may support multiple local profiles.
- Users may switch between local profiles.

The backend must not be required for normal local profile storage.

## Rule 6 - Optional Temporary Transfer

The web panel may optionally send an encrypted profile payload to a user-owned device.

This is only a temporary transfer bridge.

Rules:

- Payloads must expire.
- Payloads must be scoped to the correct user and device.
- Payloads should be marked consumed or deleted after pickup.
- This must not become default permanent cloud storage.
- This must not change the product boundary.

Encrypted cloud sync is not part of the default architecture and requires explicit approval.

## Rule 7 - Device Identity

MAC address must not be the primary device identifier.

Primary device identity:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata
- Last seen timestamp

Secondary signals may help debugging, fraud review, and device management, but must not replace app_generated_device_id.

## Rule 8 - User Roles

The system has three main roles:

- Admin
- Reseller
- Customer

Each role must have isolated permissions.

Frontend route hiding is not security.

Backend authorization is mandatory.

## Rule 9 - Admin Scope

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

Critical admin actions must be audit logged.

## Rule 10 - Reseller Scope

Resellers may manage:

- Own customers
- Own customer subscriptions
- Own customer device/license records
- Own credit balance view
- Own credit transaction view
- Own sales/customer history

A reseller must not access another reseller's customers.

A reseller must not modify system-wide settings unless explicitly permitted by an admin.

A reseller must not directly modify their own credit balance.

## Rule 11 - Customer Scope

Customers may manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional transfer records for own devices

Customers must not access admin resources, reseller resources, or other customers' data.

## Rule 12 - Backend Authorization

Every protected backend endpoint must check:

- Authentication
- User role
- Resource ownership
- Resource status
- Action permission

Role checks alone are not enough.

Ownership checks are mandatory.

## Rule 13 - Reseller Credit System

The reseller credit system must be transaction-based.

A balance field alone is not enough.

Every credit operation must create a transaction record.

Credit transactions should include:

- reseller_id
- type
- amount
- balance_before
- balance_after
- related_customer_id when applicable
- related_subscription_id when applicable
- created_by_user_id
- IP address when practical
- note
- created_at

Credit operations must be backend-authoritative.

Frontend credit values must never be trusted.

Credit use and subscription changes must happen safely inside database transactions.

Negative balances must be prevented.

Credit history must not be silently deleted.

## Rule 14 - Payment Scope

Payments are for software/player access only.

Payments may be for:

- Software access
- Player license access
- Subscription time
- Device activation rights
- Reseller credit
- Platform account features

Payments must not be for media access, channel packages, public provider data, or content packages.

## Rule 15 - Payment Security

The platform must not store card data.

Do not store:

- Full card numbers
- CVV
- Card PIN
- Raw sensitive payment credentials
- Payment provider secrets in the database

Manual payment records may be used during MVP.

Real payment providers require verified webhook/signature handling.

Subscription extension must happen only after backend-verified payment confirmation.

Frontend payment success screens must not directly extend subscriptions.

## Rule 16 - Password and Token Security

Passwords must never be stored in plain text.

Passwords must be hashed before storage.

Password hashes must never be returned by the API.

Password hashes must never be exposed in logs.

Authentication should use access tokens and refresh tokens.

Access tokens should be short-lived.

Refresh tokens should be handled securely and stored as hashes where practical.

## Rule 17 - API Security

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

Sensitive decisions must be enforced by the backend.

## Rule 18 - Sensitive Data

Do not log sensitive data.

Logs must not contain:

- Plain text passwords
- Payment card data
- User profile credentials
- Full access tokens
- Full refresh tokens
- Encryption keys
- Payment provider secrets
- Database passwords

## Rule 19 - Environment Variables

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

.env.example may contain placeholder values only.

Production secrets must be generated securely.

Default secrets must never be used in production.

## Rule 20 - Database Transactions

Critical writes must use database transactions.

Transaction-required areas include:

- reseller credit add
- reseller credit use
- reseller credit refund
- manual credit adjustment
- subscription extension
- payment confirmation
- device activation
- temporary profile transfer consumption

If one critical step fails, the full operation should rollback.

## Rule 21 - Audit Logs

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

## Rule 22 - Actions That Must Be Audited

Audit these actions:

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
- Temporary transfer creation
- Temporary transfer consumption
- Deployment action
- Rollback action

## Rule 23 - App Integration

The Android TV or Fire TV app should:

- Generate app_generated_device_id
- Register or activate the device
- Check license status
- Check subscription status
- Check app version
- Fetch remote config
- Manage local profiles
- Store credentials securely on the device
- Support multiple profiles
- Respect maintenance mode
- Respect force update rules

## Rule 24 - License Authority

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

## Rule 25 - App-Facing Endpoints

App-facing endpoints may include:

- POST /device/activate
- GET /device/status
- PATCH /device/heartbeat
- GET /license/status
- GET /app/version
- GET /remote-config
- POST /profile-transfer/consume

These endpoints must not return media catalogs, channel inventory, public marketplace data, or provider credential lists.

## Rule 26 - Technical Stack

The approved stack is:

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

## Rule 27 - Monorepo Structure

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

## Rule 28 - Web App Responsibility

The web app should include:

- Public landing page
- Pricing page
- Device selector
- Download page
- Login page
- Register page when enabled
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Checkout pages
- Legal pages

Frontend checks must not replace backend authorization.

## Rule 29 - API App Responsibility

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
- Profile transfer module
- Audit logs module
- Health module

## Rule 30 - Shared Package Responsibility

The shared package should include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Reseller transaction types
- Shared validation schemas
- Shared TypeScript types

## Rule 31 - Director-Led Workflow

The project is controlled by a Director-led milestone system.

Owner approves major direction changes.

Director controls execution order.

Milestones control scope.

Departments produce single-task expert outputs.

System engines enforce safety.

## Rule 32 - Approved AI Departments

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Departments are not permanent chat rooms.

Departments receive a small context package, answer once, and close.

Old department conversations are not reused as default AI context.

Accepted outputs become compact reusable memory.

## Rule 33 - System Engines

The following are system engines, not AI departments:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

System engines should not call AI unless the Director explicitly asks for analysis.

## Rule 34 - Department Communication

Departments must not talk directly to each other.

Correct pattern:

```txt
Department -> Director -> Department
```

Wrong pattern:

```txt
Department -> Department
```

This prevents uncontrolled loops and token waste.

## Rule 35 - Department Output Format

Every department output must use:

```txt
Department:
Task:
Result:
Risk:
Required Files:
Director Action Needed:
```

For code tasks, add:

```txt
Code Version Impact:
Rollback Need:
Test Requirement:
```

For error tasks, add:

```txt
Likely Cause:
Fix Attempt Number:
Stop Condition:
```

## Rule 36 - Token Economy

One task should usually equal one AI call.

Use the smallest useful context package.

Do not include full old conversations by default.

Use active milestone, project summary, department role, task, relevant decision records, and relevant file excerpts only.

Every AI call should be logged where practical.

Every AI call should have a token budget.

## Rule 37 - Three Fail Loop Breaker

A task may fail at most three times for the same issue.

After the third failure:

- Task is locked.
- No blind retry is allowed.
- Failure reason is recorded.
- Last successful checkpoint is identified.
- Director must decide rollback, redesign, or manual inspection.

Rule:

```txt
3 FAIL = STOP
```

## Rule 38 - Checkpoint System

Create checkpoints after meaningful successful states.

A checkpoint may include:

- Milestone ID
- Description
- Related files
- Active code version IDs
- Database migration state
- Created timestamp

Rollback should use the latest known successful checkpoint.

## Rule 39 - Code Version Vault

Generated or edited code should be stored as versioned text before deployment.

Each code version should include:

- File path
- Version number
- Content
- Active flag
- Change reason
- Created timestamp
- Activated timestamp
- Deployment timestamp

Only one version of a file should be active at a time.

## Rule 40 - No Self Deployment

AI may propose code.

AI may not silently deploy its own code.

Director approval is required before deployment.

## Rule 41 - Deployment Safety

Deployment must use dry run before writing files.

Dry run must verify:

- Target path is allowed.
- Target path stays inside the project directory.
- File extension is allowed.
- Content is not empty.
- Backup can be created.
- Write permission exists.

Only after dry run passes may the Deployment Engine write real files.

## Rule 42 - File Path Whitelist

The Deployment Engine may only write to approved application paths.

Sensitive config, secret, backup, vendor, and system files must not be writable through AI-generated deployment.

## Rule 43 - Documentation First

Major architectural decisions must be documented.

Important decisions should be recorded in:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- project-bible/13-decision-log.md
- docs/development-workflow.md
- docs/department-system.md

Do not silently change important decisions.

## Rule 44 - Project Bible Authority

The project-bible directory is the long-term memory of the project.

Before making major changes, check:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- docs/development-workflow.md
- docs/department-system.md
- project-bible directory
- docs directory

## Rule 45 - Stable Project Bible Tree

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

## Rule 46 - Deprecated Bible Names

Do not use old or conflicting project-bible names.

Useful content from deprecated documents should be migrated into the stable Bible tree before removal.

## Rule 47 - Repository Tree Safety

Before creating new files or folders, inspect the real repository tree.

Do not assume a file exists.

Do not assume a folder structure exists.

Do not create duplicate nested folders.

Do not continue blindly if the real tree differs from PROJECT_STATE.md.

## Rule 48 - Marketing Rules

Marketing must describe the product as licensed player software access.

Marketing must not imply bundled media access, channel access, content access, public provider access, or included provider data.

## Rule 49 - Legal Pages

The public website should include:

- Terms of service
- Privacy policy
- Refund policy
- Acceptable use policy

These pages must clearly explain the player-only software access model.

## Rule 50 - Support Rules

Support may help with:

- Account issues
- Login issues
- Subscription status
- Device activation
- License status
- App updates
- Payment status
- Reseller credit questions
- Temporary transfer issues

Support must not provide media access, provider credentials, catalog recommendations, or unsupported third-party access guidance.

## Rule 51 - Testing Rules

Testing must verify:

- Authentication
- Role-based access control
- Ownership rules
- Reseller credit transactions
- Payment verification
- Subscription logic
- Device activation
- License checks
- App version rules
- Remote config
- Temporary transfer expiration
- Sensitive data protection
- Product boundary protection
- Deployment and rollback safety

## Rule 52 - DevOps Rules

Infrastructure may support:

- Web application
- API application
- PostgreSQL database
- Redis cache
- Background jobs
- APK release files
- Logs
- Monitoring
- Backups
- CI checks

Infrastructure must not support media delivery, relay, transcoding, CDN behavior, or broadcast infrastructure.

## Rule 53 - Release Rules

No release should go live unless:

- Product boundary is preserved.
- Security checks pass.
- Role permissions work.
- Reseller credit transactions work.
- Payment rules are safe.
- Device license checks work.
- App version rules work.
- Remote config works.
- Sensitive data is not exposed.
- Documentation is updated.
- Rollback path exists.

## Rule 54 - Do Not Change Without Approval

Do not change these decisions without explicit approval:

- Licensed-player-only product model
- Backend is not default source of truth for user profile data
- User profile credentials are local-first in the app by default
- Multi-profile app support
- Optional temporary encrypted web-to-device transfer
- App-generated device ID as primary identity
- Reseller credit transactions
- Role-based access control
- No card data storage
- No plain text passwords
- Backend-authoritative license checks
- Manual-first payment MVP
- pnpm monorepo structure
- Next.js web app
- NestJS API app
- Prisma PostgreSQL backend
- Director-led milestone workflow
- Single-task department model
- Three-fail loop breaker
- No self deployment rule

## Rule 55 - Current State Awareness

The project is in foundation stabilization and controlled implementation preparation.

Do not claim the project is empty.

Do not claim full implementation is complete.

Current foundation exists, but the MVP is not complete.

PROJECT_STATE.md is the source of truth for current state.

## Rule 56 - Final Rule

Keep the project focused on licensed player access, subscriptions, devices, payments, resellers, app versions, remote config, audit logs, app integration, and safe project management workflow.

Do not add forbidden provider, delivery, relay, marketplace, or default permanent profile-authority features.
