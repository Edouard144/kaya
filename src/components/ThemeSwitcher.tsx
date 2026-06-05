import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { id: "warm", label: "Warm Clay", swatch: "#d97757" },
  { id: "noir", label: "Noir Gold", swatch: "#c9a84c" },
  { id: "ocean", label: "Deep Ocean", swatch: "#2d8a9e" },
  { id: "forest", label: "Forest", swatch: "#5a8a5c" },
] as const;
type ThemeId = (typeof THEMES)[number]["id"];

const KEY = "kaya_theme";

export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", id);
  try { window.localStorage.setItem(KEY, id); } catch { /* ignore */ }
}

export function useInitTheme() {
  useEffect(() => {
    try {
      const saved = (window.localStorage.getItem(KEY) as ThemeId | null) ?? "warm";
      applyTheme(saved);
    } catch { /* ignore */ }
  }, []);
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>("warm");

  useEffect(() => {
    try {
      const saved = (window.localStorage.getItem(KEY) as ThemeId | null) ?? "warm";
      setActive(saved);
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change color theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-surface"
      >
        <Palette className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-56 rounded-2xl border border-line bg-surface p-3 shadow-warm">
          <div className="px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Color theme
          </div>
          <div className="space-y-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { applyTheme(t.id); setActive(t.id); setOpen(false); }}
                className={
                  "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-surface-alt " +
                  (active === t.id ? "bg-surface-alt" : "")
                }
              >
                <span className="h-5 w-5 rounded-full border border-line/70" style={{ background: t.swatch }} />
                <span className="flex-1 text-left">{t.label}</span>
                {active === t.id && <span className="text-xs text-terracotta">●</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

