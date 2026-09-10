"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, X, Mail } from "lucide-react";
import { profile, navLinks } from "@/data/portfolio";
import { EASE } from "./motion";
import GridLines from "./GridLines";

// Read the current year without a server/client hydration mismatch:
// the server snapshot is deterministic, the client snapshot is live.
const subscribeYear = () => () => { };
const getYearSnapshot = () => new Date().getFullYear();
const getServerYearSnapshot = () => 2025;

export default function CTAFooter() {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const year = useSyncExternalStore(
    subscribeYear,
    getYearSnapshot,
    getServerYearSnapshot
  );
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Lock body scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => e.key === "Escape" && setModalOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setModalOpen(false);
  };

  return (
    <>
      {/* ---------------- CTA ---------------- */}
      <section
        id="contact"
        className="obsidian relative z-0 overflow-hidden bg-[#111111] px-6 pb-28 pt-24 text-white lg:px-10"
      >
        {/* Luxury animated background grid (dark) */}
        <GridLines variant="dark" />

        {/* oversized watermark — strictly background */}
        <p
          aria-hidden="true"
          className="text-outline pointer-events-none absolute inset-x-0 top-8 z-0 select-none text-center font-display text-[17vw] leading-none"
        >
          {"LET'S TALK"}
        </p>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
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
            className="font-display mt-8 text-5xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl"
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
            currently accepting new projects for {year}.
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
                  key="contact"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={() => setModalOpen(true)}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-white px-9 py-5 text-base font-semibold text-neutral-900"
                >
                  <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Contact Me</span>
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45">
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
      <footer className="obsidian relative z-0 border-t border-white/10 bg-[#111111] px-6 pb-10 pt-14 text-white lg:px-10">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* brand */}
            <div>
              <Link href="#top" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900">
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
                {year} © All rights reserved
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

      {/* ---------------- Contact Modal (z-50) ---------------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Contact Muhammad Hasaan"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 text-white shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close contact dialog"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <X size={16} />
              </button>

              <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-champagne/80">
                Start a project
              </p>
              <h3 className="font-display mt-3 text-3xl tracking-tight">
                {"Let's build something great"}
              </h3>

              <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
                <div>
                  <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/50">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-champagne/60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/50">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-champagne/60"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/50">
                    Project details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-champagne/60"
                    placeholder="Tell me about the product you want to build..."
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-neutral-900 transition-colors duration-300 hover:bg-champagne"
                >
                  <Mail size={16} />
                  Send Message
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="font-grotesk text-center text-xs tracking-wide text-white/40 transition-colors hover:text-white/70"
                >
                  or copy email — {profile.email}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
