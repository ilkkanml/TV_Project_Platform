# M15 Premium UI/UX Polish Scope

Milestone: M15 Premium UI/UX Polish & Internal Alpha Handoff Readiness

Status: DIRECTOR SCOPED / DESIGN DIRECTION READY

## Director Decision

M15 is adjusted from simple APK handoff into a premium UI/UX polish direction milestone.

Reason:

- M14 proved the app opens and core smoke path works.
- Current app is functional but still feels visually raw.
- Before wider internal alpha handoff, Nexora should feel like a premium TV-first streaming product.

## Operating Model

Simplified workflow is active:

- Director handles scope, decisions, and documentation.
- Builder is used only for code/patch/build work.
- QA remains required before milestone lock.
- Premium UI / Art Direction is the only specialist design role.
- Routine department routing is disabled.

## Premium UI Goal

Nexora must communicate:

- Premium streaming experience
- Clean cinematic dark atmosphere
- TV-first readability
- Remote-friendly interaction
- Strong focus clarity
- Quality beyond generic IPTV apps
- Safe/legal media-player identity

The user should feel they received a polished, high-quality application, not a raw prototype.

## Current Android UI Observations

Repo inspection shows the current UI already has a working Compose shell:

- `NexoraNavHost` routes Splash, Login, Activation, Home, Detail, Player, and Playlist/Profile screens.
- Home uses mock/local rows, side menu, header, cards, and status tiles.
- Detail screen opens mock content and routes to Player via `Play Mock`.
- Player screen is a safe shell and does not start playback on initial render.
- Activation flow supports local demo password `demo123`.

M15 does not change product behavior. It improves perceived quality and TV usability.

## M15 IN

Premium UI/UX polish direction:

- Splash visual polish
- Login visual polish
- Activation visual polish
- Home shell visual polish
- Detail screen visual polish
- Player shell visual polish
- Focus/navigation visual clarity
- Shared premium theme consistency
- TV-first spacing, scale, typography, and contrast
- Internal alpha APK handoff/readiness notes

## M15 OUT

M15 does not approve:

- Production deploy
- Store release
- Payment enforcement
- Provider integration
- Content hosting/channel selling
- Backend-owned stream/channel catalog
- Android bridge implementation
- Auth/session/token implementation
- Real playlist/provider fetch
- Playback/provider implementation
- DRM bypass
- Unauthorized source scraping
- Full redesign/rewrite
- Heavy architecture rewrite
- Release keystore/signing unless separately approved

## Visual Identity Direction

Style:

- Dark cinematic streaming UI
- Deep navy / black base
- Cyan/teal accent, used sparingly
- Soft gradients instead of flat black
- Premium card surfaces
- Rounded geometry
- Large typography for TV readability
- Subtle glow/focus highlights
- Calm, uncluttered screens

Avoid:

- Basic form-first prototype feeling
- Too many visible disclaimers on main UI
- Random bright colors everywhere
- Dense text blocks
- Mobile-style UI scaling
- Button-only layout feeling

## Screen Direction

### Splash

Improve from simple centered text to premium brand entry:

- Large NEXORA wordmark
- Small tagline
- Cinematic background gradient
- Soft accent glow
- Optional loading/status microcopy

### Login

Improve from plain form to TV-friendly access panel:

- Premium left-side brand/value panel
- Center/right glass card for fields
- Larger input/buttons
- Clear focus state
- Short safe mock note, not legal-wall text

### Activation

Keep demo flow but make it cleaner:

- Strong device activation card
- Clear demo code guidance
- State panel visually premium
- Reduce clutter from too many small cards if needed
- Continue button should feel primary when active

### Home

Most important screen.

Polish direction:

- More cinematic hero/header area
- Better side menu visual hierarchy
- Stronger selected/focused card scale/glow/border
- Card surfaces should feel premium even without poster images
- Rows should breathe with spacing
- Status tiles should not dominate
- Mock/local status can be subtle

### Detail

Polish direction:

- Hero poster/card area should feel like a real content detail surface
- Metadata and description should have clear hierarchy
- Play Mock should be strong primary CTA
- Back secondary CTA
- Legal/mock note should be smaller and secondary

### Player Shell

Polish direction:

- Make it feel like a real player shell placeholder
- Add subtle top/bottom overlay feel
- Center status card can be sleeker
- Keep playback disabled on initial render
- Keep safe player boundary visible but not ugly

## Focus / Remote Direction

Required for TV quality:

- Focus state must be obvious from couch distance
- Selected/focused cards should have visible border/glow/scale
- Menu selection and focus should not be visually confused
- Buttons should be large enough for remote navigation
- Avoid tiny text and dense controls

## Builder Minimum Patch Direction

Builder should keep this as a minimal polish pass.

Preferred implementation style:

- No navigation behavior changes
- No backend changes
- No real playback changes
- No provider/content integration
- Create small shared UI primitives if useful:
  - premium background
  - premium panel/card
  - focus border/glow helper
  - primary/secondary button style
- Update only visual Compose code for current screens

Likely target files:

- `app/src/main/java/com/nexora/tv/ui/screens/SplashScreen.kt`
- `app/src/main/java/com/nexora/tv/ui/screens/LoginScreen.kt`
- `app/src/main/java/com/nexora/tv/ui/screens/DeviceActivationScreen.kt`
- `app/src/main/java/com/nexora/tv/ui/screens/HomeScreen.kt`
- `app/src/main/java/com/nexora/tv/ui/screens/ContentDetailScreen.kt`
- `app/src/main/java/com/nexora/tv/ui/screens/PlayerScreen.kt`
- optional shared UI/theme file if minimal

## Acceptance Criteria

M15 UI polish can move to QA only after:

- APK builds
- App opens without crash
- Splash -> Login -> Activation demo123 -> Home still works
- Home focus/navigation still works
- Detail -> Play Mock -> Player shell still works
- No real stream starts automatically
- No provider/payment/auth/backend scope appears
- UI visibly feels more premium and TV-first than M14

## Director Recommendation

Proceed with Premium UI / Art Direction report first, then Builder minimal UI polish patch.

Builder must not start until the UI direction is accepted.
