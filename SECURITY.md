# Security Policy

This file defines the security principles for TV Project Platform.

Security decisions in this file must be respected during backend, frontend, reseller, payment, and app integration development.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

It is not an IPTV broadcast provider.

It is not a stream hosting service.

It is not a playlist provider.

It is not a content platform.

The backend must never provide, host, relay, transcode, package, sell, or distribute TV streams.

The backend must never become the source of truth for playlist data.

## Core Security Principles

The platform must follow these principles:

- Never store plain text passwords.
- Never store payment card data.
- Never trust frontend-provided prices.
- Never trust frontend-provided credit values.
- Never trust frontend-provided roles.
- Never trust frontend-provided permissions.
- Always validate user input.
- Always enforce role-based access control.
- Always audit critical admin actions.
- Always audit reseller credit operations.
- Always verify payment provider webhooks.
- Always make device license checks backend-authoritative.
- Always expire temporary playlist transfer payloads.

## Authentication Security

Passwords must be hashed before storage.

Recommended password hashing:

- Argon2
- bcrypt

Password hashes must include a strong work factor.

Authentication should use:

- Access tokens
- Refresh tokens
- Secure token expiration
- Refresh token rotation when possible

Access tokens should be short-lived.

Refresh tokens should be stored and validated securely.

Logout should invalidate refresh tokens.

## Role-Based Access Control

The platform has three main roles:

- Admin
- Reseller
- Customer

Every protected endpoint must check authentication.

Every role-specific endpoint must check authorization.

Admin users must not share the same permission scope as resellers.

Reseller users must not access customers owned by other resellers.

Customer users must not access admin or reseller resources.

Frontend route protection is not enough.

Backend authorization is mandatory.

## Admin Security

Admin actions must be protected carefully.

Critical admin actions should be audit logged.

Examples of critical admin actions:

- Creating users
- Updating users
- Deleting users
- Creating resellers
- Updating resellers
- Adding reseller credit
- Adjusting reseller balance
- Creating plans
- Updating plans
- Changing subscriptions
- Blocking devices
- Changing app version rules
- Changing remote config
- Approving manual payments

Admin security should eventually include:

- Strong passwords
- Optional two-factor authentication
- Session tracking
- IP logging
- Audit logs
- Rate limiting

## Reseller Security

Reseller credit operations must be transaction-based.

A reseller balance field alone is not enough.

Every credit operation must create a transaction record.

Credit transactions should include:

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

The backend must calculate credit usage.

The frontend must not send trusted final credit values.

Negative reseller balances must be prevented.

Credit usage must happen inside database transactions.

Resellers must only access their own customers.

## Customer Security

Customers can only access their own data.

Customers must not access:

- Other customers
- Admin resources
- Reseller resources
- System-wide settings
- Payment provider configuration
- Audit logs

Customer account pages should require authentication.

Sensitive customer actions should be validated on the backend.

## Device Security

MAC address must not be used as the primary device identifier.

The primary device identifier should be:

- app_generated_device_id

Secondary signals may include:

- Android ID
- Device model
- Platform
- App version code
- App version name
- Install metadata

Device license checks must be backend-authoritative.

The app should not decide license validity alone.

The backend should be able to:

- Activate devices
- Verify devices
- Block devices
- Check subscription status
- Check license status
- Enforce app version requirements
- Return remote config

## Playlist Security

Backend is not playlist source of truth.

Playlist credentials should be entered inside the app by default.

Playlist credentials should be stored on the device using encrypted local storage.

Backend should not permanently store playlist credentials by default.

Optional web-to-device playlist profile transfer must be temporary.

Temporary transfer payloads must:

- Be encrypted
- Be tied to the authenticated user
- Be tied to the target device
- Expire automatically
- Be deleted after pickup when possible
- Be audit logged when needed

Encrypted cloud sync must not be enabled by default.

Encrypted cloud sync may be considered later only with explicit user consent.

## Payment Security

Card data must not be stored in this system.

Payment processing should use secure payment providers.

Possible providers may include:

- Iyzico
- PayTR
- Stripe
- Other approved payment processors

Payment rules:

- Do not trust frontend price values.
- Do not trust frontend plan duration values.
- Verify payment provider webhook signatures.
- Store payment status.
- Store payment provider reference ID.
- Extend subscriptions only after verified payment confirmation.
- Audit manual payment approvals.

During MVP, manual payment records may be used.

Manual payment approvals must be admin-only.

## API Security

API endpoints should use:

- Input validation
- DTO validation
- Rate limiting
- Authentication guards
- Role guards
- Standard error responses
- Audit logging for sensitive actions

Sensitive API groups include:

- Auth endpoints
- Admin endpoints
- Reseller credit endpoints
- Payment endpoints
- Device activation endpoints
- License check endpoints
- Playlist transfer endpoints

## Rate Limiting

Rate limiting should protect:

- Login
- Register
- Password reset
- Token refresh
- Device activation
- License status
- Playlist transfer creation
- Playlist transfer consumption
- Payment webhook endpoints

Rate limits may differ by endpoint type.

Auth endpoints should be stricter than normal read endpoints.

## Audit Logging

