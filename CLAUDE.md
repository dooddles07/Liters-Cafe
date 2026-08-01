# Liters Cafe - project notes for Claude

Static Next.js marketing/menu site for a real cafe in Naga City. No backend,
no database, no auth, no payments. See `docs/` for the full picture:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - stack, structure, data flow
- [`docs/DESIGN.md`](docs/DESIGN.md) - visual direction, layout, tone
- [`docs/PRD.md`](docs/PRD.md) - what this site is for, user flows
- [`docs/SCHEMA.md`](docs/SCHEMA.md) - `lib/*.ts` data shapes
- [`docs/SECURITY.md`](docs/SECURITY.md) - threat surface (small, by design)
- [`docs/RULES.md`](docs/RULES.md) - project-specific working conventions
- [`docs/ACTIVITY-LOG.md`](docs/ACTIVITY-LOG.md) - change history

## Quick facts

- Menu/prices: edit `lib/menu.ts` only - transcribed from the physical
  in-store menu, don't invent items.
- Business info: `lib/site.ts`, `lib/hours.ts`.
- "Ordering" = a pre-filled Messenger deep link, not a real checkout.
- Images: real photos only, in `public/images/`; must be registered in
  `lib/images.ts` `expectedImages` and rendered via
  `components/site/cafe-image.tsx`.
- Outstanding photo needs: `IMAGES-TO-ADD.md` at repo root.

Global response/workflow preferences live in the user's `~/.claude/CLAUDE.md`
and apply on top of the above.
