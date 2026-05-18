# M11 Platform Database MVP Design Review

Status: Active Draft
Mode: Planning only. No live database, migration, hosting, or production deploy work.

## 1. Purpose

M11 defines the minimum database shape required for the Core Media Player Ecosystem before deeper backend or Android integration work continues.

The database exists to support:

- Account identity.
- Device activation.
- License state.
- App version checks.
- Remote config.
- Temporary encrypted profile transfer.
- Audit visibility.

It must not become a media provider database.

## 2. Non-Negotiable Storage Boundary

The database may store platform operation records.

The database must not store as product/business data:

- Stream URLs.
- Channel lists.
- Provider accounts.
- Provider credentials.
- Scraped media source data.
- Content catalogs.
- Playback source ownership claims.
- User media consumption history tied to specific third-party sources.

Temporary encrypted profile transfer is allowed only as an expiring bridge.

## 3. MVP Entity Set

Required MVP entities:

1. User
2. Device
3. ActivationSession
4. LicenseGrant
5. AppVersion
6. RemoteConfig
7. ProfileTransferSession
8. AuditLog

Deferred entities:

- PaymentEvent
- Subscription enforcement
- ResellerProfile
- CreditLedgerEntry
- Advanced admin analytics
- Support/ticketing records

## 4. User

Purpose:

- Owns account identity.
- Links devices and license grants.
- Supports admin/customer dashboard later.

Minimum fields:

- id
- email
- passwordHash
- role
- createdAt
- updatedAt

Rules:

- User does not own backend-hosted content.
- User can own devices and temporary transfer sessions.
- Role must remain simple in MVP: CUSTOMER, ADMIN. RESELLER can exist but should not drive MVP behavior yet.

## 5. Device

Purpose:

- Represents an activated app installation/device record.
- Supports Android TV / Fire TV first client.

Minimum fields:

- id
- userId
- deviceKey
- name
- platform
- appVersion
- status
- activatedAt
- revokedAt
- lastSeenAt
- createdAt
- updatedAt

Rules:

- deviceKey is app-level identity, not invasive hardware fingerprinting.
- Device can be revoked or blocked.
- Device must not store playlist contents.
- Device should support future clients without schema rewrite.

## 6. ActivationSession

Purpose:

- Allows TV device activation with a short code.

Minimum fields:

- id
- code
- status
- platform
- deviceName
- deviceKey
- appVersion
- userId
- deviceId
- expiresAt
- approvedAt
- consumedAt
- rejectedAt
- createdAt
- updatedAt

Rules:

- Code expires.
- Session is single use.
- TV polling must be rate-limited at API level.
- Approval binds user and device.
- Activation response must not include profile or media source payloads.

## 7. LicenseGrant

Purpose:

- Separates license decision from payment enforcement.
- Preserves free launch behavior.

Minimum fields:

- id
- userId
- deviceId
- state
- freeLaunch
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

- During free launch, valid activated devices may receive FREE_LAUNCH_ACTIVE.
- Payment enforcement is disabled by default.
- License check never validates stream sources.

## 8. AppVersion

Purpose:

- Lets clients check version policy.

Minimum fields:

- id
- platform
- version
- channel
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
- Profile transfer availability.

Forbidden values:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped metadata.

## 10. ProfileTransferSession

Purpose:

- Temporarily stores encrypted user-owned profile payload for transfer.

Minimum fields:

- id
- userId
- deviceId
- encryptedPayload
- payloadVersion
- expiresAt
- consumedAt
- createdAt

Rules:

- Payload must already be encrypted before storage.
- Backend must not inspect payload contents.
- Session expires quickly.
- Consumed sessions become unavailable.
- Backend is not profile source of truth.

## 11. AuditLog

Purpose:

- Tracks operational decisions and security-relevant events.

Minimum fields:

- id
- actorId
- action
- target
- metadata
- createdAt

Initial audit events:

- device.activation.created
- device.activation.approved
- device.revoked
- license.checked
- remote_config.updated
- app_version.updated
- profile_transfer.created
- profile_transfer.consumed

Rules:

- Audit metadata must not contain media source payloads.
- Sensitive values must be redacted.

## 12. MVP Index Direction

Required index areas:

- User email unique.
- Device deviceKey unique.
- Device user/status lookup.
- ActivationSession code/status lookup.
- ActivationSession expiration cleanup.
- LicenseGrant user/device/state lookup.
- AppVersion platform/version/channel uniqueness.
- RemoteConfig scope/key uniqueness.
- ProfileTransferSession expiration cleanup.
- AuditLog action/time lookup.

## 13. Deferred Until Later

Do not prioritize in M11:

- Full payment/subscription enforcement.
- Reseller credit workflow.
- Large admin dashboard tables.
- Analytics dashboards.
- Advanced search.
- Content/source metadata.
- Provider integrations.

## 14. M11 Acceptance Criteria

M11 is acceptable when:

- Database MVP supports Android first-client contract.
- Free launch behavior is represented without payment blocking.
- Device activation can be modeled cleanly.
- License check can be modeled cleanly.
- App version and remote config can be modeled cleanly.
- Temporary encrypted profile transfer can be modeled without content ownership drift.
- No database table creates media-provider behavior.

## 15. Next Step

After M11 review:

- Prepare Core API MVP Contract v1.
- Map each endpoint to required database reads/writes.
- Keep implementation paused unless explicitly re-approved.
