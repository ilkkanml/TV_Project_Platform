# TV Project Platform

Internal web/API support platform for the Nexora TV Android TV / Fire TV application.

## Product Role

`TV_Project_Platform` is not the main player app.

The Android TV / Fire TV application is the player client.

This repository provides only the platform-side information the app needs in approved places, such as device, license, app version, remote config, activation, and operational status.

The platform does not remotely control playback, replace local app behavior, manage user media catalogs, or become the permanent source of truth for provider/profile data.

## Product Boundary

The platform must not provide, sell, host, relay, transcode, package, index, or distribute channels, streams, playlists, provider credentials, broadcasts, or media content.

Users are responsible for using lawful sources they are authorized to access.

## Allowed Responsibilities

This repository may support:

- account foundation
- device install / activation status
- license status information
- app version information
- remote configuration
- maintenance / force-update flags
- admin, reseller, and customer web foundations
- reseller credit records when approved
- manual payment records when approved
- audit logs
- optional temporary encrypted web-to-device transfer when explicitly enabled
- shared platform constants and types

## Not Responsible For

This repository must not handle:

- Android playback implementation
- provider inventory
- channel packages
- stream URLs as a platform catalog
- permanent provider/profile credential storage by default
- public playlist/profile marketplace
- stream hosting or relay
- content discovery
- unauthorized source extraction

## Current Stack

- pnpm workspace
- Next.js web app
- NestJS API app
- Prisma
- MySQL / MariaDB-compatible local database
- Redis
- Shared TypeScript package
- Docker Compose

## Active Authority Files

Read these first when continuing the project:

1. `PROJECT_STATE.md`
2. `AI_HANDOFF.md`
3. `ROADMAP.md`
4. `LEGAL_SCOPE.md`
5. `SECURITY.md`
6. `project-bible/00-project-rules.md`
7. `project-bible/13-decision-log.md`
8. `project-bible/17-ai-operations-bible.md`

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

## Director Rule

Keep this repo as a controlled web/API support layer for Nexora TV.

Do not turn it into a content provider, media catalog, stream distributor, or app playback controller.
