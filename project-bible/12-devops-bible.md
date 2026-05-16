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
```

Do not mix package managers unless approved.

Avoid committing package-lock.json or yarn.lock when pnpm is the selected package manager.

## Local Run Commands

Typical local commands may include:

```bash
pnpm docker:up
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Exact commands should be documented in docs/local-setup.md.

## Build Rules

Build process should verify:

- Web app builds successfully.
- API app builds successfully.
- Shared package builds successfully.
- TypeScript checks pass.
- Environment assumptions are documented.
- Prisma client is generated.
- No secrets are embedded into client bundles.

## TypeScript Rules

TypeScript should be used across:

- Web app
- API app
- Shared package
- Tooling where practical

Rules:

- Avoid `any` unless justified.
- Shared enums should live in packages/shared.
- API DTOs should be typed.
- Web API client responses should be typed.
- Build should fail on serious type errors.

## Prisma DevOps Rules

Prisma must be managed carefully.

Rules:

- Prisma schema changes must be reviewed.
- Migrations must be committed.
- Prisma client must be generated after schema changes.
- Production migrations must be planned.
- Do not reset production database.
- Do not run destructive production migrations without backup.
- Seed scripts must not include real secrets.

## Database Migration Flow

Recommended migration flow:

1. Update Prisma schema.
2. Generate migration locally.
3. Review migration SQL.
4. Run migration locally.
5. Run tests.
6. Commit schema and migration files.
7. Apply migration in staging.
8. Verify staging.
9. Apply migration in production during deployment window.

Production migration must be done carefully.

## Seed Data Rules

Seed data may include:

- Initial admin user
- Default plans
- Default remote config
- Initial app version placeholder

Seed data must not include:

- Real customer data
- Real payment data
- Plain text passwords
- Playlist credentials
- Stream sources
- Channel lists
- Content catalogs

Admin seed password must come from environment variable.

Seed password must be hashed.

## CI/CD Goals

CI/CD should eventually verify:

- Install succeeds
- TypeScript typecheck succeeds
- Lint succeeds
- Tests pass
- Web build succeeds
- API build succeeds
- Prisma schema validates
- Docker build works where applicable
- Security checks pass
- No forbidden files are committed

CI/CD should not deploy broken code.

## GitHub Actions

Future GitHub Actions workflows may include:

- CI workflow
- Test workflow
- Build workflow
- Deploy staging workflow
- Deploy production workflow
- Dependency audit workflow

Workflow files may live under:

- .github/workflows

GitHub Actions must not print secrets.

## CI Required Checks

Before merging to main, CI should eventually check:

- pnpm install
- pnpm typecheck
- pnpm lint
- pnpm test
- pnpm build
- prisma validate
- forbidden content boundary checks later

The project may start without full CI during foundation phase, but CI should be added before production.

## Deployment Environments

Planned environments:

- Local
- Staging
- Production

Local is for development.

Staging is for testing deployment, migrations, payment callbacks, app version rules, and remote config.

Production is for real users.

## Environment Separation

Each environment must have separate:

- Database
- Redis instance
- JWT secrets
- Payment provider credentials
- Webhook secrets
- Admin seed credentials
- API URL
- Web URL
- Storage configuration
- Logging configuration

Production secrets must not be shared with local or staging.

## Staging Environment

Staging should be used to verify:

- Web deployment
- API deployment
- Database migrations
- Redis connection
- Auth flow
- Admin panel
- Reseller panel
- Customer panel
- Payment flow
- Device activation
- License status
- App version endpoint
- Remote config endpoint
- Playlist transfer expiration

Staging must not use real payment credentials unless explicitly configured as provider test mode.

## Production Environment

Production should be stable, monitored, and backed up.

Production must have:

- HTTPS
- Secure secrets
- Restricted CORS
- Database backups
- Error logging
- Audit logs
- Rate limits
- Safe deployment process
- Rollback plan
- Monitoring or alerts

Production must not use default development secrets.

## Hosting Strategy

Hosting provider is not finalized yet.

Possible hosting options may include:

- VPS
- Docker-based deployment
- Managed platform
- Cloud provider
- Managed PostgreSQL
- Managed Redis

Provider selection requires approval before production.

## API Deployment

API deployment must include:

- Node.js runtime
- Environment variables
- Database access
- Redis access
- Prisma migration strategy
- Health endpoint
- Logging
- HTTPS through proxy or platform
- Restart policy

API must not expose internal ports publicly unless intended.

## Web Deployment

Web deployment must include:

- Next.js build
- Public environment variables
- API base URL
- Static asset handling
- HTTPS
- Cache rules when needed

Web client must not include backend secrets.

Only public-safe variables may be exposed to the browser.

## Reverse Proxy

A reverse proxy may be used.

Possible options:

- Nginx
- Caddy
- Cloud provider proxy
- Platform-managed routing

Reverse proxy may handle:

- HTTPS termination
- Routing
- Compression
- Request size limits
- Security headers
- Static file serving where appropriate

Reverse proxy must not be used for stream relay.

## HTTPS Rules

Production must use HTTPS.

Rules:

- Redirect HTTP to HTTPS.
- Do not send tokens over HTTP.
- Payment webhooks must use HTTPS.
- App API calls must use HTTPS.
- Web dashboard must use HTTPS.

TLS certificates should be managed by hosting provider, reverse proxy, or certificate automation.

## CORS Rules

CORS must be restricted in production.

Allowed origins should include only approved web app domains.

Do not use wildcard CORS in production.

Local development may allow local origins.

CORS configuration should be environment-specific.

## Security Headers

Production should use security headers.

Recommended areas:

- Content Security Policy where practical
- X-Frame-Options or frame-ancestors
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

Security headers should be tested before production.

## Rate Limiting Infrastructure

Rate limiting may use Redis.

Endpoints needing rate limits:

- Login
- Register
- Refresh token
- Device activation
- License status
- Playlist transfer creation
- Playlist transfer consumption
- Payment webhooks

Rate limits should protect abuse while not breaking normal app usage.

## Logging

Logging should be structured and safe.

Logs may include:

- Request ID
- Timestamp
- Environment
- Service name
- User ID when authenticated
- Role
- Endpoint
- Status code
- Error code
- IP address where appropriate
- User agent where appropriate

Logs must not include:

- Plain text passwords
- Password hashes
- Payment card data
- Full tokens
- Refresh tokens
- Playlist credentials
- Encryption keys
- Payment provider secrets
- Database passwords

## Error Tracking

Error tracking may be added later.

Error tracking should capture:

- Error message
- Error code
- Stack trace in safe environments
- Request ID
- Service
- Environment
- App version
- User ID when safe

Error tracking must not capture sensitive data.

## Monitoring

Monitoring should track:

- API health
- Web availability
- Database connectivity
- Redis connectivity
- Error rates
- Request latency
- Payment webhook failures
- Device activation failures
- License status failures
- Queue failures later
- Disk usage
- Memory usage
- CPU usage

Monitoring should not track or expose playlist credentials.

## Health Checks

Health endpoints may include:

- GET /health
- GET /health/db
- GET /health/redis

Public health endpoints should expose minimal information.

Detailed health checks may require admin access or internal network access.

Health responses must not expose secrets.

## Alerts

Production alerts should eventually cover:

- API down
- Web down
- Database down
- Redis down
- High error rate
- Failed migrations
- Payment webhook failures
- High login failure rate
- Disk usage high
- Backup failure

Alerts should be sent to approved operators.

## Backups

Production database backups are mandatory before production launch.

Backup rules:

- Back up PostgreSQL.
- Store backups securely.
- Restrict backup access.
- Encrypt backups where possible.
- Test restore process.
- Define backup retention.
- Do not expose backups publicly.

Backups must not contain card data because card data must never be stored.

## Backup Retention

Backup retention should be defined before production.

Possible retention example:

- Daily backups for 7 days
- Weekly backups for 4 weeks
- Monthly backups for 3 months

Final retention depends on hosting and business requirements.

## Restore Process

A restore process must be documented before production.

Restore documentation should include:

- Backup location
- Required credentials
- Restore command
- Verification steps
- Rollback steps
- Data loss warning
- Responsible person

A backup is not reliable until restore has been tested.

## Database Security

Database security rules:

- Use strong passwords.
- Restrict network access.
- Do not expose database publicly unless protected.
- Use managed private networking when available.
- Use separate production database.
- Run migrations carefully.
- Back up before destructive operations.
- Do not store card data.
- Do not store plain text passwords.
- Do not store permanent playlist credentials by default.

## Redis Security

Redis security rules:

- Use strong authentication when available.
- Restrict network access.
- Do not expose Redis publicly.
- Use separate production Redis.
- Avoid storing sensitive permanent data.
- Use TTL for temporary data.
- Do not store playlist credentials permanently in Redis.

## File Storage

File storage may be needed for:

- APK files
- Public downloads
- Invoice PDFs later
- Payment proof uploads later
- Support attachments later

File storage must not be used for:

