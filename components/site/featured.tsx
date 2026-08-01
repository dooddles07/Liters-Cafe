import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuStats, popularItems } from "@/lib/menu";
import { buttonVariants } from "@/components/ui/button";
import { MenuCard } from "./menu-card";
import { Reveal, RevealGroup } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Featured() {
  const featured = popularItems();

  return (
    <section id="best-sellers" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <SectionHeading eyebrow="What people order">
              The regulars
            </SectionHeading>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Pulled from what the reviews keep naming and what leaves the
              kitchen most.
            </p>
          </div>
          <Link
            href="/menu"
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            See all {menuStats.itemCount} items
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
