import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/api";
import { formatUSD, priceForQty } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  const from = priceForQty(product, product.pricingTiers?.[0]?.minQty ?? 1);
  const bulk =
    product.pricingTiers && product.pricingTiers.length > 1
      ? Number(product.pricingTiers[product.pricingTiers.length - 1].price)
      : null;

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group surface-card overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-peach-soft/60">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-5xl text-terracotta/40">
            ◆
          </div>
        )}
        {bulk !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-background">
            Bulk pricing
          </span>
        )}
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="flex items-baseline justify-between pt-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">From</div>
            <div className="font-display text-2xl text-ink">{formatUSD(from)}</div>
          </div>
          {bulk !== null && (
            <div className="text-right text-xs text-muted-foreground">
              <div>Bulk from</div>
              <div className="text-terracotta font-medium">{formatUSD(bulk)}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

