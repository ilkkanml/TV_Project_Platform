# 14 - Testing Bible

This file defines the testing strategy, test categories, required checks, product boundary tests, security tests, role tests, reseller tests, payment tests, app integration tests, UI tests, DevOps checks, and release quality rules for TV Project Platform.

Testing must protect the licensed player platform model.

Testing must verify that the platform does not become an IPTV provider, content provider, stream provider, channel seller, playlist provider, or broadcast backend.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Tests must confirm that the platform supports:

- User accounts
- Authentication
- Role-based access control
- Subscriptions
- Player licenses
- Device activation
- Payments
- Resellers
- Reseller credit transactions
- App versions
- Remote config
- Audit logs
- Optional temporary playlist profile transfer

Tests must confirm that the platform does not provide:

- TV channels
- Live streams
- VOD streams
- Stream URLs
- Channel packages
- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Playlist marketplace
- Public playlist search
- Content catalogs
- Broadcast infrastructure
- Backend playlist source of truth

## Testing Goals

The testing strategy should ensure:

- Product boundary is preserved.
- Backend authorization is enforced.
- Role permissions work correctly.
- Ownership checks are reliable.
- Reseller credit operations are transactional.
- Payments are verified before subscription extension.
- Device activation behaves correctly.
- License status is backend-authoritative.
- App version rules work.
- Remote config works.
- Temporary playlist transfer expires.
- Sensitive data is protected.
- UI copy does not imply content access.
- DevOps checks prevent broken releases.

## Testing Principles

All tests should follow these principles:

- Test backend authority.
- Do not trust frontend-only behavior.
- Test security-sensitive flows.
- Test failure paths.
- Test ownership boundaries.
- Test transaction rollback behavior.
- Test idempotency where needed.
- Test product boundary protection.
- Test that sensitive data is not exposed.
- Keep tests clear and maintainable.
- Prefer deterministic tests.
- Avoid depending on external payment providers in unit tests.

## Planned Test Types

The project should eventually include:

- Unit tests
- Integration tests
- API endpoint tests
- Database transaction tests
- Authorization tests
- Ownership tests
- UI component tests
- End-to-end tests
- App integration contract tests
- Security tests
- DevOps checks
- Manual QA checklists

## MVP Testing Scope

MVP tests should focus on:

- Auth
- Roles
- Ownership
- User status
- Plans
- Subscriptions
- Devices
- License status
- Reseller credit
- Manual payments
- App version
- Remote config
- Audit logs
- Product boundary
- Sensitive data protection

## Post-MVP Testing Scope

Post-MVP tests may include:

- Real payment provider webhooks
- Email notifications
- SMS notifications
- Support tickets
- Invoice generation
- PDF receipts
- Referral system
- Affiliate system
- Admin two-factor authentication
- Advanced reseller reporting
- Encrypted cloud playlist sync if approved

Each post-MVP area requires its own test plan.

## Test Stack Direction

The exact test stack may be finalized during implementation.

Recommended testing tools may include:

- Vitest or Jest for TypeScript unit tests
- Supertest for API endpoint tests
- Playwright for web end-to-end tests
- Prisma test database setup
- Docker Compose for local test services
- GitHub Actions for CI checks

Tool selection should match the final implementation.

## Test Environment Rules

Tests should use isolated test data.

Rules:

- Do not use production database.
- Do not use production Redis.
- Do not use production payment credentials.
- Do not use real customer data.
- Do not use real payment data.
- Do not store real playlist credentials in tests.
- Do not depend on external stream or channel providers.
- Do not test content-provider behavior.

## Test Database Rules

The test database should be separate from development and production.

Test database rules:

- Use safe disposable data.
- Reset between test suites when needed.
- Seed only required test records.
- Avoid production secrets.
- Verify migrations where possible.
- Test transaction rollback behavior.
- Test constraints and ownership logic.

## Auth Tests

Auth tests should verify:

- User can register when registration is enabled.
- User can log in with valid credentials.
- User cannot log in with invalid password.
- User cannot log in when disabled.
- User cannot log in when suspended if business rules block access.
- Password is hashed.
- Plain text password is not stored.
- Password hash is not returned by API.
- Access token is issued after login.
- Refresh token is issued when enabled.
- Refresh token can be used to obtain new access token.
- Logout invalidates refresh token where possible.

