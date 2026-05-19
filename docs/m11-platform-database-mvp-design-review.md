# M11 Platform Database MVP Design Review

Status: Active Draft
Mode: Planning only. No live database, migration, hosting, or production deploy work.

## 1. Purpose

M11 defines the minimum database shape required for EA0 and the later platform launch MVP.

The database exists to support:

- Owner/admin control later.
- Device ID plus Activation Key customer/device access.
- Early access database bootstrap without full website/customer portal.
- Device registration/status.
- License/free launch access state.
- Future paid license transition.
- App version checks.
- Remote config.
- Playlist/profile storage boundary later if enabled.
- Audit visibility.

It must not become a media provider database.

## 2. Current EA0 Database Priority

EA0 current priority:

```txt
Download-only early access
Backend-generated Device ID
Backend-generated Activation Key
Database stores activationKeyHash only
Free launch access active
No customer email/name required
No full customer portal required yet
```

EA0 must start forming future customer/license records now, so paid licensing can attach to the same records later.

## 3. Non-Negotiable Storage Boundary

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

If playlist/profile data is stored later through the website, it must be handled under the approved storage boundary:

- Prefer client-side encrypted profile storage.
- Backend must not inspect provider credentials as account data.
- Backend must not act as a channel/source catalog.
- Backend must not sell or distribute content/source packages.

## 4. EA0 Compact Entity

For the download-only early access phase, one compact entity is acceptable first.

Recommended compact entity:

```txt
DeviceAccessRecord
```

Minimum fields:

```txt
id
deviceId
platformDeviceHash
activationKeyHash
activationKeyHint
platform
appVersion
status
licenseState
freeLaunch
paymentRequired
firstSeenAt
lastSeenAt
lastRecoveredAt, optional
createdAt
updatedAt
ownerNote, optional
```

Rules:

- Backend generates `deviceId`.
- Backend generates `activationKey`.
- Database stores only `activationKeyHash`.
- Raw Activation Key must never be stored.
- Raw Activation Key must never be logged.
- App stores Device ID + Activation Key locally.
- `platformDeviceHash` supports best-effort reinstall recovery.
- `deviceId` must be unique.
- No playlist/source/provider fields belong in this entity.

Recommended statuses:

```txt
active
pending
disabled
blocked
revoked
```

Recommended license states:

```txt
free_launch_active
active
expired
suspended
device_revoked
blocked
```

Typical EA0 values:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

## 5. Future MVP Entity Set

When the website/customer portal/payment system becomes active, EA0 records can evolve into these entities:

1. OwnerUser
2. CustomerAccess
3. Device
4. LicenseGrant
5. AppVersion
6. RemoteConfig
7. CustomerProfileStore, optional / boundary-controlled
8. PaymentStatus / Subscription, later
9. AuditLog

Deferred entities:

- Email/name customer User account.
- Payment enforcement until explicitly approved.
- ResellerProfile.
- CreditLedgerEntry.
- Advanced admin analytics.
- Support/ticketing records.

## 6. OwnerUser

Purpose:

- Allows the single site owner/operator to access the owner dashboard later.

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
- Owner dashboard must not expose secrets or raw Activation Keys after generation/recovery/reset.

## 7. CustomerAccess

Purpose:

- Represents the future customer portal access record without requiring customer name or email.
- The customer enters Device ID plus Activation Key to open the single-page portal when portal is enabled.

Minimum fields:

- id
- deviceId
- activationKeyHash
- activationKeyHint
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
- Activation Key must never be stored in plaintext.
- Device ID is the public lookup identifier.
- Failed access attempts must be rate-limited at service level.
- CustomerAccess owns only platform access/device/license/profile/payment-status records.
- CustomerAccess must not become a provider/content account.

Initial statuses:

- ACTIVE
- DISABLED
- UNDER_REVIEW
- BLOCKED

## 8. Device

Purpose:

- Represents an activated app installation/device record.
- Supports Android TV / Fire TV first client.

Minimum fields:

- id
- customerAccessId
- deviceId
- platformDeviceHash, optional / hashed
- deviceKey, optional if app provides it later
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

- Device ID is used for customer access and license association.
- platformDeviceHash is only for best-effort reinstall recovery.
- Device can be revoked or blocked.
- Device must not store playlist contents as normal device metadata.
- Device must not store provider credentials.
- Device should support future clients without schema rewrite.

