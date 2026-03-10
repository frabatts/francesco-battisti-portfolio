import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "10043",
        pathname: "/**",
      },
    ],
    // Disabilita ottimizzazione per localhost
    unoptimized: process.env.NODE_ENV === "development",
  },
  transpilePackages: ["three"],
};

export default nextConfig;