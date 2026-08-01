"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CafeImage } from "./cafe-image";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cups that drift around the headline. Purely decorative. */
const floaters = [
  { src: "hero-drinks.jpg", alt: "", className: "left-[4%] top-[18%] h-24 w-24 md:h-40 md:w-40", delay: 0 },
  { src: "brown-sugar.jpg", alt: "", className: "right-[5%] top-[14%] h-20 w-20 md:h-32 md:w-32", delay: 0.6 },
  { src: "fruit-tea.jpg", alt: "", className: "bottom-[14%] left-[9%] h-16 w-16 md:h-28 md:w-28", delay: 1.2 },
  { src: "coffee-lineup.jpg", alt: "", className: "bottom-[18%] right-[8%] h-20 w-20 md:h-36 md:w-36", delay: 0.3 },
];

export function HeroFloaters() {
  return (
    <div className="absolute inset-0 -z-10 hidden sm:block" aria-hidden="true">
      {floaters.map((f) => (
        <motion.div
          key={f.src + f.className}
          className={`absolute overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60 ${f.className}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: f.delay * 0.4 },
            scale: { duration: 0.6, delay: f.delay * 0.4, ease: EASE },
            y: {
              duration: 6,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <CafeImage
            src={f.src}
            alt=""
            fill
            sizes="160px"
            label=" "
            className="h-full w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

const tags = { div: motion.div, h1: motion.h1, p: motion.p } as const;

/** Hero's entrance rise, shared across the badge, headline, copy and CTAs. */
export function HeroReveal({
  delay = 0,
  as = "div",
  className,
  children,
}: {
  delay?: number;
  as?: keyof typeof tags;
  className?: string;
  children: ReactNode;
}) {
  const MotionTag = tags[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
