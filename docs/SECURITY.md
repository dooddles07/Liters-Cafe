# Security

## Threat surface

Static marketing/menu site, no backend, no database, no authentication, no
payment processing. This significantly limits the attack surface.

- No user accounts, no login, no sessions.
- No server-side data store - nothing to exfiltrate or inject into.
- No forms that submit to a server. The only "submission" is a Messenger deep
  link (`m.me/...`) built client-side and opened in a new tab; the message is
  sent by the user from their own Messenger account, not by this site.
- No API routes (`app/api`) exist. If any are added later, treat them as the
  new primary attack surface and apply standard input validation / rate
  limiting.

## Client-side data

- `lib/use-favorites.ts` stores a list of menu item IDs in `localStorage`.
  No PII, no server sync. Safe by construction - worst case is a corrupted
  local list, caught by the `try/catch` around `JSON.parse`.

## Third-party surfaces

- Facebook / Messenger link (`lib/site.ts`) - outbound only, opens in the
  user's own Messenger. No embedded SDK, no tracking pixel from Meta on this
  site.
- Google Maps embed (`mapEmbedUrl`) - standard `?output=embed` iframe, no API
  key exposed (keyless embed).

## Content security

- All content is compiled at build time from trusted, repo-owned TypeScript
  files (`lib/menu.ts`, `lib/site.ts`, etc.) - no user-submitted content is
  ever rendered, so XSS via stored content is not applicable.
- Images are served from `public/images/` only; `lib/images.ts` acts as an
  allowlist so the app never attempts to render an arbitrary/unexpected file
  path.

## Secrets

None in use. No API keys, tokens, or credentials required by the current
stack. If any are added (analytics, forms backend, CMS), keep them in
environment variables, never committed, and update this file.

## Reporting

No dedicated security contact yet. Route issues through the repo owner.