Initial statuses:

- ACTIVE
- PENDING
- DISABLED
- REVOKED
- BLOCKED

## 9. LicenseGrant

Purpose:

- Separates license/access decision from payment enforcement.
- Preserves free launch behavior.
- Allows future paid licensing to attach to existing EA0 records.

Minimum fields:

- id
- customerAccessId
- deviceId
- state
- freeLaunch
- paymentRequired
- validFrom
- validUntil
- paidUntil, later
- lastCheckedAt
- message
- createdAt
- updatedAt

Initial states:

- FREE_LAUNCH_ACTIVE
- ACTIVE
- EXPIRED
- SUSPENDED
- DEVICE_REVOKED
- BLOCKED

Rules:

- During free launch, valid devices may receive FREE_LAUNCH_ACTIVE.
- Payment enforcement is disabled by default.
- License check never validates stream sources.
- License check never inspects provider credentials.
- Later paid licensing must update the same record path, not force new Device IDs.

## 10. AppVersion

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

## 11. RemoteConfig

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
- Device bootstrap availability.
- Profile manager availability later.

Forbidden values:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 12. CustomerProfileStore, Optional / Boundary-Controlled

Purpose:

- Allows the single-page customer portal to save a customer-owned playlist/profile area if this feature is enabled later.

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

## 13. PaymentStatus / Subscription, Later

Purpose:

- Shows payment/access state in the future customer portal without enforcing paid access during free launch.
- Allows EA0 records to continue into paid licensing later.

Minimum fields later:

- id
- customerAccessId
- deviceId, optional
- state
- paymentRequired
- planId, optional
- provider, optional
- paymentProviderCustomerId, optional
- subscriptionId, optional
- lastPaymentAt, optional
- nextDueAt, optional
- paidUntil, optional
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
- Payment absence must not block EA0/free launch access.
- No payment card secrets are stored in platform database.
- Paid transition must reuse existing Device ID + Activation Key records.

## 14. AuditLog

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
- device_access.created
- device_access.recovered
- device_access.key.rotated
- device_access.disabled
- device.bootstrap.success
- device.bootstrap.failed_limited
- device.registered
- device.revoked
- license.checked
- license.updated
- remote_config.updated
- app_version.updated
- download.updated
- profile.saved, if enabled later

Rules:

- Audit metadata must not contain raw Activation Keys.
- Audit metadata must not contain activationKeyHash.
- Audit metadata must not contain media source payloads.
- Sensitive values must be redacted.

## 15. MVP Index Direction

Required EA0 index areas:

- DeviceAccessRecord deviceId unique.
- DeviceAccessRecord platformDeviceHash lookup when available.
- DeviceAccessRecord status lookup.
- DeviceAccessRecord lastSeenAt lookup.

Future index areas:

- OwnerUser loginId/email unique.
- CustomerAccess deviceId unique.
- CustomerAccess deviceId plus status lookup.
- Device deviceId lookup.
- Device platformDeviceHash lookup when available.
- Device customerAccessId/status lookup.
- LicenseGrant customerAccessId/deviceId/state lookup.
- AppVersion platform/version/channel uniqueness.
- RemoteConfig scope/key/platform uniqueness.
- CustomerProfileStore customerAccessId lookup, if enabled.
- AuditLog action/time lookup.

## 16. Deferred Until Later

Do not prioritize in M11 launch MVP:

- Customer email/password registration.
- Full payment/subscription enforcement.
- Reseller credit workflow.
- Large admin dashboard tables.
- Analytics dashboards.
- Advanced search.
- Content/source metadata.
- Provider integrations.

## 17. M11 Acceptance Criteria

M11 is acceptable when:

- Database MVP supports backend-generated Device ID plus Activation Key.
- Activation Key raw value is never stored.
- EA0 records can form before the full website/customer portal exists.
- Free launch behavior is represented without payment blocking.
- Future paid licensing can attach to existing records.
- Device/license access can be modeled cleanly.
- App version and remote config can be modeled cleanly.
- Optional playlist/profile storage stays inside the approved no-content boundary.
- No database table creates media-provider behavior.
- No mandatory customer email/name account exists for launch MVP.

## 18. Next Step

After M11 review:

- Keep M12 Core API MVP Contract aligned with Device ID plus Activation Key.
- Map each endpoint to required database reads/writes.
- Keep implementation paused unless explicitly re-approved.
