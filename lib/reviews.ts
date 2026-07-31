/**
 * Real Google reviews for Liters Cafe, transcribed from the listing.
 * Hardcoded on purpose - the live Places API needs a billed key and
 * this content changes maybe twice a year.
 */
export type Review = {
  id: number;
  author: string;
  meta: string;
  body: string;
  rating: number;
  when: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    author: "Wency Orbina",
    meta: "Local Guide · 437 reviews",
    rating: 5,
    when: "3 years ago",
    body: "I love what we ordered. Their lasagna is very good too. The place is so nice! Very calm. The colors of the interior design are very relaxing. So good. We really enjoyed our stay here.",
  },
  {
    id: 2,
    author: "ernest asence",
    meta: "Local Guide · 155 reviews",
    rating: 5,
    when: "10 months ago",
    body: "Lasagna was cheesy and meaty, it tasted good! Perfect pair is their 22oz peach-flavored lemonade.",
  },
  {
    id: 3,
    author: "Matthew Travis Alcantara",
    meta: "Local Guide · 52 reviews",
    rating: 5,
    when: "11 months ago",
    body: "Most decent affordable meals in San Felipe area. Kind staff.",
  },
];

/** Matches the histogram on the Google listing. */
export const ratingBreakdown = [
  { stars: 5, count: 11 },
  { stars: 4, count: 2 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 2 },
];
