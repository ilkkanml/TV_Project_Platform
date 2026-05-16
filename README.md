# TV Project Platform

TV Project Platform is a Licensed IPTV Player Platform.

This project is not an IPTV broadcast provider.

It does not provide TV streams.

It does not host TV streams.

It does not relay TV streams.

It does not transcode TV streams.

It does not operate CDN services.

It does not sell channel lists.

It does not act as a playlist provider.

The platform manages licensed player access only.

The backend exists to support accounts, licenses, devices, payments,
reseller operations, app configuration, and secure device transfer flows.

## Project Decision

This repository is for a licensed player platform.

It is not a content platform.

It is not an IPTV provider.

It is not a broadcast backend.

It is not a playlist authority.

The backend must never become the source of truth for playlist data.

## Backend Scope

The backend may manage these responsibilities:

- User accounts
- Subscriptions
- Licenses
- Device activation
- Payments
- Reseller system
- Credit system
- App version checks
- Remote configuration
- Optional web-to-device playlist/profile push bridge

The backend must not manage these responsibilities:

- TV streams
- Stream hosting
- Stream relaying
- Stream transcoding
- Channel catalogs
- Channel packages
- Playlist inventory
- Playlist marketplace features
- CDN delivery
- Copyrighted media sources
- Third-party playlist data

## Playlist Decision

The backend is not the playlist source of truth.

Playlist information is entered in the player application by default.

Playlist information is stored on the device.

Playlist storage must use encrypted local storage.

The player application must support multiple playlist profiles.

Each playlist profile belongs to the user.

Each playlist profile remains device-side by default.

## Web-To-Device Transfer Bridge

A user may optionally send a playlist/profile from the web panel.

The transfer target must be the user's own activated device.

This flow must be temporary.

This flow must be encrypted.

This flow must be device-targeted.

This flow must not become permanent hosted playlist storage.

This flow must not become a playlist marketplace.

This flow must not become a channel catalog.

This flow must not become a content distribution system.

## Technical Stack

- pnpm monorepo
- Next.js for `apps/web`
- React for `apps/web`
- TypeScript for `apps/web`
- Tailwind CSS for `apps/web`
- NestJS for `apps/api`
- TypeScript for `apps/api`
- Prisma for `apps/api`
- Shared types in `packages/shared`
- Shared constants in `packages/shared`
- Shared validators in `packages/shared`
- PostgreSQL
- Redis
- Docker Compose

## Repository Map

- `apps/web` — web interface
- `apps/api` — backend API
- `packages/shared` — shared project code
- `project-bible` — product and architecture decisions
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

## Security Rules

Do not commit production secrets.

Do not commit private keys.

Do not commit payment credentials.

Do not commit unauthorized content sources.

Do not commit channel lists.

Do not commit copyrighted media sources.

Do not commit third-party playlist data.

Example environment files must use placeholder values only.
