"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "./motion";
import { useEntrance } from "./EntranceContext";

const WORDS = ["DESIGN", "DEVELOPMENT", "NEXT.JS & MERN", "MUHAMMAD HASAAN"];
const STEP = 640; // ms per word

/* --- reduced-motion detection (hydration-safe, no setState in effect) --- */
const mq = () =>
    typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
const subscribeRM = (cb) => {
    const m = mq();
    if (!m) return () => { };
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
};
const getRM = () => (mq() ? mq().matches : false);
const getRMserver = () => false;

export default function Splash() {
    const reduced = useSyncExternalStore(subscribeRM, getRM, getRMserver);
    const { release } = useEntrance();
    const [index, setIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (reduced) {
            // reduced-motion: skip the splash, reveal the page immediately
            release();
            return;
        }

        const body = document.body;
        const prevOverflow = body.style.overflow;
        body.style.overflow = "hidden";

        const total = WORDS.length * STEP;
        const timers = WORDS.map((_, i) =>
            setTimeout(() => setIndex(i), i * STEP)
        );
        // release the page exactly as the curtain starts lifting, so the
        // Hero / Header entrance animations play in sync with the reveal
        timers.push(setTimeout(release, total + 320));
        timers.push(setTimeout(() => setDone(true), total + 320));
        timers.push(setTimeout(() => {
            body.style.overflow = prevOverflow;
        }, total + 1100));

        return () => {
            timers.forEach(clearTimeout);
            body.style.overflow = prevOverflow;
        };
    }, [reduced, release]);

    if (reduced) return null;

    const progress = ((index + 1) / WORDS.length) * 100;

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden bg-[#111111] text-white"
                    aria-hidden="true"
                >
                    {/* faint grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                            backgroundSize: "80px 80px",
                        }}
                    />

                    {/* cycling words */}
                    <div className="relative flex h-[1.2em] items-center justify-center px-6">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={index}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.45, ease: EASE }}
                                className="font-display text-center text-[13vw] leading-none tracking-tight sm:text-6xl lg:text-8xl"
                            >
                                {WORDS[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <p className="mt-6 font-grotesk text-xs uppercase tracking-[0.4em] text-white/40">
                        Muhammad Hasaan — Portfolio
                    </p>

                    {/* progress bar */}
                    <div className="absolute bottom-16 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-white/15">
                        <motion.span
                            className="block h-full bg-champagne"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: EASE }}
                        />
                    </div>

                    <span className="absolute bottom-10 left-1/2 -translate-x-1/2 font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/30">
                        Loading
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
