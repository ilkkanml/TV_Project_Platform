# M33 EA0 Final Launch Checklist

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, payment enforcement, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M33 defines the final checklist for the first early access release phase.

EA0 goal:

```txt
Download-only early access
Database starts forming future customer/device/license records
No full website/customer portal required yet
No payment enforcement
No reseller flow
No customer email/name registration
```

## 2. EA0 Product Shape

EA0 includes:

- Android TV / Fire TV APK distribution.
- Backend API availability.
- Device bootstrap.
- License check.
- Free launch access.
- App version/update metadata.
- Remote config.
- Database record creation.

EA0 does not include:

- Full public website requirement.
- Customer portal requirement.
- Payment requirement.
- Reseller dashboard.
- Customer email/name account.
- Playlist/provider/source backend storage.

## 3. Core Identity Decision

Approved identity model:

```txt
Backend-generated Device ID
Backend-generated Activation Key
Database stores activationKeyHash only
App stores Device ID + Activation Key locally
License check uses Device ID + Activation Key
```

Optional recovery support:

```txt
platformDeviceHash
```

Rules:

- Raw Activation Key is never stored in database.
- Raw Activation Key is never logged.
- APK must not contain a shared/hardcoded Activation Key.
- Device ID is the primary public identifier.
- MAC address is not the primary product/contract identifier.

## 4. EA0 Required Backend Endpoints

Required now:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

Not required yet:

```txt
/customer-access/login
/customer-portal/summary
/customer-portal/profile
/owner dashboard endpoints
/payment endpoints
/reseller endpoints
```

## 5. Device Bootstrap Checklist

`POST /devices/bootstrap` must:

- Accept platformDeviceHash, platform, appVersion.
- Accept existingDeviceId and existingActivationKey if app already has local credentials.
- Create DeviceAccessRecord when no record exists.
- Generate unique Device ID.
- Generate strong Activation Key.
- Store activationKeyHash only.
- Return raw Activation Key only once on create/recovery rotation.
- Update firstSeenAt / lastSeenAt.
- Return free launch access metadata.

Response must include:

```txt
deviceId
activationKey, only when generated/rotated
status
licenseState
freeLaunch
paymentRequired
message
```

## 6. License Check Checklist

`POST /license/check` must:

- Accept deviceId, activationKey, platform, appVersion.
- Find DeviceAccessRecord by deviceId.
- Verify Activation Key against activationKeyHash.
- Update lastSeenAt.
- Return allowed / state / freeLaunch / paymentRequired.

Free launch active response:

```json
{
  "allowed": true,
  "state": "free_launch_active",
  "freeLaunch": true,
  "paymentRequired": false
}
```

Blocked/revoked response:

```json
{
  "allowed": false,
  "state": "device_revoked",
  "freeLaunch": false,
  "paymentRequired": false
}
```

Rules:

- License check must not inspect playlist/source/provider data.
- License check must not require payment during EA0/free launch.

## 7. Database Checklist

EA0 database must support:

```txt
DeviceAccessRecord
AppVersion
RemoteConfig
AuditLog, recommended
```

DeviceAccessRecord fields:

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
ownerNote, optional later
```

Required indexes:

```txt
deviceId unique
platformDeviceHash lookup when available
status lookup
lastSeenAt lookup
```

## 8. App Version / Update Checklist

`GET /app-version` must provide:

```txt
platform
requestedVersion
currentRecommendedVersion
minimumSupportedVersion
forceUpdate
updateUrl
releaseNotes
freeLaunch
```

Rules:

- Force update must be conservative.
- No media/source/provider data is returned.

## 9. Remote Config Checklist

`GET /remote-config` must provide safe values only.

Allowed keys:

```txt
freeLaunch.enabled
maintenance.enabled
maintenance.message
features.licenseCheck.enabled
features.deviceBootstrap.enabled
features.diagnostics.enabled
features.support.enabled
support.email
terms.version
privacy.version
legalBoundary.version
emergency.forceReadOnlyMode
emergency.disableDeviceBootstrap
emergency.disableLicenseGranting
```

Forbidden keys:

```txt
stream.url
playlist.url
channel.package
provider.username
provider.password
m3u.source
epg.source
scraper.enabled
drm.bypass
content.catalog
```

## 10. Android App Handoff Checklist

TV_Project must implement:

- Check local Device ID + Activation Key on startup.
- If missing, call `POST /devices/bootstrap`.
- Store Device ID + Activation Key in secure local storage.
- Never hardcode a shared Activation Key in APK.
- Never log Activation Key.
- Call `POST /license/check` with Device ID + Activation Key.
- Respect allowed/state/freeLaunch/paymentRequired response fields.
- Preserve local credentials during normal app update.
- Use platformDeviceHash for best-effort reinstall recovery.

TV_Project must not:

- Expect customer email/name login for EA0.
- Use MAC as primary contract identity.
- Send playlist/source/provider credentials to backend.
- Treat free launch as permanently free forever.

## 11. Future Paid Transition Checklist

EA0 records must remain usable later.

Future paid licensing must attach to existing:

```txt
Device ID
Activation Key hash
DeviceAccessRecord
```

Do not force by default:

- New Device ID.
- New Activation Key.
- App reinstall.
- Email/name registration.

Later fields may be added:

```txt
planId
paymentStatus
paymentRequired
paidUntil
paymentProviderCustomerId
subscriptionId
lastPaymentAt
renewalStatus
```

## 12. Owner Visibility Later

Owner dashboard should later show:

- Device ID.
- Activation Key hint only.
- Platform.
- App version.
- Status.
- License state.
- Free launch flag.
- Payment required flag.
- First seen.
- Last seen.
- Last recovered.

Owner dashboard must not show:

- Raw Activation Key after generation/recovery/reset.
- activationKeyHash.
- Provider credentials.
- Playlist/source contents.
- Watch history.

## 13. Security Checklist

Required:

- Hash Activation Keys.
- Never store raw Activation Keys.
- Never log raw Activation Keys.
- Rate-limit bootstrap and license check.
- Generic error messages.
- Revocation/block support.
- Secrets only in environment variables.

Recommended:

- Strong random Activation Key.
- Masked hint only.
- Recovery key rotation.
- Audit events for create/recover/rotate/revoke/license check.

## 14. No-Content Boundary Checklist

EA0 must not store or serve:

- Stream URLs.
- Playlist contents.
- Provider username/password.
- Channel package data.
- IPTV package data.
- EPG source data.
- User watch history.
- Backend playlist/source catalog.

## 15. EA0 Stop Conditions

Stop and escalate if any task adds:

- Customer email/name requirement.
- MAC as primary product identity.
- Payment blocking during free launch.
- Reseller workflow.
- Channel/package/source management.
- Provider credential storage.
- Backend playlist/source catalog.
- Hardcoded shared Activation Key in APK.
- Android UX implementation inside platform scope.

## 16. EA0 Ready Criteria

EA0 is ready when:

- Backend can bootstrap Device ID + Activation Key.
- Backend stores only activationKeyHash.
- App can store Device ID + Activation Key locally.
- License check returns free launch access.
- App version metadata works.
- Remote config works.
- Database records begin forming.
- Records can transition to paid licensing later.
- No content/provider/source behavior is introduced.
