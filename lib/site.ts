export const site = {
  name: "Liters",
  legalName: "Liters Cafe",
  tagline: "Crave It? We Got It!",
  description:
    "Liters Cafe in Naga City - rice meals, pizza, pasta, burgers, and milk tea by the liter. Rated 4.5 stars on Google.",

  address: {
    street: "San Felipe Rd",
    city: "Naga City",
    region: "Camarines Sur",
    postalCode: "4400",
    country: "Philippines",
  },

  /** Approximate - refine if you have exact pin coordinates. */
  geo: { lat: 13.6218, lng: 123.1948 },

  facebook: "https://www.facebook.com/litersnaga/",
  /** Derived from the Facebook page slug. Verify this resolves before launch. */
  messenger: "https://m.me/litersnaga",

  rating: { value: 4.5, count: 16 },

  /**
   * TODO(owner): no phone number was supplied. Add it here and the site
   * will surface a tap-to-call button everywhere it makes sense.
   */
  phone: null as string | null,
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`;

const mapQuery = encodeURIComponent(`Liters Cafe, ${fullAddress}`);

export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

/** Opens Messenger with the message already typed out. */
export function messengerLink(message?: string) {
  if (!message) return site.messenger;
  return `${site.messenger}?text=${encodeURIComponent(message)}`;
}
