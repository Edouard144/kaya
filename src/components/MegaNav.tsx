import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Phone,
  Search,
  Menu,
  X,
  FileText,
  Building2,
  Bed,
  HeartPulse,
  Briefcase,
  Palmtree,
  Truck,
  Paintbrush,
  Wrench,
  ClipboardList,
  Star,
  User,
  Package,
} from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { categories } from "@/data/catalog";
import { useAuth } from "@/lib/auth";

const INDUSTRIES = [
  { name: "Hotels", desc: "Boutique to flagship full fit-outs", icon: Building2 },
  { name: "Resorts", desc: "Pool, beach, grounds and rooms", icon: Palmtree },
  { name: "Serviced Apartments", desc: "Move-in-ready packages per unit", icon: Bed },
  { name: "Hospitals", desc: "Furniture and consumables at scale", icon: HeartPulse },
  { name: "Offices", desc: "Reception, lounge and meeting", icon: Briefcase },
];

const SERVICES = [
  { name: "Supply", desc: "Sourcing and delivery of any SKU, worldwide", icon: Truck },
  { name: "Installation", desc: "On-site setup and commissioning by our teams", icon: Wrench },
  { name: "Interior Design", desc: "Concept to specification for every space", icon: Paintbrush },
  {
    name: "Hotel Setup Consultation",
    desc: "Pre-opening planning and procurement guidance",
    icon: ClipboardList,
  },
  { name: "Maintenance", desc: "Scheduled servicing and replacement programmes", icon: Star },
];

type MenuKey = "products" | "industries" | "services";

