import type { ReactNode } from "react";
import { Calendar, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NisargBaithakPosters } from "@/components/site/NisargBaithakPosters";
import {
  NISARG_BAITHAK_BOOKING_URL,
  NISARG_BAITHAK_DIRECTIONS_URL,
  NISARG_BAITHAK_EVENT,
} from "@/lib/nisarg-baithak";

type NisargBaithakEventDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-lg font-medium text-primary sm:text-xl">{children}</h3>
  );
}

export function NisargBaithakEventDialog({ open, onOpenChange }: NisargBaithakEventDialogProps) {
  const event = NISARG_BAITHAK_EVENT;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(92vh,52rem)] max-w-[min(96vw,44rem)] flex-col gap-0 overflow-hidden border-border/70 p-0 sm:max-w-[min(96vw,52rem)]">
        <div className="shrink-0 border-b border-border/60 bg-[color-mix(in_oklab,var(--primary)_4%,var(--background))] px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader className="space-y-2 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-secondary">
              {event.sessionLabel}
            </p>
            <DialogTitle className="font-serif text-xl leading-snug text-primary sm:text-2xl">
              {event.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground/85 sm:text-base">
              {event.subtitle}
            </DialogDescription>
            <p className="text-sm italic text-muted-foreground">{event.tagline}</p>
          </DialogHeader>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href={NISARG_BAITHAK_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Ticket className="h-4 w-4" />
              Book on Urbanaut
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
            <a
              href={NISARG_BAITHAK_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-sm"
            >
              <MapPin className="h-4 w-4" />
              Get directions
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{event.bookingNote}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-8 px-4 py-5 sm:px-6 sm:py-6">
            <div className="mx-auto max-w-[14rem] sm:max-w-[16rem]">
              <NisargBaithakPosters variant="dialog" className="!p-0" />
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
              {event.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <section className="space-y-4">
              <SectionHeading>Meet the people behind the rescues</SectionHeading>
              <ul className="space-y-4">
                {event.speakers.map((speaker) => (
                  <li
                    key={speaker.name}
                    className="rounded-xl border border-border/60 bg-card/50 p-4 sm:p-5"
                  >
                    <p className="font-medium text-primary">
                      {speaker.name}
                      <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                        {speaker.role}
                      </span>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/88">{speaker.bio}</p>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-foreground/90">{event.speakersOutro}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{event.expectations}</p>
            </section>

            <section className="space-y-4">
              <SectionHeading>What will we explore?</SectionHeading>
              <ul className="space-y-3">
                {event.explore.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-lg border border-border/50 bg-background px-3 py-3 sm:px-4"
                  >
                    <span className="text-xl leading-none" aria-hidden>
                      {item.icon}
                    </span>
                    <div>
                      <p className="font-medium text-primary">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <SectionHeading>Who should attend?</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/90">{event.audience}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{event.invitation}</p>
            </section>

            <section className="rounded-xl border border-[color-mix(in_oklab,var(--primary)_22%,transparent)] bg-[color-mix(in_oklab,var(--primary)_6%,var(--background))] p-4 sm:p-5">
              <ul className="space-y-3 text-sm sm:text-[0.9375rem]">
                <li className="flex gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                  <span>
                    <span className="font-medium text-primary">Date:</span> {event.dateLabel}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                  <span>
                    <span className="font-medium text-primary">Time:</span> {event.timeLabel}
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                  <span>
                    <span className="font-medium text-primary">Venue:</span> {event.venueLine}
                  </span>
                </li>
              </ul>
              <p className="mt-4 font-serif text-base font-medium text-primary sm:text-lg">
                {event.closingTagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{event.closing}</p>
            </section>

            <section className="space-y-3">
              <SectionHeading>What&apos;s included</SectionHeading>
              <ul className="list-inside list-disc space-y-1 text-sm text-foreground/90">
                {event.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-2 border-t border-border/60 pb-2 pt-2">
              <SectionHeading>Where it is</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">{event.fullAddress}</p>
              <a
                href={NISARG_BAITHAK_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary underline-offset-4 hover:underline"
              >
                Get directions on Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
