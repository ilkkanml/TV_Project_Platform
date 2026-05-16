# 06 - Security Bible

This file defines the security architecture, security rules, sensitive data rules, authentication rules, authorization rules, payment security rules, reseller security rules, device security rules, and app integration security rules for TV Project Platform.

Security is mandatory across the API, web app, database, reseller system, payment system, app integration, deployment, support process, and optional playlist transfer bridge.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The platform is not:

- IPTV provider
- Content provider
- Channel provider
- Stream provider
- Playlist provider
- CDN provider
- Broadcast backend

Security must protect the player-only product boundary.

The backend must never provide, host, relay, transcode, package, sell, or distribute TV streams.

The backend must never become the source of truth for playlist data.

## Core Security Rules

The platform must follow these rules:

- Never store plain text passwords.
- Never store payment card data.
- Never trust frontend-provided prices.
- Never trust frontend-provided credit values.
- Never trust frontend-provided roles.
- Never trust frontend-provided permissions.
- Always validate input.
- Always enforce backend authorization.
- Always check resource ownership.
- Always audit critical admin actions.
- Always audit reseller credit operations.
- Always verify payment webhooks.
- Always make license checks backend-authoritative.
- Always expire temporary playlist transfer payloads.
- Always avoid logging sensitive data.

## Authentication Security

Authentication must be secure by default.

Required rules:

- Passwords must be hashed.
- Plain text passwords must never be stored.
- Password hashes must never be returned by the API.
- Password hashes must never be logged.
- Login must be rate limited.
- Register must be rate limited.
- Refresh token endpoints must be protected.
- Logout must invalidate refresh tokens where possible.
- Disabled users must not access protected resources.
- Suspended users should be restricted according to business rules.

Recommended password hashing:

- Argon2
- bcrypt

Access tokens should be short-lived.

Refresh tokens should be stored as hashes where practical.

Refresh token rotation should be considered.

## Token Security

Token rules:

- Do not log access tokens.
- Do not log refresh tokens.
- Do not expose tokens in error messages.
- Do not store refresh tokens in plain text.
- Use separate secrets for access and refresh tokens.
- Use strong secrets in production.
- Rotate secrets if exposed.
- Invalidate refresh tokens on logout.
- Invalidate refresh tokens when suspicious activity is detected where possible.

## Authorization Security

The platform has three main roles:

- Admin
- Reseller
- Customer

Backend authorization is mandatory.

Frontend route protection is not enough.

Every protected endpoint must check:

- Authentication
- Role
- Resource ownership
- Resource status
- Action permission

Role checks alone are not enough for reseller and customer data.

Ownership checks are required.

## Admin Security

Admin users have powerful access.

Admin actions must be protected and audited.

Critical admin actions include:

- Creating users
- Updating users
- Disabling users
- Changing roles
- Creating resellers
- Updating resellers
- Disabling resellers
- Adding reseller credit
- Adjusting reseller credit
- Creating plans
- Updating plans
- Changing subscriptions
- Approving manual payments
- Rejecting manual payments
- Blocking devices
- Unblocking devices
- Changing app version rules
- Changing remote config
- Changing system settings

Admin security should include:

- Strong passwords
- Rate-limited login
- Session tracking
- IP logging
- User agent logging
- Audit logs
- Optional two-factor authentication later

## Reseller Security

Resellers must only access their own customers and related records.

Reseller users must not access:

- Other reseller customers
- Global user lists
- Admin settings
- Payment provider settings
- App version settings
- Remote config settings
- Full audit logs
- Stream sources
- Channel packages
- Playlist marketplace records
- Content catalogs

Reseller credit operations must be transaction-based.

A simple balance field is not enough.

Every reseller credit operation must create a transaction record.

Credit operations must be calculated by the backend.

Frontend credit values must not be trusted.

Credit operations must use database transactions.

Negative balances must be prevented.

## Customer Security

Customers must only access their own data.

Customer users may access:

- Own account
- Own subscription
- Own devices
- Own payment history
- Own temporary playlist transfer requests

Customer users must not access:

- Admin resources
- Reseller resources
- Other customer accounts
- Other customer devices
- Other customer payment history
- System settings
- Audit logs
- Payment provider settings
- App version settings
- Remote config settings

## Ownership Security

Ownership checks are mandatory.

Required ownership checks:

- Customer can access only own profile.
- Customer can access only own subscription.
- Customer can access only own devices.
- Customer can access only own payments.
- Customer can create playlist transfer only for own device.
- Reseller can access only own customers.
- Reseller can access only own customer subscriptions.
- Reseller can access only own customer devices.
- Reseller can access only own credit transactions.
- Reseller can use credit only for own customers.

## Device Security

Device identity must be handled carefully.

MAC address must not be the primary device identifier.

Primary device identity:

- app_generated_device_id

Secondary device signals:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

Device activation must validate:

- Authenticated user or valid activation flow
- User status
- Device ownership
- Plan device limit
- Subscription status
- Device block status

Blocked devices must not pass license checks.

The app must not be the final authority for license validity.

The backend is the license authority.

## License Security

License status must be backend-authoritative.

License checks should consider:

- User status
- Subscription status
- Device activation status
- Device block status
- App version rules
- Maintenance mode
- Remote config rules

Possible denial reasons:

- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- USER_DISABLED
- APP_VERSION_UNSUPPORTED

License checks may be logged for debugging and abuse detection.

License logs must not contain playlist credentials.

License responses must not contain stream URLs, channel lists, playlist marketplace data, or content catalogs.

## Playlist Security

The backend is not playlist source of truth.

Playlist credentials are entered inside the app by default.

Playlist credentials must be stored locally on the device.

Playlist credentials must use encrypted local storage.

The backend should not permanently store playlist credentials by default.

The optional web-to-device playlist transfer bridge must be:

- Temporary
- Encrypted
- User-authenticated
- Device-scoped
- Expirable
- Deleted or marked consumed after pickup when possible

This feature must not become permanent playlist storage.

This feature must not become a playlist provider.

This feature must not become a playlist marketplace.

## Temporary Playlist Transfer Security

Temporary playlist transfer must follow strict rules.

Required behavior:

- Authenticated customer creates transfer.
- Customer selects own device.
- Backend validates device ownership.
- Backend stores encrypted payload temporarily.
- Payload has expiration time.
- App consumes payload once when possible.
- Payload is marked consumed or deleted.
- Expired payloads are deleted or ignored.
- Audit logs are created when needed.

Forbidden behavior:

- Permanent backend playlist storage
- Shared playlist library
- Playlist marketplace
- Public playlist search
- Backend playlist authority
- Logging playlist credentials
- Exposing playlist credentials to other users

## Payment Security

Card data must not be stored.

The platform may support manual payments during MVP.

Real payment processing must use approved payment providers.

Possible providers:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Payment security rules:

- Do not store card numbers.
- Do not store CVV.
- Do not store full raw card data.
- Do not trust frontend price values.
- Do not trust frontend duration values.
- Verify payment webhook signatures.
- Make webhook handling idempotent.
- Extend subscriptions only after verified payment success.
- Audit manual payment approvals.
- Audit manual payment rejections.
- Do not log payment provider secrets.

## Webhook Security

Payment webhooks must be verified.

Webhook rules:

- Verify provider signature.
- Validate provider reference.
- Validate amount.
- Validate currency.
- Validate payment status.
- Prevent duplicate processing.
- Store safe event metadata when useful.
- Never trust unsigned webhook payloads.
- Never expose webhook secrets in logs.

Webhook endpoints should be protected by:

- Signature verification
- Idempotency checks
- Logging
- Safe error handling
- Rate limiting where appropriate

## API Security

API endpoints should use:

- DTO validation
- Input sanitization where needed
- Authentication guards
- Role guards
- Ownership checks
- Rate limiting
- Standard error responses
- Safe exception handling
- Request IDs
- Audit logging

Sensitive endpoint groups:

