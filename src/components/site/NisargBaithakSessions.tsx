import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Mic,
  Ticket,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import {
  isNisargBaithakSessionUpcoming,
  type NisargBaithakSession,
} from "@/lib/nisarg-baithak";
import type { ProgramSessions } from "@/lib/programs-data";

function SessionCard({
  session,
  upcoming,
  onOpenDetails,
}: {
  session: NisargBaithakSession;
  upcoming: boolean;
  onOpenDetails: () => void;
}) {
  return (
    <article className="grid overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-[var(--shadow-soft)] md:grid-cols-[minmax(0,19rem)_1fr]">
      <div className="flex items-center justify-center bg-[var(--cream)]/50 p-5 md:p-6">
        <img
          src={session.poster}
          alt={session.posterAlt}
          loading="lazy"
          className="aspect-[3/4] w-full max-w-[20rem] rounded-xl object-cover object-top shadow-[var(--shadow-soft)]"
        />
      </div>

      <div className="flex flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            {session.sessionLabel}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
              upcoming
                ? "bg-[var(--gold)] text-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {upcoming ? "Upcoming" : "Past session"}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-3xl leading-tight text-primary md:text-4xl">
          {session.topic}
        </h3>
        <p className="mt-1 text-base font-medium text-foreground/85">
          {session.subtitle}
        </p>
        {session.tagline && (
          <p className="mt-2 text-sm italic text-muted-foreground">
            {session.tagline}
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
          {session.summary}
        </p>

        <div className="mt-5">
          <div className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {session.guests.length > 1 ? "Guests" : "Guest"}
          </div>
          <ul className="mt-2 space-y-2">
            {session.guests.map((guest) => (
              <li key={guest.name} className="flex gap-3">
                <Mic
                  className="mt-1 h-4 w-4 shrink-0 text-secondary"
                  aria-hidden
                />
                <span>
                  <span className="font-medium text-primary">{guest.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {guest.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-5 space-y-2 border-t border-border/60 pt-5 text-sm text-foreground/85">
          <li className="flex gap-3">
            <Calendar
              className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
              aria-hidden
            />
            {session.dateLabel}
          </li>
          <li className="flex gap-3">
            <Clock
              className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
              aria-hidden
            />
            {session.timeLabel}
          </li>
          <li className="flex gap-3">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
              aria-hidden
            />
            {session.venue}
          </li>
        </ul>

        {upcoming && (session.bookingUrl || session.isFeaturedEvent) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {session.bookingUrl && (
              <a
                href={session.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Ticket className="h-4 w-4" /> Book your seat
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            )}
            {session.isFeaturedEvent && (
              <button
                type="button"
                onClick={onOpenDetails}
                className="btn-gold inline-flex items-center gap-2 text-sm"
              >
                Full event details <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {session.entryNote && (
              <span className="text-xs text-muted-foreground">
                {session.entryNote}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function NisargBaithakSessions({
  sessions,
}: {
  sessions: ProgramSessions;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  // Upcoming sessions first (soonest at the top), then past sessions (most recent first).
  const ordered = useMemo(() => {
    const withStatus = sessions.sessions.map((session) => ({
      session,
      upcoming: isNisargBaithakSessionUpcoming(session),
    }));
    const upcoming = withStatus
      .filter((s) => s.upcoming)
      .sort((a, b) => a.session.date.localeCompare(b.session.date));
    const past = withStatus
      .filter((s) => !s.upcoming)
      .sort((a, b) => b.session.date.localeCompare(a.session.date));
    return [...upcoming, ...past];
  }, [sessions.sessions]);

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle
          align="center"
          title={<>{sessions.title}</>}
          subtitle={sessions.intro}
        />
        <div className="mx-auto mt-12 max-w-5xl space-y-8">
          {ordered.map(({ session, upcoming }, i) => (
            <Reveal
              key={session.sessionLabel}
              dir="up"
              delay={Math.min(i * 0.08, 0.24)}
            >
              <SessionCard
                session={session}
                upcoming={upcoming}
                onOpenDetails={() => setDetailsOpen(true)}
              />
            </Reveal>
          ))}
        </div>
      </div>
      <NisargBaithakEventDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </section>
  );
}
