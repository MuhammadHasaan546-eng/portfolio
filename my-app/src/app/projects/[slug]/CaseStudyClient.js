"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { EASE } from "@/components/motion";
import CaseStudyContent from "@/components/CaseStudyContent";

export default function CaseStudyClient({ project }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="obsidian bg-obsidian">
      {/* dark floating header for the case study */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "border-white/10 bg-black/70 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-white/10 bg-black/40 backdrop-blur-md"
          }`}
        >
          <Link
            href="/#top"
            className="flex items-center gap-2 rounded-full px-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </span>
            <span className="font-display text-sm tracking-tight text-white">
              HASAAN
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-champagne"
          >
            {"Let's Talk"}
            <ArrowUpRight size={15} strokeWidth={2.4} />
          </a>
        </div>
      </motion.header>

      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-champagne"
      />

      {/* animated page shell */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <CaseStudyContent project={project} />
      </motion.div>
    </div>
  );
}
