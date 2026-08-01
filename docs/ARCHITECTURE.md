# Architecture

## Stack

- Next.js 15 (App Router, Turbopack dev server)
- React 19
- TypeScript
- Tailwind CSS 4
- Motion (Framer Motion successor) for animation
- Static, serverless: no database, no API routes, no auth

## Structure

```
app/                 Routes (App Router)
  page.tsx           Home page
  menu/               /menu route
  layout.tsx          Root layout, fonts, metadata
components/
  site/               Page sections (hero, story, featured, gallery,
                       drink-builder, menu-browser, contact, footer, ...)
  ui/                 Low-level building blocks (button, etc.)
lib/
  menu.ts             Menu data - categories, items, prices, drink options
  site.ts             Business info - address, socials, Messenger link builder
  hours.ts            Operating hours data
  reviews.ts           Curated Google review excerpts
  images.ts            Manifest of expected /public/images files
  use-favorites.ts     Client hook - localStorage-backed favorites list
  utils.ts             Shared helpers (cn, peso formatter, etc.)
public/images/         Real site photography (served statically)
docs/                  Project documentation (this folder)
```

## Data flow

All content is static, compiled at build time from `lib/*.ts`. There is no
backend: menu, hours, and reviews are hand-maintained TypeScript literals, not
fetched from a CMS or database. The only client-side persistence is
`localStorage` (favorites list) via `use-favorites.ts`.

## Ordering flow

There is no checkout or payment processing. "Ordering" means building a deep
link to Facebook Messenger (`m.me/litersnaga`) with the order pre-filled as
text (see `messengerLink()` in `lib/site.ts`). The customer sends the message
themselves; Liters staff take it from there.

## Rendering

Server Components by default; components that need interactivity or browser
APIs (drink builder, favorites, animated sections) are marked `"use client"`.
Images go through `components/site/cafe-image.tsx`, which wraps `next/image`
and only renders files confirmed present via `lib/images.ts`.