## Password Tests

Password tests should verify:

- Password hashes are created.
- Plain text passwords are never stored.
- Password hashes are never returned in API responses.
- Password hashes are never exposed in logs.
- Weak password rules work when implemented.
- Password change requires current password when required.
- Password reset flow is secure when added later.

## Token Tests

Token tests should verify:

- Access token expires.
- Refresh token expires.
- Refresh token is hashed where practical.
- Revoked refresh token cannot be reused.
- Invalid token returns unauthorized response.
- Expired token returns unauthorized response.
- Token from disabled user is rejected when status is checked.
- Token is not exposed in logs.

## Role Tests

Role tests should verify:

- Admin can access admin routes.
- Reseller cannot access admin routes.
- Customer cannot access admin routes.
- Customer cannot access reseller routes.
- Reseller can access reseller routes.
- Customer can access customer routes.
- Unauthenticated users cannot access protected routes.
- Frontend route hiding is not treated as backend security.

## Ownership Tests

Ownership tests are mandatory.

Tests should verify:

- Customer can access own profile.
- Customer cannot access another customer profile.
- Customer can access own subscription.
- Customer cannot access another customer subscription.
- Customer can access own devices.
- Customer cannot access another customer device.
- Customer can access own payment history.
- Customer cannot access another customer payment history.
- Reseller can access own customers.
- Reseller cannot access another reseller's customers.
- Reseller can access own customer devices.
- Reseller cannot access another reseller's customer devices.
- Reseller can access own credit transactions.
- Reseller cannot access another reseller's credit transactions.

## User Status Tests

User status tests should verify:

- ACTIVE user can access allowed resources.
- DISABLED user cannot access protected resources.
- SUSPENDED user is restricted according to business rules.
- Disabled admin cannot perform admin actions.
- Disabled reseller cannot perform reseller actions.
- Disabled customer cannot access dashboard where blocked.
- Status changes are audit logged when required.

## Admin Tests

Admin tests should verify:

- Admin can list users.
- Admin can create users.
- Admin can update users.
- Admin can disable users.
- Admin can change user status.
- Admin can manage resellers.
- Admin can manage plans.
- Admin can manage subscriptions.
- Admin can manage manual payments.
- Admin can manage devices.
- Admin can manage app versions.
- Admin can manage remote config.
- Admin can view audit logs.
- Admin actions create audit logs where required.

## Admin Negative Tests

Admin negative tests should verify:

- Admin cannot see plain text passwords.
- Admin API does not return password hashes.
- Admin API does not expose payment card data.
- Admin API does not expose playlist credentials.
- Admin UI does not contain stream source management.
- Admin UI does not contain channel package management.
- Admin UI does not contain content catalog management.
- Admin UI does not contain playlist marketplace management.

## Reseller Tests

Reseller tests should verify:

- Reseller can view own dashboard.
- Reseller can view own customers.
- Reseller can create own customer.
- Reseller-created customer has CUSTOMER role.
- Reseller cannot create admin users.
- Reseller cannot create reseller users unless explicitly approved later.
- Reseller can view own customer subscription.
- Reseller can create subscription for own customer.
- Reseller can extend subscription for own customer.
- Reseller can view own customer devices.
- Reseller can view own credit balance.
- Reseller can view own credit transactions.
- Reseller can view own sales history.

## Reseller Negative Tests

Reseller negative tests should verify:

- Reseller cannot access admin routes.
- Reseller cannot access another reseller's customers.
- Reseller cannot use credit for another reseller's customer.
- Reseller cannot directly set own credit balance.
- Reseller cannot add credit to themselves.
- Reseller cannot modify credit transactions.
- Reseller cannot delete credit transactions.
- Reseller cannot modify global plans.
- Reseller cannot modify payment provider settings.
- Reseller cannot modify app versions.
- Reseller cannot modify remote config.
- Reseller cannot manage channels.
- Reseller cannot manage streams.
- Reseller cannot manage playlist marketplace records.
- Reseller cannot manage content catalogs.

