import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { k as Route$3, u as useCart, b as priceForQty, f as formatUSD, d as Products } from "./router-hieTueYT.mjs";
import { l as ArrowLeft, m as Check, h as Minus, i as Plus } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
function ProductDetail() {
  const {
    id
  } = Route$3.useParams();
  const [qty, setQty] = reactExports.useState(1);
  const {
    add
  } = useCart();
  const {
    data: product,
    isLoading,
    error
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => Products.get(id)
  });
  const unit = reactExports.useMemo(() => product ? priceForQty(product, qty) : 0, [product, qty]);
  const total = unit * qty;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] animate-pulse rounded-3xl bg-peach-soft/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-2/3 animate-pulse rounded bg-peach-soft/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full animate-pulse rounded bg-peach-soft/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-5/6 animate-pulse rounded bg-peach-soft/40" })
      ] })
    ] }) });
  }
  if (error || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: error?.message ?? "It may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary mt-6 inline-block", children: "Back to catalog" })
    ] });
  }
  const onAdd = () => {
    add(product, qty);
    toast.success(`Added ${qty} × ${product.name} to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-10 md:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to catalog"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[28px] border border-line bg-peach-soft/40 shadow-card", children: product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, className: "aspect-[4/5] w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-[4/5] w-full items-center justify-center font-display text-8xl text-terracotta/40", children: "◆" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Hotel supply" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl md:text-6xl leading-[1.05]", children: product.name }),
        product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl", children: formatUSD(unit) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "per unit · qty ",
            qty
          ] })
        ] }),
        product.pricingTiers && product.pricingTiers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card mt-6 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-line px-5 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground", children: "Bulk pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-line", children: product.pricingTiers.map((t, i) => {
            const active = qty >= t.minQty && (t.maxQty == null || qty <= t.maxQty);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between px-5 py-3 text-sm transition-colors " + (active ? "bg-peach-soft/40 font-medium" : ""), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-terracotta" }),
                t.minQty,
                t.maxQty ? `–${t.maxQty}` : "+",
                " units"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: formatUSD(Number(t.price)) })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-full border border-line bg-surface", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "grid h-12 w-12 place-items-center rounded-l-full hover:bg-peach-soft/40", "aria-label": "Decrease quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: qty, onChange: (e) => setQty(Math.max(1, Number(e.target.value) || 1)), className: "h-12 w-20 bg-transparent text-center font-medium outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => q + 1), className: "grid h-12 w-12 place-items-center rounded-r-full hover:bg-peach-soft/40", "aria-label": "Increase quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onAdd, className: "btn-primary h-12 px-6", children: [
            "Add to cart · ",
            formatUSD(total)
          ] })
        ] }),
        typeof product.stock === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: product.stock > 0 ? `${product.stock} in stock` : "Out of stock — backorder available" })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as component
};
