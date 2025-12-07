import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // <=== Enables static exports
  images: {
    unoptimized: true, // <=== Required for static export (unless using a cloud loader)
  },
  /* 
   * Set basePath only for GitHub Pages deployment
   * This fixes local preview (npx serve out) by not enforcing the path locally
   */
  basePath: process.env.GITHUB_ACTIONS ? "/portfolio" : undefined,
};

export default nextConfig;
