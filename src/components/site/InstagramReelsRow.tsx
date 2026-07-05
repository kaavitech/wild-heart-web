import { useEffect, useState } from "react";
import type { InstagramReel } from "@/lib/instagram";
import { getFallbackInstagramReels } from "@/lib/instagram-fallback";
import { InstagramStoryCard } from "@/components/site/InstagramStoryCard";
import { Reveal } from "@/components/site/Reveal";

export function InstagramReelsRow() {
  const [reels, setReels] = useState<InstagramReel[]>(() => getFallbackInstagramReels());

  useEffect(() => {
    let cancelled = false;

    fetch("/api/instagram-reels")
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
    <div className="relative mt-6">
      <div className="scrollbar-hide -mx-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 md:-mx-10 md:px-10">
        <div className="flex w-max gap-4 pr-4 sm:gap-5">
          {reels.map((reel, i) => (
            <div key={reel.shortcode} className="w-52 shrink-0 sm:w-56">
              <Reveal dir="up" delay={Math.min(i * 0.04, 0.4)} className="h-full">
                <InstagramStoryCard reel={reel} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
