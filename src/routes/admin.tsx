import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { seedAdmin } from "@/lib/fns/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Kaya" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!loading && user && user.role === "admin") {
      navigate({ to: "/admin/dashboard" });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
      </div>
    );
  }

  if (user && user.role !== "admin") {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Access denied</h1>
        <p className="mt-2 text-muted-foreground">You need an admin account to access this page.</p>
      </div>
    );
  }

  if (user && user.role === "admin") return <Outlet />;

  const handleSeed = async () => {
    setBusy(true);
    try {
      await seedAdmin();
      setSeeded(true);
      setErr(null);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await login(email, password);
      navigate({ to: "/admin/dashboard" });
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Admin</div>
          <h1 className="mt-2 font-display text-4xl">Sign in to dashboard</h1>
        </div>

        <div className="surface-card p-8">
          {!seeded && (
            <div className="mb-6 rounded-xl border border-terracotta/20 bg-terracotta/5 p-4 text-sm">
              <p className="font-medium text-terracotta">First time setup?</p>
              <p className="mt-1 text-muted-foreground">Click below to create the admin account.</p>
              <button
                onClick={handleSeed}
                disabled={busy}
                className="mt-3 rounded-lg bg-terracotta px-4 py-2 text-sm font-medium text-white hover:bg-terracotta/90 disabled:opacity-60"
              >
                {busy ? "Setting up…" : "Create admin account"}
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                placeholder="Jamarja.off@gmail.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                placeholder="••••••••"
              />
            </div>
            {err && <div className="text-sm text-destructive">{err}</div>}
            <button
              disabled={busy}
              className="btn-primary w-full disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
