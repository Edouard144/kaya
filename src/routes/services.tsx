import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Hammer,
  Palette,
  ClipboardList,
  Wrench,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kaya Hotel Solutions" },
      {
        name: "description",
        content:
          "Kaya delivers end-to-end hotel services: supply, installation, interior design, project consultation and ongoing maintenance — all from one partner.",
      },
      { property: "og:title", content: "Services — Kaya Hotel Solutions" },
      {
        property: "og:description",
        content:
          "Supply, installation, interior design, consultation and maintenance — everything a hotel project needs, under one roof.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Truck,
    id: "supply",
    label: "01",
    title: "Supply & Procurement",
    tagline: "22 categories. 500+ SKUs. One order.",
    body: "We source hospitality-grade furniture, linens, bathroom fixtures, kitchen equipment, lighting, security systems and more — tested for commercial durability and delivered to your property anywhere in the world.",
    features: [
      "Full catalog of 22 product categories",
      "Volume pricing from 10 to 10,000+ units",
      "Worldwide delivery — pallets or single boxes",
      "Pre-shipment quality inspection",
      "Consolidated freight from multiple suppliers",
    ],
    cta: "Browse the catalog",
    ctaTo: "/products",
  },
  {
    icon: Hammer,
    id: "installation",
    label: "02",
    title: "Installation",
    tagline: "Delivered, assembled, room-ready.",
    body: "Our installation crews work room by room to your housekeeping schedule — furniture assembly, fixture fitting, soft furnishing placement and final snagging. We hand over every space complete.",
    features: [
      "Furniture assembly and joinery fitting",
      "Bathroom and kitchen fixture installation",
      "Lighting and electrical coordination",
      "Carpeting, flooring and wall panel installation",
      "Site manager on every project",
    ],
    cta: "Request a quote",
    ctaTo: "/quote",
  },
  {
    icon: Palette,
    id: "design",
    label: "03",
    title: "Interior Design",
    tagline: "From concept board to completed room.",
    body: "Our design team produces mood boards, material selections, FF&E schedules and space plans — then sources every item directly from the Kaya catalog so there's no gap between the design and delivery.",
    features: [
      "Concept development and mood boarding",
      "Material and finish selection",
      "FF&E schedule production",
      "Space planning and 3D visualisation",
      "Design-to-supply handoff in one team",
    ],
    cta: "Talk to our design team",
    ctaTo: "/contact",
  },
  {
    icon: ClipboardList,
    id: "consultation",
    label: "04",
    title: "Hotel Setup Consultation",
    tagline: "End-to-end project management.",
    body: "Opening a hotel is a multi-track project. Our consultants manage the supply timeline alongside your construction schedule — coordinating deliveries, managing snagging lists and making sure the soft opening goes smoothly.",
    features: [
      "Pre-opening supply timeline planning",
      "Budget modelling and value engineering",
      "Supplier and logistics coordination",
      "Snagging and defect management",
      "Dedicated project manager, one point of contact",
    ],
    cta: "Schedule a consultation",
    ctaTo: "/quote",
  },
  {
    icon: Wrench,
    id: "maintenance",
    label: "05",
    title: "Maintenance & Replenishment",
    tagline: "Keep every room up to standard.",
    body: "After opening day, properties need ongoing replenishment — mattresses, linens, amenities, broken fixtures. We run scheduled maintenance visits and hold fast-replenishment stock for properties on retainer.",
    features: [
      "Scheduled linen and amenity replenishment",
      "Furniture repair and replacement",
      "Annual FF&E audit",
      "Priority lead times for retainer clients",
      "Dedicated account manager",
    ],
    cta: "Talk to us",
    ctaTo: "/contact",
  },
];

const process = [
  {
    n: "01",
    title: "Tell us about your project",
    body: "Fill in the quote form — room count, location, timeline and the categories you need. Takes under 5 minutes.",
  },
  {
    n: "02",
    title: "We send a tailored proposal",
    body: "Within 48 hours a member of the Kaya team responds with a full scope, product selection and indicative budget.",
  },
  {
    n: "03",
    title: "Approve and we get to work",
    body: "Once you approve, we lock in production and logistics slots. A project manager tracks everything to handover.",
  },
];

function ServicesPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="container-page pb-10 pt-14">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            What we do
          </div>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] md:text-7xl lg:text-8xl">
            One partner. <span className="italic text-terracotta">Every service.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From sourcing a single linen order to managing a full 200-room hotel fit-out — Kaya
            handles supply, installation, design and maintenance so you have one contract, one
            contact, one timeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service cards ─────────────────────────── */}
      <section className="container-page py-16">
        <div className="space-y-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const isEven = idx % 2 === 1;
            return (
              <div
                key={s.id}
                id={s.id}
                className="surface-card grid gap-8 overflow-hidden p-8 md:grid-cols-12 md:p-12"
              >
                {/* number + icon side */}
                <div className={`md:col-span-4 ${isEven ? "md:order-2" : ""}`}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-peach-soft/70 text-terracotta">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <div className="font-display text-5xl text-terracotta/30">{s.label}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {s.tagline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* content side */}
                <div className={`md:col-span-8 ${isEven ? "md:order-1" : ""}`}>
                  <h2 className="font-display text-4xl md:text-5xl">{s.title}</h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">{s.body}</p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={s.ctaTo}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:underline"
                  >
                    {s.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section className="container-page py-16">
        <div
          className="surface-card p-10 md:p-14"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--peach-soft) 0%, var(--surface) 60%)",
          }}
        >
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            How it works
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Three steps from brief to handover
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.n}>
                <div className="font-display text-5xl text-terracotta">{p.n}</div>
                <div className="mt-3 font-display text-2xl">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="container-page pb-24">
        <div className="surface-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">Ready to start your project?</h3>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Send us your room count, location and timeline. We'll respond within 48 hours with a
              full proposal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
