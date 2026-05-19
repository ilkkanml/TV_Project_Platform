# M26 Single-Page Customer Portal Model

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M26 defines the minimum customer-facing portal for the later platform launch MVP.

EA0 can start before this portal exists.

When enabled later, the customer is expected to visit the website rarely, possibly only once, to:

- Enter Device ID plus Activation Key.
- View device/access status.
- Edit/save playlist/profile area if enabled.
- See license/payment status.
- Download/update app if needed.

The portal must stay simple, single-page, and low-friction.

## 2. Access Model

Customer portal access uses:

- Device ID.
- Activation Key.

No launch MVP requirement for:

- Customer name.
- Customer email.
- Phone number.
- Address.
- Full account profile.
- Multi-page customer account area.

Rules:

- Device ID is the public lookup identifier.
- Activation Key must be verified against `activationKeyHash`.
- Raw Activation Key must not be stored in database.
- Raw Activation Key must not be logged.
- Failed attempts must be rate-limited.
- Session must expire.

## 3. EA0 Relationship

EA0 may operate before the portal.

EA0 creates records through:

```txt
POST /devices/bootstrap
POST /license/check
```

Later customer portal reads the same records.

The portal must not force new Device IDs or new Activation Keys for existing EA0 users unless reset/recovery is required.

## 4. Page Structure

The customer portal is one page.

Required sections:

1. Access Status
2. Device Status
3. Playlist / Profile Manager
4. License / Payment Status
5. Download / Update
6. Support / Legal

No sidebar is required for launch MVP.

No complex dashboard navigation is required for launch MVP.

## 5. Section: Access Status

Purpose:

- Show whether the customer/device access record is active.

Displayed fields:

- Access status.
- Masked Device ID.
- Free launch status.
- Last portal login, optional.

Example states:

- `active`
- `disabled`
- `under_review`
- `blocked`

Rules:

- Do not display raw secrets.
- Do not display full Activation Key.
- Do not expose owner/admin notes unless explicitly safe.

## 6. Section: Device Status

Purpose:

- Show the linked device state.

Displayed fields:

- Device status.
- Platform.
- App version.
- Last seen/check time.
- License/access state.

Example states:

- `active`
- `pending`
- `revoked`
- `blocked`

Rules:

- The device section does not manage playback sources.
- The device section does not test channels/streams/providers.

## 7. Section: Playlist / Profile Manager

Purpose:

- Let the customer manage their own playlist/profile area if enabled.

Approved launch MVP options:

- `CLIENT_ENCRYPTED`
- `LOCAL_ONLY`
- `DISABLED`

Preferred mode:

- `CLIENT_ENCRYPTED`

In preferred mode:

- The portal may save an encrypted profile payload.
- Backend stores encrypted payload only.
- Backend does not parse or validate playlist contents.
- Backend does not extract streams, providers, channels, logos, groups, or EPG data.

Displayed controls:

- Edit profile.
- Save profile.
- Send/sync to device, optional.
- Last saved time.

Rules:

- No public/shared playlist catalog.
- No backend-visible provider credential fields.
- No stream testing from backend.
- No source scraping.
- No content/package selling.

## 8. Section: License / Payment Status

Purpose:

- Show whether the customer/device currently has access.

Free launch display:

- Access: Free Launch Active.
- Payment required: No.

Future paid display, deferred:

- Payment required.
- Pay/Renew button.
- Payment status.
- Expiration/renewal date.

Launch MVP rules:

- Payment enforcement is disabled until explicitly approved.
- Missing payment must not block free launch access.
- Payment UI may exist only as placeholder/status if explicitly enabled.
- No card secrets are stored by the platform.
- Future payment must attach to existing Device ID / Activation Key records.

Initial payment states:

- `FREE_LAUNCH`
- `NOT_REQUIRED`
- `PAYMENT_DISABLED`
- `ACTIVE_LATER`
- `EXPIRED_LATER`

