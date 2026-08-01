import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow label + h2, the pair repeated at the top of every section. */
export function SectionHeading({
  eyebrow,
  children,
  size = "lg",
  className,
}: {
  eyebrow: string;
  children: ReactNode;
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl",
          size === "lg" && "lg:text-5xl",
          className,
        )}
      >
        {children}
      </h2>
    </>
  );
}
