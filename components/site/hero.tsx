"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { messengerLink, site } from "@/lib/site";
import { menuStats } from "@/lib/menu";
import { CafeImage } from "./cafe-image";
import { EASE } from "./reveal";

/** Cups that drift around the headline. Purely decorative. */
const floaters = [
  { src: "hero-drinks.jpg", alt: "", className: "left-[4%] top-[18%] h-24 w-24 md:h-40 md:w-40", delay: 0 },
  { src: "brown-sugar.jpg", alt: "", className: "right-[5%] top-[14%] h-20 w-20 md:h-32 md:w-32", delay: 0.6 },
  { src: "fruit-tea.jpg", alt: "", className: "bottom-[14%] left-[9%] h-16 w-16 md:h-28 md:w-28", delay: 1.2 },
  { src: "coffee-lineup.jpg", alt: "", className: "bottom-[18%] right-[8%] h-20 w-20 md:h-36 md:w-36", delay: 0.3 },
];

export function Hero() {
  // Values are constant across server and client on purpose - MotionConfig
  // reducedMotion="user" strips the transforms, so no hook branching here.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

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

      {/* Floating cups */}
      <div className="absolute inset-0 -z-10 hidden sm:block" aria-hidden="true">
        {floaters.map((f) => (
          <motion.div
            key={f.src + f.className}
            className={`absolute overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60 ${f.className}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: f.delay * 0.4 },
              scale: { duration: 0.6, delay: f.delay * 0.4, ease: EASE },
              y: {
                duration: 6,
                delay: f.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <CafeImage
              src={f.src}
              alt=""
              fill
              sizes="160px"
              label=" "
              className="h-full w-full"
            />
          </motion.div>
        ))}
      </div>

      <div className="container-page relative py-20 text-center">
        <motion.div {...rise(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur-sm">
            <Star className="size-3.5 fill-accent text-accent" />
            {site.rating.value} on Google · {site.rating.count} reviews
            <span className="hidden sm:inline">· Naga City</span>
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="mx-auto mt-7 max-w-4xl text-balance font-display text-[2.75rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Crave it?
          <br />
          <span className="italic text-accent">We got it.</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Rice meals, pizza, pasta and milk tea by the full litre — served under
          the plant wall on San Felipe Road. {menuStats.itemCount} things on the
          board, and the lasagna is the one people keep writing about.
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink
            href={messengerLink("Hi Liters! I'd like to place an order.")}
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
        </motion.div>
      </div>
    </section>
  );
}
