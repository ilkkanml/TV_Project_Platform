# 14 - Testing Bible

This file defines the testing strategy for TV Project Platform.

Testing must protect the licensed player platform model, security rules, reseller credit system, payment safety, device licensing, and app integration behavior.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

Tests must confirm that the platform does not behave like:

- IPTV provider
- Content provider
- Channel provider
- Stream provider
- Playlist provider
- CDN provider
- Broadcast backend

The system must not include or expose stream-hosting, channel-selling, or content-provider behavior.

## Testing Goals

The testing strategy should verify:

- Authentication works securely.
- Role-based access control works correctly.
- Customers can access only their own data.
- Resellers can access only their own customers.
- Admins can manage system resources.
- Reseller credit operations are transaction-based.
- Payments do not store card data.
- Subscriptions extend only after valid operations.
- Devices activate correctly.
- License checks are backend-authoritative.
- App version and remote config endpoints work.
- Temporary playlist transfer expires and is not permanent storage.
- Sensitive data is not exposed.

## Test Types

The project should use several test types:

- Unit tests
- Integration tests
- API tests
- Database tests
- Role permission tests
- Security tests
- Payment flow tests
- Reseller credit tests
- App integration tests
- End-to-end tests later
- Manual QA checklists

## Unit Tests

Unit tests should verify isolated logic.

Areas for unit tests:

- Password hashing helpers
- Token helpers
- Role helpers
- API response helpers
- Error code helpers
- Plan duration calculation
- Subscription expiration calculation
- License decision logic
- Reseller credit calculation
- Payment status mapping
- App version comparison
- Remote config parsing
- Playlist transfer expiration logic

Unit tests should be fast and deterministic.

## Integration Tests

Integration tests should verify multiple modules working together.

Areas for integration tests:

- Auth with database
- User creation
- Subscription creation
- Device activation
- License status check
- Reseller credit use
- Payment approval
- App version rules
- Remote config rules
- Playlist push creation and consumption
- Audit log creation

Integration tests may use a test database.

## API Tests

API tests should verify HTTP behavior.

API tests should check:

- Status codes
- Response format
- Error format
- Validation errors
- Authentication requirements
- Authorization requirements
- Ownership rules
- Pagination behavior
- Filtering behavior
- Rate limit behavior where practical

## Standard Response Tests

Successful responses should follow the standard response format.

Expected fields:

- success
- code
- message
- data
- meta

Error responses should follow the standard error format.

Expected fields:

- success
- code
- message
- errors
- request_id

## Authentication Tests

Authentication tests should cover:

- Register success
- Register duplicate email failure
- Login success
- Login wrong password failure
- Login disabled user failure
- Refresh token success
- Refresh token invalid failure
- Logout success
- Access protected route without token failure
- Access protected route with invalid token failure
- Password hash is stored instead of plain text

## Authorization Tests

Authorization tests should cover:

- Admin can access admin endpoints.
- Reseller cannot access admin endpoints.
- Customer cannot access admin endpoints.
- Customer cannot access reseller endpoints.
- Reseller cannot access customer-only endpoints unless explicitly allowed by ownership rules.
- Users cannot change their own role.
- Frontend role values are ignored by backend.

Backend authorization is mandatory.

Frontend route protection is not enough.

## Admin Permission Tests

Admin tests should verify that admins can:

- View users
- Create users
- Update users
- Disable users
- Manage resellers
- Add reseller credit
- Manage plans
- Manage subscriptions
- Manage payments
- Manage devices
- Manage app versions
- Manage remote config
- View audit logs

Admin tests should also verify that critical admin actions create audit logs.

## Reseller Permission Tests

Reseller tests should verify that resellers can:

- View own dashboard
- View own customers
- Create own customers
- View own customer subscriptions
- View own customer devices
- Use own credit for own customer subscriptions
- View own credit transactions
- View own sales history

Reseller tests must verify that resellers cannot:

- Access other reseller customers
- Access global users
- Access admin endpoints
- Add credit to themselves
- Modify system plans
- Modify payment provider settings
- Modify app version rules
- Modify remote config

## Customer Permission Tests

Customer tests should verify that customers can:

- View own profile
- View own subscription
- View own devices
- View own payment history
- Create optional playlist transfer for own device

Customer tests must verify that customers cannot:

- Access other customers
- Access admin endpoints
- Access reseller endpoints
- Change own role
- Change own subscription dates directly
- Change payment status
- Modify app version rules
- Modify remote config

## Ownership Tests

Ownership tests are required.

Test cases:

- Customer A cannot access Customer B profile.
- Customer A cannot access Customer B devices.
- Customer A cannot access Customer B payments.
- Reseller A cannot access Reseller B customers.
- Reseller A cannot extend Reseller B customer subscription.
- Reseller A cannot view Reseller B credit transactions.
- Playlist transfer can only target user-owned devices.

Ownership tests must be part of API and integration testing.

## Reseller Credit Tests

Reseller credit tests are critical.

Tests should verify:

- Admin can add credit.
- Credit add creates transaction.
- Credit add updates balance.
- Credit use creates transaction.
- Credit use updates balance.
- Credit use creates or extends subscription.
- Credit use is transactional.
- Credit refund creates transaction.
- Manual adjustment creates transaction.
- Negative balance is prevented.
- Frontend balance value is ignored.
- Frontend credit cost is ignored.
- Transaction records include balance_before and balance_after.

## Reseller Credit Transaction Tests

Credit transaction tests should verify required fields:

- Reseller ID
- Transaction type
- Amount
- Balance before
- Balance after
- Related customer
- Related subscription
- Created by
- IP address
- Note
- Created date

Tests should verify that corrections do not delete old transactions.

Corrections should use adjustment or reversal records.

## Payment Tests

Payment tests should verify:

- Manual payment can be created.
- Manual payment can be approved by admin.
- Manual payment can be rejected by admin.
- Customer cannot approve payment.
- Reseller cannot approve payment.
- Payment approval extends subscription.
- Payment rejection does not extend subscription.
- Payment amount comes from backend plan.
- Frontend price is ignored.
- Card data is not stored.
- Payment actions create audit logs.

## Webhook Tests

When payment providers are added, webhook tests should verify:

- Valid signature is accepted.
- Invalid signature is rejected.
- Amount mismatch is rejected.
- Currency mismatch is rejected.
- Duplicate webhook does not duplicate subscription extension.
- Failed payment does not extend subscription.
- Successful payment extends subscription once.
- Webhook secrets are not logged.

## Subscription Tests

Subscription tests should verify:

- Subscription can be created by admin.
- Subscription can be created by valid reseller credit use.
- Subscription can be extended by approved payment.
- Expired subscription is detected.
- Cancelled subscription denies access.
- Suspended subscription denies access.
- Subscription dates are calculated by backend.
- Frontend duration is ignored.
- Subscription changes create audit logs.

## License Tests

License tests should verify:

- Active subscription allows access.
- Expired subscription denies access.
- Blocked device denies access.
- Non-activated device denies access.
- Disabled user denies access.
- Force update denies access when required.
- Maintenance mode denies access when required.
- Valid device and subscription allow access.
- License status returns clear denial reason.
- License check can create log record.

## Device Activation Tests

Device activation tests should verify:

- app_generated_device_id is accepted.
- MAC address is not required.
- Android ID is treated as secondary signal.
- Device metadata is stored.
- Device ownership is enforced.
- Device limit is enforced.
- Blocked device cannot pass license check.
- Device last_seen can update.
- Device activation creates expected records.

## App Version Tests

App version tests should verify:

- App version endpoint returns active version rules.
- Minimum version code is respected.
- Force update flag is respected.
- Old app version is denied when force update applies.
- Current app version is allowed when valid.
- App version changes create audit logs.
- APK URL is returned when configured.

## Remote Config Tests

Remote config tests should verify:

- Remote config endpoint returns maintenance mode.
- Remote config endpoint returns announcement.
- Remote config endpoint returns feature flags.
- Maintenance mode affects license result.
- Remote config does not expose secrets.
- Remote config does not expose playlist credentials.
- Remote config changes create audit logs.

## Playlist Transfer Tests

Playlist transfer tests should verify:

- Customer can create transfer for own device.
- Customer cannot create transfer for another user's device.
- Payload is temporary.
- Payload has expiration time.
- Expired payload cannot be consumed.
- Consumed payload cannot be reused when single-use is enabled.
- Payload is marked consumed or deleted after pickup.
- Playlist credentials are not logged.
- Backend does not become permanent playlist storage.

## Playlist Boundary Tests

Tests must verify that the system does not expose playlist-provider behavior.

Forbidden behavior tests:

- No public playlist marketplace endpoint.
- No backend-owned channel list endpoint.
- No stream source table required by app integration.
- No permanent playlist authority behavior by default.
- No shared playlist library exposed to users.

## Security Tests

Security tests should verify:

- Password hashes are not returned.
- Refresh token hashes are not returned.
- Access tokens are not logged.
- Playlist credentials are not logged.
- Payment card data is not stored.
- Secrets are not exposed through API.
- Production error responses do not expose stack traces.
- Rate limits protect sensitive endpoints.
- CORS is restricted in production configuration.

## Rate Limit Tests

Rate limit tests should cover:

- Login endpoint
- Register endpoint
- Refresh token endpoint
- Device activation endpoint
- License status endpoint
- Playlist transfer creation endpoint
- Playlist transfer consumption endpoint

Rate limits should prevent abuse without blocking normal app usage.

## Audit Log Tests

Audit log tests should verify that logs are created for:

- User creation
- User update
- User disable
- Role change
- Reseller creation
- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription creation
- Subscription extension
- Payment approval
- Payment rejection
- Device block
- Device unblock
- App version change
- Remote config change
- Playlist transfer creation
- Playlist transfer consumption

Audit logs must not contain sensitive data.

## Data Exposure Tests

Tests should verify that API responses do not expose:

- password_hash
- refresh_token_hash
- payment card data
- payment provider secrets
- encryption keys
- raw playlist credentials
- internal secrets
- full access tokens
- full refresh tokens

## Database Tests

Database tests should verify:

- Unique email constraint
- Valid role values
- Valid status values
- Reseller credit balance cannot become negative
- Credit transactions are created
- Device identity uniqueness where needed
- Playlist transfer expiration works
- Payment status transitions are valid
- Subscription status transitions are valid

## Transaction Tests

Transaction tests should verify rollback behavior.

Critical transaction areas:

- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription extension
- Payment approval
- Payment webhook confirmation
- Device activation
- Playlist transfer consumption

If one step fails, the entire operation should rollback.

## Web UI Tests

Web UI tests should verify:

- Login page works.
- Register page works.
- Role-based dashboard routing works.
- Customer dashboard only shows customer data.
- Reseller dashboard only shows reseller data.
- Admin dashboard requires admin role.
- Forms show validation errors.
- Tables show loading, empty, and error states.
- Critical actions show confirmation dialogs.

## Customer UI Tests

Customer UI tests should verify:

- Customer can view subscription.
- Customer can view devices.
- Customer can view payment history.
- Customer can create playlist transfer for own device.
- Customer cannot access admin pages.
- Customer cannot access reseller pages.

## Reseller UI Tests

Reseller UI tests should verify:

- Reseller can view own dashboard.
- Reseller can view own customers.
- Reseller can create customer.
- Reseller can view credit balance.
- Reseller can view credit transactions.
- Reseller can create or extend own customer subscriptions using credit.
- Reseller cannot access admin pages.

## Admin UI Tests

Admin UI tests should verify:

- Admin can view dashboard.
- Admin can manage users.
- Admin can manage resellers.
- Admin can add reseller credit.
- Admin can manage plans.
- Admin can manage subscriptions.
- Admin can manage payments.
- Admin can manage devices.
- Admin can manage app versions.
- Admin can manage remote config.
- Admin can view audit logs.

## Marketing UI Tests

Public website tests should verify:

- Homepage loads.
- Pricing page loads.
- Download page loads.
- Device selector page loads.
- FAQ page loads.
- Legal pages load.
- Public messaging does not imply included channels.
- Public messaging does not imply included streams.
- Public messaging includes player-only boundary notice.

## App Integration Tests

App integration tests should verify:

- Device activation endpoint works.
- License status endpoint works.
- App version endpoint works.
- Remote config endpoint works.
- Playlist transfer consume endpoint works.
- App receives clear error codes.
- App can detect force update.
- App can detect maintenance mode.
- App can detect subscription expired.
- App can detect device blocked.

## Manual QA Checklist

Before MVP, manually verify:

- Admin login
- Reseller login
- Customer login
- Customer dashboard
- Reseller dashboard
- Admin dashboard
- Plan creation
- Subscription creation
- Device activation
- License status
- App version rules
- Remote config
- Manual payment approval
- Reseller credit add
- Reseller credit use
- Audit logs
- Playlist transfer expiration

## MVP Test Scope

MVP testing must include:

- Auth tests
- Role permission tests
- Ownership tests
- Subscription tests
- License tests
- Device activation tests
- Reseller credit transaction tests
- Manual payment tests
- App version tests
- Remote config tests
- Playlist transfer tests
- Audit log tests
- Basic web UI tests

## Post-MVP Test Scope

Post-MVP testing may include:

- Real payment provider tests
- Webhook replay tests
- Email notification tests
- SMS notification tests
- Support ticket tests
- Invoice tests
- Admin 2FA tests
- Advanced reseller commission tests
- Encrypted cloud sync tests with explicit user consent

Each post-MVP feature requires its own test plan.

## Test Data Rules

Test data must not include:

- Real passwords
- Real payment card data
- Real payment provider secrets
- Real playlist credentials
- Real customer sensitive data

Use fake data only.

## CI Testing

Future CI should run:

- Typecheck
- Lint
- Unit tests
- Integration tests where practical
- Build
- Prisma schema validation
- Dependency audit later

CI must not print secrets.

CI must not expose environment variables.

## Test Naming

Test names should be clear.

Good examples:

- should deny reseller access to another reseller customer
- should prevent negative reseller credit balance
- should not extend subscription for failed payment
- should deny license when device is blocked
- should expire playlist transfer payload
- should not return password_hash in user response

## Regression Tests

Whenever a bug is fixed, add a regression test when practical.

Regression tests should cover:

- The original failure
- The expected correct behavior
- Related edge cases if needed

## Forbidden Test Assumptions

Tests must not assume that backend provides:

- Channel lists
- Stream URLs
- VOD catalogs
- Playlist marketplace entries
- CDN stream routes
- Broadcast schedules
- Provider credentials

## Final Rule

Testing must protect the platform boundary.

The platform must remain a licensed player platform.

Tests should prevent accidental implementation of content-provider, stream-provider, playlist-provider, or channel-selling behavior.
