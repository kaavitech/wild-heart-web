import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { PROJECTS } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Wild Agile Foundation" },
      { name: "description", content: "Ongoing nature, wildlife and community projects by Wild Agile Foundation." },
      { property: "og:title", content: "Projects — Wild Agile Foundation" },
      { property: "og:description", content: "Explore programs connecting children with nature." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="relative pt-40 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Projects"
            title={<>Programs growing in real soil.</>}
            subtitle="Each project is a long conversation with a place — its people, its trees, its water."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} dir="up" delay={i * 0.06}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className={`group relative block overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-card)] ${
                  i % 3 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img src={p.cover} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur">{t}</span>
                    ))}
                    <span className="rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">{p.status}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-4xl">{p.name}</h3>
                  <p className="mt-2 max-w-xl text-sm text-white/85">{p.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                    Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
