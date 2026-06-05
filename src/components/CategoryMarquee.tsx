import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";

/** Auto-scrolling, pause-on-hover marquee of category tiles. Direction can reverse. */
export function CategoryMarquee({ reverse = false }: { reverse?: boolean }) {
  const list = [...categories, ...categories]; // duplicate for seamless loop
  return (
    <div className="kaya-marquee group relative overflow-hidden">
      <div className={"kaya-marquee-track flex gap-5 " + (reverse ? "kaya-marquee-reverse" : "")}>
        {list.map((c, i) => (
          <Link
            key={c.slug + "-" + i}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="surface-card group/card relative w-[300px] shrink-0 overflow-hidden transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-peach-soft/60">
              <img src={c.cover} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover/card:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">{c.short}</div>
                <div className="font-display text-xl">{c.name}</div>
              </div>
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