- Auth endpoints
- Admin endpoints
- Reseller credit endpoints
- Payment endpoints
- Device activation endpoints
- License status endpoints
- Playlist transfer endpoints
- Webhook endpoints

## Rate Limiting

Rate limiting should protect:

- Login
- Register
- Refresh token
- Password reset later
- Device activation
- License status
- Playlist transfer creation
- Playlist transfer consumption
- Payment webhooks

Auth endpoints should have strict rate limits.

License endpoints may need balanced limits because apps may call them regularly.

Rate limits should avoid blocking normal app usage while still preventing abuse.

## Input Validation

All incoming data must be validated.

Validation should cover:

- Required fields
- Email format
- String length
- Enum values
- Number ranges
- Date validity
- UUID or ID format
- Status transitions
- Ownership-sensitive IDs
- Pagination limits
- Sort field allowlists

Invalid input should return a standard validation error.

## Sensitive Data Rules

Never log:

- Plain text passwords
- Password hashes
- Payment card data
- Playlist credentials
- Full access tokens
- Full refresh tokens
- Encryption keys
- Payment provider secrets
- Database passwords
- Raw sensitive provider payloads

Never return from API:

- password_hash
- refresh_token_hash
- internal secrets
- encryption keys
- payment provider secrets
- raw playlist credentials
- full tokens of other sessions

## Environment Secret Rules

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

`.env.example` may contain placeholder values only.

Sensitive environment values include:

- DATABASE_URL
- REDIS_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- PLAYLIST_TRANSFER_ENCRYPTION_KEY
- PAYMENT_WEBHOOK_SECRET
- ADMIN_SEED_PASSWORD
- Payment provider keys
- Payment provider secrets

Production secrets must be strong and unique.

Default secrets must never be used in production.

## Database Security

Critical writes must use database transactions.

Transaction-required operations:

- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription creation through reseller credit
- Subscription extension through reseller credit
- Manual payment approval
- Payment webhook confirmation
- Subscription extension after payment
- Device activation
- Playlist transfer consumption

Database constraints should help prevent invalid state.

Useful constraints:

- Unique email
- Valid role enum
- Valid status enum
- Non-negative reseller credit balance
- Unique device identity where appropriate
- Expiring playlist transfer payloads
- Valid payment status
- Valid subscription status

## Audit Logging

Audit logs should record critical actions.

Audit log fields should include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Sensitive data must not be stored in audit logs.

Audit logs should not contain playlist credentials.

Audit logs should not contain payment card data.

Audit logs should not contain full tokens or secrets.

## Actions To Audit

Audit these actions:

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
- Subscription suspension
- Payment approval
- Payment rejection
- Device block
- Device unblock
- App version change
- Remote config change
- Playlist transfer creation
- Playlist transfer consumption

## Web App Security

The web app should use:

- Protected routes
- Role-based dashboard layouts
- Safe redirects
- Form validation
- API error handling
- Secure token handling
- No sensitive data in local logs
- No trusted frontend-only permissions

Frontend checks are only user experience helpers.

Backend authorization is mandatory.

## App Integration Security

The Android TV or Fire TV app should:

- Generate app_generated_device_id
- Store playlist credentials securely
- Check license status with backend
- Check app version with backend
- Fetch remote config
- Respect force update
- Respect maintenance mode
- Respect subscription expiration
- Avoid logging sensitive credentials
- Avoid exposing tokens in logs
- Avoid exposing playlist credentials in crash reports

The app may cache limited license state for user experience.

The backend remains the authority.

## App Token Handling

The app should handle tokens securely.

Rules:

- Do not log tokens.
- Store tokens securely.
- Refresh tokens when needed.
- Logout should clear tokens.
- Expired tokens should trigger re-authentication.
- Do not expose tokens in crash logs.
- Do not send tokens to third-party services.

## Error Handling Security

Production errors must be safe.

Do not expose:

- Stack traces
- Database internals
- Secret values
- Token contents
- Payment provider secrets
- Encryption keys
- Playlist credentials

Errors should use standard API error codes.

Examples:

- UNAUTHORIZED
- FORBIDDEN
- VALIDATION_ERROR
- RATE_LIMITED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- PAYMENT_NOT_VERIFIED
- SERVER_ERROR

## Logging Security

Logs should help debugging without exposing secrets.

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

Logs must not include:

- Passwords
- Card data
- Playlist credentials
- Tokens
- Secrets
- Encryption keys

## Dependency Security

Dependencies should be reviewed before production.

Recommended practices:

- Keep dependencies updated.
- Avoid abandoned packages.
- Use official libraries when possible.
- Review security advisories.
- Avoid unnecessary dependencies.
- Lock dependency versions through pnpm lockfile.
- Run dependency audit before production.

## CI Security

Future CI should check:

- TypeScript build
- Lint
- Tests
- Dependency audit
- Prisma schema validation
- Environment example validation

CI must not print secrets.

CI must not expose environment variables.

CI must not expose production credentials.

## Backup Security

Production backups should be protected.

Backup rules:

- Encrypt backups where possible.
- Restrict backup access.
- Do not expose backups publicly.
- Test restore process.
- Protect database credentials.
- Rotate backup credentials when needed.

Backups must not contain payment card data because card data must never be stored.

## CORS Security

CORS must be restricted in production.

Allowed origins should include only approved web app domains.

Do not use wildcard CORS in production.

Local development may use local origins only.

## HTTPS Security

Production must use HTTPS.

HTTP should redirect to HTTPS.

API tokens must not be sent over insecure HTTP in production.

Payment webhooks must use secure endpoints.

## Security Headers

Production should use security headers.

Recommended areas:

- Content Security Policy where practical
- X-Frame-Options or frame ancestors
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

## MVP Security Checklist

Before MVP, verify:

- Password hashing is implemented.
- Login is rate limited.
- Register is rate limited.
- JWT secrets are strong.
- Refresh token handling is secure.
- Admin routes require admin role.
- Reseller routes require reseller role.
- Customer routes require customer ownership.
- Resellers cannot access other reseller customers.
- Customers cannot access other customer records.
- Reseller credit operations are transactional.
- Negative reseller balances are prevented.
- Manual payment approval is admin-only.
- Device activation validates ownership.
- License status is backend-authoritative.
- App version endpoint works.
- Remote config endpoint works.
- Playlist transfer payloads expire.
- Sensitive data is not logged.
- `.env` is not committed.

## Production Security Checklist

Before production, verify:

- HTTPS is enforced.
- CORS is restricted.
- Production secrets are rotated.
- Database backups are configured.
- Monitoring is configured.
- Error responses are production-safe.
- Logs do not expose sensitive data.
- Payment webhook verification is active.
- Audit logs are enabled.
- Admin accounts are protected.
- Dependency vulnerabilities are reviewed.
- Deployment environment variables are correct.
- Rate limits are configured.
- Security headers are enabled.

## Incident Response

If a security incident occurs:

1. Identify the affected area.
2. Disable or restrict the affected feature if needed.
3. Preserve logs.
4. Rotate affected secrets.
5. Patch the issue.
6. Review related code.
7. Add tests where possible.
8. Document the incident.
9. Notify affected users if required.
10. Add prevention tasks.

## Forbidden Security Assumptions

Do not assume:

- Frontend route hiding is security.
- User role sent from frontend is trusted.
- Price sent from frontend is trusted.
- Credit value sent from frontend is trusted.
- Device identity alone guarantees authorization.
- Webhook payload is valid without signature verification.
- App local license state overrides backend denial.
- Temporary playlist transfer is permanent storage.

## Do Not Add Without Approval

Do not add these without explicit approval:

- Stream hosting
- Stream relay
- Channel selling
- Channel package management
- Playlist marketplace
- Permanent backend playlist authority
- Default cloud playlist credential storage
- Card data storage
- Plain text password storage

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

Do not create conflicting alternative security files.

## Final Rule

Security must protect the player-only product model.

Do not build security around content delivery because the platform must not deliver content.

Do not build security around stream hosting because the platform must not host streams.

Do not build security around playlist authority because the backend must not be playlist source of truth.