## Reseller Credit Tests

Reseller credit tests are critical.

Tests should verify:

- Admin can add reseller credit.
- Credit add creates transaction.
- Credit add updates balance.
- Credit add is audit logged.
- Reseller can use credit for own customer subscription.
- Credit use creates transaction.
- Credit use updates balance.
- Credit use records balance_before.
- Credit use records balance_after.
- Credit use records related customer.
- Credit use records related subscription.
- Credit use records created_by user.
- Credit use prevents negative balance.
- Credit refund creates transaction.
- Manual adjustment creates transaction.
- Reversal creates transaction.
- Transaction history is not silently deleted.

## Reseller Credit Transaction Tests

Transaction tests should verify:

- Subscription creation and credit deduction happen together.
- Subscription extension and credit deduction happen together.
- If subscription creation fails, credit deduction rolls back.
- If credit transaction creation fails, subscription update rolls back.
- If balance update fails, full operation rolls back.
- Duplicate request does not duplicate credit usage when idempotency is implemented.
- Frontend-provided credit cost is ignored.
- Frontend-provided final balance is ignored.
- Backend calculates plan credit cost.
- Backend calculates balance_before and balance_after.

## Plan Tests

Plan tests should verify:

- Admin can create plan.
- Admin can update plan.
- Admin can disable plan.
- Public plans can be listed.
- Disabled plans cannot be purchased or assigned.
- Backend calculates plan duration.
- Backend calculates plan price.
- Backend calculates device limit.
- Backend calculates reseller credit cost.
- Frontend price value is ignored.
- Frontend duration value is ignored.
- Plan does not represent channel package.
- Plan does not represent stream package.
- Plan does not represent playlist access.
- Plan does not represent content package.

## Subscription Tests

Subscription tests should verify:

- Subscription can be created by admin.
- Subscription can be created by verified payment.
- Subscription can be created by reseller credit.
- Subscription can be extended.
- Subscription can be cancelled.
- Subscription can be suspended.
- Expired subscription denies license access.
- Active subscription allows license access when other checks pass.
- Subscription dates are calculated by backend.
- Subscription status transitions are valid.
- Subscription changes are audit logged.
- Subscription does not include content access.

## Payment Tests

Payment tests should verify:

- Manual payment can be created.
- Manual payment can be approved by admin.
- Manual payment can be rejected by admin.
- Customer cannot approve manual payment.
- Reseller cannot approve manual payment.
- Manual payment approval extends subscription.
- Manual payment rejection does not extend subscription.
- Duplicate approval does not extend subscription twice.
- Payment amount comes from backend plan.
- Frontend price is ignored.
- Frontend duration is ignored.
- Payment status is tracked.
- Payment actions create audit logs.
- Payment records do not contain card data.

## Payment Security Tests

Payment security tests should verify:

- Card number is not stored.
- CVV is not stored.
- Full raw card data is not stored.
- Provider secrets are not returned by API.
- Webhook secrets are not returned by API.
- Payment provider secrets are not logged.
- Frontend payment success page cannot extend subscription directly.
- Payment verification is required before subscription extension.

## Payment Webhook Tests

When payment providers are added, webhook tests should verify:

- Valid signature is accepted.
- Invalid signature is rejected.
- Missing signature is rejected.
- Amount mismatch is rejected.
- Currency mismatch is rejected.
- Unknown provider reference is rejected.
- Failed payment does not extend subscription.
- Cancelled payment does not extend subscription.
- Successful verified payment extends subscription once.
- Duplicate webhook does not duplicate subscription extension.
- Webhook processing is idempotent.
- Webhook secrets are not logged.

## Device Tests

Device tests should verify:

- Device can be activated.
- Device activation uses app_generated_device_id.
- MAC address is not required as primary identity.
- Android ID is treated as secondary signal.
- Device belongs to correct user.
- Device limit is enforced.
- Device metadata is stored safely.
- Device heartbeat updates last_seen_at.
- Blocked device cannot pass license check.
- Unblocked device can pass license check when other rules allow.
- Customer can view own devices.
- Customer cannot view another customer's devices.
- Reseller can view own customer devices.
- Reseller cannot view another reseller's customer devices.

