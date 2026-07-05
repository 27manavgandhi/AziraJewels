import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The card has no remote imagery — every visual is coded (SVG/CSS) or
  // generated at build time — so no remotePatterns are required.
  compress: true,
};

export default nextConfig;
