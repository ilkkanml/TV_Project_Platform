# M32 EA0 to Paid License Transition

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, payment enforcement, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M32 defines how early access device records created during EA0 can later continue into paid licensing without forcing customers to recreate their access identity.

The goal is simple:

- Start free early access now.
- Collect device/customer access records from the first app users.
- Keep Device ID plus Activation Key stable.
- Later enable payment/license enforcement on the same records.
- Avoid forcing customers to reinstall, re-register, or receive new activation credentials unless reset/recovery is needed.

## 2. Core Decision

Approved transition model:

```txt
EA0 free access records become future paid license records.
```

Meaning:

- `deviceId` stays the primary public device/customer identifier.
- `activationKey` stays the device/customer secret.
- Database stores only `activationKeyHash`.
- Free launch fields change later into paid license fields.
- Customers continue with the same app identity.

## 3. EA0 Record Today

EA0 record shape:

```txt
DeviceAccessRecord
- id
- deviceId
- platformDeviceHash
- activationKeyHash
- activationKeyHint
- platform
- appVersion
- status
- licenseState
- freeLaunch
- paymentRequired
- firstSeenAt
- lastSeenAt
- createdAt
- updatedAt
```

Typical EA0 values:

```txt
status = active
licenseState = free_launch_active
freeLaunch = true
paymentRequired = false
```

## 4. Paid Phase Record Later

When payment enforcement is approved later, the same record can gain or map to payment/license fields:

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

Typical paid values after transition:

```txt
freeLaunch = false
paymentRequired = true or false depending on payment state
licenseState = active / expired / suspended
paidUntil = date
```

## 5. Customer Continuity Rule

Customers should not need new credentials when paid licensing starts.

The same values remain valid:

```txt
deviceId
activationKey
```

The app continues to call:

```txt
POST /license/check
```

with:

```txt
deviceId
activationKey
platform
appVersion
```

Only the license response behavior changes according to payment state.

## 6. Free Launch Behavior

During free launch:

```json
{
  "allowed": true,
  "state": "free_launch_active",
  "freeLaunch": true,
  "paymentRequired": false
}
```

Rules:

- Payment absence does not block access.
- No payment UI is required in the app.
- Customer portal/payment flow can remain disabled.

## 7. Paid Transition Behavior

When paid licensing is enabled later:

Unpaid or expired customer:

```json
{
  "allowed": false,
  "state": "expired",
  "freeLaunch": false,
  "paymentRequired": true,
  "message": "Please activate your license."
}
```

Paid customer:

```json
{
  "allowed": true,
  "state": "active",
  "freeLaunch": false,
  "paymentRequired": false,
  "message": "License active."
}
```

Rules:

- Device ID does not change.
- Activation Key does not change unless reset/recovery is needed.
- License state changes on the backend.
- App reacts to `allowed`, `state`, and `paymentRequired`.

## 8. Payment Portal Connection Later

When customer portal/payment is enabled later, customer enters:

```txt
Device ID
Activation Key
```

Portal then loads the matching record and allows payment/renewal.

Payment success updates the same underlying access/license record:

```txt
licenseState = active
paymentRequired = false
paidUntil = ...
lastPaymentAt = ...
```

No email/name is required unless a later approved payment provider flow requires optional receipt/contact handling.

## 9. App Requirements For Future Compatibility

TV_Project should implement license check in a future-proof way.

The app must respect:

```txt
allowed
state
freeLaunch
paymentRequired
message
```

The app must not hardcode:

```txt
Free forever
Always allowed
No paid state possible
```

The app may show future-safe states such as:

```txt
Free launch active
License active
License expired
Payment required
Device blocked
Connection issue
```

## 10. Database Migration Direction

EA0 compact record can later split into:

```txt
CustomerAccess
Device
LicenseGrant
PaymentStatus / Subscription
```

Mapping:

```txt
DeviceAccessRecord.deviceId -> CustomerAccess.deviceId / Device.deviceId
DeviceAccessRecord.activationKeyHash -> CustomerAccess.activationKeyHash
DeviceAccessRecord.platformDeviceHash -> Device.platformDeviceHash
DeviceAccessRecord.status -> CustomerAccess.status / Device.status
DeviceAccessRecord.licenseState -> LicenseGrant.state
DeviceAccessRecord.freeLaunch -> LicenseGrant.freeLaunch
DeviceAccessRecord.paymentRequired -> LicenseGrant.paymentRequired
DeviceAccessRecord.lastSeenAt -> Device.lastSeenAt
```

Rule:

- Do not discard EA0 records when paid licensing starts.
- Do not force customers into a new identity system.
- Add payment/license tables around existing records.

## 11. Owner Controls Later

Owner should later be able to:

- View EA0 device/access records.
- See which devices are free launch active.
- Toggle free launch globally.
- Convert records to paid-required state.
- Grant manual active license.
- Suspend/block/revoke devices.
- Reset Activation Key if needed.
- See payment status when payment provider is connected.

Owner should not see:

- Raw Activation Key after generation/recovery.
- Activation Key hash.
- Provider credentials.
- Playlist/source contents.

## 12. Customer Communication Later

When paid licensing begins, customer-facing message should be simple:

```txt
Your free launch access has ended.
Please activate your license to continue using Nexora.
```

Avoid:

```txt
Your IPTV package expired.
Your channels are locked.
Provider subscription required.
```

## 13. Stop Conditions

Stop and escalate if paid transition planning requires:

- Replacing all EA0 Device IDs.
- Replacing all Activation Keys by default.
- Mandatory customer email/name registration for existing users.
- App reinstall requirement.
- Payment enforcement before explicit approval.
- Channel/package/content/provider entitlement.
- Provider credential collection.

## 14. Acceptance Criteria

M32 is acceptable when:

- EA0 records can become paid license records later.
- Device ID plus Activation Key remain stable.
- Payment can attach to existing records.
- License check can change behavior without app identity reset.
- Free launch users become future customers without database restart.
- No media-provider behavior is introduced.
