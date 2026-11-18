import { pageHead } from "@/lib/site-config";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Bird, GraduationCap, Baby } from "lucide-react";
import storyImg from "@/assets/about-story.jpg";
import theProblem from "@/assets/the-problem.png";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { TEAM } from "@/lib/team-data";
import { loadGalleryThumbsByCategory } from "@/lib/gallery-data";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Us",
      description: "Our story, focus areas, journey timeline, impact and the team behind Wild Agile Foundation in Nagpur.",
      path: "/about",
      image: storyImg,
    }),
  component: AboutPage,
});

const FOCUS = [
  { icon: Leaf, title: "Environment", desc: "Restore the ecosystems that quietly sustain us — water, soil, and forests.", emoji: "🌿" },
  { icon: Bird, title: "Wildlife", desc: "Build empathy for wild lives — from spotted deer to neighborhood sparrows.", emoji: "🦌" },
  { icon: Baby, title: "Children", desc: "Centre young people in every program — as learners, leaders, and storytellers.", emoji: "👧" },
  { icon: GraduationCap, title: "Education", desc: "Weave nature literacy into how schools teach and how families live.", emoji: "📚" },
];

const STATS = [
  { value: 5000, label: "Students Connected with Nature" },
  { value: 60, label: "Schools Engaged" },
  { value: 70, label: "Nature Experiences" },
  { value: 100, label: "Families Inspired" },
];

const TRAIL_GALLERY_CATEGORIES = ["Eco Steps", "Run Walk Clean"] as const;

const GALLERY = TRAIL_GALLERY_CATEGORIES.flatMap((category) =>
  loadGalleryThumbsByCategory(category).map((image) => ({
    id: image.id,
    src: image.thumbSrc,
    cat: category,
  })),
);

const CATS = ["All", ...TRAIL_GALLERY_CATEGORIES];

function AboutPage() {
  return (
    <>
      <PageHero />
      <Story />
      <TheProblemSection />
      <OurBelief />
      <Focus />
      <JourneyTimeline />
      <Impact />
      <Gallery />
      <Team />
    </>
  );
}

// The Problem and Our Belief moved here from the home page (Parag, 2026-11-18).
const PROBLEM_STATEMENTS = [
  "Children spend less time outdoors than any generation before them.",
  "Cities continue to expand.",
  "Forests feel distant.",
  "Wildlife becomes something we only see on screens.",
  "The more disconnected we become from nature, the harder it becomes to protect it.",
] as const;

function TheProblemSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-b from-[var(--cream)]/70 to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal dir="left">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-primary/8 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <img
                src={theProblem}
                alt="The Problem — a child looks from the forest toward an expanding city skyline"
                className="h-[420px] w-full object-cover md:h-[520px]"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <div className="min-w-0">
          <SectionTitle
            className="max-w-none"
            eyebrow="The Problem"
            title="Nature is disappearing from our everyday lives."
          />

          <div className="mt-6 space-y-4">
            {PROBLEM_STATEMENTS.map((line, i) => (
              <Reveal key={line} delay={0.08 + i * 0.06}>
                <p className="text-body">{line}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <LeafDivider />
          </div>

          <Reveal delay={0.45}>
            <blockquote className="mt-8 border-l-4 border-gold pl-5">
              <p className="text-pull-quote">Conservation doesn&apos;t begin with action.</p>
              <p className="text-accent-line mt-3">It begins with connection.</p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OurBelief() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="min-w-0 order-2 lg:order-1">
          <SectionTitle
            className="max-w-none"
            eyebrow="Our Belief"
            title="Conservation Begins with Understanding."
          />
          <Reveal delay={0.1}>
            <p className="text-body mt-5">
              At Wild Agile Foundation, we believe that lasting environmental change starts with awareness.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-body mt-4">People protect what they understand.</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-body mt-4">
              That is why we create meaningful experiences that help people discover forests, wildlife,
              biodiversity, and the environment—not through classrooms alone, but by experiencing nature
              firsthand.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="mt-8 border-l-4 border-gold pl-5">
              <p className="text-pull-quote">Every experience nurtures curiosity.</p>
              <p className="text-pull-quote mt-3">Curiosity leads to understanding.</p>
              <p className="text-accent-line mt-3">Understanding inspires action.</p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal dir="right" className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[var(--gold)]/10 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <img src={storyImg} alt="Young hands holding a seedling" className="h-[560px] w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden glass-card rounded-2xl px-6 py-4 md:block">
              <div className="font-serif text-3xl text-primary">Since 2024</div>
              <div className="meta-label mt-1">A young, growing forest</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PageHero() {
  return (
    <section className="relative pt-40 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
      <div className="container-x">
        <Reveal>
          <div className="eyebrow">About Us</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 max-w-4xl heading-page text-primary">
            A young foundation with <em className="not-italic text-secondary">old-forest</em> values.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body mt-6 max-w-2xl">
            We work where children and ecosystems meet — schools and forests, classrooms and rivers — quietly
            building a generation that cares because it has been there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal dir="left">
          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
            <img src={storyImg} alt="Hands holding a seedling" className="h-[640px] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <SectionTitle
            eyebrow="Our Story"
            title={<>It started with a walk.</>}
            subtitle="A founder, a group of curious kids, a city forest no one paid attention to. By the end of that afternoon, the children had counted six bird species and named two trees they passed every day. Wild Agile Foundation grew from that single morning — the simple discovery that nature, when offered with patience, is irresistible."
          />
          <Reveal delay={0.2}>
            <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-2xl italic leading-relaxed text-primary">
              "Children don't need to be taught to love the wild. They need to be taken to it."
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="section-pad relative">
      <div className="container-x">
        <SectionTitle align="center" eyebrow="Core Areas of Focus" title={<>Four roots, one canopy.</>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} dir="up" delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="card group relative h-full overflow-hidden"
              >
                <div aria-hidden className="absolute -right-8 -top-8 text-[7rem] opacity-10 transition-transform duration-500 group-hover:scale-110">{f.emoji}</div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 heading-card text-primary">{f.title}</h3>
                <p className="copy-card mt-2">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="section-pad bg-primary text-primary-foreground">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow-light">Our Impact</div>
          <h2 className="mt-3 heading-section text-primary-foreground">
            Roots we can count.
          </h2>
          <LeafDivider />
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="text-center">
                <Counter value={s.value} variant="light" />
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/75">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle eyebrow="Event Gallery" title={<>Glimpses from the trail.</>} />
        <div className="mt-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 hover:bg-primary hover:text-primary-foreground transition">
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} dir="scale" delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl">
                <img src={g.src} alt={g.cat} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.2em] text-white">{g.cat}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section-pad bg-[var(--cream)]/40">
      <div className="container-x">
        <SectionTitle eyebrow="Meet Our Team" title={<>People who show up for the wild.</>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} dir="up" delay={(i % 4) * 0.06}>
              <motion.div whileHover={{ y: -4 }} className="group card-media h-full">
                <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="heading-card text-primary">{m.name}</h3>
                  <div className="text-xs uppercase tracking-[0.18em] text-secondary">{m.role}</div>
                  <p className="copy-card mt-3">{m.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