## License Tests

License tests should verify:

- Active user with active subscription and active device is allowed.
- Disabled user is denied.
- Expired subscription is denied.
- Cancelled subscription is denied.
- Suspended subscription is denied.
- Device not activated is denied.
- Blocked device is denied.
- Unsupported app version is denied.
- Force update required is denied or flagged correctly.
- Maintenance mode is denied or flagged correctly according to rules.
- License response includes clear reason.
- License response does not include stream URLs.
- License response does not include channel lists.
- License response does not include playlist marketplace data.
- License response does not include content catalogs.

## App Version Tests

App version tests should verify:

- Admin can create app version record.
- Admin can update app version record.
- Admin can disable app version record.
- App can fetch latest version info.
- App version response includes platform.
- App version response includes version code.
- App version response includes version name.
- App version response includes minimum version code.
- App version response includes force update flag.
- Force update rule works.
- Minimum version rule works.
- App version changes are audit logged.
- App version response does not expose secrets.

## Remote Config Tests

Remote config tests should verify:

- Admin can view remote config.
- Admin can update remote config.
- App can fetch remote config.
- Maintenance mode flag works.
- Maintenance message is returned.
- Announcement message is returned.
- Feature flags are returned.
- Feature flags do not replace backend authorization.
- Remote config changes are audit logged.
- Remote config does not expose secrets.
- Remote config does not expose playlist credentials.

## Playlist Transfer Tests

Optional playlist transfer tests should verify:

- Customer can create transfer for own device.
- Customer cannot create transfer for another user's device.
- Reseller cannot create transfer for unrelated customer device.
- Transfer payload is temporary.
- Transfer payload has expiration time.
- Expired transfer cannot be consumed.
- Consumed transfer cannot be reused when single-use is enabled.
- Transfer can be marked consumed or deleted after pickup.
- Transfer consumption validates device ownership.
- Transfer consumption creates audit log when required.
- Transfer payload is not logged.
- Backend does not become permanent playlist storage.

## Playlist Transfer Security Tests

Playlist transfer security tests should verify:

- Payload is encrypted where stored.
- Payload is user-scoped.
- Payload is device-scoped.
- Payload expires.
- Payload is not returned to wrong device.
- Payload is not returned to wrong user.
- Payload is not visible in admin logs.
- Payload is not visible in audit logs.
- Payload is not stored permanently by default.
- Transfer feature can be disabled by feature flag.
- Feature flag does not replace backend ownership checks.

## Local Playlist App Tests

App-side tests should verify:

- App can create local playlist profile.
- App can edit local playlist profile.
- App can delete local playlist profile.
- App can rename local playlist profile.
- App can select active profile.
- App can switch between profiles.
- Playlist credentials are stored securely.
- Playlist credentials are not logged.
- App does not send local playlist credentials to backend by default.
- App can import optional transferred profile when enabled.
- App can reject expired transfer.

## Audit Log Tests

Audit log tests should verify critical actions are logged.

Actions to test:

- User creation
- User update
- User disable
- Role change
- Reseller creation
- Reseller update
- Reseller disable
- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription creation
- Subscription extension
- Subscription cancellation
- Payment approval
- Payment rejection
- Device block
- Device unblock
- App version change
- Remote config change
- Playlist transfer creation
- Playlist transfer consumption

Audit logs must not contain sensitive data.

## Sensitive Data Tests

Sensitive data tests should verify API responses never expose:

- password_hash
- refresh_token_hash
- full access tokens of other sessions
- full refresh tokens
- payment card data
- CVV
- payment provider secrets
- webhook secrets
- encryption keys
- playlist credentials from backend storage
- database secrets
- internal environment values

## Logging Tests

Logging checks should verify logs do not contain:

- Plain text passwords
- Password hashes
- Payment card data
- Full tokens
- Refresh tokens
- Playlist credentials
- Encryption keys
- Payment provider secrets
- Database passwords
- Raw sensitive provider payloads

