"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { services } from "@/data/portfolio";
import { SectionHeading, EASE } from "./motion";

function ServiceRow({ service, index, active, onToggle }) {
  const open = active === service.id;

  return (
    <motion.div
      layout
      initial={false}
      transition={{ layout: { duration: 0.55, ease: EASE } }}
      className={`relative overflow-hidden rounded-3xl transition-colors duration-500 ${
        open ? "bg-ink text-background" : "text-ink"
      }`}
      onMouseEnter={() => onToggle(service.id)}
    >
      <div className="grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[64px_1fr_auto] md:py-10">
        {/* index */}
        <span
          className={`font-grotesk text-sm tracking-[0.2em] ${
            open ? "text-background/50" : "text-ink/40"
          }`}
        >
          0{index + 1}
        </span>

        {/* title */}
        <button
          onClick={() => onToggle(service.id)}
          className="flex items-center gap-4 text-left"
          aria-expanded={open}
        >
          <h3 className="font-display text-3xl uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h3>
        </button>

        {/* plus toggle */}
        <div className="hidden justify-self-end md:block">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${
              open
                ? "border-background/25 bg-background text-ink"
                : "border-ink/15 text-ink"
            }`}
          >
            <Plus size={20} strokeWidth={2} />
          </motion.span>
        </div>
      </div>

      {/* expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="grid items-end gap-8 px-6 pb-10 sm:px-10 md:grid-cols-[64px_1fr_300px]">
              <span className="hidden md:block" />
              <div>
                <p className="max-w-xl text-base leading-relaxed text-background/75">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-background/20 px-3.5 py-1.5 font-grotesk text-xs tracking-wide text-background/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* floating visual thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="hidden overflow-hidden rounded-2xl border border-background/15 shadow-2xl md:block"
              >
                <Image
                  src={service.visual}
                  alt={`${service.title} visual`}
                  width={300}
                  height={200}
                  className="h-44 w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState(services[0].id);

  return (
    <section id="services" className="relative px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          label="Services"
          headline={
            <>
              What I can do
              <br />
              <span className="text-ink/35">for your product</span>
            </>
          }
        />

        {/* accordion list */}
        <div className="mt-14 flex flex-col gap-3">
          {services.map((s, i) => (
            <ServiceRow
              key={s.id}
              service={s}
              index={i}
              active={active}
              onToggle={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
