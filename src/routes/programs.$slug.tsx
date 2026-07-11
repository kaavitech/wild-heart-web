import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Heart, Target, Eye, Sparkles, Mail, Camera, Briefcase, GraduationCap, Users, Leaf, Microscope, PenTool, TreePine, Building2, BookOpen, IndianRupee, MapPin, Landmark, Calendar, Footprints } from "lucide-react";
import { getProgram, PROGRAMS } from "@/lib/programs-data";
import { loadGalleryThumbsByCategory, type GalleryImage } from "@/lib/gallery-data";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";

function HeroDescription({
  description,
  closingStatement,
}: {
  description: string;
  closingStatement?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4 max-w-2xl">
      <p className={`text-lg text-white/85 ${expanded ? "" : "line-clamp-3"}`}>
        {description}
      </p>
      {expanded && closingStatement && (
        <p className="mt-4 text-lg italic text-[var(--gold)]">{closingStatement}</p>
      )}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--gold)] transition-colors hover:text-white"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

/** Split gallery into two disjoint pools so side-by-side sections never share an image. */
function splitGalleryPools(images: GalleryImage[]) {
  const primary: GalleryImage[] = [];
  const secondary: GalleryImage[] = [];
  images.forEach((image, i) => {
    (i % 2 === 0 ? primary : secondary).push(image);
  });
  return { primary, secondary };
}

