import { items } from "@/lib/menu";
import { peso } from "@/lib/utils";
import { CafeImage } from "./cafe-image";
import { Reveal, RevealGroup } from "./reveal";
import { LiterCard } from "./liter-card";

/** Everything on the board that comes in a full liter. */
const literDrinks = items
  .filter((i) => i.prices?.["1L"])
  .sort((a, b) => a.prices!["1L"]! - b.prices!["1L"]!);

export function LiterSection() {
  const cheapest = literDrinks[0];

  return (
    <section
      id="by-the-liter"
      className="scroll-mt-24 border-y border-border bg-muted/50 py-20 md:py-28"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The name is the point
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Milk tea by the
              <span className="italic text-accent"> full liter</span>
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              A 16 oz cup holds about 470 ml. A liter is more than double that,
              for roughly one and a half times the price. That&apos;s the barkada
              order: one jug, one bill, everybody drinks.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="font-display text-5xl leading-none text-foreground">
                  {peso(cheapest.prices!["1L"]!)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A full liter of {cheapest.name}
                </p>
              </div>
              <div>
                <p className="font-display text-5xl leading-none text-foreground">
                  {literDrinks.length}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Flavors available by the liter
                </p>
              </div>
            </div>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <CafeImage
                src="brown-sugar.jpg"
                alt="Brown sugar milk tea in branded Liters cups"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                label="Milk tea"
                className="h-full w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {literDrinks.map((drink) => (
                <LiterCard key={drink.id} item={drink} />
              ))}
            </RevealGroup>
            <p className="mt-6 text-xs text-muted-foreground">
              Add a Series topping (₱30–40) or sinkers (₱20–25) to any of these.
              Build one below to see the exact total.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
