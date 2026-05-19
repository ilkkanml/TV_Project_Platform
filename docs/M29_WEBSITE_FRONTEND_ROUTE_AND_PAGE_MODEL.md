# M29 Website Frontend Route and Page Model

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M29 defines the minimum frontend route/page structure for the platform launch MVP.

EA0 can start before the full website/customer portal is live.

The later website must support:

- Public product/download pages.
- Device ID plus Activation Key customer portal.
- Single owner dashboard.
- Legal/support pages.

The website must stay simple and launch-focused.

## 2. Frontend Scope

Launch MVP frontend includes:

- Public website.
- Customer portal login.
- Single-page customer portal.
- Owner login.
- Owner dashboard.

EA0 can temporarily operate with only:

- Direct APK download/distribution.
- API health/version/remote-config.
- Device bootstrap.
- License check.

Launch MVP frontend does not include:

- Reseller portal.
- Multi-admin/staff portal.
- Support agent portal.
- Full SaaS customer account center.
- Customer email/name registration.
- Channel/package/provider marketplace.

## 3. Public Routes

Required public routes later:

```txt
/
/download
/install-guide
/support
/legal
/terms
/privacy
```

Optional public route:

```txt
/status
```

Rules:

- Public pages must not promise channels, streams, IPTV packages, or provider accounts.
- Public pages must direct users only to official app downloads and legal usage boundaries.

## 4. Customer Portal Routes

Required customer routes later:

```txt
/portal
/portal/login
```

Recommended behavior:

- `/portal` shows the single-page customer portal if session is valid.
- `/portal` redirects/shows login form if session is missing or expired.
- `/portal/login` accepts Device ID plus Activation Key only.

No launch MVP routes for:

```txt
/register
/customer/settings
/customer/profile
/customer/billing/details
/customer/users
/customer/team
```

Rules:

- No customer email/name registration form.
- No phone/address/profile form.
- No multi-page customer account area.

## 5. Customer Portal Login UI

Fields:

```txt
Device ID
Activation Key
```

Primary action:

```txt
Open Portal
```

Error copy:

```txt
Invalid Device ID or Activation Key.
```

Rules:

- Do not say whether Device ID or Activation Key failed.
- Do not expose rate limit thresholds.
- Do not show raw stored Activation Key.
- Do not ask for provider credentials.
- Do not ask for playlist/source ownership proof.

## 6. Single-Page Customer Portal UI

One page sections:

```txt
Access Status
Device Status
Playlist / Profile Manager
License / Payment Status
Download / Update
Support / Legal
```

Primary actions:

```txt
Save Profile
Send/Sync to Device, optional
Download App
Open Install Guide
Logout
```

Rules:

- Keep one-page design.
- No sidebar required.
- No complex settings area.
- No watch history.
- No channel/provider/source marketplace.

## 7. Owner Routes

Required owner routes later:

```txt
/owner/login
/owner
/owner/device-access
/owner/devices
/owner/licenses
/owner/profiles
/owner/downloads
/owner/versions
/owner/remote-config
/owner/legal
/owner/audit-logs
/owner/emergency
```

Rules:

- Owner dashboard is for the single site owner/operator.
- No staff/support/admin team routes.
- No reseller routes in launch MVP.

## 8. Owner Login UI

Fields:

```txt
Login ID or Email
Password
```

Primary action:

```txt
Sign In
```

Error copy:

```txt
Invalid credentials.
```

Rules:

- Do not reveal exact failure cause.
- Do not expose token/session details.
- Owner login is separate from customer Device ID / Activation Key login.

## 9. Frontend API Dependencies

Public pages use later:

```txt
GET /health
GET /download-metadata
GET /app-version
GET /remote-config
```

EA0 app/system uses:

```txt
GET /health
GET /app-version
GET /remote-config
POST /devices/bootstrap
POST /license/check
```

Customer portal uses later:

```txt
POST /customer-access/login
POST /customer-access/logout
GET /customer-portal/summary
GET /customer-portal/profile
PUT /customer-portal/profile
POST /customer-portal/profile/sync-request, optional
```

Owner dashboard uses later:

```txt
POST /owner/login
POST /owner/logout
GET /owner/device-access-records
POST /owner/device-access-records
POST /owner/device-access-records/:id/reset-activation-key
PATCH /owner/device-access-records/:id/status
GET /owner/devices
PATCH /owner/devices/:id/status
GET /owner/licenses
PATCH /owner/licenses/:id
GET /owner/app-versions
PUT /owner/app-versions/:id
GET /owner/remote-config
PUT /owner/remote-config/:id
GET /owner/audit-logs
```

## 10. Website State Handling

Required frontend states:

```txt
loading
ready
empty
error
session_expired
maintenance
feature_disabled
```

Customer portal specific states:

```txt
invalid_device_credentials
access_disabled
access_blocked
license_free_launch_active
payment_disabled
profile_disabled
profile_saved
profile_save_failed
```

Owner dashboard specific states:

```txt
owner_unauthorized
owner_session_expired
mutation_success
mutation_failed
confirmation_required
emergency_enabled
```

## 11. Minimal Data Display Rules

Customer portal may display:

- Masked Device ID.
- Device status.
- App version.
- License/access state.
- Payment status placeholder.
- Profile saved status.
- Download/update information.
- Support/legal links.

Customer portal must not display:

- Raw Activation Key.
- activationKeyHash.
- Other customer devices.
- Admin notes unless safe.
- Provider credentials.
- Stream URLs as backend-owned records.
- Public channel/package lists.

Owner dashboard may display:

- Device access records.
- Device ID.
- Masked Activation Key hint.
- Device/license state.
- Profile metadata only.
- Download/version/config records.
- Audit logs with redaction.

Owner dashboard must not display:

- Raw Activation Key after generation/reset/recovery.
- activationKeyHash.
- Plaintext provider passwords.
- Playlist/source catalog as admin feature.
- Watch history.

## 12. Navigation Direction

Public navigation:

```txt
Home
Download
Install Guide
Support
Legal
```

Customer portal navigation:

```txt
Single page only
```

Owner navigation:

```txt
Overview
Device Access
Devices
Licenses
Profiles
Downloads
Versions
Remote Config
Legal
Audit Logs
Emergency
```

## 13. Visual / UX Direction

Preferred style:

- Simple.
- Clean.
- Dark-compatible.
- TV/media-tech feeling.
- Utility-first.
- Minimal marketing clutter.

Customer portal should feel like:

```txt
Open once, configure, leave.
```

Owner dashboard should feel like:

```txt
Operational control center, not a content management system.
```

## 14. Stop Conditions

Stop and escalate if frontend starts adding:

- Mandatory customer email/name registration.
- MAC as the primary product/contract identifier.
- Reseller dashboard before approval.
- Staff/support/admin team management.
- Channel/package/content/provider marketplace.
- Stream testing tools.
- Backend playlist/source catalog browser.
- Paid access enforcement during free launch.

## 15. Acceptance Criteria

M29 is acceptable when:

- Public website routes are clear.
- Customer portal remains single-page and Device ID / Activation Key based.
- Owner dashboard routes are clear.
- Frontend routes match M12/M26/M27/M28.
- EA0 can run before full website/customer portal exists.
- No customer email/name account is required.
- No extra staff/task role system is introduced.
- No media-provider UI behavior is introduced.
