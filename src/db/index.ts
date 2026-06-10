import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzleNeon<typeof schema>> | ReturnType<typeof drizzlePg<typeof schema>> | null = null;

function isVercel(): boolean {
  return !!(process.env.VERCEL || process.env.VERCEL_ENV);
}

export function getDb() {
  if (!_db) {
    const databaseUrl = process.env.DATABASE_URL || "";
    if (!databaseUrl) {
      console.warn("DATABASE_URL is not set — database operations will fail.");
    } else {
      const host = databaseUrl.split("@")[1]?.split("/")[0] || "unknown";
      const mode = isVercel() ? "neon-http" : "pg-tcp";
      console.log(`[db] Connecting to: ${host} (mode: ${mode})`);
    }

    if (isVercel()) {
      const sql = neon(databaseUrl);
      _db = drizzleNeon(sql, { schema });
    } else {
      const pool = new Pool({
        connectionString: databaseUrl,
        ssl: databaseUrl.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined,
        max: 5,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 15000,
      });

      pool.on("error", (err) => {
        console.error("[db] Pool background error:", err.message);
      });

      pool.query("SELECT 1")
        .then(() => console.log("[db] Connection OK"))
        .catch((err) => console.error("[db] Connection FAILED:", err.message));

      _db = drizzlePg(pool, { schema });
    }
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzleNeon<typeof schema>> | ReturnType<typeof drizzlePg<typeof schema>>, {
  get(_, prop) {
    return (getDb() as any)[prop];
  },
});
