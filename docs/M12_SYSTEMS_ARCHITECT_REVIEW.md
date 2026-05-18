# M12 — Systems Architect Review

## Status

REPORT ONLY / ADVISORY

## Architecture Result

M12 database policy draft is architecturally acceptable as a planning-only foundation.

The policy correctly keeps implementation, production database work, Android bridge, payment enforcement, provider integration, content hosting, and channel selling out of scope.

The current direction preserves platform responsibility as account/device/license/config/version/profile-transfer support rather than content-provider ownership.

## Contract Fit

The policy fits the approved Android ↔ Platform split:

- Android client remains responsible for TV UI, playback, local legal profile storage, and user-authorized source handling.
- Platform remains responsible for account/device/license/config/app-version state and temporary profile-transfer helper flow.
- Platform database does not become default source of truth for content catalog, stream lists, provider credentials, or permanent playlist/profile cloud sync.

## Architectural Guardrails

Required guardrails before any implementation task:

1. Keep Prisma migration execution separate from policy approval.
2. Keep seed execution separate from migration execution.
3. Keep local/dev validation separate from production migration policy.
4. Keep remote config client-safe only.
5. Keep transfer payload temporary and one-time consumable.
6. Keep payment/subscription tables inert until future Director approval.
7. Keep Android bridge out of M12 unless separately scoped.

## Risks

### Medium Risk — Schema Placeholder Drift

Subscription, payment, reseller, and credit ledger entities may create scope drift if treated as runtime behavior.

Mitigation:

- Keep as schema placeholders only.
- No payment enforcement.
- No reseller/payment runtime logic.

### Medium Risk — Remote Config Overreach

Remote config can become a hidden control layer if not restricted.

Mitigation:

- No secrets.
- No media source lists.
- No executable behavior.
- No protected-system replacement flags.

### High Risk — Profile Transfer Payload Ownership

Temporary profile-transfer support can drift into cloud sync or backend-owned playlist storage.

Mitigation:

- Expiring payload.
- One-time consume.
- Deletion after consume/expiry.
- Local client ownership by default.
- No permanent profile sync without future approval.

## Required Dependencies

Before Builder implementation:

- Security Privacy review.
- Final Director approval for implementation scope.
- Exact allowed files/systems.
- Expected build/runtime evidence if code changes.
- Local-only environment confirmation.

## Recommendation to Director

Proceed to Security Privacy review before any implementation.

Do not start Prisma migration execution yet.

Recommended next implementation candidate after review:

- Local-only migration baseline preparation task.

But only after Director explicitly opens it.
