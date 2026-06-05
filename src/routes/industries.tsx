import { createFileRoute, Link } from "@tanstack/react-router";
import { industries } from "@/data/catalog";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Kaya" },
      { name: "description", content: "Kaya supplies hotels, resorts, serviced apartments, restaurants, hospitals, schools and offices worldwide." },
      { property: "og:title", content: "Industries — Kaya" },
      { property: "og:description", content: "Hotels, resorts, apartments, restaurants, hospitals, schools, offices — all outfitted by Kaya." },
    ],
  }),
  component: () => (
    <div className="container-page py-16">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Who we serve</div>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Industries</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Hospitality is our specialty — but the same supply chain serves any project that
        needs furniture, linen, kitchen, bath and finishing at scale.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <div key={i.name} className="surface-card p-6">
            <div className="font-display text-2xl">{i.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            <Link to="/quote" className="mt-4 inline-flex text-sm text-terracotta hover:underline">
              Request quote →
            </Link>
          </div>
        ))}
      </div>
    </div>
  ),
});

