import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword, createToken } from "@/db/auth";

export const login = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => ({
    email: String(data.email ?? ""),
    password: String(data.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const { email, password } = data;

    let user;
    try {
      user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    } catch (e) {
      console.error("DB query failed during login:", e);
      throw new Error("Database connection error — please try again");
    }

    if (user.length === 0) {
      throw new Error("Invalid email or password");
    }

    const valid = await verifyPassword(password, user[0].password);
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    const token = await createToken({
      userId: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    return {
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    };
  });

export const register = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; password: string }) => ({
    name: String(data?.name ?? ""),
    email: String(data?.email ?? ""),
    password: String(data?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const name = String(data?.name ?? "");
    const email = String(data?.email ?? "");
    const password = String(data?.password ?? "");
    if (!password) throw new Error("Password is required");

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      throw new Error("An account with this email already exists");
    }

    const hashed = await hashPassword(password);
    const result = await db.insert(users).values({ name, email, password: hashed }).returning();

    const token = await createToken({
      userId: result[0].id,
      email: result[0].email,
      role: result[0].role,
    });

    return {
      token,
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        role: result[0].role,
      },
    };
  });

export const getMe = createServerFn({ method: "GET" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const { verifyToken } = await import("@/db/auth");
    const payload = await verifyToken(data.token);
    if (!payload) throw new Error("Invalid token");

    const user = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    if (user.length === 0) throw new Error("User not found");

    return {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      role: user[0].role,
    };
  });

export const seedAdmin = createServerFn({ method: "POST" })
  .handler(async () => {
    const email = "Jamarja.off@gmail.com";
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      return { message: "Admin already exists", user: { id: existing[0].id, email: existing[0].email } };
    }

    const hashed = await hashPassword("Jamarja2006!");
    const result = await db.insert(users).values({
      name: "Jamarja Admin",
      email,
      password: hashed,
      role: "admin",
    }).returning();

    return { message: "Admin created", user: { id: result[0].id, email: result[0].email } };
  });
