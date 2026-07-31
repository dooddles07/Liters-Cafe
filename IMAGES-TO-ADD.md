# Photos: what is on the site now, and what to replace

**One real photo is live.** The shot you dropped in `/images` — the frontage with
the plant wall and bistro tables — is now `storefront-glass.jpg` and appears in
the Our Place section and the gallery.

**The other twelve are Unsplash stock.** Not Liters. They are there so the site
looks finished while you gather real photography.

Swapping one is a drag-and-drop: save your photo into `public/images/` using the
**same filename**, overwriting the stock file. No code changes. That is the whole
process, and you can do them one at a time.

Full source list and licence: [`public/images/CREDITS.md`](public/images/CREDITS.md).

---

## Replace these three first

Unsplash has essentially no Filipino food, so these images do not show the dish
they sit beside. A customer from Naga will spot it immediately.

| Filename | Currently shows | Take a photo of |
| --- | --- | --- |
| `longganisa.jpg` | Sausage meatballs on greens | Your longganisa plate — sausage, rice, fried egg |
| `rice-meals.jpg` | Korean-style rice bowl | Lechon kawali with tinuktok, baby back ribs, or cordon bleu |
| `chicken-rice.jpg` | Fried chicken on a banana leaf | Cheesy chicken, buffamayo, or chicken sisig over rice |

## Then these — your actual shop

Stock interiors are generic. Yours has the plant wall and the wooden box lights,
which is the thing reviewers keep mentioning. Real photos here will do more for
the site than anything else on this list.

| Filename | Currently shows | Take a photo of |
| --- | --- | --- |
| `storefront-night.jpg` | Generic warm cafe interior | Your facade at night with the lit **liters** sign — this is the hero background, so use the widest, highest-resolution shot you have |
| `interior-ceiling.jpg` | Hanging plants over wooden tables | Your wooden box lights and the plant wall |

`storefront-glass.jpg` is already your real photo — nothing to do there. It is
720×540, which is sharp enough for the square tile it sits in. If you have the
original at full resolution, dropping it in would let it hold up on large
screens too.

## The rest — food and drinks

Closest stock matches. They read fine, but they are still not your kitchen.

| Filename | Currently shows |
| --- | --- |
| `lasagna.jpg` | Lasagna plated and in the dish |
| `pizza.jpg` | Whole pizza, overhead |
| `food-spread.jpg` | Shared table of burgers and fries |
| `brown-sugar.jpg` | Brown sugar milk tea with pearls |
| `fruit-tea.jpg` | Iced fruit tea with mint |
| `coffee-lineup.jpg` | Iced latte in a tall glass |
| `hero-drinks.jpg` | Blended fruit drinks |

Most of the real versions are already on the Facebook page:
<https://www.facebook.com/litersnaga/>

---

## Tips

- **Format**: `.jpg`, `.png`, `.webp`, `.avif` all work. Next.js converts and
  resizes on the fly.
- **Size**: 1200–2000 px on the long edge. Phone photos are fine; natural light
  near the window beats the ceiling lights for food.
- **Keep the filename identical** — `lasagna.jpg` must stay `lasagna.jpg`, not
  `Lasagna.JPG` or `lasagna-new.jpg`.
- No restart needed in development; the file list is re-read on each request.
  A **production build does** need rebuilding, since the pages are prerendered.
- Delete a file instead of replacing it and that slot cleanly reverts to the
  branded placeholder tile — nothing breaks and the layout does not shift.

## One file you do not need

`logo.png` is never used. The **liters** wordmark is drawn in code
(`components/site/wordmark.tsx`) so it stays sharp at any size.

## Also still needed

1. **Opening hours** — `lib/hours.ts` currently holds a placeholder
   (10 AM–9 PM, to 10 PM on weekends). The "Open now" badge and the Google
   structured data are both wrong until this is corrected.
2. **Phone number** — `lib/site.ts`, currently `null`.
3. **Verify the Messenger handle** — the site assumes `m.me/litersnaga`,
   derived from the Facebook URL.
