# Roadmap

This file defines the planned roadmap for TV Project Platform.

The roadmap must be updated as the project evolves.

## Project Status

Current phase:

- Foundation
- Documentation preparation
- Project memory setup

The real application implementation has not started yet.

The repository structure exists.

Root config files have been fixed.

README.md has been fixed.

PROJECT_STATE.md has been fixed.

AI_HANDOFF.md has been fixed.

## Product Direction

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a content platform.

It is not a playlist provider.

The backend must focus only on:

- User accounts
- Authentication
- Subscriptions
- Licensing
- Device activation
- Payments
- Reseller credit system
- App version control
- Remote configuration
- Optional temporary web-to-device playlist profile transfer

The backend must not provide, host, relay, transcode, package, sell, or distribute TV streams.

## Roadmap Principles

Every phase must follow these rules:

- Do not turn the backend into a content provider.
- Do not make the backend the playlist source of truth.
- Do not store playlist credentials permanently by default.
- Do not store payment card data.
- Do not store passwords in plain text.
- Keep admin, reseller, and customer roles separate.
- Keep reseller credit operations transaction-based.
- Keep app device identity based on app_generated_device_id.
- Keep critical decisions documented.
- Keep files readable and multiline.

## Phase 0 - Foundation

Goal:

Prepare the repository, project memory, and documentation foundation before application implementation.

Status:

- In progress

Tasks:

- Create repository folder structure
- Fix root configuration files
- Rewrite README.md
- Rewrite PROJECT_STATE.md
- Rewrite AI_HANDOFF.md
- Rewrite ROADMAP.md
- Rewrite CHANGELOG.md
- Rewrite SECURITY.md
- Rewrite LEGAL_SCOPE.md
- Complete project-bible files
- Complete docs files
- Verify all critical Markdown files are real multiline files

Deliverables:

- Reliable project memory
- Clear product boundary
- Clear technical direction
- Clear continuation instructions for new chats
- Safe documentation workflow

## Phase 1 - Shared Package Foundation

Goal:

Create the shared TypeScript package used by both the web app and API app.

Status:

- Not started

Location:

- packages/shared

Tasks:

- Define user roles
- Define API response codes
- Define device types
- Define subscription statuses
- Define payment statuses
- Define reseller credit transaction types
- Define shared API response types
- Define shared validation schemas
- Export shared constants and types
- Add package.json
- Add tsconfig.json

Deliverables:

- @tv-platform/shared package
- Shared role constants
- Shared status constants
- Shared API codes
- Shared TypeScript types
- Shared validation schemas

## Phase 2 - API Foundation

Goal:

Create the NestJS API foundation.

Status:

- Not started

Location:

- apps/api

Tasks:

- Configure NestJS project
- Configure TypeScript
- Configure environment validation
- Configure Prisma
- Configure PostgreSQL connection
- Configure Redis connection
- Add global response format
- Add global error handling
- Add validation pipe
- Add health endpoint
- Add base app module
- Add common decorators
- Add common guards
- Add common interceptors
- Add common filters

Deliverables:

- Running API server
- Health endpoint
- Prisma connection
- Standard response format
- Standard error format
- Environment configuration

## Phase 3 - Database Foundation

Goal:

Create the first production-oriented database schema.

Status:

- Not started

Location:

- apps/api/prisma/schema.prisma

Initial models:

- User
- Session
- Plan
- Subscription
- Device
- LicenseCheck
- Reseller
- ResellerCreditTransaction
- Payment
- AppVersion
- RemoteConfig
- PlaylistPushRequest
- AuditLog

Important rules:

- Passwords must be hashed.
- Payment card data must not be stored.
- Reseller credit history must be transaction-based.
- Device identity must use app_generated_device_id as primary app identity.
- PlaylistPushRequest must be temporary and expirable.
- Backend must not become playlist source of truth.

Deliverables:

- Prisma schema
- Database migrations
- Seed script
- Initial admin seed
- Database documentation

## Phase 4 - Authentication and Authorization

Goal:

Build secure authentication and role-based access control.

Status:

- Not started

Tasks:

- Register
- Login
- Refresh token
- Logout
- Password hashing
- JWT access token
- Refresh token storage
- Role-based guards
- Current user decorator
- Admin route protection
- Reseller route protection
- Customer route protection
- Basic rate limiting
- Audit logging for sensitive actions

Roles:

- Admin
- Reseller
- Customer

Deliverables:

- Auth module
- User module
- Role guards
- Secure token flow
- Protected route foundation

## Phase 5 - Subscription and License Engine

Goal:

Build the core subscription and licensing system.

Status:

- Not started

Tasks:

- Plan management
- Customer subscription creation
- Subscription extension
- Subscription expiration logic
- License status endpoint
- Device license validation
- Subscription status endpoint
- License check audit records
- Expired subscription handling
- Blocked device handling

App-facing endpoints may include:

- GET /license/status
- POST /device/activate
- GET /device/status

Deliverables:

