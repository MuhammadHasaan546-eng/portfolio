import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function CaseStudyContent({ project }) {
  return (
    <article className="obsidian bg-obsidian text-white">
      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden px-6 pt-36 lg:px-10 lg:pt-44">
        {/* watermark */}
        <p
          aria-hidden="true"
          className="text-outline pointer-events-none absolute right-0 top-24 select-none font-display text-[22vw] leading-none lg:text-[15vw]"
        >
          {project.name.split(" ")[0].toUpperCase()}
        </p>

        <div className="relative mx-auto max-w-7xl">
          {/* back button */}
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-grotesk text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            <ArrowUpRight
              size={14}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to work
          </Link>

          {/* tags + duration */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-champagne px-4 py-1.5 font-grotesk text-xs font-medium uppercase tracking-[0.15em] text-ink">
              {project.category}
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 font-grotesk text-xs uppercase tracking-[0.15em] text-white/70">
              {project.year}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 font-grotesk text-xs uppercase tracking-[0.15em] text-white/70">
              <Clock size={12} />
              {project.duration}
            </span>
          </div>

          {/* title */}
          <h1 className="font-display mt-8 max-w-4xl text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            {project.tagline}
          </p>

          {/* live preview CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink"
            >
              <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">View Live Preview</span>
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                <ExternalLink size={14} />
              </span>
            </a>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 font-grotesk text-xs text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* hero image */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src={project.image}
              alt={`${project.name} hero preview`}
              width={1600}
              height={1000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ---------------- Body ---------------- */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* meta grid */}
        <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-12 md:grid-cols-4">
          {[
            { label: "Client", value: project.name },
            { label: "Year", value: project.year },
            { label: "Duration", value: project.duration },
            { label: "Role", value: project.role },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-white/40">
                {m.label}
              </p>
              <p className="mt-2 text-sm leading-snug text-white/85">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* overview / challenge / solution */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-14">
            {[
              { label: "The Overview", body: project.overview },
              { label: "The Challenge", body: project.challenge },
              { label: "The Solution", body: project.solution },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-champagne/80">
                  {s.label}
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* results */}
          <div>
            <div className="rounded-3xl border border-white/12 bg-white/5 p-8 lg:p-10">
              <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
                Key Results
              </p>
              <ul className="mt-8 space-y-7">
                {project.results.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-start gap-5 border-b border-white/10 pb-7 last:border-0 last:pb-0"
                  >
                    <span className="font-display text-3xl leading-none text-champagne">
                      0{i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-white/75">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------------- Gallery ---------------- */}
        <div className="mt-24">
          <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
            Gallery
          </p>
          <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">
            Visual showcase
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-3xl border border-white/10 ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.name} gallery image ${i + 1}`}
                  width={1200}
                  height={i === 0 ? 700 : 800}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* next project */}
        <div className="mt-24 border-t border-white/10 pt-10">
          <NextProject currentSlug={project.slug} />
        </div>
      </div>
    </article>
  );
}

function NextProject({ currentSlug }) {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  const next = projects[(idx + 1) % projects.length];
  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group flex items-center justify-between gap-6"
    >
      <div>
        <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
          Next Project
        </p>
        <p className="font-display mt-3 text-4xl tracking-tight text-white transition-colors duration-300 group-hover:text-champagne sm:text-6xl">
          {next.name}
        </p>
      </div>
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-champagne group-hover:text-champagne">
        <ArrowUpRight size={24} />
      </span>
    </Link>
  );
}
