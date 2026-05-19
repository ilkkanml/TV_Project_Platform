# M11 Platform Database MVP Design Review

Status: Active Draft
Mode: Planning only. No live database, migration, hosting, or production deploy work.

## 1. Purpose

M11 defines the minimum database shape required for the platform launch MVP.

The database exists to support:

- Owner/admin control.
- MAC address plus access key customer portal access.
- Device registration.
- License/free launch access state.
- App version checks.
- Remote config.
- Playlist/profile storage boundary if enabled.
- Audit visibility.

It must not become a media provider database.

## 2. Non-Negotiable Storage Boundary

The database may store platform operation records.

The database must not store as plaintext/product-visible business data:

- Stream URLs.
- Channel lists.
- Provider accounts.
- Provider credentials.
- Scraped media source data.
- Content catalogs.
- Playback source ownership claims.
- User media consumption history tied to specific third-party sources.

If playlist/profile data is stored through the website, it must be handled under the approved storage boundary:

- Prefer client-side encrypted profile storage.
- Backend must not inspect provider credentials as account data.
- Backend must not act as a channel/source catalog.
- Backend must not sell or distribute content/source packages.

## 3. MVP Entity Set

Required MVP entities:

1. OwnerUser
2. CustomerAccess
3. Device
4. LicenseGrant
5. AppVersion
6. RemoteConfig
7. CustomerProfileStore, optional / boundary-controlled
8. PaymentStatus, placeholder only
9. AuditLog

Deferred entities:

- Email/name customer User account.
- PaymentEvent enforcement.
- Subscription enforcement.
- ResellerProfile.
- CreditLedgerEntry.
- Advanced admin analytics.
- Support/ticketing records.

## 4. OwnerUser

Purpose:

- Allows the single site owner/operator to access the owner dashboard.

Minimum fields:

- id
- loginId or email
- passwordHash
- role: OWNER
- status
- lastLoginAt
- createdAt
- updatedAt

Rules:

- There is one owner/admin for launch MVP.
- No extra staff/admin/support role system is required.
- Owner credentials must never be stored in plaintext.
- Owner dashboard must not expose secrets or raw access keys after generation.

## 5. CustomerAccess

Purpose:

- Represents the customer portal access record without requiring customer name or email.
- The customer enters MAC address plus access key to open the single-page portal.

Minimum fields:

- id
- normalizedMac
- accessKeyHash
- accessKeyLabel or maskedKeyHint
- status
- portalSessionVersion, optional
- freeLaunchEligible
- createdAt
- updatedAt
- lastPortalLoginAt

Rules:

- Customer name is not required.
- Customer email is not required.
- Phone/address are not required.
- Access key must never be stored in plaintext.
- MAC address must be normalized before lookup.
- Failed access attempts must be rate-limited at service level.
- CustomerAccess owns only platform access/device/license/profile/payment-status records.
- CustomerAccess must not become a provider/content account.

Initial statuses:

- ACTIVE
- DISABLED
- UNDER_REVIEW
- BLOCKED

## 6. Device

Purpose:

- Represents an activated app installation/device record.
- Supports Android TV / Fire TV first client.

Minimum fields:

- id
- customerAccessId
- normalizedMac
- deviceKey, optional if app provides it
- name, optional
- platform
- appVersion
- status
- activatedAt
- revokedAt
- lastSeenAt
- createdAt
- updatedAt

Rules:

- MAC/device identifier is used for customer access and license association.
- Device can be revoked or blocked.
- Device must not store playlist contents as normal device metadata.
- Device must not store provider credentials.
- Device should support future clients without schema rewrite.

Initial statuses:

- ACTIVE
- PENDING
- REVOKED
- BLOCKED

## 7. LicenseGrant

Purpose:

- Separates license/access decision from payment enforcement.
- Preserves free launch behavior.

Minimum fields:

- id
- customerAccessId
- deviceId
- state
- freeLaunch
- paymentRequired
- validFrom
- validUntil
- lastCheckedAt
- message
- createdAt
- updatedAt

Initial states:

- FREE_LAUNCH_ACTIVE
- ACTIVE
- TRIALING
- EXPIRED
- SUSPENDED
- DEVICE_REVOKED
- BLOCKED

Rules:

- During free launch, valid devices may receive FREE_LAUNCH_ACTIVE.
- Payment enforcement is disabled by default.
- License check never validates stream sources.
- License check never inspects provider credentials.

