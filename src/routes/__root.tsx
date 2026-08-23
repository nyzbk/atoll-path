import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
import { AdSense } from "@/components/adsense";
import { PAGES, SITE_NAME } from "@/lib/maldives/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: PAGES.home.title },
      { name: "description", content: PAGES.home.description },
      { name: "theme-color", content: "#071314" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "google-adsense-account", content: "ca-pub-7636435144500691" },
      {
        name: "keywords",
        content:
          "работа на Мальдивах, Maldives jobs without agency, work permit Maldives, Xpat, Entry Pass, Work e-Visa, прямой найм резорт",
      },
      { name: "application-name", content: SITE_NAME },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="ru" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AdSense />
        <AuthProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
