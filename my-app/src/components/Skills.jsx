"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading, stagger, fadeUp } from "./motion";
import GridLines from "./GridLines";

// Flattened, de-duplicated list for the scrolling tech marquee.
const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

export default function Skills() {
    return (
        <section
            id="skills"
            className="relative z-0 overflow-hidden bg-[#f4f4f0] px-6 py-24 lg:px-10 lg:py-32"
        >
            {/* Luxury animated background grid (light) */}
            <GridLines variant="light" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <SectionHeading
                    index="03"
                    label="Skills"
                    headline={
                        <>
                            The full stack
                            <br />
                            <span className="text-neutral-900/35">behind every build</span>
                        </>
                    }
                />

                <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700">
                    An end-to-end toolkit spanning the MERN stack, Next.js, secure auth,
                    Redis-powered queues and motion design — everything needed to take a
                    product from first prompt to production.
                </p>

                {/* ---- Scrolling tech marquee ---- */}
                <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <motion.div
                        className="flex w-max gap-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                    >
                        {[...allSkills, ...allSkills].map((skill, i) => (
                            <span
                                key={`${skill}-${i}`}
                                className="whitespace-nowrap rounded-full border border-neutral-900/10 bg-white/70 px-5 py-2.5 font-grotesk text-sm tracking-wide text-neutral-700 backdrop-blur"
                            >
                                {skill}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* ---- Grouped skill cards ---- */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {skillGroups.map((group, i) => (
                        <motion.div
                            key={group.id}
                            variants={fadeUp}
                            custom={i}
                            className="group relative z-10 flex flex-col rounded-3xl border border-neutral-900/10 bg-white/60 p-6 backdrop-blur transition-colors duration-500 hover:border-neutral-900/25 hover:bg-white"
                        >
                            <span className="font-grotesk text-xs tracking-[0.2em] text-neutral-500">
                                0{i + 1}
                            </span>
                            <h3 className="font-display mt-4 text-2xl tracking-tight text-neutral-900">
                                {group.title}
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                                {group.caption}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-neutral-900/10 bg-white px-3 py-1 font-grotesk text-[11px] tracking-wide text-neutral-700 transition-colors duration-300 group-hover:border-neutral-900/20"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
