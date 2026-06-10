import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { categories, productBySlug } from "@/data/catalog";
import { getProductBySlug } from "@/lib/fns/products";
import { formatUSD } from "@/lib/shopify";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = productBySlug(params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Kaya` : "Product — Kaya" },
        { name: "description", content: p?.description ?? "Hotel supply by Kaya." },
        { property: "og:title", content: p ? `${p.name} — Kaya` : "Product — Kaya" },
        { property: "og:description", content: p?.description ?? "Hotel supply by Kaya." },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="btn-primary mt-6 inline-flex">
        Browse catalog
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product from DB by slug
  const { data: dbProduct, isLoading } = useQuery({
    queryKey: ["product-by-slug", id],
    queryFn: () => getProductBySlug({ data: { slug: id } }),
  });

  // Fallback to static catalog
  const staticProduct = productBySlug(id);

  if (isLoading) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
        <p className="mt-4 text-muted-foreground">Loading product…</p>
      </div>
    );
  }

  if (!dbProduct && !staticProduct) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Browse catalog</Link>
      </div>
    );
  }

  const product = dbProduct ?? {
    id: staticProduct!.id,
    name: staticProduct!.name,
    slug: staticProduct!.id,
    description: staticProduct!.description,
    image: staticProduct!.image,
    price: "0",
    stock: null,
    categoryId: null,
    categoryName: null,
    categorySlug: null,
    images: [],
  };

  const staticCategory = !dbProduct && staticProduct ? categories.find((c) => c.slug === staticProduct.category) : null;

  // Build image list: DB images > product image
  const allImages: string[] = [];
  if (dbProduct?.images?.length) {
    allImages.push(...dbProduct.images.map((img: any) => img.url));
  }
  if (product.image && !allImages.includes(product.image)) {
    allImages.push(product.image);
  }
  if (allImages.length === 0) {
    allImages.push("");
  }

  const categoryName = dbProduct?.categoryName || staticCategory?.name;
  const categorySlug = dbProduct?.categorySlug || staticCategory?.slug;

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/products" className="hover:text-ink">Products</Link>
        <span>/</span>
        {categoryName && categorySlug && (
          <>
            <Link to="/category/$slug" params={{ slug: categorySlug }} className="hover:text-ink">
              {categoryName}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink-soft">{product.name}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-center bg-peach-soft/60 p-4">
              {allImages[selectedImage] ? (
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="max-h-[600px] w-auto object-contain"
                />
              ) : (
                <div className="grid h-80 w-full place-items-center font-display text-6xl text-terracotta/30">◆</div>
              )}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === selectedImage ? "border-terracotta" : "border-line hover:border-muted-foreground"
                  }`}
                >
                  {img ? (
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-peach-soft/40 text-terracotta/30">◆</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {categoryName && (
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {categoryName}
            </div>
          )}
          <h1 className="mt-2 font-display text-5xl leading-tight">{product.name}</h1>
          <p className="mt-4 text-base text-ink-soft">{product.description}</p>

          {dbProduct && parseFloat(product.price) > 0 && (
            <div className="mt-6 surface-card p-5">
              <div className="font-display text-3xl text-terracotta">{formatUSD(parseFloat(product.price))}</div>
              <p className="mt-1 text-sm text-muted-foreground">per unit</p>
            </div>
          )}

          {!dbProduct && staticProduct && (
            <div className="surface-card mt-6 p-5">
              <div className="font-display text-lg">Pricing</div>
              <p className="mt-1 text-sm text-muted-foreground">{staticProduct.pricingNote}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {staticProduct.tiers.map((tier: string, i: number) => (
                  <div key={tier} className="rounded-xl border border-line bg-background/60 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {i === 0 ? "Standard" : i === 1 ? "Volume" : "Contract"}
                    </div>
                    <div className="mt-1 font-display text-sm text-ink">{tier}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                All pricing on request — submit a quote for a tailored offer within 48 hours.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary">Request a quote</Link>
            <Link to="/contact" className="btn-ghost">Talk to sales</Link>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-ink-soft">
            <li>✓ Hospitality-grade specification</li>
            <li>✓ Worldwide delivery from our Tbilisi warehouse</li>
            <li>✓ Installation and project management available</li>
            <li>✓ Volume discounts on bulk orders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
