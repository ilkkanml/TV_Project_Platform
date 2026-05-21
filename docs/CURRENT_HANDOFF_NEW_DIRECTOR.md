# Current Handoff for New Director Chat

Status: Active
Date context: 2026-05-21
Project: Nexora TV / TV_Project_Platform + TV_Project

## 1. Current Completed Milestone

The urgent early distribution milestone is complete.

Goal completed:

```txt
Nexora TV APK can be downloaded.
App can be installed/opened.
Installed/opened device creates a database record.
No license, activation key, payment, reseller, or customer portal is active yet.
```

## 2. Public App Identity

Approved app display name:

```txt
Nexora TV
```

Fixed APK filename:

```txt
nexoratv.apk
```

Current APK download URL:

```txt
https://www.thenightssecret.com/dl/nexoratv.apk
```

Recommended package name:

```txt
com.nexoratv.app
```

Critical release/update rules:

```txt
Do not change package name after public release.
Do not change signing key after public release.
Increase versionCode on every update.
Keep APK filename/path the same if Downloader code should remain unchanged.
```

## 3. Current Hosting / Database Decision

Current live minimal setup:

```txt
GoDaddy cPanel
MySQL database
PHP endpoint
No Node.js required for this urgent phase
```

A cPanel/PHP path was chosen because GoDaddy shared cPanel likely does not provide Node.js App support.

Node.js/NestJS backend can be used later with VPS or Node-capable hosting.

## 4. Current Device Registration Endpoint

Active endpoint:

```txt
POST https://www.thenightssecret.com/api/devices/install/index.php
```

Backend file prepared in repo:

```txt
deploy/cpanel/register-install.php
```

Database table SQL prepared in repo:

```txt
deploy/cpanel/device-install-table.sql
```

## 5. Database Table

Current active table:

```txt
DeviceInstallRecord
```

Purpose:

```txt
Record only that a device/app install has been seen.
```

Fields include:

```txt
id
installId
platformDeviceHash
platform
appVersion
status
firstSeenAt
lastSeenAt
createdAt
updatedAt
ownerNote
```

Not included yet:

```txt
Activation Key
License
Payment
Customer account
Reseller
Provider/source/playlist data
Watch history
```

## 6. App Request Contract

Android TV request:

```json
{
  "installId": "optional-existing-install-id",
  "platformDeviceHash": "stable-device-hash-if-available",
  "platform": "android_tv",
  "appVersion": "0.1.0"
}
```

Fire TV request:

```json
{
  "installId": "optional-existing-install-id",
  "platformDeviceHash": "stable-device-hash-if-available",
  "platform": "fire_tv",
  "appVersion": "0.1.0"
}
```

Success response:

```json
{
  "ok": true,
  "data": {
    "installId": "NX-INST-....",
    "status": "seen",
    "platform": "android_tv",
    "appVersion": "0.1.0",
    "firstSeenAt": "...",
    "lastSeenAt": "...",
    "created": true
  },
  "error": null
}
```

Repeat install/known device response should return:

```txt
created = false
```

## 7. App-Side Required Behavior

The app must:

```txt
Call POST /api/devices/install/index.php on first startup.
Store returned installId locally.
Send installId again on later startups.
Send platformDeviceHash if available.
Continue app flow even if registration temporarily fails.
Retry quietly later with backoff.
```

The app must not send:

```txt
Activation Key
License data
Payment data
Customer email/name
Provider username/password
Playlist/source contents
Stream URLs
Watch history
Raw MAC address as primary identity
```

## 8. Verified Tests Completed

Manual backend test completed:

```txt
platformDeviceHash = test-device-001 was sent.
MySQL created one DeviceInstallRecord.
Repeat request did not create duplicate row.
```

Real app/device test completed:

```txt
APK download worked.
App installed/opened.
A real device record appeared in MySQL.
```

Therefore the urgent install-only registration path is working.

## 9. Downloader Plan

Downloader code should point to APK URL only:

```txt
https://www.thenightssecret.com/dl/nexoratv.apk
```

Downloader code must not point to the database endpoint.

Release flow:

```txt
User enters Downloader code.
Downloader downloads nexoratv.apk.
User installs Nexora TV.
App opens.
App calls /api/devices/install/index.php.
DeviceInstallRecord is created or updated.
```

For manual updates:

```txt
Upload new APK over public_html/dl/nexoratv.apk.
Keep same filename.
Keep same package name.
Keep same signing key.
Increase versionCode.
Downloader code stays the same if URL stays the same.
```

## 10. Repo Files Added / Important

TV_Project_Platform:

```txt
deploy/cpanel/device-install-table.sql
deploy/cpanel/register-install.php
deploy/cpanel/README_DEVICE_INSTALL_AND_DOWNLOADER.md
deploy/cpanel/NEXORATV_RELEASE_CONSTANTS.md
docs/CURRENT_HANDOFF_NEW_DIRECTOR.md
```

TV_Project:

```txt
docs/URGENT_INSTALL_ONLY_DEVICE_REGISTRATION_HANDOFF.md
```

## 11. Full EA0 Plan Still Exists But Deferred

Earlier full EA0 planning exists for future work:

```txt
Device ID
Activation Key
License check
Remote config
App version
Customer portal
Payment
Reseller
Owner dashboard
```

But the active immediate release mode is intentionally simpler:

```txt
Install-only device registration.
```

Do not reintroduce license/activation/payment until the install-only rollout is stable.

## 12. Next Recommended Steps

Next operational tasks:

```txt
1. Generate Downloader code for https://www.thenightssecret.com/dl/nexoratv.apk
2. Record Downloader code in release notes.
3. Confirm app package name and signing key are stable.
4. Share APK/Downloader code with limited testers.
5. Watch DeviceInstallRecord records in phpMyAdmin.
6. Confirm repeated app launches update lastSeenAt, not duplicate rows.
```

Next product phase after this:

```txt
Add controlled update/version check.
Then add Device ID + Activation Key.
Then add license/payment/customer portal later.
```
