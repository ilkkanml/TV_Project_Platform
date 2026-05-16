# Operations And Deployment

## Environments

Suggested environments:

- local
- staging
- production

## Services

- Web application
- API application
- PostgreSQL
- Redis
- Optional mail testing service in local development

## Deployment Rules

- Production secrets must come from environment or secret manager.
- Database migrations should be reviewed.
- Logs must not expose secrets or sensitive playlist/profile data.
- Backups should protect platform operational data.
