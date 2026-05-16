# 13 - Decision Log

This file records important product, architecture, security, database, payment, reseller, app integration, and legal decisions for TV Project Platform.

Do not delete historical decisions.

If a decision changes, add a new decision entry with the reason.

## Decision Log Rules

Each major decision should include:

- Decision ID
- Date or phase
- Decision
- Reason
- Impact
- Status

Decision statuses:

- Accepted
- Rejected
- Superseded
- Under review

## DEC-001 - Product Is Licensed IPTV Player Platform

Status:

- Accepted

Phase:

- Foundation

Decision:

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider, content provider, playlist provider, channel seller, or stream hosting service.

Reason:

The product must stay focused on software access, player licensing, device activation, subscriptions, reseller operations, payments, app version control, and remote configuration.

Impact:

All backend, frontend, marketing, payment, reseller, and app integration work must follow the player-only model.

## DEC-002 - Backend Must Not Provide Streams

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend must never provide, host, relay, transcode, package, sell, or distribute TV streams.

Reason:

The platform is not a content delivery system.

Impact:

No stream hosting, relay, CDN stream delivery, stream source, transcoding, or broadcast infrastructure features should be added.

## DEC-003 - Backend Is Not Playlist Source Of Truth

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend must not become the source of truth for playlist data.

Reason:

Playlist data belongs to the user and should be managed locally in the app by default.

Impact:

The backend should not permanently store playlist credentials by default.

No playlist marketplace or permanent playlist authority should be implemented.

## DEC-004 - Playlist Credentials Stored Locally In App

Status:

- Accepted

Phase:

- Foundation

Decision:

Playlist credentials are entered inside the app by default and stored locally on the device using encrypted local storage.

Reason:

This keeps playlist management local-first and avoids turning the backend into a playlist provider.

Impact:

The app must implement secure local storage for playlist profiles.

The backend must not be required for normal playlist storage.

## DEC-005 - App Must Support Multiple Playlist Profiles

Status:

- Accepted

Phase:

- Foundation

Decision:

The app should support multiple playlist profiles and allow switching between profiles.

Reason:

Users may need more than one legal provider/profile on their own device.

Impact:

The app should support add, edit, delete, select, and switch profile actions.

Profiles remain local to the app by default.

## DEC-006 - Optional Web-To-Device Playlist Transfer

Status:

- Accepted

Phase:

- Foundation

Decision:

The user may optionally send a playlist profile from the web panel to their own device.

The backend may act only as a temporary encrypted transfer bridge.

Reason:

This improves usability while preserving the rule that backend is not playlist source of truth.

Impact:

Transfer payloads must be encrypted, temporary, device-scoped, user-scoped, expirable, and deleted or marked consumed after pickup when possible.

## DEC-007 - Encrypted Cloud Sync Is Not Default

Status:

- Accepted

Phase:

- Foundation

Decision:

Encrypted cloud sync is not part of the default architecture.

It may be considered later only with explicit user consent.

Reason:

Default cloud storage of playlist credentials would increase legal, privacy, and security risk.

Impact:

No default backend playlist credential sync should be built.

Any future sync feature requires separate approval.

## DEC-008 - MAC Address Is Not Primary Device Identity

Status:

- Accepted

Phase:

- Foundation

Decision:

MAC address must not be used as the primary device identifier.

Reason:

MAC address availability and reliability vary by device and platform.

Impact:

The backend and app should not depend on MAC address for primary licensing identity.

## DEC-009 - app_generated_device_id Is Primary Device Identity

Status:

- Accepted

Phase:

- Foundation

Decision:

The primary device identity should be app_generated_device_id.

Reason:

A stable app-generated ID is more controllable and suitable for app licensing.

Impact:

The app must generate and persist app_generated_device_id.

The backend should use it during activation and license checks.

## DEC-010 - Device Metadata As Secondary Signals

Status:

- Accepted

Phase:

- Foundation

Decision:

Secondary device signals may include Android ID, device model, platform, app version code, app version name, and install metadata.

Reason:

Secondary signals help debugging, fraud review, and device management without replacing the primary app-generated identity.

Impact:

Device metadata may be stored but should not override app_generated_device_id as primary identity.

## DEC-011 - Three Primary Roles

Status:

- Accepted

Phase:

- Foundation

Decision:

The platform has three primary roles:

- Admin
- Reseller
- Customer

Reason:

These roles match the planned product structure.

Impact:

API, web dashboards, database, and authorization must support these roles.

## DEC-012 - Backend Authorization Is Mandatory

Status:

- Accepted

Phase:

- Foundation

Decision:

Frontend route hiding is not enough.

Backend authorization is mandatory.

Reason:

Security cannot depend on frontend visibility.

Impact:

Every protected backend endpoint must check authentication, role, ownership, and action permission.

## DEC-013 - Resellers Can Access Only Own Customers

Status:

- Accepted

Phase:

- Foundation

Decision:

A reseller must only access customers owned by that reseller.

Reason:

Cross-reseller data access would be a serious security and business issue.

Impact:

All reseller queries and mutations must be scoped by reseller ownership.

## DEC-014 - Customers Can Access Only Own Data

Status:

- Accepted

Phase:

- Foundation

Decision:

Customers must only access their own account, subscription, devices, payments, and optional playlist transfer records.

Reason:

Customer data isolation is required.

Impact:

Customer APIs must check ownership for every sensitive resource.

## DEC-015 - Reseller Credit Must Be Transaction-Based

Status:

- Accepted

Phase:

- Foundation

Decision:

The reseller credit system must be transaction-based.

A simple balance field is not enough.

Reason:

Credit operations must be auditable and safe.

Impact:

Every credit operation must create a ResellerCreditTransaction record.

## DEC-016 - Reseller Balance Field May Exist For Fast Reads

Status:

- Accepted

Phase:

- Foundation

Decision:

A reseller balance field may exist for fast reads, but transaction records are required for accountability.

Reason:

Balance is useful for dashboards, but history is needed for auditability.

Impact:

Credit balance updates must happen together with transaction creation.

## DEC-017 - Prevent Negative Reseller Balances

Status:

- Accepted

Phase:

- Foundation

Decision:

Negative reseller balances must be prevented.

Reason:

Credit cannot be overspent unless a future business rule explicitly allows it.

Impact:

Credit usage must validate available balance inside a database transaction.

## DEC-018 - Backend Must Not Trust Frontend Credit Values

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend must never trust frontend-provided credit values.

Reason:

Frontend values can be manipulated.

Impact:

The backend must calculate credit cost, balance_before, balance_after, and final transaction state.

## DEC-019 - Backend Must Not Trust Frontend Pricing

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend must never trust frontend-provided prices, durations, discounts, or plan limits.

Reason:

Payment and subscription logic must be backend-authoritative.

Impact:

Checkout, manual payments, subscription creation, and reseller operations must load plan data from the backend database.

## DEC-020 - No Payment Card Data Storage

Status:

- Accepted

Phase:

- Foundation

Decision:

The system must not store payment card data.

Reason:

Reducing payment data risk is mandatory.

Impact:

No card numbers, CVV, or full raw card payloads should be stored.

Payment providers should handle card data.

## DEC-021 - Manual Payments Allowed In MVP

Status:

- Accepted

Phase:

- Foundation

Decision:

Manual payment records may be supported during MVP.

Reason:

Manual payments are simpler while the platform foundation is built.

Impact:

Admin-only approval and rejection flow may be implemented before real payment provider integration.

## DEC-022 - Payment Webhooks Must Be Verified

Status:

- Accepted

Phase:

- Foundation

Decision:

Payment provider webhook signatures must be verified.

Reason:

Unverified payment webhooks are unsafe.

Impact:

Subscription extension must happen only after verified payment confirmation.

## DEC-023 - Subscription Represents Software Access

Status:

- Accepted

Phase:

- Foundation

Decision:

Subscriptions represent software/player access only.

They do not represent channels, streams, playlists, or content packages.

Reason:

This protects the legal and product boundary.

Impact:

Plan names, payment records, marketing copy, and UI copy must avoid content-provider language.

## DEC-024 - App Version Control Required

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend should support app version control.

Reason:

The platform must be able to enforce minimum supported versions and force updates.

Impact:

The backend should expose app version rules to the app.

Admin should manage app version records.

## DEC-025 - Remote Config Required

Status:

- Accepted

Phase:

- Foundation

Decision:

The backend should support remote config.

Reason:

The platform needs maintenance mode, announcements, and feature flags.

Impact:

The app should fetch remote config and respect maintenance mode and feature flags.

## DEC-026 - Audit Logs Required For Critical Actions

Status:

- Accepted

Phase:

- Foundation

Decision:

Critical admin and reseller actions must be audit logged.

Reason:

Auditability is required for security, finance, support, and operational review.

Impact:

Audit logs should record actor, role, action, target, IP, user agent, metadata, and timestamp.

## DEC-027 - Passwords Must Be Hashed

Status:

- Accepted

Phase:

- Foundation

Decision:

Passwords must never be stored in plain text.

Reason:

Plain text password storage is unacceptable.

Impact:

Use secure password hashing such as Argon2 or bcrypt.

## DEC-028 - Standard API Response Format

Status:

- Accepted

Phase:

- Foundation

Decision:

The API should use a standard success and error response format.

Reason:

Consistent API responses simplify frontend and app integration.

Impact:

API responses should include success, code, message, data, and meta where useful.

## DEC-029 - pnpm Monorepo

Status:

- Accepted

Phase:

- Foundation

Decision:

The project uses a pnpm monorepo.

Reason:

The platform includes multiple apps and shared packages.

Impact:

The repository should use package.json, pnpm-workspace.yaml, apps/web, apps/api, and packages/shared.

## DEC-030 - Planned Web Stack

Status:

- Accepted

Phase:

- Foundation

Decision:

The web app should use Next.js, React, TypeScript, and Tailwind CSS.

Reason:

This stack supports modern dashboard and public website development.

Impact:

apps/web should be built with this stack.

## DEC-031 - Planned API Stack

Status:

- Accepted

Phase:

- Foundation

Decision:

The API should use NestJS, TypeScript, Prisma, PostgreSQL, and Redis.

Reason:

This stack supports modular backend development, database access, caching, rate limiting, and future background jobs.

Impact:

apps/api should be built with this stack.

## DEC-032 - Shared Package Required

Status:

- Accepted

Phase:

- Foundation

Decision:

A shared TypeScript package should provide shared constants, types, and validation schemas.

Reason:

Shared definitions reduce duplication between web and API.

Impact:

packages/shared should contain roles, status enums, API codes, and shared types.

## DEC-033 - Documentation First Workflow

Status:

- Accepted

Phase:

- Foundation

Decision:

Project memory and documentation should be completed before real implementation.

Reason:

The project has many legal, security, reseller, app integration, and product-boundary decisions that must be preserved.

Impact:

README, PROJECT_STATE, AI_HANDOFF, ROADMAP, project-bible, and docs should be prepared before implementation.

## DEC-034 - Manual Editing For Critical Multiline Files

Status:

- Accepted

Phase:

- Foundation

Decision:

Critical multiline files should be edited manually through GitHub web editor or Codespaces when needed.

Reason:

Automated GitHub updates previously collapsed Markdown, JSON, YAML, and ENV files into long single-line files.

Impact:

User should replace file contents manually and verify raw GitHub line counts.

## DEC-035 - Raw GitHub Line Count Verification

Status:

- Accepted

Phase:

- Foundation

Decision:

Critical files should be verified with raw GitHub line-count checks.

Reason:

This confirms that files are real multiline files.

Impact:

Use this pattern after edits:

curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_NAME | wc -l

## DEC-036 - No Stream Infrastructure

Status:

- Accepted

Phase:

- Foundation

Decision:

DevOps and infrastructure must not be designed for stream hosting, relay, transcoding, or CDN stream delivery.

Reason:

The platform does not deliver content.

Impact:

Infrastructure should focus on web, API, database, Redis, logs, monitoring, backups, and app release files.

## DEC-037 - Public Marketing Must Be Legally Careful

Status:

- Accepted

Phase:

- Foundation

Decision:

Marketing must clearly state that the platform does not provide channels, streams, playlists, or content.

Reason:

Public messaging must match the player-only product boundary.

Impact:

Homepage, pricing, FAQ, download page, reseller copy, and legal pages must avoid content-provider claims.

## DEC-038 - Optional Future Features Require Approval

Status:

- Accepted

Phase:

- Foundation

Decision:

Some post-MVP features require separate approval.

Examples:

- Real payment provider integration
- Encrypted cloud playlist sync
- Affiliate system
- Admin 2FA
- SMS notifications
- Advanced reseller commission models
- Invoice generation
- Support ticket system

Reason:

These features affect scope, security, cost, and complexity.

Impact:

Do not implement these features automatically.

## Rejected Decisions

This section records decisions that were rejected.

## REJ-001 - Backend As IPTV Provider

Status:

- Rejected

Phase:

- Foundation

Rejected idea:

Use the backend as an IPTV provider or content provider.

Reason:

This violates the product boundary.

Impact:

No content-provider features should be implemented.

## REJ-002 - Backend As Playlist Source Of Truth

Status:

- Rejected

Phase:

- Foundation

Rejected idea:

Store and manage all playlist credentials permanently in the backend by default.

Reason:

This would turn the backend into playlist authority.

Impact:

Playlist storage remains local-first inside the app.

## REJ-003 - MAC Address As Primary Device Identity

Status:

- Rejected

Phase:

- Foundation

Rejected idea:

Use MAC address as the primary device identifier.

Reason:

MAC address is unreliable and not suitable as the primary app licensing identity.

Impact:

Use app_generated_device_id instead.

## REJ-004 - Simple Reseller Balance Without Transactions

Status:

- Rejected

Phase:

- Foundation

Rejected idea:

Use only a reseller balance field without transaction history.

Reason:

This is not auditable or safe enough.

Impact:

Every reseller credit operation must create a transaction record.

## REJ-005 - Frontend-Trusted Pricing Or Credits

Status:

- Rejected

Phase:

- Foundation

Rejected idea:

Allow frontend to decide final prices, durations, credit costs, or credit balances.

Reason:

Frontend values can be manipulated.

Impact:

Backend must calculate all trusted payment, plan, subscription, and credit values.

## Future Decision Areas

The following areas still need future decisions:

- Exact payment provider
- Exact deployment target
- Exact app activation flow
- Whether pairing-code activation is MVP or post-MVP
- Email provider
- SMS provider
- Support system approach
- Admin two-factor authentication timing
- Invoice and PDF receipt timing
- API versioning approach
- Production backup provider
- Monitoring provider

## Final Rule

Do not change accepted decisions silently.

If a decision changes, add a new entry explaining:

- What changed
- Why it changed
- Who approved it
- What impact it has

The player-only product boundary must remain protected.
