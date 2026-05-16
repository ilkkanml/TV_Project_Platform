# 05 - API Bible

This file defines the planned API architecture for TV Project Platform.

The API must support the licensed player platform model.

The API must not provide streams, channels, content packages, playlist marketplace features, or backend playlist authority.

## Product Boundary

TV Project Platform is a Licensed IPTV Player Platform.

The API is responsible for software access, accounts, subscriptions, licenses, devices, payments, reseller operations, app version control, remote config, and optional temporary playlist profile transfer.

The API must not act as:

- IPTV provider
- Content provider
- Channel provider
- Stream provider
- Playlist provider
- CDN provider
- Broadcast backend

## Planned API Stack

The planned backend stack is:

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis
- JWT authentication
- Role-based access control
- DTO validation
- Global exception handling
- Standard API response format

## API Application Location

The API app location is:

- apps/api

## Main API Modules

The API should be organized into modules:

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

## API Design Principles

The API must follow these principles:

- Backend is the authority.
- Frontend values must not be trusted.
- Every protected route must require authentication.
- Every role-specific route must enforce authorization.
- Reseller and customer resources must enforce ownership checks.
- Sensitive actions must be audit logged.
- Critical writes must use database transactions.
- Payment confirmations must be verified.
- Reseller credit operations must be transaction-based.
- Temporary playlist transfer payloads must expire.

## Standard Response Format

All successful API responses should follow a consistent format.

Suggested shape:

- success
- code
- message
- data
- meta

Example fields:

- success: true
- code: OK
- message: Request completed successfully
- data: response payload
- meta: pagination or extra metadata

## Standard Error Format

All API errors should follow a consistent format.

Suggested shape:

- success
- code
- message
- errors
- request_id

Example fields:

- success: false
- code: VALIDATION_ERROR
- message: Validation failed
- errors: field-level errors
- request_id: request tracking ID

## Common API Error Codes

Initial error codes:

- OK
- CREATED
- BAD_REQUEST
- UNAUTHORIZED
- FORBIDDEN
- NOT_FOUND
- VALIDATION_ERROR
- RATE_LIMITED
- CONFLICT
- SERVER_ERROR
- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE
- PAYMENT_FAILED
- PAYMENT_NOT_VERIFIED
- RESELLER_INSUFFICIENT_CREDIT
- PLAYLIST_TRANSFER_EXPIRED
- PLAYLIST_TRANSFER_NOT_FOUND

## Authentication

Authentication should support:

- Register
- Login
- Refresh token
- Logout
- Current user endpoint

Passwords must be hashed.

Plain text passwords must never be stored.

Refresh tokens should be stored as hashes.

Access tokens should be short-lived.

Logout should revoke or invalidate refresh tokens.

## Auth Endpoints

Planned endpoints:

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me

MVP may start with email and password authentication.

Future additions may include:

- Password reset
- Email verification
- Admin two-factor authentication

## Authorization

The platform has three primary roles:

- Admin
- Reseller
- Customer

Authorization must be enforced on the backend.

Frontend route protection is not enough.

Every protected endpoint should validate:

- User authentication
- User role
- Resource ownership
- Resource status
- Action permission

## Role Guards

The API should include role guards for:

- Admin-only routes
- Reseller-only routes
- Customer-only routes
- Shared authenticated routes

Reseller routes must also check reseller ownership.

Customer routes must also check customer ownership.

## User Module

The Users module manages platform users.

Admin user endpoints may include:

- GET /admin/users
- GET /admin/users/:id
- POST /admin/users
- PATCH /admin/users/:id
- PATCH /admin/users/:id/status
- PATCH /admin/users/:id/role

Customer self-service endpoints may include:

- GET /account/profile
- PATCH /account/profile
- PATCH /account/password

Rules:

- Only admins can manage all users.
- Customers can only manage their own account.
- Resellers can only access allowed reseller-scoped records.
- Password hashes must never be returned.

## Plans Module

