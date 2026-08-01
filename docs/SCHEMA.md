# Schema

No database. "Schema" here means the TypeScript data shapes in `lib/`.

## Menu (`lib/menu.ts`)

```ts
type SizeKey = "16oz" | "22oz" | "1L" | "hot" | "cold";

type CategoryId =
  | "rice-meals" | "pizza" | "burger" | "pasta" | "fries"
  | "chicken-fries" | "nachos" | "milk-tea" | "fruit-tea"
  | "lemonade" | "frappe" | "espresso-frappe" | "espresso"
  | "hot-drinks" | "yogurt";

type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  price?: number;                        // fixed-price food items
  prices?: Partial<Record<SizeKey, number>>; // size-priced drinks
  image?: string;
  note?: string;
  popular?: boolean;
};

type Category = {
  id: CategoryId;
  name: string;
  group: "Food" | "Drinks";
  blurb: string;
  sizes?: SizeKey[];
};
```

Drink-builder-only data (also in `lib/menu.ts`): `series` (flavor add-ons) and
`sinkers` (toppings), each `{ id, name, price }`.

## Site info (`lib/site.ts`)

```ts
type Site = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  address: { street; city; region; postalCode; country };
  geo: { lat; lng };
  facebook: string;
  messenger: string;
  rating: { value; count };
  phone: string | null;
};
```

## Favorites (`lib/use-favorites.ts`)

`localStorage["liters:favorites"]` - JSON array of `MenuItem["id"]` strings.
No server sync, no expiry, per-browser only.

## Reviews / hours

`lib/reviews.ts` and `lib/hours.ts` follow the same pattern: hand-authored
literal arrays/objects, typed, no external source of truth.

## Image manifest (`lib/images.ts`)

`expectedImages: { file: string; use: string }[]` - documents which files in
`public/images/` are expected and what they're used for. Read at build/runtime
to avoid rendering `<img>` tags for files that don't exist yet.
