# Architecture

Compact architecture reference for TV Project Platform.

## Overview

TV Project Platform uses a pnpm monorepo with separate web, API, shared package, infrastructure, documentation, and project Bible areas.

The platform is the web/API support layer for the Nexora TV Android TV / Fire TV app.

It provides approved platform information to the app where needed and does not control playback or local source/profile behavior.

## Active Structure

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra

## Applications

### apps/web

Next.js application for public/legal pages when needed, customer panel, reseller panel, and admin panel.

Web UI must stay inside platform management and must not become media/source management.

### apps/api

NestJS API for approved platform operations and app-support information checks.

API responses may inform the app about access, device, license, app version, remote config, maintenance, and temporary transfer state when enabled.

API must not provide media content, source catalogs, stream lists, or playback-control behavior.

### packages/shared

Shared TypeScript types, constants, schemas, and utilities.

Shared code must not introduce provider, catalog, stream-authority, or playback-control concepts.

## Data Stores

### MySQL / MariaDB-compatible database

Primary operational database for accounts, devices, licenses, subscriptions, payments, reseller credit transactions, app versions, remote config, audit logs, and approved platform records.

The active provider must stay aligned across Prisma schema, Docker Compose, and environment examples.

### Redis

Short-lived cache, rate limiting, queue, and temporary state store when needed.

Redis must not become permanent profile/provider storage.

## Allowed Architecture

Architecture may support:

- accounts
- authentication
- authorization
- plans
- subscriptions
- licenses
- devices
- resellers
- payments
- app versions
- remote config
- audit logs
- temporary own-device transfer when enabled
- controlled Downloader-code / direct APK early access support when needed

## Forbidden Architecture

Do not add architecture for:

- provider inventory
- stream hosting
- stream relay
- transcoding
- CDN stream routing
- channel/package management
- public marketplace
- content catalog
- backend playback control
- stream authority
- shared profile library
- public profile search
- permanent backend profile authority by default

## Early Access Architecture

Early access is controlled distribution, not a public marketplace launch.

Architecture should prioritize:

- stable app install path
- stable app launch
- stable remote-friendly navigation
- stable local profile/source entry
- stable playback shell
- stable app-support checks when enabled

Do not prioritize marketplace publishing architecture during early access.

## Validation Direction

Validation is internal-first.

External CI workflow has been removed from active use.

Until internal validation exists, local/manual validation commands may be used.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/10-app-integration.md
- project-bible/12-devops-bible.md
- project-bible/16-release-bible.md
- LEGAL_SCOPE.md

## Final Rule

Architecture stays minimal, private, reversible, app-support-only, and inside approved platform scope.
