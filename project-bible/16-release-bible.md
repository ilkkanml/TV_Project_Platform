# 16 - Release Bible

This file defines the release rules, release stages, versioning rules, deployment checks, rollback rules, app release rules, web release rules, API release rules, database migration rules, documentation rules, and production readiness requirements for TV Project Platform.

Releases must protect the licensed player platform model.

A release must never introduce IPTV provider, content provider, stream provider, channel seller, playlist marketplace, CDN stream delivery, broadcast backend, or backend playlist authority behavior.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

A release may include features for:

- User accounts
- Authentication
- Role-based access control
- Customer subscriptions
- Player licenses
- Device activation
- Payments
- Resellers
- Reseller credit transactions
- App versions
- Remote config
- Audit logs
- Optional temporary playlist profile transfer
- Public website
- Admin dashboard
- Reseller dashboard
- Customer dashboard
- App integration

A release must not include features for:

- TV channel delivery
- Live stream delivery
- VOD stream delivery
- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel package sales
- Playlist marketplace
- Public playlist search
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default permanent playlist credential storage

## Release Philosophy

Every release should be:

- Safe
- Reviewable
- Tested
- Documented
- Reversible where possible
- Product-boundary safe
- Security-aware
- Data-safe
- User-impact aware

Do not rush releases that affect:

- Authentication
- Payments
- Reseller credit
- Subscriptions
- Device activation
- License checks
- App version rules
- Remote config
- Database migrations
- Security-sensitive behavior

## Release Types

The project may use these release types:

- Documentation release
- Foundation release
- Web release
- API release
- Database release
- App integration release
- App version release
- Payment release
- Reseller release
- Security release
- Hotfix release
- Production release

Each release type has different risk and review requirements.

## Documentation Release

A documentation release updates files such as:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible files
- docs files

Documentation releases should still be reviewed carefully because documentation is project memory.

Documentation releases must not introduce conflicting product decisions.

## Foundation Release

A foundation release may include:

- Root package configuration
- pnpm workspace setup
- TypeScript configuration
- Docker Compose
- Environment example
- Project structure
- Shared package setup
- Initial app folders
- Initial API folders
- Initial web folders

Foundation releases must preserve the monorepo structure.

Do not create duplicate nested folders such as:

- project-bible/project-bible
- docs/docs
- apps/apps
- packages/packages

## Web Release

A web release may include:

- Public website pages
- Login page
- Register page
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Checkout pages
- Legal pages
- Support pages
- UI components
- Layouts
- Navigation
- API client updates

Web releases must not imply that the platform provides channels, streams, playlists, or content.

Frontend route protection must not replace backend authorization.

## API Release

An API release may include:

- Auth module
- Users module
- Plans module
- Subscriptions module
- Devices module
- Licenses module
- Resellers module
- Payments module
- App versions module
- Remote config module
- Playlist push module
- Audit logs module
- Health module

API releases must enforce backend authorization.

API releases must not add endpoints for channels, streams, content catalogs, stream sources, playlist marketplace, or broadcast infrastructure.

## Database Release

A database release may include:

- Prisma schema updates
- Database migrations
- Index changes
- New models
- New enum values
- Seed updates
- Data cleanup scripts

Database releases require extra care.

Never reset production database.

Never run destructive production migrations without backup and approval.

## App Integration Release

An app integration release may include:

- Device activation endpoints
- Device status endpoint
- Device heartbeat endpoint
- License status endpoint
- App version endpoint
- Remote config endpoint
- Playlist transfer consumption endpoint
- App-facing error codes

App integration releases must not return:

- Channel lists
- Stream URLs
- Playlist marketplace data
- Content catalogs
- Broadcast schedules

## App Version Release

An app version release may include:

- New APK URL
- Version code
- Version name
- Changelog
- Minimum version code
- Force update flag
- Platform target
- Active status

App version releases must be coordinated with the app team.

Force update releases require extra review because they can block users from app access.

## Payment Release

A payment release may include:

- Manual payment records
- Manual payment approval
- Manual payment rejection
- Payment status tracking
- Customer payment history
- Webhook handling
- Payment provider integration
- Refund handling later
- Invoice generation later

