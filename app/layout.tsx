import type { Metadata } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ImageAvailabilityProvider } from "@/components/site/image-context";
import { MotionProvider } from "@/components/site/motion-provider";
import { readAvailableImages } from "@/lib/images";
import { schemaOpeningHours } from "@/lib/hours";
import { fullAddress, site } from "@/lib/site";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: `${site.legalName} · ${site.tagline}`,
    template: `%s · ${site.legalName}`,
  },
  description: site.description,
  keywords: [
    "cafe Naga City",
    "Liters Cafe",
    "milk tea Naga",
    "rice meals Naga City",
    "San Felipe Road cafe",
    "where to eat Naga City",
  ],
  openGraph: {
    title: `${site.legalName} · ${site.tagline}`,
    description: site.description,
    locale: "en_PH",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#141110" },
  ],
};

/** Tells Google this is a cafe, where it is, and when it is open. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.legalName,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "PH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHours: schemaOpeningHours(),
  servesCuisine: ["Filipino", "Cafe", "Pizza", "Pasta", "Milk Tea"],
  priceRange: "₱₱",
  sameAs: [site.facebook],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  hasMap: `https://www.google.com/maps/search/${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const available = readAvailableImages();

  return (
    <html lang="en-PH" className={`${karla.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ImageAvailabilityProvider available={available}>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </ImageAvailabilityProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
