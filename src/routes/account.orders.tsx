import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Package } from "lucide-react";
import { formatUSD, type OrderStatus } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { listMyOrders } from "@/lib/fns/orders";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "My orders — Kaya" }] }),
  component: MyOrders,
});

const statusColor: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function MyOrders() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/account/orders" } });
  }, [loading, user, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: () => listMyOrders({ data: { userId: user!.id } }),
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Account</div>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">My orders</h1>
          <p className="mt-2 text-muted-foreground">
            Hi {user.name.split(" ")[0]} — here's everything you've placed.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/products" className="btn-ghost text-sm">Browse catalog</Link>
          <button onClick={logout} className="btn-ghost text-sm">Sign out</button>
        </div>
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
            <Package className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <div className="mt-4 font-display text-3xl">No orders yet</div>
            <p className="mt-2 text-muted-foreground">
              When you place an order, it will appear here. Start by requesting a quote.
            </p>
            <Link to="/products" className="btn-primary mt-6 inline-flex">
              Browse supplies
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {data!.map((o) => (
              <li
                key={o.id}
                className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl">Order #{o.id.slice(0, 8)}</span>
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider " +
                        (statusColor[o.status as OrderStatus] ?? "bg-gray-100 text-gray-800")
                      }
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {new Date(o.createdAt ?? "").toLocaleDateString(undefined, { dateStyle: "medium" })}
                    {o.items && o.items.length > 0 && ` · ${o.items.length} item${o.items.length === 1 ? "" : "s"}`}
                  </div>
                  {o.items && o.items.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {o.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 rounded-full border border-line bg-background/60 px-3 py-1 text-xs">
                          {item.productImage ? (
                            <img src={item.productImage} alt="" className="h-4 w-4 rounded object-cover" />
                          ) : (
                            <span className="h-4 w-4 rounded bg-peach-soft/40" />
                          )}
                          <span className="text-ink-soft">{item.productName ?? "Product"}</span>
                          <span className="text-muted-foreground">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
