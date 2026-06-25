import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import hero from "@/assets/hero-deer.jpg.asset.json";
import plantation from "@/assets/project-plantation.jpg";
import natureWalk from "@/assets/project-nature-walk.jpg";
import clean from "@/assets/project-clean.jpg";
import school from "@/assets/project-school.jpg";
import story from "@/assets/about-story.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Wild Agile Foundation" },
      { name: "description", content: "Photographs from nature walks, wildlife programs, school visits and community events." },
      { property: "og:title", content: "Gallery — Wild Agile Foundation" },
      { property: "og:description", content: "Photos from the field." },
      { property: "og:image", content: hero.url },
    ],
  }),
  component: GalleryPage,
});

type Img = { src: string; cat: string };
const IMAGES: Img[] = [
  { src: hero.url, cat: "Wildlife" },
  { src: plantation, cat: "Tree Plantation" },
  { src: natureWalk, cat: "Nature Walks" },
  { src: clean, cat: "Community" },
  { src: school, cat: "School Visits" },
  { src: story, cat: "Children" },
  { src: hero.url, cat: "Bird Watching" },
  { src: plantation, cat: "Events" },
  { src: natureWalk, cat: "Children" },
  { src: clean, cat: "Community" },
  { src: school, cat: "Events" },
  { src: story, cat: "Children" },
];

const CATS = ["All", "Wildlife", "Children", "Nature Walks", "Bird Watching", "Tree Plantation", "School Visits", "Events", "Community"];

function GalleryPage() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const visible = cat === "All" ? IMAGES : IMAGES.filter((i) => i.cat === cat);

  return (
    <>
      <section className="relative pt-40 pb-10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle eyebrow="Gallery" title={<>Field, forest, and faces.</>} />
          <div className="mt-8 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {visible.map((g, i) => (
              <Reveal key={`${g.src}-${i}`} dir="scale" delay={(i % 6) * 0.04}>
                <button onClick={() => setLightbox(g.src)} className="group block w-full overflow-hidden rounded-2xl">
                  <img src={g.src} alt={g.cat} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-110" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4 backdrop-blur"
          >
            <button aria-label="close" onClick={() => setLightbox(null)} className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
