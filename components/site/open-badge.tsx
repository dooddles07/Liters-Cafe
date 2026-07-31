"use client";

import { useEffect, useState } from "react";
import { getOpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live open/closed state in Manila time. Renders nothing on the server pass
 * so the markup can't mismatch a visitor in another timezone.
 */
export function OpenBadge({ className }: { className?: string }) {
  const [state, setState] = useState<ReturnType<typeof getOpenState> | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-40 animate-pulse rounded-full bg-muted",
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        state.isOpen
          ? "bg-secondary text-secondary-foreground"
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          state.isOpen ? "bg-white" : "bg-muted-foreground",
        )}
        aria-hidden="true"
      />
      {state.label}
    </span>
  );
}
