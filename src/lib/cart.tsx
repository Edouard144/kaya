/**
 * Cart provider — backed by Shopify Cart API.
 * Keeps the same context shape so existing components don't break.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./shopify";
import {
  createCart as shopifyCreateCart,
  addToCart as shopifyAddToCart,
  updateCartLines as shopifyUpdateCart,
  removeFromCart as shopifyRemoveFromCart,
  getCart as shopifyGetCart,
  formatUSD,
  type CartData,
  type CartLine,
} from "./shopify";

export interface CartItem {
  productId: string; // lineId in Shopify
  name: string;
  image: string | null;
  quantity: number;
  product: Product;
  variantId: string;
  lineId: string;
}

interface CartCtx {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  checkoutUrl: string | null;
  loading: boolean;
}

const Ctx = createContext<CartCtx | null>(null);
const CART_ID_KEY = "kaya_shopify_cart_id";

function mapLineToItem(line: CartLine): CartItem {
  return {
    productId: line.id,
    name: line.variant.productTitle,
    image: line.variant.image,
    quantity: line.quantity,
    product: {
      id: line.variant.id,
      name: line.variant.productTitle,
      slug: line.variant.productHandle,
      description: "",
      image: line.variant.image,
      price: line.variant.price,
      stock: null,
      categoryId: null,
      pricingTiers: [],
      variants: [],
      handle: line.variant.productHandle,
    },
    variantId: line.variant.id,
    lineId: line.id,
  };
}

function syncCartState(
  data: CartData | null,
  setItems: (fn: any) => void,
  setCheckoutUrl: (url: string | null) => void,
) {
  if (!data) return;
  setItems(data.lines.map(mapLineToItem));
  setCheckoutUrl(data.checkoutUrl);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing cart on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(CART_ID_KEY);
    if (stored) {
      setCartId(stored);
      shopifyGetCart(stored)
        .then((data) => {
          if (data) syncCartState(data, setItems, setCheckoutUrl);
        })
        .catch(() => {
          window.localStorage.removeItem(CART_ID_KEY);
        });
    }
  }, []);

  const add = useCallback(
    async (product: Product, qty = 1) => {
      const variantId = product.variants?.[0]?.id;
      if (!variantId) {
        console.error("No variant found for product", product.name);
        return;
      }

      setLoading(true);
      try {
        let data: CartData | null;
        if (!cartId) {
          data = await shopifyCreateCart(variantId, qty);
          if (data) {
            setCartId(data.id);
            if (typeof window !== "undefined") {
              window.localStorage.setItem(CART_ID_KEY, data.id);
            }
          }
        } else {
          data = await shopifyAddToCart(cartId, variantId, qty);
        }
        syncCartState(data, setItems, setCheckoutUrl);
      } catch (e) {
        console.error("Failed to add to cart:", e);
      } finally {
        setLoading(false);
      }
    },
    [cartId],
  );

  const setQty = useCallback(
    async (lineId: string, qty: number) => {
      if (!cartId) return;
      setLoading(true);
      try {
        if (qty <= 0) {
          const data = await shopifyRemoveFromCart(cartId, [lineId]);
          syncCartState(data, setItems, setCheckoutUrl);
        } else {
          const data = await shopifyUpdateCart(cartId, lineId, qty);
          syncCartState(data, setItems, setCheckoutUrl);
        }
      } catch (e) {
        console.error("Failed to update cart:", e);
      } finally {
        setLoading(false);
      }
    },
    [cartId],
  );

  const remove = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setLoading(true);
      try {
        const data = await shopifyRemoveFromCart(cartId, [lineId]);
        syncCartState(data, setItems, setCheckoutUrl);
      } catch (e) {
        console.error("Failed to remove from cart:", e);
      } finally {
        setLoading(false);
      }
    },
    [cartId],
  );

  const clear = useCallback(async () => {
    // Remove all lines from Shopify cart before clearing local state
    if (cartId && items.length > 0) {
      try {
        const lineIds = items.map((i) => i.lineId);
        await shopifyRemoveFromCart(cartId, lineIds);
      } catch (e) {
        console.error("Failed to clear Shopify cart:", e);
      }
    }
    setItems([]);
    setCheckoutUrl(null);
    setCartId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CART_ID_KEY);
    }
  }, [cartId, items]);

  const { count, subtotal } = useMemo(() => {
    let c = 0,
      s = 0;
    for (const i of items) {
      c += i.quantity;
      s += parseFloat(i.product.price || "0") * i.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  return (
    <Ctx.Provider
      value={{ items, add, setQty, remove, clear, count, subtotal, checkoutUrl, loading }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside <CartProvider>");
  return v;
}