## API Response Tests

API response tests should verify:

- Success responses use standard format.
- Error responses use standard format.
- Validation errors are clear.
- Unauthorized errors are returned correctly.
- Forbidden errors are returned correctly.
- Not found errors are returned correctly.
- Sensitive internals are not exposed.
- Production errors do not expose stack traces.
- Request IDs are included where implemented.

## Validation Tests

Validation tests should verify:

- Required fields are enforced.
- Email format is validated.
- String length limits work.
- Enum values are validated.
- Number ranges are validated.
- Date values are validated.
- ID format is validated.
- Pagination limits are enforced.
- Sort fields are allowlisted.
- Invalid status transitions are rejected.
- Invalid ownership-sensitive IDs are rejected.

## Rate Limit Tests

Rate limit tests should verify protection for:

- Login
- Register
- Refresh token
- Password reset later
- Device activation
- License status
- Playlist transfer creation
- Playlist transfer consumption
- Payment webhooks

Rate limits should block abuse without breaking normal app usage.

## Web UI Tests

Web UI tests should verify:

- Public pages render.
- Login page works.
- Register page works.
- Customer dashboard requires authentication.
- Reseller dashboard requires reseller role.
- Admin dashboard requires admin role.
- Unauthorized users are redirected correctly.
- Role-specific navigation is correct.
- API errors show user-friendly messages.
- Loading states work.
- Empty states work.
- Destructive actions require confirmation.

## UI Product Boundary Tests

UI product boundary tests should verify:

- Home page does not imply channels are included.
- Pricing page says software/player access only.
- Checkout page says channels, streams, playlists, and content are not included.
- FAQ clearly states the platform does not provide channels.
- FAQ clearly states the platform does not provide playlists.
- Footer includes product boundary statement.
- No channel package UI exists.
- No stream source management UI exists.
- No content catalog UI exists.
- No playlist marketplace UI exists.
- No public playlist search UI exists.

## Customer UI Tests

Customer UI tests should verify:

- Customer can view own dashboard.
- Customer can view own subscription.
- Customer can view own devices.
- Customer can view own payments.
- Customer cannot view another customer's data.
- Customer sees subscription expiration warning.
- Customer sees device activation state.
- Customer sees license status.
- Customer playlist transfer page is hidden when feature flag is disabled.
- Customer playlist transfer page includes product boundary copy when enabled.

## Reseller UI Tests

Reseller UI tests should verify:

- Reseller can view own dashboard.
- Reseller can view own customers.
- Reseller can create own customer.
- Reseller can view own credit transactions.
- Reseller credit preview is shown before credit use.
- Reseller credit preview is informational only.
- Reseller cannot see another reseller's customers.
- Reseller navigation does not include channel management.
- Reseller navigation does not include stream management.
- Reseller navigation does not include playlist marketplace.

## Admin UI Tests

Admin UI tests should verify:

- Admin can view dashboard.
- Admin can manage users.
- Admin can manage resellers.
- Admin can manage plans.
- Admin can manage subscriptions.
- Admin can manage payments.
- Admin can manage devices.
- Admin can manage app versions.
- Admin can manage remote config.
- Admin can view audit logs.
- Admin credit changes require confirmation.
- Admin device blocking requires confirmation.
- Admin payment approval requires confirmation.
- Admin UI does not include content-provider tools.

## DevOps Tests

DevOps checks should verify:

- pnpm install works.
- TypeScript typecheck passes.
- Web app builds.
- API app builds.
- Shared package builds.
- Docker Compose starts PostgreSQL.
- Docker Compose starts Redis.
- Prisma schema validates.
- Prisma client generates.
- Migrations run locally.
- Seed script works safely.
- Health endpoint works.
- Environment validation catches missing values.
- `.env` is ignored.
- `.env.example` contains placeholders only.

## CI Checks

Future CI should check:

- pnpm install
- pnpm typecheck
- pnpm lint
- pnpm test
- pnpm build
- prisma validate
- migration validation where practical
- dependency audit
- product boundary text checks later
- no committed secrets

CI must not print secrets.

CI must not use production credentials.

## Secret Scanning Checks

