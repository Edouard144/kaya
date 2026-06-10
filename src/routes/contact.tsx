import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kaya" },
      {
        name: "description",
        content:
          "Reach Kaya — Tbilisi-based hotel solutions supplier serving Georgia and worldwide.",
      },
      { property: "og:title", content: "Contact — Kaya" },
      {
        property: "og:description",
        content: "Reach Kaya's hospitality team — quotes within 48 hours.",
      },
    ],
  }),
  component: () => (
    <div className="container-page py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact</div>
          <h1 className="mt-2 font-display text-5xl">Let's talk about your project</h1>
          <p className="mt-4 text-muted-foreground">
            Send us a note and we'll respond within one business day. For urgent quotes, call or
            WhatsApp directly.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-terracotta" /> Tbilisi, Georgia
            </div>
            <a href="tel:+995000000000" className="flex items-center gap-3 hover:text-terracotta">
              <Phone className="h-5 w-5 text-terracotta" /> +995 000 000 000
            </a>
            <a
              href="mailto:hello@kaya.rent"
              className="flex items-center gap-3 hover:text-terracotta"
            >
              <Mail className="h-5 w-5 text-terracotta" /> hello@kaya.rent
            </a>
          </div>
        </div>

        <form
          className="surface-card space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — we'll be in touch.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Your name" className="field" required />
            <input placeholder="Property / company" className="field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="email" placeholder="Email" className="field" required />
            <input placeholder="Phone" className="field" />
          </div>
          <textarea placeholder="How can we help?" className="field min-h-[140px]" required />
          <button className="btn-primary w-full">Send message</button>
        </form>
      </div>
    </div>
  ),
});
