/**
 * API client — backed by server functions and Shopify Storefront API.
 */
export { formatUSD, priceForQty, type Product, type Collection, mapProduct, mapCollection } from "./shopify";

const TOKEN_KEY = "kaya_auth_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  createdAt: string;
  items?: { name: string }[];
  total: string;
  status: OrderStatus;
}

export const Orders = {
  list: async (): Promise<Order[]> => {
    return [];
  },
};
