import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Kaya" },
      {
        name: "description",
        content:
          "Tell us about your hotel project — Kaya responds with a tailored quote within 48 hours.",
      },
      { property: "og:title", content: "Request a Quote — Kaya" },
      {
        property: "og:description",
        content: "Tailored hospitality supply quotes within 48 hours.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="container-page py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-terracotta" />
        <h1 className="mt-4 font-display text-4xl">Quote request received</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thanks — a member of our team will be in touch within 48 hours with a tailored quote.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Request a quote
      </div>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Tell us about your project</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Share a few details and we'll respond within 48 hours with a tailored proposal — no
        obligation.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-10 grid gap-10 md:grid-cols-3"
      >
        <div className="surface-card space-y-4 p-6 md:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <input className="field" required />
            </Field>
            <Field label="Company / property" required>
              <input className="field" required />
            </Field>
            <Field label="Email" required>
              <input type="email" className="field" required />
            </Field>
            <Field label="Phone">
              <input className="field" />
            </Field>
            <Field label="Country / city">
              <input className="field" placeholder="Tbilisi, Georgia" />
            </Field>
            <Field label="Number of rooms / units">
              <input type="number" className="field" placeholder="80" />
            </Field>
          </div>
          <Field label="Project type">
            <select className="field" defaultValue="">
              <option value="">Select…</option>
              <option>New build hotel</option>
              <option>Renovation / refurbishment</option>
              <option>Single-category supply</option>
              <option>Restaurant / F&B</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Categories of interest">
            <textarea
              className="field min-h-[80px]"
              placeholder="e.g. Guest rooms, bathroom, lighting"
            />
          </Field>
          <Field label="Project details / timeline">
            <textarea
              className="field min-h-[140px]"
              required
              placeholder="Tell us scope, target opening date, anything important…"
            />
          </Field>
          <button className="btn-primary w-full">Send quote request</button>
        </div>

        <aside className="space-y-4">
          <div className="surface-card p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              In your shortlist
            </div>
            <div className="mt-2 font-display text-2xl">
              {items.length} item{items.length === 1 ? "" : "s"}
            </div>
            {items.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm">
                {items.slice(0, 6).map((i) => (
                  <li key={i.productId} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-terracotta" />
                    <span className="truncate">{i.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">×{i.quantity}</span>
                  </li>
                ))}
                {items.length > 6 && (
                  <li className="text-xs text-muted-foreground">+ {items.length - 6} more</li>
                )}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                You can also build a shortlist from product pages — items appear here automatically.
              </p>
            )}
          </div>
          <div className="surface-card p-5 text-sm text-ink-soft">
            <div className="font-display text-lg">What happens next</div>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4">
              <li>We review your project</li>
              <li>A rep reaches out inside 48 hrs</li>
              <li>You receive a tailored quote</li>
            </ol>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
    </label>
  );
}
