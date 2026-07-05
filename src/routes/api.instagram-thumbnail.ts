import { createFileRoute } from "@tanstack/react-router";
import {
  enrichReelThumbnails,
  extractReelShortcode,
  fetchProfileThumbnailMap,
} from "@/lib/instagram";
import { INSTAGRAM_USERNAME } from "@/lib/instagram-fallback";

export const Route = createFileRoute("/api/instagram-thumbnail")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url).searchParams.get("url");
        if (!url) {
          return Response.json({ error: "Missing url parameter" }, { status: 400 });
        }

        const shortcode = extractReelShortcode(url);
        if (!shortcode) {
          return Response.json({ thumbnailUrl: "" });
        }

        try {
          const thumbnails = await fetchProfileThumbnailMap(INSTAGRAM_USERNAME);
          const thumbnailUrl = thumbnails.get(shortcode) ?? "";

          return Response.json(
            { thumbnailUrl },
            { headers: { "Cache-Control": "public, max-age=86400" } },
          );
        } catch {
          return Response.json({ thumbnailUrl: "" });
        }
      },
    },
  },
});
