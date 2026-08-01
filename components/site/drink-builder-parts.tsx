"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn, peso } from "@/lib/utils";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 flex w-full items-baseline justify-between gap-3">
        <span className="font-display text-lg">{label}</span>
        {hint && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </legend>
      {children}
    </fieldset>
  );
}

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors",
        selected
          ? "border-accent bg-accent font-semibold text-accent-foreground"
          : "border-border bg-background text-foreground hover:border-accent/50",
      )}
    >
      {children}
    </button>
  );
}

export function Line({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{peso(value)}</dd>
    </div>
  );
}

/** Springs to the new total so a price change is felt, not just seen. */
export function AnimatedPeso({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 220, damping: 26, mass: 0.6 });
  const text = useTransform(spring, (v) => `₱${Math.round(v)}`);

  useEffect(() => {
    if (reduce) spring.jump(value);
    else spring.set(value);
  }, [value, reduce, spring]);

  return (
    <motion.span
      className="font-display text-3xl tabular-nums text-accent"
      aria-live="polite"
      aria-label={`Total ${peso(value)}`}
    >
      {text}
    </motion.span>
  );
}
