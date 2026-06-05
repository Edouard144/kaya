import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./api";
import { priceForQty } from "./api";

export interface CartItem {
  productId: string;
  name: string;
  image?: string | null;
  quantity: number;
  product: Product; // keep snapshot for tier lookup
}

interface CartCtx {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "provisto_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (product, qty = 1) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.productId === product.id);
      if (existing) {
        return cur.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + qty, product } : i,
        );
      }
      return [
        ...cur,
        { productId: product.id, name: product.name, image: product.image ?? null, quantity: qty, product },
      ];
    });
  };
  const setQty: CartCtx["setQty"] = (productId, qty) => {
    setItems((cur) =>
      qty <= 0
        ? cur.filter((i) => i.productId !== productId)
        : cur.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
    );
  };
  const remove: CartCtx["remove"] = (productId) =>
    setItems((cur) => cur.filter((i) => i.productId !== productId));
  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    let c = 0, s = 0;
    for (const i of items) {
      c += i.quantity;
      s += priceForQty(i.product, i.quantity) * i.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, add, setQty, remove, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside <CartProvider>");
  return v;
}

