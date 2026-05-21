# cPanel MySQL + Downloader Release Guide

Status: Active deployment guide
Mode: Minimal install registration only. No license, activation key, payment, reseller, or customer portal yet.

## 1. Purpose

This guide explains the temporary EA0 release path using GoDaddy/cPanel MySQL and a PHP endpoint.

Goal:

```txt
User installs APK
App opens
App calls cPanel PHP endpoint
Device install is saved into MySQL
Nothing else is required yet
```

## 2. Hosting Decision

Current approved path:

```txt
GoDaddy / cPanel MySQL
PHP endpoint
APK download link
Downloader code or Downloader URL
```

Node.js is not required for this temporary install-registration phase.

## 3. Files Used

Required cPanel files:

```txt
deploy/cpanel/device-install-table.sql
deploy/cpanel/register-install.php
```

The SQL file creates the table.

The PHP file receives the app request and writes the device install record.

## 4. cPanel Database Setup

In cPanel:

1. Open MySQL Databases.
2. Create a new database.
3. Create a new database user.
4. Give the user full permissions on the new database.
5. Open phpMyAdmin.
6. Select the new database.
7. Import or run `device-install-table.sql`.

Recommended separation:

```txt
Do not reuse another website's existing database tables.
Use a separate database or at minimum a separate table.
```

## 5. PHP Endpoint Setup

Upload PHP endpoint to a public API path, for example:

```txt
public_html/api/devices/install/index.php
```

Use the content from:

```txt
deploy/cpanel/register-install.php
```

Edit these values locally on cPanel only:

```php
$dbHost = 'localhost';
$dbName = 'CPANEL_DB_NAME';
$dbUser = 'CPANEL_DB_USER';
$dbPass = 'CPANEL_DB_PASSWORD';
```

Never commit real database credentials.

## 6. App Endpoint

The Android TV / Fire TV app should call:

```txt
POST https://YOUR-DOMAIN.com/api/devices/install/
```

Request JSON:

```json
{
  "installId": "optional-existing-install-id",
  "platformDeviceHash": "optional-stable-device-hash",
  "platform": "android_tv",
  "appVersion": "0.1.0"
}
```

Response JSON:

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

App must store returned `installId` locally and send it again on next startup.

## 7. What The App Must Not Send Yet

Do not send:

```txt
Activation Key
License data
Payment data
Customer email/name
Provider username/password
Playlist/source contents
Stream URLs
Watch history
```

This phase only records app installation/device presence.

## 8. APK Download Link

Upload APK to a neutral path, for example:

```txt
public_html/dl/nexora.apk
```

Public URL example:

```txt
https://YOUR-DOMAIN.com/dl/nexora.apk
```

If the main website should stay hidden, use a neutral domain/subdomain instead of the main brand site.

Preferred shape:

```txt
https://NEUTRAL-DOWNLOAD-DOMAIN.com/dl/nexora.apk
https://NEUTRAL-API-DOMAIN.com/api/devices/install/
```

## 9. Downloader Code Plan

Downloader code should point to the APK download URL, not to the database endpoint.

Downloader flow:

```txt
User opens Downloader
User enters Downloader code or short URL
Downloader opens APK URL
APK downloads
User installs app
App calls /api/devices/install/
DeviceInstallRecord is created/updated
```

If a Downloader short code service is used, store the generated code in release notes after it is created.

Placeholder:

```txt
Downloader Code: TBD
APK URL: TBD
API URL: TBD
```

## 10. Test Checklist

Before sharing Downloader code:

```txt
DeviceInstallRecord table exists
register-install.php has real cPanel DB credentials
POST /api/devices/install/ works from browser/test tool
APK URL downloads directly
APK version matches appVersion sent by app
App stores installId locally
Second app launch updates same row instead of creating duplicate
```

## 11. Emergency Rollback

If something goes wrong:

```txt
Remove or rename APK file
Disable download link
Temporarily rename register-install.php
Keep database table intact
Do not delete existing DeviceInstallRecord rows unless intentionally resetting test data
```

## 12. Future Migration

These records can later be migrated into the full backend system.

Keep stable:

```txt
installId
platformDeviceHash
firstSeenAt
createdAt
```

Later systems can add:

```txt
Device ID
Activation Key
License
Payment
Customer portal
Owner dashboard
```
