import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Orders, Payments, formatUSD } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Provisto" }] }),
  component: CheckoutPage,
});

const PK =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY) ||
  "";
const stripePromise = PK ? loadStripe(PK) : null;

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth", search: { redirect: "/checkout" } });
  }, [authLoading, user, navigate]);

  if (items.length === 0 && !orderId) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Nothing to check out</h1>
        <Link to="/products" className="btn-primary mt-6 inline-block">Browse supplies</Link>
      </div>
    );
  }

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return setErr("Add a delivery address.");
    setSubmitting(true);
    setErr(null);
    try {
      const order = await Orders.create({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        address: address.trim(),
      });
      setOrderId(order.id);
      const { clientSecret } = await Payments.createIntent(order.id);
      setClientSecret(clientSecret);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-5xl md:text-6xl">Checkout</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {!clientSecret ? (
            <form onSubmit={placeOrder} className="surface-card p-8">
              <h2 className="font-display text-2xl">Delivery address</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Property name, street, city, postal code, country.
              </p>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={5}
                placeholder="Hotel Bellavista&#10;42 Coastal Ave&#10;Lisbon, 1100-123&#10;Portugal"
                className="mt-4 w-full rounded-2xl border border-line bg-background p-4 text-sm outline-none focus:border-terracotta"
              />
              {err && <div className="mt-3 text-sm text-destructive">{err}</div>}
              <button disabled={submitting} className="btn-primary mt-6 w-full disabled:opacity-60">
                {submitting ? "Placing order…" : `Continue to payment · ${formatUSD(subtotal)}`}
              </button>
            </form>
          ) : !PK ? (
            <div className="surface-card p-8">
              <h2 className="font-display text-2xl">Payment</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Order <span className="font-mono">{orderId}</span> is created and awaiting payment.
              </p>
              <div className="mt-4 rounded-xl border border-line bg-peach-soft/40 p-4 text-sm">
                Stripe publishable key isn't configured yet. Add{" "}
                <code className="font-mono">VITE_STRIPE_PUBLISHABLE_KEY</code> as a build env var,
                then refresh to complete payment in-page.
              </div>
              <button
                onClick={() => { clear(); navigate({ to: "/account/orders" }); }}
                className="btn-ghost mt-6"
              >
                View my orders
              </button>
            </div>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "flat",
                  variables: {
                    colorPrimary: "#d97757",
                    colorBackground: "#fffaf3",
                    colorText: "#1a120e",
                    fontFamily: "Manrope, system-ui, sans-serif",
                    borderRadius: "12px",
                  },
                },
              }}
            >
              <StripeForm onPaid={() => { clear(); navigate({ to: "/account/orders" }); }} />
            </Elements>
          )}
        </div>

        <aside className="h-fit surface-card p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Order</div>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-2">
                <span className="truncate">{i.quantity} × {i.name}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t border-line" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Subtotal</span>
            <span className="font-display text-3xl">{formatUSD(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StripeForm({ onPaid }: { onPaid: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setErr(null);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setErr(error.message ?? "Payment failed");
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      toast.success("Payment confirmed");
      onPaid();
    } else {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="surface-card p-8">
      <h2 className="font-display text-2xl">Payment</h2>
      <p className="mt-1 text-sm text-muted-foreground">Secured by Stripe.</p>
      <div className="mt-6">
        <PaymentElement />
      </div>
      {err && <div className="mt-3 text-sm text-destructive">{err}</div>}
      <button disabled={!stripe || busy} className="btn-primary mt-6 w-full disabled:opacity-60">
        {busy ? "Confirming…" : "Pay now"}
      </button>
    </form>
  );
}

