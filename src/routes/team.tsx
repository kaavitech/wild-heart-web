import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { motion } from "framer-motion";
import { TEAM as team } from "@/lib/team-data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Wild Agile Foundation" },
      { name: "description", content: "The people behind Wild Agile Foundation." },
      { property: "og:title", content: "Our Team — Wild Agile Foundation" },
      { property: "og:description", content: "Meet the people connecting children with nature." },
      { property: "og:image", content: team[0]?.img },
    ],
  }),
  component: TeamPage,
});

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
          {team.map((m, i) => (
            <Reveal key={m.name} dir="up" delay={(i % 4) * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-primary">{m.name}</h3>
                  <div className="text-xs uppercase tracking-[0.18em] text-secondary">{m.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{m.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
