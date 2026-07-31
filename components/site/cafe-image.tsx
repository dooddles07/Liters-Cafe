"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useHasImage } from "./image-context";

type Props = {
  /** Filename inside /public/images, e.g. "lasagna.jpg". */
  src?: string;
  alt: string;
  className?: string;
  /** Fills its positioned parent instead of using intrinsic size. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** Shown inside the fallback tile so an empty slot still reads as content. */
  label?: string;
};

/**
 * Renders the real photo when the owner has supplied it, and a warm
 * branded tile when they haven't. The page never shows a broken image
 * and never fires a 404.
 */
export function CafeImage({
  src,
  alt,
  className,
  fill,
  width = 800,
  height = 800,
  sizes,
  priority,
  label,
}: Props) {
  const hasImage = useHasImage(src);

  if (hasImage && src) {
    return (
      <Image
        src={`/images/${src}`}
        alt={alt}
        className={cn("object-cover", className)}
        {...(fill
          ? { fill: true, sizes: sizes ?? "100vw" }
          : { width, height, sizes })}
        priority={priority}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-[linear-gradient(135deg,var(--muted)_0%,var(--card)_50%,var(--muted)_100%)]",
        "inset-ring inset-ring-border",
        fill && "absolute inset-0 h-full w-full",
        className,
      )}
    >
      {/* Warm hatching so an empty slot still reads as a deliberate surface. */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--accent) 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-3 text-center">
        <CupMark className="h-7 w-7 text-accent" />
        {label !== " " && (
          <span className="font-display text-xs leading-tight text-foreground/55">
            {label ?? alt}
          </span>
        )}
      </div>
    </div>
  );
}

function CupMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 5h11l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 5Z" />
      <path d="M17 8h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M9 2v1.5M12.5 2v1.5" />
    </svg>
  );
}
