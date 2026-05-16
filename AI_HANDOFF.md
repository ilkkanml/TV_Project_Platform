# AI Handoff

This file explains how future assistants, coding agents, and new chats should continue the TV Project Platform.

It is a project memory file.

It must be read before making architectural or implementation decisions.

## Repository

GitHub repository:

- https://github.com/ilkkanml/TV_Project_Platform

Main branch:

- main

## Current Reliability Warning

Not every file in this repository is final.

Some files may still be empty, placeholder-only, too short, or incorrectly formatted.

At this stage, the most reliable project memory files are:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md

The project-bible and docs directories are planned, but not all files are complete yet.

Future assistants should not assume that all existing files are finished.

## Current Phase

The project is in the foundation and documentation preparation phase.

The real application implementation has not started yet.

Do not assume the backend is complete.

Do not assume the frontend is complete.

Do not assume the database schema is final.

Do not assume the admin, reseller, or customer panels are implemented.

## Product Identity

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a media provider.

It is not a content platform.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Strict Product Boundary

The backend must never provide TV streams.

The backend must never host TV streams.

The backend must never relay TV streams.

The backend must never transcode TV streams.

The backend must never operate CDN services.

The backend must never sell channel lists.

The backend must never act as a playlist provider.

The backend must never become the source of truth for playlist data.

Users are responsible for their own legal playlist or provider information.

## Backend Responsibilities

The backend is allowed to manage:

- User accounts
- Authentication
- Role-based access control
- Customer subscription status
- License validation
- Device activation
- Payment records
- Reseller accounts
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Audit logs
- Optional temporary web-to-device playlist profile transfer

## Backend Must Not Manage

The backend must not manage or provide:

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

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

The user may optionally send a playlist profile from the web panel to their own device.

This optional feature must only work as a temporary encrypted transfer bridge.

After the app receives the transferred profile, the backend should expire or delete the temporary payload.

Encrypted cloud sync may be considered later only with explicit user consent.

## App Responsibilities

The Android TV or Fire TV app should:

- Generate an app device ID
- Register or activate the device
- Check license status
- Check subscription status
- Check app version
- Fetch remote config
- Manage local playlist profiles
- Store playlist credentials securely on the device
- Support multiple playlist profiles
- Switch between profiles
- Open the player only when license rules allow it

## Device Identity

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
- Own device and license records

A reseller must not access customers owned by another reseller.

A reseller must not modify system-wide settings unless explicitly permitted by an admin.

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

## Payment Principles

Card data must not be stored in this system.

Manual payment records may be supported during MVP.

Real payment integration should use a secure payment provider.

Possible providers may include:

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

## Repository Structure

The planned monorepo structure is:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

## Current Verified Files

The following files have been manually fixed and verified as real multiline files:

- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- .env.example
- README.md
- PROJECT_STATE.md

Known verified line counts at the time of project memory preparation:

- package.json: 36 lines
- docker-compose.yml: 54 lines
- .env.example: 25 lines
- tsconfig.base.json: 22 lines
- pnpm-workspace.yaml: 2 lines
- README.md: 395 lines

## Known Workflow Issue

Automated GitHub connector updates previously caused files to collapse into very long single-line content.

This affected JSON, YAML, ENV, and Markdown files.

For critical multiline files, use manual editing through GitHub web editor or Codespaces unless the writing tool proves it can preserve real newlines.

## Safe Working Method

Use this method for critical files:

1. Assistant provides full file content.
2. User opens the file manually.
3. User replaces the entire file content.
4. User commits the change manually.
5. User verifies the raw GitHub file line count.
6. Assistant continues with the next file.

## Raw GitHub Verification

After changing a critical file, verify it with:

```bash
curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_NAME | wc -l
