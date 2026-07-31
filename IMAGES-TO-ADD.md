# Photos on the site, and which ones to swap

One real photo is live. The shot you dropped in `/images`, the frontage with the
plant wall and the bistro tables, is now `storefront-glass.jpg`. You'll see it in
the Our Place section and again in the gallery.

The other twelve are Unsplash stock. They're not Liters. They're standing in so
the site looks finished while you get real photography together.

Swapping one is a drag-and-drop. Save your photo into `public/images/` using the
same filename, overwriting the stock file. Nothing else to change. You can do
them one at a time, in any order.

Sources and license: [`public/images/CREDITS.md`](public/images/CREDITS.md).

---

## Replace these three first

Unsplash has almost no Filipino food, so these three don't show the dish they sit
next to. Anyone from Naga will notice straight away.

| Filename | Showing now | Shoot this instead |
| --- | --- | --- |
| `longganisa.jpg` | Sausage meatballs on greens | Your longganisa plate: sausage, rice, fried egg |
| `rice-meals.jpg` | A Korean rice bowl | Lechon kawali with tinuktok, baby back ribs, or cordon bleu |
| `chicken-rice.jpg` | Fried chicken on a banana leaf | Cheesy chicken, buffamayo, or chicken sisig over rice |

## Then your actual shop

Stock interiors are generic. Yours has the plant wall and the wooden box lights,
and those are the things reviewers keep bringing up. Real photos here will lift
the site more than anything else on this page.

| Filename | Showing now | Shoot this instead |
| --- | --- | --- |
| `storefront-night.jpg` | A generic warm cafe interior | Your facade at night with the lit **liters** sign. This one sits behind the whole hero, so use the widest, sharpest shot you have |
| `interior-ceiling.jpg` | Hanging plants over wooden tables | Your wooden box lights and the plant wall |

`storefront-glass.jpg` is already yours, so nothing to do there. It's 720×540,
which is sharp enough for the square tile it sits in. If you still have the
original at full size, dropping that in would help it hold up on big screens.

## The rest

These are the closest stock matches. They read fine, but they still aren't your
kitchen.

| Filename | Showing now |
| --- | --- |
| `lasagna.jpg` | Lasagna plated and in the dish |
| `pizza.jpg` | A whole pizza from above |
| `food-spread.jpg` | A shared table of burgers and fries |
| `brown-sugar.jpg` | Brown sugar milk tea with pearls |
| `fruit-tea.jpg` | Iced fruit tea with mint |
| `coffee-lineup.jpg` | An iced latte in a tall glass |
| `hero-drinks.jpg` | Blended fruit drinks |

Most of the real versions are already on your Facebook page:
<https://www.facebook.com/litersnaga/>

---

## A few tips

Phone photos are fine. Shoot food near the window rather than under the ceiling
lights, since daylight is kinder to it.

Landscape or square, roughly 1200 to 2000 px on the long edge. Bigger is fine
too, the site resizes and converts everything on the way out.

Keep the filename exactly as it is. `lasagna.jpg` has to stay `lasagna.jpg`, not
`Lasagna.JPG` and not `lasagna-new.jpg`. JPG, PNG, WebP and AVIF all work.

You don't need to restart anything while developing. If you've built the site for
production, rebuild it so the new photo gets picked up.

Delete a file instead of replacing it and that slot quietly goes back to a
branded placeholder tile. Nothing breaks, and the layout stays put.

## One file you can ignore

`logo.png` is never used. The **liters** wordmark is drawn in code
(`components/site/wordmark.tsx`) so it stays sharp at any size.

## Still waiting on you

1. **Opening hours.** `lib/hours.ts` has a placeholder in it right now
   (10 AM to 9 PM, 10 PM on weekends). The "Open now" badge and what Google reads
   off the site are both wrong until you correct it.
2. **Phone number.** `lib/site.ts`, currently empty.
3. **The Messenger handle.** The site assumes `m.me/litersnaga`, worked out from
   your Facebook URL. Worth clicking once to confirm it lands.
