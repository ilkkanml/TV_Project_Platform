# Architecture

## Overview

TV Project Platform uses a pnpm monorepo with separate web, API, shared package, infrastructure, documentation, and project bible areas.

## Applications

### `apps/web`

Next.js application for public pages, customer dashboard, reseller dashboard, and admin dashboard.

### `apps/api`

NestJS API for platform operations.

### `packages/shared`

Common TypeScript types, constants, and validators.

## Data Stores

### PostgreSQL

Primary operational database for accounts, devices, licenses, subscriptions, payments, reseller credits, app versions, remote config, and audit records.

### Redis

Short-lived cache and temporary transfer session store.

## Forbidden Architecture

Do not add stream hosting, channel catalog, playlist provider, CDN, relay, or transcoding components.
