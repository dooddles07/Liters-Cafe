import { CafeImage } from "./cafe-image";
import { Reveal } from "./reveal";

const notes = [
  {
    title: "The plant wall",
    body: "Greenery from floor to ceiling, warm pine everywhere else. Reviewers keep using the same word for it: calm.",
  },
  {
    title: "Those ceiling lights",
    body: "Hand-built wooden box lamps in rows. It's why the room photographs the way it does after dark.",
  },
  {
    title: "Priced for the neighborhood",
    body: "\"Most decent affordable meals in San Felipe area.\" Most plates land between ₱129 and ₱199.",
  },
];

export function Story() {
  return (
    <section id="story" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Our Place
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              A quiet corner of San Felipe Road
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Liters is a small cafe with a big board. Full rice meals, pizza
              from the oven, pasta with garlic bread, and a drinks list that runs
              from house-blend fruit tea to a proper caramel macchiato. Sit
              inside under the lights, or take one of the bistro tables out front
              and watch the road.
            </p>

            <dl className="mt-10 space-y-6">
              {notes.map((note) => (
                <div key={note.title} className="border-l-2 border-accent pl-5">
                  <dt className="font-display text-lg">{note.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {note.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
              <CafeImage
                src="storefront-night.jpg"
                alt="The Liters Cafe storefront on San Felipe Road"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                label="Storefront"
                className="h-full w-full"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <CafeImage
                src="storefront-inside.jpg"
                alt="Inside Liters Cafe, tables under the wooden box lights"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                label="Inside"
                className="h-full w-full"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <CafeImage
                src="plant-wall.jpg"
                alt="The plant wall inside Liters Cafe"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                label="Plant wall"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
