# 12 - DevOps Bible

This file defines the DevOps, infrastructure, deployment, environment, and operational rules for TV Project Platform.

The DevOps setup must support the licensed player platform model.

The infrastructure must not be designed for stream hosting, stream relay, CDN delivery, transcoding, or content distribution.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The infrastructure may support:

- Web application
- API application
- PostgreSQL database
- Redis cache
- Background jobs
- File downloads for approved app releases
- Logs
- Monitoring
- Backups

The infrastructure must not support:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package delivery
- Content catalog delivery
- Playlist provider infrastructure
- Broadcast infrastructure

## Planned Stack

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

## Repository Structure

Main structure:

- apps/web
- apps/api
- packages/shared
- project-bible
- docs
- infra
- .github

## Environment Types

The platform should support these environments:

- local
- development
- staging
- production

Each environment must have its own environment variables.

Production secrets must never be reused in local or staging.

## Local Development

Local development should use Docker Compose for services.

Local services may include:

- PostgreSQL
- Redis
- API app
- Web app

Local development should support:

- pnpm install
- pnpm dev
- pnpm build
- pnpm lint
- pnpm test
- Prisma migrations
- Seed data

## Docker Compose

Docker Compose may be used for local development.

Services may include:

- postgres
- redis
- api
- web

Docker Compose must not include real production secrets.

Docker Compose should use safe local defaults.

## Environment Variables

Environment variables must be documented.

Important API environment variables:

- NODE_ENV
- PORT
- DATABASE_URL
- REDIS_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- ACCESS_TOKEN_TTL
- REFRESH_TOKEN_TTL
- PLAYLIST_TRANSFER_ENCRYPTION_KEY
- PAYMENT_WEBHOOK_SECRET
- ADMIN_SEED_EMAIL
- ADMIN_SEED_PASSWORD

Important web environment variables:

- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_API_URL

Important database variables:

- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- DATABASE_URL

Important Redis variables:

- REDIS_URL

## Secret Management

Secrets must not be committed to the repository.

`.env.example` may contain placeholders only.

Production secrets must be generated securely.

Secrets that must be protected:

- Database passwords
- Redis credentials
- JWT secrets
- Refresh token secrets
- Encryption keys
- Payment provider keys
- Payment webhook secrets
- Admin seed password

## .env Files

Allowed local files:

- .env
- .env.local
- .env.development
- .env.test

These files must be ignored by git.

The repository should include only:

- .env.example

## Build Rules

The project should support root-level build commands.

Expected commands:

- pnpm install
- pnpm dev
- pnpm build
- pnpm lint
- pnpm test
- pnpm typecheck

Each app should also support app-specific commands.

## Package Manager

The project uses pnpm.

Do not switch package manager without approval.

The repository should use:

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml when dependencies are installed

## TypeScript Rules

All app and package code should use TypeScript.

TypeScript config should be shared through:

- tsconfig.base.json

Each app may extend the base config.

## Database Operations

Database operations should use Prisma.

Required database operations:

- Generate Prisma client
- Run migrations
- Apply migrations in deployment
- Seed initial admin user
- Validate schema

Production migration must be handled carefully.

Do not reset production database.

## Prisma Migration Rules

Local development may use migration creation.

Staging and production should apply committed migrations.

Rules:

- Do not run destructive migrations without backup.
- Review migrations before production.
- Keep migrations committed.
- Avoid manual production schema edits.
- Backup before major migration.

## Database Backup

Production database must have a backup strategy.

Backup rules:

- Backups should run regularly.
- Backups should be protected.
- Backups should not be publicly accessible.
- Restore process should be tested.
- Backup credentials must be protected.

## Redis Usage

Redis may be used for:

- Rate limiting
- Session support
- Caching
- Temporary tokens
- Job queues later

Redis must not store permanent source-of-truth business data.

Temporary playlist transfer data may use database and/or Redis, but must expire.

## File Storage

File storage may be needed for:

- APK release files
- Public download files
- Invoices later
- Support attachments later

File storage must not be used for:

- TV streams
- VOD streams
- Channel packages
- Playlist marketplace content
- Broadcast media delivery

## App Release Files

APK files may be hosted through approved storage or release infrastructure.

App version records may include:

- APK URL
- Version code
- Version name
- Platform
- Changelog
- Force update flag

APK hosting must not become stream hosting.

## Deployment Targets

Possible deployment targets:

- VPS
- Docker server
- Cloud VM
- Managed platform
- Kubernetes later if needed

MVP should prefer simple deployment.

