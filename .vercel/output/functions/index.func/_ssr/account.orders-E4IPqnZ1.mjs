import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useAuth, f as formatUSD, O as Orders } from "./router-hieTueYT.mjs";
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
import "../_libs/lucide-react.mjs";
const statusColor = {
  pending: "bg-peach-soft text-ink",
  paid: "bg-terracotta text-white",
  shipped: "bg-foreground text-background",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-line-strong text-muted-foreground"
};
function MyOrders() {
  const {
    user,
    loading,
    logout
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/account/orders"
      }
    });
  }, [loading, user, navigate]);
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["orders", "mine"],
    queryFn: () => Orders.list(),
    enabled: !!user
  });
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl md:text-6xl", children: "My orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
          "Hi ",
          user.name.split(" ")[0],
          " — here's everything you've placed."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: logout, className: "btn-ghost text-sm", children: "Sign out" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: "Couldn't load orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message })
    ] }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
      length: 3
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card h-24 animate-pulse bg-peach-soft/30" }, i)) }) : (data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl", children: "No orders yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Place your first order from the catalog." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary mt-6 inline-block", children: "Browse supplies" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: data.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl", children: [
            "Order #",
            o.id.slice(0, 8)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider " + statusColor[o.status], children: o.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm text-muted-foreground", children: [
          new Date(o.createdAt).toLocaleDateString(void 0, {
            dateStyle: "medium"
          }),
          o.items && ` · ${o.items.length} line item${o.items.length === 1 ? "" : "s"}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: formatUSD(Number(o.total)) })
    ] }, o.id)) }) })
  ] });
}
export {
  MyOrders as component
};
