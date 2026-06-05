import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useAuth, f as formatUSD, d as Products, O as Orders } from "./router-hieTueYT.mjs";
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
import "../_libs/lucide-react.mjs";
const ORDER_STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];
const statusColor = {
  pending: "bg-peach-soft text-ink",
  paid: "bg-terracotta text-white",
  shipped: "bg-foreground text-background",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-line-strong text-muted-foreground"
};
function AdminDashboard() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("products");
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/admin"
      }
    });
  }, [loading, user, navigate]);
  if (!user) return null;
  if (user.role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Admins only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground", children: [
        "You're signed in as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.email }),
        ", but this area requires an admin account."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl md:text-6xl", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage the Provisto catalog and customer orders." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 inline-flex rounded-full border border-line bg-surface p-1", children: ["products", "orders"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: "rounded-full px-5 py-2 text-sm capitalize transition-colors " + (tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-ink"), children: t }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: tab === "products" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsPanel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersPanel, {}) })
  ] });
}
function ProductsPanel() {
  const qc = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => Products.list()
  });
  const [editing, setEditing] = reactExports.useState(null);
  const remove = useMutation({
    mutationFn: (id) => Products.remove(id),
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "products"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
        "Catalog (",
        data?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing("new"), className: "btn-primary", children: "+ New product" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card mt-5 overflow-hidden p-0", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: error.message }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-sm text-muted-foreground", children: "Loading…" }) : !data || data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No products yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-line bg-surface text-left text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-line/60 last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          p.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, className: "h-10 w-10 rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-peach-soft" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.id.slice(0, 8) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: p.price ? formatUSD(Number(p.price)) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: p.stock ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(p), className: "btn-ghost mr-2 text-xs", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirm(`Delete "${p.name}"?`)) remove.mutate(p.id);
          }, className: "text-xs text-terracotta hover:underline", children: "Delete" })
        ] })
      ] }, p.id)) })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { product: editing === "new" ? null : editing, onClose: () => setEditing(null), onSaved: () => {
      qc.invalidateQueries({
        queryKey: ["admin", "products"]
      });
      setEditing(null);
    } })
  ] });
}
function ProductForm({
  product,
  onClose,
  onSaved
}) {
  const [form, setForm] = reactExports.useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    image: product?.image ?? "",
    stock: product?.stock ?? 0,
    price: product?.price ?? "",
    categoryId: product?.categoryId ?? ""
  });
  const save = useMutation({
    mutationFn: () => product ? Products.update(product.id, form) : Products.create(form),
    onSuccess: () => {
      toast.success(product ? "Product updated" : "Product created");
      onSaved();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card w-full max-w-lg p-6", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: product ? "Edit product" : "New product" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      save.mutate();
    }, className: "mt-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }), className: "field" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: form.description ?? "", onChange: (e) => setForm({
        ...form,
        description: e.target.value
      }), className: "field" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Base price (USD)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { inputMode: "decimal", value: form.price ?? "", onChange: (e) => setForm({
          ...form,
          price: e.target.value
        }), className: "field", placeholder: "0.00" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stock", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.stock ?? 0, onChange: (e) => setForm({
          ...form,
          stock: Number(e.target.value)
        }), className: "field" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.image ?? "", onChange: (e) => setForm({
        ...form,
        image: e.target.value
      }), className: "field", placeholder: "https://…" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category ID (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.categoryId ?? "", onChange: (e) => setForm({
        ...form,
        categoryId: e.target.value
      }), className: "field" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "btn-ghost", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: save.isPending, className: "btn-primary", children: save.isPending ? "Saving…" : "Save" })
      ] })
    ] })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
function OrdersPanel() {
  const qc = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => Orders.listAll()
  });
  const update = useMutation({
    mutationFn: ({
      id,
      status
    }) => Orders.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Order updated");
      qc.invalidateQueries({
        queryKey: ["admin", "orders"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
      "All orders (",
      data?.length ?? 0,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-card mt-5 overflow-hidden p-0", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: error.message }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-sm text-muted-foreground", children: "Loading…" }) : !data || data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No orders yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-line/60", children: data.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg", children: [
            "#",
            o.id.slice(0, 8)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider " + statusColor[o.status], children: o.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          new Date(o.createdAt).toLocaleString(),
          " · user ",
          o.userId.slice(0, 8),
          o.items && ` · ${o.items.length} items`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: formatUSD(Number(o.total)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => update.mutate({
          id: o.id,
          status: e.target.value
        }), className: "field !w-auto !py-2", children: ORDER_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) })
      ] })
    ] }, o.id)) }) })
  ] });
}
export {
  AdminDashboard as component
};
