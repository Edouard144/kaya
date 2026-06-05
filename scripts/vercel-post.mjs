/**
 * Post-build script: restructures Nitro's dist/ output into
 * Vercel's Build Output API format under .vercel/output/
 *
 * Expected Nitro output:
 *   dist/client/   → static assets
 *   dist/server/   → serverless function (index.mjs + deps)
 *
 * Vercel Build Output API:
 *   .vercel/output/config.json
 *   .vercel/output/static/       → served as-is
 *   .vercel/output/functions/index.func/  → serverless function
 */

import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean previous output
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Copy static assets
const staticDir = join(out, "static");
mkdirSync(staticDir, { recursive: true });
cpSync(join(root, "dist", "client"), staticDir, { recursive: true });

// 2. Copy serverless function
const funcDir = join(out, "functions", "index.func");
mkdirSync(funcDir, { recursive: true });
cpSync(join(root, "dist", "server"), funcDir, { recursive: true });

// 3. Write .vc-config.json for the function
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify({
    handler: "index.mjs",
    runtime: "nodejs20.x",
    launcherType: "Nodejs",
    shouldAddHelpers: false,
    supportsResponseStreaming: true,
  }, null, 2)
);

// 4. Write top-level config.json with catch-all route
writeFileSync(
  join(out, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Serve static assets directly
      {
        src: "^/assets/(.*)$",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      // Everything else → SSR function
      { src: "/(.*)", dest: "/index" },
    ],
  }, null, 2)
);

console.log("✓ Vercel Build Output API structure created at .vercel/output/");
