import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static copy (in ./out) that can be hosted anywhere,
// with relative asset paths so it also works from a sub-folder.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  ...(isStaticExport ? { output: "export" as const, assetPrefix: "." } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
