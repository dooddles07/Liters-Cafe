import { Facebook, MapPin, Navigation } from "lucide-react";
import { dayNames, formatTime, hours } from "@/lib/hours";
import { directionsUrl, fullAddress, mapEmbedUrl, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { OpenBadge } from "./open-badge";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Location() {
  return (
    <section id="visit" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading eyebrow="Come by">
              Find us on San Felipe Road
            </SectionHeading>

            <OpenBadge className="mt-6" />

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <address className="not-italic leading-relaxed text-muted-foreground">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region}{" "}
                {site.address.postalCode}
                <br />
                {site.address.country}
              </address>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="size-4" />
                Get directions
              </ButtonLink>
              <ButtonLink
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <Facebook className="size-4" />
                Facebook page
              </ButtonLink>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-xl">Opening hours</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Philippine time (UTC+8)
              </p>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {dayNames.map((name, index) => {
                  const h = hours[index];
                  return (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-4 py-2.5 text-sm"
                    >
                      <dt className="text-muted-foreground">{name}</dt>
                      <dd className="tabular-nums">
                        {h
                          ? `${formatTime(h.open)} – ${formatTime(h.close)}`
                          : "Closed"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing Liters Cafe at ${fullAddress}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full lg:h-full lg:min-h-[560px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
