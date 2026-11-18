import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Camera,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquareQuote,
  Mic,
  Ticket,
  Video,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NISARG_BAITHAK_TOPICS,
  getNisargBaithakSessionNumber,
  getNisargBaithakTopic,
  isNisargBaithakSessionUpcoming,
  type NisargBaithakSession,
  type NisargBaithakSessionMode,
  type NisargBaithakTopic,
} from "@/lib/nisarg-baithak";
import type { ProgramSessions } from "@/lib/programs-data";
import { cn } from "@/lib/utils";

type ModeFilter = "all" | NisargBaithakSessionMode;

const MODE_LABEL: Record<NisargBaithakSessionMode, string> = {
  offline: "In person",
  online: "Online",
};

const chip =
  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
const chipOn = "border-primary bg-primary text-primary-foreground";
const chipOff = "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary";

const pill = "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]";

function ModeBadge({ mode }: { mode: NisargBaithakSessionMode }) {
  const Icon = mode === "online" ? Video : MapPin;
  return (
    <span
      className={cn(
        pill,
        "inline-flex items-center gap-1",
        mode === "online" ? "bg-secondary/15 text-secondary" : "bg-primary/8 text-primary",
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {MODE_LABEL[mode]}
    </span>
  );
}

function UpcomingBadge() {
  return <span className={cn(pill, "bg-[var(--gold)] text-foreground")}>Upcoming</span>;
}

function whereText(session: NisargBaithakSession) {
  if (session.mode === "online") return `Online${session.platform ? ` · ${session.platform}` : ""}`;
  return session.venue ?? "";
}

function WhereLine({ session }: { session: NisargBaithakSession }) {
  const Icon = session.mode === "online" ? Video : MapPin;
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
      <span>
        {whereText(session)}
        {session.mode === "offline" && session.directionsUrl && (
          <a
            href={session.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 whitespace-nowrap text-secondary underline-offset-2 hover:underline"
          >
            Directions
          </a>
        )}
      </span>
    </li>
  );
}

function SessionFacts({ session }: { session: NisargBaithakSession }) {
  return (
    <ul className="space-y-2 text-sm text-foreground/85">
      <li className="flex gap-3">
        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
        {session.dateLabel}
      </li>
      <li className="flex gap-3">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
        {session.timeLabel}
      </li>
      <WhereLine session={session} />
    </ul>
  );
}

function GuestList({ session }: { session: NisargBaithakSession }) {
  return (
    <div>
      <div className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {session.guests.length > 1 ? "Guests" : "Guest"}
      </div>
      <ul className="mt-2 space-y-2">
        {session.guests.map((guest) => (
          <li key={guest.name} className="flex gap-3">
            <Mic className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden />
            <span>
              <span className="font-medium text-primary">{guest.name}</span>
              <span className="block text-sm text-muted-foreground">{guest.role}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SessionActions({
  session,
  onOpenEventDetails,
}: {
  session: NisargBaithakSession;
  onOpenEventDetails: () => void;
}) {
  const joinUrl = session.mode === "online" ? session.joinUrl : undefined;
  if (!session.bookingUrl && !joinUrl && !session.isFeaturedEvent && !session.entryNote) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      {session.bookingUrl && (
        <a
          href={session.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Ticket className="h-4 w-4" /> Book Now
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </a>
      )}
      {joinUrl && (
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Video className="h-4 w-4" /> Join online
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </a>
      )}
      {session.isFeaturedEvent && (
        <button
          type="button"
          onClick={onOpenEventDetails}
          className="btn-gold inline-flex items-center gap-2 text-sm"
        >
          Full event details <ArrowRight className="h-4 w-4" />
        </button>
      )}
      {session.entryNote && (
        <span className="text-xs text-muted-foreground">{session.entryNote}</span>
      )}
    </div>
  );
}

/** Large card for an upcoming session, shown above the topics. */
function UpcomingSessionCard({
  session,
  number,
  onOpenEventDetails,
}: {
  session: NisargBaithakSession;
  number: number;
  onOpenEventDetails: () => void;
}) {
  const topic = getNisargBaithakTopic(session.topicId);
  return (
    <article className="card-media grid ring-2 ring-[var(--gold)]/60 md:grid-cols-[minmax(0,15rem)_1fr]">
      <div className="flex items-center justify-center bg-[var(--cream)]/50 p-5 md:p-6">
        <img
          src={session.poster}
          alt={session.posterAlt}
          loading="lazy"
          className="aspect-[3/4] w-full max-w-[13rem] rounded-xl object-cover object-top shadow-[var(--shadow-soft)] md:max-w-[15rem]"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <UpcomingBadge />
            <ModeBadge mode={session.mode} />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-secondary">
            {topic?.name ?? session.topicId} · Session {number}
          </p>
          <h3 className="mt-1 heading-sub text-primary">{session.topic}</h3>
          <p className="mt-1 text-base font-medium text-foreground/85">{session.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
            {session.summary}
          </p>
        </div>
        <div className="grid gap-5 border-t border-border/60 pt-5 sm:grid-cols-2">
          <GuestList session={session} />
          <SessionFacts session={session} />
        </div>
        <SessionActions session={session} onOpenEventDetails={onOpenEventDetails} />
      </div>
    </article>
  );
}

/** One session inside a topic card. Opens the details popup. */
function SessionRow({
  session,
  number,
  upcoming,
  onOpen,
}: {
  session: NisargBaithakSession;
  number: number;
  upcoming: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full gap-4 rounded-xl p-3 text-left transition hover:bg-[var(--cream)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <img
        src={session.poster}
        alt=""
        loading="lazy"
        className="aspect-[3/4] w-16 shrink-0 rounded-md object-cover object-top shadow-sm sm:w-20"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Session {number}
          </span>
          {upcoming && <UpcomingBadge />}
          <ModeBadge mode={session.mode} />
        </div>
        <h5 className="mt-1 font-serif text-lg leading-snug text-primary group-hover:underline">
          {session.topic}
        </h5>
        <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {session.dateLabel}
          </li>
          <li className="flex items-center gap-1.5">
            <Mic className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="line-clamp-1">{session.guests.map((g) => g.name).join(", ")}</span>
          </li>
          <li className="flex items-center gap-1.5">
            {session.mode === "online" ? (
              <Video className="h-3.5 w-3.5 shrink-0" aria-hidden />
            ) : (
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            )}
            <span className="line-clamp-1">{whereText(session)}</span>
          </li>
        </ul>
      </div>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 self-center text-secondary transition group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}

function TopicCard({
  topic,
  sessions,
  numberOf,
  onOpenSession,
}: {
  topic: NisargBaithakTopic;
  sessions: { session: NisargBaithakSession; upcoming: boolean }[];
  numberOf: (s: NisargBaithakSession) => number;
  onOpenSession: (s: NisargBaithakSession) => void;
}) {
  const modes = new Set(sessions.map((s) => s.session.mode));
  const highlighted = topic.highlighted;
  const hasUpcoming = sessions.some((s) => s.upcoming);
  return (
    <article
      className={cn(
        "card flex h-full flex-col !p-0",
        highlighted &&
          "relative border-2 !border-[var(--gold)] shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--gold)_70%,transparent)] lg:z-10 lg:scale-[1.03]",
      )}
    >
      <div
        className={cn(
          "border-b border-border/60 p-6 md:p-7",
          highlighted &&
            "rounded-t-[calc(1.5rem-2px)] bg-[color-mix(in_oklab,var(--gold)_12%,var(--card))]",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="eyebrow !mt-0">Topic</span>
          {highlighted && hasUpcoming && <UpcomingBadge />}
          <span className="text-xs text-muted-foreground">
            {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
            {[...modes].map((m) => ` · ${MODE_LABEL[m]}`).join("")}
          </span>
        </div>
        <h3 className={cn("mt-2 heading-sub text-primary", highlighted && "md:text-[2.1rem]")}>
          {topic.name}
        </h3>
        <p className="mt-1 text-sm italic text-muted-foreground">{topic.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{topic.description}</p>
      </div>
      <div className="flex-1 space-y-1 p-3 md:p-4">
        {sessions.map(({ session, upcoming }) => (
          <SessionRow
            key={session.id}
            session={session}
            number={numberOf(session)}
            upcoming={upcoming}
            onOpen={() => onOpenSession(session)}
          />
        ))}
      </div>
    </article>
  );
}

function PhotosBlock({ session }: { session: NisargBaithakSession }) {
  const photos = session.photos ?? [];
  return (
    <div>
      <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Camera className="h-3.5 w-3.5" aria-hidden /> Photos
      </div>
      {photos.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover transition hover:opacity-90"
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Photos coming soon">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border bg-muted/40"
            >
              <Camera className="h-5 w-5 text-muted-foreground/50" aria-hidden />
            </div>
          ))}
          <p className="col-span-3 text-xs text-muted-foreground">Photos from this session coming soon.</p>
        </div>
      )}
    </div>
  );
}

function ReviewsBlock({ session }: { session: NisargBaithakSession }) {
  const reviews = session.reviews ?? [];
  return (
    <div>
      <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden /> What attendees said
      </div>
      {reviews.length > 0 ? (
        <ul className="mt-3 space-y-3">
          {reviews.map((review) => (
            <li key={review.quote} className="rounded-xl bg-[var(--cream)]/60 p-4">
              <p className="text-sm italic leading-relaxed text-foreground/85">“{review.quote}”</p>
              <p className="mt-2 text-xs font-medium text-primary">
                {review.name}
                {review.role && <span className="font-normal text-muted-foreground"> · {review.role}</span>}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          Reviews from attendees will appear here.
        </p>
      )}
    </div>
  );
}

function SessionDetailsDialog({
  session,
  number,
  upcoming,
  onOpenChange,
  onOpenEventDetails,
}: {
  session: NisargBaithakSession | null;
  number: number;
  upcoming: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenEventDetails: () => void;
}) {
  const topic = session ? getNisargBaithakTopic(session.topicId) : undefined;
  return (
    <Dialog open={session !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92vh,52rem)] max-w-[min(96vw,50rem)] overflow-y-auto p-0 sm:max-w-[min(96vw,50rem)]">
        {session && (
          <div className="grid md:grid-cols-[minmax(0,15rem)_1fr]">
            <div className="flex items-start justify-center bg-[var(--cream)]/50 p-5">
              <img
                src={session.poster}
                alt={session.posterAlt}
                className="aspect-[3/4] w-full max-w-[13rem] rounded-xl object-cover object-top shadow-[var(--shadow-soft)] md:sticky md:top-5 md:max-w-[15rem]"
              />
            </div>
            <div className="flex flex-col gap-5 p-6">
              <DialogHeader className="space-y-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  {upcoming ? (
                    <UpcomingBadge />
                  ) : (
                    <span className={cn(pill, "bg-muted text-muted-foreground")}>Past session</span>
                  )}
                  <ModeBadge mode={session.mode} />
                </div>
                <p className="pt-2 text-xs font-medium uppercase tracking-[0.16em] text-secondary">
                  {topic?.name ?? session.topicId} · Session {number}
                </p>
                <DialogTitle className="font-serif text-2xl leading-snug text-primary">
                  {session.topic}
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-foreground/85">
                  {session.subtitle}
                </DialogDescription>
                {session.tagline && (
                  <p className="text-sm italic text-muted-foreground">{session.tagline}</p>
                )}
              </DialogHeader>
              <p className="text-sm leading-relaxed text-foreground/85">{session.summary}</p>
              <GuestList session={session} />
              <div className="border-t border-border/60 pt-5">
                <SessionFacts session={session} />
              </div>
              {upcoming ? (
                <SessionActions session={session} onOpenEventDetails={onOpenEventDetails} />
              ) : (
                <div className="space-y-6 border-t border-border/60 pt-5">
                  <PhotosBlock session={session} />
                  <ReviewsBlock session={session} />
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function NisargBaithakSessions({ sessions }: { sessions: ProgramSessions }) {
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [openSession, setOpenSession] = useState<NisargBaithakSession | null>(null);
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all");

  const all = sessions.sessions;
  const numberOf = (s: NisargBaithakSession) => getNisargBaithakSessionNumber(s, all);

  const upcoming = useMemo(
    () =>
      all
        .filter((s) => isNisargBaithakSessionUpcoming(s))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [all],
  );

  const showModeFilter = new Set(all.map((s) => s.mode)).size > 1;

  // Topic cards: sessions newest first; topics ordered by their latest session.
  const topics = useMemo(() => {
    return NISARG_BAITHAK_TOPICS.map((topic) => ({
      topic,
      sessions: all
        .filter((s) => s.topicId === topic.id && (modeFilter === "all" || s.mode === modeFilter))
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((session) => ({ session, upcoming: isNisargBaithakSessionUpcoming(session) })),
    }))
      .filter((t) => t.sessions.length > 0)
      .sort(
        (a, b) =>
          Number(Boolean(b.topic.highlighted)) - Number(Boolean(a.topic.highlighted)) ||
          b.sessions[0].session.date.localeCompare(a.sessions[0].session.date),
      );
  }, [all, modeFilter]);

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle align="center" title={<>{sessions.title}</>} subtitle={sessions.intro} />

        {upcoming.length > 0 && (
          <div className="mx-auto mt-12 max-w-5xl">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Coming up
            </h3>
            <div className="mt-4 space-y-6">
              {upcoming.map((session, i) => (
                <Reveal key={session.id} dir="up" delay={Math.min(i * 0.08, 0.24)}>
                  <UpcomingSessionCard
                    session={session}
                    number={numberOf(session)}
                    onOpenEventDetails={() => setEventDetailsOpen(true)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-6xl">
          {showModeFilter && (
            <div
              role="group"
              aria-label="Filter by format"
              className="mb-6 flex flex-wrap justify-center gap-2"
            >
              {(["all", "offline", "online"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={modeFilter === m}
                  onClick={() => setModeFilter(m)}
                  className={cn(chip, modeFilter === m ? chipOn : chipOff)}
                >
                  {m === "online" && <Video className="h-3.5 w-3.5" aria-hidden />}
                  {m === "offline" && <MapPin className="h-3.5 w-3.5" aria-hidden />}
                  {m === "all" ? "All formats" : MODE_LABEL[m]}
                </button>
              ))}
            </div>
          )}

          {topics.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No sessions match this filter.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {topics.map(({ topic, sessions: list }, i) => (
                <Reveal key={topic.id} dir="up" delay={Math.min(i * 0.08, 0.24)}>
                  <TopicCard
                    topic={topic}
                    sessions={list}
                    numberOf={numberOf}
                    onOpenSession={setOpenSession}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      <SessionDetailsDialog
        session={openSession}
        number={openSession ? numberOf(openSession) : 0}
        upcoming={openSession ? isNisargBaithakSessionUpcoming(openSession) : false}
        onOpenChange={(open) => !open && setOpenSession(null)}
        onOpenEventDetails={() => {
          setOpenSession(null);
          setEventDetailsOpen(true);
        }}
      />
      <NisargBaithakEventDialog open={eventDetailsOpen} onOpenChange={setEventDetailsOpen} />
    </section>
  );
}