Secret scanning should verify no committed values for:

- DATABASE_URL production value
- REDIS_URL production value
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- PAYMENT_WEBHOOK_SECRET
- IYZICO secret values
- PAYTR secret values
- STRIPE secret values
- PLAYLIST_TRANSFER_ENCRYPTION_KEY
- ADMIN_SEED_PASSWORD
- Any real `.env` file

## Documentation Tests

Documentation checks should verify:

- README.md exists.
- PROJECT_STATE.md exists.
- AI_HANDOFF.md exists.
- ROADMAP.md exists.
- SECURITY.md exists.
- LEGAL_SCOPE.md exists.
- project-bible files exist.
- docs/new-chat-start-message.md exists.
- Stable project-bible tree is respected.
- No duplicate nested project-bible folder exists.
- Deprecated Bible filenames are removed or migrated.
- Critical markdown files are not collapsed into one line.

## Repository Tree Tests

Repository tree checks should verify:

- apps/web exists.
- apps/api exists.
- packages/shared exists.
- project-bible exists.
- docs exists.
- infra exists when needed.
- .github exists when needed.
- project-bible/project-bible does not exist.
- docs/docs does not exist.
- apps/apps does not exist.
- packages/packages does not exist.

## Product Boundary Tests

Product boundary tests are mandatory.

Tests should verify no API endpoints exist for:

- /channels
- /streams
- /stream-sources
- /channel-packages
- /playlist-marketplace
- /content-catalog
- /cdn-routes
- /transcoding-jobs
- /broadcast-schedules
- /public-playlists

Tests should verify no database source-of-truth models exist for:

- Channel
- StreamSource
- ChannelPackage
- ContentCatalog
- PlaylistMarketplaceItem
- BroadcastSchedule
- CdnRoute
- TranscodingJob

## Forbidden Feature Tests

Testing must fail or flag if the project adds:

- Stream hosting
- Stream relay
- Stream transcoding
- CDN stream delivery
- Channel selling
- Channel package management
- Playlist marketplace
- Content catalog
- Broadcast infrastructure
- Backend playlist source of truth
- Default cloud playlist credential storage

## Manual QA Checklist

Before each major release, manually verify:

- Public website loads.
- Product boundary statement is visible.
- Login works.
- Customer dashboard works.
- Reseller dashboard works.
- Admin dashboard works.
- Subscription status is correct.
- Device activation works.
- License status works.
- Reseller credit transactions work.
- Manual payment approval works.
- App version endpoint works.
- Remote config endpoint works.
- Audit logs record critical actions.
- Sensitive data is not visible.
- Forbidden channel or stream features are absent.

## Release Test Checklist

Before release, verify:

- Product boundary is preserved.
- Auth tests pass.
- Role tests pass.
- Ownership tests pass.
- Reseller credit tests pass.
- Payment tests pass.
- Device tests pass.
- License tests pass.
- App version tests pass.
- Remote config tests pass.
- Playlist transfer tests pass when enabled.
- UI boundary tests pass.
- DevOps checks pass.
- Documentation is updated.
- No secrets are committed.

## Test Data Rules

Test data may include:

- Fake admin user
- Fake reseller user
- Fake customer user
- Fake plans
- Fake subscriptions
- Fake devices
- Fake payments
- Fake credit transactions
- Fake app versions
- Fake remote config
- Fake temporary playlist transfer payload

Test data must not include:

- Real passwords
- Real payment card data
- Real customer data
- Real playlist credentials
- Real provider credentials
- Real stream URLs
- Real channel lists
- Real content catalogs

## Test Naming Rules

Test names should be clear.

Good examples:

- Admin can approve manual payment.
- Customer cannot access another customer's device.
- Reseller cannot use credit for another reseller's customer.
- Expired subscription denies license access.
- Payment approval extends subscription only once.
- Playlist transfer cannot be consumed after expiration.
- License response does not include stream URLs.

Avoid vague test names.

## Test Reliability Rules

Tests should be:

- Deterministic
- Isolated
- Repeatable
- Fast enough for CI where possible
- Clear when failing
- Independent of external services unless mocked
- Independent of production data

