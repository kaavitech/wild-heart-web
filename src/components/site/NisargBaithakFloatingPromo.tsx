import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Languages,
  Sparkles,
  Ticket,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import {
  getCurrentNisargBaithakPriceTier,
  isNisargBaithakCampaignActive,
  NISARG_BAITHAK_BANNER,
  NISARG_BAITHAK_BOOKING_URL,
  NISARG_BAITHAK_EVENT,
  NISARG_BAITHAK_IMAGES,
} from "@/lib/nisarg-baithak";

const BANNER_DELAY_MS = 600;

/**
 * The big banner opens once per page load (a fresh visit or a refresh). Moving between
 * pages inside the site doesn't reopen it; the floating circle stays available instead.
 */
let bannerShownThisLoad = false;

export function NisargBaithakFloatingPromo() {
  const campaignActive = useMemo(() => isNisargBaithakCampaignActive(), []);
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const event = NISARG_BAITHAK_EVENT;
  const poster = NISARG_BAITHAK_IMAGES[0];
  const banner = NISARG_BAITHAK_BANNER;
  const tier = getCurrentNisargBaithakPriceTier();

  // Decide on the client only, so the server render and hydration always agree.
  useEffect(() => {
    setMounted(true);
    if (!campaignActive || bannerShownThisLoad) return;
    const id = window.setTimeout(() => {
      bannerShownThisLoad = true;
      setBannerOpen(true);
    }, BANNER_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [campaignActive]);

  if (!campaignActive || !mounted) return null;

  const handleBannerChange = (open: boolean) => {
    setBannerOpen(open);
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
          className="flex max-h-[94dvh] max-w-[min(94vw,40rem)] flex-col gap-0 overflow-hidden border-0 p-0 sm:rounded-3xl [&>button]:z-10 [&>button]:grid [&>button]:h-9 [&>button]:w-9 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:opacity-100 [&>button]:shadow-md"
        >
          <div>
          <button
            type="button"
            onClick={openDetails}
            aria-label="View Nisarg Baithak event details"
            className="group block w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--gold)]/50 sm:rounded-t-3xl"
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="h-[clamp(6rem,calc(94dvh-29rem),26.4rem)] w-full object-cover object-left-top transition-transform sm:h-[clamp(8rem,calc(94dvh-19.5rem),26.4rem)] duration-500 group-hover:scale-[1.015]"
            />
          </button>
          </div>

          <div className="shrink-0 px-5 py-4 sm:px-6 sm:py-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              {event.badge} · {event.shortLabel}
            </span>
            <DialogTitle className="mt-2.5 font-serif text-2xl leading-tight text-primary md:text-3xl">
              {event.topic}
            </DialogTitle>
            <DialogDescription className="mt-1 text-base text-foreground/85">
              {event.subtitle} · with {event.speakers[0].name}
            </DialogDescription>

            <ul className="mt-3 grid gap-1.5 text-sm text-foreground/90 sm:grid-cols-2">
              <li className="flex gap-2.5">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                {event.dateLabel}
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                {event.timeLabel}
              </li>
              <li className="flex gap-2.5">
                <Video className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                {event.whereLabel}
              </li>
              <li className="flex gap-2.5">
                <Languages className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                {event.languages}
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href={NISARG_BAITHAK_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Ticket className="h-4 w-4" />
                Book Now
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
            <p className="mt-2.5 text-xs leading-snug text-muted-foreground">
              {tier.label} contribution {tier.price} ({tier.when}) · {event.freeSeatsNote}
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
