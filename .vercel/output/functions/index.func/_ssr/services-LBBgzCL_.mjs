import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as ArrowUpRight, T as Truck, H as Hammer, c as Palette, d as ClipboardList, W as Wrench, e as CircleCheck, f as ArrowRight } from "../_libs/lucide-react.mjs";
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
const services = [{
  icon: Truck,
  id: "supply",
  label: "01",
  title: "Supply & Procurement",
  tagline: "22 categories. 500+ SKUs. One order.",
  body: "We source hospitality-grade furniture, linens, bathroom fixtures, kitchen equipment, lighting, security systems and more — tested for commercial durability and delivered to your property anywhere in the world.",
  features: ["Full catalog of 22 product categories", "Volume pricing from 10 to 10,000+ units", "Worldwide delivery — pallets or single boxes", "Pre-shipment quality inspection", "Consolidated freight from multiple suppliers"],
  cta: "Browse the catalog",
  ctaTo: "/products"
}, {
  icon: Hammer,
  id: "installation",
  label: "02",
  title: "Installation",
  tagline: "Delivered, assembled, room-ready.",
  body: "Our installation crews work room by room to your housekeeping schedule — furniture assembly, fixture fitting, soft furnishing placement and final snagging. We hand over every space complete.",
  features: ["Furniture assembly and joinery fitting", "Bathroom and kitchen fixture installation", "Lighting and electrical coordination", "Carpeting, flooring and wall panel installation", "Site manager on every project"],
  cta: "Request a quote",
  ctaTo: "/quote"
}, {
  icon: Palette,
  id: "design",
  label: "03",
  title: "Interior Design",
  tagline: "From concept board to completed room.",
  body: "Our design team produces mood boards, material selections, FF&E schedules and space plans — then sources every item directly from the Kaya catalog so there's no gap between the design and delivery.",
  features: ["Concept development and mood boarding", "Material and finish selection", "FF&E schedule production", "Space planning and 3D visualisation", "Design-to-supply handoff in one team"],
  cta: "Talk to our design team",
  ctaTo: "/contact"
}, {
  icon: ClipboardList,
  id: "consultation",
  label: "04",
  title: "Hotel Setup Consultation",
  tagline: "End-to-end project management.",
  body: "Opening a hotel is a multi-track project. Our consultants manage the supply timeline alongside your construction schedule — coordinating deliveries, managing snagging lists and making sure the soft opening goes smoothly.",
  features: ["Pre-opening supply timeline planning", "Budget modelling and value engineering", "Supplier and logistics coordination", "Snagging and defect management", "Dedicated project manager, one point of contact"],
  cta: "Schedule a consultation",
  ctaTo: "/quote"
}, {
  icon: Wrench,
  id: "maintenance",
  label: "05",
  title: "Maintenance & Replenishment",
  tagline: "Keep every room up to standard.",
  body: "After opening day, properties need ongoing replenishment — mattresses, linens, amenities, broken fixtures. We run scheduled maintenance visits and hold fast-replenishment stock for properties on retainer.",
  features: ["Scheduled linen and amenity replenishment", "Furniture repair and replacement", "Annual FF&E audit", "Priority lead times for retainer clients", "Dedicated account manager"],
  cta: "Talk to us",
  ctaTo: "/contact"
}];
const process = [{
  n: "01",
  title: "Tell us about your project",
  body: "Fill in the quote form — room count, location, timeline and the categories you need. Takes under 5 minutes."
}, {
  n: "02",
  title: "We send a tailored proposal",
  body: "Within 48 hours a member of the Kaya team responds with a full scope, product selection and indicative budget."
}, {
  n: "03",
  title: "Approve and we get to work",
  body: "Once you approve, we lock in production and logistics slots. A project manager tracks everything to handover."
}];
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-10 pt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "What we do" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-6xl leading-[0.95] md:text-7xl lg:text-8xl", children: [
        "One partner.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-terracotta", children: "Every service." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: "From sourcing a single linen order to managing a full 200-room hotel fit-out — Kaya handles supply, installation, design and maintenance so you have one contract, one contact, one timeline." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "btn-primary inline-flex items-center gap-2", children: [
          "Start a project ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-ghost", children: "Talk to sales" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: services.map((s, idx) => {
      const Icon = s.icon;
      const isEven = idx % 2 === 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: s.id, className: "surface-card grid gap-8 overflow-hidden p-8 md:grid-cols-12 md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:col-span-4 ${isEven ? "md:order-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-peach-soft/70 text-terracotta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl text-terracotta/30", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: s.tagline })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `md:col-span-8 ${isEven ? "md:order-1" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: s.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid gap-2 sm:grid-cols-2", children: s.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-terracotta" }),
            f
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: s.ctaTo, className: "mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:underline", children: [
            s.cta,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }, s.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-10 md:p-14", style: {
      backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 60%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Three steps from brief to handover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-8 md:grid-cols-3", children: process.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl text-terracotta", children: p.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-2xl", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.body })
      ] }, p.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-4xl", children: "Ready to start your project?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-muted-foreground", children: "Send us your room count, location and timeline. We'll respond within 48 hours with a full proposal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "btn-primary inline-flex items-center gap-2", children: [
          "Request a quote ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-ghost", children: "Talk to us" })
      ] })
    ] }) })
  ] });
}
export {
  ServicesPage as component
};