Audit logs should record important actions.

Audit logs should include:

- Actor user ID
- Actor role
- Action type
- Target resource type
- Target resource ID
- IP address
- User agent
- Metadata
- Created date

Actions that should be logged include:

- Admin user changes
- Reseller creation
- Reseller credit changes
- Subscription changes
- Payment approvals
- Device blocking
- App version changes
- Remote config changes
- Playlist transfer creation
- Playlist transfer consumption

## Data Protection

Sensitive data should be minimized.

Store only what is required.

Avoid storing unnecessary personal data.

Do not store playlist credentials permanently by default.

Do not store payment card data.

Do not expose internal IDs unnecessarily.

Do not expose password hashes.

Do not expose refresh tokens.

Do not expose payment provider secrets.

## Environment Variables

Secrets must be stored in environment variables.

Secrets must not be committed to the repository.

The `.env.example` file may contain placeholder values only.

Examples of sensitive values:

- JWT secrets
- Payment webhook secrets
- Database passwords
- Redis credentials
- Encryption keys
- Admin seed password

Production secrets must be generated securely.

## Database Security

Database writes for critical operations must use transactions.

Critical transaction areas:

- Reseller credit usage
- Reseller credit refunds
- Subscription extension
- Payment confirmation
- Device activation
- Playlist transfer consumption

Database constraints should help prevent invalid state.

Examples:

- Unique email
- Unique device identity per user where needed
- Non-negative credit balance where applicable
- Valid subscription dates
- Valid payment statuses
- Expiring transfer payloads

## Web Security

The web app should use:

- Secure authentication handling
- Protected routes
- CSRF-aware design where applicable
- Safe redirects
- Server-side authorization checks where needed
- Clear role separation
- Form validation
- Output escaping

Frontend access control is helpful but not sufficient.

Backend authorization is mandatory.

## App Integration Security

The app should:

- Generate a stable app device ID
- Store local playlist credentials securely
- Check license status before player access
- Check subscription status
- Respect force update
- Respect maintenance mode
- Respect remote config
- Handle expired licenses clearly
- Avoid exposing sensitive tokens in logs

The app should not assume that local cached license data is permanently valid.

Offline grace may be considered, but backend remains the authority.

## Temporary Playlist Transfer Security

The optional playlist transfer bridge must be designed carefully.

The transfer should:

- Require customer authentication
- Require device ownership validation
- Use temporary payloads
- Use encryption
- Expire automatically
- Be single-use when possible
- Be deleted after successful pickup when possible
- Avoid becoming permanent playlist storage

This feature must not turn the backend into a playlist provider.

## Logging Rules

Logs must not contain:

- Plain text passwords
- Payment card data
- Playlist credentials
- Full refresh tokens
- Full access tokens
- Encryption keys
- Payment provider secrets

Logs may include safe metadata such as:

- Request ID
- User ID
- Role
- Endpoint
- Status code
- Error code
- Timestamp

## Error Handling

Errors should be clear but safe.

Do not expose:

- Stack traces in production
- Database internals
- Secret values
- Payment provider secrets
- Token contents

Use standard API error codes.

Examples:

- UNAUTHORIZED
- FORBIDDEN
- VALIDATION_ERROR
- RATE_LIMITED
- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- PAYMENT_FAILED
- SERVER_ERROR

## Security Checklist Before MVP

Before MVP release, verify:

- Password hashing works.
- Login is rate limited.
- Register is rate limited.
- JWT secrets are not default values.
- Refresh token flow is secure.
- Admin routes require admin role.
- Reseller routes require reseller role.
- Customer routes require customer role.
- Resellers cannot access other reseller customers.
- Customers cannot access other customer data.
- Credit operations are transactional.
- Payment approvals are admin-only.
- Payment webhook signatures are verified.
- Device activation is validated.
- License status is backend-authoritative.
- Playlist transfer payloads expire.
- Sensitive data is not logged.
- `.env` is not committed.
- `.env.example` contains placeholders only.

## Security Checklist Before Production

Before production release, verify:

- Production secrets are rotated.
- Database backups are configured.
- HTTPS is enforced.
- CORS is restricted.
- Rate limits are configured.
- Audit logs are enabled.
- Admin accounts are protected.
- Payment provider webhooks are verified.
- Error messages are production-safe.
- Logs do not expose sensitive data.
- Dependency vulnerabilities are reviewed.
- Deployment environment variables are correct.
- Monitoring and alerting are configured.

## Incident Response

If a security issue is discovered:

1. Stop exposing the vulnerable endpoint if needed.
2. Preserve logs.
3. Identify affected users or records.
4. Rotate affected secrets.
5. Patch the issue.
6. Add a test if possible.
7. Document the incident.
8. Review related code paths.

## Do Not Add Without Approval

Do not add these features without explicit user approval:

- Stream hosting
- Stream relay
- Channel selling
- Playlist marketplace
- Content provider features
- Permanent backend playlist authority
- Default cloud playlist credential storage
- Card data storage
- Plain text password storage

## Final Rule

Security must support the product boundary.

The platform must remain a licensed player platform.

The backend must not become a content provider.

The backend must not become the playlist source of truth.
