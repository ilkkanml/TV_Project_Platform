# M28 Owner Dashboard MVP Page Map

Status: Active Draft
Mode: Planning only. No hosting, live database, production deploy, or heavy implementation work until explicitly re-approved.

## 1. Purpose

M28 defines the minimum owner dashboard for the first platform launch MVP.

There is only one site owner/admin for launch MVP.

The owner dashboard exists to manage:

- Customer access records.
- MAC/access key control.
- Devices.
- Free launch license/access state.
- APK download metadata.
- App version/update policy.
- Remote config.
- Legal/Terms/Privacy versions.
- Audit logs.
- Emergency controls.

It must not become a staff/task system, reseller system, or media-provider dashboard.

## 2. Active Owner Dashboard Pages

Launch MVP owner dashboard pages:

1. Overview
2. Customer Access
3. Devices
4. Licenses / Free Launch Access
5. Profile Manager Control
6. Download Management
7. App Version / Update Policy
8. Remote Config
9. Legal / Terms / Privacy Versions
10. Audit Logs
11. Emergency Controls

No separate staff/admin/support pages are required.

No reseller pages are required for launch MVP.

## 3. Page: Overview

Purpose:

- Show launch-critical platform health at a glance.

Display:

- Total customer access records.
- Active customer access records.
- Total devices.
- Active devices.
- Revoked/blocked devices.
- Free launch enabled status.
- Current recommended app version.
- Download enabled status.
- Maintenance mode status.

Allowed actions:

- Quick link to Customer Access.
- Quick link to Download Management.
- Quick link to Emergency Controls.

Forbidden:

- Content/channel/provider statistics.
- Watch history analytics.
- Stream health dashboard.

## 4. Page: Customer Access

Purpose:

- Manage MAC address plus access key customer portal access.

Display columns:

- Masked/normalized MAC.
- Status.
- Device count.
- License state.
- Profile status.
- Last portal login.
- Created date.

Allowed actions:

- Create customer access record.
- Generate access key.
- Reset access key.
- Disable access.
- Restore access.
- Block access.
- Open linked devices.
- Open linked license/access record.

Rules:

- Raw access key is shown only once at generation/reset time.
- Store only accessKeyHash.
- Owner must not see raw access key after generation/reset.
- No required customer name/email fields.

Forbidden:

- Provider username/password fields.
- Playlist/source ownership proof.
- Customer watch history.

## 5. Page: Devices

Purpose:

- Manage registered device records.

Display columns:

- Device ID.
- Masked/normalized MAC.
- Platform.
- App version.
- Device status.
- License state.
- Last seen.
- Linked customer access record.

Allowed actions:

- View device details.
- Link/unlink to customer access record if safe.
- Revoke device.
- Restore device.
- Block device.
- Add owner note.

Forbidden:

- Stream testing.
- Channel testing.
- Provider account validation.
- Playback history inspection.

## 6. Page: Licenses / Free Launch Access

Purpose:

- Manage access/license state without payment enforcement during free launch.

Display columns:

- Customer access record.
- Device.
- License state.
- Free launch flag.
- Payment required flag.
- Valid from.
- Valid until, optional.
- Last checked.

Allowed actions:

- Grant free launch access.
- Restore active access.
- Suspend access.
- Block access.
- Clear/adjust message.

Rules:

- Payment required remains false during free launch.
- License/access does not verify media/source/provider permission.

Forbidden:

- Channel package entitlement.
- Provider-based license state.
- Stream access validation.

## 7. Page: Profile Manager Control

Purpose:

- Control whether customer portal profile editing is enabled.

Display:

- Profile manager enabled/disabled.
- Supported profile mode.
- Total saved profiles, metadata only.
- Last profile save activity.

Allowed actions:

- Enable profile manager.
- Disable profile manager.
- Set profile mode: CLIENT_ENCRYPTED / LOCAL_ONLY / DISABLED.
- View profile metadata.

Rules:

- Preferred mode is CLIENT_ENCRYPTED.
- Owner dashboard must not parse encrypted profile payload.
- Owner dashboard must not turn customer profiles into a playlist catalog.

Forbidden:

- Plaintext provider password viewer.
- Channel list browser.
- Shared playlist library.
- Source scraping tool.

## 8. Page: Download Management

Purpose:

- Manage official APK download metadata shown on the website.

Display fields:

- Platform.
- Current version.
- File name.
- Download URL.
- File size.
- SHA-256 checksum.
- Release date.
- Release notes.
- Download enabled.

Allowed actions:

- Add/update APK metadata.
- Enable/disable download.
- Update release notes.
- Update checksum.
- Mark current version.
- Emergency disable download.

Rules:

- Download metadata is for official app APKs only.
- APK signing key/secrets must never be stored here.

Forbidden:

- Playlist downloads.
- Channel package downloads.
- Provider list downloads.
- Modified/unofficial APK promotion.

## 9. Page: App Version / Update Policy

Purpose:

- Control version policy served to apps and website.

Display fields:

- Platform.
- Current recommended version.
- Minimum supported version.
- Force update flag.
- Update URL.
- Channel.
- Enabled status.
- Release notes.

Allowed actions:

- Set recommended version.
- Set minimum supported version.
- Enable/disable force update.
- Update release notes.
- Enable/disable platform version record.

Rules:

- Force update must be conservative.
- Version policy must not carry media/source/provider data.

## 10. Page: Remote Config

Purpose:

- Manage safe runtime platform/client flags.

Allowed config areas:

- Free launch flag.
- Maintenance flag/message.
- Feature flags.
- Support email/link.
- Legal/Terms/Privacy version IDs.
- Safe polling intervals.
- Emergency flags.

Forbidden config values:

- Stream URLs.
- Channel packages.
- Provider credentials.
- Scraped source metadata.
- Playlist/source catalog data.

Allowed actions:

- Edit safe config key.
- Enable/disable config key.
- Roll back config key if supported.

Rules:

- Remote config changes must be audited.
- Dangerous/emergency config changes should require reason note.

## 11. Page: Legal / Terms / Privacy Versions

Purpose:

- Manage public policy/version metadata.

Display:

- Terms version.
- Privacy version.
- Legal boundary version.
- Effective date.
- Published status.

Allowed actions:

- Update policy version metadata.
- Publish version.
- Archive older version.
- Mark app/customer portal re-acceptance required if needed.

Rules:

- Platform owns policy/version text.
- Android/client owns screen implementation.
- Shared version values must sync through PLATFORM_CLIENT_SYNC_PROTOCOL.

## 12. Page: Audit Logs

Purpose:

- View operational/security history.

Display columns:

- Time.
- Actor type.
- Actor ID.
- Action.
- Target type.
- Target ID.
- Result.
- Reason note, if present.

Allowed filters:

- Action.
- Date.
- Target type.
- Actor type.

Rules:

- Audit logs must redact secrets.
- Audit logs must not contain raw access keys.
- Audit logs must not contain provider credentials.
- Audit logs must not contain plaintext playlist/profile payloads.

## 13. Page: Emergency Controls

Purpose:

- Give owner launch-critical shutdown/safety controls.

Allowed controls:

- Enable maintenance mode.
- Disable new customer access creation.
- Disable customer portal login.
- Disable device registration.
- Disable license grants.
- Disable profile manager.
- Disable APK download.
- Force read-only mode.

Rules:

- Emergency controls require confirmation.
- Emergency controls require reason note.
- Emergency controls must be audited.

Forbidden:

- Emergency controls must not inject content/source/provider data.

## 14. Deferred Owner Dashboard Areas

Deferred until after launch MVP stability:

- Reseller management.
- Reseller credit ledger.
- Payment enforcement.
- Subscription billing portal.
- Advanced analytics.
- Support ticketing.
- Multi-admin/staff permissions.
- Team/organization management.

## 15. Minimal Navigation

Owner dashboard navigation:

```txt
Overview
Customer Access
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

Keep labels short.

Do not expose unnecessary product complexity.

## 16. Stop Conditions

Stop and escalate if owner dashboard starts adding:

- Staff role/task management.
- Reseller implementation before launch MVP stability.
- Paid access enforcement before approval.
- Channel/package/content/provider management.
- Stream testing tools.
- Plaintext playlist/source browsing.
- Customer email/name requirement as mandatory launch flow.

## 17. Acceptance Criteria

M28 is acceptable when:

- Owner can manage launch-critical platform records.
- Customer access is MAC plus access key based.
- Device/license/free launch management is clear.
- Download/version/remote config controls exist.
- Legal/policy version control exists.
- Audit and emergency controls exist.
- No extra staff/task role system is introduced.
- No media-provider dashboard behavior is introduced.
