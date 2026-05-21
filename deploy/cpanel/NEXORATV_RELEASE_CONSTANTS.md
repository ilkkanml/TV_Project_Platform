# Nexora TV Release Constants

Status: Active
Mode: Minimal download/update structure. No license, activation key, payment, reseller, or customer portal yet.

## 1. App Name

Approved public app display name:

```txt
Nexora TV
```

Use this name consistently in:

- APK label / launcher name.
- TV home screen name.
- Android install screen name.
- Release notes.
- Install guide.
- Downloader instructions.
- Support copy.

## 2. APK File Name

Fixed APK file name:

```txt
nexoratv.apk
```

Recommended cPanel path:

```txt
public_html/dl/nexoratv.apk
```

Recommended direct download URL:

```txt
https://www.thenightssecret.com/dl/nexoratv.apk
```

If a neutral download domain/subdomain is added later, keep the same file name:

```txt
https://NEUTRAL-DOMAIN.com/dl/nexoratv.apk
```

## 3. Downloader Code Rule

Downloader code must point to the APK download URL, not to the database endpoint.

Downloader target URL:

```txt
https://www.thenightssecret.com/dl/nexoratv.apk
```

Later, if a neutral domain is used, update Downloader target to:

```txt
https://NEUTRAL-DOMAIN.com/dl/nexoratv.apk
```

## 4. Update Rule

For manual update through Downloader:

```txt
Keep the APK file path the same.
Replace nexoratv.apk with the new build.
Increase app versionCode.
Keep package name unchanged.
Keep signing key unchanged.
```

If the file path stays the same, the Downloader code can stay the same.

## 5. Android App Identity Requirements

The Android app should use:

```txt
App display name: Nexora TV
Recommended package name: com.nexoratv.app
APK file name: nexoratv.apk
```

Critical rules:

- Changing display name is safe before and after release.
- Do not change package name after release unless a full reinstall/migration is accepted.
- Do not change signing key between updates.
- Always increase versionCode for each update.
- versionName may use readable versions such as 0.1.0, 0.1.1, 0.2.0.

## 6. Minimal Device Registration Endpoint

App first-open install registration endpoint:

```txt
POST https://www.thenightssecret.com/api/devices/install/index.php
```

Request body:

```json
{
  "installId": "optional-existing-install-id",
  "platformDeviceHash": "stable-device-hash-if-available",
  "platform": "android_tv",
  "appVersion": "0.1.0"
}
```

For Fire TV:

```json
{
  "installId": "optional-existing-install-id",
  "platformDeviceHash": "stable-device-hash-if-available",
  "platform": "fire_tv",
  "appVersion": "0.1.0"
}
```

## 7. Current Release Flow

Current minimal release flow:

```txt
User enters Downloader code
Downloader downloads nexoratv.apk
User installs Nexora TV
App opens
App calls /api/devices/install/index.php
DeviceInstallRecord is created or updated
```

No license, activation key, payment, customer login, or reseller logic is required yet.

## 8. Support Copy

Recommended support wording:

```txt
If Nexora TV install registration fails, send your app version, platform, and any visible error message to support.
Do not send provider passwords, playlist contents, or private source URLs.
```

## 9. Stop Conditions

Stop if a release build changes:

- App display name away from Nexora TV without approval.
- Package name after first public release.
- Signing key after first public release.
- APK download path without updating Downloader code.
- Install registration endpoint without app handoff.
