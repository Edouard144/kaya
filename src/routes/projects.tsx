import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/catalog";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Kaya" },
      {
        name: "description",
        content:
          "Hotels, resorts and apartment projects outfitted by Kaya across Georgia and beyond.",
      },
      { property: "og:title", content: "Projects — Kaya" },
      {
        property: "og:description",
        content:
          "A selection of properties we've delivered — from boutique hotels to flagship resorts.",
      },
    ],
  }),
  component: () => (
    <div className="container-page py-16">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Projects</div>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Properties we've delivered</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A selection of recent projects across Georgia — boutique hotels, resort builds, mountain
        lodges and serviced apartments.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.concat(projects).map((p, i) => (
          <div key={p.title + i} className="surface-card group overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {p.location}
              </div>
              <div className="mt-1 font-display text-2xl">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.scope}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/quote" className="btn-primary">
          Start your project →
        </Link>
      </div>
    </div>
  ),
});
