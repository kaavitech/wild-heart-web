import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { GA_MEASUREMENT_ID, isGaEnabled, trackPageView } from "@/lib/analytics";

/**
 * Loads gtag.js once and sends a page_view on every client-side route change.
 * Not linked from the public menu — open https://analytics.google.com to view reports.
 */
export function GoogleAnalytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const [ready, setReady] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isGaEnabled() || typeof document === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    // Must push the Arguments object — same contract as Google's official snippet.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // First page_view comes from our route effect so SPA navigations stay consistent.
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    setReady(true);

    return () => {
      setReady(false);
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!isGaEnabled() || !ready) return;

    const path = `${pathname}${search || ""}`;
    if (lastPath.current === path) return;
    lastPath.current = path;

    // Title updates after render; defer so document.title matches the new route.
    const id = window.setTimeout(() => {
      trackPageView(path);
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname, search, ready]);

  return null;
}
