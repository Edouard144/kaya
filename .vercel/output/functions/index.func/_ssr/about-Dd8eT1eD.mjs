import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
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
function About() {
  const steps = [{
    n: "01",
    title: "Browse the catalog",
    body: "Every product priced per unit, with bulk tiers shown up front. No quotes, no negotiation."
  }, {
    n: "02",
    title: "Order at scale",
    body: "Bulk pricing applies automatically as you increase quantity. Pay via card at checkout."
  }, {
    n: "03",
    title: "Delivered to your property",
    body: "Scheduled to your housekeeping window — pallets or single boxes, your call."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "About" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl", children: [
      "The supply room for ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-terracotta", children: "independent hotels" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: [
      "Provisto is the e-commerce arm of ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://kaya.rent", className: "underline", children: "kaya.rent" }),
      " — we source the linens, amenities and back-of-house essentials properties rely on, and ship them at scale without the friction of traditional wholesale."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-3", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl text-terracotta", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-2xl", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.body })
    ] }, s.n)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-4xl", children: "Ready to stock your property?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-muted-foreground", children: "Browse the catalog or create an account to track orders." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Browse supplies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "btn-ghost", children: "Create account" })
      ] })
    ] })
  ] });
}
export {
  About as component
};
