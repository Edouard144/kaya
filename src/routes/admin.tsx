import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Orders,
  Products,
  formatUSD,
  type Order,
  type OrderStatus,
  type Product,
  type ProductInput,
} from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Kaya" }] }),
  component: AdminDashboard,
});

const ORDER_STATUSES: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];

const statusColor: Record<OrderStatus, string> = {
  pending: "bg-peach-soft text-ink",
  paid: "bg-terracotta text-white",
  shipped: "bg-foreground text-background",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-line-strong text-muted-foreground",
};

function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders">("products");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/admin" } });
  }, [loading, user, navigate]);

  if (!user) return null;
  if (user.role !== "admin") {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-5xl">Admins only</h1>
        <p className="mt-3 text-muted-foreground">
          You're signed in as <strong>{user.email}</strong>, but this area requires an admin account.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Admin</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage the Kaya catalog and customer orders.</p>
      </div>

      <div className="mt-8 inline-flex rounded-full border border-line bg-surface p-1">
        {(["products", "orders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "rounded-full px-5 py-2 text-sm capitalize transition-colors " +
              (tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-ink")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">{tab === "products" ? <ProductsPanel /> : <OrdersPanel />}</div>
    </div>
  );
}

// ---------------- Products ----------------

function ProductsPanel() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => Products.list(),
  });
  const [editing, setEditing] = useState<Product | "new" | null>(null);

  const remove = useMutation({
    mutationFn: (id: string) => Products.remove(id),
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-display text-2xl">Catalog ({data?.length ?? 0})</div>
        <button onClick={() => setEditing("new")} className="btn-primary">
          + New product
        </button>
      </div>

      <div className="surface-card mt-5 overflow-hidden p-0">
        {error ? (
          <div className="p-8 text-center text-sm text-muted-foreground">{(error as Error).message}</div>
        ) : isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : !data || data.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No products yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-surface text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-peach-soft" />
                      )}
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">{p.price ? formatUSD(Number(p.price)) : "—"}</td>
                  <td className="px-5 py-3">{p.stock ?? "—"}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="btn-ghost mr-2 text-xs">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) remove.mutate(p.id);
                      }}
                      className="text-xs text-terracotta hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <ProductForm
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["admin", "products"] });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProductInput>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    image: product?.image ?? "",
    stock: product?.stock ?? 0,
    price: product?.price ?? "",
    categoryId: product?.categoryId ?? "",
  });

  const save = useMutation({
    mutationFn: () =>
      product ? Products.update(product.id, form) : Products.create(form),
    onSuccess: () => {
      toast.success(product ? "Product updated" : "Product created");
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={onClose}>
      <div
        className="surface-card w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-display text-2xl">{product ? "Edit product" : "New product"}</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="mt-5 space-y-4"
        >
          <Field label="Name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="field"
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="field"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Base price (USD)">
              <input
                inputMode="decimal"
                value={form.price ?? ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="field"
                placeholder="0.00"
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                min={0}
                value={form.stock ?? 0}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="field"
              />
            </Field>
          </div>
          <Field label="Image URL">
            <input
              value={form.image ?? ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="field"
              placeholder="https://…"
            />
          </Field>
          <Field label="Category ID (optional)">
            <input
              value={form.categoryId ?? ""}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="field"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={save.isPending} className="btn-primary">
              {save.isPending ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

// ---------------- Orders ----------------

function OrdersPanel() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => Orders.listAll(),
  });

  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      Orders.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Order updated");
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="font-display text-2xl">All orders ({data?.length ?? 0})</div>
      <div className="surface-card mt-5 overflow-hidden p-0">
        {error ? (
          <div className="p-8 text-center text-sm text-muted-foreground">{(error as Error).message}</div>
        ) : isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : !data || data.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No orders yet.</div>
        ) : (
          <ul className="divide-y divide-line/60">
            {data.map((o: Order) => (
              <li key={o.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg">#{o.id.slice(0, 8)}</span>
                    <span className={"rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider " + statusColor[o.status]}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString()} · user {o.userId.slice(0, 8)}
                    {o.items && ` · ${o.items.length} items`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-display text-xl">{formatUSD(Number(o.total))}</div>
                  <select
                    value={o.status}
                    onChange={(e) => update.mutate({ id: o.id, status: e.target.value as OrderStatus })}
                    className="field !w-auto !py-2"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

