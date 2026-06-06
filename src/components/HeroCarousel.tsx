import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import lobby from "@/assets/hero-lobby.jpg";
import suite from "@/assets/hero-suite.jpg";
import bathroom from "@/assets/hero-bathroom.jpg";
import restaurant from "@/assets/hero-restaurant.jpg";
import pool from "@/assets/hero-pool.jpg";

type Slide = {
  eyebrow: string;
  title: string;
  italic: string;
  body: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Reception & Lobby",
    title: "Set the tone from the",
    italic: "first step inside.",
    body: "Reception desks, lobby sofas, chandeliers and the small details that signal quality the moment a guest arrives.",
    ctaLabel: "See Reception & Lobby",
    ctaTo: "/category/reception-lobby",
    image: lobby,
  },
  {
    eyebrow: "Guest Rooms",
    title: "Beds, linens and joinery,",
    italic: "specced for daily turnover.",
    body: "Hospitality-grade beds, wardrobes, sheets and towels — built to survive industrial laundering and years of guests.",
    ctaLabel: "Explore Guest Rooms",
    ctaTo: "/category/guest-room-furniture",
    image: suite,
  },
  {
    eyebrow: "Bathroom Solutions",
    title: "Bathrooms that feel like",
    italic: "private spa retreats.",
    body: "Marble vanities, brass fixtures, freestanding tubs and amenity sets — supplied and installed.",
    ctaLabel: "See Bathroom Solutions",
    ctaTo: "/category/bathroom-solutions",
    image: bathroom,
  },
  {
    eyebrow: "Restaurant & Kitchen",
    title: "Dining rooms ready for",
    italic: "service from day one.",
    body: "Tables, chairs, glassware, cutlery and commercial kitchen equipment — one supplier, one timeline.",
    ctaLabel: "Outfit your restaurant",
    ctaTo: "/category/restaurant-dining",
    image: restaurant,
  },
  {
    eyebrow: "Outdoor & Pool",
    title: "Sun, water and",
    italic: "weather-proof comfort.",
    body: "Loungers, umbrellas, gazebos and pool equipment built to handle salt, sun and the back half of the season.",
    ctaLabel: "See Outdoor & Pool",
    ctaTo: "/category/outdoor-pool",
    image: pool,
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [auto]);

  const go = (n: number) => { setI((n + slides.length) % slides.length); setAuto(false); };

  return (
    <section className="w-full pt-0 pb-0">
      <div
        className="relative overflow-hidden border-b border-line/60 shadow-warm"
        onMouseEnter={() => setAuto(false)}
        onMouseLeave={() => setAuto(true)}
      >
        {/* slide stack */}
        <div className="relative h-[70vh] min-h-[560px] md:h-[80vh] md:min-h-[640px]">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={"absolute inset-0 transition-opacity duration-1000 " + (idx === i ? "opacity-100" : "opacity-0 pointer-events-none")}
              aria-hidden={idx !== i}
            >
              <img
                src={s.image}
                alt={s.eyebrow}
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority={idx === 0 ? "high" : "auto"}
              />
              {/* base dark scrim so bright images don't blow out */}
              {/* <div className="absolute inset-0 bg-foreground/30" /> */}
              {/* directional gradient for text legibility on the left/bottom */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/55 to-background/70" /> */}
              <div className="relative grid h-full gap-10 px-6 py-10 md:grid-cols-12 md:px-10 md:py-14 xl:px-16">
                <div className="flex flex-col justify-between md:col-span-7">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-background/80 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    {s.eyebrow}
                  </div>
                  <div>
                    <h1 className="font-display text-5xl leading-[0.95] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-7xl lg:text-[5.5rem]">
                      {s.title}<br />
                      <span className="italic text-terracotta drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">{s.italic}</span>
                    </h1>
                    <p className="mt-6 max-w-xl rounded-xl bg-black/40 px-4 py-3 text-base text-white backdrop-blur-sm md:text-lg">{s.body}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to={s.ctaTo} className="btn-primary inline-flex items-center gap-2">
                        {s.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link to="/quote" className="btn-ghost">Request a quote</Link>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-col justify-end md:col-span-5 md:flex">
                  <div className="surface-card p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Featured set · {String(idx + 1).padStart(2, "0")} of {String(slides.length).padStart(2, "0")}</div>
                    <div className="mt-2 font-display text-2xl">{s.eyebrow}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.body.slice(0, 100)}…</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 md:bottom-8 md:right-8">
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous slide"
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-background/85 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next slide"
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-background/85 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* progress */}
        <div className="absolute bottom-8 left-7 z-10 flex items-center gap-1.5 md:left-14">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={"h-1.5 rounded-full transition-all " + (idx === i ? "w-10 bg-terracotta" : "w-5 bg-foreground/25 hover:bg-foreground/45")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