The Plans module manages software access plans.

Plans represent software/player access.

Plans do not represent channel packages.

Plans do not represent stream access.

Admin endpoints may include:

- GET /admin/plans
- GET /admin/plans/:id
- POST /admin/plans
- PATCH /admin/plans/:id
- PATCH /admin/plans/:id/status

Public or authenticated endpoints may include:

- GET /plans
- GET /plans/:id

Rules:

- Backend controls plan price.
- Backend controls plan duration.
- Frontend price and duration values must not be trusted.
- Plans must not describe content access.

## Subscriptions Module

The Subscriptions module manages software subscriptions.

Subscription endpoints may include:

- GET /admin/subscriptions
- GET /admin/subscriptions/:id
- POST /admin/subscriptions
- PATCH /admin/subscriptions/:id/extend
- PATCH /admin/subscriptions/:id/cancel
- GET /account/subscription
- GET /reseller/customers/:customerId/subscription

Rules:

- Subscriptions are for software access only.
- Subscriptions are not for channel access.
- Extension requires admin action, verified payment, or valid reseller credit operation.
- Subscription changes should be audit logged.

## License Module

The License module provides app-facing license validation.

App-facing endpoints may include:

- GET /license/status

License status should consider:

- Authenticated user
- Device activation
- Device status
- Subscription status
- App version rules
- Maintenance mode
- Remote config rules

Possible license results:

- ALLOWED
- DENIED

Possible denial reasons:

- DEVICE_NOT_ACTIVATED
- DEVICE_BLOCKED
- SUBSCRIPTION_EXPIRED
- LICENSE_INVALID
- FORCE_UPDATE_REQUIRED
- MAINTENANCE_MODE

Rules:

- The backend is the license authority.
- The app must not decide license validity alone.
- License checks may be logged.

## Devices Module

The Devices module manages app device activation and status.

App-facing endpoints may include:

- POST /device/activate
- GET /device/status
- PATCH /device/heartbeat

Customer endpoints may include:

- GET /account/devices
- GET /account/devices/:id
- PATCH /account/devices/:id/name

Admin endpoints may include:

- GET /admin/devices
- GET /admin/devices/:id
- PATCH /admin/devices/:id/block
- PATCH /admin/devices/:id/unblock

Rules:

- app_generated_device_id is the primary device identity.
- MAC address must not be the primary identity.
- Android ID is only a secondary signal.
- Device activation must check user ownership and plan limits.
- Blocked devices must not pass license checks.

## Resellers Module

The Resellers module manages reseller accounts and reseller-scoped operations.

Admin endpoints may include:

- GET /admin/resellers
- GET /admin/resellers/:id
- POST /admin/resellers
- PATCH /admin/resellers/:id
- PATCH /admin/resellers/:id/status
- GET /admin/resellers/:id/customers
- GET /admin/resellers/:id/credits
- POST /admin/resellers/:id/credits/add
- POST /admin/resellers/:id/credits/adjust

Reseller endpoints may include:

- GET /reseller/dashboard
- GET /reseller/customers
- POST /reseller/customers
- GET /reseller/customers/:id
- PATCH /reseller/customers/:id
- GET /reseller/credits
- GET /reseller/credit-transactions
- POST /reseller/customers/:id/subscriptions
- PATCH /reseller/customers/:id/subscriptions/:subscriptionId/extend

Rules:

- Resellers can only access their own customers.
- Reseller credit operations must be transaction-based.
- Frontend credit values must not be trusted.
- Negative balances must be prevented.
- Credit writes must use database transactions.
- Credit changes must be audit logged.

## Reseller Credit Transaction Rules

Every credit operation must create a transaction record.

Credit transaction fields should include:

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

Transaction types may include:

- CREDIT_ADD
- CREDIT_USE
- CREDIT_REFUND
- MANUAL_ADJUSTMENT
- REVERSAL

## Payments Module

The Payments module manages payment records.

Card data must not be stored.

