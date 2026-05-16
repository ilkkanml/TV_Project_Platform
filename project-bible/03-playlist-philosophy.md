# Playlist Philosophy

## Source Of Truth

Backend is not the playlist source of truth.

The device is the primary storage location for playlist profiles.

## Local Storage

Playlist profiles should be stored in encrypted local device storage.

The app should support multiple playlist profiles.

## Optional Web-To-Device Bridge

The web panel may allow a user to send their own playlist/profile to their own activated device.

This bridge must be:

- Temporary
- Encrypted
- User initiated
- Device scoped
- Short lived
- Auditable
- Non-catalog based

## Forbidden Patterns

- Hosted playlist library
- Shared playlist marketplace
- Provider catalog
- Stream relay
- Transcoding service
- Channel package sales
