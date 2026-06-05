/**
 * Post-build script: restructures Nitro's dist/ output into
 * Vercel's Build Output API v3 format under .vercel/output/
 *
 * Key points:
 * - Static files go into .vercel/output/static/ and are served by Vercel CDN automatically
 * - The SSR function is placed at functions/[[catchall]].func so it catches all unmatched paths
 * - { handle: "filesystem" } MUST come before the catch-all route so assets are served statically
 */

import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean previous output
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Copy static assets → .vercel/output/static/
//    dist/client/assets/* becomes accessible at /assets/*
const staticDir = join(out, "static");
mkdirSync(staticDir, { recursive: true });
cpSync(join(root, "dist", "client"), staticDir, { recursive: true });

// 2. Copy serverless function into [[catchall]].func
//    This name tells Vercel the function handles all paths
const funcDir = join(out, "functions", "[[catchall]].func");
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

// 4. Write top-level config.json
//    Phase 1: { handle: "filesystem" } → Vercel checks static/ first
//    Phase 2: any path not matched by a static file falls through to the SSR function
writeFileSync(
  join(out, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Serve static files (assets/, images, etc.) directly from CDN
      { handle: "filesystem" },
      // Everything else goes to the SSR function
      { src: "/(.*)", dest: "/[[catchall]]" },
    ],
  }, null, 2)
);

console.log("✓ Vercel Build Output API structure created at .vercel/output/");
console.log("  static/  →", join(out, "static"));
console.log("  function →", join(out, "functions", "[[catchall]].func"));
