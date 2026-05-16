# New Chat Start Message

Use this message when starting a new ChatGPT session for TV Project Platform.

Copy the section below and paste it into the new chat.

---

## Message To Paste Into New Chat

We are continuing the GitHub repository:

https://github.com/ilkkanml/TV_Project_Platform

This project is TV Project Platform.

Before doing anything, read and respect these files:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

Do not redefine the product.

Do not change previously accepted decisions.

Do not rename files unless explicitly approved.

Do not create duplicate folders.

Do not create nested project-bible/project-bible or docs/docs folders.

Do not continue blindly if the real repository tree differs from the expected tree.

First inspect the repository tree, then continue.

## Product Identity

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a content provider.

It is not a playlist provider.

It is not a channel seller.

It is not a stream hosting service.

## Strict Product Boundary

The backend must never provide, host, relay, transcode, package, sell, or distribute TV streams.

The backend must never operate as a CDN.

The backend must never become a broadcast backend.

The backend must never become the source of truth for playlist data.

The backend must not provide channel lists, stream URLs, content catalogs, channel packages, or playlist marketplace features.

## Backend Allowed Scope

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

## Playlist Decision

Playlist information is not backend source of truth.

By default, playlist information is entered inside the app.

Playlist credentials are stored on the user device.

Playlist credentials must be stored using encrypted local storage.

The backend should not permanently store playlist credentials by default.

The app must support multiple playlist profiles.

The user may optionally send a playlist profile from the web panel to their own device.

This optional feature must only work as a temporary encrypted transfer bridge.

Temporary transfer payloads must expire.

Temporary transfer payloads should be deleted or marked consumed after pickup when possible.

Encrypted cloud sync is not default and requires explicit approval.

## Device Identity Decision

MAC address must not be used as the primary device identifier.

The primary device identifier is:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

## Roles

The platform has three primary roles:

- Admin
- Reseller
- Customer

Backend authorization is mandatory.

Frontend route hiding is not enough.

Admin can manage platform-wide resources.

Reseller can manage only own customers and own credit-related records.

Customer can manage only own account, subscription, devices, payments, and optional playlist transfer records.

## Reseller Credit Decision

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

The backend must never trust frontend credit values.

The backend must calculate credit cost and balance changes.

Credit usage must happen inside database transactions.

Negative reseller balances must be prevented.

## Payment Decision

Payments are for software/player access only.

Payments are not for channels, streams, playlists, or content.

Card data must not be stored.

Manual payment records may be supported during MVP.

Real payment integration may use approved providers later.

Possible providers:

- Iyzico
- PayTR
- Stripe
- Other approved providers

Payment webhook signatures must be verified.

Subscription extension must happen only after verified payment confirmation.

Frontend price values must not be trusted.

## Security Decisions

Passwords must never be stored in plain text.

Payment card data must never be stored directly.

Frontend values must not be trusted for pricing, credits, roles, or permissions.

Role-based access control is required.

Auth endpoints must be rate limited.

Critical admin and reseller actions must be audit logged.

Device license checks must be backend-authoritative.

Temporary playlist transfer payloads must expire.

Sensitive data must not be logged.

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

## Planned Repository Structure

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

## Important Workflow Rule

Some previous automated file edits caused files to collapse into single-line content.

For critical Markdown, JSON, YAML, and ENV files, use manual editing through GitHub web editor or Codespaces unless the tool is confirmed to preserve newlines.

Safe workflow:

1. Inspect the real repository tree.
2. Confirm the exact file path.
3. Provide complete file content.
4. User manually replaces the file content.
5. User commits manually.
6. User verifies raw GitHub line count.
7. Continue to the next file.

Do not invent new filenames.

Do not assume a file exists.

Do not create replacement files with different names unless explicitly approved.

## Raw GitHub Verification Pattern

After editing a critical file, verify with:

curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_PATH | wc -l

A multiline Markdown file should not return 1.

## Current Foundation Goal

The current goal is to stabilize the repository foundation before real coding.

Priority:

1. Stabilize repository tree.
2. Remove accidental duplicate folders if any.
3. Keep product decisions unchanged.
4. Complete foundation documentation.
5. Complete project-bible documentation.
6. Complete docs documentation.
7. Then start real implementation.

## Before Continuing

Before continuing, run or ask the user to run:

find . -maxdepth 3 -type f | sort

Also inspect:

find project-bible -maxdepth 3 -type f | sort

And:

git status --short

If duplicate or unexpected folders exist, stop and clean the tree before writing new content.

## Do Not Change Without Approval

Do not change these decisions without explicit user approval:

- Player-only product model
- Backend is not a content provider
- Backend is not playlist source of truth
- Playlist credentials are stored locally in the app by default
- Multi-profile app support
- Optional temporary web-to-device playlist profile transfer
- App-generated device ID as primary device identity
- Reseller credit transaction requirement
- Role-based access control
- No payment card data storage
- No plain text password storage
- Backend-authoritative license checks
- Manual-first payment MVP
- pnpm monorepo structure
- Next.js web app
- NestJS API app
- Prisma PostgreSQL backend

## Implementation Has Not Started Yet

Do not assume the real backend is complete.

Do not assume the real frontend is complete.

Do not assume the Prisma schema is final.

Do not assume admin, reseller, or customer dashboards are implemented.

The project is still in foundation and documentation stabilization phase.

## Assistant Behavior Required

The assistant must:

- Be careful.
- Work from the actual repository tree.
- Preserve accepted decisions.
- Avoid renaming files without approval.
- Avoid creating duplicate folders.
- Avoid adding content-provider features.
- Avoid adding stream-hosting features.
- Avoid making backend playlist authority.
- Provide complete code or complete file content when asked.
- Keep responses practical and concise.
- Ask for repository tree output when uncertain.

## Final Instruction

Continue the project from the existing repository state.

Do not restart the architecture.

Do not change the product direction.

Do not create new conflicting documentation structure.

First stabilize, then implement.
