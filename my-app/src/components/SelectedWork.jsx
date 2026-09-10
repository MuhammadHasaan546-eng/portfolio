"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "@/data/portfolio";
import { SectionHeading } from "./motion";
import ProjectCard from "./ProjectCard";
import GridLines from "./GridLines";

export default function SelectedWork() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative z-0 bg-[#f4f4f0] px-6 py-24 lg:px-10 lg:py-32">
      <GridLines variant="light" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          label="Selected Work"
          headline={
            <>
              Selected <span className="italic font-grotesk">work</span>
              <br />
              <span className="text-neutral-900/35">that speaks for itself</span>
            </>
          }
        />

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full px-5 py-2.5 font-grotesk text-sm tracking-wide transition-colors duration-300 ${filter === c
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-900"
                }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="work-filter"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-neutral-900"
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
          <span className="ml-auto hidden font-grotesk text-xs uppercase tracking-[0.2em] text-neutral-500 sm:block">
            {filtered.length} {filtered.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
