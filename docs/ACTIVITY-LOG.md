# Activity Log

## 2026-07-31: Initial build

Built the Liters Cafe site from an empty folder containing only four photos of
the in-store laminated menu.

### Stack

Next.js 15.5.22 (App Router, Turbopack) · React 19.2 · Tailwind v4.3 ·
TypeScript 5.9 · Motion 12.43 (`motion`, from motiondivision/motion) ·
lucide-react. Package manager pnpm 11.

`create-next-app` could not be used, because it derives the npm package name from the
directory, and "Liters Cafe" fails npm naming rules (space, capitals). Scaffolded
by hand instead; `package.json` is named `liters-cafe` independent of the folder.

### Design decisions

- **Rejected the ui-ux-pro-max palette.** It returned a generic appetizing-red
  restaurant scheme. The real brand is a black wordmark box, pine interiors, a
  plant wall and warm string lights, so the palette was rebuilt from that:
  cream `#FAF7F2`, espresso `#1A1614`, caramel `#C98A3E`, plant green `#3F5D45`.
- **Caramel buttons use dark text.** White on `#C98A3E` is 2.6:1 and fails WCAG.
  `--accent-foreground` is `#1A1614` (~8:1).
- Dark mode follows `prefers-color-scheme` and mirrors the evening storefront.
- Type: Playfair Display (display) + Karla (body), via `next/font/google`.

### 21st.dev components used

Account is on the paid tier (unlimited retrievals).

| Source | id | How it was used |
| --- | --- | --- |
| Menu Item Card | 7794 | Base for `components/site/menu-card.tsx`. Reworked for pesos, per-size pricing, and a save-for-later heart instead of a cart button. |
| Reviews Carousel | 18924 | Base for `components/ui/reviews-carousel.tsx`. Fixed: Spanish aria-labels → English, `bg-brand` → `bg-accent`, star ratings added, and the global window keydown listener scoped to the carousel (it was stealing arrow keys from the whole page). |
| Masonry Grid | 7845 | Its CSS scroll-driven animation kept for the gallery; card chrome dropped. |
| Floating Food Hero | 8435 | Structure only (floating images around centered type); rewritten with Motion. |
| Infinite Marquee | 20137 | **Rejected** — depends on `@editframe/react`, a video-render library. Written as a ~20-line CSS loop instead. |

### Features built

Beyond the requested scope, these were added as fitting for a small PH cafe:

- **Drink Builder** (`#build`) — flavor × size × series × sinkers with a
  spring-animated live peso total, off the real menu data.
- **Order on Messenger** — `m.me` deep links throughout; the builder and the
  saved list both compose a pre-filled order message. No cart, no payments.
- **By the Liter** section — leans on the brand name; 1 L milk tea is ₱89–119.
- **Open/Closed badge** — computed in `Asia/Manila`, updates every minute.
- **Saved list** — localStorage hearts, floating bar, sends to Messenger.
- Menu search + category filters, reviews carousel, map/hours, contact form.

Deliberately **not** built: cart/checkout/payments, live Google Reviews API,
CMS, loyalty accounts, multi-language.

### Bugs found and fixed during verification

1. **Hydration mismatch under reduced motion.** `useReducedMotion()` returns
   `false` on the server and `true` on the client, so `initial={reduce ? …}`
   produced different markup on each side, and React reported it would not patch
   it up. Fixed by adding `MotionConfig reducedMotion="user"`
   (`components/site/motion-provider.tsx`) and removing all hook branching from
   `initial` props. Motion now strips transforms itself.
2. **Nested anchors in the hero** — a `ButtonLink` (`<a>`) inside a Next
   `<Link>` (`<a>`). Replaced with `buttonVariants()` on the `Link`.
3. **Dark tokens were unreachable** — defined under `.dark` but nothing ever
   applied the class. Added a `prefers-color-scheme: dark` block.
4. **Placeholder tiles too faint** to read as content; deepened and given warm
   hatching.
5. **Gallery labels truncated mid-phrase** ("Two servings of") because they were
   sliced from alt text. Given explicit short labels.
6. **Missing favicon** (404) — added `app/icon.svg`.
7. **pnpm blocked on sharp's build script.** The `pnpm.onlyBuiltDependencies`
   field in package.json is ignored by pnpm 11; the setting lives in
   `pnpm-workspace.yaml` as `allowBuilds`.

### Verification results

- `pnpm build` succeeds; both routes statically prerendered; 174 kB first load JS.
- `npx tsc --noEmit` clean.
- Console: 0 errors, 0 warnings on both pages.
- Drink builder math spot-checked: 22 oz Wintermelon + Creamcheese + Pearl =
  **₱129** (79+30+20); 1 L Choco + Nutella + Oreo + Graham = **₱209**
  (119+40+25+25). Series correctly single-select, sinkers multi-select.
