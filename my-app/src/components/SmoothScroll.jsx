"use client";

import { ReactLenis } from "lenis/react";

// Custom easing — exponential deceleration for a buttery, inertial feel
const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Inertial smooth scrolling across the whole app.
 *
 * - `root` → Lenis drives the native <html> scroll container, so `position: fixed`
 *   elements (floating header, modal, noise overlay) keep working correctly.
 * - `anchors` → #anchor links (#work, #services, #experience, #contact) scroll
 *   with Lenis easing instead of native jumps.
 * - `smoothTouch` → enables inertial scrolling on touch devices too.
 */
export default function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: EASING,
                smoothWheel: true,
                smoothTouch: true,
                touchMultiplier: 1.4,
                wheelMultiplier: 1,
                anchors: true,
                autoRaf: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
