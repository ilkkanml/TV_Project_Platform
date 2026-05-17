# Contributing

This repository is managed under a strict licensed-player platform boundary.

## Required Rules

All contributions must preserve these rules:

- Do not add media delivery features.
- Do not add catalog-selling features.
- Do not add relay, transcoding, or distribution features.
- Do not make the backend the source of truth for user media profile data.
- Do not permanently store user media profile credentials by default.
- Do not store payment card data.
- Do not store passwords in plain text.
- Keep authorization server-side.
- Keep reseller credit operations transaction-based.
- Keep device identity based on app-generated device ID.

## Development Workflow

Use the existing monorepo structure:

- apps/web for the Next.js web application.
- apps/api for the NestJS API.
- packages/shared for shared TypeScript types, constants, and validators.
- docs for canonical documentation.
- project-bible for product and architecture decisions.

Before changing architecture, read:

- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- SECURITY.md
- LEGAL_SCOPE.md
- project-bible directory
- docs directory

## Code Rules

- Use TypeScript.
- Prefer strict typing.
- Validate input.
- Avoid placeholder logic.
- Avoid empty modules that claim completed functionality.
- Keep sensitive decisions backend-authoritative.
- Never trust frontend values for pricing, roles, permissions, reseller credit, subscription duration, or ownership.
- Avoid logging sensitive data.

## Documentation Rules

Update documentation when project state changes.

Do not create duplicate documentation trees.

Do not create nested folders such as:

- project-bible/project-bible
- docs/docs
- apps/apps

Do not recreate deprecated project-bible filenames.

## Review Gate

A change is not acceptable if it weakens the licensed-player-only boundary.

A change is not acceptable if it introduces media-provider behavior.

A change is not acceptable if it hides a security-sensitive decision in the frontend.
