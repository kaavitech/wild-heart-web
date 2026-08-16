import { useEffect, useState } from "react";
import type { InstagramReel } from "@/lib/instagram";
import { getFieldInstagramReels, FIELD_INSTAGRAM_REELS } from "@/lib/field-stories-data";
import { InstagramStoryCard } from "@/components/site/InstagramStoryCard";
import { Reveal } from "@/components/site/Reveal";

export function FieldInstagramReelsRow() {
  const [reels, setReels] = useState<InstagramReel[]>(() => getFieldInstagramReels());

  useEffect(() => {
    let cancelled = false;

    fetch("/api/instagram-field-reels")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: InstagramReel[]) => {
        if (!cancelled && data.length > 0) setReels(data);
      })
      .catch(() => {
        // Keep bundled fallback reels when the live API is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="scrollbar-hide -mx-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 md:-mx-10 md:px-10">
      <div className="flex w-max gap-4 pr-4 sm:gap-5">
        {reels.map((reel, i) => (
          <div key={reel.shortcode || reel.url} className="w-52 shrink-0 sm:w-56">
            <Reveal dir="up" delay={Math.min(i * 0.04, 0.4)} className="h-full">
              <InstagramStoryCard
                reel={reel}
                category={FIELD_INSTAGRAM_REELS[i]?.category ?? "Field Notes"}
              />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
