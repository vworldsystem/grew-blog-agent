import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/grew-blog-agent",
  assetPrefix: "/grew-blog-agent/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
};

export default nextConfig;
