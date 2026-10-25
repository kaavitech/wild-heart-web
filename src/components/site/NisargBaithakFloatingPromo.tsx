import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
  Ticket,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import {
  isNisargBaithakCampaignActive,
  NISARG_BAITHAK_BOOKING_URL,
  NISARG_BAITHAK_EVENT,
  NISARG_BAITHAK_IMAGES,
} from "@/lib/nisarg-baithak";

/** Remembers, for this browser tab, that the visitor already closed the big banner. */
const BANNER_DISMISSED_KEY = "nisarg-baithak-banner-dismissed";
const BANNER_DELAY_MS = 600;

function readBannerDismissed() {
  try {
    return window.sessionStorage.getItem(BANNER_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberBannerDismissed() {
  try {
    window.sessionStorage.setItem(BANNER_DISMISSED_KEY, "1");
  } catch {
    // Storage can be blocked (private mode); the banner just shows again next load.
  }
}

export function NisargBaithakFloatingPromo() {
  const campaignActive = useMemo(() => isNisargBaithakCampaignActive(), []);
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const event = NISARG_BAITHAK_EVENT;
  const poster = NISARG_BAITHAK_IMAGES[0];

  // Decide on the client only, so the server render and hydration always agree.
  useEffect(() => {
    setMounted(true);
    if (!campaignActive || readBannerDismissed()) return;
    const id = window.setTimeout(() => setBannerOpen(true), BANNER_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [campaignActive]);

  if (!campaignActive || !mounted) return null;

  const handleBannerChange = (open: boolean) => {
    setBannerOpen(open);
    if (!open) rememberBannerDismissed();
  };

  const openDetails = () => {
    handleBannerChange(false);
    setDetailsOpen(true);
  };

  return (
    <>
      <Dialog open={bannerOpen} onOpenChange={handleBannerChange}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-h-[92vh] max-w-[min(94vw,56rem)] gap-0 overflow-y-auto border-0 p-0 sm:rounded-3xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:overflow-hidden [&>button]:z-10 [&>button]:grid [&>button]:h-9 [&>button]:w-9 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:opacity-100 [&>button]:shadow-md"
        >
          <div className="flex items-center justify-center bg-[var(--cream)]/60 p-4 sm:p-5 md:p-6">
            <button
              type="button"
              onClick={openDetails}
              aria-label="View Nisarg Baithak event details"
              className="group block rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]/50"
            >
              <img
                src={poster.src}
                alt={poster.alt}
                className="mx-auto max-h-[46vh] w-auto rounded-2xl object-contain shadow-[0_16px_48px_-16px_rgba(46,94,78,0.45)] transition-transform duration-300 group-hover:scale-[1.01] md:max-h-[78vh]"
              />
            </button>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Nisarg Baithak · {event.sessionLabel}
            </span>
            <DialogTitle className="mt-4 font-serif text-3xl leading-tight text-primary md:text-4xl">
              {event.topic}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-foreground/85">
              {event.subtitle}
            </DialogDescription>
            <p className="mt-2 text-sm italic text-muted-foreground">
              {event.tagline}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-foreground/90">
              <li className="flex gap-3">
                <Calendar
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                  aria-hidden
                />
                {event.dateLabel}
              </li>
              <li className="flex gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                  aria-hidden
                />
                {event.timeLabel}
              </li>
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                  aria-hidden
                />
                {event.venueShort}
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={NISARG_BAITHAK_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Ticket className="h-4 w-4" />
                Book your seat
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
              <button
                type="button"
                onClick={openDetails}
                className="btn-gold inline-flex items-center gap-2 text-sm"
              >
                View event details <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {event.bookingNote}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {!bannerOpen && (
        <button
          type="button"
          onClick={() => setBannerOpen(true)}
          aria-label="Show Nisarg Baithak event"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_12px_32px_-8px_rgba(46,94,78,0.55)] ring-4 ring-background transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/40 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
        >
          <img
            src={poster.src}
            alt={poster.alt}
            className="h-full w-full object-cover object-top"
          />
        </button>
      )}

      <NisargBaithakEventDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
