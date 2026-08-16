import { useMemo, useState } from "react";
import { Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isNisargBaithakCampaignActive,
  NISARG_BAITHAK_IMAGES,
} from "@/lib/nisarg-baithak";

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
          aria-label="Show Nisarg Baithak event posters"
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="View Nisarg Baithak event posters"
            className="h-[20.25rem] w-[15rem] overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_16px_40px_-8px_rgba(46,94,78,0.6)] ring-4 ring-background transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/40 sm:h-[23.25rem] sm:w-[17.25rem] animate-float-b"
          >
            <img
              src={thumbnail.src}
              alt={thumbnail.alt}
              className="h-full w-full object-cover object-top"
            />
          </button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,56rem)] gap-0 border-border/70 p-4 sm:p-6">
          <DialogHeader className="pb-4 text-left">
            <DialogTitle className="font-serif text-2xl text-primary sm:text-3xl">
              Nisarg Baithak
            </DialogTitle>
            <DialogDescription>
              22 August 2026 · 5–7 PM · Free entry — scan the QR code on the poster to register.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {NISARG_BAITHAK_IMAGES.map(({ src, alt }, index) => (
              <div
                key={src}
                className={`aspect-[3/4] w-[calc(50%-0.375rem)] overflow-hidden rounded-2xl border border-border/50 bg-white shadow-[0_16px_48px_-16px_rgba(46,94,78,0.35)] ring-1 ring-black/[0.04] sm:w-[calc(50%-0.625rem)] ${
                  index === 1 ? "translate-y-4 sm:translate-y-6 md:translate-y-8" : ""
                }`}
              >
                <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