- Stream hosting
- Channel delivery
- VOD hosting
- Playlist marketplace hosting
- Content distribution

## APK Storage

APK storage should support:

- Approved APK download URL
- Versioned releases
- Safe file naming
- Access control if needed
- Admin-managed app version records

APK storage must not be mixed with media streaming infrastructure.

App versions should reference APK URL through AppVersion records.

## Uploaded Files

Future uploaded files may include:

- Payment proof image
- Support attachment
- Invoice PDF
- App release asset

Rules:

- Validate file type.
- Limit file size.
- Scan files where practical.
- Store safely.
- Avoid public exposure unless intended.
- Do not allow uploaded files to become stream hosting.

## Background Jobs

Background jobs may be added later.

Possible jobs:

- Expire playlist transfer payloads
- Expire pending payments
- Send email notifications
- Send subscription expiration notices
- Clean old sessions
- Process webhooks
- Generate reports
- Generate invoices later

Background jobs must not process stream transcoding or content delivery.

## Queue System

A queue may be added later.

Possible queue uses:

- Email sending
- Webhook retry
- Report generation
- Cleanup tasks
- Notification delivery

Queue must not be used for:

- Stream transcoding
- Stream relay
- Content packaging
- Channel processing

## Temporary Playlist Transfer Expiry

Temporary playlist transfer payloads must expire.

DevOps should support cleanup through:

- Database expiry queries
- Scheduled jobs
- Redis TTL when appropriate
- Background worker later

Expired payloads should be deleted or marked expired.

Consumed payloads should be deleted or marked consumed when possible.

## Scheduled Jobs

Scheduled jobs may include:

- Expire playlist transfer requests
- Clean expired sessions
- Mark expired subscriptions
- Send expiration notices later
- Clean old license check logs later
- Payment pending expiration later

Scheduled jobs must be documented.

## Deployment Checklist

Before deployment, verify:

- Environment variables are set.
- Database is reachable.
- Redis is reachable.
- Prisma migrations are ready.
- Web build passes.
- API build passes.
- Secrets are production-safe.
- CORS is configured.
- HTTPS is configured.
- Health endpoint works.
- Logs are safe.
- Backups are enabled for production.
- No forbidden stream/content infrastructure is deployed.

## Production Preflight Checklist

Before production launch, verify:

- Product boundary pages are published.
- Terms, privacy, refund policy, and acceptable use pages exist.
- Admin account is secure.
- Default passwords are removed.
- JWT secrets are strong.
- Payment secrets are set only when payment provider is enabled.
- Webhook signatures are verified.
- Rate limits are enabled.
- Audit logs are enabled.
- Database backups are working.
- Restore process is tested.
- Monitoring is active.
- Error logging is safe.
- `.env` is not committed.

## Rollback Strategy

Every production deployment needs rollback thinking.

Rollback may include:

- Revert application deployment
- Restore previous container image
- Revert web build
- Disable feature flag
- Restore database backup only when necessary
- Apply corrective migration only when safe

Database rollback is risky.

Destructive migrations require extra approval.

## Feature Flags

Feature flags can reduce deployment risk.

Feature flags may control:

- web_playlist_push_enabled
- reseller_enabled
- manual_payment_enabled
- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- maintenance_mode

Feature flags must not replace backend authorization.

Feature flags must not expose secrets.

## Maintenance Mode

Maintenance mode should be controlled through remote config.

Maintenance mode may affect:

- App access
- Customer dashboard
- Reseller dashboard
- Payment flow
- Device activation

Admin access may remain available when needed.

Maintenance messages should be user-friendly.

## Deployment With Maintenance Mode

For risky deployments:

1. Enable maintenance mode when needed.
2. Deploy API.
3. Run migrations.
4. Deploy web.
5. Verify health.
6. Verify core flows.
7. Disable maintenance mode.
8. Monitor errors.

Maintenance mode should not be used as a substitute for proper rollback planning.

## App Version Operations

DevOps should support app version management.

App version release may include:

- APK upload
- APK URL update
- Version code
- Version name
- Changelog
- Minimum version code
- Force update flag
- Active status

App version changes should be audit logged.

## Force Update Operations

Force update should be used carefully.

Before enabling force update:

- Verify APK download works.
- Verify app version endpoint works.
- Verify update instructions are correct.
- Verify support is ready.
- Verify rollback path exists.

Force update can block users from app access, so it must be controlled.

## Payment Webhook Operations

Payment webhooks require reliable deployment.

Webhook operations should verify:

- Public HTTPS endpoint works.
- Provider signature verification works.
- Webhook secret is set.
- Idempotency works.
- Payment status mapping works.
- Subscription extension works only after verified success.
- Errors are logged safely.

Webhook secrets must not be exposed.

## Domain And DNS

Production may require domains for:

- Web app
- API app
- App download
- Support
- Admin panel if separated

DNS changes should be planned.

HTTPS certificates should be ready before launch.

## CDN Rules

A CDN may be used for static assets or APK downloads when approved.

A CDN must not be used for:

- Live TV streams
- VOD streams
- Channel delivery
- Stream relay
- Broadcast delivery
- Playlist marketplace delivery

Static asset CDN is allowed.

Stream CDN is forbidden.

## Infrastructure As Code

Infrastructure as code may be added later.

Possible tools:

- Docker Compose
- Terraform
- Pulumi
- Ansible
- Provider-specific configuration

Infrastructure as code must not define stream hosting, transcoding, or broadcast services.

## Docker Rules

Docker may be used for:

- Local development
- API container
- Web container
- Postgres local service
- Redis local service
- Production deployment if selected

Docker images should:

- Use production-safe builds.
- Avoid embedding secrets.
- Use non-root users where practical.
- Keep image size reasonable.
- Expose only required ports.

## Container Secrets

Do not bake secrets into Docker images.

Secrets should be passed through:

- Environment variables
- Secret manager
- Hosting provider secret configuration

Never commit real `.env` files.

Never print secrets during build.

## Ports

Local ports may include:

- Web: 3000
- API: 3001
- PostgreSQL: 5432
- Redis: 6379

Production ports should be behind HTTPS proxy or hosting routing.

Database and Redis ports should not be publicly exposed.

## Logs Retention

Log retention should be defined before production.

Logs help with:

- Debugging
- Security review
- Audit support
- Payment investigation
- Device activation issues

Logs must not contain sensitive data.

Long-term sensitive logs should be avoided.

## Audit Log Retention

Audit logs are separate from technical logs.

Audit logs should retain critical business events.

Audit logs may need longer retention than technical logs.

Audit logs must not contain sensitive payloads.

Audit logs should support admin review.

## License Check Log Retention

License check logs may grow quickly.

Retention should be defined.

Possible strategy:

- Keep detailed logs for short period.
- Keep aggregated metrics longer.
- Clean old logs through scheduled job.

License check logs must not contain playlist credentials.

## Performance Goals

Performance goals:

- Fast dashboard loads
- Stable API latency
- Reliable device activation
- Reliable license checks
- Reliable payment processing
- Efficient database queries
- Pagination for large lists
- Indexed high-traffic queries

Performance work must not introduce content-delivery infrastructure.

## Database Indexing

Database indexes should support:

- User lookup by email
- User lookup by reseller
- Subscription status and end date
- Device lookup by app_generated_device_id
- Payment lookup by provider reference
- Reseller credit transaction lookup
- Audit log filtering
- Playlist transfer expiry lookup
- License check lookup

Indexes should be reviewed with query patterns.

## Scaling Strategy

Initial scaling should focus on platform operations.

Scaling areas:

- API instances
- Web hosting
- Database performance
- Redis cache
- Background jobs
- Queue workers later

Do not scale for stream delivery because the platform does not deliver streams.

## Horizontal Scaling

If API is horizontally scaled:

- Use shared database.
- Use shared Redis.
- Avoid local-only sessions.
- Use stateless API design where possible.
- Ensure scheduled jobs do not duplicate unsafe work.
- Ensure payment webhook idempotency.
- Ensure reseller credit operations are transactional.

## Caching

Caching may be used for:

- Remote config
- App version response
- Public pricing data
- Auth rate limiting
- Session support
- Temporary state

Do not cache sensitive playlist credentials outside approved encrypted temporary transfer behavior.

Do not cache payment secrets.

## Public Assets

Public assets may include:

- Website images
- Logos
- App screenshots
- APK files when approved
- Documentation assets

Public assets must not include:

- Secrets
- Real user data
- Payment data
- Playlist credentials
- Channel logos used as content promise
- Stream URLs

## Domain-Level Product Boundary

Production domains should not imply IPTV content provision.

Avoid domain names or subdomains that suggest:

- channels
- streams
- playlist provider
- content package
- live TV package

Domain naming should support software/player platform positioning.

## Access Control For Operations

Production access should be limited.

Access may be needed for:

- Admin operators
- Developers
- DevOps operators
- Support staff later

Rules:

- Use least privilege.
- Remove unused accounts.
- Rotate credentials when staff changes.
- Do not share production passwords.
- Use audit logs where possible.

