import type { NextConfig } from "next";

/**
 * Сборка под два адреса:
 *   npm run build         → превью на GitHub Pages (basePath /pg-lider)
 *   npm run build:domain  → боевой razdel-proekt.ru (без basePath)
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.SITE_BASE_PATH !== undefined ? process.env.SITE_BASE_PATH : isProd ? "/pg-lider" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://razdel-proekt.ru",
  },
};

export default nextConfig;
