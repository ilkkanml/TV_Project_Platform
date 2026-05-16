# TV Project Platform

TV Project Platform is a Licensed IPTV Player Platform management system.

This project is not an IPTV broadcast provider. It does not provide, host, relay, transcode, resell, or package TV streams or channel lists.

The platform manages software access, subscriptions, device activation, reseller credits, payments, application version checks, remote configuration, and an optional web-to-device playlist/profile transfer bridge for user-owned playlist information.

## Core Scope

The backend may manage:

- User accounts
- Subscriptions and licenses
- Device activation
- Payment status
- Reseller and credit systems
- App version checks
- Remote configuration
- Optional temporary encrypted playlist/profile transfer from a user's web panel to the user's own device

The backend must not:

- Provide streams
- Host streams
- Sell channel lists
- Operate as a CDN, relay, or transcoder
- Become a playlist provider
- Become a content source
- Treat playlist data as the platform source of truth

## Playlist Position

Playlist information is primarily entered inside the player application.

The application should support multiple playlist profiles and store them on the device using encrypted local storage.

A user may optionally send their own playlist/profile from the web panel to their own activated device. That flow is a temporary encrypted transfer bridge, not a hosted playlist service.

## Technical Stack

- pnpm monorepo
- Next.js, React, TypeScript, Tailwind CSS for `apps/web`
- NestJS, TypeScript, Prisma for `apps/api`
- Shared types, constants, and validators in `packages/shared`
- PostgreSQL
- Redis
- Docker Compose

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm infra:up
pnpm db:generate
pnpm dev
```

## Repository Map

- `apps/web` — customer, reseller, and admin web interface
- `apps/api` — backend API for accounts, licenses, devices, payments, reseller credits, app versions, and remote config
- `packages/shared` — shared types, constants, and validators
- `project-bible` — product, legal, architecture, and decision documentation
- `docs` — developer and operational documentation
- `infra` — infrastructure placeholders
- `.github` — repository automation placeholders

## Important

Do not commit production secrets, private keys, payment credentials, unauthorized content sources, channel lists, copyrighted media sources, or third-party playlist data.
