"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { RotateCcw } from "lucide-react";
import {
  itemsByCategory,
  series,
  sinkers,
  sizeLabels,
  type SizeKey,
} from "@/lib/menu";
import { messengerLink } from "@/lib/site";
import { ButtonLink, Button } from "@/components/ui/button";
import { cn, peso } from "@/lib/utils";
import { Reveal } from "./reveal";

const flavors = itemsByCategory("milk-tea");
const SIZES: SizeKey[] = ["16oz", "22oz", "1L"];

export function DrinkBuilder() {
  const [flavorId, setFlavorId] = useState(flavors[1].id); // Wintermelon
  const [size, setSize] = useState<SizeKey>("22oz");
  const [seriesId, setSeriesId] = useState<string | null>(null);
  const [sinkerIds, setSinkerIds] = useState<string[]>([]);

  const flavor = flavors.find((f) => f.id === flavorId)!;
  const chosenSeries = series.find((s) => s.id === seriesId) ?? null;
  const chosenSinkers = sinkers.filter((s) => sinkerIds.includes(s.id));

  const total = useMemo(() => {
    const base = flavor.prices?.[size] ?? 0;
    const seriesCost = chosenSeries?.price ?? 0;
    const sinkerCost = chosenSinkers.reduce((sum, s) => sum + s.price, 0);
    return base + seriesCost + sinkerCost;
  }, [flavor, size, chosenSeries, chosenSinkers]);

  const orderText = [
    `Hi Liters! I'd like to order:`,
    `${flavor.name} milk tea (${sizeLabels[size]})`,
    chosenSeries ? `Series: ${chosenSeries.name}` : null,
    chosenSinkers.length
      ? `Sinkers: ${chosenSinkers.map((s) => s.name).join(", ")}`
      : null,
    `Total: ${peso(total)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const reset = () => {
    setFlavorId(flavors[1].id);
    setSize("22oz");
    setSeriesId(null);
    setSinkerIds([]);
  };

  return (
    <section
      id="build"
      className="scroll-mt-24 border-y border-border bg-muted/50 py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Before you order
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Work out the price of your milk tea
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Same prices as the board in store. Pick a flavor and a size, then
            add whatever you want sitting at the bottom of the cup.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-7 rounded-2xl border border-border bg-card p-5 sm:p-7">
              <Field label="Flavor" hint={`${flavors.length} options`}>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((f) => (
                    <Chip
                      key={f.id}
                      selected={f.id === flavorId}
                      onClick={() => setFlavorId(f.id)}
                    >
                      {f.name}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="Size">
                <div
                  role="radiogroup"
                  aria-label="Size"
                  className="grid grid-cols-3 gap-2"
                >
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={s === size}
                      onClick={() => setSize(s)}
                      className={cn(
                        "cursor-pointer rounded-xl border px-3 py-3 text-center transition-colors",
                        s === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-background hover:border-accent/50",
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {sizeLabels[s]}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-xs",
                          s === size
                            ? "text-accent-foreground/75"
                            : "text-muted-foreground",
                        )}
                      >
                        {peso(flavor.prices?.[s] ?? 0)}
                      </span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Series" hint="Optional · pick one">
                <div className="flex flex-wrap gap-2">
                  {series.map((s) => (
                    <Chip
                      key={s.id}
                      selected={s.id === seriesId}
                      onClick={() =>
                        setSeriesId((cur) => (cur === s.id ? null : s.id))
                      }
                    >
                      {s.name}
                      <span className="ml-1.5 opacity-60">+{s.price}</span>
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="Sinkers" hint="Optional · pick any">
                <div className="flex flex-wrap gap-2">
                  {sinkers.map((s) => (
                    <Chip
                      key={s.id}
                      selected={sinkerIds.includes(s.id)}
                      onClick={() =>
                        setSinkerIds((cur) =>
                          cur.includes(s.id)
                            ? cur.filter((x) => x !== s.id)
                            : [...cur, s.id],
                        )
                      }
                    >
                      {s.name}
                      <span className="ml-1.5 opacity-60">+{s.price}</span>
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your cup
                </p>

                <p className="mt-3 font-display text-2xl leading-tight">
                  {flavor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sizeLabels[size]} milk tea
                </p>

                <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                  <Line label={`Base (${sizeLabels[size]})`} value={flavor.prices?.[size] ?? 0} />
                  {chosenSeries && (
                    <Line label={chosenSeries.name} value={chosenSeries.price} />
                  )}
                  {chosenSinkers.map((s) => (
                    <Line key={s.id} label={s.name} value={s.price} />
                  ))}
                </dl>

                <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
                  <span className="text-sm font-semibold">Total</span>
                  <AnimatedPeso value={total} />
                </div>

                <ButtonLink
                  href={messengerLink(orderText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full"
                >
                  Send this order
                </ButtonLink>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className="mt-2 w-full text-muted-foreground"
                >
                  <RotateCcw className="size-3.5" />
                  Start over
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Opens Messenger with your order typed out. Nothing is charged
                  here.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
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

function Chip({
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

function Line({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{peso(value)}</dd>
    </div>
  );
}

/** Springs to the new total so a price change is felt, not just seen. */
function AnimatedPeso({ value }: { value: number }) {
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
