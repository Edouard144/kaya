import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as MapPin, P as Phone, b as Mail } from "../_libs/lucide-react.mjs";
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Contact" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl", children: "Let's talk about your project" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Send us a note and we'll respond within one business day. For urgent quotes, call or WhatsApp directly." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-terracotta" }),
        " Tbilisi, Georgia"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+995000000000", className: "flex items-center gap-3 hover:text-terracotta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-terracotta" }),
        " +995 000 000 000"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hello@kaya.rent", className: "flex items-center gap-3 hover:text-terracotta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-terracotta" }),
        " hello@kaya.rent"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "surface-card space-y-4 p-6", onSubmit: (e) => {
    e.preventDefault();
    alert("Thanks — we'll be in touch.");
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Your name", className: "field", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Property / company", className: "field" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Email", className: "field", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Phone", className: "field" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "How can we help?", className: "field min-h-[140px]", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary w-full", children: "Send message" })
  ] })
] }) });
export {
  SplitComponent as component
};
