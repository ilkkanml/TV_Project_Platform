# TV Project Platform

TV Project Platform is a Licensed IPTV Player Platform.

This project is not an IPTV broadcast provider. It does not provide, host, relay, transcode, resell, package, or distribute TV streams, channels, CDN services, or playlist-provider services.

The backend exists only to manage software access, licensing, activation, payments, reseller operations, app configuration, and optional secure transfer flows for user-owned player profiles.

## Project Decision

This repository is designed for a licensed player platform, not a content platform.

The backend must never act as:

- A broadcast provider
- A stream host
- A channel provider
- A CDN
- A relay
- A transcoder
- A playlist provider
- A copyrighted content source
- A source of truth for playlist data

## Backend Scope

The backend may manage only the following platform responsibilities:

- User accounts
- Subscriptions and licenses
- Device activation
- Payments
- Reseller and credit systems
- App version checks
- Remote configuration
- Optional web-to-device playlist/profile push bridge

Anything related to providing live content, hosting streams, relaying streams, transcoding streams, selling channel lists, or maintaining playlist inventories is outside the backend scope.

## Playlist Decision

The backend is not the playlist source of truth.

Playlist information is entered in the player application by default. The application stores playlist data on the device using encrypted local storage.

The application must support multiple playlist profiles.

A user may optionally send their own playlist/profile from the web panel to their own activated device. This flow must be designed only as a temporary encrypted transfer bridge.

The bridge must not become:

- Hosted playlist storage
- A playlist marketplace
- A shared playlist service
- A channel catalog
- A content distribution system
- A backend-controlled playlist authority

## Technical Stack

- pnpm monorepo
- Next.js, React, TypeScript, and Tailwind CSS for `apps/web`
- NestJS, TypeScript, and Prisma for `apps/api`
- Shared types, constants, and validators in `packages/shared`
- PostgreSQL
- Redis
- Docker Compose

## Repository Map

- `apps/web` — customer, reseller, and admin web interface
- `apps/api` — backend API for accounts, licenses, devices, payments, reseller credits, app versions, and remote configuration
- `packages/shared` — shared types, constants, and validators
- `project-bible` — product, legal, architecture, and decision documentation
- `docs` — developer and operational documentation
- `infra` — infrastructure placeholders
- `.github` — repository automation placeholders

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm infra:up
pnpm db:generate
pnpm dev
```

## Security And Compliance Rules

Do not commit production secrets, private keys, payment credentials, unauthorized content sources, channel lists, copyrighted media sources, or third-party playlist data.

All environment variables must use placeholder values in example files.

All playlist/profile transfer flows must be user-owned, temporary, encrypted, and device-targeted.
