// Google Analytics 4 — set VITE_GA_MEASUREMENT_ID in .env (local) or host env
// (Netlify / Cloudflare). Dashboard: https://analytics.google.com (not linked in the site menu).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 Measurement ID, e.g. G-XXXXXXXXXX. Empty when unset so tracking stays off in local/dev. */
export const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || "";

export function isGaEnabled() {
  return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

/** Record a SPA page view after client-side navigation. */
export function trackPageView(path: string, title?: string) {
  if (!isGaEnabled()) return;
  gtag("event", "page_view", {
    page_path: path,
    page_title: title || (typeof document !== "undefined" ? document.title : path),
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
  });
}
