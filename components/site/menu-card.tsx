"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import {
  getCategory,
  sizeLabels,
  type MenuItem,
  type SizeKey,
} from "@/lib/menu";
import { useFavourites } from "@/lib/use-favorites";
import { cn, peso } from "@/lib/utils";
import { CafeImage } from "./cafe-image";
import { revealItem } from "./reveal";

/**
 * Adapted from the 21st.dev Menu Item Card. Reworked for pesos, real
 * size pricing, and a save-for-later heart in place of a cart button -
 * there is no checkout on this site, orders go through Messenger.
 */
export function MenuCard({
  item,
  showImage = true,
}: {
  item: MenuItem;
  showImage?: boolean;
}) {
  const { has, toggle, ready } = useFavourites();
  const saved = ready && has(item.id);
  const category = getCategory(item.category);
  const sizes = Object.keys(item.prices ?? {}) as SizeKey[];

  return (
    <motion.article
      variants={revealItem}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent"
    >
      {showImage && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <CafeImage
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            label={item.name}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
          {item.popular && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-accent-foreground">
              Best seller
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {category.name}
            </p>
            <h3 className="mt-1 font-display text-lg leading-tight">
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => toggle(item.id)}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove ${item.name} from your list`
                : `Save ${item.name} to your list`
            }
            className="-mr-1 -mt-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:bg-muted"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                saved
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground",
              )}
            />
          </button>
        </div>

        {item.note && (
          <p className="mt-2 text-xs italic text-muted-foreground">
            {item.note}
          </p>
        )}

        <div className="mt-auto pt-4">
          {item.price !== undefined ? (
            <p className="font-sans text-xl font-semibold text-foreground">
              {peso(item.price)}
            </p>
          ) : (
            <dl className="flex flex-wrap gap-x-4 gap-y-1">
              {sizes.map((size) => (
                <div key={size} className="flex items-baseline gap-1.5">
                  <dt className="text-[0.7rem] text-muted-foreground">
                    {sizeLabels[size]}
                  </dt>
                  <dd className="font-sans text-base font-semibold">
                    {peso(item.prices![size]!)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </motion.article>
  );
}