Payment releases must not store card data.

Payment releases must not extend subscriptions from frontend-only success pages.

Payment releases must verify payment provider webhooks when providers are enabled.

## Reseller Release

A reseller release may include:

- Reseller dashboard
- Own customer management
- Credit balance display
- Credit transaction history
- Subscription creation using credit
- Subscription extension using credit
- Admin reseller credit add
- Admin reseller credit adjustment

Reseller releases must enforce ownership.

Reseller releases must prevent negative balances.

Reseller credit operations must be transaction-based.

## Security Release

A security release may include:

- Auth fixes
- Token handling fixes
- Authorization fixes
- Ownership fixes
- Rate limit changes
- Sensitive data protection
- Secret rotation
- Logging fixes
- Payment security fixes
- Playlist transfer security fixes

Security releases should be prioritized.

Security releases should include regression tests where practical.

## Hotfix Release

A hotfix release addresses urgent production issues.

Hotfixes may be needed for:

- Login outage
- Payment verification issue
- Subscription extension issue
- Reseller credit issue
- License status issue
- Device activation issue
- App version issue
- Remote config issue
- Security issue
- Production deployment failure

Hotfixes should be small and focused.

Hotfixes should still be tested.

Hotfixes should update CHANGELOG.md and PROJECT_STATE.md when relevant.

## Release Environments

Planned environments:

- Local
- Staging
- Production

Local is for development.

Staging is for release validation.

Production is for real users.

Production releases require the highest level of care.

## Local Release Checks

Before pushing changes, local checks should include:

- Install succeeds
- TypeScript checks pass
- Lint passes when available
- Tests pass when available
- Web builds when relevant
- API builds when relevant
- Prisma schema validates when relevant
- Docker Compose works when relevant
- Documentation line counts are valid when relevant

## Staging Release Checks

Before production release, staging should verify:

- Web app deploys
- API app deploys
- Database migrations run
- Redis connection works
- Auth flow works
- Admin panel works
- Reseller panel works
- Customer panel works
- Device activation works
- License status works
- App version endpoint works
- Remote config endpoint works
- Payment flow works
- Reseller credit flow works
- Audit logs work
- Product boundary is preserved

## Production Release Checks

Before production release, verify:

- Production environment variables are set
- Production secrets are strong
- Database backup exists
- Migration plan is ready
- Rollback plan is ready
- HTTPS works
- CORS is restricted
- Rate limits are enabled
- Security headers are configured
- Error logging is safe
- Audit logs are enabled
- Payment webhooks are verified when enabled
- Monitoring is active
- Support is ready for user impact
- Product boundary remains clear

## Release Branching

The current simple workflow may use:

- main

Future workflow may include:

- main
- develop
- release branches
- hotfix branches
- feature branches

Branching strategy should be finalized before production.

Do not overcomplicate branching during early foundation work.

## Main Branch Rule

The main branch should represent the current approved project state.

Do not push broken foundation files to main intentionally.

Do not leave critical documentation files collapsed into one line.

Do not leave missing project-bible files after the Bible tree is declared stable.

## Commit Rules

Commits should be clear.

Good commit examples:

- Update project rules bible
- Update product bible
- Update API bible
- Add local setup documentation
- Add Docker Compose services
- Add shared role constants
- Add auth module foundation
- Fix reseller credit transaction rollback
- Fix payment approval idempotency

Avoid vague commits such as:

- update
- changes
- fix
- misc

## Versioning Strategy

The platform should use clear versioning.

Possible version areas:

- Web app version
- API version
- App APK version
- Database migration version
- Documentation release state

The Android or Fire TV app should use:

- version_code
- version_name

The web and API may use package versioning later.

## Semantic Versioning Direction

For platform software, semantic versioning may be used later.

Format:

- MAJOR.MINOR.PATCH

Meaning:

- MAJOR: breaking changes
- MINOR: new backward-compatible features
- PATCH: bug fixes and small safe changes

Do not claim strict semantic versioning until release workflow is finalized.

## App Version Rules

The app version system should use:

- platform
- version_code
- version_name
- minimum_version_code
- force_update
- apk_url
- changelog
- active status

