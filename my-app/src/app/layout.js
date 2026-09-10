import { Geist, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Extra-bold geometric display font for giant headers
const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Secondary display font used for accents/watermarks
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Muhammad Hasaan — Full-Stack Web Developer",
  description:
    "Portfolio of Muhammad Hasaan, a full-stack web developer crafting high-end digital experiences. Selected work, services and experience.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "UI/UX",
    "Portfolio",
  ],
  openGraph: {
    title: "Muhammad Hasaan — Full-Stack Web Developer",
    description:
      "High-end digital experiences, engineered with care. Let's build something exceptional together.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {/* Subtle noise overlay texture over the whole page */}
        <div
          aria-hidden="true"
          className="pointer-events-none noise-overlay fixed inset-0 z-[100]"
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
