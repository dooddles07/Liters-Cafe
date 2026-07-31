/**
 * Transcribed directly from the four in-store menu photos in /public/menu-cards.
 * Prices are in PHP. If the physical menu changes, this file is the only
 * place that needs editing.
 */

export type SizeKey = "16oz" | "22oz" | "1L" | "hot" | "cold";

export type CategoryId =
  | "rice-meals"
  | "pizza"
  | "burger"
  | "pasta"
  | "fries"
  | "chicken-fries"
  | "nachos"
  | "milk-tea"
  | "fruit-tea"
  | "lemonade"
  | "frappe"
  | "espresso-frappe"
  | "espresso"
  | "hot-drinks"
  | "yogurt";

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  /** Fixed-price items (food). */
  price?: number;
  /** Size-priced items (drinks). */
  prices?: Partial<Record<SizeKey, number>>;
  image?: string;
  note?: string;
  popular?: boolean;
};

export type Category = {
  id: CategoryId;
  name: string;
  group: "Food" | "Drinks";
  blurb: string;
  sizes?: SizeKey[];
};

export const categories: Category[] = [
  {
    id: "rice-meals",
    name: "Rice Meals",
    group: "Food",
    blurb: "Served with rice and a side. Most people order from here.",
  },
  { id: "pizza", name: "Pizza", group: "Food", blurb: "Hand-topped, oven-baked." },
  { id: "burger", name: "Burgers", group: "Food", blurb: "Stacked and griddled to order." },
  { id: "pasta", name: "Pasta", group: "Food", blurb: "With garlic bread on the side." },
  { id: "fries", name: "Fries", group: "Food", blurb: "Loaded three ways." },
  { id: "chicken-fries", name: "Chicken & Fries", group: "Food", blurb: "Boneless bites and fries to share." },
  { id: "nachos", name: "Nachos", group: "Food", blurb: "Buried under cheese." },
  {
    id: "milk-tea",
    name: "Milk Tea",
    group: "Drinks",
    blurb: "Twelve flavors. Available by the full liter.",
    sizes: ["16oz", "22oz", "1L"],
  },
  {
    id: "fruit-tea",
    name: "Fruit Tea",
    group: "Drinks",
    blurb: "Light, cold, and fruit-forward.",
    sizes: ["16oz", "22oz", "1L"],
  },
  { id: "lemonade", name: "Lemonade", group: "Drinks", blurb: "The 22oz that keeps showing up in reviews.", sizes: ["22oz"] },
  { id: "frappe", name: "Frappe", group: "Drinks", blurb: "Blended, topped with cream.", sizes: ["22oz"] },
  { id: "espresso-frappe", name: "Espresso Frappe", group: "Drinks", blurb: "Frappe with a real shot in it.", sizes: ["22oz"] },
  { id: "espresso", name: "Espresso Bar", group: "Drinks", blurb: "Hot or over ice.", sizes: ["hot", "cold"] },
  { id: "hot-drinks", name: "Hot Drinks", group: "Drinks", blurb: "For the rainy Naga afternoons." },
  { id: "yogurt", name: "Yogurt", group: "Drinks", blurb: "Tart, creamy, cold.", sizes: ["16oz"] },
];

