import { createFileRoute } from "@tanstack/react-router";
import { isInstagramCdnUrl } from "@/lib/instagram-image";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const Route = createFileRoute("/api/instagram-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const src = new URL(request.url).searchParams.get("src");
        if (!src || !isInstagramCdnUrl(src)) {
          return new Response("Invalid image source", { status: 400 });
        }

        try {
          const res = await fetch(src, {
            headers: {
              "User-Agent": USER_AGENT,
              Referer: "https://www.instagram.com/",
              Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            },
            redirect: "follow",
          });

          if (!res.ok) {
            return new Response("Image unavailable", { status: 502 });
          }

          const contentType = res.headers.get("content-type") ?? "image/jpeg";
          const bytes = await res.arrayBuffer();

          return new Response(bytes, {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
            },
          });
        } catch {
          return new Response("Image fetch failed", { status: 502 });
        }
      },
    },
  },
});
