"use client";

import { motion } from "framer-motion";
import { EASE } from "./motion";

const COLS = 4;

/**
 * Luxury decorative background grid.
 *
 * - Hairline vertical grid lines (light / dark variants).
 * - Animated accent lines that draw themselves down the screen (scaleY 0 → 1).
 * - Slow beam pulses traveling downward + faint glowing intersection dots.
 *
 * Strictly decorative: `absolute inset-0`, `z-0`, `pointer-events-none`.
 * All interactive content in the parent section must sit at `relative z-10`.
 */
export default function GridLines({ variant = "light" }) {
    const dark = variant === "dark";

    const gridBorder = dark ? "border-neutral-800/40" : "border-neutral-300/30";
    const accent =
        dark
            ? "from-transparent via-white/15 to-transparent"
            : "from-transparent via-neutral-900/15 to-transparent";
    const dotBg = dark ? "bg-white/25" : "bg-neutral-900/25";
    const dotGlow = dark
        ? "shadow-[0_0_12px_2px_rgba(255,255,255,0.12)]"
        : "shadow-[0_0_12px_2px_rgba(17,17,17,0.12)]";

    const colPct = 100 / COLS;
    // Columns where the animated accent lines live (0-indexed)
    const accentCols = [1, 2];

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            {/* ---- Static hairline grid ---- */}
            <div className="absolute inset-0 grid grid-cols-4">
                {Array.from({ length: COLS }).map((_, i) => (
                    <div
                        key={i}
                        className={`border-l ${i === 0 ? "border-l-0" : gridBorder}`}
                    />
                ))}
            </div>

            {/* ---- Animated accent lines ---- */}
            {accentCols.map((colIdx, a) => {
                const left = `${(colIdx + 0.5) * colPct}%`;
                return (
                    <div key={colIdx} className="absolute inset-y-0" style={{ left }}>
                        {/* line draws downward once on mount */}
                        <motion.span
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                                duration: 1.8,
                                ease: EASE,
                                delay: 0.4 + a * 0.2,
                            }}
                            className={`absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b ${accent}`}
                        />
                        {/* slow beam pulse traveling downward */}
                        <motion.span
                            initial={{ y: "-30%" }}
                            animate={{ y: "130%" }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: a * 1.6,
                            }}
                            className={`absolute -left-px top-0 h-40 w-px bg-gradient-to-b ${accent}`}
                        />
                        {/* faint glowing intersection dot near the top */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: a * 1.2,
                            }}
                            className={`absolute -left-[3px] top-[14%] h-1.5 w-1.5 rounded-full ${dotBg} ${dotGlow}`}
                        />
                    </div>
                );
            })}
        </div>
    );
}
