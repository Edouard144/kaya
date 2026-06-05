import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as categories, s as seedProducts } from "./router-hieTueYT.mjs";
import "../_libs/sonner.mjs";
import { S as Search, f as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Catalog() {
  const [q, setQ] = reactExports.useState("");
  const filteredCats = reactExports.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(needle) || c.short.toLowerCase().includes(needle) || c.subcategories.some((s) => s.toLowerCase().includes(needle)));
  }, [q]);
  const filteredProducts = reactExports.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return seedProducts.filter((p) => p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle));
  }, [q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Catalog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl md:text-6xl", children: "Hotel supplies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: "22 categories, 500+ SKUs — search by item or browse by category." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-surface px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search towels, beds, lighting…", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
      ] })
    ] }),
    q && filteredProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Matching products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: filteredProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
        id: p.id
      }, className: "surface-card group overflow-hidden transition-transform hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-xs text-muted-foreground", children: p.description })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filteredCats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/category/$slug", params: {
      slug: c.slug
    }, className: "surface-card group overflow-hidden transition-transform hover:-translate-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[5/3] overflow-hidden bg-peach-soft/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.cover, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] opacity-85", children: c.short }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: c.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 max-w-sm text-sm text-muted-foreground", children: c.blurb }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-terracotta" })
      ] })
    ] }, c.slug)) })
  ] });
}
export {
  Catalog as component
};
