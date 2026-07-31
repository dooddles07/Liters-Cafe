"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import {
  categories,
  getCategory,
  items,
  lowestPrice,
  type CategoryId,
} from "@/lib/menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuCard } from "./menu-card";
import { RevealGroup } from "./reveal";
import { FavouritesBar } from "./favourites-bar";

type Filter = CategoryId | "all" | "popular";

const groups = ["Food", "Drinks"] as const;

export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      if (filter === "popular" && !item.popular) return false;
      if (filter !== "all" && filter !== "popular" && item.category !== filter)
        return false;

      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        getCategory(item.category).name.toLowerCase().includes(q) ||
        (item.note?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, filter]);

  // Keep the category order from the menu board rather than sorting.
  const grouped = categories
    .map((category) => ({
      category,
      items: results.filter((i) => i.category === category.id),
    }))
    .filter((g) => g.items.length > 0);

  const clearAll = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-b border-border bg-background/90 px-5 py-4 backdrop-blur-md md:top-20 md:-mx-8 md:px-8">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu — lasagna, matcha, sisig…"
            aria-label="Search the menu"
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-sm placeholder:text-muted-foreground/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            Everything
          </FilterChip>
          <FilterChip
            active={filter === "popular"}
            onClick={() => setFilter("popular")}
          >
            Best sellers
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "item" : "items"}
        {query && ` matching “${query}”`}
      </p>

      <AnimatePresence mode="wait">
        {grouped.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <p className="font-display text-2xl">Nothing matched that</p>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              Try a shorter word — “choco”, “chicken”, “tea” — or clear the
              filters to see the whole board.
            </p>
            <Button variant="outline" onClick={clearAll} className="mt-6">
              Show everything
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={`${filter}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-16"
          >
            {groups.map((group) => {
              const inGroup = grouped.filter(
                (g) => g.category.group === group,
              );
              if (!inGroup.length) return null;

              return (
                <div key={group}>
                  <h2 className="font-display text-sm uppercase tracking-[0.25em] text-accent">
                    {group}
                  </h2>

                  <div className="mt-8 space-y-14">
                    {inGroup.map(({ category, items: catItems }) => (
                      <section key={category.id} id={category.id} className="scroll-mt-44">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
                          <h3 className="font-display text-2xl sm:text-3xl">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            from ₱
                            {Math.min(...catItems.map(lowestPrice))}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {category.blurb}
                        </p>

                        <RevealGroup className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                          {catItems.map((item) => (
                            <MenuCard
                              key={item.id}
                              item={item}
                              showImage={Boolean(item.image)}
                            />
                          ))}
                        </RevealGroup>
                      </section>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <FavouritesBar />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-accent bg-accent font-semibold text-accent-foreground"
          : "border-border bg-card hover:border-accent/50",
      )}
    >
      {children}
    </button>
  );
}
