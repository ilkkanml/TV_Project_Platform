# 16 - Release Bible

Compact release authority for TV Project Platform.

## Release Rule

Every release must stay inside the approved platform boundary.

A release must not introduce provider, distribution, relay, transcoding, catalog, marketplace, broadcast, or permanent user-profile-authority behavior.

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

Possible release types:

- documentation release
- foundation release
- web release
- API release
- database release
- app integration release
- app version release
- payment release
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
- device activation
- license checks
- app version rules
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

## App Release Rule

App version releases must respect app version control, minimum version, force update, and remote config decisions.

APK/file storage is allowed only for app distribution needs.

## Forbidden Release Content

Do not release features for:

- provider/distribution behavior
- relay/transcoding/CDN behavior
- public marketplace
- content catalog
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
