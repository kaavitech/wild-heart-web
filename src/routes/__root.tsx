import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NisargBaithakFloatingPromo } from "@/components/site/NisargBaithakFloatingPromo";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import {
  CONTACT,
  DEFAULT_SHARE_IMAGE,
  REGISTRATION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_URLS,
} from "@/lib/site-config";

// schema.org data so Google can show the foundation's details in search results.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}${DEFAULT_SHARE_IMAGE}`,
  description:
    "Nagpur-based non-profit connecting children with nature through school programs, nature walks, wildlife awareness and community action.",
  email: CONTACT.email,
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  taxID: REGISTRATION.pan,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.locality,
    postalCode: CONTACT.address.postalCode,
    addressRegion: CONTACT.address.state,
    addressCountry: CONTACT.address.country,
  },
  areaServed: "Nagpur, Maharashtra, India",
  sameAs: Object.values(SOCIAL_URLS),
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-primary">404</h1>
        <p className="mt-4 text-muted-foreground">This trail doesn't exist. Let's head back to the forest.</p>
        <Link to="/" className="btn-primary mt-6">Return Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-primary">Something stirred in the underbrush</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-gold">Go home</a>
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
      { title: "Wild Agile Foundation | Building an Environment-Conscious Generation" },
      { name: "description", content: "Wild Agile Foundation connects children with nature through education, wildlife awareness, and community programs." },
      { name: "author", content: "Wild Agile Foundation" },
      { property: "og:title", content: "Wild Agile Foundation" },
      { property: "og:description", content: "Building an environment-conscious generation through nature, wildlife, and education." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: `${SITE_URL}${DEFAULT_SHARE_IMAGE}` },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_JSON_LD) },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Poppins:wght@500;600;700&display=swap",
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
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <NisargBaithakFloatingPromo />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
