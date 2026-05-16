# 06 - Security Bible

This file defines the security architecture and security rules for TV Project Platform.

Security is mandatory across the API, web app, database, reseller system, payment system, app integration, and optional playlist transfer bridge.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The platform is not an IPTV provider.

The platform is not a content provider.

The platform is not a playlist provider.

The platform is not a stream hosting service.

Security must protect the product boundary.

The backend must not provide, host, relay, transcode, package, sell, or distribute TV streams.

The backend must not become the source of truth for playlist data.

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
- Always audit critical admin actions.
- Always audit reseller credit operations.
- Always verify payment webhooks.
- Always make license checks backend-authoritative.
- Always expire temporary playlist transfer payloads.

## Authentication Security

Authentication must be secure by default.

Required rules:

- Passwords must be hashed.
- Plain text passwords must never be stored.
- Password hashes must never be returned by the API.
- Login must be rate limited.
- Register must be rate limited.
- Refresh token endpoints must be protected.
- Logout must invalidate refresh tokens where possible.

Recommended password hashing:

- Argon2
- bcrypt

Access tokens should be short-lived.

Refresh tokens should be stored as hashes.

Refresh token rotation should be considered.

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
- Adding reseller credit
- Adjusting reseller credit
- Creating plans
- Updating plans
- Changing subscriptions
- Approving manual payments
- Blocking devices
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

- Authenticated user
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

License checks may be logged for debugging and abuse detection.

License logs must not contain playlist credentials.

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

## Webhook Security

Payment webhooks must be verified.

Webhook rules:

- Verify provider signature.
- Validate provider reference.
- Validate amount.
- Validate currency.
- Validate payment status.
- Prevent duplicate processing.
- Store webhook event metadata when useful.
- Never trust unsigned webhook payloads.

Webhook endpoints should be protected by:

- Signature verification
- Idempotency checks
- Logging
- Safe error handling

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
- Password reset
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

Invalid input should return a standard validation error.

## Sensitive Data Rules

Never log:

- Plain text passwords
- Payment card data
- Playlist credentials
- Full access tokens
- Full refresh tokens
- Encryption keys
- Payment provider secrets
- Database passwords

Never return from API:

- password_hash
- refresh_token_hash
- internal secrets
- encryption keys
- payment provider secrets
- raw playlist credentials

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

Production secrets must be strong and unique.

Default secrets must never be used in production.

## Database Security

Critical writes must use database transactions.

Transaction-required operations:

- Reseller credit add
- Reseller credit use
- Reseller credit refund
- Manual credit adjustment
- Subscription extension
- Payment confirmation
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

## Actions To Audit

Audit these actions:

- User creation
- User update
- User disable
- Role change
- Reseller creation
- Reseller update
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

The app may cache limited license state for user experience.

The backend remains the authority.

## Temporary Playlist Transfer Security

Temporary playlist transfer must follow strict rules.

Required behavior:

- Authenticated customer creates transfer.
- Customer selects own device.
- Backend validates device ownership.
- Backend stores encrypted payload temporarily.
- Payload has expiration time.
- App consumes payload once.
- Payload is marked consumed or deleted.
- Expired payloads are deleted or ignored.
- Audit logs are created when needed.

Forbidden behavior:

- Permanent backend playlist storage
- Shared playlist library
- Playlist marketplace
- Public playlist search
- Backend playlist authority

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

## Dependency Security

Dependencies should be reviewed before production.

Recommended practices:

- Keep dependencies updated.
- Avoid abandoned packages.
- Use official libraries when possible.
- Review security advisories.
- Avoid unnecessary dependencies.
- Lock dependency versions through pnpm lockfile.

## CI Security

Future CI should check:

- TypeScript build
- Lint
- Tests
- Dependency audit
- Prisma schema validation
- Environment example validation

CI must not print secrets.

CI logs must not expose environment variables.

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

## Final Rule

Security must protect the player-only product model.

Do not build security around content delivery because the platform must not deliver content.

Do not build security around stream hosting because the platform must not host streams.

Do not build security around playlist authority because the backend must not be playlist source of truth.
