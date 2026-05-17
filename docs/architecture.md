# Architecture

Compact architecture reference for TV Project Platform.

## Overview

TV Project Platform uses a pnpm monorepo with separate web, API, shared package, infrastructure, documentation, and project Bible areas.

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

### apps/api

NestJS API for approved platform operations.

### packages/shared

Shared TypeScript types, constants, schemas, and utilities.

## Data Stores

### PostgreSQL

Primary operational database for accounts, devices, licenses, subscriptions, payments, reseller credit transactions, app versions, remote config, audit logs, and approved platform records.

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
- shared profile library
- public profile search
- permanent backend profile authority by default

## Validation Direction

Validation is internal-first.

External CI workflow has been removed from active use.

Until internal validation exists, local/manual validation commands may be used.

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/04-database-bible.md
- project-bible/05-api-bible.md
- project-bible/12-devops-bible.md
- LEGAL_SCOPE.md

## Final Rule

Architecture stays minimal, private, reversible, and inside approved platform scope.
