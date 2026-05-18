# M12 — Security Privacy Review

## Status

REPORT ONLY / ADVISORY

## Security Result

M12 database policy draft is acceptable as a policy-only document.

No implementation, Prisma migration execution, production database use, API implementation, Android bridge, payment enforcement, provider integration, content hosting, or channel selling is approved.

Security Privacy does not report a blocker for continuing planning.

## Privacy / Data Boundary

The strongest privacy boundary is around temporary profile-transfer data.

Approved direction:

- Temporary only.
- Encrypted payload only.
- Expiring.
- One-time consume.
- Deleted or irreversibly cleared after consume/expiry.
- Redacted audit metadata only.

Not approved:

- Permanent playlist/profile cloud sync.
- Provider credential storage.
- Backend-owned stream source inventory.
- Raw transfer payload logging.
- Raw payment provider payload storage without future compliance review.

## Device Identity Fit

The policy remains compatible with the device identity direction:

- App-generated install/device GUID.
- Platform-assigned `platform_device_id` after activation.
- No real hardware MAC address as primary identity.

No device identity conflict found.

## Sensitive Data Risks

### High Risk — Transfer Payload Lifecycle

Risk:

Temporary profile transfer can become persistent sensitive storage if deletion is not enforced.

Required before implementation:

- Expiry rule.
- One-time consume rule.
- Payload clear/delete rule.
- Audit redaction rule.
- Key management owner.

### Medium Risk — Password Hash Handling

Risk:

User password hash fields exist in schema foundation.

Required before auth implementation:

- Hashing algorithm decision.
- Password reset policy.
- Session/token policy.
- Secret management policy.

Auth implementation is not approved in M12 policy draft.

### Medium Risk — Payment Event Payloads

Risk:

Future payment payloads may include sensitive provider metadata.

Required before payment implementation:

- Minimal payload storage.
- Redaction policy.
- Retention window.
- Compliance review.

Payment enforcement remains inactive.

### Medium Risk — Audit Metadata

Risk:

Audit metadata may accidentally capture sensitive values.

Required:

- Allowlisted metadata fields.
- Redaction by default.
- No stream URLs.
- No provider credentials.
- No raw profile payloads.

## Recommendation to Director

Planning may continue.

Before any Builder implementation, Director should require:

1. Local-only environment target.
2. No production database target.
3. Transfer payload lifecycle rules accepted.
4. Audit metadata redaction accepted.
5. Seed policy accepted.
6. Safe Code Engine evidence if code changes.

Recommended next step:

Director may open a local-only implementation planning task, but should not approve migration execution until exact files, commands, and evidence requirements are listed.
