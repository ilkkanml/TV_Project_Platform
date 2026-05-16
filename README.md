# TV Project Platform

TV Project Platform is a licensed IPTV player platform.

This project is not an IPTV broadcast provider.

It does not provide TV streams.

It does not host TV streams.

It does not relay TV streams.

It does not transcode TV streams.

It does not operate CDN services.

It does not sell channel lists.

It does not act as a playlist provider.

The platform manages licensed player access only.

The backend exists to support accounts, licenses, devices, payments, reseller operations, app configuration, and optional secure device transfer flows.

## Project Decision

This repository is for a licensed player platform.

It is not a content platform.

It is not an IPTV provider.

It is not a broadcast backend.

It is not a playlist authority.

The backend must never become the source of truth for playlist data.

Users are responsible for their own legal playlist or provider information.

The app is responsible for local player behavior.

The backend is responsible for licensing and platform management.

## Core Scope

The platform will manage the following areas:

- User accounts
- Customer authentication
- Admin authentication
- Reseller authentication
- Subscription status
- License status
- Device activation
- Payment records
- Reseller credit system
- App version control
- Remote configuration
- Maintenance mode
- Feature flags
- Optional web-to-device playlist profile transfer

## Out of Scope

The platform will not manage or provide the following:

- TV channels
- Live streams
- VOD streams
- CDN delivery
- Stream relay
- Stream transcoding
- Channel packages
- Playlist provider services
- Content ownership
- Broadcast infrastructure

## Playlist Decision

Playlist information is not backend source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the device.

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

The user may optionally send a playlist profile from the web panel to their own device.

This optional feature must work only as a temporary encrypted transfer bridge.

After the app receives the transferred profile, the backend should expire or delete the temporary payload.

Encrypted cloud sync may be added later only with explicit user consent.

## App Responsibilities

The Android TV or Fire TV app is responsible for:

- Generating an app device ID
- Registering or activating the device
- Checking license status
- Checking subscription status
- Checking app version
- Fetching remote config
- Managing local playlist profiles
- Storing playlist credentials securely on the device
- Supporting multiple playlist profiles
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
- Optional temporary playlist profile transfer

## Device Identity

MAC address must not be used as the primary device identifier.

The primary device identity should be an app-generated device ID.

Recommended primary identifier:

- app_generated_device_id

Recommended secondary signals:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## User Roles

The platform has three main roles.

### Admin

The admin can manage:

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

### Reseller

The reseller can manage:

- Own customers
- Own credit balance
- Own sales
- Own customer subscriptions
- Own device/license records

A reseller must not access customers owned by other resellers.

### Customer

The customer can manage:

- Own account
- Own subscription
- Own devices
- Own payment history
- Optional web-to-device playlist profile transfer

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

## Security Principles

Passwords must never be stored in plain text.

Payment card data must never be stored directly.

Critical admin and reseller actions must be audit logged.

Frontend values must not be trusted for pricing, credits, roles, or permissions.

Role-based access control is required.

Auth endpoints must be rate limited.

Payment webhooks must be verified.

Device license checks must be backend authoritative.

Temporary playlist transfer payloads must expire.

## Payment Principles

The platform may support manual payment records during MVP.

Real payment integration should be added through a secure provider.

Possible providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Card information must not be stored in this system.

Subscription extension should happen only after verified payment confirmation.

## Technical Stack

The planned stack is:

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

## Monorepo Structure

The repository is organized as:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

## Web App

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
- Checkout screens
- Legal pages

## API App

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

## Shared Package

The shared package will include:

- Roles
- API response codes
- Device types
- Subscription statuses
- Payment statuses
- Shared validation schemas
- Shared TypeScript types

## Project Bible

The project-bible directory stores product, technical, security, reseller, payment, app integration, marketing, testing, support, and release decisions.

Major decisions must be recorded in the project bible.

New conversations should read the bible before changing the architecture.

## New Chat Continuation

When continuing this project in a new chat, the assistant should inspect:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- project-bible directory
- docs directory

The assistant should not ask the same foundational questions again.

The assistant should continue from the current repository state.

## Current Status

The repository structure has been created.

Root configuration files are being stabilized.

The next major steps are:

- Complete documentation foundation
- Complete shared package foundation
- Complete API foundation
- Complete web foundation
- Build authentication
- Build role-based access control
- Build subscription and license engine
- Build reseller credit engine
- Build app integration endpoints

## License and Legal Position

This project is a software platform.

It is not a media provider.

It is not a broadcaster.

It is not a playlist seller.

It is not responsible for user-provided playlist/provider data.

Users must use the platform only with legal playlist/provider information that they are allowed to access.

## Development Rule

Do not turn this project into a content provider.

Do not add stream hosting features.

Do not add channel-selling features.

Do not make the backend the playlist authority.

Keep the platform focused on licensed player access, subscriptions, devices, payments, resellers, and application configuration.