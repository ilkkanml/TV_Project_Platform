# Project State

This file tracks the current state of the TV Project Platform repository.

It is the primary handoff document for continuing the project across new chats, coding sessions, and implementation phases.

## Current Phase

The project is in the foundation and documentation preparation phase.

The repository structure has already been created.

Root configuration files have been corrected manually and verified as real multiline files.

The README file has been rewritten manually and verified as real multiline Markdown.

The next priority is to complete the project memory files before starting the real implementation.

## Current Repository Status

The repository already includes the planned folder structure.

Main directories:

- apps
- apps/web
- apps/api
- packages
- packages/shared
- project-bible
- docs
- infra
- .github

Root files already exist:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- LICENSE.md
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- .env.example
- .gitignore

## Verified Files

The following files have been manually fixed and verified through raw GitHub line count checks:

- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- .env.example
- README.md

Known verified line counts at the time of this update:

- package.json: 36 lines
- docker-compose.yml: 54 lines
- .env.example: 25 lines
- tsconfig.base.json: 22 lines
- pnpm-workspace.yaml: 2 lines
- README.md: 395 lines

## Important Warning

Some files in this repository may still be empty, placeholder-only, too short, or incorrectly formatted.

Do not treat every existing file as final.

The following files still need to be rewritten or reviewed:

- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- CONTRIBUTING.md
- LICENSE.md
- project-bible files
- docs files
- apps/web files
- apps/api files
- packages/shared files
- infra files

## Current Working Method

Critical multiline files should be edited manually through GitHub web editor or Codespaces editor.

GitHub connector or automated GPT file updates previously caused Markdown, JSON, YAML, and ENV files to collapse into very long single-line content.

For this reason, the current safe workflow is:

1. Assistant provides the full file content.
2. User opens the file manually.
3. User replaces the entire file content.
4. User commits the change manually.
5. User verifies the file through raw GitHub or line count.
6. Assistant continues with the next file.

## Product Identity

The product is a Licensed IPTV Player Platform.

The product is not an IPTV broadcast provider.

The product is not a media provider.

The product is not a content platform.

The product is not a playlist provider.

The product is not a channel seller.

The product is not a stream hosting service.

## Legal Product Boundary

The backend must never provide, host, relay, transcode, package, resell, or distribute TV streams.

The backend must never become the source of truth for playlist data.

The backend must not operate as a CDN or stream delivery service.

The backend must not sell channel lists.

The backend must not provide IPTV subscriptions that include content access.

Users are responsible for their own legal playlist or provider information.

The system exists only to manage software access, player licensing, device activation, payments, reseller operations, app configuration, and optional secure profile transfer.

## Core Backend Responsibilities

The backend is responsible for:

- User account management
- Authentication
- Role-based access control
- Customer subscription status
- License status
- Device activation
- Payment records
- Reseller accounts
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logging
- Optional temporary web-to-device playlist profile transfer

## Out of Scope Backend Responsibilities

The backend must not be responsible for:

- TV channels
- Live streams
- VOD streams
- Stream relay
- Stream hosting
- Stream transcoding
- CDN delivery
- Channel packages
- Playlist provider services
- Content ownership
- Broadcast infrastructure
- Permanent playlist credential authority

## Playlist Decision

Playlist information is not backend source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the device.

Playlist credentials must be stored with encrypted local storage.

The backend should not permanently store playlist credentials by default.

The user may optionally send a playlist profile from the web panel to their own device.

This optional feature must only work as a temporary encrypted transfer bridge.

After the app receives the transferred profile, the backend should expire or delete the temporary payload.

Encrypted cloud sync may be considered later only with explicit user consent.

## App Integration Decision

The Android TV or Fire TV app should act as the secure player client.

The app should handle local playlist profile management.

The app should support multiple playlist profiles.

The app should allow the user to switch between profiles.

The app should check license status before opening the player.

The app should check app version and remote config.

The app should store playlist credentials locally and securely.

## Device Identity Decision

MAC address must not be used as the primary device identifier.

The primary device identifier should be:

- app_generated_device_id

Secondary device signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## User Roles

The platform has three primary roles:

- Admin
- Reseller
- Customer

## Admin Role

Admin users can manage:

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

## Reseller Role

Reseller users can manage:

- Own customers
- Own credit balance
- Own sales
- Own customer subscriptions
- Own device/license records

A reseller must not access customers owned by another reseller.

A reseller must not modify system-wide plans or payment provider settings.

## Customer Role

Customer users can manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional web-to-device playlist profile transfer

Customer users must not access admin or reseller features.

## Reseller Credit System

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Every credit operation must create a transaction record.

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

The backend must never trust credit values sent from the frontend.

Credit usage must be validated and committed inside database transactions.

Negative reseller balances must be prevented.

## Payment Decision

Card data must not be stored in this system.

During MVP, manual payment records may be supported.

Real payment integration should use a secure payment provider.

Possible payment providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Subscription extension should happen only after verified payment confirmation.

Payment webhook signatures must be verified.

## Security Principles

Passwords must never be stored in plain text.

Payment card data must never be stored directly.

Frontend values must not be trusted for pricing, credits, roles, or permissions.

Role-based access control is required.

Auth endpoints must be rate limited.

Critical admin and reseller actions must be audit logged.

Device license checks must be backend authoritative.

Temporary playlist transfer payloads must expire.

## Planned Technical Stack

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

## Planned Monorepo Structure

The repository is organized as:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

## apps/web Responsibility

The web app will include:

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

## apps/api Responsibility

The API app will include:

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

## packages/shared Responsibility

The shared package will include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Shared validation schemas
- Shared TypeScript types

## Documentation Status

README.md has been rewritten.

PROJECT_STATE.md is being rewritten now.

The next documentation files to rewrite are:

- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md

After that, project-bible files should be completed.

## Next Immediate Task

After this file is committed, update AI_HANDOFF.md.

AI_HANDOFF.md must explain how future chats and assistants should continue the project.

It should also warn that not all files are final yet.

It should instruct future assistants to use README.md and PROJECT_STATE.md as the current reliable project memory.

## Implementation Has Not Started Yet

The real application implementation has not started yet.

Do not assume the backend is complete.

Do not assume the frontend is complete.

Do not assume database schema is final.

Do not assume documentation files are complete.

Current work is still foundation and project memory preparation.

## Current Priority Order

The next priority order is:

1. Complete PROJECT_STATE.md
2. Complete AI_HANDOFF.md
3. Complete ROADMAP.md
4. Complete SECURITY.md
5. Complete LEGAL_SCOPE.md
6. Complete project-bible files
7. Complete docs files
8. Complete packages/shared foundation
9. Complete apps/api foundation
10. Complete apps/web foundation

## New Chat Guidance

In a new chat, the assistant should first read:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- project-bible directory
- docs directory

However, until AI_HANDOFF.md and project-bible files are rewritten, README.md and PROJECT_STATE.md should be treated as the most reliable sources.

## Do Not Change These Decisions Without Approval

Do not change the player-only product model.

Do not make the backend a content provider.

Do not make the backend the playlist source of truth.

Do not remove the local encrypted playlist storage decision.

Do not remove multi-profile app support.

Do not remove the reseller credit transaction requirement.

Do not remove device licensing.

Do not remove role-based access control.

Do not store payment card data.

Do not store passwords in plain text.

## Current State Summary

The project is ready to continue with documentation foundation.

README.md has been fixed.

Root config files have been fixed.

PROJECT_STATE.md should now become the second reliable project memory file.

The next file after this is AI_HANDOFF.md.
