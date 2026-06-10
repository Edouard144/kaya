import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Globe2, Handshake, Award, Truck, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kaya Hotel Solutions" },
      {
        name: "description",
        content:
          "Kaya is a complete hotel supply and fit-out partner — furniture, linens, kitchen, bathroom and everything in between, delivered and installed across Georgia and worldwide.",
      },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    {
      icon: Building2,
      title: "Hotels first",
      body: "Everything we stock and source is spec'd for hospitality use — not repurposed consumer goods. Daily turnover, industrial laundering, and years of guests are baked into every product.",
    },
    {
      icon: Globe2,
      title: "Worldwide reach",
      body: "We ship from our Tbilisi warehouse to properties across Georgia, the Caucasus and beyond — pallets or single boxes, coordinated to your housekeeping schedule.",
    },
    {
      icon: Handshake,
      title: "One partner, full scope",
      body: "From a single linen reorder to a 200-room opening fit-out, Kaya handles supply, delivery and installation under one contract and one timeline.",
    },
    {
      icon: Award,
      title: "Hospitality-grade only",
      body: "We don't list products that won't survive a hotel. Every SKU is tested or field-proven in real properties before it enters the catalog.",
    },
    {
      icon: Truck,
      title: "Supply chain depth",
      body: "Relationships with manufacturers across Europe, Turkey and Asia give us the sourcing depth to fulfill large orders fast — without compromising on quality.",
    },
    {
      icon: Wrench,
      title: "Supply and install",
      body: "Our on-the-ground teams handle installation, commissioning and post-delivery support so you can focus on opening day, not logistics.",
    },
  ];

  return (
    <div className="w-full px-6 py-16 xl:px-10">
      {/* Hero */}
      <div className="max-w-4xl">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">About Kaya</div>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-7xl">
          The supply partner hotels
          <br />
          <span className="italic text-terracotta">actually rely on.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Kaya is a complete hotel solutions company based in Tbilisi, Georgia. We source, supply
          and install everything a hotel needs — from the bed frame and linen in every room to the
          pool equipment on the terrace and the combi oven in the kitchen.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          We work with hotels, resorts, serviced apartments, restaurants and motels — but hotels are
          our core. We understand the pressures of pre-opening timelines, high-turnover housekeeping
          and the uncompromising standards guests expect.
        </p>
      </div>

      {/* Stats strip */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: "80+", label: "Properties outfitted" },
          { n: "22", label: "Product categories" },
          { n: "500+", label: "SKUs in catalog" },
          { n: "48 h", label: "Quote turnaround" },
        ].map(({ n, label }) => (
          <div key={label} className="surface-card p-7 text-center">
            <div className="font-display text-5xl text-terracotta">{n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">How we work</div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">From quote to keys-in-hand</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Tell us about your project",
              body: "Share your room count, property type, location and timeline. We respond with a tailored supply plan and quote within 48 hours.",
            },
            {
              n: "02",
              title: "We source and stage everything",
              body: "Our team handles procurement, quality checks and staging at our Tbilisi warehouse — coordinated to your delivery window.",
            },
            {
              n: "03",
              title: "Delivered and installed",
              body: "We deliver to your property on schedule and, where needed, our installation teams set up furniture, equipment and systems so you're ready to open.",
            },
          ].map((s) => (
            <div key={s.n} className="surface-card p-7">
              <div className="font-display text-5xl text-terracotta">{s.n}</div>
              <div className="mt-4 font-display text-2xl">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          What sets us apart
        </div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Built around hotels</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-peach-soft/70 text-terracotta">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-4 font-display text-xl">{title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who we serve */}
      <div className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Who we serve
        </div>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Hotels above all — and beyond</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Our catalog and service model are designed around hotel operations, but the same supply
          depth serves motels, resorts, serviced apartments and restaurants equally well.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Hotels",
              desc: "Our core — boutique to flagship, new-build to refurbishment.",
            },
            { name: "Resorts", desc: "Full-property supply including pool, outdoor and F&B." },
            {
              name: "Motels & Guesthouses",
              desc: "Efficient, durable spec for high-turnover operations.",
            },
            {
              name: "Restaurants",
              desc: "Kitchen equipment, tabletop and front-of-house furnishings.",
            },
          ].map(({ name, desc }) => (
            <div key={name} className="surface-card p-5">
              <div className="font-display text-lg">{name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-20 surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between"
        style={{
          backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 100%)",
        }}
      >
        <div>
          <h3 className="font-display text-3xl md:text-4xl">Ready to outfit your property?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Send us your room count, location and timeline — we'll come back with a tailored
            proposal in 48 hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/quote" className="btn-primary">
            Request a quote
          </Link>
          <Link to="/contact" className="btn-ghost">
            Talk to us
          </Link>
        </div>
      </div>
    </div>
  );
}