App version changes should be audit logged.

Force update must be used carefully.

## API Versioning

API versioning may be added later.

Possible prefix:

- /api/v1

MVP may start without public API versioning if deployment structure is simple.

Before production app integration stabilizes, API versioning should be reviewed.

App-facing endpoints should avoid breaking changes.

## Backward Compatibility

Backward compatibility matters for app-facing APIs.

Avoid breaking changes to:

- POST /device/activate
- GET /device/status
- PATCH /device/heartbeat
- GET /license/status
- GET /app/version
- GET /remote-config
- POST /playlist-push/consume

If breaking changes are required, coordinate app release and backend release.

## Database Migration Rules

Database migrations must be handled carefully.

Rules:

- Review migration before release.
- Commit migration files.
- Back up production database before risky migrations.
- Do not reset production database.
- Avoid destructive migrations unless approved.
- Test migrations in staging first.
- Verify rollback strategy.
- Verify Prisma client generation.

## Destructive Migration Rules

Destructive migrations include:

- Dropping tables
- Dropping columns
- Renaming columns without migration plan
- Changing required fields without defaults
- Deleting production data
- Changing enum values in unsafe ways

Destructive migrations require explicit approval and backup.

## Seed Release Rules

Seed scripts may create:

- Initial admin user
- Default plans
- Default remote config
- Initial app version placeholder

Seed scripts must not include:

- Plain text passwords
- Real customer data
- Real payment data
- Playlist credentials
- Stream sources
- Channel lists
- Content catalogs

Admin seed password must come from environment variables and be hashed.

## Environment Release Rules

Every release must respect environment separation.

Local, staging, and production must have separate:

- Database
- Redis
- JWT secrets
- Payment secrets
- Webhook secrets
- Admin credentials
- API URL
- Web URL
- Storage configuration

Production secrets must not be reused in local or staging.

## Secret Rules

Before release, verify:

- `.env` is not committed.
- `.env.example` contains placeholders only.
- Production secrets are configured in hosting provider.
- JWT secrets are strong.
- Payment secrets are secure.
- Database credentials are secure.
- Redis credentials are secure.
- Playlist transfer encryption key is secure when feature is enabled.

## No Secrets In Client Bundle

Web releases must not expose backend secrets in client bundles.

Only public-safe variables may be exposed to the browser.

Do not expose:

- DATABASE_URL
- REDIS_URL
- JWT secrets
- Payment provider secret keys
- Webhook secrets
- Playlist transfer encryption key
- Admin seed password

## Build Checks

Before release, verify:

- pnpm install works
- pnpm typecheck works
- pnpm lint works when available
- pnpm test works when available
- pnpm build works
- Web build succeeds
- API build succeeds
- Shared package builds or typechecks
- Prisma client generates
- Prisma schema validates

## Test Checks

Before release, tests should cover:

- Authentication
- Authorization
- Ownership
- User status
- Plans
- Subscriptions
- Devices
- License checks
- App versions
- Remote config
- Reseller credit
- Payments
- Audit logs
- Playlist transfer when enabled
- Product boundary
- Sensitive data protection

## Product Boundary Release Checks

Every release should verify:

- No stream-hosting endpoints were added.
- No channel-selling endpoints were added.
- No playlist marketplace endpoints were added.
- No content catalog endpoints were added.
- No stream source database models were added.
- No channel package database models were added.
- No content-provider UI pages were added.
- No marketing copy implies included channels.
- No payment copy implies content access.

## Forbidden Release Additions

Do not release features for:

- Channel list management
- Stream source management
- Channel package builder
- Stream relay
- Stream transcoding
- CDN stream delivery
- Playlist marketplace
- Public playlist search
- Shared playlist library
- Content catalog
- Broadcast schedule
- Backend playlist authority

## Security Release Checklist

Before release, verify:

- Passwords are hashed.
- Password hashes are not returned.
- Tokens are not logged.
- Sensitive data is not logged.
- Admin endpoints require admin role.
- Reseller endpoints require reseller role and ownership.
- Customer endpoints require customer ownership.
- Payment approval is admin-only.
- Webhook signatures are verified when enabled.
- Reseller credit is backend-calculated.
- Device license checks are backend-authoritative.
- Playlist transfer payloads expire when enabled.

