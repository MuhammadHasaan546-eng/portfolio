# MASTER PROMPT — Muhammad Hasaan · Luxury Developer Portfolio

> Copy the block below into your AI builder (Roo / Cursor / Claude / v0) to generate,
> extend, or rebuild this portfolio exactly as it exists in this repo.

---

## ROLE

You are a senior design engineer building a **high-end, luxury agency-style personal
portfolio** for a Full-Stack Web Developer. Prioritise restraint, typography, generous
whitespace, disciplined motion and a strict z-index contract. Every section must feel
intentional — no stock-bootstrap look, no clutter.

## THE SUBJECT

- **Name:** Muhammad Hasaan
- **Role:** Full-Stack Web Developer
- **Location:** Charsadda, Pakistan (works worldwide)
- **Experience:** **2+ years**
- **Email:** muhammadhassanweb@gmail.com
- **GitHub:** https://github.com/MuhammadHasaan546-eng
- **LinkedIn:** https://www.linkedin.com/in/muhammad-hasaan-609a282a6/
- **Status:** Available for New Projects
- **Tagline:** “Crafting high-end digital experiences with obsession over detail.”

## TECH STACK (portfolio itself)

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS 4 (`@import "tailwindcss"`, `@theme inline` design tokens)
- Framer Motion (`motion`, `AnimatePresence`, `useScroll`, `useSpring`)
- Lenis smooth scrolling (`lenis/react` → `ReactLenis root`)
- lucide-react icons, `next/image`
- `babel-plugin-react-compiler` enabled (`reactCompiler: true`)
- **Lint rule:** NEVER call `setState` inside `useEffect`. For client-only values
  (year, media queries, pointer type) use `useSyncExternalStore` with a stable
  server snapshot instead.

## DESIGN SYSTEM

- **Palette:** background `#f4f4f0`, ink `#111111`, surface `#ffffff`,
  champagne accent `#e6e1d6`, obsidian `#111111`.
- **Type:** Display = Archivo Black (`.font-display`), body/UI = Space Grotesk
  (`.font-grotesk`), system sans for prose.
- **Radius:** large (`rounded-3xl`) for cards, pill (`rounded-full`) for tags/buttons.
- **Motion:** ease curve `[0.16, 1, 0.3, 1]`; durations 0.45–0.8s; in-view once.
- **Z-INDEX CONTRACT (strict):**
  - decorative backgrounds → `z-0` + `pointer-events-none`
  - section content → `z-10`
  - header, contact modal, mobile nav → `z-50`
  - custom cursor + noise overlay → `z-[100]`–`z-[200]`
- **Hydration safety:** `suppressHydrationWarning` on `<html>` and `<body>`.
- **Accessibility:** decorative art is `aria-hidden`; all links have labels.

## GLOBAL BEHAVIOUR

1. **Smooth scroll** — Lenis root wrapper, `duration: 1.2`, `smoothWheel/smoothTouch`,
   anchor links enabled. Remove native `scroll-behavior: smooth`.
2. **Custom cursor** — spring-following ring + dot, `mix-blend-difference`, no native
   cursor on `(pointer: fine)` devices, expands with an “OPEN” label over interactive
   elements.
3. **Animated grid lines** — decorative SVG/CSS hairline grid with `scaleY: 0 → 1`
   accent lines, beam pulses and glowing intersection dots; `light` and `dark` variants.
4. **Noise overlay** — subtle fixed grain at low opacity.

## SECTION SPEC (single-page, in order)

1. **Header (floating, `z-50`)** — pill nav with backdrop blur; logo “HASAAN”;
   center links: Work / Services / Skills / Experience / Contact; a live
   “Available for New Projects” badge; “Let’s Talk ↗” CTA to `#contact`;
   animated mobile dropdown.
2. **Hero** — oversized “DEVELOPER” watermark behind content (`z-0`), left column
   (intro badge, headline, bio, CTAs), center portrait card, right social rail.
   Uses `profile.totalExperienceYears` (“2+”).
