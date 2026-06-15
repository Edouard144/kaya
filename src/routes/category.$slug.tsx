import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { categories as staticCategories } from "@/data/catalog";
import { listCategories, listPublicProducts, syncCategories } from "@/lib/fns/products";
import { formatUSD } from "@/lib/shopify";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = staticCategories.find((x) => x.slug === params.slug);
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
  component: CategoryPage,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function CategoryPage() {
  const { slug } = Route.useParams();
  const qc = useQueryClient();
  const [synced, setSynced] = useState(false);

  const staticCategory = staticCategories.find((x) => x.slug === slug);

  const { data: dbCategories, isLoading: catsLoading } = useQuery({
    queryKey: ["public-categories"],
    queryFn: () => listCategories(),
  });

  // Match DB category
  const matchedCategory = (() => {
    if (!dbCategories) return null;
    const bySlug = dbCategories.find((c) => c.slug === slug);
    if (bySlug) return bySlug;
    if (staticCategory) {
      const match = dbCategories.find((c) => slugify(c.name) === slugify(staticCategory.name));
      if (match) return match;
    }
    return null;
  })();

  // Find ALL related DB categories (share words with the static category) to include their products
  const relatedCategoryIds = (() => {
    if (!dbCategories || !staticCategory) return [];
    const stem = (w: string) => w.toLowerCase().replace(/(ings?|es|s)$/, "");
    const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter(Boolean);
    const staticWords = tokenize(staticCategory.name).map(stem);
    return dbCategories
      .filter((c) => {
        const catWords = tokenize(c.name).map(stem);
        return staticWords.some((w) => catWords.includes(w));
      })
      .map((c) => c.id);
  })();

  // Auto-sync if no match and categories loaded
  const syncMut = useMutation({
    mutationFn: () => syncCategories(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["public-categories"] });
      setSynced(true);
    },
  });

  useEffect(() => {
    if (!catsLoading && dbCategories && !matchedCategory && !synced && !syncMut.isPending) {
      syncMut.mutate();
    }
  }, [catsLoading, dbCategories, matchedCategory, synced]);

  const categoryId = matchedCategory?.id ?? null;

  const { data: dbProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["public-products-category", relatedCategoryIds.length ? relatedCategoryIds : categoryId],
    queryFn: () => listPublicProducts({
      data: relatedCategoryIds.length
        ? { categoryIds: relatedCategoryIds }
        : { categoryId: categoryId! },
    }),
    enabled: !!(categoryId || relatedCategoryIds.length),
  });

  const isLoading = catsLoading || syncMut.isPending;
  const categoryName = matchedCategory?.name || staticCategory?.name || slug.replace(/-/g, " ");
  const categoryDescription = staticCategory?.blurb || "";
  const categoryImage = staticCategory?.cover || null;
  const products = dbProducts ?? [];

  if (isLoading) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
        <p className="mt-4 text-muted-foreground">{syncMut.isPending ? "Setting up categories…" : "Loading category…"}</p>
      </div>
    );
  }

  if (!staticCategory && !matchedCategory) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Browse catalog</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="container-page pt-8">
        <div className="relative overflow-hidden rounded-[28px] border border-line/60 shadow-warm">
          {categoryImage ? (
            <img src={categoryImage} alt={categoryName} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-peach-soft/60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-background/85 via-background/40 to-background/20" />
          <div className="relative grid gap-6 p-10 md:grid-cols-12 md:p-16">
            <div className="md:col-span-8">
              {staticCategory?.short && (
                <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">{staticCategory.short}</div>
              )}
              <h1 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">{categoryName}</h1>
              <p className="mt-5 max-w-xl text-base text-ink-soft md:text-lg">{categoryDescription}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/quote" className="btn-primary">Request quote</Link>
                <Link to="/products" className="btn-ghost">All categories</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">Products</h2>
          <span className="text-sm text-muted-foreground">
            {products.length} item{products.length === 1 ? "" : "s"}
          </span>
        </div>

        {!matchedCategory && (
          <div className="surface-card p-10 text-center">
            <p className="text-muted-foreground">
              This category hasn't been set up in our system yet — request a quote and we'll source for your project.
            </p>
            <Link to="/quote" className="btn-primary mt-4 inline-flex">Request quote</Link>
          </div>
        )}

        {matchedCategory && productsLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="surface-card h-72 animate-pulse bg-peach-soft/30" />
            ))}
          </div>
        )}

        {matchedCategory && !productsLoading && products.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.slug }}
                className="surface-card group overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div className="flex h-64 items-center justify-center bg-peach-soft/40 p-3">
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-4xl text-terracotta/30">◆</div>
                  )}
                </div>
                <div className="space-y-1 p-5">
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="text-sm font-medium text-terracotta">{formatUSD(p.price)}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {matchedCategory && !productsLoading && products.length === 0 && (
          <div className="surface-card p-10 text-center">
            <p className="text-muted-foreground">
              No products in this category yet — request a quote and we'll source for your project.
            </p>
            <Link to="/quote" className="btn-primary mt-4 inline-flex">Request quote</Link>
          </div>
        )}
      </section>

      <section className="container-page pb-24">
        <h3 className="font-display text-2xl">Other categories</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {staticCategories.filter((x) => x.slug !== slug).slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="surface-card group flex items-center justify-between p-5 transition-transform hover:-translate-y-0.5"
            >
              <div>
                <div className="font-display text-lg">{c.name}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-terracotta" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
