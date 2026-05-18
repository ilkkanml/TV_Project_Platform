# Platform Source of Truth

## Product Identity

`TV_Project_Platform` is the platform center for the Nexora TV ecosystem.

It supports client apps by managing platform-side account, device, license, app version, remote config, and temporary profile transfer responsibilities.

## Repository Role

This repo owns:

- Platform web foundation
- Platform API foundation
- Account foundation
- Device registry foundation
- Activation session foundation
- License state foundation
- App version state foundation
- Remote config state foundation
- Temporary encrypted profile transfer foundation
- Shared platform constants/types

This repo does not own:

- Android TV UI
- Android playback implementation
- Player core
- Playlist parsing inside Android
- Content catalog
- Stream hosting
- Stream relay
- Channel package sales
- Provider credentials
- Unauthorized extraction

## App / Platform Split

Android client:

- Presents TV-first UI
- Stores local user-authorized profiles
- Handles playback through approved legal player flow
- Calls platform contract endpoints when approved

Platform:

- Stores account/device/license/config/app-version state
- Creates activation sessions
- Returns license/app/config decisions
- Provides temporary encrypted profile transfer helper flow
- Does not become the default source of truth for user media profiles

## Current Implementation Reality

Current repo contains:

- Root pnpm workspace
- Next.js web app
- NestJS API app
- Shared package
- Prisma schema
- Docker compose infrastructure for Postgres and Redis

Current API is foundation-level and mostly static/mock-oriented.

Database schema exists, but migration baseline and production data policy are not finalized.

## Free Launch Rule

The first app remains free until final release level.

Payment/subscription enforcement is inactive during early/free launch.

Payment-related schema or placeholders do not approve enforcement.

## Legal Boundary

The platform must not provide or enable:

- Content hosting
- Broadcasting
- Channel selling
- Bundled streams
- Stream relay
- Rights-protection bypass or equivalent circumvention
- Unauthorized source extraction
- Credential sharing
- Illegal restreaming

Allowed development/test sources:

- Mock data
- Permitted test media
- Public demo media
- User-authorized legal sources
- Future licensed provider/API integrations with explicit approval

## Protected Boundary

Platform docs and code must preserve:

- Legal media player boundary
- Android client separation
- Local profile ownership by default
- No backend content-provider role
- No payment enforcement until approved
- No provider integration until approved

## Next Milestone Dependency

Before implementation milestones, the platform needs:

- API contract alignment
- Database baseline/migration plan
- Security/session/token policy
- Legal boundary confirmation
- Runtime/runbook clarity
