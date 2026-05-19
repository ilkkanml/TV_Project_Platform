# M15 Activation-First Flow Decision

Milestone: M15 Premium UI/UX Polish & Internal Alpha Handoff Readiness

Status: DIRECTOR DECISION / APPROVED DIRECTION

## Decision

The app should no longer feel like an email/username/password login-first product.

For the free/internal alpha flow, Nexora should move toward an activation-first TV experience:

Splash -> Device Activation -> Home

The current login screen can be removed from the normal first-run path or kept unreachable/secondary until a later account flow is approved.

## Reason

On TV devices, username/password entry feels slow, raw, and non-premium.

A TV-first streaming product should show a simple activation screen after the logo, where the user can register the device from a website.

## Device Identity Rule

Do not use real hardware MAC address as the product identity.

Use product-safe identity labels:

- `Nexora Device ID`
- `Activation Key`

Reason:

- Hardware MAC address can create privacy/platform issues.
- Android/TV environments may restrict or randomize hardware identifiers.
- A generated app/device identifier is safer and easier to control.

## Intended User Flow

Target product flow:

1. App opens.
2. Splash / Nexora logo appears.
3. Device Activation screen appears.
4. Screen shows:
   - Nexora Device ID
   - Activation Key
   - Website activation instruction
5. User goes to website.
6. User registers the device.
7. User receives/activates a free license.
8. User creates profile/account details on the website or approved account step.
9. App continues to Home after activation is confirmed.

## M15 Implementation Boundary

M15 may include activation-first UX polish and mock/local activation behavior only.

Allowed in M15:

- Splash routes to Device Activation instead of Login if Builder patch is approved.
- Activation screen shows Nexora Device ID and Activation Key.
- Login screen can be removed from normal first-run path.
- Existing `demo123` mock behavior may be replaced or preserved as internal test fallback if needed.
- UI must feel premium and TV-first.

Not allowed in M15:

- Real website activation backend
- Real license enforcement
- Auth/session/token implementation
- Payment enforcement
- Provider/content/IPTV source integration
- Backend expansion
- Real device MAC collection
- Credential collection on device
- Production deploy/store release

## Future Milestone Candidate

A later milestone should define:

`Device Activation Website/API Contract`

That future milestone can define:

- Device registration API
- Free license creation
- Website activation flow
- Profile creation flow
- Activation status polling
- Account/device relationship

This is not approved for M15 unless separately scoped.

## M15 Acceptance Impact

After M15 patch, the smoke path should become:

Splash -> Device Activation -> Home -> Detail -> Play Mock -> Player shell

Required checks:

- App opens without crash
- No username/password login required on TV
- Activation screen shows Device ID + Activation Key
- Home remains reachable through safe internal/mock activation
- Focus/navigation still works
- Player does not auto-start real playback
- No backend/provider/payment/auth expansion

## Director Result

Activation-first TV UX direction is approved.

Builder should incorporate this into the M15 minimal UI/UX polish patch only as local/mock UI behavior.
