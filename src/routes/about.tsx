import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Provisto by Kaya" },
      { name: "description", content: "Provisto is the hotel-supply arm of kaya.rent — sourcing linens, amenities and operations essentials for properties." },
    ],
  }),
  component: About,
});

function About() {
  const steps = [
    { n: "01", title: "Browse the catalog", body: "Every product priced per unit, with bulk tiers shown up front. No quotes, no negotiation." },
    { n: "02", title: "Order at scale", body: "Bulk pricing applies automatically as you increase quantity. Pay via card at checkout." },
    { n: "03", title: "Delivered to your property", body: "Scheduled to your housekeeping window — pallets or single boxes, your call." },
  ];

  return (
    <div className="container-page py-16">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">About</div>
      <h1 className="mt-2 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
        The supply room for <span className="italic text-terracotta">independent hotels</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Provisto is the e-commerce arm of <a href="https://kaya.rent" className="underline">kaya.rent</a> —
        we source the linens, amenities and back-of-house essentials properties
        rely on, and ship them at scale without the friction of traditional
        wholesale.
      </p>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="surface-card p-7">
            <div className="font-display text-5xl text-terracotta">{s.n}</div>
            <div className="mt-4 font-display text-2xl">{s.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-3xl md:text-4xl">Ready to stock your property?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">Browse the catalog or create an account to track orders.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/products" className="btn-primary">Browse supplies</Link>
          <Link to="/auth" className="btn-ghost">Create account</Link>
        </div>
      </div>
    </div>
  );
}

