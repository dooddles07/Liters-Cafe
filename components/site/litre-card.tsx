"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/lib/menu";
import { getCategory } from "@/lib/menu";
import { peso } from "@/lib/utils";
import { revealItem } from "./reveal";

export function LitreCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={revealItem}
      className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {getCategory(item.category).name}
      </p>
      <p className="mt-1.5 font-display text-lg leading-tight">{item.name}</p>
      <p className="mt-3 font-sans text-2xl font-semibold text-accent">
        {peso(item.prices!["1L"]!)}
      </p>
    </motion.div>
  );
}
