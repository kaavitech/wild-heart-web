import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { YouTubeMeta } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";

type YouTubeStoryCardProps = {
  url: string;
  category: string;
  autoplay?: boolean;
  isShort?: boolean;
};

export function YouTubeStoryCard({
  url,
  category,
  autoplay = false,
  isShort = false,
}: YouTubeStoryCardProps) {
  const [meta, setMeta] = useState<YouTubeMeta | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/youtube-meta?url=${encodeURIComponent(url)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: YouTubeMeta | null) => {
        if (!cancelled && data) setMeta(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  const title = meta?.title ?? "Loading video…";
  const description = meta?.description ?? "Fetching video details…";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <div className={isShort ? "aspect-[9/16] w-full" : "aspect-video w-full"}>
          <YouTubeEmbed url={url} title={title} autoplay={autoplay} isShort={isShort} />
        </div>
        <span className="category-badge absolute left-4 top-4">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="meta-label">
          YouTube{meta?.author ? ` · ${meta.author}` : ""}
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-snug text-primary">{title}</h3>
        <p className="text-body mt-2 line-clamp-3">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary"
        >
          Watch on YouTube <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
