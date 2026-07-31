# Photos to add

Drop these into `public/images/` using **exactly these filenames**. The site
already references them.

Until a file exists the site shows a warm branded tile in its place — nothing
breaks, nothing 404s, and the layout does not shift when you add one. Add them
in any order.

| Filename | What it should be |
| --- | --- |
| `storefront-night.jpg` | The lit facade with the neon `liters` sign. Used as the hero background — pick the widest shot you have. |
| `storefront-glass.jpg` | Glass frontage with the bistro tables out front. |
| `interior-ceiling.jpg` | The wooden box lights and the plant wall. |
| `hero-drinks.jpg` | The five topped frappes on the green background. |
| `brown-sugar.jpg` | Brown sugar milk tea in branded cups. |
| `fruit-tea.jpg` | Three hands holding fruit tea cups against the sky. |
| `coffee-lineup.jpg` | Latte / mocha / macchiato / salt cream on the concrete blocks. |
| `food-spread.jpg` | The board with burger, spaghetti, nachos and chicken with fries. |
| `rice-meals.jpg` | Salisbury steak, cordon bleu, baby back ribs, lechon kawali. |
| `chicken-rice.jpg` | Buffamayo / cheesy buffalo / cheesy chicken / chicken sisig. |
| `lasagna.jpg` | The lasagna with garlic bread. |
| `pizza.jpg` | Supreme pizza. |
| `longganisa.jpg` | Longganisa rice plate by the window. |
| `logo.png` | The black `liters cafe` logo tile. Optional — the header draws the wordmark itself. |

Most of these are already on the Facebook page:
<https://www.facebook.com/litersnaga/>

## Notes

- **Format**: `.jpg`, `.png`, `.webp` and `.avif` all work. Next.js converts to
  WebP/AVIF on the fly.
- **Size**: 1600px on the long edge is plenty. Bigger just slows the first load.
- **Restart** the dev server after adding files — the available-image list is
  read once at startup.

## Also still needed

1. **Opening hours** — `lib/hours.ts` currently holds a placeholder
   (10 AM–9 PM, to 10 PM on weekends). The "Open now" badge and the Google
   structured data are both wrong until this is corrected.
2. **Phone number** — `lib/site.ts`, currently `null`.
3. **Verify the Messenger handle** — the site assumes `m.me/litersnaga`,
   derived from the Facebook URL.
