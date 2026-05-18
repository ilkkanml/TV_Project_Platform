# Security & Session Policy

## Purpose

This document records security/session boundaries for `TV_Project_Platform`.

## Current State

The platform repo contains environment placeholders for JWT and transfer encryption secrets.

Final auth/session/token implementation is not approved yet.

## Required Before Implementation

Before auth/session implementation, define:

1. Access token lifetime.
2. Refresh token lifetime.
3. Refresh behavior.
4. Token storage expectations for clients.
5. Logout behavior.
6. Device reset behavior.
7. Revoked device behavior.
8. Activation code rate limiting.
9. API request validation.
10. Audit logging integration.

## Device Identity

Real hardware MAC address must not be primary device identity.

Approved direction:

- Client app install/device GUID
- Platform-assigned device identity after activation
- Account/device/license binding through platform state

## Activation Security

Activation sessions must eventually include:

- Expiration
- One-time approval/consume behavior
- Rate limiting
- Abuse protection
- Audit logging
- Clear error states

## Profile Transfer Security

Temporary profile transfer must remain:

- Temporary
- Encrypted
- Expiring
- One-time consume
- Redacted where possible
- Deleted after consume/expiry according to future policy

The platform must not become default permanent playlist/profile source of truth without future approval.

## Remote Config Security

Remote config must not contain:

- Secrets
- Provider credentials
- Media source lists
- Executable remote behavior
- Unauthorized extraction rules
- Protected-system replacement instructions

## Secret Handling

`.env.example` may contain placeholders only.

Real secrets must not be committed.

## Implementation Rule

This policy does not approve auth/session implementation.

Implementation requires a future Director-approved milestone/task.
