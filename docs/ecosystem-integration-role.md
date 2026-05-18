# Ecosystem Integration Role

Status: Active
Scope: TV_Project_Platform and TV_Project coordination

## Purpose

The Ecosystem Integration Director is the bridge role between the platform repository and the Android TV / Fire TV client repository.

This role exists to keep both projects aligned without creating scope drift.

## Core Responsibility

The role owns the contract between:

- `TV_Project_Platform`: account, device, license, admin, remote config, app version, and temporary profile transfer center.
- `TV_Project`: first Android TV / Fire TV client.

The role ensures that backend, database, API, and client integration decisions follow the M10 Ecosystem Alignment and Client Integration Contract.

## Primary Duties

- Maintain the client integration contract.
- Review API compatibility before Android integration starts.
- Confirm Android client requirements do not exceed platform scope.
- Confirm platform API changes remain usable by the Android client.
- Protect the free launch rule.
- Protect the privacy boundary for user-owned profile data.
- Keep device activation, license check, app version, remote config, and profile transfer flows aligned.
- Stop implementation when a cross-project contract mismatch appears.

## Gates Owned

- Contract Gate.
- API Compatibility Gate.
- Android Integration Gate.
- Privacy Boundary Gate.
- Free Launch Gate.
- Release Alignment Gate.

## Out of Scope

The Ecosystem Integration Director must not:

- Design unrelated dashboard expansion.
- Add payment-first enforcement during the free launch period.
- Expand reseller systems before the approved priority order.
- Move either project into media provider behavior.
- Add content hosting, channel package selling, source scraping, or stream relay behavior.
- Override backend, Android, security, or product owners outside contract alignment.

## Decision Rule

If platform and client requirements conflict, the integration contract wins.

If the contract is incomplete, implementation pauses until the missing rule is clarified.

If a request creates media-provider behavior, it is rejected as out of scope.

## Immediate Use

Before Database MVP, Core API MVP, or Android integration tasks begin, this role must verify:

1. The M10 contract is referenced.
2. Endpoint behavior matches Android first-client needs.
3. Backend storage boundaries are respected.
4. Free launch behavior is preserved.
5. No content/provider/source responsibility is introduced.