- Saved list: Lasagna ₱150 + Lasagna Chicken ₱269 = **₱419**.
- Search "lasagna" → 3 results.
- No horizontal overflow at 375 / 768 / 1024 / 1440.
- Reduced motion: animations suppressed, all content still at opacity 1.
- Keyboard: skip link first, logical order, every control has a visible ring.
- Image fallback verified in mixed state. One real photo rendered optimized
  while the rest showed placeholders, no failed requests.

### Open items for the owner

Tracked in `IMAGES-TO-ADD.md`:

1. Real photos into `public/images/` (14 filenames listed).
2. **Opening hours** — `lib/hours.ts` is a placeholder; the Open badge and the
   Google structured data are wrong until corrected.
3. **Phone number** — `lib/site.ts`, currently `null`.
4. **Verify `m.me/litersnaga`** resolves.

### Note

The dev server currently runs on **port 3001**, because a stale process was holding
3000 during the session. `pnpm dev` on a clean machine will use 3000.

---

## 2026-08-01: Filled the blank image slots

`public/images/` was empty, so all 13 photo slots rendered the placeholder tile.
The owner chose **Unsplash stock** as an interim fill after being told plainly
that showing other businesses' food under the Liters name misrepresents a real
restaurant. Concern raised once, decision theirs, built in full.

### Sourcing

Unsplash returns **401 on everything unauthenticated**: `/s/photos`, individual
photo pages, `/napi/search`, topic feeds. Only `images.unsplash.com` (the raw
CDN) is open, so photo IDs cannot be discovered through the site. Pexels needs a
key; Openverse is keyless but returns amateur CC-BY-SA Flickr shots.

Approach used: assemble candidate IDs, fetch them from the CDN, and composite
them into **labeled contact sheets with sharp** so 36 candidates could be judged
in one image instead of 36 separate reads. Four sheets, ~120 candidates reviewed.

`sharp` was added as an explicit devDependency, since pnpm does not hoist Next's
transitive copy to the top level, and Next wants it for production image
optimization regardless.

### Three candidates rejected on sight

This is why the visual pass was not optional. HTTP 200 says nothing about what a
photo depicts.

1. A cafe exterior with a legible **"N°15 COFFEE SHOP"** chalkboard and
   **"Le Petit Palace"** signage, which would have put another business's branding on the hero.
2. A daytime shot of a **lighting store**, picked for the night-storefront slot.
3. A **bar** with liquor shelving and neon, for the hero background of a family
   cafe.

A fourth error was mine: I took a photo ID from the wrong contact-sheet index and
got a bonsai tree in the hero slot. Caught on re-verification.

### A real photo landed

The owner dropped `images/liters real san felipe branch place` (a 720×540 WebP)
at the project root. It is the actual San Felipe frontage at night, plant wall,
bistro tables, lit `liters` sign. Converted to JPEG and promoted into
`storefront-glass.jpg`, replacing the stock. **One of the thirteen is now real.**

Next's image optimizer served the stale bytes at first; `.next/cache/images`
had to be cleared. Worth knowing when swapping any other file in dev.

### Menu data touched

Five items changed in `lib/menu.ts`, the only code change this session:

- Four best-sellers (Wintermelon, Salted Caramel milk tea, Peach lemonade,
  Salted Caramel frappe) had no `image`, so the Featured grid showed four
  placeholder tiles among photos. Assigned category images.
- `cordon-bleu` moved from `rice-meals.jpg` to `chicken-rice.jpg`, because three
  identical photos were sitting side by side in the grid, and cordon bleu is
  breaded chicken anyway.

### Verification

- **Zero** fallback tiles remain on either page, at 1440 and 375. 33 real images.
- Console clean, no failed image requests, no horizontal overflow.
- Dish mapping spot-checked: Lasagna → `lasagna.jpg`, Pizza Supreme → `pizza.jpg`,
  Caramel Macchiato → `coffee-lineup.jpg`, Cordon Bleu → `chicken-rice.jpg`,
  Beef Nachos → `food-spread.jpg`.
- Light and dark full-page screenshots reviewed; palette holds with photography.
- **Revert test**: deleted `pizza.jpg`, confirmed that slot alone fell back to a
  labeled placeholder with zero failed requests, then restored it. The owner's
  swap path works.
- `npx tsc --noEmit` clean, `pnpm build` passes, both routes still prerendered.

### Known weak spots

`longganisa.jpg` (sausage meatballs), `rice-meals.jpg` (Korean rice bowl) and
`chicken-rice.jpg` (fried chicken on banana leaf) do not show the Filipino dishes
they label. Unsplash has no usable Filipino food. Flagged at the top of both
`IMAGES-TO-ADD.md` and `public/images/CREDITS.md` as first to replace.

Repetition is also visible in the Featured grid. 13 images covering 93 menu
items means several cards share a photo. It resolves itself as real photos land.