export const items: MenuItem[] = [
  // ---------------------------------------------------------------- Rice Meals
  { id: "lechon-kawali-tinuktok", name: "Lechon Kawali with Tinuktok", category: "rice-meals", price: 190, image: "rice-meals.jpg", popular: true },
  { id: "lechon-kawali", name: "Lechon Kawali", category: "rice-meals", price: 155 },
  { id: "baby-back-ribs", name: "Baby Back Ribs", category: "rice-meals", price: 199, image: "rice-meals.jpg", popular: true },
  { id: "hungry-back", name: "Hungry Back", category: "rice-meals", price: 289, note: "The big one" },
  { id: "pork-sisig", name: "Pork Sisig", category: "rice-meals", price: 145 },
  { id: "pork-tocino", name: "Pork Tocino", category: "rice-meals", price: 149 },
  { id: "longganisa", name: "Longganisa", category: "rice-meals", price: 129, image: "longganisa.jpg" },
  { id: "hungarian", name: "Hungarian", category: "rice-meals", price: 129 },
  { id: "sausage-delight", name: "Sausage Delight", category: "rice-meals", price: 189 },
  { id: "salisbury-steak", name: "Salisbury Steak", category: "rice-meals", price: 199, image: "rice-meals.jpg" },
  { id: "cordon-bleu", name: "Cordon Bleu", category: "rice-meals", price: 189, image: "chicken-rice.jpg", popular: true },
  { id: "boneless-fried-chicken", name: "Boneless Fried Chicken", category: "rice-meals", price: 149, note: "+₱15 for spicy" },
  { id: "buffamayo", name: "Buffamayo", category: "rice-meals", price: 159, image: "chicken-rice.jpg" },
  { id: "cheesy-buffalo", name: "Cheesy Buffalo", category: "rice-meals", price: 159, image: "chicken-rice.jpg" },
  { id: "cheesy-chicken", name: "Cheesy Chicken", category: "rice-meals", price: 159, image: "chicken-rice.jpg" },
  { id: "chicken-sisig", name: "Chicken Sisig", category: "rice-meals", price: 169, image: "chicken-rice.jpg", popular: true },

  // -------------------------------------------------------------------- Pizza
  { id: "pizza-supreme", name: "Pizza Supreme", category: "pizza", price: 250, image: "pizza.jpg", popular: true },
  { id: "pizza-pepperoni", name: "Pepperoni", category: "pizza", price: 220, image: "pizza.jpg" },
  { id: "pizza-hawaiian", name: "Hawaiian", category: "pizza", price: 220 },
  { id: "pizza-beef-mushroom", name: "Beef & Mushroom", category: "pizza", price: 220 },
  { id: "pizza-all-meat", name: "All Meat", category: "pizza", price: 250 },

  // ------------------------------------------------------------------ Burgers
  { id: "cheese-burger", name: "Cheese Burger", category: "burger", price: 190 },
  { id: "bacon-cheese-burger", name: "Bacon Cheese Burger", category: "burger", price: 220, image: "food-spread.jpg", popular: true },
  { id: "chicken-burger", name: "Chicken Burger", category: "burger", price: 200 },
  { id: "spicy-chicken-burger", name: "Spicy Chicken Burger", category: "burger", price: 215 },

  // -------------------------------------------------------------------- Pasta
  { id: "spaghetti", name: "Spaghetti", category: "pasta", price: 145 },
  { id: "chicken-spaghetti", name: "Chicken Spaghetti", category: "pasta", price: 260, image: "food-spread.jpg" },
  { id: "spicy-chicken-spaghetti", name: "Spicy Chicken Spaghetti", category: "pasta", price: 275 },
  { id: "lasagna", name: "Lasagna", category: "pasta", price: 150, image: "lasagna.jpg", popular: true, note: "The one the reviews keep naming" },
  { id: "lasagna-chicken", name: "Lasagna Chicken", category: "pasta", price: 269, image: "lasagna.jpg" },
  { id: "lasagna-chicken-spicy", name: "Lasagna Chicken Spicy", category: "pasta", price: 285 },

  // -------------------------------------------------------------------- Fries
  { id: "fries-cheese", name: "Cheese Fries", category: "fries", price: 130 },
  { id: "fries-sour-cream", name: "Sour Cream Fries", category: "fries", price: 130 },
  { id: "fries-barbeque", name: "Barbeque Fries", category: "fries", price: 130 },

  // --------------------------------------------------------- Chicken & Fries
  { id: "cf-plain", name: "Chicken & Fries", category: "chicken-fries", price: 200, image: "food-spread.jpg" },
  { id: "cf-cheese", name: "Chicken & Fries · Cheese", category: "chicken-fries", price: 220 },
  { id: "cf-sour-cream", name: "Chicken & Fries · Sour Cream", category: "chicken-fries", price: 220 },
  { id: "cf-barbeque", name: "Chicken & Fries · Barbeque", category: "chicken-fries", price: 220 },

  // ------------------------------------------------------------------- Nachos
  { id: "beef-nachos", name: "Beef Nachos", category: "nachos", price: 170, image: "food-spread.jpg", popular: true },

  // ----------------------------------------------------------------- Milk Tea
  { id: "mt-classic", name: "Classic", category: "milk-tea", prices: { "16oz": 59, "22oz": 69, "1L": 89 }, image: "brown-sugar.jpg" },
  { id: "mt-wintermelon", name: "Wintermelon", category: "milk-tea", prices: { "16oz": 69, "22oz": 79, "1L": 99 }, image: "brown-sugar.jpg", popular: true },
  { id: "mt-okinawa", name: "Okinawa", category: "milk-tea", prices: { "16oz": 69, "22oz": 79, "1L": 99 } },
  { id: "mt-matcha", name: "Matcha", category: "milk-tea", prices: { "16oz": 75, "22oz": 85, "1L": 109 } },
  { id: "mt-thai", name: "Thai", category: "milk-tea", prices: { "16oz": 75, "22oz": 85, "1L": 109 } },
  { id: "mt-strawberry", name: "Strawberry", category: "milk-tea", prices: { "16oz": 75, "22oz": 85, "1L": 109 } },
  { id: "mt-taro", name: "Taro", category: "milk-tea", prices: { "16oz": 75, "22oz": 85, "1L": 109 } },
  { id: "mt-salted-caramel", name: "Salted Caramel", category: "milk-tea", prices: { "16oz": 75, "22oz": 85, "1L": 109 }, image: "brown-sugar.jpg", popular: true },
  { id: "mt-choco-hokkaido", name: "Choco Hokkaido", category: "milk-tea", prices: { "16oz": 79, "22oz": 89, "1L": 119 } },
  { id: "mt-red-velvet", name: "Red Velvet", category: "milk-tea", prices: { "16oz": 79, "22oz": 89, "1L": 119 } },
  { id: "mt-dark-choco", name: "Dark Choco", category: "milk-tea", prices: { "16oz": 79, "22oz": 89, "1L": 119 } },
  { id: "mt-choco", name: "Choco", category: "milk-tea", prices: { "16oz": 79, "22oz": 89, "1L": 119 } },

  // ---------------------------------------------------------------- Fruit Tea
  { id: "ft-house-blend", name: "House Blend", category: "fruit-tea", prices: { "16oz": 70, "22oz": 80, "1L": 110 }, image: "fruit-tea.jpg", popular: true },
  { id: "ft-strawberry", name: "Strawberry", category: "fruit-tea", prices: { "16oz": 60, "22oz": 70, "1L": 100 } },
  { id: "ft-blueberry", name: "Blueberry", category: "fruit-tea", prices: { "16oz": 60, "22oz": 70, "1L": 100 } },
  { id: "ft-passion-fruit", name: "Passion Fruit", category: "fruit-tea", prices: { "16oz": 60, "22oz": 70, "1L": 100 } },
  { id: "ft-lychee", name: "Lychee", category: "fruit-tea", prices: { "16oz": 60, "22oz": 70, "1L": 100 } },
  { id: "ft-peach", name: "Peach", category: "fruit-tea", prices: { "16oz": 60, "22oz": 70, "1L": 100 } },

  // ----------------------------------------------------------------- Lemonade
  { id: "lem-classic", name: "Classic", category: "lemonade", prices: { "22oz": 80 }, image: "fruit-tea.jpg" },
  { id: "lem-strawberry", name: "Strawberry", category: "lemonade", prices: { "22oz": 95 } },
  { id: "lem-blueberry", name: "Blueberry", category: "lemonade", prices: { "22oz": 95 } },
  { id: "lem-passion-fruit", name: "Passion Fruit", category: "lemonade", prices: { "22oz": 95 } },
  { id: "lem-peach", name: "Peach", category: "lemonade", prices: { "22oz": 95 }, image: "fruit-tea.jpg", popular: true, note: "Named in the reviews" },
  { id: "lem-lychee", name: "Lychee", category: "lemonade", prices: { "22oz": 95 } },

  // ------------------------------------------------------------------- Frappe
  { id: "fr-strawberry", name: "Strawberry", category: "frappe", prices: { "22oz": 130 }, image: "hero-drinks.jpg" },
  { id: "fr-matcha", name: "Matcha", category: "frappe", prices: { "22oz": 130 }, image: "hero-drinks.jpg" },
  { id: "fr-salted-caramel", name: "Salted Caramel", category: "frappe", prices: { "22oz": 130 }, image: "hero-drinks.jpg", popular: true },
  { id: "fr-dark-choco", name: "Dark Choco", category: "frappe", prices: { "22oz": 130 } },
  { id: "fr-red-velvet", name: "Red Velvet", category: "frappe", prices: { "22oz": 130 } },
  { id: "fr-taro", name: "Taro", category: "frappe", prices: { "22oz": 130 } },
  { id: "fr-choco-chips", name: "Choco Chips", category: "frappe", prices: { "22oz": 130 } },
  { id: "fr-dark-choco-salted", name: "Dark Choco Salted", category: "frappe", prices: { "22oz": 140 } },

  // ---------------------------------------------------------- Espresso Frappe
  { id: "ef-mocha-java", name: "Mocha Java", category: "espresso-frappe", prices: { "22oz": 165 } },
  { id: "ef-mocha-salted-caramel", name: "Mocha Salted Caramel", category: "espresso-frappe", prices: { "22oz": 160 } },
  { id: "ef-salted-caramel", name: "Salted Caramel", category: "espresso-frappe", prices: { "22oz": 160 } },
  { id: "ef-coffee-jelly", name: "Coffee Jelly", category: "espresso-frappe", prices: { "22oz": 160 } },
  { id: "ef-mocha", name: "Mocha", category: "espresso-frappe", prices: { "22oz": 150 } },

  // ----------------------------------------------------------------- Espresso
  { id: "es-cafe-mocha", name: "Café Mocha", category: "espresso", prices: { hot: 140, cold: 150 }, image: "coffee-lineup.jpg" },
  { id: "es-caramel-macchiato", name: "Caramel Macchiato", category: "espresso", prices: { hot: 140, cold: 150 }, image: "coffee-lineup.jpg", popular: true },
  { id: "es-white-mocha", name: "White Mocha", category: "espresso", prices: { hot: 140, cold: 150 } },
  { id: "es-cafe-latte", name: "Café Latte", category: "espresso", prices: { hot: 110, cold: 120 }, image: "coffee-lineup.jpg" },
  { id: "es-cappuccino", name: "Cappuccino", category: "espresso", prices: { hot: 110, cold: 120 } },
  { id: "es-americano", name: "Americano", category: "espresso", prices: { hot: 90, cold: 100 } },

  // --------------------------------------------------------------- Hot Drinks
  { id: "hd-hot-chocolate", name: "Hot Chocolate", category: "hot-drinks", price: 90 },
  { id: "hd-brewed-coffee", name: "Brewed Coffee", category: "hot-drinks", price: 90 },

  // ------------------------------------------------------------------- Yogurt
  { id: "yo-plain", name: "Plain", category: "yogurt", prices: { "16oz": 115 } },
  { id: "yo-strawberry", name: "Strawberry", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-blueberry", name: "Blueberry", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-passion-fruit", name: "Passion Fruit", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-cheese", name: "Cheese", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-nutella", name: "Nutella", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-cookies-cream", name: "Cookies & Cream", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-matcha", name: "Matcha", category: "yogurt", prices: { "16oz": 125 } },
  { id: "yo-taro", name: "Taro", category: "yogurt", prices: { "16oz": 125 } },
];

