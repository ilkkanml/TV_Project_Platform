# Legal Boundaries

## Backend Restrictions

The backend must never provide, host, relay, transcode, resell, package, or catalog streams.

The backend must never become a source of TV channels, media files, copyrighted content, or playlist libraries.

## Allowed Backend Functions

- Account management
- Authentication
- Subscription status
- License verification
- Device activation
- Reseller credit ledger
- Payment event tracking
- App version checks
- Remote config
- Temporary encrypted transfer bridge for user-owned profile data

## Playlist Boundary

The playlist is user-owned.

The player app is responsible for storing playlist profiles locally on the device using encrypted local storage.

The backend may temporarily transfer user-entered profile data to the user's own activated device, but must not become a persistent playlist authority.
