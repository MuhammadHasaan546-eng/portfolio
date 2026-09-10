"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, projectCategories } from "@/data/portfolio";
import { SectionHeading, EASE } from "./motion";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block"
        aria-label={`View case study: ${project.name}`}
      >
        {/* Image preview */}
        <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface">
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* hover overlay + arrow */}
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/50 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="translate-y-3 font-grotesk text-sm uppercase tracking-[0.2em] text-white transition-transform duration-500 group-hover:translate-y-0">
              View Case Study
            </span>
            <span className="flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-y-0 group-hover:rotate-45">
              <ArrowUpRight size={19} />
            </span>
          </div>
          {/* index number */}
          <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 font-grotesk text-[11px] tracking-[0.15em] text-ink backdrop-blur-md">
            0{index + 1}
          </span>
          {/* category tag */}
          <span className="absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-grotesk text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Meta row */}
        <div className="mt-5 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="font-display text-2xl tracking-tight text-ink transition-colors duration-300 group-hover:text-ink/70 sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1.5 font-grotesk text-sm text-ink/55">
              {project.tagline}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 pt-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-ink/70">
              {project.year}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          label="Selected Work"
          headline={
            <>
              Selected <span className="italic font-grotesk">work</span>
              <br />
              <span className="text-ink/35">that speaks for itself</span>
            </>
          }
        />

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full px-5 py-2.5 font-grotesk text-sm tracking-wide transition-colors duration-300 ${
                filter === c
                  ? "text-background"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="work-filter"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
          <span className="ml-auto hidden font-grotesk text-xs uppercase tracking-[0.2em] text-ink/40 sm:block">
            {filtered.length} {filtered.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
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
