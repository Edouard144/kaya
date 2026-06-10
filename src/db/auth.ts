import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const TOKEN_EXPIRY = "7d";

function getJwtSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "kaya-production-secret-change-in-production"
  );
}

export async function hashPassword(password: string): Promise<string> {
  const str = String(password ?? "");
  if (!str) throw new Error("Password is required");
  return bcrypt.hash(str, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(String(password ?? ""), hash);
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
