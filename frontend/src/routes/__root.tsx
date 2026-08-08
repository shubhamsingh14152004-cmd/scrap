import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Toaster } from "../components/ui/sonner";
import { FloatingContact } from "../components/common/FloatingContact";
import { JsonLdSchema } from "../components/seo/JsonLdSchema";
import { SplashScreen } from "../components/common/SplashScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
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
      { title: "My Scrap Buddy – Scrap & E-Waste Recycling" },
      {
        name: "description",
        content:
          "Book doorstep scrap pickup in Mumbai for paper, plastic, metal, e-waste, office scrap, construction scrap and bulk recycling. Government authorized recycler with instant payment and transparent pricing.",
      },
      {
        name: "keywords",
        content:
          "scrap buyer Mumbai, doorstep scrap pickup, scrap collection Mumbai, e-waste recycling Mumbai, plastic recycling, paper recycling, metal scrap buyer, office scrap pickup, construction scrap buyer, old furniture recycling, My Scrap Buddy",
      },
      { name: "author", content: "My Scrap Buddy" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0f4a28" },
      { name: "msapplication-TileColor", content: "#0f4a28" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "My Scrap Buddy – Scrap & E-Waste Recycling" },
      {
        property: "og:description",
        content:
          "Book doorstep scrap pickup in Mumbai for paper, plastic, metal, e-waste, office scrap, construction scrap and bulk recycling. Government authorized recycler with instant payment and transparent pricing.",
      },
      { property: "og:url", content: "https://scrapbuddy.org" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "My Scrap Buddy — Mumbai's Trusted Doorstep Scrap & E-Waste Pickup" },
      { property: "og:locale", content: "en_IN" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@myscrapbuddy" },
      { name: "twitter:title", content: "My Scrap Buddy – Scrap & E-Waste Recycling" },
      {
        name: "twitter:description",
        content:
          "Book doorstep scrap pickup in Mumbai for paper, plastic, metal, e-waste, office scrap, construction scrap and bulk recycling. Government authorized recycler with instant payment and transparent pricing.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:image:alt", content: "My Scrap Buddy — Mumbai's Trusted Doorstep Scrap & E-Waste Pickup" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://scrapbuddy.org" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap",
      },
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
        <JsonLdSchema />
      </head>
      <body>
        <div
          id="static-splash"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "#020617",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="My Scrap Buddy"
            style={{ width: "160px", height: "auto", maxHeight: "200px", objectFit: "contain" }}
          />
        </div>
        <SplashScreen />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
      <FloatingContact />
    </QueryClientProvider>
  );
}
