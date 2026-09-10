"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, projectCategories } from "@/data/portfolio";
import { SectionHeading, EASE } from "./motion";
import GridLines from "./GridLines";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group relative z-10 flex flex-col"
    >
      {/* Image preview */}
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="block"
          aria-label={`View case study: ${project.name}`}
        >
          <Image
            src={project.image}
            alt={`${project.name} dashboard preview`}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* hover overlay */}
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/60 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="translate-y-3 font-grotesk text-sm uppercase tracking-[0.2em] text-white transition-transform duration-500 group-hover:translate-y-0">
              View Case Study
            </span>
            <span className="flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-y-0 group-hover:rotate-45">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </Link>

        {/* index number */}
        <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 font-grotesk text-[11px] tracking-[0.15em] text-ink backdrop-blur-md">
          0{index + 1}
        </span>
        {/* category tag */}
        <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-grotesk text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h3 className="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1.5 font-grotesk text-xs uppercase tracking-[0.18em] text-neutral-500">
            {project.type}
          </p>
        </div>
        <span className="shrink-0 pt-1 font-grotesk text-xs font-medium text-neutral-600">
          {project.year}
        </span>
      </div>

      {/* Summary */}
      <p className="mt-3 px-1 text-sm leading-relaxed text-neutral-700">
        {project.tagline}
      </p>

      {/* Tech tag pills */}
      <div className="mt-4 flex flex-wrap gap-2 px-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-neutral-900/10 bg-white/60 px-3 py-1 font-grotesk text-[11px] tracking-wide text-neutral-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-4 px-1">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-neutral-800"
        >
          Live Preview
          <ExternalLink
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
        >
          Case Study
          <ArrowUpRight size={14} />
        </Link>
      </div>
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
