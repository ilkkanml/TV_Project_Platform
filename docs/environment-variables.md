# Environment Variables

Compact environment variable guide for TV Project Platform.

## Core Rule

Use `.env.example` as the local starting point.

Never commit real secrets.

Production secrets must live in runtime or hosting secret storage.

## Application

Required application variables should cover:

- runtime environment
- app name
- web URL
- API URL
- API port
- CORS origin

## Database

Required database variable:

- DATABASE_URL

Local values may use local PostgreSQL credentials.

Production values must use secure credentials.

## Redis

Required Redis variable when Redis is enabled:

- REDIS_URL

Redis may be used for cache, rate limiting, queues, temporary state, and short-lived transfer data.

Redis must not become permanent profile/provider storage.

## Authentication

Required auth variables should cover:

- access token secret
- refresh token secret
- access token lifetime
- refresh token lifetime
- password hashing cost

Secrets must be strong outside local development.

Passwords must never be stored in plain text.

Password hashes must never be returned by API responses.

## Payments

Payment provider variables are not final until provider approval.

Manual payment MVP may avoid real provider secrets.

When providers are added, webhook secrets must be protected.

## Temporary Transfer

Temporary transfer variables may cover:

- encryption secret
- expiration duration
- maximum payload size

Transfer configuration must preserve expiring, scoped, user-owned behavior.

## App Version / Files

App distribution variables may cover APK/file storage when needed.

File storage must not be used for provider, content, catalog, or distribution behavior.

## Local vs Production

Local placeholders are allowed only for local development.

Production must replace every placeholder secret.

## Related Authority Files

- .env.example
- docs/local-setup.md
- project-bible/06-security-bible.md
- project-bible/10-app-integration.md
- project-bible/12-devops-bible.md

## Final Rule

Environment variables configure platform runtime only; they must not store real secrets in project files.
