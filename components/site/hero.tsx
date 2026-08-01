import Link from "next/link";
import { Star } from "lucide-react";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { messengerLink, orderMessage, site } from "@/lib/site";
import { menuStats } from "@/lib/menu";
import { CafeImage } from "./cafe-image";
import { HeroFloaters, HeroReveal } from "./hero-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-16 md:pt-20">
      {/* Storefront at night, dimmed enough to keep the type readable. */}
      <div className="absolute inset-0 -z-20">
        <CafeImage
          src="storefront-night.jpg"
          alt="The Liters Cafe storefront on San Felipe Road at night"
          fill
          priority
          sizes="100vw"
          label="Storefront"
          className="h-full w-full"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-background/88 dark:bg-background/85"
        aria-hidden="true"
      />

      <HeroFloaters />

      <div className="container-page relative py-20 text-center">
        <HeroReveal delay={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur-sm">
            <Star className="size-3.5 fill-accent text-accent" />
            {site.rating.value} on Google · {site.rating.count} reviews
            <span className="hidden sm:inline">· Naga City</span>
          </span>
        </HeroReveal>

        <HeroReveal
          as="h1"
          delay={0.08}
          className="mx-auto mt-7 max-w-4xl text-balance font-display text-[2.75rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Crave it?
          <br />
          <span className="italic text-accent">We got it.</span>
        </HeroReveal>

        <HeroReveal
          as="p"
          delay={0.16}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Rice meals, pizza, pasta, and milk tea by the full liter, served under
          the plant wall on San Felipe Road. {menuStats.itemCount} things on the
          board. The lasagna is the one people keep writing about.
        </HeroReveal>

        <HeroReveal
          delay={0.24}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink
            href={messengerLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full sm:w-auto"
          >
            Order on Messenger
          </ButtonLink>
          <Link
            href="/menu"
            className={buttonVariants({ variant: "outline", size: "lg" }) + " w-full bg-card/70 backdrop-blur-sm sm:w-auto"}
          >
            See the full menu
          </Link>
        </HeroReveal>
      </div>
    </section>
  );
}
