"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { EASE } from "./motion";

/**
 * Project card — the whole card is a DIRECT link to the live deployed site.
 * Opens in a new tab (target="_blank", rel="noopener noreferrer").
 * No internal /projects/[slug] route is used from the home grid.
 */
export default function ProjectCard({ project, index }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group relative z-10 flex flex-col"
        >
            {/* ---- Image preview — clickable -> live site ---- */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} live site in a new tab`}
                className="block"
            >
                <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm">
                    <Image
                        src={project.image}
                        alt={`${project.name} dashboard preview`}
                        width={1600}
                        height={1000}
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    {/* hover overlay */}
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/60 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="translate-y-3 font-grotesk text-sm uppercase tracking-[0.2em] text-white transition-transform duration-500 group-hover:translate-y-0">
                            View Live Site
                        </span>
                        <span className="flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-y-0 group-hover:rotate-45">
                            <ArrowUpRight size={19} />
                        </span>
                    </div>

                    {/* index number */}
                    <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 font-grotesk text-[11px] tracking-[0.15em] text-ink backdrop-blur-md">
                        0{index + 1}
                    </span>
                    {/* category tag */}
                    <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-grotesk text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                        {project.category}
                    </span>
                </div>
            </a>

            {/* ---- Title / summary / stack — clickable -> live site ---- */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title mt-5 block px-1"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="font-display text-2xl tracking-tight text-neutral-900 transition-colors duration-300 group-hover/title:text-neutral-700 sm:text-3xl">
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

                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    {project.tagline}
                </p>

                {/* Tech tag pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-neutral-900/10 bg-white/60 px-3 py-1 font-grotesk text-[11px] tracking-wide text-neutral-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </a>

            {/* ---- Action — Live Demo -> live site ---- */}
            <div className="mt-5 px-1">
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-neutral-800"
                >
                    Live Demo
                    <ExternalLink
                        size={14}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                </a>
            </div>
        </motion.article>
    );
}
