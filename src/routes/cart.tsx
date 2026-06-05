import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatUSD, priceForQty } from "@/lib/api";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Provisto" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-terracotta" />
        <h1 className="mt-4 font-display text-5xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start browsing supplies for your property.</p>
        <Link to="/products" className="btn-primary mt-8 inline-block">Browse catalog</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-5xl md:text-6xl">Cart</h1>
      <p className="mt-2 text-muted-foreground">{count} item{count === 1 ? "" : "s"}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((i) => {
            const unit = priceForQty(i.product, i.quantity);
            return (
              <li key={i.productId} className="flex gap-4 py-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-peach-soft/40">
                  {i.image ? (
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-2xl text-terracotta/40">◆</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <Link to="/products/$id" params={{ id: i.productId }} className="font-display text-xl hover:underline">
                      {i.name}
                    </Link>
                    <button onClick={() => remove(i.productId)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-muted-foreground">{formatUSD(unit)} / unit</div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-line">
                      <button onClick={() => setQty(i.productId, i.quantity - 1)} className="grid h-9 w-9 place-items-center hover:bg-peach-soft/40 rounded-l-full">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{i.quantity}</span>
                      <button onClick={() => setQty(i.productId, i.quantity + 1)} className="grid h-9 w-9 place-items-center hover:bg-peach-soft/40 rounded-r-full">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="font-display text-xl">{formatUSD(unit * i.quantity)}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit surface-card p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Summary</div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatUSD(subtotal)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Calculated next</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>Calculated next</span></div>
          </div>
          <div className="my-4 border-t border-line" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
            <span className="font-display text-3xl">{formatUSD(subtotal)}</span>
          </div>
          <Link to="/checkout" className="btn-primary mt-6 block w-full text-center">Continue to checkout</Link>
          <Link to="/products" className="mt-3 block text-center text-sm text-muted-foreground hover:text-ink">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

