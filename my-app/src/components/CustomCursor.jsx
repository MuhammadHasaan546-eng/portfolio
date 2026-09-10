"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
    "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

// Detects a precise pointer (mouse/trackpad) without a setState-in-effect.
// Server + hydration snapshot is `false`, so the custom cursor only ever
// mounts on the client after hydration — no mismatch, no flash.
const subscribePointer = (cb) => {
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
};
const getPointerSnapshot = () =>
    window.matchMedia("(pointer: fine)").matches;
const getServerPointerSnapshot = () => false;

/**
 * Custom interactive cursor.
 *
 * - Outer ring + inner dot, both spring-following the pointer (buttery motion).
 * - Scales up with a backdrop-blur + "OPEN" label when hovering interactive
 *   elements (buttons, cards, links).
 * - `mix-blend-difference` keeps it visible on both light and dark surfaces.
 * - Only mounts on devices with a fine pointer (desktop); touch devices get
 *   the native cursor and no listener overhead.
 * - `z-[200]` + `pointer-events-none`: sits above every section (z-0/z-10)
 *   and the fixed header/modal (z-50) without ever blocking clicks.
 */
export default function CustomCursor() {
    const enabled = useSyncExternalStore(
        subscribePointer,
        getPointerSnapshot,
        getServerPointerSnapshot
    );
    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const springX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.7 });
    const springY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.7 });

    useEffect(() => {
        // Only run on devices with a precise pointer (mouse / trackpad).
        if (!enabled) return;

        const onMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        const onOver = (e) => {
            if (e.target?.closest?.(INTERACTIVE)) setHovering(true);
        };
        const onOut = (e) => {
            if (e.target?.closest?.(INTERACTIVE)) setHovering(false);
        };
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, true);
        window.addEventListener("mouseout", onOut, true);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver, true);
            window.removeEventListener("mouseout", onOut, true);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[200]"
            style={{ x: springX, y: springY }}
        >
            {/* outer ring — expands on hover over interactive elements */}
            <motion.div
                animate={{
                    scale: pressed ? 0.8 : hovering ? 3.2 : 1,
                    opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/10 backdrop-blur-[2px] mix-blend-difference"
            >
                <span
                    className={`font-grotesk text-[8px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity duration-200 ${hovering ? "opacity-100" : "opacity-0"
                        }`}
                >
                    Open
                </span>
            </motion.div>

            {/* inner dot — shrinks away while the ring expands */}
            <motion.div
                animate={{ scale: hovering ? 0 : pressed ? 0.6 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
            />
        </motion.div>
    );
}
