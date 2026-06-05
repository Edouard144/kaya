/**
 * Post-build script: restructures Nitro's dist/ output into
 * Vercel's Build Output API format under .vercel/output/
 *
 * Vercel Build Output API v3:
 *   .vercel/output/config.json
 *   .vercel/output/static/       → served as static files automatically
 *   .vercel/output/functions/index.func/  → serverless function
 *
 * Route order matters:
 *   1. Check filesystem (static/) first — if found, serve it
 *   2. Otherwise fall through to SSR function
 */

import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean previous output
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Copy static assets into .vercel/output/static/
//    dist/client/assets/* → .vercel/output/static/assets/*
const staticDir = join(out, "static");
mkdirSync(staticDir, { recursive: true });
cpSync(join(root, "dist", "client"), staticDir, { recursive: true });

// 2. Copy serverless function into .vercel/output/functions/index.func/
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

// 4. Write top-level config.json
//    - filesystem check MUST come before the catch-all SSR route
//    - this ensures /assets/styles.css is served from static/, not proxied to SSR
writeFileSync(
  join(out, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Phase 1: serve files from static/ if they exist (filesystem check)
      { handle: "filesystem" },
      // Phase 2: everything that didn't match a static file → SSR function
      { src: "/(.*)", dest: "/index" },
    ],
  }, null, 2)
);

console.log("✓ Vercel Build Output API structure created at .vercel/output/");
