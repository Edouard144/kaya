import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as featuredCategories, i as industries, p as projects, l as lobby, e as suite, g as bathroom, r as restaurant, h as pool, c as categories, s as seedProducts } from "./router-hieTueYT.mjs";
import "../_libs/sonner.mjs";
import { T as Truck, j as ShieldCheck, H as Hammer, k as Headset, A as ArrowUpRight, E as Earth, f as ArrowRight, l as ArrowLeft } from "../_libs/lucide-react.mjs";
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
const slides = [
  {
    eyebrow: "Reception & Lobby",
    title: "Set the tone from the",
    italic: "first step inside.",
    body: "Reception desks, lobby sofas, chandeliers and the small details that signal quality the moment a guest arrives.",
    ctaLabel: "See Reception & Lobby",
    ctaTo: "/category/reception-lobby",
    image: lobby
  },
  {
    eyebrow: "Guest Rooms",
    title: "Beds, linens and joinery,",
    italic: "specced for daily turnover.",
    body: "Hospitality-grade beds, wardrobes, sheets and towels — built to survive industrial laundering and years of guests.",
    ctaLabel: "Explore Guest Rooms",
    ctaTo: "/category/guest-room-furniture",
    image: suite
  },
  {
    eyebrow: "Bathroom Solutions",
    title: "Bathrooms that feel like",
    italic: "private spa retreats.",
    body: "Marble vanities, brass fixtures, freestanding tubs and amenity sets — supplied and installed.",
    ctaLabel: "See Bathroom Solutions",
    ctaTo: "/category/bathroom-solutions",
    image: bathroom
  },
  {
    eyebrow: "Restaurant & Kitchen",
    title: "Dining rooms ready for",
    italic: "service from day one.",
    body: "Tables, chairs, glassware, cutlery and commercial kitchen equipment — one supplier, one timeline.",
    ctaLabel: "Outfit your restaurant",
    ctaTo: "/category/restaurant-dining",
    image: restaurant
  },
  {
    eyebrow: "Outdoor & Pool",
    title: "Sun, water and",
    italic: "weather-proof comfort.",
    body: "Loungers, umbrellas, gazebos and pool equipment built to handle salt, sun and the back half of the season.",
    ctaLabel: "See Outdoor & Pool",
    ctaTo: "/category/outdoor-pool",
    image: pool
  }
];
function HeroCarousel() {
  const [i, setI] = reactExports.useState(0);
  const [auto, setAuto] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [auto]);
  const go = (n) => {
    setI((n + slides.length) % slides.length);
    setAuto(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pt-6 pb-10 md:pt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-[28px] border border-line/60 shadow-warm",
      onMouseEnter: () => setAuto(false),
      onMouseLeave: () => setAuto(true),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[640px] md:h-[680px]", children: slides.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-1000 " + (idx === i ? "opacity-100" : "opacity-0 pointer-events-none"),
            "aria-hidden": idx !== i,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: s.image,
                  alt: s.eyebrow,
                  className: "absolute inset-0 h-full w-full object-cover",
                  fetchPriority: idx === 0 ? "high" : "auto"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-background/85 via-background/40 to-background/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-full gap-10 p-7 md:grid-cols-12 md:p-14", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between md:col-span-7", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-soft backdrop-blur", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-terracotta" }),
                    s.eyebrow
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl leading-[0.95] md:text-7xl lg:text-[5.5rem]", children: [
                      s.title,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-terracotta", children: s.italic })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-base text-ink-soft md:text-lg", children: s.body }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: s.ctaTo, className: "btn-primary inline-flex items-center gap-2", children: [
                        s.ctaLabel,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quote", className: "btn-ghost", children: "Request a quote" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden flex-col justify-end md:col-span-5 md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: [
                    "Featured set · ",
                    String(idx + 1).padStart(2, "0"),
                    " of ",
                    String(slides.length).padStart(2, "0")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-2xl", children: s.eyebrow }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                    s.body.slice(0, 100),
                    "…"
                  ] })
                ] }) })
              ] })
            ]
          },
          idx
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 right-6 z-10 flex items-center gap-2 md:bottom-8 md:right-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => go(i - 1),
              "aria-label": "Previous slide",
              className: "grid h-12 w-12 place-items-center rounded-full border border-line bg-background/85 backdrop-blur transition-colors hover:bg-foreground hover:text-background",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => go(i + 1),
              "aria-label": "Next slide",
              className: "grid h-12 w-12 place-items-center rounded-full border border-line bg-background/85 backdrop-blur transition-colors hover:bg-foreground hover:text-background",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-7 z-10 flex items-center gap-1.5 md:left-14", children: slides.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => go(idx),
            "aria-label": `Slide ${idx + 1}`,
            className: "h-1.5 rounded-full transition-all " + (idx === i ? "w-10 bg-terracotta" : "w-5 bg-foreground/25 hover:bg-foreground/45")
          },
          idx
        )) })
      ]
    }
  ) });
}
function CategoryMarquee({ reverse = false }) {
  const list = [...categories, ...categories];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kaya-marquee group relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kaya-marquee-track flex gap-5 " + (reverse ? "kaya-marquee-reverse" : ""), children: list.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/category/$slug",
      params: { slug: c.slug },
      className: "surface-card group/card relative w-[300px] shrink-0 overflow-hidden transition-transform hover:-translate-y-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-peach-soft/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.cover, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover/card:scale-110" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] opacity-80", children: c.short }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: c.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" }) })
      ] })
    },
    c.slug + "-" + i
  )) }) });
}
function Home() {
  const products = seedProducts.slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card grid grid-cols-2 gap-2 p-4 md:grid-cols-4 md:p-6", children: [{
      icon: Truck,
      label: "Worldwide delivery",
      note: "Pallets to single boxes"
    }, {
      icon: ShieldCheck,
      label: "Hospitality grade",
      note: "Laundering & wear tested"
    }, {
      icon: Hammer,
      label: "Supply + install",
      note: "Single project timeline"
    }, {
      icon: Headset,
      label: "Dedicated rep",
      note: "One contact, full scope"
    }].map(({
      icon: Icon,
      label,
      note
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-peach-soft/70 text-terracotta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: note })
      ] })
    ] }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page mb-6 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Browse the catalog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Everything a hotel runs on" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-muted-foreground", children: "22 categories, from beds to building materials — sourced under one roof." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hidden text-sm text-terracotta hover:underline md:inline", children: "All categories →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryMarquee, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryMarquee, { reverse: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Featured collections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Start where your project starts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: featuredCategories.slice(0, 6).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: {
        slug: c.slug
      }, className: "surface-card group relative overflow-hidden " + (i === 0 ? "lg:row-span-2 lg:col-span-1" : ""), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden " + (i === 0 ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[5/4]"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.cover, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/15 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] opacity-85", children: c.short }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm opacity-85", children: c.blurb }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-background", children: [
            "Explore ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }) }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "From the catalog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Stocked & ready" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-sm text-terracotta hover:underline", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$id", params: {
        id: p.id
      }, className: "surface-card group overflow-hidden transition-transform hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-peach-soft/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-foreground/85 px-3 py-1 text-[11px] uppercase tracking-wider text-background", children: "Quote on request" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg leading-tight", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm text-muted-foreground", children: p.description })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card grid gap-10 p-10 md:grid-cols-12 md:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Who we serve" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Industries that trust Kaya" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "We've outfitted properties from city hotels to mountain lodges — boutique fit-outs through to flagship resort builds." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industries", className: "mt-6 inline-flex btn-primary text-sm", children: "See all industries →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: industries.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-line bg-background/60 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: i.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: i.desc })
      ] }, i.name)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Worldwide projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl md:text-5xl", children: "Properties we've delivered" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "text-sm text-terracotta hover:underline", children: "All projects →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card group overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: p.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-lg leading-snug", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: p.scope })
        ] })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Our partners" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl", children: "Brands & properties we work with" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: ["Radisson", "Marriott", "Wyndham", "Hilton", "IHG", "Accor"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card grid h-20 place-items-center font-display text-xl text-ink-soft", children: b }, b)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14", style: {
      backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-14 w-14 place-items-center rounded-full bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Outfitting a property?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-3xl md:text-4xl", children: "Tell us about your project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-muted-foreground", children: "Send your room count, location and timeline — we'll respond with a tailored quote inside 48 hours." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "btn-primary inline-flex items-center gap-2", children: [
          "Request quote ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-ghost", children: "Talk to sales" })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
