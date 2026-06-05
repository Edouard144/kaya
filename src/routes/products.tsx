import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { categories, seedProducts } from "@/data/catalog";

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
  const filteredCats = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(needle) ||
      c.short.toLowerCase().includes(needle) ||
      c.subcategories.some((s) => s.toLowerCase().includes(needle)),
    );
  }, [q]);
  const filteredProducts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return seedProducts.filter((p) => p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle));
  }, [q]);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Catalog</div>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Hotel supplies</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            22 categories, 500+ SKUs — search by item or browse by category.
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

      {q && filteredProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl">Matching products</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-display text-base">{p.name}</div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCats.map((c) => (
          <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
            <div className="relative aspect-[5/3] overflow-hidden bg-peach-soft/60">
              <img src={c.cover} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                <div className="text-[11px] uppercase tracking-[0.18em] opacity-85">{c.short}</div>
                <div className="font-display text-2xl">{c.name}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">{c.blurb}</p>
              <ArrowRight className="h-4 w-4 text-terracotta" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

