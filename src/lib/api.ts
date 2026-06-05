// Provisto API client — pure browser fetch wrapper.
// Base URL is overridable via VITE_PROVISTO_API_URL for environments / mocks.

export const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_PROVISTO_API_URL) ||
  "https://provisto.onrender.com/api";

const TOKEN_KEY = "provisto_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
  query?: Record<string, string | number | undefined | null>;
  signal?: AbortSignal;
};

export async function api<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth, query, signal } = opts;
  const url = new URL(API_BASE + path);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    throw new ApiError(0, "Network error — could not reach Provisto API.", e);
  }
  const text = await res.text();
  const payload = text ? safeJson(text) : null;
  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && (payload as any).message) ||
      res.statusText ||
      `Request failed (${res.status})`;
    throw new ApiError(res.status, String(msg), payload);
  }
  return payload as T;
}

function safeJson(t: string) {
  try { return JSON.parse(t); } catch { return t; }
}

// ---- Types ----
export type Role = "customer" | "admin";
export interface User { id: string; name: string; email: string; role: Role; }
export interface AuthResponse { token: string; user: User; }

export interface PricingTier { minQty: number; maxQty: number | null; price: string; }
export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string | null;
  stock?: number;
  categoryId?: string | null;
  price?: string;
  pricingTiers?: PricingTier[];
}

export interface OrderItem { productId: string; quantity: number; unitPrice: string; name?: string; image?: string | null; }
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: string;
  address: string;
  stripePaymentId?: string;
  createdAt: string;
  items?: OrderItem[];
}

// ---- Endpoints ----
export const Auth = {
  register: (data: { name: string; email: string; password: string }) =>
    api<AuthResponse>("/auth/register", { method: "POST", body: data }),
  login: (data: { email: string; password: string }) =>
    api<AuthResponse>("/auth/login", { method: "POST", body: data }),
  me: () => api<User>("/auth/me", { auth: true }),
};

export type ProductInput = {
  name: string;
  description?: string;
  image?: string | null;
  stock?: number;
  categoryId?: string | null;
  price?: string;
  pricingTiers?: PricingTier[];
};

export const Products = {
  list: (params?: { search?: string; categoryId?: string }) =>
    api<Product[]>("/products", { query: params }),
  get: (id: string) => api<Product>(`/products/${id}`),
  create: (data: ProductInput) =>
    api<Product>("/products", { method: "POST", body: data, auth: true }),
  update: (id: string, data: Partial<ProductInput>) =>
    api<Product>(`/products/${id}`, { method: "PUT", body: data, auth: true }),
  remove: (id: string) =>
    api<{ success: boolean }>(`/products/${id}`, { method: "DELETE", auth: true }),
};

export const Orders = {
  list: () => api<Order[]>("/orders", { auth: true }),
  get: (id: string) => api<Order>(`/orders/${id}`, { auth: true }),
  create: (data: { items: { productId: string; quantity: number }[]; address: string }) =>
    api<Order>("/orders", { method: "POST", body: data, auth: true }),
  listAll: () => api<Order[]>("/orders/all", { auth: true }),
  updateStatus: (id: string, status: OrderStatus) =>
    api<Order>(`/orders/${id}/status`, { method: "PUT", body: { status }, auth: true }),
};

export const Payments = {
  createIntent: (orderId: string) =>
    api<{ clientSecret: string }>("/payments/create-intent", {
      method: "POST",
      body: { orderId },
      auth: true,
    }),
};

// ---- Helpers ----
export function priceForQty(product: Product, qty: number): number {
  if (product.pricingTiers && product.pricingTiers.length) {
    const t = product.pricingTiers.find(
      (tier) => qty >= tier.minQty && (tier.maxQty == null || qty <= tier.maxQty),
    );
    if (t) return Number(t.price);
  }
  return product.price ? Number(product.price) : 0;
}

export function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

