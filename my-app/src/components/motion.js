"use client";

import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Shared "SectionHeading" — small label row with index + title,
 * then an optional big display headline.
 */
export function SectionHeading({
  index = "01",
  label,
  headline,
  className = "",
  light = false,
}) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-3">
        <span
          className={`font-grotesk text-xs font-medium tracking-[0.25em] uppercase ${
            light ? "text-white/50" : "text-ink/50"
          }`}
        >
          /{index}
        </span>
        <span
          className={`font-grotesk text-xs font-medium tracking-[0.25em] uppercase ${
            light ? "text-white/60" : "text-ink/60"
          }`}
        >
          {label}
        </span>
        <span
          className={`h-px flex-1 ${light ? "bg-white/15" : "bg-ink/15"}`}
        />
      </div>
      {headline && (
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={`font-display mt-6 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {headline}
        </motion.h2>
      )}
    </div>
  );
}

export { motion };