## Payment Release Checklist

Before releasing payment changes, verify:

- Card data is not stored.
- CVV is not stored.
- Frontend price is ignored.
- Backend calculates amount.
- Backend calculates subscription result.
- Manual approval is admin-only.
- Manual rejection is admin-only.
- Payment approval extends subscription once.
- Duplicate approval is idempotent.
- Webhook signatures are verified when providers are enabled.
- Failed payment does not extend subscription.
- Audit logs are created.

## Reseller Release Checklist

Before releasing reseller changes, verify:

- Reseller can access own customers.
- Reseller cannot access another reseller's customers.
- Reseller can view own credit transactions.
- Reseller cannot directly change own balance.
- Credit add creates transaction.
- Credit use creates transaction.
- Credit use updates balance.
- Negative balance is prevented.
- Subscription and credit deduction are transactional.
- Frontend credit values are ignored.
- Audit logs are created.

## Device And License Release Checklist

Before releasing device or license changes, verify:

- app_generated_device_id is primary identity.
- MAC address is not required as primary identity.
- Device activation works.
- Device limit is enforced.
- Blocked device is denied.
- Expired subscription is denied.
- Active subscription and active device are allowed.
- Force update rule works.
- Maintenance mode rule works.
- License response does not return streams or channels.

## App Version Release Checklist

Before releasing app version changes, verify:

- APK URL is correct.
- Version code is correct.
- Version name is correct.
- Changelog is correct.
- Minimum version code is correct.
- Force update flag is correct.
- Download page works.
- App version endpoint works.
- App team has been informed.
- Support team has update instructions.

## Remote Config Release Checklist

Before releasing remote config changes, verify:

- Maintenance mode value is correct.
- Maintenance message is clear.
- Announcement is clear.
- Feature flags are correct.
- Minimum version code is correct.
- Remote config does not include secrets.
- Remote config does not include playlist credentials.
- App respects the returned config.
- Admin change is audit logged.

## Playlist Transfer Release Checklist

Before releasing optional playlist transfer, verify:

- Feature flag controls UI visibility.
- Backend ownership checks work.
- Customer can only send to own device.
- Payload is encrypted.
- Payload expires.
- Payload is not logged.
- Payload cannot be consumed by wrong device.
- Payload is deleted or marked consumed after pickup when possible.
- Backend does not become permanent playlist storage.
- Product boundary copy is visible.

## Web Release Checklist

Before releasing web changes, verify:

- Public pages load.
- Login page works.
- Register page works when enabled.
- Customer dashboard works.
- Reseller dashboard works.
- Admin dashboard works.
- Role-based navigation works.
- Forbidden pages do not exist.
- Checkout copy says software/player access only.
- FAQ says channels and playlists are not provided.
- Legal pages are available.
- Sensitive data is not displayed.

## API Release Checklist

Before releasing API changes, verify:

- Health endpoint works.
- Auth endpoints work.
- Role guards work.
- Ownership checks work.
- DTO validation works.
- Standard error format works.
- Rate limits work where enabled.
- Database transactions work.
- Audit logs work.
- App-facing endpoints are stable.
- Sensitive data is not returned.

## Documentation Release Checklist

Before releasing documentation changes, verify:

- README.md is updated when relevant.
- PROJECT_STATE.md is updated when relevant.
- AI_HANDOFF.md is updated when relevant.
- ROADMAP.md is updated when relevant.
- CHANGELOG.md is updated when relevant.
- SECURITY.md is updated when relevant.
- LEGAL_SCOPE.md is updated when relevant.
- project-bible files are updated when relevant.
- docs files are updated when relevant.
- Critical markdown files are not one-line collapsed.

## Raw GitHub Verification

Critical documentation files should be verified after editing.

Recommended command:

```bash
curl -L https://raw.githubusercontent.com/ilkkanml/TV_Project_Platform/main/FILE_PATH | wc -l
```

A long markdown file should not return `1`.

## Project Bible Release Verification

The stable project-bible tree must contain:

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

Do not release with missing project-bible files.

Do not release with duplicate conflicting Bible files.

