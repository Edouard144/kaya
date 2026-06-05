import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { E as Elements, u as useStripe, a as useElements, P as PaymentElement } from "../_libs/stripe__react-stripe-js.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useCart, a as useAuth, f as formatUSD, O as Orders, P as Payments } from "./router-hieTueYT.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lucide-react.mjs";
const __vite_import_meta_env__ = {};
const PK = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = PK ? loadStripe(PK) : null;
function CheckoutPage() {
  const {
    items,
    subtotal,
    clear
  } = useCart();
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = reactExports.useState("");
  const [orderId, setOrderId] = reactExports.useState(null);
  const [clientSecret, setClientSecret] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!authLoading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/checkout"
      }
    });
  }, [authLoading, user, navigate]);
  if (items.length === 0 && !orderId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Nothing to check out" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary mt-6 inline-block", children: "Browse supplies" })
    ] });
  }
  const placeOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return setErr("Add a delivery address.");
    setSubmitting(true);
    setErr(null);
    try {
      const order = await Orders.create({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity
        })),
        address: address.trim()
      });
      setOrderId(order.id);
      const {
        clientSecret: clientSecret2
      } = await Payments.createIntent(order.id);
      setClientSecret(clientSecret2);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: !clientSecret ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: placeOrder, className: "surface-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Delivery address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Property name, street, city, postal code, country." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: address, onChange: (e) => setAddress(e.target.value), rows: 5, placeholder: "Hotel Bellavista\n42 Coastal Ave\nLisbon, 1100-123\nPortugal", className: "mt-4 w-full rounded-2xl border border-line bg-background p-4 text-sm outline-none focus:border-terracotta" }),
        err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-destructive", children: err }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: submitting, className: "btn-primary mt-6 w-full disabled:opacity-60", children: submitting ? "Placing order…" : `Continue to payment · ${formatUSD(subtotal)}` })
      ] }) : !PK ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Order ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: orderId }),
          " is created and awaiting payment."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-line bg-peach-soft/40 p-4 text-sm", children: [
          "Stripe publishable key isn't configured yet. Add",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: "VITE_STRIPE_PUBLISHABLE_KEY" }),
          " as a build env var, then refresh to complete payment in-page."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          clear();
          navigate({
            to: "/account/orders"
          });
        }, className: "btn-ghost mt-6", children: "View my orders" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Elements, { stripe: stripePromise, options: {
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#d97757",
            colorBackground: "#fffaf3",
            colorText: "#1a120e",
            fontFamily: "Manrope, system-ui, sans-serif",
            borderRadius: "12px"
          }
        }
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StripeForm, { onPaid: () => {
        clear();
        navigate({
          to: "/account/orders"
        });
      } }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit surface-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3 text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          i.quantity,
          " × ",
          i.name
        ] }) }, i.productId)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t border-line" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm uppercase tracking-wider text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl", children: formatUSD(subtotal) })
        ] })
      ] })
    ] })
  ] });
}
function StripeForm({
  onPaid
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setErr(null);
    const {
      error,
      paymentIntent
    } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "surface-card p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Payment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Secured by Stripe." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentElement, {}) }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !stripe || busy, className: "btn-primary mt-6 w-full disabled:opacity-60", children: busy ? "Confirming…" : "Pay now" })
  ] });
}
export {
  CheckoutPage as component
};
