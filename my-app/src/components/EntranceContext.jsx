"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useSyncExternalStore,
} from "react";

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

const EntranceContext = createContext({ released: false, release: () => { } });

export function useEntrance() {
    return useContext(EntranceContext);
}

/**
 * Coordinates the animated entrance splash with the page reveal.
 *
 * - <Splash /> calls `release()` the moment its curtain starts lifting, so the
 *   Hero / Header entrance animations play *in sync* with the reveal.
 * - Reduced-motion users skip the splash entirely: the page releases
 *   immediately.
 * - A failsafe timer guarantees the page can never be trapped hidden.
 */
export function EntranceProvider({ children }) {
    const reduced = useSyncExternalStore(subscribeRM, getRM, getRMserver);
    const [released, setReleased] = useState(false);
    const release = useCallback(() => setReleased(true), []);

    useEffect(() => {
        const t = setTimeout(release, reduced ? 0 : 6000);
        return () => clearTimeout(t);
    }, [reduced, release]);

    return (
        <EntranceContext.Provider value={{ released, release }}>
            {children}
        </EntranceContext.Provider>
    );
}