## Deprecated Bible File Check

Deprecated or conflicting names should not remain active:

- 02-legal-boundaries.md
- 03-playlist-philosophy.md
- 04-architecture-principles.md
- 05-reseller-credit-system.md
- 06-device-activation.md
- 07-payment-subscriptions.md
- 08-remote-config-versioning.md
- 09-security-privacy.md
- 10-ops-and-deployment.md
- 11-ui-product-guidelines.md
- 12-testing-strategy.md

Useful content should be migrated into the stable Bible tree.

## Repository Tree Release Check

Before release, verify repository structure:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- CHANGELOG.md
- SECURITY.md
- LEGAL_SCOPE.md
- .env.example
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- docker-compose.yml
- project-bible
- docs
- apps/web
- apps/api
- packages/shared

Do not release with duplicate nested folders.

## Changelog Rules

CHANGELOG.md should record notable changes.

Changelog entries may include:

- Added
- Changed
- Fixed
- Security
- Documentation
- Deprecated
- Removed

Changelog must not advertise channels, streams, playlists, or content.

## Release Notes Rules

Release notes should be clear and product-safe.

Release notes may mention:

- Account improvements
- Subscription improvements
- Device activation improvements
- License check improvements
- Reseller credit improvements
- Payment improvements
- App version improvements
- Remote config improvements
- Security improvements
- Documentation updates

Release notes must not mention included channels, streams, playlists, or content.

## Release Tags

Release tags may be added later.

Possible tag examples:

- v0.1.0
- v0.2.0
- v1.0.0

Do not create release tags until the release workflow is approved.

Documentation-only releases may not need tags during foundation phase.

## MVP Release Criteria

MVP release requires:

- Product boundary documented
- Legal pages drafted
- Auth implemented
- Roles implemented
- Customer panel implemented
- Reseller panel implemented
- Admin panel implemented
- Plan management implemented
- Subscription management implemented
- Device activation implemented
- License status implemented
- App version endpoint implemented
- Remote config implemented
- Reseller credit transactions implemented
- Manual payments implemented
- Audit logs implemented
- Basic tests implemented
- Deployment checklist completed

## MVP Must Not Include

MVP must not include:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel selling
- Channel package management
- Playlist marketplace
- Public playlist search
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage

## Pre-Production Release Criteria

Before production, verify:

- Production hosting is selected
- HTTPS is configured
- CORS is restricted
- Production secrets are configured
- Database backups are configured
- Restore process is tested
- Monitoring is configured
- Error logging is safe
- Rate limits are enabled
- Security headers are configured
- Payment webhook verification works when enabled
- Support process is ready
- Rollback plan exists
- Legal pages are published

## Production Launch Criteria

Production launch requires:

- Owner approval
- Product boundary approval
- Security review
- Payment review
- Reseller credit review
- Database migration review
- DevOps review
- App integration review
- Support readiness
- Documentation update
- Rollback plan
- Monitoring plan
- Backup verification

Production launch should not happen accidentally.

## Rollback Rules

Every production release should have a rollback plan.

Rollback options may include:

- Revert web deployment
- Revert API deployment
- Restore previous container image
- Disable feature flag
- Revert remote config
- Disable payment provider integration
- Disable playlist transfer feature
- Apply corrective migration
- Restore database backup only when necessary

Database rollback is risky and requires extra care.

## Rollback Checklist

Before rollback, verify:

- What changed
- Which users are affected
- Whether database schema changed
- Whether data was modified
- Whether payment records are involved
- Whether reseller credit records are involved
- Whether subscriptions were extended
- Whether app version rules changed
- Whether remote config can disable the issue

Rollback must not corrupt payment, subscription, or credit history.

## Hotfix Checklist

For hotfixes, verify:

- Issue is understood
- Fix is minimal
- Tests cover the issue where practical
- No unrelated changes are included
- Product boundary is preserved
- Sensitive data is protected
- Deployment plan is clear
- Rollback plan is clear
- CHANGELOG.md is updated when needed
- PROJECT_STATE.md is updated when needed

## Incident Release

An incident release may be needed during active issues.

Incident releases should prioritize:

- Stopping active damage
- Restoring access
- Preventing data corruption
- Protecting payments
- Protecting reseller credit
- Protecting sensitive data
- Preserving audit logs

Do not delete logs needed for investigation.

Do not make unreviewed broad changes during incidents unless absolutely necessary.

## Maintenance Mode During Release

Maintenance mode may be used for risky releases.

Recommended flow:

1. Enable maintenance mode when needed.
2. Deploy API.
3. Run migrations.
4. Deploy web.
5. Verify health.
6. Verify core flows.
7. Disable maintenance mode.
8. Monitor errors.

Maintenance mode should not replace testing.

## Feature Flag Release Strategy

Feature flags can reduce release risk.

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

## Gradual Release Strategy

Gradual rollout may be used later.

Possible gradual release methods:

- Feature flag enablement
- Admin-only preview
- Staging validation
- Limited reseller access
- Limited customer access
- App version staged rollout later

Gradual release strategy is post-MVP unless approved.

## App Release Coordination

App releases require coordination between:

- App team
- Backend team
- Web/admin team
- Support
- DevOps

Before app release, verify:

- Backend endpoints are ready
- App version record exists
- APK URL works
- Download page is updated
- Force update flag is correct
- Support has instructions
- Changelog is ready

## Force Update Release Rules

Force update should be used only when needed.

Reasons may include:

- Security issue
- Breaking API change
- Critical app bug
- Unsupported old app behavior
- Required compatibility change

Before enabling force update:

- Verify latest APK works.
- Verify users can download it.
- Verify support knows what to say.
- Verify rollback path exists.
- Verify remote config and app version endpoint work.

## Payment Provider Release Rules

Real payment provider release requires approval.

Before enabling real provider:

- Provider credentials are configured.
- Webhook endpoint is public over HTTPS.
- Webhook signature verification works.
- Test payments pass.
- Failed payment handling works.
- Duplicate webhook handling works.
- Subscription extension happens once.
- Card data is not stored.
- Provider secrets are not logged.

## Manual Payment Release Rules

Manual payment MVP release requires:

- Admin approval workflow
- Admin rejection workflow
- Customer payment history
- Payment status tracking
- Subscription extension after approval
- Audit logs
- Backend-calculated amount
- Backend-calculated duration
- Idempotency for approval

Manual payments must be described as software/player access payments only.

## Reseller Credit Release Rules

Reseller credit release requires:

- Credit add transaction
- Credit use transaction
- Balance before
- Balance after
- Related customer
- Related subscription
- Created by
- Audit log
- Backend-calculated cost
- Negative balance prevention
- Database transaction behavior

Do not release reseller credit without transaction history.

## Audit Log Release Rules

Audit logs must be active for critical actions.

Critical release areas requiring audit logs:

- User changes
- Role changes
- Reseller changes
- Credit changes
- Subscription changes
- Payment approvals
- Payment rejections
- Device blocking
- Device unblocking
- App version changes
- Remote config changes
- Playlist transfer creation
- Playlist transfer consumption

Audit logs must not contain sensitive data.

## Support Readiness

Before major release, support should know:

- What changed
- Who is affected
- Expected user impact
- Known limitations
- Troubleshooting steps
- Product boundary statement
- Payment status behavior
- Device/license behavior
- App update behavior
- Escalation path

Support must not provide channels, streams, playlists, or content.

## Legal Readiness

Before public release, verify:

- Terms of service exists
- Privacy policy exists
- Refund policy exists
- Acceptable use policy exists
- Product boundary is clear
- Payment scope is clear
- User responsibility is clear
- Playlist local-first behavior is explained
- Support boundary is explained

Legal pages should be reviewed before production.

## Marketing Readiness

Before public marketing release, verify:

- Home page copy is product-safe
- Pricing copy says software/player access only
- Checkout copy says content is not included
- FAQ answers channel and playlist questions
- Download page avoids content promises
- Reseller copy does not imply channel selling
- Plan names do not imply content packages
- SEO does not target content-provider claims

## Release Communication

Release communication may include:

- Changelog update
- Release notes
- Support notice
- Admin notice
- Reseller notice
- Customer notice
- App update notice

