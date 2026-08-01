import { Star } from "lucide-react";
import { ratingBreakdown, reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { ReviewsCarousel } from "@/components/ui/reviews-carousel";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Reviews() {
  const total = ratingBreakdown.reduce((sum, r) => sum + r.count, 0);

  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-y border-border bg-muted/50 py-20 md:py-28"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="What people say" size="md">
              Rated {site.rating.value} on Google
            </SectionHeading>

            <div className="mt-7 flex items-center gap-4">
              <span className="font-display text-6xl leading-none">
                {site.rating.value}
              </span>
              <div>
                <div
                  className="flex gap-0.5"
                  aria-label={`${site.rating.value} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.floor(site.rating.value)
                          ? "size-4 fill-accent text-accent"
                          : "size-4 fill-accent/40 text-accent/40"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {site.rating.count} reviews
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-2">
              {ratingBreakdown.map((row) => (
                <li key={row.stars} className="flex items-center gap-3">
                  <span className="w-3 text-xs tabular-nums text-muted-foreground">
                    {row.stars}
                  </span>
                  <span
                    className="h-2 flex-1 overflow-hidden rounded-full bg-border"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{
                        width: `${total ? (row.count / total) * 100 : 0}%`,
                      }}
                    />
                  </span>
                  <span className="w-6 text-right text-xs tabular-nums text-muted-foreground">
                    {row.count}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ReviewsCarousel reviews={reviews} autoPlay />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
