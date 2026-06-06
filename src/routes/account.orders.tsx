import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Orders, formatUSD, type OrderStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "My orders — Kaya" }] }),
  component: MyOrders,
});

const statusColor: Record<OrderStatus, string> = {
  pending: "bg-peach-soft text-ink",
  paid: "bg-terracotta text-white",
  shipped: "bg-foreground text-background",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-line-strong text-muted-foreground",
};

function MyOrders() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/account/orders" } });
  }, [loading, user, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", "mine"],
    queryFn: () => Orders.list(),
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Account</div>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">My orders</h1>
          <p className="mt-2 text-muted-foreground">Hi {user.name.split(" ")[0]} — here's everything you've placed.</p>
        </div>
        <button onClick={logout} className="btn-ghost text-sm">Sign out</button>
      </div>

      <div className="mt-10">
        {error ? (
          <div className="surface-card p-8 text-center">
            <div className="font-display text-2xl">Couldn't load orders</div>
            <p className="mt-2 text-sm text-muted-foreground">{(error as Error).message}</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="surface-card h-24 animate-pulse bg-peach-soft/30" />
            ))}
          </div>
        ) : (data ?? []).length === 0 ? (
          <div className="surface-card p-12 text-center">
            <div className="font-display text-3xl">No orders yet</div>
            <p className="mt-2 text-muted-foreground">Place your first order from the catalog.</p>
            <Link to="/products" className="btn-primary mt-6 inline-block">Browse supplies</Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {data!.map((o) => (
              <li key={o.id} className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl">Order #{o.id.slice(0, 8)}</span>
                    <span className={"rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider " + statusColor[o.status]}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    {o.items && ` · ${o.items.length} line item${o.items.length === 1 ? "" : "s"}`}
                  </div>
                </div>
                <div className="font-display text-2xl">{formatUSD(Number(o.total))}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

