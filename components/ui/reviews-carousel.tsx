"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/**
 * Adapted from the 21st.dev Reviews Carousel.
 *
 * Changes from the original: English labels (it shipped with Spanish
 * aria-labels), the `bg-brand` token swapped for our accent, star ratings
 * added, and arrow-key handling scoped to the carousel instead of a global
 * window listener - the original stole arrow keys from the whole page.
 */

const FRAME_OFFSET = -28;
const FRAMES_VISIBLE = 3;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export function ReviewsCarousel({
  reviews,
  className,
  autoPlay = false,
  autoPlayInterval = 6000,
}: {
  reviews: Review[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const maxIndex = reviews.length - 1;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || paused || maxIndex < 1) return;
    const id = setInterval(
      () => setActive((i) => (i >= maxIndex ? 0 : i + 1)),
      autoPlayInterval,
    );
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, maxIndex, paused]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => clamp(i - 1, 0, maxIndex));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => clamp(i + 1, 0, maxIndex));
    }
  };

  if (!reviews.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto w-full max-w-2xl", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[290px] sm:h-[260px]">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            review={review}
            index={index}
            active={active}
            total={reviews.length}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <NavButton
          direction="prev"
          disabled={active <= 0}
          onClick={() => setActive((i) => clamp(i - 1, 0, maxIndex))}
        />
        <div className="flex items-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              aria-label={`Show review ${index + 1} of ${reviews.length}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-200",
                index === active
                  ? "w-8 bg-accent"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
        <NavButton
          direction="next"
          disabled={active >= maxIndex}
          onClick={() => setActive((i) => clamp(i + 1, 0, maxIndex))}
        />
      </div>
    </div>
  );
}

function Card({
  review,
  index,
  active,
  total,
}: {
  review: Review;
  index: number;
  active: number;
  total: number;
}) {
  const offset = index - active;
  const isActive = index === active;

  // Constant across server and client; MotionConfig drops the transform
  // under reduced motion rather than us branching on the hook here.
  const scale = clamp(1 - offset * 0.06, 0.8, 1);
  const y = clamp(offset * FRAME_OFFSET, FRAME_OFFSET * FRAMES_VISIBLE, 0);

  return (
    <motion.figure
      initial={false}
      animate={{
        y,
        scale,
        transition: {
          type: "spring",
          stiffness: 250,
          damping: 22,
          mass: 0.5,
        },
      }}
      style={{
        zIndex: total - Math.abs(offset),
        opacity: offset < 0 ? 0 : 1,
        filter: offset < 0 ? "blur(2px)" : "none",
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 250ms ease, filter 250ms ease",
      }}
      aria-hidden={!isActive}
      className="absolute inset-x-0 top-0 rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < review.rating
                ? "fill-accent text-accent"
                : "text-muted-foreground/30",
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="mt-4">
        <p className="text-pretty text-sm leading-relaxed text-foreground/85">
          {review.body}
        </p>
      </blockquote>

      <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t border-border pt-4">
        <div>
          <span className="block text-sm font-semibold">{review.author}</span>
          <span className="block text-xs text-muted-foreground">
            {review.meta}
          </span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {review.when}
        </span>
      </figcaption>
    </motion.figure>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-border transition-colors",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "cursor-pointer hover:border-accent hover:bg-muted",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}
