# Decision Log

## 2026-05-16

- Monorepo architecture approved.
- Web app will use Next.js.
- API will use NestJS.
- Database layer will use Prisma and PostgreSQL.
- Redis will be used for short-lived operational cache and temporary transfer state.
- Shared code will live in `packages/shared`.
- Backend will not be an IPTV provider, stream host, CDN, relay, transcoder, playlist provider, or content source.
- Playlist profiles will be user-owned and device-local by default.
- Optional web-to-device playlist/profile push will be a temporary encrypted transfer bridge.
