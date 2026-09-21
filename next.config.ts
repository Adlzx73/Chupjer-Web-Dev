import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keeps the bundle lean by tree-shaking the icon barrel.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
