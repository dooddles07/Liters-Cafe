import fs from "node:fs";
import path from "node:path";

/**
 * Which photos the owner has actually dropped into /public/images.
 * Read once on the server so the client never requests a file that
 * isn't there - a 404'd <img> is both ugly and console noise.
 */
export function readAvailableImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  } catch {
    return [];
  }
}

/** Every photo the site will use, and where it belongs. */
export const expectedImages = [
  { file: "logo.png", use: "Header and footer wordmark" },
  { file: "storefront-night.jpg", use: "Hero background + Story top image - the storefront" },
  { file: "storefront-inside.jpg", use: "Story section - dining room" },
  { file: "plant-wall.jpg", use: "Story section - the plant wall" },
  { file: "storefront-glass.jpg", use: "Gallery" },
  { file: "interior-ceiling.jpg", use: "Gallery - wooden lights" },
  { file: "hero-drinks.jpg", use: "Hero float + frappe cards" },
  { file: "food-spread.jpg", use: "Featured - burger, pasta, nachos" },
  { file: "rice-meals.jpg", use: "Featured - rice meal plates" },
  { file: "chicken-rice.jpg", use: "Featured - chicken rice bowls" },
  { file: "lasagna.jpg", use: "Featured - the lasagna" },
  { file: "pizza.jpg", use: "Featured - pizza" },
  { file: "coffee-lineup.jpg", use: "Espresso bar" },
  { file: "fruit-tea.jpg", use: "Fruit tea and lemonade" },
  { file: "brown-sugar.jpg", use: "Milk tea / By the Litre" },
  { file: "longganisa.jpg", use: "Breakfast plate" },
] as const;