- Subscription module
- License module
- Device module
- App license status API
- Customer subscription status API

## Phase 6 - Device Activation System

Goal:

Support app-generated device identity and backend license validation.

Status:

- Not started

Device identity decision:

- MAC address is not primary.
- app_generated_device_id is primary.
- Android ID is only a secondary signal.
- Device model and app metadata are secondary signals.

Tasks:

- Device activation endpoint
- Device status endpoint
- Device blocking
- Device naming
- Device platform tracking
- App version tracking per device
- Device ownership validation
- Reseller/customer device visibility rules

Deliverables:

- Device activation API
- Device management API
- Admin device view
- Customer device view
- Reseller device view

## Phase 7 - Reseller Credit System

Goal:

Build a secure reseller system with transaction-based credit management.

Status:

- Not started

Core rules:

- A simple balance field is not enough.
- Every credit operation must create a transaction.
- Frontend credit values must not be trusted.
- Negative reseller balances must be prevented.
- Credit usage must be handled inside database transactions.
- Resellers can only access their own customers.

Tasks:

- Create reseller accounts
- Add reseller credit
- Use reseller credit
- Refund reseller credit
- Manual adjustment
- Reseller customer creation
- Reseller subscription assignment
- Reseller credit history
- Reseller sales history
- Admin reseller overview
- Audit logs for credit operations

Deliverables:

- Reseller module
- Credit transaction module
- Reseller dashboard APIs
- Admin reseller APIs
- Abuse prevention rules

## Phase 8 - Payment System

Goal:

Create payment records and prepare for secure payment provider integration.

Status:

- Not started

MVP payment mode:

- Manual payment records

Later payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved providers

Rules:

- Do not store card data.
- Do not trust frontend price values.
- Verify payment provider webhooks.
- Extend subscriptions only after verified payment confirmation.
- Store payment status and transaction references.

Tasks:

- Plan selection
- Checkout creation
- Payment status tracking
- Manual payment approval
- Payment webhook structure
- Subscription extension after payment success
- Payment history for customers
- Payment overview for admin

Deliverables:

- Payment module
- Checkout API
- Payment records
- Manual payment flow
- Webhook-ready architecture

## Phase 9 - App Version and Remote Config

Goal:

Allow the backend to control app version rules, maintenance mode, and feature flags.

Status:

- Not started

Tasks:

- App version model
- App version endpoint
- Minimum version code
- Force update setting
- APK URL field
- Changelog field
- Remote config model
- Maintenance mode
- Maintenance message
- Feature flags
- Announcement message

App-facing endpoints may include:

- GET /app/version
- GET /remote-config

Deliverables:

- App version module
- Remote config module
- Admin management APIs
- App-facing config APIs

## Phase 10 - Optional Playlist Push Bridge

Goal:

Allow a user to send a playlist profile from the web panel to their own device without making the backend the playlist source of truth.

Status:

- Not started

Core rule:

The backend is only a temporary encrypted transfer bridge.

The backend is not playlist source of truth.

Default playlist storage remains inside the app using encrypted local storage.

Tasks:

- Create temporary playlist profile transfer request
- Encrypt temporary payload
- Assign transfer to user-owned device
- Allow app to consume transfer payload
- Expire payload after pickup
- Delete expired payloads
- Add audit log
- Add customer UI
- Add app-facing consume endpoint

Deliverables:

- Playlist push module
- Temporary encrypted payload flow
- Customer playlist push screen
- App consume endpoint

## Phase 11 - Web Foundation

Goal:

Create the Next.js web app foundation.

Status:

- Not started

Location:

- apps/web

Tasks:

- Configure Next.js
- Configure TypeScript
- Configure Tailwind CSS
- Create root layout
- Create global styles
- Create public landing page
- Create auth pages
- Create dashboard layouts
- Create shared UI components
- Create API client
- Create route constants
- Create auth helpers
- Create protected route middleware

Deliverables:

- Running web app
- Landing page shell
- Login page
- Register page
- Customer dashboard shell
- Reseller dashboard shell
- Admin dashboard shell

## Phase 12 - Customer Panel

Goal:

Build the customer dashboard.

Status:

- Not started

Customer features:

- Account overview
- Subscription status
- Device list
- Payment history
- Optional playlist profile push
- Settings
- Logout

Deliverables:

- Customer dashboard
- Subscription page
- Devices page
- Payments page
- Playlist push page
- Settings page

## Phase 13 - Reseller Panel

Goal:

Build the reseller dashboard.

Status:

- Not started

Reseller features:

- Overview
- Own customers
- Customer creation
- Customer subscriptions
- Credit balance
- Credit transactions
- Sales history
- Settings

Deliverables:

- Reseller dashboard
- Customer management page
- Credit page
- Sales page
- Reseller settings page

## Phase 14 - Admin Panel

Goal:

Build the admin dashboard.

Status:

- Not started

Admin features:

- Overview
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

Deliverables:

