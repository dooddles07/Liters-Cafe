"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart, Send, X } from "lucide-react";
import { items, lowestPrice, sizeLabels, type SizeKey } from "@/lib/menu";
import { messengerLink } from "@/lib/site";
import { useFavorites } from "@/lib/use-favorites";
import { ButtonLink } from "@/components/ui/button";
import { peso } from "@/lib/utils";

/**
 * Floats up once the visitor has saved something. Turns the saved list into
 * a Messenger message, which is the only "checkout" this site has.
 */
export function FavoritesBar() {
  const { ids, clear, ready } = useFavorites();

  const saved = items.filter((i) => ids.includes(i.id));
  const estimate = saved.reduce((sum, item) => sum + lowestPrice(item), 0);

  const message = [
    "Hi Liters! I'd like to order:",
    ...saved.map((item) => {
      if (item.price !== undefined) return `• ${item.name} — ${peso(item.price)}`;
      const sizes = Object.keys(item.prices ?? {}) as SizeKey[];
      const smallest = sizes[0];
      return `• ${item.name} (${sizeLabels[smallest]}) — ${peso(item.prices![smallest]!)}`;
    }),
    "",
    `Rough total: ${peso(estimate)}`,
  ].join("\n");

  return (
    <AnimatePresence>
      {ready && saved.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="container-page">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Heart className="size-4 fill-current" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {saved.length} saved
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  From {peso(estimate)} · {saved.map((s) => s.name).join(", ")}
                </p>
              </div>

              <ButtonLink
                href={messengerLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="shrink-0"
              >
                <Send className="size-3.5" />
                <span className="hidden sm:inline">Send list</span>
                <span className="sm:hidden">Send</span>
              </ButtonLink>

              <button
                type="button"
                onClick={clear}
                aria-label="Clear saved items"
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
