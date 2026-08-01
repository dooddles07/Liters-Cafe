# Project Rules

Working conventions for this repo. See `~/.claude/CLAUDE.md` for global
response/workflow preferences; this file is project-specific.

## Content

- Menu prices/items: single source of truth is `lib/menu.ts`, transcribed
  from the physical in-store menu. Don't invent items or prices.
- Business info (address, hours, socials): `lib/site.ts` and `lib/hours.ts`.
  Verify against the owner before changing.
- Only use real, owner-supplied photography in `public/images/`. Track
  outstanding/needed shots in `IMAGES-TO-ADD.md` at repo root.
- `lib/images.ts` `expectedImages` must stay in sync with what's actually
  used across components - update it whenever an image slot changes.

## Code

- No external libraries unless necessary; current stack (Next.js, React,
  Tailwind, Motion, lucide-react) covers the site's needs.
- No backend/API routes unless a real requirement (e.g. a contact form
  needing server-side handling) shows up - keep the site static.
- Client components (`"use client"`) only where interactivity or browser
  APIs are actually needed (drink builder, favorites, animated reveals).
- Respect `prefers-reduced-motion` for any new animation.
- Image rendering goes through `components/site/cafe-image.tsx`, not raw
  `next/image`, so the "only render existing files" guard stays intact.

## Docs

- Markdown filenames use ALL-CAPS naming (e.g. `SOME-DESCRIPTION.md`).
- Log notable changes in `docs/ACTIVITY-LOG.md`.
- Don't auto-commit activity logs/docs - surface changes for review first.

## Git

- Keep commits focused and atomic with clear messages.
- No customer personal data or credentials in the repo, ever.