export function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on navigation
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [path]);

  // Detect scroll — use hysteresis to prevent shake at threshold
  const scrolledRef = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Switch to scrolled at 40px, un-switch only below 5px
      const next = y > 40 ? true : y < 5 ? false : scrolledRef.current;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={
        "sticky top-0 z-40 border-b transition-all duration-300 " +
        (scrolled
          ? "border-white/10 bg-foreground/50 backdrop-blur-xl shadow-lg"
          : "border-line/60 bg-background/85 backdrop-blur-xl")
      }
    >
      {/* main nav row — tightens on scroll */}
      <div
        className={
          "flex w-full items-center gap-3 px-4 transition-all duration-300 sm:gap-6 sm:px-6 xl:px-10 " +
          (scrolled ? "h-14" : "h-16 sm:h-20")
        }
      >
        <Logo />

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/" active={path === "/"} scrolled={scrolled}>
            Home
          </NavLink>

          <DropdownTrigger
            label="Products"
            open={open === "products"}
            scrolled={scrolled}
            onMouseEnter={() => openMenu("products")}
            onMouseLeave={scheduleClose}
          />
          <DropdownTrigger
            label="Industries"
            open={open === "industries"}
            scrolled={scrolled}
            onMouseEnter={() => openMenu("industries")}
            onMouseLeave={scheduleClose}
          />
          <NavLink to="/projects" active={path.startsWith("/projects")} scrolled={scrolled}>
            Projects
          </NavLink>
          <DropdownTrigger
            label="Services"
            open={open === "services"}
            scrolled={scrolled}
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          />
          <NavLink to="/about" active={path.startsWith("/about")} scrolled={scrolled}>
            About
          </NavLink>
          <NavLink to="/contact" active={path.startsWith("/contact")} scrolled={scrolled}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/products"
            className={
              "hidden h-10 w-10 items-center justify-center rounded-full border hover:bg-white/10 lg:flex " +
              (scrolled ? "border-white/20 text-white/80" : "border-line")
            }
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <a
            href="tel:+995000000000"
            className={
              "hidden h-10 items-center gap-2 rounded-full border px-4 text-sm lg:flex " +
              (scrolled
                ? "border-white/20 text-white/80 hover:bg-white/10"
                : "border-line hover:bg-surface")
            }
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          {user ? (
            <Link
              to="/account/orders"
              className={
                "flex h-10 items-center gap-2 rounded-full border px-3 text-sm " +
                (scrolled
                  ? "border-white/20 text-white/80 hover:bg-white/10"
                  : "border-line hover:bg-surface")
              }
            >
              <Package className="h-4 w-4" /> <span className="hidden whitespace-nowrap sm:inline">My Orders</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              search={{ redirect: "/" }}
              className={
                "flex h-10 items-center gap-2 rounded-full border px-3 text-sm " +
                (scrolled
                  ? "border-white/20 text-white/80 hover:bg-white/10"
                  : "border-line hover:bg-surface")
              }
            >
              <User className="h-4 w-4" /> <span className="hidden whitespace-nowrap sm:inline">Sign in</span>
            </Link>
          )}
          <Link
            to="/quote"
            className="flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-4 text-sm font-medium text-white hover:bg-terracotta/90 sm:px-5"
          >
            <FileText className="h-4 w-4" /> <span className="hidden whitespace-nowrap sm:inline">Request Quote</span>
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={
              "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden " +
              (scrolled ? "border-white/20 text-white" : "border-line")
            }
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mega panels — each panel also extends the hover zone so mouse can travel into it */}
      {open === "products" && (
        <MegaPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="grid gap-x-10 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 12).map((c) => (
              <div key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="font-display text-base text-ink hover:text-terracotta"
                >
                  {c.name}
                </Link>
                <ul className="mt-1 space-y-0.5">
                  {c.subcategories.slice(0, 4).map((s) => (
                    <li key={s} className="text-[13px] text-muted-foreground hover:text-ink">
                      <Link to="/category/$slug" params={{ slug: c.slug }}>
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <span className="text-sm text-muted-foreground">
              22 categories · 500+ SKUs across the catalog.
            </span>
            <Link to="/products" className="btn-primary text-sm">
              View all products →
            </Link>
          </div>
        </MegaPanel>
      )}

      {open === "industries" && (
        <MegaPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="flex gap-10">
            {/* left — industry list */}
            <div className="flex-1">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Who we serve
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map(({ name, desc, icon: Icon }) => (
                  <Link
                    key={name}
                    to="/industries"
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-peach-soft/70 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-medium text-ink">{name}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* right — CTA card */}
            <div className="hidden w-64 shrink-0 lg:block">
              <div className="h-full rounded-2xl bg-gradient-to-br from-terracotta/10 to-peach-soft/60 p-6">
                <div className="font-display text-xl text-ink">Outfitting a property?</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us your room count, location and timeline — we'll tailor a quote in 48 hours.
                </p>
                <Link to="/quote" className="btn-primary mt-5 inline-flex text-sm">
                  Get a quote →
                </Link>
              </div>
            </div>
          </div>
        </MegaPanel>
      )}

      {open === "services" && (
        <MegaPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="flex gap-10">
            {/* left — service list */}
            <div className="flex-1">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                What we do
              </div>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {SERVICES.map(({ name, desc, icon: Icon }) => (
                  <Link
                    key={name}
                    to="/services"
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-peach-soft/70 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-medium text-ink">{name}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* right — CTA card */}
            <div className="hidden w-64 shrink-0 lg:block">
              <div className="h-full rounded-2xl bg-gradient-to-br from-terracotta/10 to-peach-soft/60 p-6">
                <div className="font-display text-xl text-ink">End-to-end delivery</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  From sourcing a single item to managing a full hotel opening — Kaya handles it
                  all.
                </p>
                <Link to="/contact" className="btn-primary mt-5 inline-flex text-sm">
                  Talk to us →
                </Link>
              </div>
            </div>
          </div>
        </MegaPanel>
      )}

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="w-full space-y-1 px-6 py-4 xl:px-10">
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/products">All Products</MobileLink>
            <details className="rounded-lg">
              <summary className="cursor-pointer px-2 py-2 text-sm font-medium">Categories</summary>
              <div className="ml-3 mt-1 space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="block rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-surface-alt"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </details>
            <MobileLink to="/industries">Industries</MobileLink>
            <MobileLink to="/projects">Projects</MobileLink>
            <MobileLink to="/services">Services</MobileLink>
            <MobileLink to="/about">About</MobileLink>
            <MobileLink to="/contact">Contact</MobileLink>
            {user && <MobileLink to="/account/orders">My Orders</MobileLink>}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  to,
  active,
  scrolled,
  children,
}: {
  to: string;
  active: boolean;
  scrolled: boolean;
  children: React.ReactNode;
}) {
  const base = "relative px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? active
      ? "text-white font-medium"
      : "text-white/70 hover:text-white"
    : active
      ? "text-ink font-medium"
      : "text-ink-soft hover:text-ink";
  return (
    <Link to={to} className={base + color}>
      {children}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />
      )}
    </Link>
  );
}

function DropdownTrigger({
  label,
  open,
  scrolled,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  open: boolean;
  scrolled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const base = "relative flex items-center gap-1 px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? open
      ? "text-white font-medium"
      : "text-white/70 hover:text-white"
    : open
      ? "text-ink font-medium"
      : "text-ink-soft hover:text-ink";
  return (
    <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={base + color}>
      {label}
      <ChevronDown
        className={"h-3.5 w-3.5 transition-transform duration-200 " + (open ? "rotate-180" : "")}
      />
      {open && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />
      )}
    </button>
  );
}

function MegaPanel({
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 z-40 border-y border-line bg-background shadow-warm animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="w-full px-6 py-8 xl:px-10">{children}</div>
    </div>
  );
}

function MobileLink({
  to,
  search,
  children,
}: {
  to: string;
  search?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      search={search}
      className="block rounded-lg px-2 py-2 text-sm font-medium hover:bg-surface-alt"
    >
      {children}
    </Link>
  );
}
