import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight } from "lucide-react";
import { formatUSD } from "@/lib/shopify";
import { listPublicProducts, listCategories } from "@/lib/fns/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Kaya" },
      { name: "description", content: "Explore every category Kaya supplies for hotels — furniture, linens, bathroom, kitchen, lighting, security and more." },
      { property: "og:title", content: "All Products — Kaya" },
      { property: "og:description", content: "Every category Kaya supplies for hotels and hospitality projects." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [q, setQ] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data: dbProducts, isLoading } = useQuery({
    queryKey: ["public-products", q, selectedCategoryId],
    queryFn: () => listPublicProducts({
      data: {
        search: q.trim() || undefined,
        categoryId: selectedCategoryId || undefined,
      },
    }),
  });

  const { data: dbCategories } = useQuery({
    queryKey: ["public-categories"],
    queryFn: () => listCategories(),
  });

  // Group products by category
  const productsByCategory = useMemo(() => {
    if (!dbProducts?.length) return [];
    const map = new Map<string, { name: string; slug: string; products: typeof dbProducts }>();
    for (const p of dbProducts) {
      const key = p.categoryId || "__uncategorized";
      if (!map.has(key)) {
        map.set(key, {
          name: p.categoryName || "Uncategorized",
          slug: p.categorySlug || "uncategorized",
          products: [],
        });
      }
      map.get(key)!.products.push(p);
    }
    return Array.from(map.values());
  }, [dbProducts]);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Catalog</div>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Hotel supplies</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {dbProducts?.length ?? 0} products — search by item or browse by category.
          </p>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search towels, beds, lighting…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Category filters */}
      {dbCategories && dbCategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategoryId("")}
            className={"rounded-full px-4 py-2 text-sm font-medium transition-colors " +
              (!selectedCategoryId ? "bg-foreground text-background" : "border border-line hover:bg-surface")
            }
          >
            All
          </button>
          {dbCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(selectedCategoryId === cat.id ? "" : cat.id)}
              className={"rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                (selectedCategoryId === cat.id ? "bg-foreground text-background" : "border border-line hover:bg-surface")
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="surface-card h-72 animate-pulse bg-peach-soft/30" />
          ))}
        </div>
      )}

      {/* Search results */}
      {!isLoading && q && dbProducts && dbProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl">Matching products ({dbProducts.length})</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dbProducts.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.slug }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="flex h-64 items-center justify-center bg-peach-soft/40 p-3">
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-4xl text-terracotta/30">◆</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-display text-base">{p.name}</div>
                  <p className="mt-0.5 text-sm font-medium text-terracotta">{formatUSD(p.price)}</p>
                  {p.categoryName && (
                    <p className="mt-1 text-xs text-muted-foreground">{p.categoryName}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty search */}
      {!isLoading && q && dbProducts?.length === 0 && (
        <div className="mt-10 text-center py-16">
          <div className="font-display text-2xl text-muted-foreground">No products found</div>
          <p className="mt-2 text-sm text-muted-foreground">Try a different search term.</p>
        </div>
      )}

      {/* Products grouped by category */}
      {!isLoading && !q && productsByCategory.length > 0 && (
        <div className="mt-12 space-y-12">
          {productsByCategory.map((group) => (
            <div key={group.slug}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl">{group.name}</h2>
                <Link to="/category/$slug" params={{ slug: group.slug }} className="flex items-center gap-1 text-sm text-terracotta hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.products.slice(0, 4).map((p) => (
                  <Link key={p.id} to="/product/$id" params={{ id: p.slug }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                    <div className="flex h-64 items-center justify-center bg-peach-soft/40 p-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="grid h-full w-full place-items-center font-display text-4xl text-terracotta/30">◆</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="font-display text-base">{p.name}</div>
                      <p className="mt-0.5 text-sm font-medium text-terracotta">{formatUSD(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !q && dbProducts?.length === 0 && (
        <div className="mt-12 text-center py-24">
          <div className="font-display text-3xl text-muted-foreground">No products yet</div>
          <p className="mt-2 text-muted-foreground">Products added by the admin will appear here.</p>
        </div>
      )}
    </div>
  );
}
