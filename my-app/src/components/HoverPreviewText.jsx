"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";

/**
 * HoverPreviewText
 * ----------------
 * Wraps any inline text so that hovering it reveals a floating preview image
 * card that smoothly follows the cursor (spring physics). When several images
 * are supplied they cycle automatically as the pointer moves sideways.
 *
 * Props:
 *  - children : the inline text / node to hover (required)
 *  - images   : array of { src, label } (required for a preview to show)
 *  - className: extra classes for the wrapping element
 *  - offset   : { x, y } cursor offset (default 24 / 24)
 *  - as       : element tag for the wrapper (default "span")
 */
export default function HoverPreviewText({
    children,
    images = [],
    className = "",
    offset = { x: 24, y: 24 },
    as: Tag = "span",
}) {
    const [active, setActive] = useState(false);
    const [index, setIndex] = useState(0);

    const lastX = useRef(0);
    const travelled = useRef(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

    const hasImages = images.length > 0;
    const current = images[index] ?? images[0];

    const handleMove = (e) => {
        x.set(e.clientX + offset.x);
        y.set(e.clientY + offset.y);

        if (images.length > 1) {
            travelled.current += Math.abs(e.clientX - lastX.current);
            lastX.current = e.clientX;
            if (travelled.current > 90) {
                travelled.current = 0;
                setIndex((i) => (i + 1) % images.length);
            }
        }
    };

    const handleEnter = (e) => {
        lastX.current = e.clientX;
        travelled.current = 0;
        setIndex(0);
        x.set(e.clientX + offset.x);
        y.set(e.clientY + offset.y);
        setActive(true);
    };

    return (
        <>
            <Tag
                className={className}
                onMouseEnter={hasImages ? handleEnter : undefined}
                onMouseMove={hasImages ? handleMove : undefined}
                onMouseLeave={hasImages ? () => setActive(false) : undefined}
                data-cursor="hover"
            >
                {children}
            </Tag>

            <AnimatePresence>
                {hasImages && active && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ x: sx, y: sy }}
                        className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
                        aria-hidden="true"
                    >
                        <div className="w-80 overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                            {/* faux browser chrome */}
                            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2.5 backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                                <span className="h-2 w-2 rounded-full bg-green-400/80" />
                                <span className="ml-2 font-grotesk text-[11px] tracking-wide text-white/70">
                                    {current?.label}
                                </span>
                            </div>
                            <div className="relative bg-neutral-900">
                                <Image
                                    src={current?.src}
                                    alt={current?.label ?? "Preview"}
                                    width={320}
                                    height={220}
                                    className="h-44 w-full object-cover"
                                />
                                {/* progress pills */}
                                {images.length > 1 && (
                                    <div className="absolute inset-x-0 bottom-0 flex gap-1 p-3">
                                        {images.map((img, i) => (
                                            <span
                                                key={img.src + i}
                                                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === index ? "bg-white" : "bg-white/30"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
