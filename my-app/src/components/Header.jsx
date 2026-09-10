"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { EASE } from "./motion";
import { useEntrance } from "./EntranceContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { released } = useEntrance();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={released ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div
          className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-4 ${scrolled
            ? "border-ink/10 bg-white/80 shadow-[0_20px_60px_-20px_rgba(17,17,17,0.25)] backdrop-blur-xl"
            : "border-ink/10 bg-white/70 backdrop-blur-md"
            }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full px-2"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-background transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </span>
            <span className="font-display text-sm tracking-tight text-ink">
              HASAAN
            </span>
          </a>

          {/* Center links — desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Availability badge + CTA — desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for New Projects
            </span>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors duration-300 hover:bg-ink/85"
            >
              {"Let's Talk"}
              <ArrowUpRight
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/70 md:hidden"
          >
            <div className="flex w-4 flex-col items-end gap-1.5">
              <span
                className={`h-px bg-ink transition-all duration-300 ${open ? "w-4 translate-y-[3.5px] rotate-45" : "w-4"}`}
              />
              <span
                className={`h-px bg-ink transition-all duration-300 ${open ? "w-4 -translate-y-[3.5px] -rotate-45" : "w-3"}`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-ink/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg text-ink transition-colors hover:bg-ink/5"
                >
                  {l.label}
                  <span className="font-grotesk text-xs text-ink/40">
                    0{i + 1}
                  </span>
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-background"
            >
              {"Let's Talk"}
              <ArrowUpRight size={16} />
            </a>
            <p className="mt-4 text-center text-xs text-ink/50">
              {profile.location} · {profile.email}
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
