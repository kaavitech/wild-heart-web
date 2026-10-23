import { useMemo, useState } from "react";
import { Minus } from "lucide-react";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import { NisargBaithakPosterTile } from "@/components/site/NisargBaithakPosterTile";
import { isNisargBaithakCampaignActive, NISARG_BAITHAK_IMAGES } from "@/lib/nisarg-baithak";

export function NisargBaithakFloatingPromo() {
  const campaignActive = useMemo(() => isNisargBaithakCampaignActive(), []);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const thumbnail = NISARG_BAITHAK_IMAGES[0];

  if (!campaignActive) return null;

  return (
    <>
      {minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          aria-label="Show Nisarg Baithak event"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_12px_32px_-8px_rgba(46,94,78,0.55)] ring-4 ring-background transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/40 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
        >
          <img
            src={thumbnail.src}
            alt={thumbnail.alt}
            className="h-full w-full object-cover object-top"
          />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setMinimized(true);
            }}
            aria-label="Minimize Nisarg Baithak promo"
            className="absolute -right-2 -top-2 z-50 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 sm:h-9 sm:w-9"
          >
            <Minus className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <NisargBaithakPosterTile variant="floating" onClick={() => setOpen(true)} />
        </div>
      )}

      <NisargBaithakEventDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
