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

const COLLAGE: Array<{
  src: string;
  alt: string;
  className: string;
  rounded: string;
  rotate: string;
  delay: number;
  float: string;
}> = [
  // around the central deer
  { src: "", alt: "Children on a nature walk", className: "absolute left-[2%] top-[6%] h-28 w-36 md:h-36 md:w-44", rounded: "rounded-[28px]", rotate: "-rotate-[6deg]", delay: 0.5, float: "animate-float-a" },
  { src: "", alt: "Tree plantation drive", className: "absolute right-[4%] top-[2%] h-32 w-32 md:h-40 md:w-40", rounded: "rounded-[44px_18px_44px_18px]", rotate: "rotate-[4deg]", delay: 0.6, float: "animate-float-b" },
  { src: "", alt: "School awareness session", className: "absolute left-[0%] bottom-[18%] h-32 w-44 md:h-40 md:w-56", rounded: "rounded-[22px_44px_22px_44px]", rotate: "-rotate-[3deg]", delay: 0.75, float: "animate-float-c" },
  { src: "", alt: "Community clean-up", className: "absolute right-[2%] bottom-[10%] h-32 w-40 md:h-40 md:w-48", rounded: "rounded-[36px]", rotate: "rotate-[5deg]", delay: 0.85, float: "animate-float-a" },
  { src: "", alt: "Bird watching with children", className: "absolute left-[18%] -bottom-[2%] h-24 w-24 md:h-28 md:w-28", rounded: "rounded-full", rotate: "-rotate-[8deg]", delay: 0.95, float: "animate-float-b" },
  { src: "", alt: "Forest learning circle", className: "absolute right-[22%] -top-[2%] h-24 w-24 md:h-28 md:w-28", rounded: "rounded-full", rotate: "rotate-[10deg]", delay: 1.05, float: "animate-float-c" },
];

const HERO_BADGES = [
  { value: "500+", label: "Students" },
  { value: "25+", label: "Programs" },
  { value: "10+", label: "Schools" },
  { value: "100+", label: "Families" },
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // very slow parallax for the collage
  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const deerY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // wire collage sources from real assets
  const sources = [natureWalk, plantation, school, clean, storyImg, hero.url];
  const collage = COLLAGE.map((c, i) => ({ ...c, src: sources[i] }));

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-background pt-28 pb-20 md:pt-32"
    >
      {/* Subtle nature radial gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--secondary)_12%,transparent),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_70%)]" />
      </div>

      {/* Decorative nature flourishes */}
      <motion.div style={{ y: decoY }} aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        {/* glowing green dots */}
        {[
          "left-[8%] top-[20%]", "left-[14%] top-[68%]", "left-[42%] top-[14%]",
          "right-[12%] top-[36%]", "right-[28%] bottom-[18%]", "left-[52%] bottom-[10%]",
        ].map((pos, i) => (
          <span key={i} className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-secondary/70 shadow-[0_0_18px_4px_color-mix(in_oklab,var(--secondary)_45%,transparent)] animate-pulse-soft`} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        {/* gold accent rings */}
        <span className="absolute left-[6%] bottom-[16%] h-24 w-24 rounded-full border border-[var(--gold)]/30" />
        <span className="absolute right-[8%] top-[18%] h-16 w-16 rounded-full border border-[var(--gold)]/40" />
        {/* floating leaves */}
        <Leaf className="absolute left-[28%] top-[18%] h-5 w-5 -rotate-12 text-secondary/35 animate-float-c" />
        <Leaf className="absolute right-[36%] bottom-[12%] h-4 w-4 rotate-45 text-primary/30 animate-float-a" />
        {/* bird silhouettes */}
        <Bird className="absolute left-[44%] top-[8%] h-4 w-4 text-primary/40 animate-float-b" />
        <Bird className="absolute right-[18%] top-[12%] h-3.5 w-3.5 text-primary/30 animate-float-c" />
        {/* thin connecting curves */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M55,20 Q70,10 85,18" stroke="var(--primary)" strokeWidth="0.15" fill="none" strokeDasharray="0.6 0.8" />
          <path d="M60,70 Q75,80 90,72" stroke="var(--gold)" strokeWidth="0.15" fill="none" strokeDasharray="0.6 0.8" />
        </svg>
      </motion.div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[45fr_55fr] lg:gap-10">
        {/* LEFT — editorial copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-primary backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-[var(--gold)]" /> Wild Agile Foundation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-[clamp(2.75rem,6.4vw,6.25rem)] font-medium leading-[0.98] text-primary"
          >
            Building an{" "}
            <span className="italic bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_85%,black)] via-secondary to-[var(--gold)] bg-clip-text text-transparent">
              Environment
            </span>
            <br />
            Conscious Generation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg"
          >
            At Wild Agile Foundation, we reconnect children with nature through immersive learning
            experiences, wildlife education, biodiversity conservation and community participation.
            Every walk in the forest plants a lifelong commitment to protecting our planet.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {[
              <Link key="b1" to="/projects" className="btn-primary">Explore Our Work <ArrowRight className="h-4 w-4" /></Link>,
              <Link key="b2" to="/about" className="btn-gold">Our Story</Link>,
              <Link key="b3" to="/join" className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/8">
                <Heart className="h-4 w-4" /> Join Us
              </Link>,
            ].map((node, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                {node}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.95 } } }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {HERO_BADGES.map((b) => (
              <motion.div
                key={b.label}
                variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-2xl border border-primary/12 bg-white/70 px-4 py-3 text-center backdrop-blur shadow-[0_8px_28px_-18px_rgba(46,94,78,0.45)]"
              >
                <div className="font-serif text-2xl leading-none text-primary">{b.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {b.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — organic photo collage */}
        <motion.div
          style={{ y: collageY }}
          className="relative mx-auto aspect-square w-full max-w-[640px] lg:mx-0"
        >
          {/* central deer focal */}
          <motion.div
            style={{ y: deerY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-10 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="group relative h-full w-full animate-float-slow">
              <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_30%,transparent),transparent_70%)] blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white shadow-[0_30px_80px_-20px_rgba(46,94,78,0.45)] ring-1 ring-primary/10">
                <img
                  src={hero.url}
                  alt="Spotted deer in the forest at dawn"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>

          {/* surrounding photographs */}
          {collage.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
              className={`${c.className} group z-20`}
            >
              <div className={`${c.float}`}>
                <div
                  className={`${c.rounded} ${c.rotate} overflow-hidden border-[3px] border-white bg-white shadow-[0_18px_40px_-18px_rgba(46,94,78,0.45)] transition-transform duration-700 ease-out hover:scale-[1.04] hover:rotate-0`}
                >
                  <img src={c.src} alt={c.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/60"
      >
        <div className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em]">
          Scroll to explore
          <span className="relative block h-12 w-px overflow-hidden bg-primary/15">
            <span className="absolute inset-x-0 top-0 h-4 bg-primary/70 animate-scroll-line" />
          </span>
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
