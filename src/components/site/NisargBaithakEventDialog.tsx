import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  ExternalLink,
  GraduationCap,
  Languages,
  Mic,
  Ticket,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NISARG_BAITHAK_BOOKING_URL,
  NISARG_BAITHAK_EVENT,
  NISARG_BAITHAK_IMAGES,
  getCurrentNisargBaithakPriceTier,
} from "@/lib/nisarg-baithak";
import { CONTACT } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type NisargBaithakEventDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-lg font-medium text-primary sm:text-xl">{children}</h3>
  );
}

/** Full details of the current Nisarg Baithak campaign (NISARG_BAITHAK_EVENT). */
export function NisargBaithakEventDialog({ open, onOpenChange }: NisargBaithakEventDialogProps) {
  const event = NISARG_BAITHAK_EVENT;
  const currentTier = getCurrentNisargBaithakPriceTier();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(92vh,52rem)] max-w-[min(96vw,44rem)] flex-col gap-0 overflow-hidden border-border/70 p-0 sm:max-w-[min(96vw,52rem)]">
        <div className="shrink-0 border-b border-border/60 bg-[color-mix(in_oklab,var(--primary)_4%,var(--background))] px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader className="space-y-2 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-secondary">
              {event.badge} · {event.sessionLabel}
            </p>
            <DialogTitle className="font-serif text-xl leading-snug text-primary sm:text-2xl">
              {event.topic}
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground/85 sm:text-base">
              {event.subtitle}
            </DialogDescription>
          </DialogHeader>

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
            <span className="text-xs text-muted-foreground">
              {currentTier.label}: <span className="font-semibold text-foreground">{currentTier.price}</span>{" "}
              ({currentTier.when})
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-8 px-4 py-5 sm:px-6 sm:py-6">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-start">
              {/* Poster cut just below "What you'll learn"; pricing is listed in full further down. */}
              <div className="mx-auto aspect-[804/978] w-full max-w-[14rem] overflow-hidden rounded-2xl border border-border/50 bg-white shadow-[0_16px_48px_-16px_rgba(46,94,78,0.35)]">
                <img
                  src={NISARG_BAITHAK_IMAGES[0].src}
                  alt={NISARG_BAITHAK_IMAGES[0].alt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="space-y-5">
                <ul className="space-y-3 text-sm sm:text-[0.9375rem]">
                  <li className="flex gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    {event.dateLabel}
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    {event.timeLabel}
                  </li>
                  <li className="flex gap-3">
                    <Video className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    {event.whereLabel}
                  </li>
                  <li className="flex gap-3">
                    <Languages className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    {event.languages}
                  </li>
                </ul>
                <ul className="space-y-2 border-t border-border/60 pt-4">
                  {event.speakers.map((speaker) => (
                    <li key={speaker.name} className="flex gap-3">
                      <Mic className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      <span>
                        <span className="font-medium text-primary">{speaker.name}</span>
                        <span className="block text-sm text-muted-foreground">{speaker.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
              {event.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <section className="space-y-4">
              <SectionHeading>What you&apos;ll learn</SectionHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {event.learn.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-border/50 bg-background px-3 py-3 text-sm sm:px-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <SectionHeading>{event.pricingTitle}</SectionHeading>
              <ul className="grid gap-3 sm:grid-cols-3">
                {event.pricing.map((tier) => {
                  const isCurrent = tier.label === currentTier.label;
                  return (
                    <li
                      key={tier.label}
                      className={cn(
                        "rounded-xl border p-4 text-center",
                        isCurrent
                          ? "border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_14%,var(--background))]"
                          : "border-border/60 bg-card/50",
                      )}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {tier.label}
                        {isCurrent && <span className="ml-1.5 text-secondary">· Now</span>}
                      </p>
                      <p className="mt-1 font-serif text-3xl text-primary">{tier.price}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{tier.when}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="flex gap-3 rounded-xl border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] bg-[color-mix(in_oklab,var(--gold)_10%,var(--background))] p-4 text-sm leading-relaxed text-foreground/90">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                <span>
                  {event.freeSeatsNote}{" "}
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary underline-offset-4 hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </span>
              </p>
              <a
                href={NISARG_BAITHAK_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Ticket className="h-4 w-4" />
                Book Now on Urbanaut
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            </section>

            <section className="space-y-2 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
              <p>{event.closing}</p>
              <p className="text-xs uppercase tracking-[0.12em]">{event.asSeenOn}</p>
            </section>

            <section className="border-t border-border/60 pb-2 pt-4">
              <Link
                to="/programs/$slug"
                params={{ slug: "nisarg-baithak" }}
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                See all Nisarg Baithak sessions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
