import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, Search, Menu, X, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { categories } from "@/data/catalog";
import { useCart } from "@/lib/cart";

const INDUSTRIES = ["Hotels","Resorts","Serviced Apartments","Restaurants","Hospitals","Schools","Offices"];
const SERVICES = ["Supply","Installation","Interior Design","Hotel Setup Consultation","Maintenance"];

type MenuKey = "products" | "industries" | "services";

export function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on navigation
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [path]);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <div className={"flex w-full items-center gap-6 px-6 transition-all duration-300 xl:px-10 " + (scrolled ? "h-14" : "h-20")}>
        <Logo />

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/" active={path === "/"} scrolled={scrolled}>Home</NavLink>

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
          <NavLink to="/projects" active={path.startsWith("/projects")} scrolled={scrolled}>Projects</NavLink>
          <DropdownTrigger
            label="Services"
            open={open === "services"}
            scrolled={scrolled}
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          />
          <NavLink to="/about" active={path.startsWith("/about")} scrolled={scrolled}>About</NavLink>
          <NavLink to="/contact" active={path.startsWith("/contact")} scrolled={scrolled}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/products" className={"hidden h-10 w-10 items-center justify-center rounded-full border hover:bg-white/10 md:flex " + (scrolled ? "border-white/20 text-white/80" : "border-line")} aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <ThemeSwitcher />
          <a href="tel:+995000000000" className={"hidden h-10 items-center gap-2 rounded-full border px-4 text-sm md:flex " + (scrolled ? "border-white/20 text-white/80 hover:bg-white/10" : "border-line hover:bg-surface")}>
            <Phone className="h-4 w-4" /> Call
          </a>
          <Link to="/quote" className="hidden h-10 items-center gap-2 rounded-full bg-terracotta px-5 text-sm font-medium text-white hover:bg-terracotta/90 md:flex">
            <FileText className="h-4 w-4" /> Request Quote
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[11px] font-semibold">{count}</span>
            )}
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} className={"flex h-10 w-10 items-center justify-center rounded-full border lg:hidden " + (scrolled ? "border-white/20 text-white" : "border-line")} aria-label="Menu">
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
                <Link to="/category/$slug" params={{ slug: c.slug }} className="font-display text-base text-ink hover:text-terracotta">
                  {c.name}
                </Link>
                <ul className="mt-1 space-y-0.5">
                  {c.subcategories.slice(0, 4).map((s) => (
                    <li key={s} className="text-[13px] text-muted-foreground hover:text-ink">
                      <Link to="/category/$slug" params={{ slug: c.slug }}>{s}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <span className="text-sm text-muted-foreground">22 categories · 500+ SKUs across the catalog.</span>
            <Link to="/products" className="btn-primary text-sm">View all products →</Link>
          </div>
        </MegaPanel>
      )}

      {open === "industries" && (
        <MegaPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((i) => (
              <Link key={i} to="/industries" className="surface-card flex items-center gap-3 p-4 hover:-translate-y-0.5 transition-transform">
                <span className="h-9 w-9 rounded-full bg-peach-soft/70 grid place-items-center text-terracotta font-display">◆</span>
                <span className="text-sm font-medium">{i}</span>
              </Link>
            ))}
          </div>
        </MegaPanel>
      )}

      {open === "services" && (
        <MegaPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s} to="/services" className="surface-card flex items-start gap-3 p-4">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-terracotta" />
                <div>
                  <div className="font-medium">{s}</div>
                  <div className="text-xs text-muted-foreground">End-to-end delivery by Kaya teams.</div>
                </div>
              </Link>
            ))}
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
                  <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="block rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-surface-alt">
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
            <Link to="/quote" className="mt-3 block w-full rounded-full bg-foreground py-3 text-center text-sm font-medium text-background">
              Request Quote {count > 0 && `(${count})`}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, active, scrolled, children }: { to: string; active: boolean; scrolled: boolean; children: React.ReactNode }) {
  const base = "relative px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? (active ? "text-white font-medium" : "text-white/70 hover:text-white")
    : (active ? "text-ink font-medium" : "text-ink-soft hover:text-ink");
  return (
    <Link to={to} className={base + color}>
      {children}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />
      )}
    </Link>
  );
}

function DropdownTrigger({ label, open, scrolled, onMouseEnter, onMouseLeave }: {
  label: string;
  open: boolean;
  scrolled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const base = "relative flex items-center gap-1 px-3 py-2 text-sm transition-colors ";
  const color = scrolled
    ? (open ? "text-white font-medium" : "text-white/70 hover:text-white")
    : (open ? "text-ink font-medium" : "text-ink-soft hover:text-ink");
  return (
    <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={base + color}>
      {label}
      <ChevronDown className={"h-3.5 w-3.5 transition-transform duration-200 " + (open ? "rotate-180" : "")} />
      {open && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-terracotta" />}
    </button>
  );
}

function MegaPanel({ children, onMouseEnter, onMouseLeave }: {
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

function MobileLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block rounded-lg px-2 py-2 text-sm font-medium hover:bg-surface-alt">
      {children}
    </Link>
  );
}
