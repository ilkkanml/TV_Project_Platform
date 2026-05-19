# M30 Customer Portal Frontend Data Mapping

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M30 maps the single-page customer portal UI sections to API data, frontend state, and allowed user actions.

The customer portal must remain:

- Single-page.
- MAC address plus access key based.
- Minimal.
- Launch-focused.
- Free launch compatible.
- No customer email/name account required.
- No media-provider behavior.

## 2. Customer Portal Entry

Route:

```txt
/portal
```

If no valid portal session exists, show login form.

Login fields:

```txt
MAC Address
Access Key
```

Login endpoint:

```txt
POST /customer-access/login
```

On success:

```txt
Load GET /customer-portal/summary
Render single-page portal
```

On failure:

```txt
Invalid MAC address or access key.
```

Rules:

- Do not say whether MAC or access key failed.
- Do not expose rate-limit thresholds.
- Do not display raw stored access key.
- Do not ask for email/name/phone/address.
- Do not ask for provider credentials.

## 3. Initial Page Load Data

Primary endpoint:

```txt
GET /customer-portal/summary
```

This endpoint should provide enough data to render the full single-page portal without multiple required page loads.

Frontend should treat summary as the main source for:

- Access status.
- Device status.
- License/free launch state.
- Payment placeholder/status.
- Profile metadata.
- Download/update metadata.
- Support/legal metadata.

Optional endpoint after summary:

```txt
GET /customer-portal/profile
```

Use only when the customer opens the profile editor or when profile data is needed.

## 4. UI Section Mapping

The single page contains these sections:

```txt
Access Status
Device Status
Playlist / Profile Manager
License / Payment Status
Download / Update
Support / Legal
```

No sidebar is required.

No multi-page customer account center is required.

## 5. Access Status Section

Data source:

```txt
GET /customer-portal/summary
```

Fields:

```txt
accessStatus
normalizedMacMasked
freeLaunch
lastPortalLoginAt, optional
```

Display example:

```txt
Access: Active
Device ID: AA:BB:**:**:**:FF
Free Launch: Active
```

Allowed actions:

```txt
Logout
```

Endpoint:

```txt
POST /customer-access/logout
```

Forbidden display:

- Raw access key.
- Raw secret/token.
- Other customers.
- Owner notes unless explicitly safe.

## 6. Device Status Section

Data source:

```txt
GET /customer-portal/summary
```

Fields:

```txt
device.status
device.platform
device.appVersion
device.lastSeenAt
license.state
```

Display example:

```txt
Device: Active
Platform: Android TV
App Version: 0.1.0
Last Seen: recently
```

Allowed actions:

```txt
Refresh status
```

Optional endpoint reload:

```txt
GET /customer-portal/summary
```

Forbidden actions:

- Stream testing.
- Channel testing.
- Provider validation.
- Playback history view.

## 7. Playlist / Profile Manager Section

Data sources:

Initial metadata:

```txt
GET /customer-portal/summary
```

Editor payload:

```txt
GET /customer-portal/profile
PUT /customer-portal/profile
```

Fields from summary:

```txt
profileStatus.profileMode
profileStatus.hasProfile
profileStatus.lastUpdatedAt
```

Fields from profile endpoint:

```txt
profileMode
payloadVersion
encryptedPayload
lastUpdatedAt
status
```

Allowed actions:

```txt
Open/Edit profile
Save profile
Send/Sync to Device, optional
```

Save endpoint:

```txt
PUT /customer-portal/profile
```

Sync endpoint, optional:

```txt
POST /customer-portal/profile/sync-request
```

Approved profile modes:

```txt
CLIENT_ENCRYPTED
LOCAL_ONLY
DISABLED
```

Preferred mode:

```txt
CLIENT_ENCRYPTED
```

Rules:

- Backend stores encrypted payload only in preferred mode.
- Backend does not parse playlist/profile content.
- Backend does not extract channel names, source URLs, provider credentials, logos, groups, or EPG data.
- Backend does not create public/shared playlist catalog.

Frontend copy should avoid:

```txt
Channels
IPTV package
Premium streams
Provider package
```

Preferred copy:

```txt
Profile
Playlist/Profile
Save Profile
Send to Device
```

## 8. License / Payment Status Section

Data source:

```txt
GET /customer-portal/summary
```

Fields:

```txt
license.state
license.allowed
license.freeLaunch
license.paymentRequired
license.message
paymentStatus.state
paymentStatus.paymentRequired
```

Free launch display:

