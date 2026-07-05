import { createFileRoute } from "@tanstack/react-router";
import { fetchYouTubeMeta } from "@/lib/youtube";

export const Route = createFileRoute("/api/youtube-meta")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url).searchParams.get("url");
        if (!url) {
          return Response.json({ error: "Missing url parameter" }, { status: 400 });
        }

        try {
          const meta = await fetchYouTubeMeta(url);
          return Response.json(meta, {
            headers: { "Cache-Control": "public, max-age=3600" },
          });
        } catch {
          return Response.json({ error: "Failed to fetch YouTube metadata" }, { status: 502 });
        }
      },
    },
  },
});
