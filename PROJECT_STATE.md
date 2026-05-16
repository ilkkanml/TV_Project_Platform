# Project State

## Current Phase

Repository foundation package prepared as a local ZIP.

## Active Architecture

- Monorepo using pnpm workspaces
- Web app foundation using Next.js
- API foundation using NestJS
- Database layer planned with Prisma and PostgreSQL
- Redis planned for short-lived tokens, transfer bridge state, and operational cache
- Shared TypeScript package for common types and constants
- Docker Compose for local infrastructure

## Product Identity

This is a Licensed IPTV Player Platform.

The platform manages access and operations around a player application. It is not a broadcast, channel, CDN, transcoding, relay, or playlist provider platform.

## Playlist Direction

- Backend is not the playlist source of truth.
- Playlist data is entered in the player application by the user.
- Playlist data is stored locally on the device using encrypted storage.
- Multiple playlist profiles are supported.
- Optional web-to-device transfer is temporary and encrypted.
- No hosted playlist library or content catalog is included.

## Completed In This ZIP

- Root monorepo configuration
- Root documentation
- Project bible documentation
- Web app skeleton
- API app skeleton
- Shared package skeleton
- Infrastructure placeholders
- GitHub workflow placeholders

## Next Action

Import this ZIP into a clean repository or upload the files manually, then run local installation when a development environment is available.