MVP may support manual payment records.

Payment endpoints may include:

- GET /account/payments
- POST /checkout
- GET /payments/:id/status
- GET /admin/payments
- GET /admin/payments/:id
- POST /admin/payments/manual
- PATCH /admin/payments/:id/approve
- PATCH /admin/payments/:id/reject

Webhook endpoints may include:

- POST /webhooks/iyzico
- POST /webhooks/paytr
- POST /webhooks/stripe

Rules:

- Do not store card numbers.
- Do not store CVV.
- Do not trust frontend price values.
- Verify webhook signatures.
- Extend subscriptions only after verified payment confirmation.
- Manual payment approval must be admin-only.
- Payment approvals should be audit logged.

## App Versions Module

The App Versions module controls app update behavior.

Admin endpoints may include:

- GET /admin/app-versions
- GET /admin/app-versions/:id
- POST /admin/app-versions
- PATCH /admin/app-versions/:id
- PATCH /admin/app-versions/:id/status

App-facing endpoint may include:

- GET /app/version

Response should include:

- platform
- latest_version_code
- latest_version_name
- minimum_version_code
- force_update
- apk_url
- changelog

Rules:

- Old app versions may be blocked.
- Force update rules must be backend-controlled.
- App version changes should be audit logged.

## Remote Config Module

The Remote Config module controls app behavior.

Admin endpoints may include:

- GET /admin/remote-config
- PATCH /admin/remote-config

App-facing endpoint may include:

- GET /remote-config

Response may include:

- maintenance_mode
- maintenance_message
- announcement
- feature_flags
- minimum_version_code

Feature flags may include:

- vod_enabled
- series_enabled
- epg_enabled
- favorites_enabled
- multi_profile_enabled
- web_playlist_push_enabled

Rules:

- Remote config must not include secrets.
- Remote config must not include playlist credentials.
- Remote config changes should be audit logged.

## Playlist Push Module

The Playlist Push module supports optional web-to-device playlist profile transfer.

This module must remain a temporary encrypted transfer bridge.

The backend must not become playlist source of truth.

Customer endpoints may include:

- POST /account/playlist-push
- GET /account/playlist-push
- GET /account/playlist-push/:id
- DELETE /account/playlist-push/:id

App-facing endpoint may include:

- POST /playlist-push/consume

Rules:

- User must be authenticated.
- Target device must belong to the user.
- Payload must be encrypted.
- Payload must be temporary.
- Payload must expire.
- Payload should be deleted or marked consumed after pickup.
- Payload must not become permanent playlist storage.
- Playlist transfer actions should be audit logged.

## Audit Logs Module

The Audit Logs module records critical actions.

Admin endpoints may include:

- GET /admin/audit-logs
- GET /admin/audit-logs/:id

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

Rules:

- Sensitive data must not be logged.
- Playlist credentials must not be logged.
- Payment card data must not be logged.
- Audit logs should be append-only where possible.

## Health Module

The Health module provides system status.

Endpoints may include:

- GET /health
- GET /health/db
- GET /health/redis

Rules:

- Health endpoints should not expose secrets.
- Public health responses should be minimal.
- Detailed health checks may require admin access.

## Rate Limiting

Rate limiting should protect:

- POST /auth/login
- POST /auth/register
- POST /auth/refresh
- POST /device/activate
- GET /license/status
- POST /account/playlist-push
- POST /playlist-push/consume
- Payment webhook endpoints

Auth endpoints should have stricter limits.

Device and license endpoints may need balanced limits because apps may call them regularly.

## Input Validation

Every endpoint accepting input should use DTO validation.

Validation should check:

- Required fields
- String length
- Enum values
- Email format
- Number ranges
- Date validity
- Ownership-sensitive IDs
- Status transitions

Invalid input should return VALIDATION_ERROR.

## Pagination

List endpoints should support pagination.

Suggested query parameters:

- page
- limit
- search
- sort
- order
- status

