# Database Model Outline

## Suggested Models

- User
- Session
- Device
- License
- Subscription
- PaymentEvent
- ResellerProfile
- CreditLedgerEntry
- RemoteConfig
- AppVersion
- PlaylistTransferSession
- AuditLog

## Playlist Data Rule

`PlaylistTransferSession` may hold temporary encrypted payload metadata.

It should not become a permanent playlist library or source of truth.
