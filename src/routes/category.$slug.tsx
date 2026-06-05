import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, productsByCategory } from "@/data/catalog";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: c ? `${c.name} — Kaya` : "Category — Kaya" },
        { name: "description", content: c?.blurb ?? "Hotel supply category by Kaya." },
        { property: "og:title", content: c ? `${c.name} — Kaya` : "Category — Kaya" },
        { property: "og:description", content: c?.blurb ?? "Hotel supply category by Kaya." },
        ...(c ? [{ property: "og:image", content: c.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { category: c };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <Link to="/products" className="btn-primary mt-6 inline-flex">Browse catalog</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category: c } = Route.useLoaderData();
  const products = productsByCategory(c.slug);
  const related = categories.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <div>
      {/* hero */}
      <section className="container-page pt-8">
        <div className="relative overflow-hidden rounded-[28px] border border-line/60 shadow-warm">
          <img src={c.cover} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/85 via-background/40 to-background/20" />
          <div className="relative grid gap-6 p-10 md:grid-cols-12 md:p-16">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">{c.short}</div>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">{c.name}</h1>
              <p className="mt-5 max-w-xl text-base text-ink-soft md:text-lg">{c.blurb}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/quote" className="btn-primary">Request quote</Link>
                <Link to="/products" className="btn-ghost">All categories</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* subcategory chips */}
      <section className="container-page py-10">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Included in this category</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {c.subcategories.map((s: string) => (
            <span key={s} className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* products */}
      <section className="container-page pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">Featured products</h2>
          <span className="text-sm text-muted-foreground">{products.length} items</span>
        </div>
        {products.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <p className="text-muted-foreground">No featured products yet — request a quote and we'll source for your project.</p>
            <Link to="/quote" className="btn-primary mt-4 inline-flex">Request quote</Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="surface-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden bg-peach-soft/60">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="space-y-1 p-5">
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* related */}
      <section className="container-page pb-24">
        <h3 className="font-display text-2xl">Related categories</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.slug} to="/category/$slug" params={{ slug: r.slug }} className="surface-card group flex items-center justify-between p-5 transition-transform hover:-translate-y-0.5">
              <div>
                <div className="font-display text-lg">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.short}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-terracotta" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

