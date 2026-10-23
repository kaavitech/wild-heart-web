import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Heart, Sparkles, Leaf, Bird, GraduationCap, TreePine, ChevronDown } from "lucide-react";
import heroDeer from "@/assets/landingPage/deer.jpeg";
import heroWorkshop from "@/assets/landingPage/workshop-hall.thumb.webp";
import heroRailwayWalk from "@/assets/landingPage/railway-walk.thumb.webp";
import heroCommunityForest from "@/assets/landingPage/community-forest.thumb.webp";
import heroDsc5803 from "@/assets/landingPage/DSC_5803.thumb.webp";
import heroCleanup from "@/assets/landingPage/cleanup-drive.thumb.webp";
import heroVolunteers from "@/assets/landingPage/volunteer-group.thumb.webp";
import heroClassroom from "@/assets/landingPage/classroom-session.thumb.webp";
import heroImg8954 from "@/assets/landingPage/IMG_8954.thumb.webp";
import heroJeevanDhara1 from "@/assets/landingPage/jeevanDhara1.thumb.webp";
import heroJeevanDhara2 from "@/assets/landingPage/jeevandhara2.thumb.webp";
import storyImg from "@/assets/about-story.jpg";
import theProblem from "@/assets/the-problem.png";
import { PROGRAMS } from "@/lib/programs-data";
import { loadGalleryPreviewImages } from "@/lib/gallery-data";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { LeafDivider } from "@/components/site/LeafDivider";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { InstagramReelsRow } from "@/components/site/InstagramReelsRow";
import { FieldInstagramReelsRow } from "@/components/site/FieldInstagramReelsRow";
import { NisargBaithakEventDialog } from "@/components/site/NisargBaithakEventDialog";
import { NisargBaithakPosterTile } from "@/components/site/NisargBaithakPosterTile";
import { isNisargBaithakCampaignActive } from "@/lib/nisarg-baithak";
// import { YouTubeStoryCard } from "@/components/site/YouTubeStoryCard";
// import { FIELD_YOUTUBE_VIDEOS } from "@/lib/field-stories-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wild Agile Foundation — Building Environment Conscious Generation" },
      { name: "description", content: "An NGO connecting children with nature, wildlife and forests through immersive programs across India." },
      { property: "og:title", content: "Wild Agile Foundation" },
      { property: "og:description", content: "Building an environment-conscious generation." },
      { property: "og:image", content: heroDeer },
    ],
  }),
  component: Home,
});

const STATS = [
  { value: 5000, label: "Students Connected with Nature" },
  { value: 60, label: "Schools Engaged" },
  { value: 70, label: "Nature Experiences" },
  { value: 100, label: "Families Inspired" },
];

function Home() {
  return (
    <>
      <HeroSection />
      <TheProblemSection />
      <AboutPreview />
      <FeaturedPrograms />
      <ImpactNumbers />
      <NewsUpdates />
      <GalleryPreview />
      <JoinCTA />
    </>
  );
}

const COLLAGE_ITEMS: Array<{
  src: string;
  alt: string;
  delay: number;
}> = [
  // clockwise orbit
  { src: heroWorkshop, alt: "Environmental workshop session", delay: 0.5 },
  { src: heroRailwayWalk, alt: "Children on a nature walk along the railway trail", delay: 0.55 },
  { src: heroCommunityForest, alt: "Community forest gathering", delay: 0.6 },
  { src: heroDsc5803, alt: "Students learning in nature", delay: 0.65 },
  { src: heroCleanup, alt: "Community clean-up drive", delay: 0.7 },
  { src: heroVolunteers, alt: "Volunteers exploring nature together", delay: 0.75 },
  { src: heroClassroom, alt: "Classroom awareness session", delay: 0.8 },
  { src: heroImg8954, alt: "Community nature engagement", delay: 0.85 },
  { src: heroJeevanDhara1, alt: "Jeevan Dhara water conservation activity", delay: 0.9 },
  { src: heroJeevanDhara2, alt: "Jeevan Dhara community workshop", delay: 0.95 },
];

