import type { NextConfig } from "next";
import { BASE_PATH } from "./src/config/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
