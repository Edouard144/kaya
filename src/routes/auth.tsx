import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/",
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Kaya" },
      { name: "description", content: "Sign in to view orders, reorder, and get bulk pricing." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register, user } = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate({ to: "/admin/dashboard" });
      else navigate({ to: redirect || "/" });
    }
  }, [user, redirect, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (mode === "login") await login(email, password);
      else await register(name, email, password);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-page grid min-h-[80vh] place-items-center py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-line bg-surface shadow-warm md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-foreground p-12 text-background md:flex">
          <div className="flex items-center gap-2 font-display text-2xl">
            <span className="text-terracotta">◆</span> Kaya
          </div>
          <div>
            <h1 className="font-display text-5xl italic leading-tight">
              Hotel supply,
              <br />
              without the friction.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-background/70">
              One account, every order. Bulk pricing applied automatically.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-background/50">by kaya.rent</div>
        </div>

        <div className="p-10 md:p-12">
          <div className="inline-flex rounded-full border border-line bg-background p-1">
            <button
              onClick={() => setMode("login")}
              className={
                "rounded-full px-4 py-1.5 text-sm transition-colors " +
                (mode === "login" ? "bg-foreground text-background" : "text-muted-foreground")
              }
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("register")}
              className={
                "rounded-full px-4 py-1.5 text-sm transition-colors " +
                (mode === "register" ? "bg-foreground text-background" : "text-muted-foreground")
              }
            >
              Create account
            </button>
          </div>

          <h2 className="mt-6 font-display text-4xl">
            {mode === "login" ? "Welcome back." : "Create your account."}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to view orders and reorder."
              : "Get bulk pricing and order history."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "register" && (
              <Field label="Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="auth-input"
                  placeholder="Jane Doe"
                />
              </Field>
            )}
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
                placeholder="you@hotel.com"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="auth-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  )}
                </button>
              </div>
            </Field>
            {err && <div className="text-sm text-destructive">{err}</div>}
            <button disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
      <style>{`.auth-input{width:100%;border:1px solid var(--line);background:var(--background);border-radius:12px;padding:.75rem 1rem;font-size:.95rem;outline:none;transition:border-color .15s ease}.auth-input:focus{border-color:var(--terracotta)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
