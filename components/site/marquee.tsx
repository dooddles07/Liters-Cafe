import { cn } from "@/lib/utils";

const phrases = [
  "Crave It? We Got It!",
  "Milk tea by the litre",
  "Rice meals all day",
  "Naga City",
  "Open late on weekends",
];

/**
 * Pure CSS loop - no JS, no layout thrash. The strip is duplicated once and
 * translated by exactly -50%, which makes the seam invisible.
 */
export function Marquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-y border-border bg-primary py-4 text-primary-foreground",
        className,
      )}
    >
      <div className="relative flex overflow-hidden">
        <div className="animate-[liters-marquee_38s_linear_infinite] flex shrink-0 items-center gap-8 pr-8 motion-reduce:animate-none">
          <Strip />
        </div>
        <div
          className="animate-[liters-marquee_38s_linear_infinite] flex shrink-0 items-center gap-8 pr-8 motion-reduce:hidden"
          aria-hidden="true"
        >
          <Strip />
        </div>
      </div>
    </div>
  );
}

function Strip() {
  return (
    <>
      {phrases.map((phrase) => (
        <span key={phrase} className="flex shrink-0 items-center gap-8">
          <span className="font-display text-xl tracking-tight whitespace-nowrap sm:text-2xl">
            {phrase}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
        </span>
      ))}
    </>
  );
}
