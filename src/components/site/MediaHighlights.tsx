import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ClippingViewer } from "@/components/site/ClippingViewer";
import {
  MEDIA_CLIPPING_COUNT,
  MEDIA_OUTLETS,
  MEDIA_STORIES,
  clippingSrc,
  type MediaStory,
} from "@/lib/media-data";

const SEEN_KEY = "wa-media-stories-seen";

function readSeen(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Home-page "In the media" row: Instagram-style highlight circles, newest first.
 * Tapping a circle opens that story's newspaper clippings in a popup.
 * The ring turns grey once a visitor has opened a story (remembered in this browser).
 */
export function MediaHighlights() {
  const stories = [...MEDIA_STORIES].sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  const [story, setStory] = useState<MediaStory | null>(null);
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);

  useEffect(() => setSeen(readSeen()), []);

  const open = (s: MediaStory) => {
    setStory(s);
    setIndex(0);
    if (!seen.includes(s.id)) {
      const next = [...seen, s.id];
      setSeen(next);
      try {
        localStorage.setItem(SEEN_KEY, JSON.stringify(next));
      } catch {
        // Private mode or blocked storage: the ring just stays coloured.
      }
    }
  };

  return (
    <section className="section-pad relative bg-gradient-to-b from-[var(--cream)]/70 to-background">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="In the Media"
            title={<>Making news for nature.</>}
            subtitle={`${MEDIA_CLIPPING_COUNT} reports in ${MEDIA_OUTLETS.length} publications. Tap a story to read the clippings.`}
          />
          <Reveal>
            <Link to="/media" className="btn-primary">
              All coverage <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="-mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 pb-4 pt-1 [scrollbar-width:thin] sm:gap-7">
            {stories.map((s) => {
              const isSeen = seen.includes(s.id);
              return (
                <li key={s.id} className="snap-start">
                  <button
                    type="button"
                    onClick={() => open(s)}
                    aria-label={`${s.title}, ${s.date}: ${s.clippings.length} clippings`}
                    className="group flex w-[84px] flex-col items-center gap-2 focus:outline-none sm:w-[100px]"
                  >
                    <span
                      className={`grid h-[84px] w-[84px] place-items-center rounded-full p-[3px] transition-transform group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[var(--gold)]/50 sm:h-[100px] sm:w-[100px] ${
                        isSeen
                          ? "bg-border"
                          : "bg-[conic-gradient(from_210deg,var(--gold),#e8893a,#2e5e4e,#7fb069,var(--gold))]"
                      }`}
                    >
                      <span className="block h-full w-full overflow-hidden rounded-full border-[3px] border-background bg-white">
                        <img
                          src={clippingSrc(s.clippings[0]).thumb}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </span>
                    </span>
                    <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-foreground/80">
                      {s.short}
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="snap-start">
              <Link to="/media" className="group flex w-[84px] flex-col items-center gap-2 sm:w-[100px]">
                <span className="grid h-[84px] w-[84px] place-items-center rounded-full border-2 border-dashed border-primary/40 text-primary transition-transform group-hover:scale-105 sm:h-[100px] sm:w-[100px]">
                  <Newspaper className="h-7 w-7" />
                </span>
                <span className="text-center text-xs font-medium leading-tight text-foreground/80">See all</span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>

      <ClippingViewer
        story={story}
        index={index}
        onIndex={setIndex}
        onClose={() => setStory(null)}
        onNextStory={() => {
          const i = story ? stories.findIndex((s) => s.id === story.id) : -1;
          if (i >= 0 && i < stories.length - 1) open(stories[i + 1]);
          else setStory(null);
        }}
        onPrevStory={() => {
          const i = story ? stories.findIndex((s) => s.id === story.id) : -1;
          if (i > 0) {
            const prev = stories[i - 1];
            open(prev);
            setIndex(prev.clippings.length - 1);
          }
        }}
      />
    </section>
  );
}
