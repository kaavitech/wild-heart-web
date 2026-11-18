import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { clippingSrc, type MediaStory } from "@/lib/media-data";

/** Full-screen viewer for one story's newspaper clippings, with keyboard and swipe-free arrows. */
export function ClippingViewer({
  story,
  index,
  onIndex,
  onClose,
  onNextStory,
  onPrevStory,
}: {
  story: MediaStory | null;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  /** When set, stepping past the last clipping moves to the next story (Instagram-style). */
  onNextStory?: () => void;
  onPrevStory?: () => void;
}) {
  const total = story?.clippings.length ?? 0;
  const go = useCallback(
    (delta: number) => {
      if (!total) return;
      const next = index + delta;
      if (next >= total && onNextStory) return onNextStory();
      if (next < 0 && onPrevStory) return onPrevStory();
      onIndex((next + total) % total);
    },
    [index, total, onIndex, onNextStory, onPrevStory],
  );

  useEffect(() => {
    if (!story) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [story, go, onClose]);

  const name = story?.clippings[index];

  return (
    <AnimatePresence>
      {story && name && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${story.title}: clipping ${index + 1} of ${total}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex flex-col bg-black/92 p-4 backdrop-blur"
        >
          {total > 1 && (
            <div className="mb-3 flex gap-1" aria-hidden onClick={(e) => e.stopPropagation()}>
              {story.clippings.map((c, i) => (
                <span key={c} className={`h-1 flex-1 rounded-full ${i <= index ? "bg-white" : "bg-white/30"}`} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <div className="truncate font-serif text-xl">{story.title}</div>
              <div className="text-xs text-white/60">
                {story.date} · {index + 1} of {total}
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <motion.img
              key={name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              src={clippingSrc(name).full}
              alt={`Newspaper clipping: ${story.title}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg bg-white object-contain shadow-2xl"
            />
            {(total > 1 || onNextStory) && (
              <>
                <button
                  aria-label="Previous clipping"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-0 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-4"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Next clipping"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-0 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-4"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
