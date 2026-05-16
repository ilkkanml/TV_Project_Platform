# TV Project Platform

Format status:

Readable multiline Markdown.

## Platform Identity

TV Project Platform is a Licensed IPTV Player Platform.

This project is not an IPTV broadcast provider.

This project is not a content provider.

This project is not a stream provider.

This project is not a playlist provider.

The platform manages licensed player access.

The platform does not distribute TV content.

The platform does not sell channel lists.

The platform does not operate stream infrastructure.

## Backend Boundaries

The backend must not provide streams.

The backend must not host streams.

The backend must not relay streams.

The backend must not transcode streams.

The backend must not operate a CDN.

The backend must not provide channels.

The backend must not sell channel packages.

The backend must not store playlist inventory.

The backend must not become playlist source of truth.

## Allowed Backend Scope

The backend may manage only platform services.

Allowed services are:

- User accounts
- Subscriptions
- Licenses
- Device activation
- Payments
- Reseller accounts
- Reseller credits
- App version checks
- Remote configuration
- Temporary web-to-device profile transfer

## Playlist Decision

Playlist data belongs to the user.

Playlist data is entered in the player app by default.

Playlist data is stored on the device by default.

Playlist data must use encrypted local storage.

The app must support multiple playlist profiles.

The backend is not the playlist authority.

The backend is not the playlist database.

The backend is not the playlist provider.

## Web-To-Device Bridge

The web panel may send a user-owned playlist/profile.

The target must be the user's own activated device.

The transfer must be temporary.

The transfer must be encrypted.

The transfer must be device-targeted.

The transfer must not become permanent hosted storage.

The transfer must not become a playlist marketplace.

The transfer must not become a channel catalog.

The transfer must not become content distribution.

## Technical Stack

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
- Shared package for types
- Shared package for constants
- Shared package for validators

## Repository Areas

- `apps/web`
- `apps/api`
- `packages/shared`
- `project-bible`
- `docs`
- `infra`
- `.github`

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

Do not commit real API keys.

Do not commit payment credentials.

Do not commit unauthorized content sources.

Do not commit channel lists.

Do not commit copyrighted media sources.

Do not commit third-party playlist data.

Use placeholder values in example environment files.