```txt
Access: Free Launch Active
Payment Required: No
```

Future payment placeholder display:

```txt
Payments are not active during free launch.
```

Allowed actions during launch MVP:

```txt
None required
```

Deferred actions:

```txt
Pay
Renew
View payment history
```

Rules:

- Payment enforcement is disabled for launch MVP.
- Missing payment must not block free launch access.
- No card secrets stored by platform.

## 9. Download / Update Section

Data source:

```txt
GET /customer-portal/summary
```

Alternative public endpoints:

```txt
GET /download-metadata
GET /app-version
```

Fields:

```txt
download.platform
download.currentVersion
download.downloadUrl
download.minimumSupportedVersion
download.forceUpdate
device.appVersion
```

Display example:

```txt
Latest Version: 0.1.0
Your Device Version: 0.1.0
```

Allowed actions:

```txt
Download App
Open Install Guide
```

Rules:

- Download official APK only.
- No playlist/channel/source downloads.
- No modified APK links.

## 10. Support / Legal Section

Data source:

```txt
GET /customer-portal/summary
```

Fields:

```txt
support.email
termsVersion
privacyVersion
legalBoundaryVersion, optional
```

Display:

```txt
Support: project@thenightssecret.com
Terms version: 1.0
Privacy version: 1.0
```

Allowed actions:

```txt
Open Support
Open Terms
Open Privacy
Open Legal Boundary
```

Rules:

- Do not ask users to send provider passwords.
- Do not ask users to send full playlist/source contents unless a later safe support workflow is approved.

## 11. Frontend State Model

Required customer portal states:

```txt
loading
login_required
logging_in
ready
saving_profile
profile_saved
profile_save_failed
session_expired
invalid_access
access_disabled
access_blocked
maintenance
feature_disabled
error
```

State behavior:

- `loading`: show minimal loading state.
- `login_required`: show MAC/access key form.
- `ready`: render single-page portal.
- `session_expired`: return to login with calm message.
- `access_disabled` / `access_blocked`: show contact/support message.
- `maintenance`: show maintenance message from remote config.
- `feature_disabled`: hide or disable profile/payment features safely.

## 12. Recommended Minimal Component Map

Frontend components:

```txt
PortalLoginForm
CustomerPortalPage
AccessStatusCard
DeviceStatusCard
ProfileManagerCard
LicensePaymentCard
DownloadUpdateCard
SupportLegalCard
PortalErrorBanner
PortalLoadingState
```

No required components for:

```txt
CustomerRegistrationForm
CustomerProfileSettings
CustomerAddressForm
CustomerTeamSettings
CustomerBillingDetailsPage
```

## 13. Data Refresh Behavior

Recommended behavior:

- Load summary once after login.
- Refresh summary after profile save/sync request.
- Provide manual refresh button for device/license status.
- Avoid noisy polling on the website portal.

Reason:

- Customer may visit only once.
- Portal should remain simple.
- Heavy real-time dashboard behavior is unnecessary.

## 14. Security / Privacy Display Rules

Frontend must not display:

- Raw access key after login.
- Hash values.
- Tokens.
- Session internals.
- Provider credentials.
- Plaintext encrypted payload internals.
- Other customer records.

Frontend may display:

- Masked MAC.
- Access state.
- Device state.
- License state.
- Profile saved metadata.
- Download/update metadata.

## 15. Error Copy

Allowed customer-facing error copy:

```txt
Invalid MAC address or access key.
Your session expired. Please sign in again.
This access is currently disabled. Please contact support.
This device is currently blocked. Please contact support.
Profile could not be saved. Please try again.
Connection issue. Please try again.
```

Avoid:

```txt
MAC exists but key is wrong.
Password hash failed.
Token invalid.
Provider rejected credentials.
Stream URL invalid.
Channel package unavailable.
```

## 16. Stop Conditions

Stop and escalate if frontend mapping adds:

- Required customer email/name registration.
- Multi-page customer account center.
- Provider credential fields.
- Backend stream checker.
- Channel/package marketplace.
- Public playlist catalog.
- Reseller/payment enforcement before approval.

## 17. Acceptance Criteria

M30 is acceptable when:

- The customer portal renders from `GET /customer-portal/summary`.
- Login uses MAC address plus access key only.
- Profile editor uses approved profile storage boundary.
- Device/license/payment/download/support/legal sections are mapped.
- Frontend states are clear.
- No email/name customer registration is required.
- No media-provider UI behavior is introduced.
