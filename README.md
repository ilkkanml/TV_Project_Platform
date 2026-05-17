# TV Project Platform

TV Project Platform is a licensed player platform.

It manages software/player access, accounts, subscriptions, licenses, devices, payments, reseller operations, app version control, remote configuration, audit logs, and optional temporary encrypted web-to-device profile transfer.

This project is not a media provider, broadcast backend, CDN, relay, transcoder, catalog seller, public playlist marketplace, or default permanent backend authority for user playlist/profile data.

## Product Decision

This project workspace is for a licensed player platform.

The backend is responsible for licensing and platform management.

The app is responsible for local player behavior and local profile management.

Users are responsible for their own legal provider/profile information.

The backend must not become the default source of truth for user playlist/profile data.

## Core Scope

The platform may manage:

- User accounts
- Customer authentication
- Admin authentication
- Reseller authentication
- Role-based access control
- Subscription status
- License status
- Device activation
- Payment records
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary encrypted web-to-device profile transfer

## Out of Scope

The platform must not manage or provide:

- Media catalog features
- Channel inventory features
- Media delivery features
- Relay or transcoding features
- CDN behavior
- Public playlist marketplace features
- Provider credential distribution
- Default permanent backend profile authority
- Broadcast infrastructure

## Current Project State

The project workspace already contains a foundation implementation.

Existing foundation:

- pnpm monorepo configuration
- apps/web Next.js skeleton
- apps/api NestJS skeleton
- packages/shared TypeScript package
- apps/api/prisma/schema.prisma early schema
- API health endpoint
- Web landing page shell
- Docker Compose services
- Project Bible canonical tree
- Development workflow document
- Department system document
- Local setup document
- Environment variables document
- CONTRIBUTING.md
- LICENSE.md
- Internal validation workflow direction

Still pending:

- pnpm-lock.yaml after first dependency install
- finalized MVP Prisma schema
- API modules beyond health
- real admin, reseller, and customer dashboards
- tests
- production deployment setup

## Operating Model

This project uses a Director-led milestone system.

Required workflow documents:

- docs/development-workflow.md
- docs/department-system.md

Core workflow rules:

- Owner approves major direction changes.
- Director controls execution order.
- Milestones control scope.
- Departments are single-task expert calls, not permanent chat rooms.
- Departments do not talk directly to each other.
- Old department conversations are not reused as default AI context.
- Accepted department output becomes compact reusable memory.
- Three failed attempts on the same problem stop the task.
- Checkpoints protect known good states.
- AI output may not deploy itself.
- Deployment requires Director approval, dry run, path whitelist, backup/checkpoint, and audit log.
- AI token usage should be budgeted and logged.

## Approved AI Departments

Approved AI departments:

- Architect
- Database
- Backend
- Frontend
- QA Security
- Memory Documentation

Departments answer once in a structured format and then close.

## System Engines

System engines are deterministic application logic, not AI departments by default.

Approved system engines:

- Milestone Controller
- Loop Breaker
- Checkpoint Manager
- Deployment Engine
- Rollback Engine
- Cost Guard
- Audit Logger

## Profile Handling Decision

User profile information is local-first by default.

By default:

- User profile information is entered inside the app.
- User profile credentials are stored on the user's device.
- Credentials must use encrypted local storage where supported.
- The app may support multiple local profiles.
- Users may switch between local profiles.

The web panel may optionally send an encrypted profile payload to a user-owned device.

This optional feature must only work as a temporary encrypted transfer bridge.

Temporary payloads must expire and should be marked consumed or deleted after pickup.

Encrypted cloud sync is not part of the default architecture and requires explicit approval.

## App Responsibilities

The Android TV or Fire TV app is responsible for:

- Generating an app device ID
- Registering or activating the device
- Checking license status
- Checking subscription status
- Checking app version
- Fetching remote config
- Managing local profiles
- Storing credentials securely on the device
- Supporting multiple profiles
- Switching between profiles
- Opening the player only when license rules allow it

## Backend Responsibilities

The backend is responsible for:

- User account management
- Role-based access control
- Customer subscriptions
- License validation
- Device activation
- Payment records
- Reseller accounts
- Reseller credit transactions
- App version settings
- Remote config settings
- Audit logs
- Optional temporary encrypted profile transfer

## Device Identity

MAC address must not be used as the primary device identifier.

Primary device identity:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## User Roles

The platform has three main roles:

- Admin
- Reseller
- Customer

Admin can manage platform-wide resources.

Reseller can manage only own customers, own customer subscriptions, own customer device/license records, and own credit history.

Customer can manage only own account, subscription, devices, payment history, and optional transfer records for own devices.

Backend authorization and ownership checks are mandatory.

Frontend route hiding is not security.

## Reseller Credit System

The reseller credit system must be transaction-based.

A simple balance field is not enough.

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

Frontend credit values must never be trusted.

Credit use and subscription changes must happen safely inside database transactions.

Negative balances must be prevented.

## Security Principles

Passwords must never be stored in plain text.

Payment card data must never be stored directly.

Critical admin and reseller actions must be audit logged.

Frontend values must not be trusted for pricing, credits, roles, permissions, ownership, or subscription duration.

Role-based access control is required.

Auth endpoints must be rate limited.

Payment webhooks must be verified when real providers are enabled.

Device license checks must be backend-authoritative.

Temporary transfer payloads must expire.

Sensitive data must not be logged.

## Payment Principles

Payments are for software/player access only.

The platform may support manual payment records during MVP.

Real payment integration should be added through approved secure providers later.

Card information must not be stored in this system.

Subscription extension should happen only after backend-verified payment confirmation.

## Technical Stack

Approved stack:

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

## Project Structure

The project workspace is organized as:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

Do not create duplicate nested folders.

Wrong examples:

- project-bible/project-bible
- docs/docs
- apps/apps
- packages/packages

## Web App

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
- Checkout screens
- Legal pages

## API App

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

## Shared Package

The shared package should include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Reseller transaction types
- Shared validation schemas
- Shared TypeScript types

## Project Bible

The project-bible directory stores long-term product, technical, security, reseller, payment, app integration, marketing, testing, support, and release decisions.

Major decisions must be recorded in the project bible.

New conversations should read the handoff, state, roadmap, workflow, department system, and project-bible files before changing architecture.

## New Chat Continuation

When continuing this project in a new chat, inspect:

- AI_HANDOFF.md
- PROJECT_STATE.md
- README.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- docs/development-workflow.md
- docs/department-system.md
- docs/new-chat-start-message.md
- project-bible directory
- docs directory

The assistant should continue from the current project state and should not restart the architecture.

## License and Legal Position

This project is a software/player access platform.

It is not a media provider.

It is not a broadcaster.

It is not a public provider marketplace.

It is not responsible for user-provided provider/profile data.

Users must use the platform only with legal provider/profile information they are allowed to access.

## Development Rule

Do not add forbidden provider, delivery, relay, marketplace, catalog, or default permanent profile-authority features.

Keep the platform focused on licensed player access, subscriptions, devices, payments, resellers, app versions, remote config, audit logs, app integration, and safe project management workflow.
