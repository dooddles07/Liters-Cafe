import Image from "next/image";
import { Reveal } from "./reveal";

/** The physical in-store menu, for anyone who wants to see the real thing. */
const cards = [
  { file: "drinks-1.jpg", label: "Drinks: milk tea, fruit tea, lemonade" },
  { file: "drinks-2.jpg", label: "Drinks: frappe, espresso, yogurt" },
  { file: "snacks.jpg", label: "Snacks: pizza, burgers, pasta, fries" },
  { file: "rice-meals.jpg", label: "Rice meals" },
];

export function MenuCards() {
  return (
    <section className="mt-24 border-t border-border pt-14">
      <Reveal className="max-w-xl">
        <h2 className="font-display text-2xl sm:text-3xl">
          The menu as it hangs in store
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Photographed off the counter. If anything above ever disagrees with
          these, the printed board wins.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <figure key={card.file} className="group">
            <a
              href={`/menu-cards/${card.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <Image
                src={`/menu-cards/${card.file}`}
                alt={card.label}
                width={772}
                height={1024}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {card.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
