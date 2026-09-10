/**
 * Central data layer for the portfolio.
 * SVG placeholder artwork keeps the app dependency-free.
 */

export const profile = {
  name: "Muhammad Hasaan",
  shortName: "HASAAN",
  role: "Full-Stack Web Developer",
  tagline: "Crafting high-end digital experiences with obsession over detail.",
  pitch:
    "I design and engineer bold, minimal products with Next.js, the MERN stack and modern UI architectures — blending disciplined engineering with luxury-grade aesthetics. Based in Charsadda, Pakistan, working worldwide.",
  email: "muhammadhassanweb@gmail.com",
  location: "Charsadda, PK",
  available: true,
  totalExperienceYears: "2+",
  // Public assets (served from /public)
  resumeUrl: "/resume.pdf",
  photoUrl: "/profile.jpg",
  socials: [
    {
      label: "GitHub",
      handle: "@MuhammadHasaan546-eng",
      url: "https://github.com/MuhammadHasaan546-eng",
    },
    {
      label: "LinkedIn",
      handle: "in/muhammad-hasaan-609a282a6",
      url: "https://www.linkedin.com/in/muhammad-hasaan-609a282a6/",
    },
    {
      label: "Email",
      handle: "muhammadhassanweb@gmail.com",
      url: "mailto:muhammadhassanweb@gmail.com",
    },
    { label: "Twitter / X", handle: "@muhammadhasaan", url: "https://x.com" },
  ],
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Visuals — inline SVG data-URI placeholders                          */
/* ------------------------------------------------------------------ */
const paletteA = ["#1a1a1a", "#e6e1d6", "#f4f3ef", "#2e2e2e"];
const paletteB = ["#0f172a", "#f4f3ef", "#e6e1d6", "#334155"];
const paletteC = ["#1c1917", "#d6c9a8", "#f4f3ef", "#3f3a33"];
const paletteD = ["#0c0a09", "#ffffff", "#8a8a8a", "#26221d"];
const paletteE = ["#101820", "#f2e9dc", "#c8a27a", "#28323c"];
const paletteF = ["#111111", "#f4f3ef", "#b3a99a", "#2a2a2a"];

const gradient = (a, b) => `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

const makeArt = (colors, seed = 42) => {
  // deterministic pseudo-random from seed
  const rand = (n) => {
    const x = Math.sin(seed++ * 999) * 10000;
    return Math.floor((x - Math.floor(x)) * n);
  };
  const rects = Array.from({ length: 14 }, (_, i) => {
    const x = rand(88);
    const y = rand(88);
    const w = 6 + rand(46);
    const h = 6 + rand(46);
    const c = colors[rand(colors.length)];
    const r = rand(18);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" opacity="${(rand(60) + 30) / 100}"/>`;
  }).join("");
  const circle = `<circle cx="${30 + rand(40)}" cy="${30 + rand(40)}" r="${8 + rand(22)}" fill="${colors[1]}" opacity="0.9"/>`;
  const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 100 75'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='${colors[0]}'/%3E%3Cstop offset='1' stop-color='${colors[3]}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='75' fill='url(%23g)'/%3E${circle}${rects}%3C/svg%3E`;
  // The SVG contains raw "#" (in hex colors) and spaces — both are invalid
  // inside a data: URI and truncate the image. Encode them so every image
  // (hero portrait, project previews, gallery) actually renders.
  return svg.replace(/#/g, "%23").replace(/ /g, "%20");
};

export const avatarArt = makeArt(["#e6e1d6", "#111111", "#c9c2b4", "#8a8578"], 7);

// Remote stock imagery from Unsplash — real photography used to flesh out the
// project galleries alongside the hand-captured product screenshots.
// `images.unsplash.com` is allow-listed in next.config.mjs.
const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    slug: "lume-ai",
    name: "Lume.ai",
    tagline: "AI-powered web builder that ships complete sites from a prompt.",
    category: "AI Apps",
    type: "AI Web Builder / Full-Stack Platform",
    year: "2025",
    duration: "10 Weeks",
    role: "Full-Stack Development, AI Integration",
    stack: ["Next.js", "Express.js", "React", "Tailwind CSS", "JWT Auth", "OpenAI API"],
    image: "/projects/lume-ai.png",
    gradient: gradient(paletteB[0], paletteB[3]),
    color: "#0f172a",
    link: "https://lume-ai-xi.vercel.app/",
    overview:
      "Lume.ai is an AI-powered platform that generates code and builds complete, customizable websites instantly from natural language prompts. A single sentence becomes a fully structured, responsive site users can refine in real time.",
    challenge:
      "Turning free-form natural language into production-ready UI is hard. The interface had to feel immediate, keep generation latency low, and let users iterate on generated layouts without ever losing their work.",
    solution:
      "I built the platform on Next.js with streaming AI responses, an optimistic preview layer and a component-driven rendering engine. Structured prompt contracts keep generated output consistent, while a live editor lets users customize every section instantly.",
    results: [
      "Prompt-to-site generation in under 20 seconds",
      "3× faster iteration vs. manual scaffolding",
      "99.9% uptime across launch week",
    ],
    gallery: [
      "/projects/lume-ai.png",
      unsplash("photo-1620712943543-bcc4688e7485"),
      unsplash("photo-1677442136019-21780ecad995"),
    ],
  },
  {
    slug: "luro-ai",
    name: "Luro AI",
    tagline: "All-in-one AI content engine with dynamic PDF export.",
    category: "AI Apps",
    type: "AI Content Engine & PDF Utility",
    year: "2025",
    duration: "8 Weeks",
    role: "Full-Stack Development, API Design",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Redis", "BullMQ", "Framer Motion"],
    image: "/projects/luro-ai.png",
    gradient: gradient(paletteE[0], paletteE[3]),
    color: "#c8a27a",
    link: "https://luro-ai-five.vercel.app/",
    overview:
      "Luro AI is an all-in-one content generation suite for creating social media posts, AI-driven email copy and dynamic downloadable PDF documents — a single workspace for everything a lean team needs to publish.",
    challenge:
      "Content teams juggle half a dozen tools. Luro needed to unify generation, formatting and export while keeping output on-brand and reliably structured for downstream documents.",
    solution:
      "I designed an Express backend with composable AI API pipelines and a Next.js front end with a live editor. A templating layer turns generated copy into styled, downloadable PDFs while prompt presets keep tone consistent across channels.",
    results: [
      "4 content formats unified in one workspace",
      "PDF export generated in under 3 seconds",
      "78% reduction in manual copywriting time",
    ],
    gallery: [
      "/projects/luro-ai.png",
      unsplash("photo-1611162617474-5b21e879e113"),
      unsplash("photo-1611926653458-09294b3142bf"),
    ],
  },
  {
    slug: "kokhan-ecommerce",
    name: "Kokhan E-Commerce",
    tagline: "A modern full-stack store with a seamless checkout flow.",
    category: "E-Commerce",
    type: "Full-Stack E-Commerce Store",
    year: "2024",
    duration: "12 Weeks",
    role: "Full-Stack Development, MERN Architecture",
    stack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "JWT Auth", "Stripe"],
    image: "/projects/kokhan-ecommerce.png",
    gradient: gradient(paletteC[0], paletteC[3]),
    color: "#d6c9a8",
    link: "https://kokhan.vercel.app/",
    overview:
      "Kokhan is a modern e-commerce web platform featuring dynamic product catalogs, a seamless shopping cart, user checkout and fully responsive design — engineered on the MERN stack for speed and scale.",
    challenge:
      "E-commerce lives and dies on the checkout. Kokhan needed fast product browsing, trustworthy cart state and a frictionless checkout that held up on mobile — without a heavyweight platform.",
    solution:
      "I built a MongoDB data layer with an Express API, a Next.js storefront and an optimistic cart powered by React state. Catalog filtering, persistent cart state and a streamlined checkout cut drop-off dramatically across devices.",
    results: [
      "Sub-second product page loads",
      "32% uplift in completed checkouts",
      "100% responsive across mobile and desktop",
    ],
    gallery: [
      "/projects/kokhan-ecommerce.png",
      unsplash("photo-1445205170230-053b83016050"),
      unsplash("photo-1441986300917-64674bd600d8"),
    ],
  },
];

export const projectCategories = ["All", "AI Apps", "E-Commerce", "Web Platforms"];

/* ------------------------------------------------------------------ */
/* Skills — grouped by the layer of the stack I work across            */
/* ------------------------------------------------------------------ */
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    caption: "Interfaces engineered for speed and detail",
    items: [
      "Next.js",
      "React",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS",
      "HTML5 & CSS3",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    caption: "Scalable services and clean REST contracts",
    items: [
      "Node.js",
      "Express.js",
      "MERN Stack",
      "REST APIs",
      "GraphQL",
      "Webhooks",
    ],
  },
  {
    id: "data",
    title: "Databases & Auth",
    caption: "Secure, reliable data and identity layers",
    items: [
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Firebase Auth",
      "JWT",
      "Passport.js",
      "NextAuth.js",
    ],
  },
  {
    id: "state",
    title: "State Management",
    caption: "Predictable data flow across complex UIs",
    items: ["Redux Toolkit", "TanStack Query", "Context API", "Zustand"],
  },
  {
    id: "caching",
    title: "Caching, Queues & Realtime",
    caption: "Background jobs and low-latency data",
    items: ["Redis", "BullMQ", "Upstash", "Socket.IO", "Cron Jobs"],
  },
  {
    id: "motion",
    title: "Animation & 3D",
    caption: "Motion that makes products feel alive",
    items: ["Framer Motion", "GSAP", "Three.js", "Lenis"],
  },
  {
    id: "tooling",
    title: "Tooling & DevOps",
    caption: "Ship, observe and iterate with confidence",
    items: [
      "Git & GitHub",
      "Vercel",
      "Docker",
      "Postman",
      "Cloudinary",
      "Stripe",
      "Nodemailer",
    ],
  },
  {
    id: "ai",
    title: "AI Integration",
    caption: "LLM features wired into real products",
    items: [
      "OpenAI API",
      "Streaming Responses",
      "Prompt Engineering",
      "Vector Search",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export const services = [
  {
    id: "fullstack",
    title: "Full-Stack Web Dev",
    description:
      "End-to-end product engineering — from pixel-perfect React and Next.js interfaces to scalable architectures, databases and deployment pipelines. Everything an ambitious product needs, under one roof.",
    visual: makeArt(paletteA, 51),
    tags: ["Next.js", "MERN Stack", "Scalable Architectures"],
  },
  {
    id: "ai",
    title: "AI Integration & Automation",
    description:
      "Production-grade AI features built on LLM APIs — prompt engineering, streaming responses and automation workflows that remove repetitive work and add real leverage to your product.",
    visual: makeArt(paletteE, 52),
    tags: ["LLM APIs", "Prompt Engineering", "Automation"],
  },
  {
    id: "backend",
    title: "REST APIs & Backend Systems",
    description:
      "Designed-for-developers APIs with clean contracts, bulletproof auth, caching and observability. I build Node.js and Express backends that stay fast long after launch.",
    visual: makeArt(paletteB, 53),
    tags: ["Node.js", "Express", "Databases", "Caching"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */
export const experience = [
  {
    company: "Nova Digital",
    role: "Senior Full-Stack Engineer",
    period: "2023 — Present",
    kind: "Work",
    summary:
      "Leading end-to-end product builds for venture-backed startups — owning architecture, design systems and delivery from first commit to scale.",
    image: makeArt(paletteB, 61),
    highlights: ["Team lead of 6", "Design systems", "Performance"],
  },
  {
    company: "AI Automation Workshop",
    role: "Workshop Lead & Instructor",
    period: "2024",
    kind: "Workshop",
    summary:
      "Designed and led hands-on workshops teaching teams how to integrate LLM APIs, prompt engineering and automation workflows into production applications.",
    image: makeArt(paletteE, 62),
    highlights: ["120+ attendees", "LLM APIs", "Hands-on labs"],
  },
  {
    company: "react-motion-kit",
    role: "Open-Source Maintainer",
    period: "2023 — Present",
    kind: "Open Source",
    summary:
      "Built and maintain an open-source library of reusable Framer Motion primitives — documented, tested and adopted across several production projects.",
    image: makeArt(paletteD, 63),
    highlights: ["MIT licensed", "1.2k+ downloads", "Docs & tests"],
  },
  {
    company: "Northbeam Studio",
    role: "Full-Stack Developer (MERN)",
    period: "2023 — 2024",
    kind: "Work",
    summary:
      "Shipped high-end marketing sites, e-commerce platforms and web apps for international brands using the MERN stack and headless commerce.",
    image: makeArt(paletteC, 64),
    highlights: ["MERN stack", "E-commerce", "SEO"],
  },
  {
    company: "Freelance",
    role: "Independent Developer & Designer",
    period: "2022 — 2023",
    kind: "Work",
    summary:
      "Partnered directly with founders and agencies to design, build and launch MVPs across e-commerce, SaaS and fintech.",
    image: makeArt(paletteA, 65),
    highlights: ["20+ shipped", "SaaS & fintech", "Direct client work"],
  },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hasaan.dev";

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
