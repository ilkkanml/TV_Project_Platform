# Security And Privacy

## Security Goals

- Protect account access
- Protect device activation
- Protect payment event integrity
- Protect reseller credit changes
- Protect temporary profile transfer sessions
- Prevent abuse and scraping

## Privacy Goals

- Store the minimum required operational data.
- Avoid storing permanent playlist contents on the backend.
- Keep temporary transfer data encrypted and short lived.
- Provide deletion and revocation paths.

## Operational Controls

- Rate limiting
- Audit logs
- Role-based access control
- Secret management outside source control
- Webhook verification
- Encryption for sensitive temporary payloads
