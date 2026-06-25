import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Wild Agile Foundation" },
      { name: "description", content: "The people behind Wild Agile Foundation." },
      { property: "og:title", content: "Our Team — Wild Agile Foundation" },
      { property: "og:description", content: "Meet the people connecting children with nature." },
    ],
  }),
  component: TeamPage,
});

const TEAM = [
  { name: "Aarav Sharma", role: "Founder & Director", quote: "Every child deserves a forest to call their own." },
  { name: "Priya Nair", role: "Programs Lead", quote: "Conservation begins where curiosity is allowed to wander." },
  { name: "Rohan Patil", role: "Field Educator", quote: "The forest is the best teacher I've ever assisted." },
  { name: "Meera Joshi", role: "Community Manager", quote: "Communities heal land when land first heals them." },
  { name: "Devika Rao", role: "Wildlife Advisor", quote: "Sparrows in cities matter as much as tigers in jungles." },
  { name: "Karan Mehta", role: "Partnerships", quote: "We grow faster together — schools, brands and citizens." },
  { name: "Ishaan Verma", role: "Field Photographer", quote: "A photograph can start a conversation a leaflet can't." },
  { name: "Nisha Kulkarni", role: "Volunteer Coordinator", quote: "Showing up is the whole job." },
];

function TeamPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Team"
            title={<>The hands and hearts behind the work.</>}
            subtitle="A small, devoted team — supported by volunteers, photographers, teachers and friends across the country."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} dir="up" delay={(i % 4) * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/5] w-full bg-gradient-to-br from-secondary/40 via-primary/30 to-[var(--gold)]/30">
                  <div className="flex h-full w-full items-center justify-center font-serif text-7xl text-white/85">
                    {m.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                  <div className="text-xs uppercase tracking-[0.18em] text-secondary">{m.role}</div>
                  <p className="mt-3 font-serif italic text-foreground/80">"{m.quote}"</p>
                  <a href="#" aria-label="LinkedIn" className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary transition hover:bg-primary hover:text-primary-foreground">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
