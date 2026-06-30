import { motion } from "framer-motion";
import {
  Sprout,
  Leaf,
  Landmark,
  GraduationCap,
  Mountain,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

type Milestone = {
  date: string;
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
};

const MILESTONES: Milestone[] = [
  {
    date: "December 2024",
    phase: "The Seed",
    title: "Foundation Established",
    description:
      "Founded with a vision to create lasting environmental change in communities, Wild Agile Foundation planted its first roots in December 2024.",
    icon: Sprout,
  },
  {
    date: "Early 2025",
    phase: "Sapling",
    title: "First Community Activities",
    description:
      "Early environmental initiatives began in schools and neighborhoods — building environmental awareness among children and families through hands-on community experiences.",
    icon: Leaf,
    tags: ["Eco Steps", "Clean Green School", "Jungle Plogging"],
  },
  {
    date: "September 2025",
    phase: "Trunk",
    title: "Official Registration",
    description:
      "Wild Agile Foundation became a formally registered organization, strengthening its commitment to structured environmental education and community programs.",
    icon: Landmark,
  },
  {
    date: "October 2025",
    phase: "Branches",
    title: "JeevanDhara Awareness Program",
    description:
      "Launched JeevanDhara — a wildlife and environmental awareness initiative for schools, in collaboration with Zilla Parishad and Nagpur Municipal Corporation.",
    icon: GraduationCap,
  },
  {
    date: "January 2026",
    phase: "Canopy",
    title: "Forest Conservation Education",
    description:
      "Collaborated with Nagpur Forest Division to design a conservation education program transforming eco-tourism sites into environmental learning destinations.",
    icon: Mountain,
  },
  {
    date: "March 2026",
    phase: "Wild",
    title: "Jungle Trail Experience",
    description:
      "Collaborated with Gorewada Zoological Park to curate Central India's first Premium Jungle Trail Experience.",
    icon: PawPrint,
  },
];

/** Newest milestone first (left → right). */
const MILESTONES_REVERSED = [...MILESTONES].reverse();

export function JourneyTimeline() {
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--cream)]/40">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Our Journey
            </div>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.05] text-primary md:text-5xl lg:text-6xl">
              From a single{" "}
              <span className="bg-gradient-to-br from-secondary to-[var(--gold)] bg-clip-text text-transparent">
                seed
              </span>
              , a movement grows.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:text-right">
              Scroll horizontally through the milestones that shaped Wild Agile Foundation.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 -mx-2 px-2 sm:mx-0 sm:px-0">
          <div
            className="overflow-x-auto pb-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/25 [&::-webkit-scrollbar-track]:bg-primary/5"
          >
            <div className="relative min-w-max px-4 pb-2 sm:px-8">
              {/* horizontal spine */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-12 right-12 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[var(--gold)] via-secondary to-primary"
              />

              <ul className="flex items-stretch gap-4 sm:gap-6">
                {MILESTONES_REVERSED.map((m, i) => {
                  const above = i % 2 === 0;
                  const Icon = m.icon;
                  return (
                    <li
                      key={m.title}
                      className="relative flex h-[26rem] w-[17.5rem] shrink-0 flex-col sm:w-[19rem]"
                    >
                      {above ? (
                        <>
                          <MilestoneCard milestone={m} index={i} className="mb-4" />
                          <TimelineNode icon={Icon} />
                          <div className="flex-1" aria-hidden />
                        </>
                      ) : (
                        <>
                          <div className="flex-1" aria-hidden />
                          <TimelineNode icon={Icon} />
                          <MilestoneCard milestone={m} index={i} className="mt-4" />
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            ← Drag or scroll to walk the path →
          </p>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative z-10 mx-auto grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(46,94,78,0.55)] ring-4 ring-background">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </div>
  );
}

function MilestoneCard({
  milestone: m,
  index,
  className = "",
}: {
  milestone: Milestone;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className={className}
    >
      <article className="rounded-2xl border border-border/80 bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/8 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            {m.date}
          </span>
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {m.phase}
          </span>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-snug text-primary sm:text-2xl">{m.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
        {m.tags && m.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {m.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </motion.div>
  );
}
