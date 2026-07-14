import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "../lib/auth";
import { MegaNav } from "../components/MegaNav";
import { Footer } from "../components/Footer";
import { useInitTheme } from "../components/ThemeSwitcher";
import { Toaster } from "sonner";



function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl text-terracotta">404</div>
        <h2 className="mt-4 font-display text-3xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That route doesn't exist. Let's get you back to the catalog.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-ghost">
            Home
          </Link>
          <Link to="/products" className="btn-primary">
            Browse supplies
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went sideways</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "Try again, or head back home."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kaya — Hotel Solutions, end to end" },
      {
        name: "description",
        content:
          "Kaya supplies, installs and outfits hotels worldwide — furniture, linens, bathroom, kitchen, lighting, security and more. Request a free quote.",
      },
      { property: "og:title", content: "Kaya — Hotel Solutions, end to end" },
      {
        property: "og:description",
        content:
          "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kaya — Hotel Solutions, end to end" },
      {
        name: "twitter:description",
        content:
          "Furniture, linens, bathroom, kitchen, lighting, security — every supply a hotel needs, from one partner.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useInitTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <MegaNav />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--surface)",
                color: "var(--foreground)",
                border: "1px solid var(--line)",
                borderRadius: "14px",
              },
            }}
          />
      </AuthProvider>
    </QueryClientProvider>
  );
}