- Admin dashboard
- Users page
- Resellers page
- Plans page
- Subscriptions page
- Payments page
- Devices page
- App versions page
- Remote config page
- Audit logs page

## Phase 15 - Marketing Website

Goal:

Build the public-facing marketing website.

Status:

- Not started

Pages:

- Home
- Pricing
- Download
- Device selector
- FAQ
- Privacy policy
- Terms of service
- Refund policy

Messaging rules:

- Position as a licensed IPTV player platform.
- Do not market as IPTV provider.
- Do not imply that the platform provides channels.
- Do not imply that the platform provides streams.
- Clearly state that users use their own legal playlist/provider information.

Deliverables:

- Landing page
- Pricing page
- Download page
- Device selector
- FAQ page
- Legal pages

## Phase 16 - Documentation Completion

Goal:

Complete all project documentation.

Status:

- Not started

Files to complete:

- docs/new-chat-start-message.md
- docs/architecture.md
- docs/development-workflow.md
- docs/local-setup.md
- docs/deployment.md
- docs/environment-variables.md
- docs/api-error-codes.md
- docs/app-team-handoff.md
- docs/admin-guide.md
- docs/reseller-guide.md
- docs/customer-guide.md
- docs/payment-provider-notes.md

Deliverables:

- Developer setup guide
- Deployment guide
- API error guide
- App team handoff
- Admin guide
- Reseller guide
- Customer guide
- Payment notes

## Phase 17 - Testing and QA

Goal:

Create testing and validation processes.

Status:

- Not started

Testing areas:

- Auth tests
- Role permission tests
- Subscription tests
- License validation tests
- Device activation tests
- Reseller credit transaction tests
- Payment webhook tests
- Playlist push expiration tests
- Admin panel tests
- Reseller panel tests
- Customer panel tests

Deliverables:

- Unit tests
- Integration tests
- API tests
- Role access tests
- QA checklist

## Phase 18 - Security Hardening

Goal:

Prepare the platform for safe staging and production deployment.

Status:

- Not started

Tasks:

- Rate limiting
- Helmet/security headers
- CORS rules
- Password hashing
- JWT secret handling
- Refresh token rotation
- Audit logging
- Webhook verification
- Input validation
- Database transaction protection
- Admin action logging
- Sensitive data review

Deliverables:

- Security checklist
- Hardened API
- Hardened web app
- Audit log coverage
- Staging readiness

## Phase 19 - Deployment Preparation

Goal:

Prepare staging and production deployment.

Status:

- Not started

Tasks:

- Dockerfile for API
- Dockerfile for web
- Nginx config
- Environment variables
- Database migration flow
- Backup strategy
- GitHub Actions CI
- Deployment notes
- Monitoring plan

Deliverables:

- Staging deployment plan
- Production deployment plan
- Backup plan
- CI workflow
- Deployment documentation

## Phase 20 - MVP Release

Goal:

Release the first usable MVP.

Status:

- Not started

MVP must include:

- Auth
- Roles
- Customer panel
- Reseller panel
- Admin panel
- Plans
- Subscriptions
- Device activation
- License status API
- App version API
- Remote config API
- Reseller credit system
- Manual payment records
- Audit logs

MVP must not include:

- Stream hosting
- Channel selling
- CDN relay
- Playlist provider service
- Backend playlist source of truth

Deliverables:

- MVP web app
- MVP API
- MVP database
- MVP admin panel
- MVP reseller panel
- MVP customer panel
- App integration endpoints

## Post-MVP Ideas

These are optional future ideas.

They require separate approval.

Possible future features:

- Real payment provider integration
- Email notifications
- SMS notifications
- Ticket system
- Affiliate/referral system
- Encrypted cloud playlist sync with explicit user consent
- Advanced app analytics
- Admin 2FA
- Reseller commission models
- Invoice/PDF receipts
- Multi-currency pricing
- Advanced device limits

## Do Not Add Without Approval

Do not add these without explicit approval:

- Stream hosting
- Stream relay
- Channel packages
- Playlist marketplace
- Content provider features
- Permanent backend playlist authority
- User playlist credential cloud sync by default
- Card data storage
- Plain text password storage

## Current Next Step

After ROADMAP.md is committed, the next files should be updated in this order:

1. CHANGELOG.md
2. SECURITY.md
3. LEGAL_SCOPE.md
4. project-bible/00-project-rules.md
5. project-bible/01-product-bible.md
6. project-bible/02-user-roles.md
7. project-bible/03-feature-list.md
8. project-bible/04-database-bible.md
9. project-bible/05-api-bible.md
10. project-bible/06-security-bible.md
11. project-bible/07-payment-bible.md
12. project-bible/08-reseller-bible.md
13. project-bible/09-ui-ux-bible.md
14. project-bible/10-app-integration.md
15. Remaining project-bible files
16. docs files

## Roadmap Update Rule

This roadmap must be updated whenever a major phase changes.

When implementation begins, mark completed items clearly.

Do not remove historical roadmap decisions without recording the reason in the decision log.
