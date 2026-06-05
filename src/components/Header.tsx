import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, User, Search } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

export function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Catalog" },
    { to: "/about", label: "About" },
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl leading-none tracking-tight">
          <span className="text-terracotta">◆</span>
          <span>provisto</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={
                  "text-sm transition-colors " +
                  (active ? "text-ink font-medium" : "text-muted-foreground hover:text-ink")
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/products"
            className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm text-muted-foreground transition-colors hover:text-ink md:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search supplies…</span>
          </Link>

          {user ? (
            <Link
              to="/account/orders"
              className="flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm hover:bg-surface"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link to="/auth" className="btn-ghost text-sm">
              Sign in
            </Link>
          )}

          <Link
            to="/cart"
            className="relative flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background hover:bg-ink-soft"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

