import { CafeImage } from "./cafe-image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * Adapted from the 21st.dev Masonry Grid. Kept its CSS scroll-driven
 * animation - it runs off the main thread and already no-ops under
 * prefers-reduced-motion - but dropped the card chrome so the photos
 * carry the section on their own.
 */
const shots = [
  { src: "food-spread.jpg", label: "The spread", alt: "Burger, spaghetti, nachos and chicken with fries laid out on a wooden table", span: "row-span-2" },
  { src: "hero-drinks.jpg", label: "Frappes", alt: "Five topped frappes in branded Liters cups" },
  { src: "interior-ceiling.jpg", label: "The lights", alt: "Wooden box lights above the dining room" },
  { src: "lasagna.jpg", label: "Lasagna", alt: "Two servings of lasagna with garlic bread" },
  { src: "rice-meals.jpg", label: "Rice meals", alt: "Salisbury steak, cordon bleu and baby back ribs rice plates", span: "row-span-2" },
  { src: "pizza.jpg", label: "Pizza", alt: "Supreme pizza fresh from the oven" },
  { src: "fruit-tea.jpg", label: "Fruit tea", alt: "Three hands raising fruit tea cups against a blue sky" },
  { src: "storefront-glass.jpg", label: "Out front", alt: "The glass frontage and bistro tables at dusk" },
  { src: "coffee-lineup.jpg", label: "Espresso bar", alt: "Cafe latte, cafe mocha and caramel macchiato on concrete blocks" },
  { src: "longganisa.jpg", label: "Breakfast", alt: "Longganisa rice plate with egg by the window" },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="max-w-xl">
          <SectionHeading eyebrow="The room and the food">
            Have a look around
          </SectionHeading>
        </Reveal>
      </div>

      <div className="container-page mt-10">
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <figure
              key={shot.src + i}
              className={`liters-tile relative overflow-hidden rounded-2xl ${shot.span ?? ""}`}
              style={
                {
                  "--tilt": i % 2 === 0 ? 1 : -1,
                } as React.CSSProperties
              }
            >
              <CafeImage
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                label={shot.label}
                className="h-full w-full transition-transform duration-700 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
