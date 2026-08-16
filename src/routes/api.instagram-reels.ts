import { createFileRoute } from "@tanstack/react-router";
import { enrichReelThumbnails, fetchInstagramReels } from "@/lib/instagram";
import { getFallbackInstagramReels, INSTAGRAM_USERNAME } from "@/lib/instagram-fallback";

export const Route = createFileRoute("/api/instagram-reels")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const username =
          new URL(request.url).searchParams.get("username")?.trim() || INSTAGRAM_USERNAME;

        try {
          const reels = await fetchInstagramReels(username);
          if (reels.length > 0) {
            const enriched = await enrichReelThumbnails(reels, username);
            return Response.json(enriched, {
              headers: { "Cache-Control": "public, max-age=1800" },
            });
          }
        } catch {
          // Fall through to bundled reels when Instagram blocks the server request.
        }

        const fallback = await enrichReelThumbnails(getFallbackInstagramReels(), username);

        return Response.json(fallback, {
          headers: { "Cache-Control": "public, max-age=300" },
        });
      },
    },
  },
});