/** "Series" upgrades - a topping layer over any milk tea. */
export const series = [
  { id: "creamcheese", name: "Creamcheese", price: 30 },
  { id: "cheesecake", name: "Cheesecake", price: 30 },
  { id: "signature", name: "Signature", price: 40 },
  { id: "supreme", name: "Supreme", price: 40 },
  { id: "seasalt", name: "Seasalt", price: 40 },
  { id: "nutella", name: "Nutella", price: 40 },
] as const;

/** Sinkers - the things at the bottom of the cup. */
export const sinkers = [
  { id: "pearl", name: "Pearl", price: 20 },
  { id: "egg-pudding", name: "Egg Pudding", price: 20 },
  { id: "nata", name: "Nata", price: 20 },
  { id: "coffee-jelly", name: "Coffee Jelly", price: 20 },
  { id: "oreo", name: "Oreo", price: 25 },
  { id: "graham", name: "Graham", price: 25 },
] as const;

export const sizeLabels: Record<SizeKey, string> = {
  "16oz": "16 oz",
  "22oz": "22 oz",
  "1L": "1 Liter",
  hot: "Hot",
  cold: "Iced",
};

// ------------------------------------------------------------------ helpers

export function itemsByCategory(category: CategoryId) {
  return items.filter((i) => i.category === category);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

/** Lowest price across every size, used for "from ₱X" labels. */
export function lowestPrice(item: MenuItem) {
  if (item.price !== undefined) return item.price;
  const values = Object.values(item.prices ?? {});
  return values.length ? Math.min(...values) : 0;
}

export function popularItems() {
  return items.filter((i) => i.popular);
}

export function searchItems(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const category = getCategory(item.category);
    return (
      item.name.toLowerCase().includes(q) ||
      category.name.toLowerCase().includes(q) ||
      (item.note?.toLowerCase().includes(q) ?? false)
    );
  });
}

export const menuStats = {
  itemCount: items.length,
  categoryCount: categories.length,
  /** Cheapest full liter on the board - the hook for the "By the Liter" pitch. */
  cheapestLiter: Math.min(
    ...items.filter((i) => i.prices?.["1L"]).map((i) => i.prices!["1L"]!),
  ),
};
