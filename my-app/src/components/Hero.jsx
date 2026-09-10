"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, avatarArt } from "@/data/portfolio";
import { EASE, stagger, fadeUp } from "./motion";
import GridLines from "./GridLines";

const socialIcons = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm9.3 8.7L3.5 6.7v11.6l7.8-5.6Zm1.4 0 7.8 5.6V6.7l-7.8 5.6Zm6.6-6.6H4.7L12 12.8l7.3-6.7Z" />
    </svg>
  ),
};

function SocialColumn() {
  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center gap-5 md:flex-col md:items-start md:justify-center md:gap-0"
    >
      {profile.socials.map((s) => (
        <motion.li key={s.label} variants={fadeUp}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="group flex items-center gap-2 text-neutral-600 transition-colors duration-300 hover:text-neutral-900 md:py-2.5"
          >
            <span className="opacity-100 transition-transform duration-300 md:group-hover:-translate-x-1.5">
              {socialIcons[s.label] || socialIcons.Email}
            </span>
            <span className="hidden text-sm font-medium tracking-wide md:inline">
              {s.label}
            </span>
            <ArrowUpRight
              size={15}
              strokeWidth={2}
              className="hidden -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
            />
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#f4f4f0]"
    >
      {/* ================= LAYER 0 — background only (z-0, no pointer) ================= */}
      {/* Luxury animated background grid */}
      <GridLines variant="light" />

      {/* Giant watermark text — strictly behind all content */}
      <motion.h1
        aria-hidden="true"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        className="hero-watermark pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[26vw] leading-none opacity-10 lg:text-[22vw]"
      >
        DEVELOPER
      </motion.h1>

      {/* soft decorative ring behind the portrait — also strictly behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-900/5"
      />

      {/* ================= LAYER 1 — main content (relative z-10) ================= */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Top decorative strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 mt-32 flex items-center justify-center gap-3 px-4 text-center font-grotesk text-xs uppercase tracking-[0.3em] text-neutral-500 lg:mt-40"
        >
          <span className="h-px w-8 bg-neutral-900/30" />
          {profile.role}
          <span className="h-px w-8 bg-neutral-900/30" />
        </motion.p>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 lg:px-10">
          {/* Mobile greeting line */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 flex flex-col items-center text-center lg:hidden"
          >
            <p className="font-grotesk text-sm uppercase tracking-[0.25em] text-neutral-600">
              Hi, {"I'm"} {profile.name} — based in {profile.location}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-[0.95] text-neutral-900 sm:text-6xl">
              Building the
              <br />
              <span className="italic">premium</span> web.
            </h2>
          </motion.div>

          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* ---------- LEFT — badge + headline + bio + CTAs ---------- */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="order-2 max-w-xl text-center lg:order-1 lg:pr-10 lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                className="mb-8 hidden items-center gap-2 lg:flex"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="font-grotesk text-sm font-medium text-neutral-700">
                  Hi, {"I'm"} {profile.name} — based in {profile.location}
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-display hidden text-6xl font-bold leading-[0.92] tracking-tight text-neutral-900 xl:block"
              >
                Full-Stack
                <br />
                Web
                <span className="relative inline-block">
                  {" "}
                  Developer
                  <svg
                    viewBox="0 0 220 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M3 9C60 3 160 3 217 9"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="text-neutral-900/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1, duration: 0.8, ease: EASE }}
                    />
                  </svg>
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-md text-base leading-relaxed text-neutral-700 lg:mx-0"
              >
                {profile.pitch}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neutral-900 px-7 py-4 text-sm font-medium text-white"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#c9c2b4] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">{"Let's Collaborate"}</span>
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={13} strokeWidth={2.6} />
                  </span>
                </a>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  See my work
                  <ArrowDown
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* ---------- CENTER — portrait card ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="order-1 flex justify-center lg:order-2"
            >
              <div className="relative">
                {/* glow ring */}
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-neutral-900/5 via-transparent to-neutral-900/10 blur-2xl" />

                <div className="group relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white shadow-2xl">
                  <Image
                    src={avatarArt}
                    alt="Portrait of Muhammad Hasaan"
                    width={420}
                    height={520}
                    priority
                    className="h-[420px] w-[300px] object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[520px] sm:w-[380px]"
                  />

                  {/* bottom info card inside photo */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/70 px-5 py-4 backdrop-blur-xl">
                    <div>
                      <p className="font-display text-lg leading-none text-neutral-900">
                        {profile.name}
                      </p>
                      <p className="mt-1 font-grotesk text-xs uppercase tracking-[0.2em] text-neutral-600">
                        {profile.role}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>

                {/* top-left experience badge */}
                <div className="absolute -left-6 top-8 hidden rounded-2xl bg-white px-4 py-3 shadow-xl backdrop-blur-xl sm:block lg:-left-14">
                  <p className="font-display text-2xl leading-none text-neutral-900">
                    {profile.totalExperienceYears}
                  </p>
                  <p className="mt-1 font-grotesk text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                    Years Exp.
                  </p>
                </div>

                {/* bottom-right open-to-work pill */}
                <div className="absolute -right-6 bottom-24 hidden rounded-2xl bg-neutral-900 px-4 py-3 text-white shadow-xl sm:block lg:-right-10">
                  <p className="flex items-center gap-1.5 font-grotesk text-[11px] uppercase tracking-[0.14em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Open to work
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ---------- RIGHT — social rail ---------- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
              className="order-3 lg:pl-6"
            >
              <SocialColumn />
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="font-grotesk text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-10 w-px overflow-hidden bg-neutral-900/10">
            <motion.span
              className="block h-4 w-px bg-neutral-900/60"
              animate={{ y: [-16, 16] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
