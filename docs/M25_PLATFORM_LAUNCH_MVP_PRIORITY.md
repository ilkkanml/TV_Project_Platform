# M25 Platform Launch MVP Priority

Status: Active

## 1. Purpose

M25 records the current active priority for `TV_Project_Platform`.

The immediate goal is not reseller expansion.

The immediate goal is to make the official website and platform MVP usable for the first public/free release.

## 2. Current Active Priority

The current platform priority is:

- Official website goes live.
- First app version can be downloaded from the official website.
- Customer/device access works with Device ID plus Activation Key.
- No customer email/name registration is required for launch MVP.
- Customer access records are stored.
- Device registration / activation records are stored.
- Free launch license/access can be granted.
- App version policy and update metadata can be served.
- Single-page customer portal works for basic device/profile/access/payment-status actions.
- Owner dashboard works for launch-critical platform control.

## 3. Naming Correction

The launch MVP must use the same naming as `TV_Project`.

Approved shared terms:

- `deviceId`
- `activationKey`

Do not use these terms as primary product/contract names:

- MAC address
- access key

Rule:

- Older notes that say MAC address plus access key must be interpreted as Device ID plus Activation Key.
- New planning, API, UI, and database wording must use Device ID plus Activation Key.

## 4. Simplified Role Rule

The platform role system is intentionally simple.

Active launch MVP roles:

- OWNER: the single site owner/operator.
- CUSTOMER_ACCESS: device/customer portal access based on Device ID plus Activation Key.

Deferred future role:

- RESELLER.

Not part of the product:

- Extra staff role system.
- Support role system.
- Department/task role system.
- Complex organization/team permissions.
- Email/name based customer account system for launch MVP.

Rule:

- The site has one owner/admin: the project owner.
- Customers use Device ID plus Activation Key to access their minimal portal.
- Customers manage only their own linked device/profile/access/payment-status area.
- Reseller logic is deferred until after launch MVP stability.

## 5. Explicitly Deferred

These are deferred until the launch MVP foundation is stable:

- Reseller panel.
- Reseller onboarding.
- Reseller credit sales.
- Credit ledger operations.
- Reseller commissions.
- Reseller pricing rules.
- Advanced reseller abuse/fraud workflows.
- Advanced analytics.
- Payment enforcement.

Reseller architecture remains documented for later, but it is not part of the immediate launch MVP.

## 6. Platform Launch MVP Scope

The first platform launch MVP includes:

### Website

- Home page.
- Download page.
- Install guide.
- Support page.
- Legal boundary page.
- Terms page.
- Privacy page.
- Single-page customer portal.
- Owner login/dashboard.

### Download System

- Official APK download metadata.
- Current version.
- Release notes.
- APK URL.
- Download enabled/disabled state.
- Minimum supported version.
- Recommended version.
- Force update flag.
- Emergency download disable.

### Customer Access

- Device ID plus Activation Key login.
- Activation Key hash storage only.
- Customer access/profile record.
- Single-page customer portal access.
- No required email.
- No required name.
- No required phone.
- No required address.

### Device / Activation

- Device registration record.
- Device ID / platform identifier record.
- Activation session record if needed by app flow.
- Device linked to customer access record.
- Device status.
- Last seen/check metadata.

### License / Free Launch Access

- Free launch license state.
- License/access record linked to customer access/device.
- Access check state.
- Payment required remains false during free launch.

### App Update / Version Policy

- Current recommended version.
- Minimum supported version.
- Force update flag.
- Release notes.
- Update/download URL.

### Single-Page Customer Portal

- Account/access status.
- Device ID status.
- Playlist/profile manager.
- License/payment status.
- Download/update guidance.
- Support/legal links.

### Owner Dashboard

- Customer access records.
- Device records.
- License/access records.
- Download metadata.
- App version/update metadata.
- Remote config.
- Legal/Terms/Privacy versions.
- Audit logs.
- Emergency controls.

## 7. Platform Does Not Own Android UX

`TV_Project_Platform` owns policy, website, database, API contract, dashboard, customer/device/license records, download metadata, and owner control.

`TV_Project` owns Android app screens, player behavior, local profile/source UX, first-run screens, and APK implementation.

Shared values must be synchronized through `docs/PLATFORM_CLIENT_SYNC_PROTOCOL.md`.

## 8. Launch MVP Success Criteria

M25 is successful when:

- The official website can be published.
- A user can download the first APK from the official website.
- A customer can enter Device ID plus Activation Key and open the single-page portal.
- The platform can store customer access records without requiring email/name.
- The platform can store device activation/registration records.
- The platform can grant free launch license/access.
- The app can read version/update metadata.
- The customer portal can show device, profile, access, and payment-status basics.
- The owner dashboard can manage launch-critical platform records.
- Reseller/payment enforcement is not required for launch MVP.
- No extra staff/task role system is introduced.

## 9. Stop Conditions

Stop and escalate if a task tries to add:

- Mandatory customer email/name registration for launch MVP.
- MAC address as the primary customer portal identifier.
- Reseller implementation before launch MVP stability.
- Paid access enforcement before free launch ends.
- Extra staff/support/department role system.
- Channel/package/content/provider features.
- Android app UX implementation inside platform scope.
- Backend source/provider credential storage.

## 10. Next Recommended Work Order

1. Single-page customer portal data model.
2. Device ID plus Activation Key auth model.
3. Playlist/profile storage boundary.
4. Device registration/activation database model.
5. Free launch license/access model.
6. Payment placeholder/status model.
7. App version/update metadata model.
8. Owner dashboard MVP pages.
9. Platform-client shared contract check.
10. Implementation planning only after explicit approval.
