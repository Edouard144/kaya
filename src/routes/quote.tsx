import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";

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
        <h1 className="mt-4 font-display text-4xl">Quote request sent</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thanks — we'll review your project and respond within 48 hours with a tailored quote.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to home
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = fd.get("name") || "";
    const company = fd.get("company") || "";
    const email = fd.get("email") || "";
    const phone = fd.get("phone") || "";
    const location = fd.get("location") || "";
    const rooms = fd.get("rooms") || "";
    const projectType = fd.get("projectType") || "";
    const categories = fd.get("categories") || "";
    const details = fd.get("details") || "";

    const subject = encodeURIComponent(`Quote Request — ${company || name}`);
    const body = encodeURIComponent(
      `Hi Kaya team,\n\n` +
      `I'd like to request a quote for the following project:\n\n` +
      `Name: ${name}\n` +
      `Company/Property: ${company}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Location: ${location}\n` +
      `Number of rooms/units: ${rooms}\n` +
      `Project type: ${projectType}\n` +
      `Categories of interest: ${categories}\n\n` +
      `Project details:\n${details}\n\n` +
      `Best regards,\n${name}`
    );

    window.open(`mailto:edouardtuyubahe@gmail.com?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  };

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

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6 md:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <input name="name" className="field" required />
            </Field>
            <Field label="Company / property" required>
              <input name="company" className="field" required />
            </Field>
            <Field label="Email" required>
              <input name="email" type="email" className="field" required />
            </Field>
            <Field label="Phone">
              <input name="phone" className="field" />
            </Field>
            <Field label="Country / city">
              <input name="location" className="field" placeholder="Tbilisi, Georgia" />
            </Field>
            <Field label="Number of rooms / units">
              <input name="rooms" type="number" className="field" placeholder="80" />
            </Field>
          </div>
          <Field label="Project type">
            <select name="projectType" className="field" defaultValue="">
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
              name="categories"
              className="field min-h-[80px]"
              placeholder="e.g. Guest rooms, bathroom, lighting"
            />
          </Field>
          <Field label="Project details / timeline">
            <textarea
              name="details"
              className="field min-h-[140px]"
              required
              placeholder="Tell us scope, target opening date, anything important…"
            />
          </Field>
          <button type="submit" className="btn-primary w-full">
            Send quote request
          </button>
        </form>

        <aside className="space-y-4">
          <a
            href="mailto:edouardtuyubahe@gmail.com"
            className="surface-card flex items-center gap-4 p-5 transition-colors hover:bg-surface-alt"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10">
              <Mail className="h-5 w-5 text-terracotta" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Email us</div>
              <div className="mt-0.5 text-sm font-medium">edouardtuyubahe@gmail.com</div>
            </div>
          </a>
          <a
            href="https://wa.me/995595213021"
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card flex items-center gap-4 p-5 transition-colors hover:bg-surface-alt"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">WhatsApp</div>
              <div className="mt-0.5 text-sm font-medium">+995 595 21 30 21</div>
            </div>
          </a>
          <div className="surface-card p-5 text-sm text-ink-soft">
            <div className="font-display text-lg">What happens next</div>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4">
              <li>We review your project</li>
              <li>A rep reaches out inside 48 hrs</li>
              <li>You receive a tailored quote</li>
            </ol>
          </div>
        </aside>
      </div>
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
