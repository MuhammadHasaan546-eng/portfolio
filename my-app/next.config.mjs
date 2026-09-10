/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allow remote image sources (Unsplash placeholders, Vercel previews, etc.)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "**.vercel.sh" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
    // Local SVG data-URIs (generated artwork) render without the optimizer,
    // so they stay crisp and dependency-free.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
