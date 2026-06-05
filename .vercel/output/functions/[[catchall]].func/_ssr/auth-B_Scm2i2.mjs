import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useAuth, R as Route$7 } from "./router-hieTueYT.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lucide-react.mjs";
function AuthPage() {
  const {
    login,
    register,
    user
  } = useAuth();
  const {
    redirect
  } = Route$7.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (user) navigate({
      to: redirect || "/"
    });
  }, [user, redirect, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (mode === "login") await login(email, password);
      else await register(name, email, password);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid min-h-[80vh] place-items-center py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-line bg-surface shadow-warm md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-col justify-between bg-foreground p-12 text-background md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-display text-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-terracotta", children: "◆" }),
          " provisto"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl italic leading-tight", children: [
            "Hotel supply,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "without the friction."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-background/70", children: "One account, every order. Bulk pricing applied automatically." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-background/50", children: "by kaya.rent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-full border border-line bg-background p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("login"), className: "rounded-full px-4 py-1.5 text-sm transition-colors " + (mode === "login" ? "bg-foreground text-background" : "text-muted-foreground"), children: "Sign in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("register"), className: "rounded-full px-4 py-1.5 text-sm transition-colors " + (mode === "register" ? "bg-foreground text-background" : "text-muted-foreground"), children: "Create account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-4xl", children: mode === "login" ? "Welcome back." : "Create your account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "login" ? "Sign in to view orders and reorder." : "Get bulk pricing and order history." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-8 space-y-4", children: [
          mode === "register" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), required: true, className: "auth-input", placeholder: "Jane Doe" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "auth-input", placeholder: "you@hotel.com" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "auth-input", placeholder: "••••••••" }) }),
          err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive", children: err }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, className: "btn-primary w-full disabled:opacity-60", children: busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.auth-input{width:100%;border:1px solid var(--line);background:var(--background);border-radius:12px;padding:.75rem 1rem;font-size:.95rem;outline:none;transition:border-color .15s ease}.auth-input:focus{border-color:var(--terracotta)}` })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
export {
  AuthPage as component
};
