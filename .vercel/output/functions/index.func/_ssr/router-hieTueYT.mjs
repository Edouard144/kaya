import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { H as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { S as Search, P as Phone, F as FileText, X, M as Menu, a as MapPin, b as Mail, D as Download, C as ChevronDown, c as Palette } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-h7dpYRlR.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const __vite_import_meta_env__ = {};
const API_BASE = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_PROVISTO_API_URL || "https://provisto.onrender.com/api";
const TOKEN_KEY = "provisto_token";
function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}
class ApiError extends Error {
  status;
  payload;
  constructor(status, message, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}
async function api(path, opts = {}) {
  const { method = "GET", body, auth, query, signal } = opts;
  const url = new URL(API_BASE + path);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== void 0 && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  const headers = {};
  if (body !== void 0) headers["Content-Type"] = "application/json";
  if (auth) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  let res;
  try {
    res = await fetch(url.toString(), {
      method,
      headers,
      body: body !== void 0 ? JSON.stringify(body) : void 0,
      signal
    });
  } catch (e) {
    throw new ApiError(0, "Network error — could not reach Provisto API.", e);
  }
  const text = await res.text();
  const payload = text ? safeJson(text) : null;
  if (!res.ok) {
    const msg = payload && typeof payload === "object" && payload.message || res.statusText || `Request failed (${res.status})`;
    throw new ApiError(res.status, String(msg), payload);
  }
  return payload;
}
function safeJson(t) {
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}
const Auth = {
  register: (data) => api("/auth/register", { method: "POST", body: data }),
  login: (data) => api("/auth/login", { method: "POST", body: data }),
  me: () => api("/auth/me", { auth: true })
};
const Products = {
  list: (params) => api("/products", { query: params }),
  get: (id) => api(`/products/${id}`),
  create: (data) => api("/products", { method: "POST", body: data, auth: true }),
  update: (id, data) => api(`/products/${id}`, { method: "PUT", body: data, auth: true }),
  remove: (id) => api(`/products/${id}`, { method: "DELETE", auth: true })
};
const Orders = {
  list: () => api("/orders", { auth: true }),
  get: (id) => api(`/orders/${id}`, { auth: true }),
  create: (data) => api("/orders", { method: "POST", body: data, auth: true }),
  listAll: () => api("/orders/all", { auth: true }),
  updateStatus: (id, status) => api(`/orders/${id}/status`, { method: "PUT", body: { status }, auth: true })
};
const Payments = {
  createIntent: (orderId) => api("/payments/create-intent", {
    method: "POST",
    body: { orderId },
    auth: true
  })
};
function priceForQty(product, qty) {
  if (product.pricingTiers && product.pricingTiers.length) {
    const t = product.pricingTiers.find(
      (tier) => qty >= tier.minQty && (tier.maxQty == null || qty <= tier.maxQty)
    );
    if (t) return Number(t.price);
  }
  return product.price ? Number(product.price) : 0;
}
function formatUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
const Ctx$1 = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const refresh = reactExports.useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const u = await Auth.me();
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    void refresh();
  }, [refresh]);
  const login = async (email, password) => {
    const r = await Auth.login({ email, password });
    setToken(r.token);
    setUser(r.user);
  };
  const register = async (name, email, password) => {
    const r = await Auth.register({ name, email, password });
    setToken(r.token);
    setUser(r.user);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx$1.Provider, { value: { user, loading, login, register, logout, refresh }, children });
}
function useAuth() {
  const v = reactExports.useContext(Ctx$1);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}
