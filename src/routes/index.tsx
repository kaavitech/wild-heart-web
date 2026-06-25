import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart, Sparkles, Leaf, Bird, GraduationCap, TreePine } from "lucide-react";
import hero from "@/assets/hero-deer.jpg.asset.json";
import logo from "@/assets/wild-agile-logo.jpg.asset.json";
import storyImg from "@/assets/about-story.jpg";
import { PROJECTS } from "@/lib/projects-data";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wild Agile Foundation — Building Environment Conscious Generation" },
      { name: "description", content: "An NGO connecting children with nature, wildlife and forests through immersive programs across India." },
      { property: "og:title", content: "Wild Agile Foundation" },
      { property: "og:description", content: "Building an environment-conscious generation." },
      { property: "og:image", content: hero.url },
    ],
  }),
  component: Home,
});

const STATS = [
  { value: 500, label: "Students Engaged" },
  { value: 25, label: "Nature Engagement Programs" },
  { value: 10, label: "Schools" },
  { value: 100, label: "Families Connected With Nature" },
];

function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects />
      <ImpactNumbers />
      <GalleryPreview />
      <JoinCTA />
    </>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero.url}
          alt="Spotted deer beneath a tree at dawn"
          className="h-full w-full object-cover animate-ken-burns"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur">
                <Sparkles className="h-3 w-3 text-[var(--gold)]" /> Wild Agile Foundation
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5.75rem)] font-medium leading-[0.98] text-white">
                Building an<br />
                <span className="italic text-[var(--gold)]">environment-conscious</span><br />
                generation.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-white/85 md:text-2xl">
                "Every child who connects with nature today becomes tomorrow's protector of forests,
                wildlife and our planet."
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/about" className="btn-gold">
                  Know Our Story <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/projects" className="btn-ghost-light">Explore Projects</Link>
                <Link to="/join" className="btn-ghost-light">
                  <Heart className="h-4 w-4" /> Donate
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-4 lg:flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="animate-float-slow"
            >
              <div className="grid h-56 w-56 place-items-center rounded-full bg-white/90 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-white/40 xl:h-64 xl:w-64">
                <img src={logo.url} alt="Wild Agile Foundation logo" className="h-full w-full rounded-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <div className="h-10 w-px bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal dir="left">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[var(--gold)]/10 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
              <img src={storyImg} alt="Young hands holding a seedling" className="h-[560px] w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden glass-card rounded-2xl px-6 py-4 md:block">
              <div className="font-serif text-3xl text-primary">Since 2024</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">A young, growing forest</div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionTitle
            eyebrow="Our Story"
            title={<>Where children meet the <em className="not-italic text-secondary">wild</em>.</>}
            subtitle="Wild Agile Foundation began with one belief — that the surest way to protect nature is to let children fall in love with it first. We design programs that bring forests, wildlife and water into the lives of young people, and bring young people into the heart of conservation."
          />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link to="/about" className="btn-primary">Learn More <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="section-pad relative">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-[var(--cream)]/60 to-transparent" />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Featured Projects"
            title={<>Field stories<br />from the wild.</>}
          />
          <Reveal>
            <Link to="/projects" className="btn-primary">All Projects <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-6 md:grid-rows-2">
          {PROJECTS.slice(0, 4).map((p, i) => {
            const span =
              i === 0
                ? "md:col-span-4 md:row-span-2"
                : i === 1
                ? "md:col-span-2"
                : i === 2
                ? "md:col-span-2"
                : "md:col-span-2 md:hidden lg:block";
            return (
              <Reveal key={p.slug} dir="up" delay={i * 0.08} className={span}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-card)]"
                >
                  <div className="aspect-[4/3] h-full w-full">
                    <img
                      src={p.cover}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                    <div className="flex gap-2">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{p.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/85">{p.short}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImpactNumbers() {
  return (
    <section className="section-pad bg-primary text-primary-foreground relative overflow-hidden">
      <div aria-hidden className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full bg-[var(--gold)]/15 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            Our Impact
          </div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl">
            Small numbers, big roots.
          </h2>
          <LeafDivider />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} dir="up" delay={i * 0.08}>
              <div className="text-center">
                <div className="text-white">
                  <Counter value={s.value} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/75">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import plantation from "@/assets/project-plantation.jpg";
import natureWalk from "@/assets/project-nature-walk.jpg";
import clean from "@/assets/project-clean.jpg";
import school from "@/assets/project-school.jpg";

function GalleryPreview() {
  const imgs = [hero.url, plantation, natureWalk, clean, school, storyImg];
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Gallery" title={<>Moments from the field.</>} />
          <Reveal>
            <Link to="/gallery" className="btn-primary">Open Gallery <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {imgs.map((src, i) => (
            <Reveal key={i} dir="scale" delay={i * 0.04}>
              <div className="group overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt=""
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const items = [
    { icon: Leaf, label: "Volunteer", desc: "Give time. Plant seasons of change." },
    { icon: TreePine, label: "Partner", desc: "Bring your school, brand or community along." },
    { icon: Heart, label: "Donate", desc: "Fuel programs that take kids back to the wild." },
  ];
  return (
    <section className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Join the Movement"
          title={<>Step into the forest with us.</>}
          subtitle="There's a place for you here — whether you bring time, expertise, or simply willingness."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} dir="up" delay={i * 0.1}>
              <div className="group glass-card flex h-full flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <it.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-primary">{it.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                <Link to="/join" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                  Get involved <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// suppress unused warnings for icons reserved for future use
void Bird; void GraduationCap;
