# Architecture Principles

## Monorepo

Use pnpm workspaces.

Main areas:

- `apps/web`
- `apps/api`
- `packages/shared`
- `infra`
- `docs`
- `project-bible`

## API Boundary

The API should expose business capabilities around users, subscriptions, licenses, devices, payments, reseller credits, remote config, and app versions.

It should not expose media streaming, channel catalog, playlist provider, relay, or transcoding endpoints.

## Shared Contracts

Common constants, types, and validation helpers should live in `packages/shared`.

## Data Philosophy

Store operational platform data.

Do not store unauthorized content, provider data, or permanent playlist libraries.
