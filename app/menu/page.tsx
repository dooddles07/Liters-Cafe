import type { Metadata } from "next";
import { menuStats } from "@/lib/menu";
import { messengerLink, orderMessage, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { MenuBrowser } from "@/components/site/menu-browser";
import { OpenBadge } from "@/components/site/open-badge";
import { MenuCards } from "@/components/site/menu-cards";

export const metadata: Metadata = {
  title: "Menu",
  description: `All ${menuStats.itemCount} items on the Liters Cafe menu: rice meals, pizza, pasta, burgers, milk tea, frappes and espresso. Prices in Philippine pesos.`,
};

export default function MenuPage() {
  return (
    <div className="container-page pb-32 pt-28 md:pt-36">
      <header className="mx-auto max-w-2xl text-center">
        <OpenBadge />
        <h1 className="mt-5 text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          The whole board
        </h1>
        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
          {menuStats.itemCount} items across {menuStats.categoryCount}{" "}
          categories, priced as they are in store. Tap the heart on anything to
          build a list you can send straight to Messenger.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={messengerLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order on Messenger
          </ButtonLink>
          <ButtonLink href={site.facebook} target="_blank" rel="noopener noreferrer" variant="outline">
            Check today&apos;s specials
          </ButtonLink>
        </div>
      </header>

      <div className="mt-14">
        <MenuBrowser />
      </div>

      <MenuCards />
    </div>
  );
}