function ScrollingGalleryImage({
  images,
  alt,
  intervalMs = 3800,
  tall = false,
  glow = "primary",
}: {
  images: GalleryImage[];
  alt: string;
  intervalMs?: number;
  tall?: boolean;
  glow?: "primary" | "gold";
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  const heightClass = tall ? "h-[480px] md:h-[560px]" : "h-[420px] md:h-[520px]";
  const glowClass = glow === "gold" ? "bg-[var(--gold)]/10" : "bg-primary/8";

  return (
    <div className="relative">
      <div className={`absolute -inset-4 -z-10 rounded-[2.5rem] ${glowClass} blur-2xl`} />
      <div className={`relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] ${heightClass}`}>
        {images.map((image, i) => (
          <img
            key={image.id}
            src={image.thumbSrc}
            alt={`${alt} — ${image.filename}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.program.name} — Wild Agile Foundation` },
      { name: "description", content: loaderData.program.short },
      { property: "og:title", content: loaderData.program.name },
      { property: "og:description", content: loaderData.program.short },
      { property: "og:image", content: loaderData.program.cover },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="container-x pt-40 pb-24 text-center">
      <h1 className="font-serif text-5xl text-primary">Program not found</h1>
      <Link to="/programs" className="btn-primary mt-6 inline-flex">Back to programs</Link>
    </div>
  ),
  component: ProgramDetail,
});

const SUPPORT_ICONS: Record<string, LucideIcon> = {
  Volunteer: Heart,
  "CSR Partner": Briefcase,
  School: GraduationCap,
  Corporate: Building2,
  Photographer: Camera,
  "Wildlife Expert": Eye,
  Environmentalist: Leaf,
  Sponsor: Sparkles,
  "Research Partner": Microscope,
  "Content Creator": PenTool,
  "Tree Plantation": TreePine,
  "Monetary Donor": IndianRupee,
  "Book Donor": BookOpen,
  Patron: Sparkles,
};

function ProgramDetail() {
  const { program } = Route.useLoaderData();
  const other = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);
  const pastWalkImages = useMemo(
    () =>
      program.pastWalks
        ? loadGalleryThumbsByCategory(program.pastWalks.galleryCategory)
        : [],
    [program.pastWalks],
  );
  const sessionGalleryImages = useMemo(
    () =>
      program.sessionFlow?.galleryCategory
        ? loadGalleryThumbsByCategory(program.sessionFlow.galleryCategory)
        : [],
    [program.sessionFlow?.galleryCategory],
  );
  const galleryPools = useMemo(() => splitGalleryPools(pastWalkImages), [pastWalkImages]);
  const experienceImages = galleryPools.primary;
  const whyImages =
    galleryPools.secondary.length > 0
      ? galleryPools.secondary
      : galleryPools.primary.slice(1);
  const hasNarrativeLayout = Boolean(program.experience || program.sessionFlow);

  return (
    <>
      {/* Hero */}
      <section
        className={`relative flex flex-col justify-end overflow-hidden ${
          hasNarrativeLayout ? "min-h-[65svh]" : "h-[80svh] min-h-[520px]"
        }`}
      >
        <img src={program.cover} alt={program.name} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div
          className={`container-x relative z-10 flex flex-col justify-end pt-32 ${
            hasNarrativeLayout ? "pb-10 md:pb-12" : "h-full pb-16"
          }`}
        >
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {program.tags.map((t: string) => (
                <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">{t}</span>
              ))}
              <span className="rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">{program.status}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {!program.heroTitle && program.headline && (
              <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                {program.headline}
              </p>
            )}
            {program.heroTitle ? (
              <>
                <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {program.name}
                </p>
                <h1 className="mt-3 max-w-4xl text-2xl font-semibold leading-[1.25] text-white md:text-3xl lg:text-4xl">
                  {program.heroTitle}
                </h1>
              </>
            ) : (
              <>
                <h1 className={`max-w-4xl font-serif text-5xl leading-[1.02] text-white md:text-7xl ${program.headline ? "mt-2" : "mt-4"}`}>
                  {program.name}
                </h1>
                {program.tagline && (
                  <p className="mt-4 max-w-2xl text-lg font-medium text-white/90">{program.tagline}</p>
                )}
                <HeroDescription
                  description={program.description}
                  closingStatement={program.closingStatement}
                />
              </>
            )}
          </Reveal>
        </div>
      </section>

      {program.heroTitle && (
        <section className="section-pad">
          <div className="container-x mx-auto max-w-3xl text-center">
            <Reveal>
              {program.headline && (
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {program.headline}
                </p>
              )}
              <h2 className="mt-3 font-serif text-4xl text-primary md:text-5xl">{program.name}</h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
                {program.description}
              </p>
              {program.closingStatement && (
                <p className="mt-4 text-base italic leading-relaxed text-[var(--gold)] md:text-lg">
                  {program.closingStatement}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Objectives + Vision + Impact — skipped when a program has richer narrative sections */}
      {!program.experience && !program.sessionFlow && (
        <section className={`section-pad ${program.heroTitle ? "pt-0" : ""}`}>
          <div className="container-x grid gap-12 lg:grid-cols-3">
            <Reveal>
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Target className="h-6 w-6" /></div>
                <h3 className="mt-5 font-serif text-3xl text-primary">
                  {program.fundraising ? "What We're Building" : "Objectives"}
                </h3>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85 md:text-lg">
                  {program.objectives.map((o: string) => (
                    <li key={o} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />{o}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Eye className="h-6 w-6" /></div>
                <h3 className="mt-5 font-serif text-3xl text-primary">Vision</h3>
                <p className="mt-4 text-base italic leading-relaxed text-foreground/85 md:text-lg">"{program.vision}"</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Sparkles className="h-6 w-6" /></div>
                <h3 className="mt-5 font-serif text-3xl text-primary">Impact</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">{program.impact}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {program.sessionFlow && (
        <section className="bg-[var(--cream)]/40 pb-24 pt-12 md:pb-32 md:pt-16">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            {sessionGalleryImages.length > 0 && (
              <Reveal dir="left">
                <ScrollingGalleryImage
                  images={sessionGalleryImages}
                  alt={`${program.name} session`}
                  intervalMs={4000}
                />
              </Reveal>
            )}

            <div className="min-w-0">
              <SectionTitle
                className="max-w-none"
                title={<>{program.sessionFlow.title}</>}
              />

              <div className="mt-8">
                <div className="mb-3 hidden grid-cols-[auto_1fr] items-end gap-x-4 border-b border-border/60 pb-2 sm:grid">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Step
                  </div>
                  <div className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    What Happens
                  </div>
                </div>

                <ol className="space-y-0">
                  {program.sessionFlow.steps.map((step, i) => (
                    <Reveal key={step.name} delay={0.06 + i * 0.06}>
                      <li className="grid grid-cols-1 gap-1.5 border-b border-border/60 py-4 last:border-0 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-x-4">
                        <div className="whitespace-nowrap">
                          <span className="font-serif text-xl text-primary md:text-2xl">{i + 1}.</span>{" "}
                          <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
                            {step.name}
                          </span>
                        </div>
                        <p className="text-justify text-base leading-relaxed text-foreground/85 md:text-lg">
                          {step.description}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>

                {program.sessionFlow.closingStatement && (
                  <Reveal delay={0.28}>
                    <p className="mt-6 text-justify text-base italic leading-relaxed text-[var(--gold)] md:text-lg">
                      {program.sessionFlow.closingStatement}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </div>

          <div className="container-x mt-16">
            <Reveal>
              <h3 className="font-serif text-3xl text-primary md:text-4xl">Gallery</h3>
              {program.sessionFlow.galleryNote && (
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {program.sessionFlow.galleryNote}
                </p>
              )}
            </Reveal>
            {sessionGalleryImages.length > 0 ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {sessionGalleryImages.map((image, i) => (
                  <Reveal key={image.id} delay={Math.min(i * 0.04, 0.24)}>
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                      <img
                        src={image.thumbSrc}
                        alt={`${program.name} session — ${image.filename}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal delay={0.1}>
                <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-sm text-muted-foreground">
                  Pictures &amp; videos to be added
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {program.testimonials && (
        <section className="section-pad">
          <div className="container-x">
            <SectionTitle align="center" title={<>{program.testimonials.title}</>} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
              {program.testimonials.quotes.map((quote, i) => (
                <Reveal key={quote} delay={0.08 + i * 0.08}>
                  <blockquote className="h-full border-l-4 border-gold pl-5">
                    <p className="text-pull-quote text-justify">&ldquo;{quote}&rdquo;</p>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {program.experience && (
        <section className="bg-[var(--cream)]/40 pb-24 pt-12 md:pb-32 md:pt-16">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            {experienceImages.length > 0 && (
              <Reveal dir="left">
                <ScrollingGalleryImage
                  images={experienceImages}
                  alt={`${program.name} walk`}
                  intervalMs={4000}
                />
              </Reveal>
            )}
            <div className="min-w-0">
              <SectionTitle
                className="max-w-none"
                title={<>{program.experience.title}</>}
              />
              <Reveal delay={0.08}>
                <p className="mt-6 text-justify text-base leading-relaxed text-foreground/85 md:text-lg">
                  {program.experience.intro}
                </p>
              </Reveal>
              <ul className="mt-8 space-y-5">
                {program.experience.highlights.map((item, i) => (
                  <Reveal key={item} delay={0.1 + i * 0.05}>
                    <li className="flex gap-4 text-justify text-base leading-relaxed text-foreground/85 md:text-lg">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                      <span>{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {program.whyItMatters && (
        <section className="section-pad">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            <div className="min-w-0 order-2 lg:order-1">
              <SectionTitle
                className="max-w-none"
                title={<>{program.whyItMatters.title}</>}
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-justify text-base leading-relaxed text-foreground/85 md:text-lg">
                  {program.whyItMatters.body}
                </p>
              </Reveal>
              <div className="mt-8">
                <LeafDivider />
              </div>
            </div>
            {whyImages.length > 0 && (
              <Reveal dir="right" className="order-1 lg:order-2">
                <ScrollingGalleryImage
                  images={whyImages}
                  alt={`${program.name} in the wild`}
                  intervalMs={4500}
                  tall
                  glow="gold"
                />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {program.pastWalks && pastWalkImages.length > 0 && (
        <section className="section-pad bg-[var(--cream)]/40">
          <div className="container-x">
            <SectionTitle align="center" title={<>{program.pastWalks.title}</>} />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pastWalkImages.map((image, i) => (
                <Reveal key={image.id} delay={Math.min(i * 0.04, 0.28)}>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={image.thumbSrc}
                      alt={`${program.name} past walk — ${image.filename}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-10 flex justify-center">
                <Link to="/gallery" className="btn-primary">
                  View full gallery <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {program.joinInfo && (
        <section className="section-pad">
          <div className="container-x">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <SectionTitle
                  align="center"
                  title={<>{program.joinInfo.title}</>}
                  subtitle={program.joinInfo.intro}
                />
              </Reveal>
              <div className="mt-12 space-y-6">
                {program.joinInfo.details.map((detail, i) => {
                  const Icon = detail.label === "Where" ? MapPin : detail.label === "Who" ? Users : Calendar;
                  return (
                    <Reveal key={detail.label} delay={0.05 + i * 0.06}>
                      <div className="flex gap-4 border-b border-border/70 pb-6 last:border-0">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {detail.label}
                          </div>
                          <p className="mt-1.5 text-base leading-relaxed text-foreground/90 md:text-lg">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Link to="/join" className="btn-primary">
                    <Footprints className="h-4 w-4" /> Join the next walk
                  </Link>
                  <a href="mailto:hello@wildagilefoundation.org" className="btn-gold">
                    <Mail className="h-4 w-4" /> Ask a question
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Expected support */}
      <section className="section-pad bg-[var(--cream)]/40">
        <div className="container-x">
          <SectionTitle align="center" eyebrow="Expected Support" title={<>How you can step in.</>} />
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {program.expectedSupport.map((s: string) => {
              const Icon = SUPPORT_ICONS[s] ?? Users;
              return (
                <Reveal key={s} dir="up">
                  <div className="group glass-card flex h-full flex-col items-start rounded-2xl p-6 transition-transform hover:-translate-y-1">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/8 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-primary md:text-lg">{s}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {program.fundraising && (
        <>
          <section className="section-pad bg-[var(--cream)]/40">
            <div className="container-x">
              <Reveal>
                <SectionTitle
                  align="center"
                  eyebrow="Fundraising"
                  title={<>{program.fundraising.phaseTitle}</>}
                  subtitle={program.fundraising.targetNote}
                />
                <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[var(--gold)]/30 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
                  <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Fundraising Target
                  </div>
                  <div className="mt-2 font-serif text-5xl text-primary md:text-6xl">
                    {program.fundraising.target}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section-pad">
            <div className="container-x">
              <SectionTitle
                align="center"
                eyebrow="Monetary Donations"
                title={<>Every contribution creates an impact.</>}
              />
              <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-primary/5">
                      <th className="px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
                        Contribution
                      </th>
                      <th className="px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
                        Your Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.fundraising.donationImpacts.map((row, i) => (
                      <tr
                        key={row.amount}
                        className={i % 2 === 0 ? "bg-card" : "bg-[var(--cream)]/30"}
                      >
                        <td className="px-6 py-4 text-base font-semibold text-primary md:text-lg">
                          {row.amount}
                        </td>
                        <td className="px-6 py-4 text-base leading-relaxed text-foreground/85 md:text-lg">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Reveal delay={0.1}>
                <div className="mx-auto mt-8 max-w-3xl rounded-2xl border-2 border-[var(--gold)] bg-[var(--gold)]/10 p-8 text-center">
                  <div className="font-serif text-2xl text-primary md:text-3xl">
                    {program.fundraising.foundingPartner.amount}
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90 md:text-lg">
                    {program.fundraising.foundingPartner.title}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Volunteer form + Donate */}
      <section className="section-pad">
        <div className={`container-x grid gap-10 ${program.fundraising ? "" : "lg:grid-cols-2"}`}>
          {!program.fundraising && (
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <h3 className="font-serif text-3xl text-primary">Volunteer with this program</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within a week.</p>
                <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <Field label="Full name"><input className="field" required /></Field>
                  <Field label="Email"><input className="field" type="email" required /></Field>
                  <Field label="What draws you to this program?"><textarea rows={4} className="field" /></Field>
                  <button className="btn-primary mt-2 self-start" type="submit">Send Application <ArrowRight className="h-4 w-4" /></button>
                </form>
              </div>
            </Reveal>
          )}
          {program.fundraising ? (
            <FundraisingSupport fundraising={program.fundraising} />
          ) : (
            <Reveal dir="right">
              <div className="relative h-full overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-[var(--shadow-card)]">
                <LeafDivider />
                <h3 className="font-serif text-4xl">Fuel this work.</h3>
                <p className="mt-3 text-primary-foreground/85">
                  Every contribution goes directly into field programs — buses for school trips, saplings, field guides,
                  and educator stipends.
                </p>
                <Link to="/join" className="btn-gold mt-8 inline-flex"><Heart className="h-4 w-4" /> Donate</Link>
                <div className="mt-8 flex items-center gap-3 text-sm text-primary-foreground/80">
                  <Mail className="h-4 w-4" /> hello@wildagilefoundation.org
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Other programs */}
      <section className="pb-24">
        <div className="container-x">
          <SectionTitle eyebrow="Other Programs" title={<>Keep exploring.</>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {other.map((p) => (
              <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.cover} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="bg-card p-5">
                  <div className="font-serif text-xl text-primary">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.short}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">{label}</div>
      {children}
    </label>
  );
}

function FundraisingSupport({ fundraising }: { fundraising: NonNullable<ReturnType<typeof getProgram>>["fundraising"] }) {
  if (!fundraising) return null;
  const { bankDetails, bookDonation } = fundraising;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Reveal>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary">
              <Landmark className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-3xl text-primary">Donate via Bank Transfer</h3>
          </div>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Account Name</dt>
              <dd className="mt-1 text-base leading-relaxed text-foreground/90 md:text-lg">{bankDetails.accountName}</dd>
            </div>
            <div>
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Bank</dt>
              <dd className="mt-1 text-base leading-relaxed text-foreground/90 md:text-lg">{bankDetails.bank}</dd>
            </div>
            <div>
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Account Number</dt>
              <dd className="mt-1 font-mono text-base text-foreground/90">{bankDetails.accountNumber}</dd>
            </div>
            <div>
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">IFSC</dt>
              <dd className="mt-1 font-mono text-base text-foreground/90">{bankDetails.ifsc}</dd>
            </div>
          </dl>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            After contributing, please email your transaction details to{" "}
            <a href="mailto:hello@wildagilefoundation.org" className="font-medium text-primary hover:underline">
              hello@wildagilefoundation.org
            </a>{" "}
            for acknowledgment.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
            All donations are eligible for tax benefits under Section 80G of the Income Tax Act. A donation receipt will be issued for every contribution.
          </p>
        </div>
      </Reveal>

      <Reveal dir="right">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-3xl text-primary">For Book Donation</h3>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-base leading-relaxed text-foreground/85 md:text-lg">{bookDonation.intro}</p>
              <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-foreground/85 md:text-lg">
                {bookDonation.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--cream)]/50 p-5">
              <div className="flex items-start gap-2 text-base leading-relaxed text-foreground/85 md:text-lg">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-primary">{bookDonation.recipient}</div>
                  <div className="mt-1">{bookDonation.organization}</div>
                  <div className="mt-2 leading-relaxed">{bookDonation.address}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-base italic leading-relaxed text-muted-foreground md:text-lg">{bookDonation.listNote}</p>
        </div>
      </Reveal>
    </div>
  );
}
