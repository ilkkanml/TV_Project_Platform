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
- Customer registration works.
- Customer login works.
- Customer records are stored.
- Device registration / activation records are stored.
- Free launch license/access can be granted.
- App version policy and update metadata can be served.
- Customer dashboard works for basic account/device/access actions.
- Owner dashboard works for launch-critical platform control.

## 3. Simplified Role Rule

The platform role system is intentionally simple.

Active launch MVP roles:

- OWNER: the single site owner/operator.
- CUSTOMER: registered platform user.

Deferred future role:

- RESELLER.

Not part of the product:

- Extra staff role system.
- Support role system.
- Department/task role system.
- Complex organization/team permissions.

Rule:

- The site has one owner/admin: the project owner.
- Customers manage only their own account, devices, activation, and access status.
- Reseller logic is deferred until after launch MVP stability.

## 4. Explicitly Deferred

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

## 5. Platform Launch MVP Scope

The first platform launch MVP includes:

### Website

- Home page.
- Download page.
- Install guide.
- Support page.
- Legal boundary page.
- Terms page.
- Privacy page.

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

### Customer Account

- Customer registration.
- Customer login.
- Customer profile/account record.
- Customer dashboard access.

### Device / Activation

- Device registration record.
- Activation session record.
- Device linked to customer.
- Device status.
- Last seen/check metadata.

### License / Free Launch Access

- Free launch license state.
- License/access record linked to customer/device.
- Access check state.
- Payment required remains false during free launch.

### App Update / Version Policy

- Current recommended version.
- Minimum supported version.
- Force update flag.
- Release notes.
- Update/download URL.

### Customer Dashboard

- Account overview.
- My devices.
- Activation status.
- License/access status.
- Download/install guidance.
- Basic support/diagnostics guidance.

### Owner Dashboard

- Customer records.
- Device records.
- License/access records.
- Download metadata.
- App version/update metadata.
- Remote config.
- Legal/Terms/Privacy versions.
- Audit logs.
- Emergency controls.

## 6. Platform Does Not Own Android UX

`TV_Project_Platform` owns policy, website, database, API contract, dashboard, customer/device/license records, download metadata, and owner control.

`TV_Project` owns Android app screens, player behavior, local profile/source UX, first-run screens, and APK implementation.

Shared values must be synchronized through `docs/PLATFORM_CLIENT_SYNC_PROTOCOL.md`.

## 7. Launch MVP Success Criteria

M25 is successful when:

- The official website can be published.
- A user can download the first APK from the official website.
- A customer can register and log in.
- The platform can store customer records.
- The platform can store device activation/registration records.
- The platform can grant free launch license/access.
- The app can read version/update metadata.
- The customer dashboard can show account, device, and access status.
- The owner dashboard can manage launch-critical platform records.
- Reseller/payment enforcement is not required for launch MVP.
- No extra staff/task role system is introduced.

## 8. Stop Conditions

Stop and escalate if a task tries to add:

- Reseller implementation before launch MVP stability.
- Paid access enforcement before free launch ends.
- Extra staff/support/department role system.
- Channel/package/content/provider features.
- Android app UX implementation inside platform scope.
- Backend source/playlist/provider storage.

## 9. Next Recommended Work Order

1. Website launch page map final.
2. Download metadata model.
3. Customer registration/login model.
4. Customer dashboard MVP pages.
5. Owner dashboard MVP pages.
6. Device registration/activation database model.
7. Free launch license/access model.
8. App version/update metadata model.
9. Platform-client shared contract check.
10. Implementation planning only after explicit approval.
