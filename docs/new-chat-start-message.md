# New Chat Start Message

Use this message when starting a new AI coding session:

```text
GitHub repo or local project: TV_Project_Platform

Work as a coding agent for a Licensed IPTV Player Platform.

Read first:
- README.md
- PROJECT_STATE.md
- AI_HANDOFF.md
- ROADMAP.md
- LEGAL_SCOPE.md
- project-bible/
- docs/

Critical boundary:
This is not an IPTV provider. Backend must not provide streams, host streams, sell channel lists, operate as CDN/relay/transcoder, become playlist provider, or become content source.

Backend manages account, subscription/license, device activation, payment, reseller credits, app version checks, remote config, and optional temporary encrypted web-to-device playlist/profile transfer.

Playlist source of truth is not backend. Playlist is user-owned and stored encrypted on device by default.
```