const HERO_COLLAGE = {
  centerSize: 33,
  satelliteWidth: 23.5,
  centerGap: 3,
  neighborOverlap: 0.1,
  cornerAngleNudge: 8,
  cornerRadiusInset: 0,
};

/** Diagonal slots on a 10-image ring (indices 1, 4, 6, 9). */
const CORNER_ORBIT_INDICES = new Set([1, 4, 6, 9]);

/** Push corner slots slightly away from top/bottom pole images on the ring. */
function cornerOrbitAngle(index: number, baseAngle: number, nudge: number) {
  switch (index) {
    case 1:
      return baseAngle + nudge;
    case 9:
      return baseAngle - nudge;
    case 4:
      return baseAngle - nudge;
    case 6:
      return baseAngle + nudge;
    default:
      return baseAngle;
  }
}

/**
 * Bottom → top stacking (each image covers the one before it).
 * Upper: jeevan1 ← jeevan2 ← community ← railway ← workshop
 * Lower: DSC ← cleanup ← IMG ← classroom ← volunteer
 */
const ORBIT_Z_ORDER = [8, 9, 2, 1, 3, 4, 7, 6, 5, 0];

function collageZIndex(index: number) {
  const pos = ORBIT_Z_ORDER.indexOf(index);
  return pos < 0 ? 21 : 21 + pos;
}

function collageOrbitRadius(
  centerSize: number,
  satelliteWidth: number,
  centerGap: number,
  total: number,
  neighborOverlap: number,
) {
  const centerR = centerSize / 2;
  const halfW = satelliteWidth / 2;
  const halfH = (satelliteWidth * 0.75) / 2;
  const innerReach = Math.hypot(halfW, halfH);
  const minRadius = centerR + centerGap + innerReach;

  const chord = satelliteWidth * (1 - neighborOverlap);
  const spacingRadius = total > 1 ? chord / (2 * Math.sin(Math.PI / total)) : minRadius;

  return Math.max(minRadius, spacingRadius);
}

