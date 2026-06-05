import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as Route$2 } from "./router-hieTueYT.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lucide-react.mjs";
function ProductPage() {
  const {
    product: p,
    category
  } = Route$2.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-ink", children: "Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      category && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: {
          slug: category.slug
        }, className: "hover:text-ink", children: category.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ink-soft", children: p.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-peach-soft/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, className: "h-full w-full object-cover" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        category && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: category.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl leading-tight", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-ink-soft", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card mt-6 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Available on quote. Volume tiers are tailored to your order size — typically priced for 10+, 50+, and 200+ units." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quote", className: "btn-primary", children: "Request a quote" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-ghost", children: "Talk to sales" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 space-y-2 text-sm text-ink-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Hospitality-grade specification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Worldwide delivery from our Tbilisi warehouse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Installation and project management available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Volume discounts on bulk orders" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductPage as component
};
