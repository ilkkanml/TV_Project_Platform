# Remote Config And App Versioning

## Remote Config

Remote config can control safe operational app behavior such as feature flags, maintenance notices, minimum app versions, support links, and UI messaging.

Remote config must not provide stream sources or provider playlists.

## App Version Checks

App version checks may return:

- Current version
- Minimum supported version
- Update URL placeholder
- Maintenance status
- Release notes
- Force update flag

## Rules

- Keep app version data separate from playlist data.
- Do not use remote config as a hidden content source.
