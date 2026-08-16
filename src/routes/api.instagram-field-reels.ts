import { createFileRoute } from "@tanstack/react-router";
import { enrichReelThumbnails } from "@/lib/instagram";
import { getFieldInstagramReels } from "@/lib/field-stories-data";
import { INSTAGRAM_USERNAME } from "@/lib/instagram-fallback";

export const Route = createFileRoute("/api/instagram-field-reels")({
  server: {
    handlers: {
      GET: async () => {
        const reels = await enrichReelThumbnails(getFieldInstagramReels(), INSTAGRAM_USERNAME);

        return Response.json(reels, {
          headers: { "Cache-Control": "public, max-age=1800" },
        });
      },
    },
  },
});
