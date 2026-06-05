import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-hieTueYT.mjs";
import "../_libs/sonner.mjs";
import { e as CircleCheck } from "../_libs/lucide-react.mjs";
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
function QuotePage() {
  const {
    items,
    clear
  } = useCart();
  const [sent, setSent] = reactExports.useState(false);
  if (sent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-terracotta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl", children: "Quote request received" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-md text-muted-foreground", children: "Thanks — a member of our team will be in touch within 48 hours with a tailored quote." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-primary mt-6 inline-flex", children: "Back to home" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Request a quote" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl md:text-6xl", children: "Tell us about your project" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: "Share a few details and we'll respond within 48 hours with a tailored proposal — no obligation." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      setSent(true);
      clear();
    }, className: "mt-10 grid gap-10 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card space-y-4 p-6 md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "field", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company / property", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "field", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: "field", required: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "field" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country / city", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "field", placeholder: "Tbilisi, Georgia" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Number of rooms / units", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: "field", placeholder: "80" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "field", defaultValue: "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "New build hotel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Renovation / refurbishment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Single-category supply" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Restaurant / F&B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Categories of interest", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "field min-h-[80px]", placeholder: "e.g. Guest rooms, bathroom, lighting" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project details / timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "field min-h-[140px]", required: true, placeholder: "Tell us scope, target opening date, anything important…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary w-full", children: "Send quote request" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "In your shortlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-2xl", children: [
            items.length,
            " item",
            items.length === 1 ? "" : "s"
          ] }),
          items.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
            items.slice(0, 6).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-terracotta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: i.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
                "×",
                i.quantity
              ] })
            ] }, i.productId)),
            items.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground", children: [
              "+ ",
              items.length - 6,
              " more"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You can also build a shortlist from product pages — items appear here automatically." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-5 text-sm text-ink-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: "What happens next" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-3 list-decimal space-y-1.5 pl-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We review your project" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A rep reaches out inside 48 hrs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You receive a tailored quote" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-terracotta", children: "*" })
    ] }),
    children
  ] });
}
export {
  QuotePage as component
};