Communication must be clear and product-boundary safe.

## Customer Release Notice

Customer-facing release notices may mention:

- Account improvements
- Subscription improvements
- Device activation improvements
- App update availability
- Payment status improvements
- Dashboard improvements
- Security improvements

Customer notices must not imply content availability.

## Reseller Release Notice

Reseller-facing release notices may mention:

- Customer management improvements
- Credit transaction improvements
- Subscription assignment improvements
- Sales history improvements
- Device/license visibility improvements
- Dashboard improvements

Reseller notices must not imply that resellers can sell channels, streams, playlists, or content.

## Admin Release Notice

Admin-facing release notices may mention:

- User management improvements
- Plan management improvements
- Subscription management improvements
- Payment review improvements
- Reseller credit improvements
- App version improvements
- Remote config improvements
- Audit log improvements

Admin notices must not describe content-provider features.

## Release Failure Conditions

A release should be stopped if:

- Product boundary is violated
- Tests fail in critical areas
- Build fails
- Migration is unsafe
- Secrets are exposed
- Payment verification is broken
- Reseller credit transaction logic is broken
- License checks are broken
- Device activation is broken
- Audit logs fail for critical actions
- Production backup is missing before risky migration
- Rollback plan is missing for risky change

## Post-Release Verification

After release, verify:

- Web app loads
- API health is OK
- Database is reachable
- Redis is reachable
- Login works
- Admin panel works
- Reseller panel works
- Customer panel works
- Device activation works
- License status works
- App version endpoint works
- Remote config endpoint works
- Payment flow works when relevant
- Reseller credit flow works when relevant
- Audit logs record actions
- Error rate is normal
- Support has no unexpected spike

## Post-Release Monitoring

Monitor:

- API errors
- Web errors
- Login failures
- Payment failures
- Webhook failures
- Device activation failures
- License denial spike
- App version errors
- Remote config errors
- Database errors
- Redis errors
- Reseller credit errors
- Support reports

Monitoring must not expose sensitive data.

## Post-Release Documentation

After release, update when relevant:

- CHANGELOG.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- README.md
- Relevant project-bible files
- Relevant docs files

Documentation should reflect actual implementation state.

Do not claim features are implemented unless they are actually implemented.

## Release Ownership

Before production, define who can:

- Approve releases
- Deploy web
- Deploy API
- Run migrations
- Change remote config
- Change app versions
- Enable force update
- Approve manual payments
- Add reseller credit
- Rollback deployments
- Handle incidents

Ownership must be clear.

## Release Approval

High-risk releases require approval.

High-risk areas include:

- Auth
- Payments
- Reseller credit
- Subscriptions
- Device activation
- License status
- App versions
- Remote config
- Database migrations
- Security
- Production infrastructure

Documentation-only releases may be lower risk but still need correctness.

## AI Assistant Release Rule

Future AI assistants must not assume implementation status.

Before release-related changes, assistants should read:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

Assistants must not invent completed features.

Assistants must not ignore the player-only product boundary.

## Release Testing Requirements

Release tests should verify:

- Product boundary
- Auth
- Roles
- Ownership
- Reseller credit
- Payments
- Subscriptions
- Devices
- Licenses
- App versions
- Remote config
- Audit logs
- Sensitive data protection
- UI copy
- Documentation consistency
- Deployment health

## Release Documentation Template

Use this template for release notes:

```md
# Release Notes - Version

## Summary

Short summary of the release.

## Added

- Item

## Changed

- Item

## Fixed

- Item

## Security

- Item

## Documentation

- Item

## Migration Notes

- Item

## Rollback Notes

- Item

## Product Boundary

This release preserves the licensed player platform model and does not add channels, streams, playlists, content catalogs, channel packages, or broadcast infrastructure.
```

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

Do not create conflicting alternative release files.

## Final Rule

No release should weaken the licensed player platform boundary.

Release only software/player access features, account features, subscriptions, devices, payments, resellers, app versions, remote config, audit logs, app integration, and optional temporary playlist transfer.

Do not release stream-hosting features.

Do not release channel-selling features.

Do not release content-provider features.

Do not release playlist marketplace features.

Do not make the backend playlist authority.