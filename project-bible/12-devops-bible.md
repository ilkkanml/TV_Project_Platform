# 12 - DevOps Bible

This file defines the DevOps, infrastructure, environment, deployment, monitoring, backup, release, CI/CD, and operational rules for TV Project Platform.

DevOps must support the licensed player platform model.

DevOps must not create infrastructure for stream hosting, content delivery, CDN stream routing, channel distribution, transcoding, broadcast operations, or playlist provider services.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Infrastructure may support:

- Web application
- API application
- PostgreSQL database
- Redis cache
- Background jobs
- APK file download storage
- Logs
- Monitoring
- Backups
- CI/CD
- Remote config
- App version metadata
- Payment webhook handling
- Temporary playlist transfer bridge

Infrastructure must not support:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package delivery
- Broadcast infrastructure
- Playlist marketplace hosting
- Content catalog distribution

## Planned Technical Stack

The planned technical stack is:

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
- GitHub repository
- GitHub Actions later

Repository structure:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra
- .github

## Monorepo Rules

The repository is a pnpm monorepo.

Rules:

- Use one root package.json.
- Use pnpm-workspace.yaml.
- Use shared TypeScript configuration.
- Keep apps isolated under apps.
- Keep shared types under packages/shared.
- Do not duplicate nested folders.
- Do not create project-bible/project-bible.
- Do not create docs/docs.
- Do not create apps/apps.
- Do not create packages/packages.

## Planned App Locations

Web app:

- apps/web

API app:

- apps/api

Shared package:

- packages/shared

Prisma schema:

- apps/api/prisma/schema.prisma

Docker Compose file:

- docker-compose.yml

Environment example:

- .env.example

## Local Development Goals

Local development should allow developers to run:

- PostgreSQL
- Redis
- API
- Web app
- Prisma migrations
- Prisma Studio when needed
- Seed scripts
- Tests
- Type checks

Local setup should be documented in:

- docs/local-setup.md

## Local Docker Compose

Docker Compose should support local services.

Initial local services:

- postgres
- redis

Optional later services:

- mailhog
- minio
- adminer
- pgadmin
- monitoring stack

Do not add stream servers, transcoding workers, channel relays, or CDN streaming services.

## PostgreSQL Local Service

PostgreSQL service should provide:

- Local database
- Persistent local volume
- Configurable database name
- Configurable username
- Configurable password
- Health check when practical

Environment variables may include:

- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- DATABASE_URL

Production database credentials must not be committed.

## Redis Local Service

Redis service may support:

- Rate limiting
- Temporary cache
- Queue processing later
- Session-related support when needed
- Temporary playlist transfer expiry helpers when needed

Redis must not be used for stream delivery.

Redis must not store permanent playlist credentials.

Environment variables may include:

- REDIS_URL

## Environment Variable Rules

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

`.env.example` may contain placeholders only.

Required environment variables may include:

- NODE_ENV
- PORT
- DATABASE_URL
- REDIS_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- ACCESS_TOKEN_TTL
- REFRESH_TOKEN_TTL
- PLAYLIST_TRANSFER_ENCRYPTION_KEY
- PAYMENT_PROVIDER
- PAYMENT_WEBHOOK_SECRET
- ADMIN_SEED_EMAIL
- ADMIN_SEED_PASSWORD
- WEB_PUBLIC_URL
- API_PUBLIC_URL

Production secrets must be strong.

Default secrets must never be used in production.

## Environment Files

Local development may use:

- .env

Example configuration should use:

- .env.example

Rules:

- `.env` must be ignored by Git.
- `.env.example` must not contain real secrets.
- Production secrets must be configured in the hosting provider.
- CI secrets must be configured in GitHub Actions secrets or the selected CI provider.
- Do not print secrets in logs.

## Environment Validation

The API should validate required environment variables at startup.

Validation should check:

- Required values exist.
- JWT secrets are not default in production.
- DATABASE_URL exists.
- REDIS_URL exists when Redis is required.
- Token TTL values are valid.
- Payment provider settings are valid when enabled.
- Playlist transfer encryption key exists when playlist transfer is enabled.

Startup should fail safely when required configuration is missing.

## Development Scripts

Root package scripts may include:

- dev
- build
- lint
- test
- typecheck
- format
- db:migrate
- db:generate
- db:seed
- docker:up
- docker:down
- docker:logs

Scripts should be predictable and documented.

## Install Command

The project should use:

```bash
pnpm install
