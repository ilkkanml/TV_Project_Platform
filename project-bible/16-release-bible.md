# 16 - Release Bible

Compact release authority for TV Project Platform.

## Release Rule

Every release must stay inside the approved web/API platform boundary.

A release must not introduce provider, distribution, relay, transcoding, catalog, marketplace, broadcast, playback-control, stream-authority, player-distribution-policy, or permanent user-profile-authority behavior.

## Release Philosophy

Every release should be:

- safe
- reviewable
- tested
- documented
- reversible where possible
- security-aware
- data-safe
- milestone-scoped

## Release Types

Possible platform release types:

- documentation release
- foundation release
- web release
- API release
- database release
- app-support integration release
- app version metadata release
- remote config release
- payment record release
- reseller release
- security release
- hotfix release
- production release

## Documentation Release

Documentation release updates active project memory or authority files.

Active documentation files must not reference removed files as active dependencies.

Documentation releases must not create conflicting product, security, workflow, or milestone decisions.

## Code Release

Code release must be tied to active milestone scope.

Do not release unverified code paths.

Do not claim feature completion without implementation and validation.

## Database Release

Database changes require extra care.

Before database release:

- schema change is reviewed
- migration path is known
- rollback or recovery path is considered
- critical data is protected
- relations/indexes support expected access patterns

## Security-Sensitive Release

Extra review required for changes involving:

- authentication
- authorization
- payments
- reseller credit
- subscriptions
- device records/status
- license/access checks
- app version metadata
- remote config
- temporary transfer
- secrets or environment variables

## Deployment Requirements

Deployment requires:

- Director approval
- dry run
- path whitelist
- backup/checkpoint
- validation result
- audit log
- rollback plan

AI may not silently deploy generated output.

## Validation Direction

Validation is internal-first.

External CI workflow has been removed from active use.

Until internal validation exists, use local/manual validation commands and record failures as compact error packages.

## Rollback Rule

Rollback must restore a known good state.

Rollback may use:

- previous code version
- checkpoint
- backup
- database recovery path

Rollback must be logged.

## App-Support Release Rule

This platform repo may release app-support metadata and configuration only:

- app version metadata
- minimum supported version metadata
- force update flag
- maintenance status
- remote config values
- app-support API contracts

Player app release, APK/file hosting, marketplace publishing, sideloading, Downloader-code decisions, and player distribution strategy belong to the separate player app project.

## Forbidden Release Content

Do not release features for:

- provider/distribution behavior
- relay/transcoding/CDN behavior
- public marketplace
- content catalog
- backend playback control
- player distribution policy
- permanent user-profile credential authority
- public profile search
- shared profile library

## Related Authority Files

- project-bible/00-project-rules.md
- project-bible/03-feature-list.md
- project-bible/06-security-bible.md
- project-bible/12-devops-bible.md
- project-bible/14-testing-bible.md
- ROADMAP.md
- PROJECT_STATE.md
- docs/development-workflow.md

## Final Release Rule

No release passes without scope alignment, validation, rollback awareness, and Director approval.