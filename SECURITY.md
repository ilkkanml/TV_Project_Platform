# Security Policy

## Secrets

Never commit production secrets, tokens, private keys, API keys, certificates, payment credentials, database passwords, or real customer data.

Use `.env.example` for placeholder values only.

## Playlist and Profile Data

Playlist/profile data is user-owned data.

The backend must not become a playlist database or provider.

The optional web-to-device transfer bridge must be temporary, encrypted, scoped to the user's own activated device, and designed with short retention.

## Device Activation

Device activation should include:

- Device identity checks
- User ownership checks
- License status checks
- Rate limiting
- Audit logging
- Revocation support

## Payments

Payment provider credentials must be stored outside the repository.

Webhook verification must use provider-signed requests and placeholder secrets in local development only.

## Reporting

Security issues should be reviewed privately before public disclosure.
