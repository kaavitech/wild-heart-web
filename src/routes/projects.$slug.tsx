import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Heart, Target, Eye, Sparkles, Mail, Camera, Briefcase, GraduationCap, Users, Leaf, Microscope, PenTool, TreePine, Building2, BookOpen, IndianRupee, MapPin, Landmark } from "lucide-react";
import { getProject, PROJECTS } from "@/lib/projects-data";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.project.name} — Wild Agile Foundation` },
      { name: "description", content: loaderData.project.short },
      { property: "og:title", content: loaderData.project.name },
      { property: "og:description", content: loaderData.project.short },
      { property: "og:image", content: loaderData.project.cover },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="container-x pt-40 pb-24 text-center">
      <h1 className="font-serif text-5xl text-primary">Project not found</h1>
      <Link to="/projects" className="btn-primary mt-6 inline-flex">Back to projects</Link>
    </div>
  ),
  component: ProjectDetail,
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

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const other = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <img src={project.cover} alt={project.name} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-16 pt-32">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t: string) => (
                <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">{t}</span>
              ))}
              <span className="rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">{project.status}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {!project.heroTitle && project.headline && (
              <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                {project.headline}
              </p>
            )}
            {project.heroTitle ? (
              <>
                <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {project.name}
                </p>
                <h1 className="mt-3 max-w-4xl text-2xl font-semibold leading-[1.25] text-white md:text-3xl lg:text-4xl">
                  {project.heroTitle}
                </h1>
              </>
            ) : (
              <>
                <h1 className={`max-w-4xl font-serif text-5xl leading-[1.02] text-white md:text-7xl ${project.headline ? "mt-2" : "mt-4"}`}>
                  {project.name}
                </h1>
                {project.tagline && (
                  <p className="mt-4 max-w-2xl text-lg font-medium text-white/90">{project.tagline}</p>
                )}
                <p className="mt-4 max-w-2xl text-lg text-white/85">{project.description}</p>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {project.heroTitle && (
        <section className="section-pad">
          <div className="container-x mx-auto max-w-3xl text-center">
            <Reveal>
              {project.headline && (
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {project.headline}
                </p>
              )}
              <h2 className="mt-3 font-serif text-4xl text-primary md:text-5xl">{project.name}</h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
                {project.description}
              </p>
              {project.closingStatement && (
                <p className="mt-4 text-base italic leading-relaxed text-[var(--gold)] md:text-lg">
                  {project.closingStatement}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Objectives + Vision + Impact */}
      <section className={`section-pad ${project.heroTitle ? "pt-0" : ""}`}>
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <Reveal>
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Target className="h-6 w-6" /></div>
              <h3 className="mt-5 font-serif text-3xl text-primary">
                {project.fundraising ? "What We're Building" : "Objectives"}
              </h3>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85 md:text-lg">
                {project.objectives.map((o: string) => (
                  <li key={o} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />{o}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Eye className="h-6 w-6" /></div>
              <h3 className="mt-5 font-serif text-3xl text-primary">Vision</h3>
              <p className="mt-4 text-base italic leading-relaxed text-foreground/85 md:text-lg">"{project.vision}"</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary"><Sparkles className="h-6 w-6" /></div>
              <h3 className="mt-5 font-serif text-3xl text-primary">Impact</h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">{project.impact}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expected support */}
      <section className="section-pad bg-[var(--cream)]/40">
        <div className="container-x">
          <SectionTitle align="center" eyebrow="Expected Support" title={<>How you can step in.</>} />
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {project.expectedSupport.map((s: string) => {
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

      {project.fundraising && (
        <>
          <section className="section-pad bg-[var(--cream)]/40">
            <div className="container-x">
              <Reveal>
                <SectionTitle
                  align="center"
                  eyebrow="Fundraising"
                  title={<>{project.fundraising.phaseTitle}</>}
                  subtitle={project.fundraising.targetNote}
                />
                <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[var(--gold)]/30 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
                  <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Fundraising Target
                  </div>
                  <div className="mt-2 font-serif text-5xl text-primary md:text-6xl">
                    {project.fundraising.target}
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
                    {project.fundraising.donationImpacts.map((row, i) => (
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
                    {project.fundraising.foundingPartner.amount}
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-foreground/90 md:text-lg">
                    {project.fundraising.foundingPartner.title}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Volunteer form + Donate */}
      <section className="section-pad">
        <div className={`container-x grid gap-10 ${project.fundraising ? "" : "lg:grid-cols-2"}`}>
          {!project.fundraising && (
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <h3 className="font-serif text-3xl text-primary">Volunteer with this project</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within a week.</p>
                <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <Field label="Full name"><input className="field" required /></Field>
                  <Field label="Email"><input className="field" type="email" required /></Field>
                  <Field label="What draws you to this project?"><textarea rows={4} className="field" /></Field>
                  <button className="btn-primary mt-2 self-start" type="submit">Send Application <ArrowRight className="h-4 w-4" /></button>
                </form>
              </div>
            </Reveal>
          )}
          {project.fundraising ? (
            <FundraisingSupport fundraising={project.fundraising} />
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

      {/* Other projects */}
      <section className="pb-24">
        <div className="container-x">
          <SectionTitle eyebrow="Other Projects" title={<>Keep exploring.</>} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {other.map((p) => (
              <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
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

function FundraisingSupport({ fundraising }: { fundraising: NonNullable<ReturnType<typeof getProject>>["fundraising"] }) {
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