## 9. Section: Download / Update

Purpose:

- Help the customer get or update the app.

Displayed fields:

- Current recommended version.
- Minimum supported version.
- Customer/device app version if known.
- Download button.
- Install guide link.
- Update required / update available message.

Rules:

- Download is for official APK only.
- No playlist/channel/source package downloads.
- No modified APK promotion.

## 10. Section: Support / Legal

Purpose:

- Provide minimal help and policy visibility.

Displayed fields:

- Support email.
- Terms version.
- Privacy version.
- Legal boundary link.

Rules:

- Support copy must not ask customers to send provider passwords.
- Support copy must not ask customers to send full playlist/source contents unless a later safe support workflow is explicitly approved.

## 11. Customer Portal Summary Shape

`GET /customer-portal/summary` should provide enough data to render the full single page.

Recommended response shape:

```json
{
  "customerAccessId": "...",
  "deviceAccessRecordId": "...",
  "accessStatus": "active",
  "deviceIdMasked": "NX-****-1234",
  "device": {
    "status": "active",
    "platform": "android_tv",
    "appVersion": "0.1.0",
    "lastSeenAt": "..."
  },
  "license": {
    "state": "free_launch_active",
    "allowed": true,
    "freeLaunch": true,
    "paymentRequired": false,
    "message": "Free launch access is active."
  },
  "paymentStatus": {
    "state": "FREE_LAUNCH",
    "paymentRequired": false
  },
  "profileStatus": {
    "profileMode": "CLIENT_ENCRYPTED",
    "hasProfile": true,
    "lastUpdatedAt": "..."
  },
  "download": {
    "platform": "android_tv",
    "currentVersion": "0.1.0",
    "downloadUrl": "...",
    "minimumSupportedVersion": "0.1.0",
    "forceUpdate": false
  },
  "support": {
    "email": "project@thenightssecret.com"
  },
  "termsVersion": "1.0",
  "privacyVersion": "1.0"
}
```

Rules:

- Summary must not include raw Activation Key.
- Summary must not include activationKeyHash.
- Summary must not include provider credentials.
- Summary must not include plaintext stream URLs unless a later explicit decision changes profile storage mode.
- Summary must not include other customer records.

## 12. Owner Controls For Customer Portal

OWNER may later:

- Create device/customer access record by Device ID.
- Generate/reset Activation Key.
- Disable/restore/block customer access.
- View linked device status.
- View license/access state.
- Update license/access state.
- View profile metadata only.
- Enable/disable profile manager feature.

OWNER must not:

- See raw Activation Key after generation/reset/recovery.
- See activationKeyHash.
- See plaintext provider passwords.
- Use dashboard as channel/source/content management.
- Browse customer playlist contents as a media catalog.

## 13. UX Direction

The portal should feel like a simple utility page, not a full SaaS dashboard.

Preferred UX:

- One page.
- Clear status cards.
- Minimal text.
- Large primary actions.
- No marketing clutter after login.
- No unnecessary account settings.

Avoid:

- Multi-page profile settings.
- Complex user account forms.
- Social/profile features.
- Usage analytics for what the user watches.
- Channel/provider/source language.

## 14. Stop Conditions

Stop and escalate if the portal starts adding:

- Required email/name registration.
- MAC address as the primary product/contract identifier.
- Provider credential collection.
- Plaintext playlist/source database as product feature.
- Channel/package catalog.
- Stream testing from backend.
- Reseller/payment enforcement before approval.
- Multi-role staff/customer support dashboard complexity.

## 15. Acceptance Criteria

M26 is acceptable when:

- Customer portal is single-page.
- Device ID plus Activation Key is the only required customer entry method.
- Customer can view device/access/license/payment-status basics.
- Customer can manage playlist/profile only within approved storage boundary.
- Download/update info is visible.
- Support/legal links are visible.
- No customer email/name requirement exists.
- No media-provider behavior is introduced.
