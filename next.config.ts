import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // <=== Enables static exports
  images: {
    unoptimized: true, // <=== Required for static export (unless using a cloud loader)
  },
  /* 
   * IF deploying to a sub-path (e.g. pratikngupta.github.io/portfolio), uncomment below:
   */
  basePath: "/portfolio",
};

export default nextConfig;
