# AI Handoff

## Start Here

When continuing this project, read these files first:

1. `PROJECT_STATE.md`
2. `AI_HANDOFF.md`
3. `ROADMAP.md`
4. `LEGAL_SCOPE.md`
5. `project-bible/00-project-rules.md`
6. `project-bible/01-product-bible.md`
7. `project-bible/02-legal-boundaries.md`
8. `project-bible/03-playlist-philosophy.md`
9. `docs/architecture.md`
10. `docs/new-chat-start-message.md`

## Current Instruction

Follow the approved repository tree.

Do not rewrite the architecture unless there is a real contradiction, security issue, legal issue, or explicit instruction from the project owner.

## Non-Negotiable Product Boundary

This project is a Licensed IPTV Player Platform.

The backend must never become:

- A stream host
- A channel provider
- A playlist provider
- A CDN
- A relay
- A transcoding service
- A media source
- A copyright content distribution system

## Backend Scope

The backend may manage:

- Accounts
- Auth
- Subscriptions
- License checks
- Device activation
- Payment status
- Reseller credits
- Remote config
- App version checks
- Temporary encrypted profile transfer to a user's own device

## Playlist Scope

The app stores playlist/profile data locally on the device using encrypted local storage.

The backend only supports an optional temporary encrypted transfer bridge when the user chooses to push their own playlist/profile from the web panel to their own activated device.

## Development Rule

Progress should be additive.

Prefer small, reviewable changes.

Keep shared contracts in `packages/shared`.

Do not add real credentials or production secrets.
