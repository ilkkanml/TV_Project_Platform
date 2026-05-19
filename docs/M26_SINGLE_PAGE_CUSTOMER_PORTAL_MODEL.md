# M26 Single-Page Customer Portal Model

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M26 defines the minimum customer-facing portal for the first platform launch MVP.

The customer is expected to visit the website rarely, possibly only once, to:

- Enter MAC address plus access key.
- View device/access status.
- Edit/save playlist/profile area.
- See license/payment status.
- Download/update app if needed.

The portal must stay simple, single-page, and low-friction.

## 2. Access Model

Customer portal access uses:

- MAC address / normalized device identifier.
- Access key / customer key.

No launch MVP requirement for:

- Customer name.
- Customer email.
- Phone number.
- Address.
- Full account profile.
- Multi-page customer account area.

Rules:

- MAC address must be normalized before lookup.
- Access key must be verified against `accessKeyHash`.
- Raw access key must not be stored.
- Failed attempts must be rate-limited.
- Session must expire.

## 3. Page Structure

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

## 4. Section: Access Status

Purpose:

- Show whether the customer access record is active.

Displayed fields:

- Access status.
- Masked MAC/device identifier.
- Free launch status.
- Last portal login, optional.

Example states:

- `active`
- `disabled`
- `under_review`
- `blocked`

Rules:

- Do not display raw secrets.
- Do not display access key.
- Do not expose owner/admin notes unless explicitly safe.

## 5. Section: Device Status

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

## 6. Section: Playlist / Profile Manager

Purpose:

- Let the customer manage their own playlist/profile area.

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

## 7. Section: License / Payment Status

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

- Payment enforcement is disabled.
- Missing payment must not block free launch access.
- Payment UI may exist only as placeholder/status if explicitly enabled.
- No card secrets are stored by the platform.

Initial payment states:

- `FREE_LAUNCH`
- `NOT_REQUIRED`
- `PAYMENT_DISABLED`
- `ACTIVE_LATER`
- `EXPIRED_LATER`

## 8. Section: Download / Update

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

## 9. Section: Support / Legal

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

## 10. Customer Portal Summary Shape

`GET /customer-portal/summary` should provide enough data to render the full single page.

Recommended response shape:

```json
{
  "customerAccessId": "...",
  "accessStatus": "active",
  "normalizedMacMasked": "AA:BB:**:**:**:FF",
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

- Summary must not include raw access key.
- Summary must not include provider credentials.
- Summary must not include plaintext stream URLs unless a later explicit decision changes profile storage mode.
- Summary must not include other customer records.

## 11. Owner Controls For Customer Portal

OWNER may:

- Create customer access record by MAC.
- Generate/reset access key.
- Disable/restore/block customer access.
- View linked device status.
- View license/access state.
- Update license/access state.
- View profile metadata only.
- Enable/disable profile manager feature.

OWNER must not:

- See raw access key after generation/reset.
- See plaintext provider passwords.
- Use dashboard as channel/source/content management.
- Browse customer playlist contents as a media catalog.

## 12. UX Direction

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

## 13. Stop Conditions

Stop and escalate if the portal starts adding:

- Required email/name registration.
- Provider credential collection.
- Plaintext playlist/source database as product feature.
- Channel/package catalog.
- Stream testing from backend.
- Reseller/payment enforcement before approval.
- Multi-role staff/customer support dashboard complexity.

## 14. Acceptance Criteria

M26 is acceptable when:

- Customer portal is single-page.
- MAC plus access key access is the only required customer entry method.
- Customer can view device/access/license/payment-status basics.
- Customer can manage playlist/profile only within approved storage boundary.
- Download/update info is visible.
- Support/legal links are visible.
- No customer email/name requirement exists.
- No media-provider behavior is introduced.