const Ctx = reactExports.createContext(null);
const KEY$1 = "provisto_cart_v1";
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(KEY$1);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY$1, JSON.stringify(items));
  }, [items]);
  const add = (product, qty = 1) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.productId === product.id);
      if (existing) {
        return cur.map(
          (i) => i.productId === product.id ? { ...i, quantity: i.quantity + qty, product } : i
        );
      }
      return [
        ...cur,
        { productId: product.id, name: product.name, image: product.image ?? null, quantity: qty, product }
      ];
    });
  };
  const setQty = (productId, qty) => {
    setItems(
      (cur) => qty <= 0 ? cur.filter((i) => i.productId !== productId) : cur.map((i) => i.productId === productId ? { ...i, quantity: qty } : i)
    );
  };
  const remove = (productId) => setItems((cur) => cur.filter((i) => i.productId !== productId));
  const clear = () => setItems([]);
  const { count, subtotal } = reactExports.useMemo(() => {
    let c = 0, s = 0;
    for (const i of items) {
      c += i.quantity;
      s += priceForQty(i.product, i.quantity) * i.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { items, add, setQty, remove, clear, count, subtotal }, children });
}
function useCart() {
  const v = reactExports.useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside <CartProvider>");
  return v;
}
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 leading-none " + className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        "aria-hidden": true,
        className: "grid h-9 w-9 place-items-center rounded-[12px] bg-foreground text-background shadow-sm",
        style: {
          backgroundImage: "linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-deep) 60%, var(--foreground) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4v16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 12 L18 4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 12 L18 20" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight", children: "kaya" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "-mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "Hotel Solutions" })
    ] })
  ] });
}
const THEMES = [
  { id: "warm", label: "Warm Clay", swatch: "#d97757" },
  { id: "noir", label: "Noir Gold", swatch: "#c9a84c" },
  { id: "ocean", label: "Deep Ocean", swatch: "#2d8a9e" },
  { id: "forest", label: "Forest", swatch: "#5a8a5c" }
];
const KEY = "kaya_theme";
function applyTheme(id) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(KEY, id);
  } catch {
  }
}
function useInitTheme() {
  reactExports.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) ?? "warm";
      applyTheme(saved);
    } catch {
    }
  }, []);
}
function ThemeSwitcher() {
  const [open, setOpen] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState("warm");
  reactExports.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) ?? "warm";
      setActive(saved);
    } catch {
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((v) => !v),
        "aria-label": "Change color theme",
        className: "flex h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-surface",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4 w-4" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 z-40 mt-2 w-56 rounded-2xl border border-line bg-surface p-3 shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Color theme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: THEMES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            applyTheme(t.id);
            setActive(t.id);
            setOpen(false);
          },
          className: "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-surface-alt " + (active === t.id ? "bg-surface-alt" : ""),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full border border-line/70", style: { background: t.swatch } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left", children: t.label }),
            active === t.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-terracotta", children: "●" })
          ]
        },
        t.id
      )) })
    ] })
  ] });
}
const lobby = "/assets/hero-lobby--j2G-nNb.jpg";
const suite = "/assets/hero-suite-BV8_EtJ-.jpg";
const bathroom = "/assets/hero-bathroom-Bv5C40Pn.jpg";
const restaurant = "/assets/hero-restaurant-BcAAFoqP.jpg";
const pool = "/assets/hero-pool-BnmqwV-p.jpg";
const linens = "/assets/hero-linens-fxIGv2hH.jpg";
const categories = [
  {
    slug: "guest-room-furniture",
    name: "Guest Room Furniture",
    short: "Beds, wardrobes, seating",
    blurb: "Hospitality-grade furniture engineered for daily use — beds, wardrobes, desks and seating that hold up to years of turnover.",
    cover: suite,
    featured: true,
    subcategories: ["Hotel Beds", "Mattresses", "Headboards", "Bedside Tables", "Wardrobes", "Desks", "Chairs", "Luggage Racks", "Sofas", "Coffee Tables", "TV Stands", "Mirrors"]
  },
  {
    slug: "bedding-linen",
    name: "Bedding & Linen",
    short: "Sheets, towels, robes",
    blurb: "Cotton-rich sheets, towels and robes specced for industrial laundering — soft on guests, tough through cycles.",
    cover: linens,
    featured: true,
    subcategories: ["Bed Sheets", "Pillow Cases", "Duvets", "Blankets", "Pillows", "Mattress Protectors", "Bed Runners", "Towels", "Bathrobes", "Slippers"]
  },
  {
    slug: "bathroom-solutions",
    name: "Bathroom Solutions",
    short: "Fixtures, fittings, amenities",
    blurb: "Sinks, tubs, showers, mirrors and the small details that finish a guest bathroom.",
    cover: bathroom,
    featured: true,
    subcategories: ["Bathroom Sinks", "Toilets", "Bathtubs", "Showers", "Bathroom Mirrors", "Soap Dispensers", "Towel Holders", "Hair Dryers", "Bathroom Accessories", "Hotel Toiletries"]
  },
  {
    slug: "restaurant-dining",
    name: "Restaurant & Dining",
    short: "Tabletop & service",
    blurb: "Dining tables, chairs, cutlery, glassware and serving — a complete F&B fit-out.",
    cover: restaurant,
    featured: true,
    subcategories: ["Dining Tables", "Dining Chairs", "Buffet Stations", "Serving Trolleys", "Cutlery", "Plates", "Glassware", "Cups & Mugs", "Food Warmers", "Menu Holders"]
  },
  {
    slug: "commercial-kitchen",
    name: "Commercial Kitchen",
    short: "Cooking, cold, prep",
    blurb: "Ovens, refrigeration, dishwashers and prep stations sized for hotel kitchen volume.",
    cover: restaurant,
    subcategories: ["Ovens", "Refrigerators", "Freezers", "Dishwashers", "Grills", "Deep Fryers", "Mixers", "Kitchen Utensils", "Storage Shelves", "Food Preparation Tables"]
  },
  {
    slug: "reception-lobby",
    name: "Reception & Lobby",
    short: "First impressions",
    blurb: "Reception desks, waiting sofas, lounge chairs and decorative pieces that set the tone on arrival.",
    cover: lobby,
    featured: true,
    subcategories: ["Reception Desks", "Waiting Sofas", "Lounge Chairs", "Coffee Tables", "Decorative Mirrors", "Display Cabinets", "Information Stands"]
  },
  {
    slug: "outdoor-pool",
    name: "Outdoor & Pool",
    short: "Loungers, umbrellas, gazebos",
    blurb: "Sun loungers, garden tables, gazebos and poolside furniture built for sun and water.",
    cover: pool,
    featured: true,
    subcategories: ["Garden Chairs", "Garden Tables", "Sun Loungers", "Umbrellas", "Gazebos", "Outdoor Sofas", "Poolside Furniture"]
  },
  {
    slug: "lighting-decoration",
    name: "Lighting & Decoration",
    short: "Chandeliers, decor, art",
    blurb: "Chandeliers, pendant lights and the soft furnishings that shape the atmosphere of every space.",
    cover: lobby,
    featured: true,
    subcategories: ["Chandeliers", "Pendant Lights", "Wall Lights", "Ceiling Lights", "Outdoor Lights", "Garden Lights", "Emergency Lights", "Curtains", "Blinds", "Carpets", "Rugs", "Wall Art", "Decorative Plants", "Vases", "Clocks"]
  },
  {
    slug: "security-smart",
    name: "Security & Smart Hotel",
    short: "CCTV, locks, automation",
    blurb: "CCTV, smart locks, key-card systems, fire safety and room automation — the invisible layer guests trust.",
    cover: suite,
    featured: true,
    subcategories: ["CCTV Cameras", "Access Control Systems", "Hotel Key Cards", "Smart Locks", "Fire Alarm Systems", "Smoke Detectors", "Safes", "Smart Room Controls", "Digital Door Locks", "Hotel Management Systems", "Self Check-In Kiosks", "Smart Lighting", "Energy Management Systems"]
  },
  {
    slug: "housekeeping-laundry",
    name: "Housekeeping & Laundry",
    short: "Carts, machines, consumables",
    blurb: "Industrial washers and dryers, housekeeping trolleys, chemicals and the consumables that keep rooms turning.",
    cover: linens,
    featured: true,
    subcategories: ["Washing Machines", "Dryers", "Ironing Equipment", "Laundry Trolleys", "Linen Storage", "Vacuum Cleaners", "Cleaning Chemicals", "Housekeeping Trolleys", "Dustbins", "Mops", "Cleaning Tools", "Tissue Papers", "Toilet Papers", "Soap", "Shampoo", "Conditioner", "Disposable Items"]
  },
  {
    slug: "hvac",
    name: "HVAC & Ventilation",
    short: "Climate & air",
    blurb: "Air conditioning, ventilation, purification and heating sized for hospitality buildings.",
    cover: lobby,
    subcategories: ["Air Conditioners", "Fans", "Ventilation Systems", "Air Purifiers", "Heating Systems"]
  },
  {
    slug: "conference-events",
    name: "Conference & Events",
    short: "Meeting & stage",
    blurb: "Conference furniture, AV equipment, stage and sound to outfit ballrooms and meeting halls.",
    cover: restaurant,
    subcategories: ["Conference Tables", "Meeting Chairs", "Projectors", "Screens", "Sound Systems", "Podiums", "Stage Equipment"]
  },
  {
    slug: "hotel-electronics",
    name: "Hotel Electronics",
    short: "TVs, safes, telephony",
    blurb: "Smart TVs, in-room safes, mini fridges, kettles and Wi-Fi gear, ready for room-by-room rollout.",
    cover: suite,
    subcategories: ["Smart TVs", "Telephones", "Mini Fridges", "Room Safes", "Kettles", "Wi-Fi Equipment"]
  },
  {
    slug: "flooring-finishing",
    name: "Flooring & Finishing",
    short: "Tiles, marble, wood",
    blurb: "Marble, granite, tile, vinyl and wall panels for full property fit-outs.",
    cover: lobby,
    subcategories: ["Tiles", "Marble", "Granite", "Wooden Flooring", "Vinyl Flooring", "Carpets", "Wall Panels"]
  },
  {
    slug: "doors-windows",
    name: "Doors & Windows",
    short: "Security, sliding, glass",
    blurb: "Security doors, sliding systems, glazing and door hardware.",
    cover: lobby,
    subcategories: ["Wooden Doors", "Glass Doors", "Security Doors", "Sliding Doors", "Windows", "Window Accessories"]
  },
  {
    slug: "construction-renovation",
    name: "Construction & Renovation",
    short: "Building materials",
    blurb: "Cement, steel, paint, plumbing and electrical materials for new builds and refurbishments.",
    cover: pool,
    subcategories: ["Roofing Materials", "Exterior Paints", "Fencing", "Gates", "Paving Blocks", "Landscaping Materials", "Cement", "Bricks", "Steel", "Paint", "Glass", "Ceiling Materials", "Plumbing Materials", "Electrical Materials"]
  },
  {
    slug: "swimming-pool",
    name: "Swimming Pool Equipment",
    short: "Pumps, filters, lighting",
    blurb: "Pumps, filtration, lighting and cleaning gear for pools and spas.",
    cover: pool,
    subcategories: ["Pool Pumps", "Pool Filters", "Pool Furniture", "Pool Cleaning Equipment", "Pool Lighting"]
  }
];
const featuredCategories = categories.filter((c) => c.featured);
const industries = [
  { name: "Hotels", desc: "Boutique to flagship — full property fit-outs." },
  { name: "Resorts", desc: "Pool, beach and grounds, plus rooms." },
  { name: "Serviced Apartments", desc: "Move-in-ready packages per unit." },
  { name: "Restaurants", desc: "Kitchen, dining and service equipment." },
  { name: "Hospitals", desc: "Furniture and consumables at scale." },
  { name: "Schools", desc: "Dorm, classroom and dining furniture." },
  { name: "Offices", desc: "Reception, lounge and meeting spaces." }
];
const projects = [
  { title: "Tbilisi Boutique Hotel · 84 rooms", location: "Tbilisi, Georgia", image: lobby, scope: "Full fit-out — furniture, linen, bath, lighting." },
  { title: "Black Sea Resort · 220 rooms", location: "Batumi, Georgia", image: pool, scope: "Outdoor, pool, FF&E and amenities." },
  { title: "Kazbegi Mountain Lodge", location: "Stepantsminda, Georgia", image: suite, scope: "Guest rooms, lobby, restaurant supply." },
  { title: "Old Town Serviced Apartments", location: "Tbilisi, Georgia", image: restaurant, scope: "48 units, kitchenettes and linens." }
];
const seedProducts = [
  { id: "p-bed-king", name: "Hospitality King Bed", category: "guest-room-furniture", image: suite, description: "Solid-frame king bed with upholstered headboard, built for daily turnover." },
  { id: "p-wardrobe", name: "Open Suite Wardrobe", category: "guest-room-furniture", image: suite, description: "Walnut-finish open wardrobe with luggage shelf and hanging rail." },
  { id: "p-desk-walnut", name: "Walnut Writing Desk", category: "guest-room-furniture", image: suite, description: "Compact desk with cable port and integrated power." },
  { id: "p-armchair", name: "Lounge Reading Chair", category: "guest-room-furniture", image: lobby, description: "Linen-upholstered reading chair with hardwood frame." },
  { id: "p-sheet-king", name: "300TC Sateen Sheet Set", category: "bedding-linen", image: linens, description: "Long-staple cotton sateen, hospitality-laundering rated." },
  { id: "p-towel-bath", name: "600gsm Bath Towel", category: "bedding-linen", image: linens, description: "Heavyweight Egyptian cotton, ring-spun for plush hand." },
  { id: "p-robe-waffle", name: "Waffle Bathrobe", category: "bedding-linen", image: linens, description: "Lightweight waffle weave with kimono collar and tie belt." },
  { id: "p-duvet-king", name: "All-Season King Duvet", category: "bedding-linen", image: linens, description: "Microfibre fill with cotton shell, machine washable." },
  { id: "p-bath-tub", name: "Freestanding Marble Tub", category: "bathroom-solutions", image: bathroom, description: "Polished freestanding tub with brass mixer support." },
  { id: "p-rain-shower", name: "Rain Shower System", category: "bathroom-solutions", image: bathroom, description: "Brushed-brass overhead rain head with handheld diverter." },
  { id: "p-mirror-led", name: "Backlit Vanity Mirror", category: "bathroom-solutions", image: bathroom, description: "LED-backlit mirror with anti-fog and touch dimmer." },
  { id: "p-amenity-set", name: "Amenity Bottle Set", category: "bathroom-solutions", image: bathroom, description: "Shampoo, conditioner and body wash refillable bottles." },
  { id: "p-dining-table", name: "Restaurant Dining Table", category: "restaurant-dining", image: restaurant, description: "Solid oak top with wrought-iron base, seats 4." },
  { id: "p-glass-wine", name: "Crystal Wine Glasses", category: "restaurant-dining", image: restaurant, description: "Lead-free crystal, dishwasher safe — case of 24." },
  { id: "p-plate-set", name: "Porcelain Plate Set", category: "restaurant-dining", image: restaurant, description: "Banquet-grade porcelain, chip-resistant rim." },
  { id: "p-buffet-station", name: "Buffet Warming Station", category: "restaurant-dining", image: restaurant, description: "Twin-bay chafing station with adjustable thermostat." },
  { id: "p-reception-desk", name: "Marble Reception Desk", category: "reception-lobby", image: lobby, description: "Custom-length marble front desk with cable management." },
  { id: "p-lobby-sofa", name: "Modular Lobby Sofa", category: "reception-lobby", image: lobby, description: "3-seat modular sofa in performance velvet." },
  { id: "p-lounge-chair", name: "Brass Lounge Chair", category: "reception-lobby", image: lobby, description: "Mid-century lounge chair with brushed brass frame." },
  { id: "p-pool-lounger", name: "Aluminium Sun Lounger", category: "outdoor-pool", image: pool, description: "Powder-coated aluminium frame with weave sling." },
  { id: "p-pool-umbrella", name: "Cantilever Pool Umbrella", category: "outdoor-pool", image: pool, description: "3m cantilever umbrella with crank tilt." },
  { id: "p-outdoor-sofa", name: "Teak Outdoor Sofa", category: "outdoor-pool", image: pool, description: "FSC teak sofa with quick-dry foam cushions." },
  { id: "p-chandelier", name: "Crystal Lobby Chandelier", category: "lighting-decoration", image: lobby, description: "Multi-tier crystal chandelier for double-height lobbies." },
  { id: "p-pendant-brass", name: "Brushed Brass Pendant", category: "lighting-decoration", image: lobby, description: "Smoked-glass pendant with brushed-brass canopy." },
  { id: "p-carpet-runner", name: "Corridor Carpet Runner", category: "lighting-decoration", image: lobby, description: "Custom-woven carpet runner, hospitality stain rating." },
  { id: "p-smart-lock", name: "RFID Smart Lock", category: "security-smart", image: suite, description: "Card and mobile-key enabled lock with audit trail." },
  { id: "p-cctv-dome", name: "Dome CCTV Camera", category: "security-smart", image: suite, description: "4K dome with night vision and onboard storage." },
  { id: "p-room-safe", name: "In-Room Electronic Safe", category: "security-smart", image: suite, description: "Laptop-size safe with audit log and override key." },
  { id: "p-washer-25kg", name: "25kg Industrial Washer", category: "housekeeping-laundry", image: linens, description: "Soft-mount industrial washer with automatic dosing." },
  { id: "p-hk-trolley", name: "Housekeeping Trolley", category: "housekeeping-laundry", image: linens, description: "Aluminium frame trolley with sorting bags and linen shelves." },
  { id: "p-vacuum-pro", name: "Commercial Backpack Vacuum", category: "housekeeping-laundry", image: linens, description: "HEPA-filtered backpack vacuum for fast room turns." }
];
function productsByCategory(slug) {
  return seedProducts.filter((p) => p.category === slug);
}
function productBySlug(id) {
  return seedProducts.find((p) => p.id === id);
}
const INDUSTRIES = ["Hotels", "Resorts", "Serviced Apartments", "Restaurants", "Hospitals", "Schools", "Offices"];
const SERVICES = ["Supply", "Installation", "Interior Design", "Hotel Setup Consultation", "Maintenance"];
function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = reactExports.useState(null);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const { count } = useCart();
  reactExports.useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [path]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-line/60 bg-background/85 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden border-b border-line/40 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex h-9 items-center justify-between text-[12px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍 Tbilisi, Georgia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🚚 Worldwide delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🏨 Trusted by 80+ properties" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+995000000000", className: "hover:text-ink", children: "+995 000 000 000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@kaya.rent", className: "hover:text-ink", children: "hello@kaya.rent" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex h-20 items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "ml-6 hidden items-center gap-1 lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/", active: path === "/", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownTrigger, { label: "Products", open: open === "products", onToggle: () => setOpen(open === "products" ? null : "products") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownTrigger, { label: "Industries", open: open === "industries", onToggle: () => setOpen(open === "industries" ? null : "industries") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/projects", active: path.startsWith("/projects"), children: "Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownTrigger, { label: "Services", open: open === "services", onToggle: () => setOpen(open === "services" ? null : "services") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/about", active: path.startsWith("/about"), children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/contact", active: path.startsWith("/contact"), children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hidden h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-surface md:flex", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeSwitcher, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+995000000000", className: "hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm hover:bg-surface md:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
          " Call"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "hidden h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-ink-soft md:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " Request Quote",
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-semibold text-white", children: count })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen((v) => !v), className: "flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden", "aria-label": "Menu", children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" }) })
      ] })
    ] }),
    open === "products" && /* @__PURE__ */ jsxRuntimeExports.jsxs(MegaPanel, { onClose: () => setOpen(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-x-10 gap-y-3 md:grid-cols-3 lg:grid-cols-4", children: categories.slice(0, 12).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: c.slug }, className: "font-display text-base text-ink hover:text-terracotta", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 space-y-0.5", children: c.subcategories.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-[13px] text-muted-foreground hover:text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: c.slug }, children: s }) }, s)) })
      ] }, c.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-line pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "22 categories · 500+ SKUs across the catalog." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary text-sm", children: "View all products →" })
      ] })
    ] }),
    open === "industries" && /* @__PURE__ */ jsxRuntimeExports.jsx(MegaPanel, { onClose: () => setOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-3 lg:grid-cols-4", children: INDUSTRIES.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/industries", className: "surface-card flex items-center gap-3 p-4 hover:-translate-y-0.5 transition-transform", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-peach-soft/70 grid place-items-center text-terracotta font-display", children: "◆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: i })
    ] }, i)) }) }),
    open === "services" && /* @__PURE__ */ jsxRuntimeExports.jsx(MegaPanel, { onClose: () => setOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: SERVICES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "surface-card flex items-start gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 h-2 w-2 rounded-full bg-terracotta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "End-to-end delivery by Kaya teams." })
      ] })
    ] }, s)) }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-line bg-surface lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page space-y-1 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/products", children: "All Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer px-2 py-2 text-sm font-medium", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 mt-1 space-y-1", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: c.slug }, className: "block rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-surface-alt", children: c.name }, c.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/industries", children: "Industries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/projects", children: "Projects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/services", children: "Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/about", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/contact", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "mt-3 block w-full rounded-full bg-foreground py-3 text-center text-sm font-medium text-background", children: [
        "Request Quote ",
        count > 0 && `(${count})`
      ] })
    ] }) })
  ] });
}
function NavLink({ to, active, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "rounded-full px-3 py-2 text-sm transition-colors " + (active ? "bg-surface text-ink font-medium" : "text-ink-soft hover:bg-surface"), children });
}
function DropdownTrigger({ label, open, onToggle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggle, className: "flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors " + (open ? "bg-surface text-ink font-medium" : "text-ink-soft hover:bg-surface"), children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 transition-transform " + (open ? "rotate-180" : "") })
  ] });
}
function MegaPanel({ children, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 z-40 border-y border-line bg-background shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page py-8", children }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, "aria-label": "Close menu", className: "fixed inset-0 top-20 z-30 cursor-default bg-foreground/10 backdrop-blur-[2px]" })
  ] });
}
function MobileLink({ to, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "block rounded-lg px-2 py-2 text-sm font-medium hover:bg-surface-alt", children });
}
function Footer() {
  const cats = categories.slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-line/60 bg-surface-alt", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid gap-10 py-16 md:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-muted-foreground", children: "Kaya is a complete hotel solutions partner. From a single linen order to a 200-room fit-out — sourced, delivered and installed across Georgia and beyond." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-ink-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-terracotta" }),
            " Tbilisi, Georgia"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+995000000000", className: "flex items-center gap-2 text-ink-soft hover:text-terracotta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-terracotta" }),
            " +995 000 000 000"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hello@kaya.rent", className: "flex items-center gap-2 text-ink-soft hover:text-terracotta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-terracotta" }),
            " hello@kaya.rent"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quote", className: "btn-primary inline-flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " Request quote"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "btn-ghost inline-flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " Catalog PDF"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
          cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$slug", params: { slug: c.slug }, className: "text-ink-soft hover:text-terracotta", children: c.name }) }, c.slug)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-terracotta hover:underline", children: "View all →" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "text-ink-soft hover:text-terracotta", children: "About Kaya" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "text-ink-soft hover:text-terracotta", children: "Projects" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industries", className: "text-ink-soft hover:text-terracotta", children: "Industries" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "text-ink-soft hover:text-terracotta", children: "Services" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-ink-soft hover:text-terracotta", children: "Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Stay in touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "New collections, project case studies and seasonal lookbooks — no spam." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "you@hotel.com", className: "field flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary text-sm", children: "Subscribe" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-line px-2.5 py-1", children: "WhatsApp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-line px-2.5 py-1", children: "Instagram" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-line px-2.5 py-1", children: "LinkedIn" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex flex-col gap-2 border-t border-line/60 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Kaya Hotel Solutions. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-ink", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-ink", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://kaya.rent", className: "hover:text-ink", children: "kaya.rent" })
      ] })
    ] })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-8xl text-terracotta", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "That route doesn't exist. Let's get you back to the catalog." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Browse supplies" })
    ] })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Something went sideways" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message || "Try again, or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "btn-primary",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-ghost", children: "Go home" })
    ] })
  ] }) });
}
const Route$g = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kaya — Hotel Solutions, end to end" },
      { name: "description", content: "Kaya supplies, installs and outfits hotels worldwide — furniture, linens, bathroom, kitchen, lighting, security and more. Request a free quote." },
      { property: "og:title", content: "Kaya — Hotel Solutions, end to end" },
      { property: "og:description", content: "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kaya — Hotel Solutions, end to end" },
      { name: "twitter:description", content: "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner." }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$g.useRouteContext();
  useInitTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MegaNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toaster,
      {
        position: "top-center",
        toastOptions: {
          style: {
            background: "var(--surface)",
            color: "var(--foreground)",
            border: "1px solid var(--line)",
            borderRadius: "14px"
          }
        }
      }
    )
  ] }) }) });
}
const $$splitComponentImporter$f = () => import("./services-LBBgzCL_.mjs");
const Route$f = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services — Kaya Hotel Solutions"
    }, {
      name: "description",
      content: "Kaya delivers end-to-end hotel services: supply, installation, interior design, project consultation and ongoing maintenance — all from one partner."
    }, {
      property: "og:title",
      content: "Services — Kaya Hotel Solutions"
    }, {
      property: "og:description",
      content: "Supply, installation, interior design, consultation and maintenance — everything a hotel project needs, under one roof."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./quote-Bmxru_Qj.mjs");
const Route$e = createFileRoute("/quote")({
  head: () => ({
    meta: [{
      title: "Request a Quote — Kaya"
    }, {
      name: "description",
      content: "Tell us about your hotel project — Kaya responds with a tailored quote within 48 hours."
    }, {
      property: "og:title",
      content: "Request a Quote — Kaya"
    }, {
      property: "og:description",
      content: "Tailored hospitality supply quotes within 48 hours."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./projects-Tq1x_85p.mjs");
const Route$d = createFileRoute("/projects")({
  head: () => ({
    meta: [{
      title: "Projects — Kaya"
    }, {
      name: "description",
      content: "Hotels, resorts and apartment projects outfitted by Kaya across Georgia and beyond."
    }, {
      property: "og:title",
      content: "Projects — Kaya"
    }, {
      property: "og:description",
      content: "A selection of properties we've delivered — from boutique hotels to flagship resorts."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./products-yJ02Dc8H.mjs");
const Route$c = createFileRoute("/products")({
  head: () => ({
    meta: [{
      title: "All Products — Kaya"
    }, {
      name: "description",
      content: "Explore every category Kaya supplies for hotels — furniture, linens, bathroom, kitchen, lighting, security and more."
    }, {
      property: "og:title",
      content: "All Products — Kaya"
    }, {
      property: "og:description",
      content: "Every category Kaya supplies for hotels and hospitality projects."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./industries-C9VBE3kh.mjs");
const Route$b = createFileRoute("/industries")({
  head: () => ({
    meta: [{
      title: "Industries — Kaya"
    }, {
      name: "description",
      content: "Kaya supplies hotels, resorts, serviced apartments, restaurants, hospitals, schools and offices worldwide."
    }, {
      property: "og:title",
      content: "Industries — Kaya"
    }, {
      property: "og:description",
      content: "Hotels, resorts, apartments, restaurants, hospitals, schools, offices — all outfitted by Kaya."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./contact-BAG4qRx4.mjs");
const Route$a = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Kaya"
    }, {
      name: "description",
      content: "Reach Kaya — Tbilisi-based hotel solutions supplier serving Georgia and worldwide."
    }, {
      property: "og:title",
      content: "Contact — Kaya"
    }, {
      property: "og:description",
      content: "Reach Kaya's hospitality team — quotes within 48 hours."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./checkout-EuruV3bk.mjs");
const Route$9 = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — Provisto"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./cart-DR0U4sa9.mjs");
const Route$8 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Cart — Provisto"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./auth-B_Scm2i2.mjs");
const Route$7 = createFileRoute("/auth")({
  validateSearch: (s) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/"
  }),
  head: () => ({
    meta: [{
      title: "Sign in — Provisto"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin-Dnzk7N6n.mjs");
const Route$6 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Provisto"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./about-Dd8eT1eD.mjs");
const Route$5 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Provisto by Kaya"
    }, {
      name: "description",
      content: "Provisto is the hotel-supply arm of kaya.rent — sourcing linens, amenities and operations essentials for properties."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-C2AtMbe8.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Kaya — Hotel Solutions, end to end"
    }, {
      name: "description",
      content: "Kaya supplies, installs and outfits hotels worldwide — furniture, linens, bathroom, kitchen, lighting, security and more. Request a free quote."
    }, {
      property: "og:title",
      content: "Kaya — Hotel Solutions, end to end"
    }, {
      property: "og:description",
      content: "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./products._id-DKygmihY.mjs");
const Route$3 = createFileRoute("/products/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Product ${params.id} — Provisto`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./product._id-CwdaHPAf.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./product._id--D9wpqGQ.mjs");
const Route$2 = createFileRoute("/product/$id")({
  head: ({
    params
  }) => {
    const p = productBySlug(params.id);
    return {
      meta: [{
        title: p ? `${p.name} — Kaya` : "Product — Kaya"
      }, {
        name: "description",
        content: p?.description ?? "Hotel supply by Kaya."
      }, {
        property: "og:title",
        content: p ? `${p.name} — Kaya` : "Product — Kaya"
      }, {
        property: "og:description",
        content: p?.description ?? "Hotel supply by Kaya."
      }, ...p ? [{
        property: "og:image",
        content: p.image
      }] : []]
    };
  },
  loader: ({
    params
  }) => {
    const product = productBySlug(params.id);
    if (!product) throw notFound();
    const category = categories.find((c) => c.slug === product.category);
    return {
      product,
      category
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./category._slug-CHm3g_g-.mjs");
const $$splitNotFoundComponentImporter = () => import("./category._slug-CSxjRotx.mjs");
const Route$1 = createFileRoute("/category/$slug")({
  head: ({
    params
  }) => {
    const c = categories.find((x) => x.slug === params.slug);
    return {
      meta: [{
        title: c ? `${c.name} — Kaya` : "Category — Kaya"
      }, {
        name: "description",
        content: c?.blurb ?? "Hotel supply category by Kaya."
      }, {
        property: "og:title",
        content: c ? `${c.name} — Kaya` : "Category — Kaya"
      }, {
        property: "og:description",
        content: c?.blurb ?? "Hotel supply category by Kaya."
      }, ...c ? [{
        property: "og:image",
        content: c.cover
      }] : []]
    };
  },
  loader: ({
    params
  }) => {
    const c = categories.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return {
      category: c
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./account.orders-E4IPqnZ1.mjs");
const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [{
      title: "My orders — Provisto"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ServicesRoute = Route$f.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$g
});
const QuoteRoute = Route$e.update({
  id: "/quote",
  path: "/quote",
  getParentRoute: () => Route$g
});
const ProjectsRoute = Route$d.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$g
});
const ProductsRoute = Route$c.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => Route$g
});
const IndustriesRoute = Route$b.update({
  id: "/industries",
  path: "/industries",
  getParentRoute: () => Route$g
});
const ContactRoute = Route$a.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$g
});
const CheckoutRoute = Route$9.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$g
});
const CartRoute = Route$8.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$g
});
const AuthRoute = Route$7.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$g
});
const AdminRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$g
});
const AboutRoute = Route$5.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$g
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const ProductsIdRoute = Route$3.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ProductsRoute
});
const ProductIdRoute = Route$2.update({
  id: "/product/$id",
  path: "/product/$id",
  getParentRoute: () => Route$g
});
const CategorySlugRoute = Route$1.update({
  id: "/category/$slug",
  path: "/category/$slug",
  getParentRoute: () => Route$g
});
const AccountOrdersRoute = Route.update({
  id: "/account/orders",
  path: "/account/orders",
  getParentRoute: () => Route$g
});
const ProductsRouteChildren = {
  ProductsIdRoute
};
const ProductsRouteWithChildren = ProductsRoute._addFileChildren(
  ProductsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  AuthRoute,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  IndustriesRoute,
  ProductsRoute: ProductsRouteWithChildren,
  ProjectsRoute,
  QuoteRoute,
  ServicesRoute,
  AccountOrdersRoute,
  CategorySlugRoute,
  ProductIdRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Orders as O,
  Payments as P,
  Route$7 as R,
  useAuth as a,
  priceForQty as b,
  categories as c,
  Products as d,
  suite as e,
  formatUSD as f,
  bathroom as g,
  pool as h,
  industries as i,
  featuredCategories as j,
  Route$3 as k,
  lobby as l,
  Route$2 as m,
  Route$1 as n,
  productsByCategory as o,
  projects as p,
  router as q,
  restaurant as r,
  seedProducts as s,
  useCart as u
};
