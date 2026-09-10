"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience, profile } from "@/data/portfolio";
import { SectionHeading, EASE } from "./motion";

function ExperienceRow({ job, index }) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);

  // floating screenshot position follows cursor
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group relative grid cursor-default grid-cols-1 gap-2 border-t border-white/12 py-10 transition-colors duration-500 hover:border-white/30 md:grid-cols-[1fr_1.2fr_auto] md:items-baseline md:gap-8"
    >
      {/* timeline dot */}
      <span className="absolute -top-[5px] left-0 flex h-2.5 w-2.5 items-center justify-center">
        <span className="absolute h-2.5 w-2.5 rounded-full bg-white/25 transition-all duration-500 group-hover:bg-champagne" />
        <span className="absolute h-1 w-1 rounded-full bg-white transition-colors duration-500 group-hover:bg-ink" />
      </span>

      {/* period */}
      <p className="font-grotesk text-sm uppercase tracking-[0.2em] text-white/45 transition-colors duration-500 group-hover:text-champagne/80">
        {job.period}
      </p>

      {/* company + role */}
      <div>
        <h3 className="font-display text-3xl tracking-tight text-white transition-colors duration-500 group-hover:text-champagne sm:text-4xl">
          {job.company}
        </h3>
        <p className="mt-2 font-grotesk text-sm font-medium tracking-wide text-white/60">
          {job.role}
        </p>
      </div>

      {/* arrow */}
      <div className="flex items-center justify-start gap-3 md:justify-end">
        <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-white/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {job.highlights.join(" · ")}
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-champagne group-hover:text-champagne">
          <ArrowUpRight size={17} />
        </span>
      </div>

      {/* summary — expands under the row on hover */}
      <div className="col-span-1 md:col-span-2 md:col-start-2">
        <AnimatePresence>
          {hovering && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-lg overflow-hidden text-sm leading-relaxed text-white/60"
            >
              {job.summary}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* floating screenshot tooltip */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-none absolute z-30 hidden lg:block"
            style={{
              x: sx,
              y: sy,
              left: 0,
              top: -40,
              translateX: "-120%",
            }}
          >
            <div className="w-72 -translate-x-full overflow-hidden rounded-2xl border border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-1.5 bg-white/10 px-4 py-3 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
                <span className="ml-2 font-grotesk text-[11px] tracking-wide text-white/70">
                  {job.company.toLowerCase().replace(/\s+/g, "")}.app
                </span>
              </div>
              <Image
                src={job.image}
                alt={`${job.company} screenshot`}
                width={288}
                height={192}
                className="h-40 w-full object-cover"
              />
              <div className="bg-black/80 px-4 py-3">
                <p className="font-grotesk text-xs font-medium text-white">
                  {job.role}
                </p>
                <p className="mt-0.5 text-[11px] text-white/50">
                  {job.highlights.join(" · ")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="obsidian relative overflow-hidden bg-obsidian text-white">
      {/* soft top fade from light section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f4f3ef] to-transparent opacity-90" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        {/* watermark */}
        <p
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -top-6 right-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
        >
          JOURNEY
        </p>

        <SectionHeading
          light
          index="03"
          label="Experience"
          headline={
            <>
              Years of
              <br />
              <span className="text-white/35">crafting the web</span>
            </>
          }
        />

        {/* total years indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-12 inline-flex items-end gap-2 rounded-3xl border border-white/12 bg-white/5 px-6 py-5 backdrop-blur"
        >
          <span className="font-display text-6xl leading-none text-champagne">
            {profile.totalExperienceYears}
          </span>
          <span className="mb-1 font-grotesk text-xs uppercase tracking-[0.22em] text-white/50">
            Years of
            <br />
            experience
          </span>
        </motion.div>

        {/* timeline */}
        <div className="mt-14">
          {experience.map((job, i) => (
            <ExperienceRow key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
