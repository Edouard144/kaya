import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Download, FileText } from "lucide-react";

export function Footer() {
  const cats = categories.slice(0, 10);
  return (
    <footer className="mt-24 border-t border-line/60 bg-surface-alt">
      <div className="w-full px-6 xl:px-10 grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Kaya is a complete hotel solutions partner. From a single linen order to a 200-room
            fit-out — sourced, delivered and installed across Georgia and beyond.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-ink-soft"><MapPin className="h-4 w-4 text-terracotta" /> Tbilisi, Georgia</div>
            <a href="tel:+995000000000" className="flex items-center gap-2 text-ink-soft hover:text-terracotta"><Phone className="h-4 w-4 text-terracotta" /> +995 000 000 000</a>
            <a href="mailto:hello@kaya.rent" className="flex items-center gap-2 text-ink-soft hover:text-terracotta"><Mail className="h-4 w-4 text-terracotta" /> hello@kaya.rent</a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/quote" className="btn-primary inline-flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /> Request quote</Link>
            <a href="#" className="btn-ghost inline-flex items-center gap-2 text-sm"><Download className="h-4 w-4" /> Catalog PDF</a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Categories</div>
          <ul className="mt-3 space-y-2 text-sm">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="text-ink-soft hover:text-terracotta">
                  {c.name}
                </Link>
              </li>
            ))}
            <li><Link to="/products" className="text-terracotta hover:underline">View all →</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-ink-soft hover:text-terracotta">About Kaya</Link></li>
            <li><Link to="/projects" className="text-ink-soft hover:text-terracotta">Projects</Link></li>
            <li><Link to="/industries" className="text-ink-soft hover:text-terracotta">Industries</Link></li>
            <li><Link to="/services" className="text-ink-soft hover:text-terracotta">Services</Link></li>
            <li><Link to="/contact" className="text-ink-soft hover:text-terracotta">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Stay in touch</div>
          <p className="mt-3 text-sm text-muted-foreground">
            New collections, project case studies and seasonal lookbooks — no spam.
          </p>
          <form className="mt-4 flex gap-2">
            <input type="email" required placeholder="you@hotel.com" className="field flex-1" />
            <button className="btn-primary text-sm">Subscribe</button>
          </form>
          <div className="mt-5 flex gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-line px-2.5 py-1">WhatsApp</span>
            <span className="rounded-full border border-line px-2.5 py-1">Instagram</span>
            <span className="rounded-full border border-line px-2.5 py-1">LinkedIn</span>
          </div>
        </div>
      </div>
      <div className="w-full px-6 xl:px-10 flex flex-col gap-2 border-t border-line/60 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Kaya Hotel Solutions. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
          <a href="https://kaya.rent" className="hover:text-ink">kaya.rent</a>
        </div>
      </div>
    </footer>
  );
}

