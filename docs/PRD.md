# Product Requirements

## Problem

Liters Cafe (San Felipe Rd, Naga City) had no website. Customers found it via
a Facebook page only, with no easy way to browse the full menu, build a
custom milk tea order, or get directions/hours before visiting or messaging.

## Goal

A fast, mobile-first marketing + menu site that:

1. Shows what Liters serves (rice meals, pizza, pasta, burgers, milk tea by
   the liter) with real photography.
2. Lets a visitor configure a milk tea (flavor, size, series add-on, sinkers)
   and see the live price.
3. Converts interest into an order via a one-tap Messenger deep link with the
   order pre-filled as text - no checkout, no accounts, no payment on-site.
4. Surfaces trust signals (Google rating, review excerpts) and practical info
   (address, hours, map, directions).

## Non-goals

- No online payment / checkout.
- No account system or order history.
- No CMS - menu and copy are maintained by editing `lib/*.ts` directly.
- No multi-location support (single storefront).

## Primary user flows

1. **Browse & order** - Home → menu section or `/menu` → pick item(s) →
   "Order on Messenger" → pre-filled message opens in Messenger.
2. **Build a drink** - Home → drink builder → choose flavor/size/series/
   sinkers → total updates live → order via Messenger.
3. **Find the place** - Home → location section → map embed / directions
   link / hours.
4. **Save favorites** - Tap a menu item to favorite it (persisted locally);
   revisit later on the same device/browser.

## Success signals

- Messenger link click-through (not currently instrumented - no analytics
  wired up yet).
- Time-to-menu on mobile (page weight, image loading) kept low.

## Content ownership

The business owner supplies real photos (see `IMAGES-TO-ADD.md` at repo
root) and menu changes; the only source of truth for prices is the physical
in-store menu, transcribed into `lib/menu.ts`.