3. **Selected Work** — filter tabs (All / AI Apps / E-Commerce / Web Platforms) with a
   Framer `layoutId` pill, responsive two-column grid of `ProjectCard`s. Each card is a
   **direct external link** to the live site (`target="_blank"`, `rel="noopener noreferrer"`).
4. **Services** — hover-driven accordion (3 services) that inverts to dark on open,
   with a floating preview image and tech tags.
5. **Skills** — scrolling marquee of the full tech list + grouped skill cards.
6. **Experience** — dark (`#111111`) timeline with `kind` badges
   (Work / Workshop / Open Source) and a cursor-following preview tooltip.
7. **CTA / Footer** — “HAVE A PROJECT IN MIND?”, copy-to-clipboard email, “Contact Me”
   modal (`z-50`, Esc to close, body scroll lock, mailto submit), and the footer.
   Year rendered via `useSyncExternalStore` (server snapshot = 2025).

## PROJECTS (real work)

| Project | Category | Live URL | Preview image |
|---|---|---|---|
| **Lume.ai** — AI-native website builder | AI Apps | https://lume-ai-xi.vercel.app/ | `/projects/lume-ai.png` |
| **Luro AI** — AI social-media/content engine | AI Apps | https://luro-ai-five.vercel.app/ | `/projects/luro-ai.png` |
| **Kokhan E-Commerce** — full-stack store | E-Commerce | https://kokhan.vercel.app/ | `/projects/kokhan-ecommerce.png` |

Each project object contains: `slug, name, tagline, category, type, year, duration,
role, stack[], image, gradient, color, link, overview, challenge, solution, results[],
gallery[]`. Galleries lead with the real screenshot and add Unsplash stock imagery
(host `images.unsplash.com` allow-listed in `next.config.mjs`).

## SKILLS (show these)

- **Frontend:** Next.js, React, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5 & CSS3
- **Backend & APIs:** Node.js, Express.js, MERN Stack, REST APIs, GraphQL, Webhooks
- **Databases & Auth:** MongoDB, Mongoose, PostgreSQL, Firebase Auth, JWT, Passport.js, NextAuth.js
- **State Management:** Redux Toolkit, TanStack Query, Context API, Zustand
- **Caching, Queues & Realtime:** Redis, BullMQ, Upstash, Socket.IO, Cron Jobs
- **Animation & 3D:** Framer Motion, GSAP, Three.js, Lenis
- **Tooling & DevOps:** Git & GitHub, Vercel, Docker, Postman, Cloudinary, Stripe, Nodemailer
- **AI Integration:** OpenAI API, Streaming Responses, Prompt Engineering, Vector Search

## DATA ARCHITECTURE

All content lives in **`src/data/portfolio.js`** and is imported by components:
`profile`, `navLinks`, `projects`, `projectCategories`, `skillGroups`, `services`,
`experience`, `siteUrl`, `getProject(slug)`. Placeholder artwork is generated by a
deterministic `makeArt(colors, seed)` SVG data-URI helper — **all `#` must be encoded to
`%23` and spaces to `%20`** or the image truncates.

## NON-NEGOTIABLE RULES

1. Strict z-index contract — decorative art never sits above content.
2. Every external link opens in a new tab with `rel="noopener noreferrer"`.
3. No `setState` in effects (React Compiler lint) — use `useSyncExternalStore`.
4. `suppressHydrationWarning` on `html`/`body`; deterministic server snapshots.
5. Text contrast: `text-neutral-700/800/900` on light surfaces; white/opacity on dark.
6. `next/image` for every image; real screenshots for heroes, stock only in galleries.
7. Build and lint must pass clean (`npm run build && npm run lint`) before finishing.

## DELIVERABLE

A production-ready, deployment-safe Next.js portfolio with the sections above, wired to
`src/data/portfolio.js`, passing build + lint with zero errors, and advertising **2+
years** of experience consistently across the hero and experience sections.
