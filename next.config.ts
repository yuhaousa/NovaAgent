import type { NextConfig } from "next";

// Every screen is client-side demo state, so the whole app exports to static HTML
// and is served by Cloudflare Workers static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
