# Design

## Direction

Warm, small-cafe feel over generic SaaS polish. Real photography (not stock)
drives the visual identity: the lit storefront sign, the plant wall, the
wooden box ceiling lights.

## Visual language

- Display font for headings (see `app/layout.tsx` font setup), sans for body.
- Warm neutral palette with a single accent color (used for ratings, prices,
  category highlights, section eyebrows).
- Rounded-2xl imagery, soft shadows, subtle border rings (`ring-border/60`)
  rather than hard drop shadows.
- Motion is restrained: fade/rise-in reveals on scroll (`components/site/
  reveal.tsx`), gentle floating drink cards in the hero, all respecting
  `prefers-reduced-motion` via Motion's `reducedMotion="user"` config.

## Layout

- Mobile-first, single-column stacking that opens into 2-column grids at
  `lg`.
- Section rhythm: hero → story ("Our Place") → featured dishes → drink
  builder → menu browser → gallery → reviews → location → contact → footer.
- Container width capped via `container-page` utility class for consistent
  side padding across sections.

## Imagery

- Hero background: dimmed storefront-at-night photo behind a translucent
  background layer (`bg-background/88`) so headline text stays readable in
  both light and dark mode.
- "Our Place" (story) section: one wide image (storefront) + two square
  images (interior, plant wall) in a 2-column grid.
- `components/site/cafe-image.tsx` centralizes image rendering so alt text,
  sizing, and the "only render if file exists" guard stay consistent.

## Theming

Light/dark mode supported throughout via Tailwind's dark variant; background
overlays and text colors have explicit dark-mode counterparts rather than
relying on a single flat palette.

## Copy tone

Short, specific, slightly conversational - written like someone who actually
eats there ("the lasagna is the one people keep writing about"), not generic
marketing copy.
