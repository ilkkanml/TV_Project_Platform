# API Contract Alignment

## Purpose

This document aligns `TV_Project_Platform` API direction with the Nexora TV Android client integration contract.

## Current API State

Current API foundation exists in `apps/api` and uses NestJS.

Observed controller areas:

- Health
- App Version
- Remote Config
- Device Activation
- License Check
- Profile Transfer

Current endpoints are foundation/static oriented and are not final production implementations.

## Target Contract Areas

Platform API should eventually support:

- Activation session create
- Activation status polling
- License check
- App version check
- Remote config fetch
- Temporary profile transfer create
- Temporary profile transfer consume

## Current Alignment

Aligned:

- App version endpoint exists
- Remote config endpoint exists
- Device activation endpoint exists
- License check endpoint exists
- Profile transfer endpoint exists
- Free launch behavior is represented
- Payment enforcement is inactive

Partially aligned:

- Route naming does not fully match the M10 draft contract
- Response field names are not final
- `deviceId` / `deviceKey` language needs alignment with `platform_device_id`
- Error codes are not standardized yet
- Remote config lacks explicit schema versioning

Missing before implementation:

- Request validation
- Auth/session middleware
- Rate limiting
- Prisma-backed services
- Error response standard
- Audit logging integration
- API version prefix policy
- OpenAPI or contract test baseline

## Guardrails

The API must not return:

- Media source lists
- Bundled channel packages
- Provider credentials
- Stream URLs from the platform
- Remote executable behavior
- Unauthorized source extraction rules
- Circumvention behavior

## Implementation Rule

This document does not approve implementation.

Before implementation, Director must approve a specific milestone and task.
