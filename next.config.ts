import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile above this directory makes Next infer the wrong root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
