import { cn } from "@/lib/utils";

/**
 * The Liters lockup: lowercase grotesque inside a hairline box, with the
 * script "cafe" tucked under the right edge. Drawn rather than loaded so
 * it is crisp at any size and works before logo.png is supplied.
 */
export function Wordmark({
  className,
  showCafe = true,
}: {
  className?: string;
  showCafe?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <span className="border border-current px-2 py-0.5 font-sans text-[1.15em] font-medium leading-none tracking-tight">
        liters
      </span>
      {showCafe && (
        <span className="absolute -bottom-2 -right-1 font-display text-[0.5em] italic leading-none">
          cafe
        </span>
      )}
      <span className="sr-only">Liters Cafe</span>
    </span>
  );
}