Flaky tests should be fixed, not ignored.

## Mocking Rules

Mocks may be used for:

- Payment providers
- Email providers
- SMS providers
- External storage
- App client requests
- Time-sensitive logic
- Webhook signatures when testing failure paths

Do not mock the core business rules that need real verification.

Critical areas should have integration tests where possible.

## Time-Based Tests

Time-based tests should cover:

- Subscription expiration
- Payment pending expiration later
- Playlist transfer expiration
- Activation code expiration later
- Refresh token expiration
- Audit log timestamps
- License check timestamps

Use controlled test time where possible.

## Idempotency Tests

Idempotency tests should cover:

- Manual payment approval
- Payment webhook processing
- Subscription extension
- Reseller credit use
- Device activation
- Playlist transfer consumption

Duplicate requests must not create duplicate financial or subscription effects.

## Performance Smoke Tests

Basic performance checks may verify:

- Dashboard endpoints respond within acceptable time.
- License status endpoint is efficient.
- Device activation endpoint is efficient.
- Reseller customer list uses pagination.
- Admin lists use pagination.
- Audit logs use pagination.
- Large lists do not load everything at once.

Performance tests must not require stream delivery infrastructure.

## Accessibility Tests

UI accessibility checks should verify:

- Forms have labels.
- Buttons have accessible names.
- Focus states are visible.
- Keyboard navigation works.
- Error messages are associated with fields.
- Color contrast is acceptable.
- Status badges are not color-only.
- Modals trap focus when implemented.

## Browser Tests

Web UI should be tested in common modern browsers.

Suggested browser coverage:

- Chromium
- Firefox
- WebKit where practical

Mobile responsive checks should be included for key public and dashboard pages.

## App Integration Contract Tests

Backend app contract tests should verify:

- POST /device/activate contract
- GET /device/status contract
- PATCH /device/heartbeat contract
- GET /license/status contract
- GET /app/version contract
- GET /remote-config contract
- POST /playlist-push/consume contract when enabled

Responses must remain stable for the app team.

## App Error Code Tests

App-facing error code tests should verify:

- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- USER_DISABLED
- APP_VERSION_UNSUPPORTED
- PLAYLIST_TRANSFER_EXPIRED
- PLAYLIST_TRANSFER_NOT_FOUND

The app should be able to map these to user-friendly messages.

## Security Regression Tests

Security regression tests should be added whenever a security bug is fixed.

Examples:

- Cross-reseller access bug
- Customer ownership bypass
- Payment duplicate processing
- Credit negative balance bug
- Token reuse issue
- Playlist transfer wrong-device access
- Sensitive data leakage

Every fixed security bug should add a test when practical.

## Bug Regression Tests

When a bug is fixed:

1. Reproduce the bug in a failing test when practical.
2. Fix the bug.
3. Confirm the test passes.
4. Keep the test to prevent regression.
5. Update documentation if behavior changed.

## Test Coverage Priorities

Highest priority:

- Auth
- Authorization
- Ownership
- Reseller credit
- Payments
- Subscriptions
- Device activation
- License status
- Sensitive data protection
- Product boundary protection

Medium priority:

- UI rendering
- Dashboard summaries
- Pagination
- Filters
- App version
- Remote config
- Audit logs

Lower priority for MVP:

- Advanced reports
- Notifications
- Invoices
- Referral flows
- Affiliate flows

## Do Not Test As Product Features

Do not create tests that assume:

- Backend returns channel lists.
- Backend returns stream URLs.
- Backend provides playlists.
- Backend hosts content.
- Plans include content packages.
- Resellers sell channel packages.
- Payments buy IPTV content.
- DevOps deploys streaming servers.

These assumptions violate the project boundary.

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

Do not create conflicting alternative testing files.

## Final Rule

Testing must protect the licensed player platform model.

Tests must verify that the platform works for accounts, roles, subscriptions, licenses, devices, payments, resellers, app versions, remote config, audit logs, and optional temporary playlist transfer.

Tests must also verify that the platform does not become a content provider, stream provider, channel seller, playlist marketplace, or broadcast backend.