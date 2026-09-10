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
    "I design and engineer bold, minimal products for ambitious teams — blending disciplined engineering with luxury-grade aesthetics. Based in Pakistan, working worldwide.",
  email: "hello@hasaan.dev",
  location: "Karachi, PK",
  available: true,
  totalExperienceYears: "5+",
  socials: [
    { label: "GitHub", handle: "@hasaanm", url: "https://github.com" },
    { label: "LinkedIn", handle: "in/hasaanm", url: "https://linkedin.com" },
    { label: "Email", handle: "hello@hasaan.dev", url: "mailto:hello@hasaan.dev" },
    { label: "Twitter / X", handle: "@hasaanm", url: "https://x.com" },
  ],
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
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
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 100 75'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='${colors[0]}'/%3E%3Cstop offset='1' stop-color='${colors[3]}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='75' fill='url(%23g)'/%3E${circle}${rects}%3C/svg%3E`;
};

export const avatarArt = makeArt(["#e6e1d6", "#111111", "#c9c2b4", "#8a8578"], 7);

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    slug: "atelier-nord",
    name: "Atelier Nord",
    tagline: "Editorial commerce for a Scandinavian design studio.",
    category: "Real Project",
    year: "2025",
    duration: "8 Weeks",
    role: "Full-Stack Development, Design Engineering",
    stack: ["Next.js", "Sanity CMS", "Stripe", "Tailwind CSS", "Vercel"],
    image: makeArt(paletteA, 11),
    gradient: gradient(paletteA[0], paletteA[3]),
    color: "#e6e1d6",
    link: "https://example.com",
    overview:
      "Atelier Nord is a Scandinavian furniture studio with a cult following. We rebuilt their storefront around editorial storytelling — turning a catalogue into a magazine-like experience where every product page feels like a spread.",
    challenge:
      "The brand needed a way to showcase seasonal collections without sacrificing the checkout flow. The design had to feel luxurious, but perform like a lean storefront on every device.",
    solution:
      "I architected a headless commerce layer with Stripe and Sanity, paired with an editorial page system. Custom motion primitives give the storefront its calm, gallery-like rhythm while keeping Core Web Vitals in the green.",
    results: [
      "38% increase in average session duration",
      "0.9s median LCP across product pages",
      "24% lift in add-to-cart conversions",
    ],
    gallery: [makeArt(paletteA, 21), makeArt(paletteA, 31), makeArt(paletteA, 41)],
  },
  {
    slug: "orbit-saas",
    name: "Orbit SaaS",
    tagline: "A product analytics platform with a serious edge.",
    category: "Real Project",
    year: "2025",
    duration: "12 Weeks",
    role: "Frontend Architecture, Product Design",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "tRPC"],
    image: makeArt(paletteB, 12),
    gradient: gradient(paletteB[0], paletteB[3]),
    color: "#0f172a",
    link: "https://example.com",
    overview:
      "Orbit is a real-time product analytics platform for growing teams. I led the frontend architecture and design system that powers dense dashboards without the visual noise.",
    challenge:
      "Analytics products drown users in charts. Orbit needed a calm, opinionated interface that surfaced the signal in the data and made setup feel effortless.",
    solution:
      "A token-driven design system with dark-first surfaces, a custom chart library built on SVG, and spring-based micro-interactions that make state changes legible. Every view was designed to be understood in under five seconds.",
    results: [
      "Onboarding completion up from 41% to 76%",
      "Design system reused across 3 product surfaces",
      "Sub-second transitions on 10k-row tables",
    ],
    gallery: [makeArt(paletteB, 22), makeArt(paletteB, 32), makeArt(paletteB, 42)],
  },
  {
    slug: "mono-banking",
    name: "Mono Banking",
    tagline: "A minimal, humane banking experience for a neobank.",
    category: "Real Project",
    year: "2024",
    duration: "16 Weeks",
    role: "Product Engineering, API Design",
    stack: ["Next.js", "Node.js", "AWS", "React Native", "GraphQL"],
    image: makeArt(paletteC, 13),
    gradient: gradient(paletteC[0], paletteC[3]),
    color: "#d6c9a8",
    link: "https://example.com",
    overview:
      "Mono is a neobank built on the belief that banking should feel invisible. I helped design the web app and the API contracts powering balances, transfers and insights.",
    challenge:
      "Financial products live and die on trust. The interface needed to be quiet, precise and instantly legible — while the backend juggled real-time balance events across regions.",
    solution:
      "Event-driven architecture on AWS with GraphQL federation for a single, fast data graph. The UI follows strict spacing and type discipline so that even dense financial tables feel calm.",
    results: [
      "P99 API latency under 140ms",
      "4.9/5 App Store rating post-launch",
      "60k active users in the first quarter",
    ],
    gallery: [makeArt(paletteC, 23), makeArt(paletteC, 33), makeArt(paletteC, 43)],
  },
  {
    slug: "forma-identity",
    name: "Forma Identity",
    tagline: "An explorative brand system for a design collective.",
    category: "Exploration",
    year: "2024",
    duration: "4 Weeks",
    role: "Art Direction, Creative Coding",
    stack: ["Framer Motion", "WebGL", "GSAP", "Next.js"],
    image: makeArt(paletteD, 14),
    gradient: gradient(paletteD[0], paletteD[3]),
    color: "#ffffff",
    link: "https://example.com",
    overview:
      "An exploration into what a living identity could be — a brand that recomposes itself every time you visit, built with generative layouts and fluid type.",
    challenge:
      "How far can a brand stretch before it stops being recognizable? I wanted to find the tension between chaos and consistency.",
    solution:
      "Generative grid systems seeded by the URL, a kinetic type system with spring physics, and a WebGL grain layer that ties every variation together.",
    results: [
      "Featured on 2 design showcases",
      "18 unique layout variations per seed",
      "Zero reflow on any viewport",
    ],
    gallery: [makeArt(paletteD, 24), makeArt(paletteD, 34), makeArt(paletteD, 44)],
  },
  {
    slug: "lumen-ai",
    name: "Lumen AI",
    tagline: "A conversational workspace for research teams.",
    category: "Real Project",
    year: "2024",
    duration: "10 Weeks",
    role: "Full-Stack Development, UX Engineering",
    stack: ["Next.js", "OpenAI", "Pinecone", "Postgres", "Vercel AI SDK"],
    image: makeArt(paletteE, 15),
    gradient: gradient(paletteE[0], paletteE[3]),
    color: "#c8a27a",
    link: "https://example.com",
    overview:
      "Lumen gives research teams a single workspace to chat with their own documents. I built the streaming pipeline and the interface around it.",
    challenge:
      "Streaming AI responses is easy; making them feel calm and controlled is not. The interface needed to handle long streams, citations and multi-threaded chats without ever feeling busy.",
    solution:
      "Token streaming via Server-Sent Events with optimistic UI, semantic search over a Pinecone index, and a carefully staged reveal system so responses feel considered.",
    results: [
      "1.2s median first-token latency",
      "92% of users return within 7 days",
      "14 languages supported out of the box",
    ],
    gallery: [makeArt(paletteE, 25), makeArt(paletteE, 35), makeArt(paletteE, 45)],
  },
  {
    slug: "terra-motion",
    name: "Terra Motion",
    tagline: "A kinetic playground exploring natural motion.",
    category: "Exploration",
    year: "2023",
    duration: "3 Weeks",
    role: "Creative Development, Prototyping",
    stack: ["Framer Motion", "TypeScript", "Three.js"],
    image: makeArt(paletteF, 16),
    gradient: gradient(paletteF[0], paletteF[3]),
    color: "#b3a99a",
    link: "https://example.com",
    overview:
      "A generative playground where natural forces — wind, gravity, friction — sculpt interfaces. A study in making software feel alive.",
    challenge:
      "Physics in the browser is easy to get wrong. The motion had to feel weighty and organic, never bouncy or cheap.",
    solution:
      "Custom spring configurations tuned per element, a lightweight physics ticker, and a restrained material palette that lets motion be the hero.",
    results: [
      "60fps at full complexity",
      "Physics config exposed as a public API",
      "Open-sourced under MIT",
    ],
    gallery: [makeArt(paletteF, 26), makeArt(paletteF, 36), makeArt(paletteF, 46)],
  },
];

export const projectCategories = ["All", "Real Project", "Exploration"];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export const services = [
  {
    id: "fullstack",
    title: "Full-Stack Dev",
    description:
      "End-to-end product engineering — from pixel-perfect React interfaces to scalable serverless backends, databases and deployment pipelines. Everything an ambitious product needs, under one roof.",
    visual: makeArt(paletteA, 51),
    tags: ["React", "Next.js", "Node", "Postgres"],
  },
  {
    id: "api",
    title: "API & Backend",
    description:
      "Designed-for-developers APIs with clean contracts, bulletproof auth, observability and performance budgets. I build backends that stay fast long after launch.",
    visual: makeArt(paletteB, 52),
    tags: ["REST", "GraphQL", "Auth", "Scaling"],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "High-end interface design with luxury-grade restraint — considered type, calm spacing and motion that feels physical. Interfaces your users will remember.",
    visual: makeArt(paletteC, 53),
    tags: ["Design Systems", "Motion", "Prototyping"],
  },
  {
    id: "creative",
    title: "Creative Development",
    description:
      "Interactive, generative and motion-driven experiences for brands that refuse to be ordinary. From kinetic landing pages to WebGL playgrounds.",
    visual: makeArt(paletteD, 54),
    tags: ["Framer Motion", "WebGL", "Creative"],
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
    summary:
      "Leading product builds for venture-backed startups — owning architecture, design systems and delivery from first commit to scale.",
    image: makeArt(paletteB, 61),
    highlights: ["Team lead of 6", "Design systems", "Performance"],
  },
  {
    company: "Northbeam Studio",
    role: "Full-Stack Developer",
    period: "2021 — 2023",
    summary:
      "Shipped high-end marketing sites and web apps for international brands, blending editorial design with headless commerce.",
    image: makeArt(paletteC, 62),
    highlights: ["Headless commerce", "Editorial design", "SEO"],
  },
  {
    company: "Freelance",
    role: "Independent Developer & Designer",
    period: "2019 — 2021",
    summary:
      "Partnered directly with founders and agencies to design, build and launch MVPs across e-commerce, SaaS and fintech.",
    image: makeArt(paletteD, 63),
    highlights: ["20+ shipped", "SaaS & fintech", "Direct client work"],
  },
  {
    company: "Pixel Forge",
    role: "Junior Frontend Developer",
    period: "2018 — 2019",
    summary:
      "Cut my teeth building responsive interfaces and animation systems for marketing teams, learning the craft of production code.",
    image: makeArt(paletteA, 64),
    highlights: ["Responsive UI", "Animation", "Craft"],
  },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hasaan.dev";

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