## 8. AppVersion

Purpose:

- Lets clients check version/update policy.

Minimum fields:

- id
- platform
- version
- channel
- currentRecommended
- minimumSupported
- updateUrl
- forceUpdate
- enabled
- releaseNotes
- createdAt
- updatedAt

Rules:

- Force update must be conservative.
- Platform-specific records are required.
- No media source data belongs here.

## 9. RemoteConfig

Purpose:

- Provides safe runtime configuration.

Minimum fields:

- id
- scope
- key
- platform
- valueJson
- enabled
- createdAt
- updatedAt

Allowed values:

- Feature flags.
- Maintenance flags.
- Free launch flag.
- Support links.
- Safe polling intervals.
- Legal/terms version IDs.
- Profile manager availability.

Forbidden values:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 10. CustomerProfileStore, Optional / Boundary-Controlled

Purpose:

- Allows the single-page customer portal to save a customer-owned playlist/profile area if this feature is enabled.

Minimum fields, if used:

- id
- customerAccessId
- deviceId, optional
- profileMode
- encryptedPayload, preferred
- payloadVersion
- lastUpdatedAt
- createdAt
- updatedAt

Rules:

- Preferred mode is client-side encrypted payload.
- Backend should not parse playlist/profile contents.
- Backend must not turn profile data into a shared catalog.
- Backend must not sell, package, validate, scrape, or redistribute sources.
- Plaintext provider credentials must not be stored as platform account data.

Initial profileMode values:

- CLIENT_ENCRYPTED
- LOCAL_ONLY
- DISABLED

## 11. PaymentStatus, Placeholder Only

Purpose:

- Shows payment/access state in the customer portal without enforcing paid access during free launch.

Minimum fields:

- id
- customerAccessId
- state
- paymentRequired
- provider, optional later
- lastPaymentAt, optional later
- nextDueAt, optional later
- createdAt
- updatedAt

Initial states:

- FREE_LAUNCH
- NOT_REQUIRED
- PAYMENT_DISABLED
- ACTIVE_LATER
- EXPIRED_LATER

Rules:

- Payment enforcement is deferred.
- Payment absence must not block launch MVP free access.
- No payment card secrets are stored in platform database.

## 12. AuditLog

Purpose:

- Tracks operational decisions and security-relevant events.

Minimum fields:

- id
- actorType
- actorId
- action
- targetType
- targetId
- metadata
- createdAt

Initial audit events:

- owner.login.success
- owner.login.failed_limited
- customer_access.created
- customer_access.login.success
- customer_access.login.failed_limited
- customer_access.key.generated
- customer_access.key.reset
- device.registered
- device.revoked
- license.checked
- license.updated
- remote_config.updated
- app_version.updated
- download.updated
- profile.saved, if enabled

Rules:

- Audit metadata must not contain raw access keys.
- Audit metadata must not contain media source payloads.
- Sensitive values must be redacted.

## 13. MVP Index Direction

Required index areas:

- OwnerUser loginId/email unique.
- CustomerAccess normalizedMac lookup.
- CustomerAccess normalizedMac plus status lookup.
- CustomerAccess access key verification support through hash lookup strategy.
- Device normalizedMac lookup.
- Device customerAccessId/status lookup.
- LicenseGrant customerAccessId/deviceId/state lookup.
- AppVersion platform/version/channel uniqueness.
- RemoteConfig scope/key/platform uniqueness.
- CustomerProfileStore customerAccessId lookup, if enabled.
- AuditLog action/time lookup.

## 14. Deferred Until Later

Do not prioritize in M11 launch MVP:

- Customer email/password registration.
- Full payment/subscription enforcement.
- Reseller credit workflow.
- Large admin dashboard tables.
- Analytics dashboards.
- Advanced search.
- Content/source metadata.
- Provider integrations.

## 15. M11 Acceptance Criteria

M11 is acceptable when:

- Database MVP supports MAC address plus access key customer portal access.
- Free launch behavior is represented without payment blocking.
- Device/license access can be modeled cleanly.
- App version and remote config can be modeled cleanly.
- Optional playlist/profile storage stays inside the approved no-content boundary.
- No database table creates media-provider behavior.
- No mandatory customer email/name account exists for launch MVP.

## 16. Next Step

After M11 review:

- Align M12 Core API MVP Contract with MAC plus access key customer portal access.
- Map each endpoint to required database reads/writes.
- Keep implementation paused unless explicitly re-approved.
