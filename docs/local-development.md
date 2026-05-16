# Local Development

## Requirements

- Node.js 20 or newer
- pnpm 9 or newer
- Docker
- Docker Compose

## Setup

```bash
pnpm install
cp .env.example .env
pnpm infra:up
pnpm db:generate
pnpm dev
```

## Useful Commands

```bash
pnpm dev:web
pnpm dev:api
pnpm build
pnpm lint
pnpm typecheck
pnpm infra:logs
pnpm infra:down
```

## Notes

Use placeholder secrets locally.

Do not commit `.env`.
