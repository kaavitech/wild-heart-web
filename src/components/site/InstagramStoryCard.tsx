import { ArrowRight } from "lucide-react";
import type { InstagramReel as InstagramReelData } from "@/lib/instagram";
import { InstagramReel } from "@/components/site/InstagramReel";

type InstagramStoryCardProps = {
  reel: InstagramReelData;
  category?: string;
};

export function InstagramStoryCard({ reel, category = "Field Story" }: InstagramStoryCardProps) {
  const description = reel.caption || "Watch our latest moments from the field on Instagram.";

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-border/50 bg-white transition-transform duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="relative shrink-0 overflow-hidden">
        <div className="h-56 w-full sm:h-60">
          <InstagramReel
            url={reel.url}
            title={reel.title}
            thumbnailUrl={reel.thumbnailUrl}
            videoUrl={reel.videoUrl}
          />
        </div>
        <span className="category-badge absolute left-3 top-3 text-[10px]">{category}</span>
      </div>
      <div className="flex flex-col p-3.5">
        <div className="meta-label text-[10px]">Instagram · {reel.author}</div>
        <h3 className="mt-1.5 line-clamp-1 font-serif text-base leading-snug text-primary">{reel.title}</h3>
        <p className="text-body mt-1 line-clamp-2 text-xs leading-relaxed">{description}</p>
        <a
          href={reel.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-secondary"
        >
          View on Instagram <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
