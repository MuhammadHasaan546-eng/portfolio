"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SectionHeading, fadeUp, stagger, EASE } from "./motion";
import GridLines from "./GridLines";

const facts = [
    { label: "Based in", value: profile.location },
    { label: "Experience", value: `${profile.totalExperienceYears} years` },
    { label: "Focus", value: "Full-Stack & AI Products" },
    { label: "Availability", value: profile.available ? "Open to work" : "Booked" },
];

export default function About() {
    return (
        <section
            id="about"
            className="relative z-0 overflow-hidden bg-[#f4f4f0] px-6 py-24 lg:px-10 lg:py-32"
        >
            {/* Luxury animated background grid (light) */}
            <GridLines variant="light" />

            {/* watermark */}
            <p
                aria-hidden="true"
                className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
            >
                ABOUT
            </p>

            <div className="relative z-10 mx-auto max-w-7xl">
                <SectionHeading
                    index="01"
                    label="About"
                    headline={
                        <>
                            The developer
                            <br />
                            <span className="text-neutral-900/35">behind the work</span>
                        </>
                    }
                />

                <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
                    {/* ---- Portrait ---- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="relative mx-auto w-full max-w-sm lg:mx-0"
                    >
                        {/* glow */}
                        <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-neutral-900/5 via-transparent to-neutral-900/10 blur-2xl" />

                        <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-100 shadow-2xl">
                            {/* initials fallback */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300"
                            >
                                <span className="font-display text-6xl text-neutral-400">
                                    {profile.name
                                        .split(" ")
                                        .map((w) => w[0])
                                        .join("")}
                                </span>
                            </div>
                            <Image
                                src={profile.photoUrl}
                                alt={`${profile.name} — ${profile.role}`}
                                fill
                                sizes="(max-width: 1024px) 90vw, 420px"
                                priority
                                className="relative object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                            {/* name plate */}
                            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/75 px-5 py-4 backdrop-blur-xl">
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
                    </motion.div>

                    {/* ---- Bio + facts + resume ---- */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.p
                            variants={fadeUp}
                            className="font-display text-2xl leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl"
                        >
                            I build and engineer bold, minimal products with{" "}
                            <span className="italic">Next.js</span>, the{" "}
                            <span className="italic">MERN stack</span> and motion-rich interfaces —
                            blending disciplined engineering with luxury-grade aesthetics.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700"
                        >
                            {profile.pitch}
                        </motion.p>

                        {/* facts grid */}
                        <motion.dl
                            variants={fadeUp}
                            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
                        >
                            {facts.map((f) => (
                                <div key={f.label}>
                                    <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                                        {f.label}
                                    </dt>
                                    <dd className="mt-2 text-sm font-medium leading-snug text-neutral-900">
                                        {f.value}
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>

                        {/* actions */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                        >
                            <a
                                href={profile.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neutral-900 px-7 py-4 text-sm font-medium text-white"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-[#c9c2b4] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                <span className="relative flex items-center gap-2">
                                    <Download size={16} className="relative" />
                                    Download Resume
                                </span>
                                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight size={13} strokeWidth={2.6} />
                                </span>
                            </a>

                            <div className="flex flex-col gap-2 font-grotesk text-sm text-neutral-600 sm:flex-row sm:items-center sm:gap-5">
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="inline-flex items-center gap-2 transition-colors hover:text-neutral-900"
                                >
                                    <Mail size={15} />
                                    {profile.email}
                                </a>
                                <span className="hidden h-4 w-px bg-neutral-900/15 sm:block" />
                                <span className="inline-flex items-center gap-2">
                                    <MapPin size={15} />
                                    {profile.location}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