Pagination metadata may include:

- page
- limit
- total
- total_pages

## Filtering

Admin list endpoints may support filters.

Useful filters:

- role
- status
- date range
- reseller ID
- customer ID
- subscription status
- payment status
- device status
- app platform

Filtering must not bypass authorization rules.

## Sorting

List endpoints may support sorting.

Common sort fields:

- created_at
- updated_at
- email
- status
- ends_at
- amount

Sorting must validate allowed fields to prevent unsafe queries.

## Request Context

The API should track request context.

Useful request context fields:

- request ID
- user ID
- role
- IP address
- user agent
- endpoint
- method

Request context helps audit logging and debugging.

## Security Headers and CORS

The API should use secure defaults.

Security areas:

- CORS restrictions
- Helmet/security headers
- JSON body size limits
- Rate limits
- Safe error responses
- Production stack trace hiding

## Environment Configuration

The API should validate environment variables at startup.

Important environment variables:

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

Secrets must not be committed.

.env.example must contain placeholder values only.

## App-Facing API Rules

App-facing APIs should be stable and predictable.

App-facing endpoints include:

- POST /device/activate
- GET /device/status
- GET /license/status
- GET /app/version
- GET /remote-config
- POST /playlist-push/consume

The app should receive clear denial reasons.

The app should respect:

- License denied
- Subscription expired
- Device blocked
- Force update required
- Maintenance mode

## Admin API Rules

Admin APIs require admin role.

Admin APIs may access platform-wide resources.

Admin changes to sensitive areas should be audit logged.

Sensitive admin areas:

- Users
- Resellers
- Credits
- Subscriptions
- Payments
- Devices
- App versions
- Remote config
- System settings

## Reseller API Rules

Reseller APIs require reseller role.

Reseller APIs must enforce reseller ownership.

Resellers must not access other reseller customers.

Resellers must not access admin-only settings.

Reseller credit usage must be transactional.

## Customer API Rules

Customer APIs require customer role or authenticated user ownership.

Customers can only access their own:

- Account
- Subscription
- Devices
- Payments
- Playlist transfer requests

Customers cannot directly modify:

- Subscription dates
- Payment status
- Plan price
- License rules
- Role values
- App version rules
- Remote config

## Webhook Rules

Webhook endpoints must verify signatures.

Webhook endpoints should be idempotent.

Webhook records should be stored where useful.

Webhook processing should not trust unverified payloads.

Subscription changes should happen only after verified payment success.

## Idempotency

Idempotency should be considered for:

- Payment webhook processing
- Manual payment approval
- Reseller credit usage
- Subscription extension
- Playlist transfer consumption
- Device activation

Duplicate requests must not create duplicate credit usage or duplicate subscription extension.

## API Versioning

Initial API may use a simple version prefix later.

Possible format:

- /api/v1

MVP may start without versioning if the deployment structure is simple.

Before production, API versioning should be decided.

## Forbidden API Endpoints

Do not create endpoints for:

- /channels
- /streams
- /stream-sources
- /channel-packages
- /playlist-marketplace
- /content-catalog
- /cdn-routes
- /transcoding-jobs

These would violate the product boundary.

## MVP API Scope

MVP API should include:

- Auth
- Current user
- Role guards
- Plans
- Subscriptions
- Devices
- License status
- App version
- Remote config
- Resellers
- Reseller credits
- Manual payments
- Audit logs
- Health

## Post-MVP API Ideas

Post-MVP API ideas may include:

- Payment provider integrations
- Email notifications
- SMS notifications
- Support tickets
- Invoice generation
- Referral system
- Admin 2FA
- Advanced analytics
- Encrypted cloud playlist sync with explicit user consent

Each post-MVP feature requires separate approval.

## Final Rule

The API must serve licensed player platform operations only.

Do not create stream-hosting APIs.

Do not create channel-selling APIs.

Do not create content-provider APIs.

Do not make the backend the playlist authority.
