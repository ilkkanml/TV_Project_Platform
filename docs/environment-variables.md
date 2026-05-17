# Environment Variables

This file documents the environment variables used by TV Project Platform.

Use `.env.example` as the starting point for local development.

Never commit real secrets.

## Application

### NODE_ENV

Runtime environment.

Example:

```txt
NODE_ENV=development
```

### APP_NAME

Human-readable application name.

Example:

```txt
APP_NAME="TV Project Platform"
```

### APP_WEB_URL

Public web application URL.

Local example:

```txt
APP_WEB_URL="http://localhost:3000"
```

### APP_API_URL

Public API URL.

Local example:

```txt
APP_API_URL="http://localhost:4000"
```

### API_PORT

Optional API port override.

Default used by the API app:

```txt
API_PORT=4000
```

### CORS_ORIGIN

Allowed browser origin for API requests.

Local example:

```txt
CORS_ORIGIN="http://localhost:3000"
```

## Database

### DATABASE_URL

PostgreSQL connection string used by Prisma.

Local example:

```txt
DATABASE_URL="postgresql://tv_platform:tv_platform_password@localhost:5432/tv_project_platform?schema=public"
```

Production values must use secure credentials.

## Redis

### REDIS_URL

Redis connection string.

Local example:

```txt
REDIS_URL="redis://localhost:6379"
```

Redis may be used for cache, temporary transfer state, rate limiting, and short-lived operational data.

## Authentication

### JWT_ACCESS_SECRET

Secret for signing access tokens.

Local placeholder:

```txt
JWT_ACCESS_SECRET="change_this_access_secret"
```

Use a strong random value outside local development.

### JWT_REFRESH_SECRET

Secret for signing refresh tokens.

Local placeholder:

```txt
JWT_REFRESH_SECRET="change_this_refresh_secret"
```

Use a strong random value outside local development.

### JWT_ACCESS_EXPIRES_IN

Access token lifetime.

Example:

```txt
JWT_ACCESS_EXPIRES_IN="15m"
```

### JWT_REFRESH_EXPIRES_IN

Refresh token lifetime.

Example:

```txt
JWT_REFRESH_EXPIRES_IN="30d"
```

### PASSWORD_HASH_ROUNDS

Password hashing cost setting.

Example:

```txt
PASSWORD_HASH_ROUNDS=12
```

Passwords must never be stored in plain text.

Password hashes must never be returned by API responses.

## Payments

### PAYMENT_PROVIDER

Active payment mode or provider.

MVP example:

```txt
PAYMENT_PROVIDER="manual"
```

Manual payment mode means admin approval controls payment status.

### PAYMENT_WEBHOOK_SECRET

Secret used to verify payment provider webhook requests when real payment providers are enabled.

Local placeholder:

```txt
PAYMENT_WEBHOOK_SECRET="change_this_payment_webhook_secret"
```

Provider webhook signatures must be verified before payment state changes.

## Temporary Profile Transfer

### PLAYLIST_PUSH_ENCRYPTION_KEY

Temporary encrypted web-to-device transfer encryption key.

Current legacy variable name:

```txt
PLAYLIST_PUSH_ENCRYPTION_KEY="change_this_32_byte_secret_key"
```

This key is for temporary encrypted transfer payloads only.

The backend must not become default permanent storage for user profile credentials.

Payloads must expire and should be marked consumed or deleted after pickup.

Future cleanup may rename this variable to a more neutral profile-transfer name.

## pgAdmin Local Tools

### PGADMIN_DEFAULT_EMAIL

Local pgAdmin login email.

Example:

```txt
PGADMIN_DEFAULT_EMAIL="admin@tvplatform.local"
```

### PGADMIN_DEFAULT_PASSWORD

Local pgAdmin password.

Example:

```txt
PGADMIN_DEFAULT_PASSWORD="admin_password"
```

Do not use default values in production.

## Admin Seed

### ADMIN_SEED_EMAIL

Initial admin account email for seed scripts.

Example:

```txt
ADMIN_SEED_EMAIL="admin@tvplatform.local"
```

### ADMIN_SEED_PASSWORD

Initial admin account password for seed scripts.

Example:

```txt
ADMIN_SEED_PASSWORD="ChangeMe123!"
```

Change this before any non-local use.

## Security Rules

- Do not commit real secrets.
- Do not reuse local placeholder secrets in production.
- Do not log secrets.
- Do not expose secrets to the frontend.
- Do not store payment card data.
- Do not store passwords in plain text.
- Do not store user profile credentials permanently by default.
- Rotate secrets if they are exposed.

## Production Rule

Production environment values must be managed outside the repository.

The repository may include placeholders only.
