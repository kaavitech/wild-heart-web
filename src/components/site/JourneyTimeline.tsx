import { motion } from "framer-motion";
import { SectionTitle } from "@/components/site/SectionTitle";

const TIMELINE = [
  { year: "2024", label: "Foundation Established" },
  { year: "2024", label: "Nature Awareness" },
  { year: "2024", label: "School Programs" },
  { year: "2025", label: "Wildlife Education" },
  { year: "2025", label: "Community Activities" },
  { year: "2025", label: "Forest Partnerships" },
  { year: "2025", label: "Nature Connect" },
  { year: "2026", label: "RUN WALK CLEAN" },
  { year: "2026", label: "JeevanDhara" },
  { year: "Today", label: "A growing forest of changemakers" },
] as const;

const TIMELINE_REVERSED = [...TIMELINE].reverse();

export function JourneyTimeline() {
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--cream)]/40">
      <div className="container-x">
        <SectionTitle align="center" eyebrow="Our Journey" title={<>A timeline planted in 2024.</>} />

        <div className="relative mt-16 -mx-2 px-2 sm:mx-0 sm:px-0">
          <div className="overflow-x-auto pb-6 [scrollbar-width:thin]">
            <div className="relative min-w-max px-4 sm:px-8">
              {/* horizontal spine */}
              <div
                aria-hidden
                className="absolute left-8 right-8 top-[7.25rem] h-px bg-gradient-to-r from-[var(--gold)] via-secondary to-primary"
              />

              <ul className="flex items-start gap-5 sm:gap-6">
                {TIMELINE_REVERSED.map((t, i) => (
                  <li key={`${t.year}-${t.label}`} className="relative flex w-44 shrink-0 flex-col items-center sm:w-52">
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.55, delay: i * 0.04 }}
                      className="w-full"
                    >
                      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-5">
                        <div className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)] sm:text-xs">
                          {t.year}
                        </div>
                        <div className="mt-1 font-serif text-lg leading-snug text-primary sm:text-xl">
                          {t.label}
                        </div>
                      </div>
                    </motion.div>

                    <span className="relative z-10 mt-5 grid h-3 w-3 place-items-center">
                      <span className="h-3 w-3 rounded-full bg-[var(--gold)] ring-4 ring-background" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
