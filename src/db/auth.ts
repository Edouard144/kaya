import { SignJWT, jwtVerify } from "jose";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const TOKEN_EXPIRY = "7d";

function getJwtSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "kaya-production-secret-change-in-production"
  );
}

function deriveKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, 64);
}

export async function hashPassword(password: string): Promise<string> {
  const str = typeof password === "string" ? password : String(password ?? "");
  if (!str) throw new Error("Password is required");
  const salt = randomBytes(16);
  const key = deriveKey(str, salt);
  return salt.toString("hex") + ":" + key.toString("hex");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const str = typeof password === "string" ? password : String(password ?? "");

  // New format: salt:key (scrypt)
  if (hash.includes(":")) {
    const [saltHex, keyHex] = hash.split(":");
    if (saltHex && keyHex) {
      const salt = Buffer.from(saltHex, "hex");
      const key = Buffer.from(keyHex, "hex");
      const derived = deriveKey(str, salt);
      return timingSafeEqual(key, derived);
    }
  }

  // Legacy bcryptjs format ($2a$ or $2b$)
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(str, hash);
  }

  return false;
}

export async function createToken(payload: { userId: string; email: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}
