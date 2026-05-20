# M48 EA0 Download-Only Early Access Preparation Task Group F

Status: Active Draft
Mode: Release preparation planning only. No public APK publishing, no production deploy, no payment enforcement, no reseller workflow until explicitly approved.

## 1. Purpose

M48 completes Task Group F from M38.

This group prepares the download-only early access release path after EA0 backend/database/app alignment is ready.

Goal:

```txt
Prepare early access APK distribution without requiring the full website/customer portal first.
```

## 2. Scope

This group covers:

- APK download path decision checklist.
- Version metadata update plan.
- Release notes draft.
- Install guide outline.
- Early access support copy.
- Public release gate.

This group does not execute:

- Public APK publishing.
- Production deploy.
- Payment enforcement.
- Customer portal launch.
- Reseller launch.

## 3. EA0 Release Shape

EA0 release shape:

```txt
APK is distributed directly or through a simple download page/path.
App starts.
App calls platform backend.
Backend creates Device ID + Activation Key.
App stores credentials locally.
License check returns free_launch_active.
Database records begin forming.
```

No customer portal is required for EA0.

No email/name customer account is required for EA0.

## 4. APK Download Path Decision Checklist

Choose one approved path before public release:

```txt
Direct controlled APK link
Temporary simple download page
Private tester distribution link
```

Required before enabling link:

```txt
APK file exists
APK version matches AppVersion seed
APK package/signing is stable for EA0
Backend staging smoke test passed
License check works
Remote config works
Support copy is ready
```

Rules:

- Do not publish APK before backend smoke test passes.
- Do not publish APK if Device ID / Activation Key bootstrap is not working.
- Do not publish APK if raw Activation Key appears in logs/database.

## 5. AppVersion Metadata Update Plan

Before release, update AppVersion record:

```txt
platform = android_tv
version = actual APK version
channel = ea0
currentRecommended = true
minimumSupported = actual APK version or lower approved version
updateUrl = approved APK download URL
forceUpdate = false
enabled = true
releaseNotes = EA0 free launch build
```

Rules:

- `forceUpdate` remains false unless update flow is tested.
- `updateUrl` must point only to official APK.
- No playlist/source/provider package URL is allowed.

## 6. RemoteConfig Release Check

Before release, confirm:

```txt
freeLaunch.enabled = true
maintenance.enabled = false
features.licenseCheck.enabled = true
features.deviceBootstrap.enabled = true
features.diagnostics.enabled = true
features.support.enabled = true
emergency.disableDeviceBootstrap = false
emergency.disableLicenseGranting = false
```

Rules:

- Remote config must not include source/content/provider values.
- Emergency flags must be ready before public users enter.

## 7. Release Notes Draft

Recommended EA0 release notes:

```txt
EA0 Free Launch Build

This early access build enables first device activation, free launch access, app version checks, and platform connectivity testing.

Customer portal, payment, and reseller features are not active yet.
```

Avoid wording:

```txt
Free forever
Included channels
IPTV package
Premium streams
Provider access
```

## 8. Install Guide Outline

Minimum install guide should explain:

```txt
1. Download official APK.
2. Install on Android TV / Fire TV device.
3. Open app.
4. App will activate automatically during free launch.
5. Keep app installed to preserve local activation credentials.
6. Contact support if device activation fails.
```

Optional caution:

```txt
If the app is uninstalled, activation recovery is best-effort and may require support later.
```

## 9. Support Copy

Recommended support copy:

```txt
If activation fails, send your Device ID and app version to support.
Do not send provider passwords or private playlist/source data.
```

Support may ask for:

```txt
Device ID
App version
Platform
Error message
Approximate time of issue
```

Support must not ask for:

```txt
Activation Key
provider password
playlist/source contents
stream URLs
```

## 10. Public Release Gate

EA0 APK download must not go public until all pass:

```txt
Database schema validation passed
AppVersion seed ready
RemoteConfig seed ready
/health passed
/app-version passed
/remote-config passed
/devices/bootstrap passed
/license/check passed
Fresh install test passed
Repeated launch test passed
Invalid credential test passed
Log redaction test passed
Future paid compatibility test passed
```

## 11. Rollback / Emergency Plan

Before release, owner/platform must be able to:

```txt
Disable APK download link
Enable maintenance mode
Disable device bootstrap
Disable license granting
Block/revoke bad device records later
Update app version metadata
Update support message
```

Rules:

- Emergency controls must not inject content/provider/source data.
- Public rollback should preserve existing DeviceAccessRecord data.

## 12. Metrics To Watch During EA0

Watch only platform-safe operational metrics:

```txt
number of DeviceAccessRecord records
bootstrap success/failure count
license check success/failure count
appVersion distribution
lastSeenAt activity
rate-limit events
blocked/revoked counts
```

Do not track:

```txt
watch history
streams viewed
provider/source contents
playlist contents
channel usage
```

## 13. Future Paid Continuity Check

Before release, confirm the app and backend do not hardcode:

```txt
free forever
paymentRequired always false
always allowed
```

Future paid response must remain possible:

```txt
allowed = false
state = expired
freeLaunch = false
paymentRequired = true
message = Please activate your license.
```

## 14. Stop Conditions

Stop if release preparation includes:

- Public APK link before smoke test.
- Customer email/name requirement for EA0.
- MAC as primary identity.
- Payment blocking during EA0.
- Reseller flow.
- Source/content/provider package delivery.
- Activation Key shown in support copy.
- Raw Activation Key logged or stored.

## 15. Group F Done Criteria

Task Group F is complete when:

- APK download path checklist is clear.
- AppVersion release metadata plan is clear.
- RemoteConfig release check is clear.
- Release notes draft is ready.
- Install guide outline is ready.
- Support copy is safe.
- Public release gate is clear.
- Emergency rollback direction is clear.
- No out-of-scope provider behavior is introduced.