## Admin Account Operations

Admin accounts should be protected.

Rules:

- Use strong passwords.
- Disable unused admin accounts.
- Avoid shared admin accounts.
- Use two-factor authentication later.
- Audit admin actions.
- Review admin list regularly.

## Incident Response

If an incident occurs:

1. Identify affected systems.
2. Stop active damage.
3. Preserve logs.
4. Rotate exposed secrets.
5. Disable affected features if needed.
6. Patch issue.
7. Deploy fix.
8. Verify recovery.
9. Document incident.
10. Add tests or monitoring to prevent recurrence.

## Secret Rotation

Secrets should be rotated when:

- A secret is exposed.
- A team member with access leaves.
- Production environment is compromised.
- Provider recommends rotation.
- Regular security policy requires it.

Secrets include:

- JWT secrets
- Database password
- Redis password
- Payment provider secrets
- Webhook secrets
- Playlist transfer encryption key
- Admin seed password

## Disaster Recovery

Disaster recovery planning should include:

- Database backup
- Backup restore process
- Application redeployment
- DNS recovery
- Secret recovery
- App version recovery
- Remote config recovery
- Payment webhook recovery

Disaster recovery must be documented before production.

## Documentation Requirements

DevOps documentation should include:

- Local setup
- Environment variables
- Development workflow
- Deployment guide
- Backup and restore guide
- CI/CD guide later
- Monitoring guide later
- Incident response guide later

Relevant docs:

- docs/local-setup.md
- docs/environment-variables.md
- docs/deployment.md
- docs/development-workflow.md

## Operational Ownership

Before production, define who can:

- Deploy web
- Deploy API
- Run migrations
- Restore backups
- Rotate secrets
- Change remote config
- Change app versions
- Approve manual payments
- Add reseller credit
- Handle incidents

Ownership must be clear.

## MVP DevOps Scope

MVP DevOps should include:

- Working monorepo scripts
- Local Docker Compose
- PostgreSQL local service
- Redis local service
- Environment example
- API local run
- Web local run
- Prisma migration flow
- Seed flow
- Basic health endpoint
- Basic deployment notes
- Safe documentation
- No committed secrets

## Pre-Production DevOps Scope

Before production, add:

- CI checks
- HTTPS
- Restricted CORS
- Production environment variables
- Production database
- Production Redis
- Database backups
- Restore test
- Error logging
- Monitoring
- Rate limits
- Security headers
- Deployment checklist
- Rollback plan

## Post-MVP DevOps Scope

Post-MVP DevOps may include:

- Full CI/CD
- Blue-green deployment
- Automated backups
- Advanced monitoring
- Alerting
- Log aggregation
- Queue workers
- Background job dashboard
- Secret manager
- Infrastructure as code
- Staging preview deployments
- Automated dependency updates

Each major DevOps expansion requires approval.

## Forbidden DevOps Work

Do not build infrastructure for:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package delivery
- VOD hosting
- Broadcast scheduling
- Playlist marketplace hosting
- Public playlist delivery
- Content catalog distribution

## DevOps Testing Requirements

DevOps checks should verify:

- pnpm install works.
- Web app builds.
- API app builds.
- TypeScript checks pass.
- Prisma client generates.
- Docker Compose starts PostgreSQL.
- Docker Compose starts Redis.
- API connects to database.
- API connects to Redis.
- Health endpoint works.
- Environment validation catches missing secrets.
- `.env` is ignored.
- No production secrets are committed.
- No forbidden stream/content services exist.

## Stable Project Bible Link

This file is part of the stable project-bible tree:

- 00-project-rules.md
- 01-product-bible.md
- 02-user-roles.md
- 03-feature-list.md
- 04-database-bible.md
- 05-api-bible.md
- 06-security-bible.md
- 07-payment-bible.md
- 08-reseller-bible.md
- 09-ui-ux-bible.md
- 10-app-integration.md
- 11-marketing-bible.md
- 12-devops-bible.md
- 13-decision-log.md
- 14-testing-bible.md
- 15-support-bible.md
- 16-release-bible.md

Do not rename this file without approval.

Do not create conflicting alternative DevOps files.

## Final Rule

DevOps must support the licensed player platform only.

Build infrastructure for web, API, database, Redis, payments, devices, licenses, resellers, app versions, remote config, audit logs, backups, monitoring, and safe deployment.

Do not build infrastructure for stream hosting, channel delivery, playlist marketplace hosting, content distribution, transcoding, CDN stream relay, or broadcast operations.