Avoid over-engineering before MVP.

## Reverse Proxy

A reverse proxy may be used.

Possible options:

- Nginx
- Traefik
- Caddy

Reverse proxy may handle:

- HTTPS termination
- Routing to web app
- Routing to API app
- Static file serving
- Security headers
- Compression

## HTTPS

Production must use HTTPS.

HTTP should redirect to HTTPS.

API tokens must not be sent over insecure HTTP in production.

## Domains

Possible domain structure:

- app.example.com for web app
- api.example.com for API
- downloads.example.com for app downloads later

Actual domains will be decided later.

## CORS

CORS must be restricted in production.

Allowed origins should include only approved web app URLs.

Do not use wildcard CORS in production.

## Security Headers

Production should use security headers.

Recommended areas:

- Content Security Policy where practical
- X-Frame-Options or frame ancestors
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

## Logging

Logs should help debugging and auditing.

Logs must not contain:

- Plain text passwords
- Payment card data
- Playlist credentials
- Access tokens
- Refresh tokens
- Encryption keys
- Payment provider secrets

Safe log metadata may include:

- Request ID
- User ID
- Role
- Endpoint
- Status code
- Error code
- Timestamp
- IP address where appropriate
- User agent where appropriate

## Monitoring

Production should monitor:

- API uptime
- Web uptime
- Database connectivity
- Redis connectivity
- Error rate
- Response time
- CPU usage
- Memory usage
- Disk usage
- Database storage
- Failed login spikes
- Payment webhook failures

## Health Checks

Health endpoints may include:

- GET /health
- GET /health/db
- GET /health/redis

Public health endpoints should not expose secrets.

Detailed health endpoints may require admin access.

## CI Pipeline

GitHub Actions may be used.

CI should run:

- Install dependencies
- Typecheck
- Lint
- Build
- Tests
- Prisma validation
- Dependency audit later

CI must not print secrets.

CI must not expose environment variables.

## CD Pipeline

Deployment automation may be added after foundation is complete.

CD should:

- Build web app
- Build API app
- Apply database migrations safely
- Restart services
- Run health checks
- Roll back if needed where possible

Production deployment should be controlled.

## Branch Strategy

Current branch:

- main

Initial workflow may use direct commits while foundation is being built.

Later workflow should use:

- feature branches
- pull requests
- code review
- protected main branch
- required CI checks

## Release Strategy

Release stages:

- local development
- staging deployment
- production deployment

Before production release:

- Run tests
- Run build
- Check migrations
- Verify environment variables
- Verify secrets
- Verify payment webhook settings
- Verify backup status

## Staging Environment

Staging should mirror production as much as practical.

Staging should use:

- Separate database
- Separate Redis
- Separate secrets
- Test payment provider mode
- Test app version records
- Test remote config

Staging must not use production customer data unless explicitly approved and anonymized.

## Production Environment

Production must use:

- Strong secrets
- HTTPS
- Restricted CORS
- Real database backups
- Monitoring
- Safe logs
- Secure payment provider settings
- Verified webhook signatures
- Production-safe error handling

## Deployment Checklist

Before deployment, verify:

- Build passes
- Typecheck passes
- Lint passes
- Tests pass where available
- Prisma schema is valid
- Migrations are reviewed
- Environment variables are set
- Secrets are not default values
- Database backup exists
- CORS is configured
- HTTPS is configured
- Health endpoint works

## Rollback Strategy

Rollback should be planned.

Rollback may include:

- Revert application image
- Revert code deployment
- Restore database backup if needed
- Disable broken feature flag
- Enable maintenance mode
- Roll back app version rules

Database rollback must be handled carefully.

Do not assume every migration can be reversed safely.

## Maintenance Mode

The platform should support maintenance mode through remote config.

Maintenance mode may affect:

- App access
- Customer dashboard
- Reseller dashboard
- Admin notifications

Maintenance mode must not be confused with stream delivery because the platform does not deliver streams.

## Feature Flags

Feature flags may control:

- web_playlist_push_enabled
- multi_profile_enabled
- payment_provider_enabled
- manual_payment_enabled
- reseller_enabled
- maintenance_mode

Feature flags should be controlled by admin or config.

Feature flags must not expose secrets.

## Rate Limiting Infrastructure

Rate limiting may use Redis.

Rate limits should protect:

- Login
- Register
- Refresh token
- Device activation
- License status
- Playlist transfer creation
- Playlist transfer consumption
- Payment webhooks

Rate limits should be tuned to avoid blocking normal app usage.

## Background Jobs

Background jobs may be needed for:

- Expiring playlist transfer payloads
- Cleaning old sessions
- Sending notifications later
- Payment status reconciliation later
- Subscription expiration checks
- Audit log maintenance later

Background jobs must not process streams or content.

## Temporary Playlist Transfer Cleanup

Temporary playlist transfer payloads must expire.

Cleanup should:

- Mark expired payloads
- Delete expired payloads where appropriate
- Avoid logging sensitive payload content
- Run on a schedule
- Be safe to retry

## Payment Webhook Operations

Payment webhooks must be reliable.

Operational rules:

- Verify signatures
- Use idempotency
- Store safe event metadata
- Avoid duplicate subscription extension
- Alert on repeated failures
- Do not expose webhook secrets

## App Version Operations

Admin should be able to control:

- Latest version
- Minimum version
- Force update
- APK URL
- Changelog
- Platform

Production app version changes should be careful because they affect user access.

## Remote Config Operations

Remote config should support:

- Maintenance mode
- Announcement
- Feature flags
- Minimum version code
- Platform-specific rules

Remote config changes should be audit logged.

## Audit Log Operations

Audit logs should be retained long enough for security and operational review.

Audit logs must not contain sensitive data.

Audit logs should be searchable by admin.

Audit log retention policy may be defined later.

## Data Retention

Data retention should be defined later for:

- Sessions
- Audit logs
- License checks
- Payment records
- Playlist transfer payloads
- Device activity
- Support tickets later

Temporary playlist payload retention must be short.

## Scaling Strategy

MVP should use simple scaling.

Initial scaling options:

- Increase server resources
- Optimize database queries
- Add indexes
- Use Redis caching
- Split web and API services
- Add workers for background jobs

Do not build stream CDN scaling because the platform does not deliver streams.

## Performance Targets

Initial performance goals:

- Fast dashboard loading
- Stable license status endpoint
- Stable device activation endpoint
- Fast app version endpoint
- Fast remote config endpoint
- Efficient admin tables
- Efficient reseller dashboard

License and remote config endpoints may be called frequently by apps, so they should be efficient.

## Database Performance

Database performance should consider:

- Indexes
- Pagination
- Query limits
- Avoiding N+1 queries
- Efficient ownership checks
- Efficient dashboard aggregates

Important indexes should exist for:

- users.email
- subscriptions.user_id
- subscriptions.status
- devices.app_generated_device_id
- reseller_credit_transactions.reseller_id
- payments.user_id
- audit_logs.actor_user_id
- playlist_push_requests.expires_at

## Disaster Recovery

Disaster recovery should cover:

- Database backup restore
- Service restart
- Secret rotation
- Failed deployment rollback
- Payment webhook replay
- Maintenance mode activation
- Incident documentation

## Incident Response

If an operational incident occurs:

1. Identify affected service.
2. Enable maintenance mode if needed.
3. Preserve logs.
4. Stop harmful traffic if needed.
5. Roll back recent deployment if needed.
6. Restore backup only if necessary.
7. Rotate secrets if exposed.
8. Document the incident.
9. Add prevention tasks.

## Local Setup Documentation

docs/local-setup.md should explain:

- Required software
- pnpm install
- Docker Compose startup
- Environment setup
- Prisma migration
- Seed command
- Web app startup
- API startup
- Common errors

## Deployment Documentation

docs/deployment.md should explain:

- Staging deployment
- Production deployment
- Environment variables
- Database migration
- Backup
- Rollback
- Health checks
- Monitoring

## Environment Documentation

docs/environment-variables.md should explain:

- Variable name
- Required or optional
- Used by web or API
- Example placeholder
- Security notes

## MVP DevOps Scope

MVP DevOps should include:

- Local Docker Compose
- PostgreSQL service
- Redis service
- API build
- Web build
- Environment validation
- Prisma migration flow
- Basic health checks
- Basic deployment notes
- Basic backup notes

## Post-MVP DevOps Ideas

Post-MVP DevOps may include:

- Automated CI
- Automated CD
- Staging environment
- Production monitoring
- Alerting
- Log aggregation
- Backup automation
- Blue-green deployment
- Container registry
- Infrastructure as code

Each post-MVP DevOps feature requires approval.

## Forbidden Infrastructure

Do not build infrastructure for:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package delivery
- Playlist marketplace hosting
- Content catalog serving
- Broadcast infrastructure

## Final Rule

DevOps must support the licensed player platform only.

Do not build infrastructure that turns the platform into an IPTV provider, content provider, stream provider, channel seller, or playlist provider.