function collageOrbitPosition(index: number, total: number, radius: number) {
  const baseAngle = (360 / total) * index;
  const isCorner = CORNER_ORBIT_INDICES.has(index);
  const angle = isCorner
    ? cornerOrbitAngle(index, baseAngle, HERO_COLLAGE.cornerAngleNudge)
    : baseAngle;
  const r = isCorner ? radius - HERO_COLLAGE.cornerRadiusInset : radius;
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + Math.sin(rad) * r}%`,
    top: `${50 - Math.cos(rad) * r}%`,
  };
}

const HERO_ROTATION_MS = 8000;

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const campaignActive = useMemo(() => isNisargBaithakCampaignActive(), []);
  const [nisargBaithakOpen, setNisargBaithakOpen] = useState(false);
  const [activeVisual, setActiveVisual] = useState(0);

  const collage = COLLAGE_ITEMS;
  const orbitRadius = collageOrbitRadius(
    HERO_COLLAGE.centerSize,
    HERO_COLLAGE.satelliteWidth,
    HERO_COLLAGE.centerGap,
    collage.length,
    HERO_COLLAGE.neighborOverlap,
  );
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [collageReady, setCollageReady] = useState(false);

  useEffect(() => {
    if (!campaignActive) return;
    const id = window.setInterval(() => {
      setActiveVisual((prev) => (prev + 1) % 2);
    }, HERO_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [campaignActive]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % collage.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [collage.length]);

  useEffect(() => {
    const enable = () => setCollageReady(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(enable, 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const showNisargBaithak = campaignActive && activeVisual === 0;
  const showOrbitCollage = !campaignActive || activeVisual === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background pt-[7.5rem] pb-8 md:pt-[8rem]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--secondary)_12%,transparent),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_70%)]" />
      </div>

      <motion.div style={{ y: decoY }} aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        {[
          "left-[8%] top-[20%]", "left-[14%] top-[68%]", "left-[42%] top-[14%]",
          "right-[12%] top-[36%]", "right-[28%] bottom-[18%]", "left-[52%] bottom-[10%]",
        ].map((pos, i) => (
          <span key={i} className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-secondary/70 shadow-[0_0_18px_4px_color-mix(in_oklab,var(--secondary)_45%,transparent)] animate-pulse-soft`} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        <span className="absolute left-[6%] bottom-[16%] h-24 w-24 rounded-full border border-[var(--gold)]/30" />
        <span className="absolute right-[8%] top-[18%] h-16 w-16 rounded-full border border-[var(--gold)]/40" />
        <Leaf className="absolute left-[28%] top-[18%] h-5 w-5 -rotate-12 text-secondary/35 animate-float-c" />
        <Leaf className="absolute right-[36%] bottom-[12%] h-4 w-4 rotate-45 text-primary/30 animate-float-a" />
        <Bird className="absolute left-[44%] top-[8%] h-4 w-4 text-primary/40 animate-float-b" />
        <Bird className="absolute right-[18%] top-[12%] h-3.5 w-3.5 text-primary/30 animate-float-c" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M55,20 Q70,10 85,18" stroke="var(--primary)" strokeWidth="0.15" fill="none" strokeDasharray="0.6 0.8" />
          <path d="M60,70 Q75,80 90,72" stroke="var(--gold)" strokeWidth="0.15" fill="none" strokeDasharray="0.6 0.8" />
        </svg>
      </motion.div>

      <div className="container-x relative flex min-h-0 flex-1 flex-col justify-center py-4 md:py-6">
        <div className="grid min-h-0 items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="relative z-20 min-w-0 w-full isolate pr-2 lg:pr-4">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(1.875rem,3.4vw,3.625rem)] font-medium leading-[1.08] text-primary"
            >
              <span className="block">
                Building an{" "}
                <span className="italic bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_85%,black)] via-secondary to-gold bg-clip-text text-transparent">
                  Environment
                </span>
              </span>
              <span className="block whitespace-nowrap">Conscious Generation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lead mt-4 md:mt-5"
            >
              We protect what we love, and we love what we experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-body mt-4 md:mt-5"
            >
              Wild Agile Foundation reconnects people with nature through immersive outdoor learning,
              wildlife education and community-led conservation—creating lifelong environmental stewardship.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
              className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-7"
            >
              {[
                <Link key="b1" to="/programs" className="btn-primary">Explore Our Work <ArrowRight className="h-4 w-4" /></Link>,
                <Link key="b2" to="/join" className="btn-gold">Support Our Mission</Link>,
              ].map((node, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  {node}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="relative z-0 min-w-0">
            <div className="relative mx-auto aspect-square w-full max-w-full overflow-visible">
              <AnimatePresence mode="wait" initial={false}>
                {showNisargBaithak && (
                  <motion.div
                    key="nisarg-baithak"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <NisargBaithakPosterTile variant="hero" onClick={() => setNisargBaithakOpen(true)} />
                  </motion.div>
                )}

                {showOrbitCollage && (
                  <motion.div
                    key="orbit-collage"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <motion.div style={{ y: collageY }} className="relative h-full w-full overflow-visible">
                      <motion.div
                        style={{ width: `${HERO_COLLAGE.centerSize}%`, height: `${HERO_COLLAGE.centerSize}%` }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="group relative h-full w-full">
                          <div className="absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_30%,transparent),transparent_70%)] blur-2xl" />
                          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-[0_30px_80px_-20px_rgba(46,94,78,0.45)] ring-1 ring-primary/10">
                            <img
                              src={heroDeer}
                              alt="Spotted deer in the forest"
                              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                              fetchPriority="high"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {collage.map((c, i) => {
                        const pos = collageOrbitPosition(i, collage.length, orbitRadius);
                        const isHighlighted = highlightIndex === i;
                        const z = isHighlighted ? 20 + collage.length + 2 : collageZIndex(i);
                        return (
                          <div
                            key={c.alt}
                            className="absolute"
                            style={{
                              left: pos.left,
                              top: pos.top,
                              width: `${HERO_COLLAGE.satelliteWidth}%`,
                              zIndex: z,
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.88 }}
                              animate={{ opacity: 1, scale: isHighlighted ? 1.1 : 1 }}
                              transition={{
                                opacity: { duration: 0.8, delay: c.delay, ease: [0.22, 1, 0.36, 1] },
                                scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                              }}
                              className="aspect-[4/3]"
                            >
                              <div
                                className={`group h-full w-full overflow-hidden rounded-[1.35rem] border-[3px] bg-white transition-[box-shadow,ring-color] duration-500 ease-out ${
                                  isHighlighted
                                    ? "border-gold shadow-[0_28px_56px_-14px_rgba(46,94,78,0.55)] ring-2 ring-gold/50"
                                    : "border-white shadow-[0_18px_40px_-18px_rgba(46,94,78,0.45)] ring-1 ring-primary/10"
                                }`}
                              >
                                <img
                                  src={collageReady ? c.src : undefined}
                                  alt={c.alt}
                                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {campaignActive && (
              <div className="mt-4 flex justify-center gap-2 lg:justify-end lg:pr-4">
                {[0, 1].map((index) => (
                  <span
                    key={index}
                    aria-hidden
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeVisual === index ? "w-8 bg-primary" : "w-1.5 bg-primary/25"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 shrink-0 flex justify-center text-primary/60 md:mt-8"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em]">
            Scroll to explore
            <span className="relative block h-10 w-px overflow-hidden bg-primary/15">
              <span className="absolute inset-x-0 top-0 h-4 bg-primary/70 animate-scroll-line" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

function AboutPreview() {
  return (
    <>
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
          <Reveal delay={0.25}>
            <div className="mt-8">
              <Link to="/about" className="btn-primary">Learn More <ArrowRight className="h-4 w-4" /></Link>
            </div>
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

    <JourneyTimeline />
    </>
  );
}

function FeaturedPrograms() {
  return (
    <section className="section-pad relative">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-[var(--cream)]/60 to-transparent" />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            className="max-w-2xl"
            eyebrow="Our Programs"
            title="Creating Experiences that Inspire Change"
            subtitle="Each program becomes one step in the journey."
          />
          <Reveal>
            <Link to="/programs" className="btn-primary shrink-0">All Programs <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>

        <div className="scrollbar-hide mt-12 overflow-x-auto overscroll-x-contain">
          <div className="flex w-max gap-8 pr-6">
          {PROGRAMS.map((p, i) => (
            <div key={p.slug} className="w-72 shrink-0 sm:w-80">
              <Reveal dir="up" delay={i * 0.06} className="h-full">
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="group relative isolate block aspect-[3/4] w-full overflow-hidden rounded-[1.35rem] shadow-[var(--shadow-card)]"
                >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-white sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
                    {p.short}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
              </Reveal>
            </div>
          ))}
          </div>
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
          <div className="eyebrow-light">Our Impact</div>
          <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-primary-foreground md:text-5xl lg:text-6xl">
            Growing an Environment Conscious Generation
          </h2>
          <LeafDivider />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} dir="up" delay={i * 0.08}>
              <div className="text-center">
                <Counter value={s.value} variant="light" />
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

function GalleryPreview() {
  const imgs = loadGalleryPreviewImages(2);
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
          {imgs.map((image, i) => (
            <Reveal key={image.id} dir="scale" delay={i * 0.04}>
              <div className="group overflow-hidden rounded-2xl">
                <img
                  src={image.thumbSrc}
                  alt={image.category}
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
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
    { icon: Leaf, label: "Volunteer", desc: "Share your time and skills." },
    { icon: TreePine, label: "Partner", desc: "Collaborate with us to create lasting impact." },
    { icon: Heart, label: "Support", desc: "Help us build the next generation of environmental stewards." },
  ];
  return (
    <section className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
      <div className="container-x">
        <SectionTitle
          align="center"
          eyebrow="Join the Movement"
          title="Be Part of the Change"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} dir="up" delay={i * 0.1}>
              <div className="group glass-card flex h-full flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <it.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-primary">{it.label}</h3>
                <p className="text-body mt-2">{it.desc}</p>
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

const ARCHIVES: Array<{ year: string; months: Array<{ name: string; posts: string[] }> }> = [
  /* hidden for now
  { year: "2026", months: [
    { name: "June", posts: ["Monsoon Walks in the Western Ghats", "Biodiversity Week at Vidya Niketan"] },
    { name: "May", posts: ["1,000 Native Saplings, One Hillside", "Streambank Clean-up Along the Mula"] },
    { name: "April", posts: ["Featured in The Hindu", "Spotted Deer Census Concluded"] },
  ]},
  { year: "2025", months: [
    { name: "December", posts: ["Year in Review: Roots & Wings", "Winter Bird Count Report"] },
    { name: "November", posts: ["Forest School Pilot Launched", "Partnering with Pune Municipal Schools"] },
    { name: "October", posts: ["Wetland Walks for Teens"] },
  ]},
  */
];

function NewsUpdates() {
  // const [openYear, setOpenYear] = useState<string | null>("2026");
  // const [openMonth, setOpenMonth] = useState<string | null>("2026-June");

  return (
    <section className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="News & Updates"
            title={<>Stories from<br />the field.</>}
            subtitle="Watch our latest field stories on Instagram, plus conservation activities, school programs, media coverage and program updates."
          />
          <Reveal>
            <Link to="/" className="btn-primary">View All Updates <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>

        <div className="mt-10">
          <InstagramReelsRow />
        </div>

        <div className="mt-14">
          <FieldInstagramReelsRow />
        </div>

          {/* Archives — hidden for now
          <Reveal dir="up">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[1.5rem] bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
                <div className="border-b border-white/10 px-6 py-5">
                  <div className="eyebrow-light">Archives</div>
                  <h3 className="mt-1 font-serif text-2xl text-primary-foreground">Browse by date</h3>
                </div>
                <div className="px-3 py-3">
                  {ARCHIVES.map((y) => {
                    const yOpen = openYear === y.year;
                    return (
                      <div key={y.year} className="border-b border-white/10 last:border-0">
                        <button
                          onClick={() => setOpenYear(yOpen ? null : y.year)}
                          className="flex w-full items-center justify-between px-3 py-3 text-left font-serif text-lg text-primary-foreground transition-colors hover:text-gold"
                        >
                          {y.year}
                          <ChevronDown className={`h-4 w-4 transition-transform ${yOpen ? "rotate-180" : ""}`} />
                        </button>
                        {yOpen && (
                          <div className="pb-2">
                            {y.months.map((m) => {
                              const key = `${y.year}-${m.name}`;
                              const mOpen = openMonth === key;
                              return (
                                <div key={key} className="ml-3">
                                  <button
                                    onClick={() => setOpenMonth(mOpen ? null : key)}
                                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-primary-foreground/85 transition-colors hover:text-gold"
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      <ChevronDown className={`h-3 w-3 transition-transform ${mOpen ? "rotate-0" : "-rotate-90"}`} />
                                      {m.name}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/55">
                                      {m.posts.length}
                                    </span>
                                  </button>
                                  {mOpen && (
                                    <ul className="mb-2 ml-7 space-y-1.5 border-l border-white/10 pl-4 pt-1">
                                      {m.posts.map((p) => (
                                        <li key={p}>
                                          <Link to="/" className="block text-[13px] leading-snug text-primary-foreground/75 transition-colors hover:text-gold">
                                            {p}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-white/10 p-5">
                  <Link
                    to="/"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
                  >
                    View All Archives <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </Reveal>
          */}
      </div>
    </section>
  );
}

// suppress unused warnings for icons reserved for future use
void Bird; void GraduationCap;

