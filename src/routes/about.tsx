import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Bird, GraduationCap, Baby } from "lucide-react";
import storyImg from "@/assets/about-story.jpg";
import school from "@/assets/project-school.jpg";
import nature from "@/assets/project-nature-walk.jpg";
import plantation from "@/assets/project-plantation.jpg";
import clean from "@/assets/project-clean.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wild Agile Foundation" },
      { name: "description", content: "Our story, focus areas, journey timeline, impact and team behind Wild Agile Foundation." },
      { property: "og:title", content: "About Wild Agile Foundation" },
      { property: "og:description", content: "The story of how we connect children with nature." },
      { property: "og:image", content: storyImg },
    ],
  }),
  component: AboutPage,
});

const FOCUS = [
  { icon: Leaf, title: "Environment", desc: "Restore the ecosystems that quietly sustain us — water, soil, and forests.", emoji: "🌿" },
  { icon: Bird, title: "Wildlife", desc: "Build empathy for wild lives — from spotted deer to neighbourhood sparrows.", emoji: "🦌" },
  { icon: Baby, title: "Children", desc: "Centre young people in every program — as learners, leaders, and storytellers.", emoji: "👧" },
  { icon: GraduationCap, title: "Education", desc: "Weave nature literacy into how schools teach and how families live.", emoji: "📚" },
];

const STATS = [
  { value: 500, label: "Students Engaged" },
  { value: 25, label: "Nature Engagement Programs" },
  { value: 10, label: "Schools" },
  { value: 100, label: "Families Connected With Nature" },
];

const GALLERY = [
  { src: nature, cat: "Nature Walks" },
  { src: school, cat: "Children" },
  { src: clean, cat: "Community" },
  { src: plantation, cat: "Tree Plantation" },
  { src: storyImg, cat: "Children" },
];
const CATS = ["All", "Nature Walks", "Children", "Community", "Tree Plantation"];

function AboutPage() {
  return (
    <>
      <PageHero />
      <Story />
      <Focus />
      <JourneyTimeline />
      <Impact />
      <Gallery />
      <Team />
    </>
  );
}

function PageHero() {
  return (
    <section className="relative pt-40 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
      <div className="container-x">
        <Reveal>
          <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-secondary">About Us</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.02] text-primary md:text-7xl">
            A young foundation with <em className="not-italic text-secondary">old-forest</em> values.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
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
            <blockquote className="mt-8 border-l-4 border-[var(--gold)] pl-5 font-serif text-2xl italic leading-relaxed text-primary">
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
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
              >
                <div aria-hidden className="absolute -right-8 -top-8 text-[7rem] opacity-10 transition-transform duration-500 group-hover:scale-110">{f.emoji}</div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
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
          <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">Our Impact</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Roots we can count.</h2>
          <LeafDivider />
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="text-center">
                <div className="text-white"><Counter value={s.value} /></div>
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
            <Reveal key={i} dir="scale" delay={i * 0.05}>
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

const TEAM = [
  { name: "Aarav Sharma", role: "Founder & Director", quote: "Every child deserves a forest to call their own." },
  { name: "Priya Nair", role: "Programs Lead", quote: "Conservation begins where curiosity is allowed to wander." },
  { name: "Rohan Patil", role: "Field Educator", quote: "The forest is the best teacher I've ever assisted." },
  { name: "Meera Joshi", role: "Community Manager", quote: "Communities heal land when land first heals them." },
];

function Team() {
  return (
    <section className="section-pad bg-[var(--cream)]/40">
      <div className="container-x">
        <SectionTitle eyebrow="Meet Our Team" title={<>People who show up for the wild.</>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} dir="up" delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/30">
                  <div className="flex h-full w-full items-center justify-center font-serif text-7xl text-white/80">
                    {m.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                  <div className="text-xs uppercase tracking-[0.18em] text-secondary">{m.role}</div>
                  <p className="mt-3 font-serif italic text-foreground/80">"{m.quote}"</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
