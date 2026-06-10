import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Hammer,
  Headset,
  Globe2,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryMarquee } from "@/components/CategoryMarquee";
import { featuredCategories, industries, projects } from "@/data/catalog";
import { listPublicProducts } from "@/lib/fns/products";
import { formatUSD } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaya — Hotel Solutions, end to end" },
      {
        name: "description",
        content:
          "Kaya supplies, installs and outfits hotels worldwide — furniture, linens, bathroom, kitchen, lighting, security and more. Request a free quote.",
      },
      { property: "og:title", content: "Kaya — Hotel Solutions, end to end" },
      {
        property: "og:description",
        content:
          "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: dbProducts } = useQuery({
    queryKey: ["public-products-home"],
    queryFn: () => listPublicProducts({ data: {} }),
  });

  const products = (dbProducts ?? []).slice(0, 8);

  return (
    <div>
      <HeroCarousel />

      {/* trust strip */}
      <section className="w-full px-6 xl:px-10 pb-10">
        <div className="surface-card grid grid-cols-2 gap-2 p-4 md:grid-cols-4 md:p-6">
          {[
            { icon: Truck, label: "Worldwide delivery", note: "Pallets to single boxes" },
            { icon: ShieldCheck, label: "Hospitality grade", note: "Laundering & wear tested" },
            { icon: Hammer, label: "Supply + install", note: "Single project timeline" },
            { icon: Headset, label: "Dedicated rep", note: "One contact, full scope" },
          ].map(({ icon: Icon, label, note }) => (
            <div key={label} className="flex items-center gap-3 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-peach-soft/70 text-terracotta">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES — auto-scrolling marquees */}
      <section className="py-10">
        <div className="w-full px-6 xl:px-10 mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Browse the catalog
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Everything a hotel runs on</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              22 categories, from beds to building materials — sourced under one roof.
            </p>
          </div>
          <Link to="/products" className="hidden text-sm text-terracotta hover:underline md:inline">
            All categories →
          </Link>
        </div>
        <div className="space-y-5">
          <CategoryMarquee />
          <CategoryMarquee reverse />
        </div>
      </section>

      {/* Featured categories grid */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Featured collections
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Start where your project starts
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.slice(0, 6).map((c, i) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={
                "surface-card group relative overflow-hidden " +
                (i === 0 ? "lg:row-span-2 lg:col-span-1" : "")
              }
            >
              <div
                className={
                  "relative overflow-hidden " +
                  (i === 0 ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[5/4]")
                }
              >
                <img
                  src={c.cover}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-100">
                    {c.short}
                  </div>
                  <div className="mt-1 font-display text-3xl">{c.name}</div>
                  <p className="mt-2 max-w-md text-sm opacity-85">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-background">
                    Explore <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS FEATURED */}
      <section className="w-full px-6 xl:px-10 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              From the catalog
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Stocked & ready</h2>
          </div>
          <Link to="/products" className="text-sm text-terracotta hover:underline">
            View all →
          </Link>
        </div>
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
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center font-display text-4xl text-terracotta/30">◆</div>
                )}
              </div>
              <div className="space-y-1 p-5">
                <h3 className="font-display text-lg leading-tight">{p.name}</h3>
                <p className="text-sm font-medium text-terracotta">{formatUSD(p.price)}</p>
                {p.categoryName && (
                  <p className="text-xs text-muted-foreground">{p.categoryName}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="surface-card grid gap-10 p-10 md:grid-cols-12 md:p-14">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Who we serve
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Industries that trust Kaya</h2>
            <p className="mt-4 text-muted-foreground">
              We've outfitted properties from city hotels to mountain lodges — boutique fit-outs
              through to flagship resort builds.
            </p>
            <Link to="/industries" className="mt-6 inline-flex btn-primary text-sm">
              See all industries →
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industries.map((i) => (
                <div key={i.name} className="rounded-2xl border border-line bg-background/60 p-4">
                  <div className="font-display text-lg">{i.name}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="w-full px-6 xl:px-10 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Worldwide projects
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Properties we've delivered</h2>
          </div>
          <Link to="/projects" className="text-sm text-terracotta hover:underline">
            All projects →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <div key={p.title} className="surface-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.location}
                </div>
                <div className="mt-1 font-display text-lg leading-snug">{p.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{p.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="w-full px-6 xl:px-10 py-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Our partners
          </div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Brands & properties we work with
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {["Radisson", "Marriott", "Wyndham", "Hilton", "IHG", "Accor"].map((b) => (
            <div
              key={b}
              className="surface-card grid h-20 place-items-center font-display text-xl text-ink-soft"
            >
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 xl:px-10 pb-24">
        <div
          className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 100%)",
          }}
        >
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-foreground text-background">
              <Globe2 className="h-6 w-6" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Outfitting a property?
              </div>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">Tell us about your project</h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Send your room count, location and timeline — we'll respond with a tailored quote
                inside 48 hours.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Request quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
