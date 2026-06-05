import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Phone, Search, Menu, X, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { categories } from "@/data/catalog";
import { useCart } from "@/lib/cart";

const INDUSTRIES = ["Hotels","Resorts","Serviced Apartments","Restaurants","Hospitals","Schools","Offices"];
const SERVICES = ["Supply","Installation","Interior Design","Hotel Setup Consultation","Maintenance"];

type MenuKey = "products" | "industries" | "services" | null;

export function MegaNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => { setOpen(null); setMobileOpen(false); }, [path]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/85 backdrop-blur-xl">
      {/* top utility strip */}
      <div className="hidden border-b border-line/40 md:block">
        <div className="flex h-9 w-full items-center justify-between px-6 text-[12px] text-muted-foreground xl:px-10">
          <div className="flex items-center gap-5">
            <span>📍 Tbilisi, Georgia</span>
            <span>🚚 Worldwide delivery</span>
            <span>🏨 Trusted by 80+ properties</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+995000000000" className="hover:text-ink">+995 000 000 000</a>
            <a href="mailto:hello@kaya.rent" className="hover:text-ink">hello@kaya.rent</a>
          </div>
        </div>
      </div>

      {/* main nav row */}
      <div className="flex h-20 w-full items-center gap-6 px-6 xl:px-10">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <NavLink to="/" active={path === "/"}>Home</NavLink>
          <DropdownTrigger label="Products" open={open === "products"} onToggle={() => setOpen(open === "products" ? null : "products")} />
          <DropdownTrigger label="Industries" open={open === "industries"} onToggle={() => setOpen(open === "industries" ? null : "industries")} />
          <NavLink to="/projects" active={path.startsWith("/projects")}>Projects</NavLink>
          <DropdownTrigger label="Services" open={open === "services"} onToggle={() => setOpen(open === "services" ? null : "services")} />
          <NavLink to="/about" active={path.startsWith("/about")}>About</NavLink>
          <NavLink to="/contact" active={path.startsWith("/contact")}>Contact</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/products" className="hidden h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-surface md:flex" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <ThemeSwitcher />
          <a href="tel:+995000000000" className="hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm hover:bg-surface md:flex">
            <Phone className="h-4 w-4" /> Call
          </a>
          <Link to="/quote" className="hidden h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-ink-soft md:flex">
            <FileText className="h-4 w-4" /> Request Quote
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-semibold text-white">{count}</span>
            )}
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden" aria-label="Menu">
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mega panels */}
      {open === "products" && (
        <MegaPanel onClose={() => setOpen(null)}>
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
        <MegaPanel onClose={() => setOpen(null)}>
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
        <MegaPanel onClose={() => setOpen(null)}>
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

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link to={to} className={"rounded-full px-3 py-2 text-sm transition-colors " + (active ? "bg-surface text-ink font-medium" : "text-ink-soft hover:bg-surface")}>
      {children}
    </Link>
  );
}

function DropdownTrigger({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={"flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors " + (open ? "bg-surface text-ink font-medium" : "text-ink-soft hover:bg-surface")}>
      {label}
      <ChevronDown className={"h-3.5 w-3.5 transition-transform " + (open ? "rotate-180" : "")} />
    </button>
  );
}

function MegaPanel({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-x-0 z-40 border-y border-line bg-background shadow-warm">
        <div className="w-full px-6 py-8 xl:px-10">{children}</div>
      </div>
      <button onClick={onClose} aria-label="Close menu" className="fixed inset-0 top-20 z-30 cursor-default bg-foreground/10 backdrop-blur-[2px]" />
    </>
  );
}

function MobileLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block rounded-lg px-2 py-2 text-sm font-medium hover:bg-surface-alt">
      {children}
    </Link>
  );
}

