# Testing Strategy

## Unit Tests

Test shared validators, constants, and pure business rules.

## API Tests

Test account, device, license, subscription, reseller, payment webhook, remote config, and version endpoints.

## Security Tests

Test authorization, rate limits, webhook verification, and temporary transfer expiration.

## Legal Boundary Tests

Confirm no API endpoint behaves as:

- Stream host
- Playlist provider
- Channel catalog
- CDN
- Relay
- Transcoder
