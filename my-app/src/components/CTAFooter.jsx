"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { profile, navLinks } from "@/data/portfolio";
import { EASE } from "./motion";

export default function CTAFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <>
      {/* ---------------- CTA ---------------- */}
      <section
        id="contact"
        className="obsidian relative overflow-hidden bg-obsidian px-6 pb-28 pt-24 text-white lg:px-10"
      >
        {/* oversized watermark */}
        <p
          aria-hidden="true"
          className="text-outline pointer-events-none absolute inset-x-0 top-8 select-none text-center font-display text-[17vw] leading-none"
        >
          {"LET'S TALK"}
        </p>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.3em] text-white/50"
          >
            <span className="h-px w-8 bg-white/25" />
            Have a project in mind?
            <span className="h-px w-8 bg-white/25" />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="font-display mt-8 text-5xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl"
          >
            HAVE A PROJECT
            <br />
            <span className="italic font-grotesk text-champagne">in mind?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 max-w-md text-base leading-relaxed text-white/60"
          >
            {"Let's turn your idea into a high-end digital experience. I'm"}
            {" "}
            currently accepting new projects for {new Date().getFullYear()}.
          </motion.p>

          {/* dynamic contact button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="mt-10"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.button
                  key="copied"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={copyEmail}
                  className="flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-8 py-5 font-medium text-emerald-300"
                >
                  <Check size={18} />
                  Email copied to clipboard
                </motion.button>
              ) : (
                <motion.button
                  key="copy"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={copyEmail}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-white px-9 py-5 text-base font-semibold text-ink"
                >
                  <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Contact Me</span>
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
            <p className="mt-4 font-grotesk text-xs tracking-wide text-white/40">
              {profile.email} — response within 24h
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="obsidian border-t border-white/10 bg-obsidian px-6 pb-10 pt-14 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* brand */}
            <div>
              <Link href="#top" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
                  <ArrowUpRight size={17} />
                </span>
                <span className="font-display text-lg tracking-tight">
                  HASAAN
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                {profile.tagline} Currently based in {profile.location}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-grotesk text-xs text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            {/* nav */}
            <div>
              <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
                Navigate
              </p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-champagne transition-all duration-300 group-hover:w-4" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* contact */}
            <div>
              <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
                Get in touch
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-4 block text-sm text-white/70 transition-colors hover:text-champagne"
              >
                {profile.email}
              </a>
              <p className="mt-2 text-sm text-white/50">{profile.location}</p>
              <p className="mt-6 font-grotesk text-xs uppercase tracking-[0.2em] text-white/40">
                {new Date().getFullYear()} © All rights reserved
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="font-grotesk text-xs tracking-wide text-white/40">
              Designed & built with obsession by Muhammad Hasaan
            </p>
            <a
              href="#top"
              className="group flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowRight size={13} className="rotate-[-90deg]" />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
