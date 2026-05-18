# TV Project Platform

## Purpose

`TV_Project_Platform` is the platform-side source-of-truth repository for the Nexora TV ecosystem.

It supports the Android TV / Fire TV client through account, device, license, app version, remote config, and temporary profile transfer foundations.

## Product Boundary

Nexora TV is a legal Core Media Player Ecosystem.

The platform does not provide content, channels, broadcasts, bundled media, provider credentials, or stream distribution.

Users may only use sources they are legally authorized to access.

## Current Role

This repo is responsible for:

- Account foundation
- Device registry foundation
- Activation session foundation
- License check foundation
- App version check foundation
- Remote config foundation
- Temporary encrypted profile transfer foundation
- Admin/platform web foundation
- Shared platform constants/types

This repo is not responsible for:

- Content hosting
- Broadcasting
- Channel selling
- Bundled streams
- Provider credential sharing
- Unauthorized source extraction
- Protected-system circumvention
- Android playback implementation

## Current Stack

- pnpm workspace
- Next.js web app
- NestJS API app
- Prisma
- PostgreSQL
- Redis
- Shared TypeScript package

## Read First

1. `docs/START_HERE.md`
2. `docs/PLATFORM_SOURCE_OF_TRUTH.md`
3. `docs/API_CONTRACT_ALIGNMENT.md`
4. `docs/DATABASE_BASELINE.md`
5. `docs/SECURITY_SESSION_POLICY.md`
6. `docs/LEGAL_BOUNDARY.md`

## Current Milestone Context

This repository is being audited under:

`M11 Platform Source-of-Truth Audit`

M11 is documentation/audit only.

No backend implementation, database migration, Android bridge, payment enforcement, or provider integration is approved by M11.

## Development Commands

Install dependencies:

```bash
pnpm install
```

Run all dev apps:

```bash
pnpm dev
```

Run web only:

```bash
pnpm dev:web
```

Run API only:

```bash
pnpm dev:api
```

Start local infrastructure:

```bash
pnpm infra:up
```

Generate Prisma client:

```bash
pnpm db:generate
```

## Guardrails

- Keep platform source-of-truth aligned with the Android client contract.
- Do not turn the platform into a media/content provider.
- Do not enable channel/package selling.
- Do not store user media sources unless a future Director-approved policy explicitly allows it.
- Payment/subscription enforcement remains inactive until a future approved milestone.
