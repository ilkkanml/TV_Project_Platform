# Playlist Transfer Bridge

## Purpose

The transfer bridge lets a user send their own playlist/profile information from the web panel to their own activated device.

## Non-Goal

The transfer bridge is not a hosted playlist service.

## Suggested Flow

1. User signs into the web panel.
2. User selects one of their activated devices.
3. User enters or imports their own playlist/profile information.
4. Web encrypts the payload for temporary transfer.
5. API stores short-lived encrypted transfer state.
6. Device requests pending transfer after ownership and license verification.
7. Device stores the profile locally in encrypted storage.
8. API deletes or expires the temporary transfer record.

## Required Controls

- Short TTL
- Encryption
- Device ownership check
- License check
- Audit event
- No permanent playlist source of truth
