import { Reveal } from "@/components/site/Reveal";

export const PARTNERS = [
  {
    name: "Forest Division, Nagpur",
    logo: "/media/partners/forest-division-nagpur.webp",
    note: "Maharashtra Forest Department",
  },
  {
    name: "Zilla Parishad, Nagpur",
    logo: "/media/partners/zilla-parishad-nagpur.webp",
    note: "District school network",
  },
  {
    name: "Gorewada Zoological Park",
    logo: "/media/partners/gorewada-zoo.webp",
    note: "Balasaheb Thackeray Gorewada International Zoological Park",
  },
  {
    name: "Purva Vidarbha Mahila Parishad",
    logo: "/media/partners/purva-vidarbha-mahila-parishad.webp",
    note: "Community partner",
  },
] as const;

/** "Working with" logo strip for government, zoo and community partners. */
export function PartnersStrip({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="partners-heading" className={`py-16 ${className}`}>
      <div className="container-x">
        <Reveal>
          <h2
            id="partners-heading"
            className="text-center font-display text-xs font-semibold uppercase tracking-[0.22em] text-secondary"
          >
            In partnership with
          </h2>
        </Reveal>
        <div role="list" className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div role="listitem" className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-white p-5 text-center shadow-[var(--shadow-card)]">
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  title={p.note}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-full object-contain"
                />
                <span className="mt-3 text-xs font-medium leading-snug text-foreground/70">{p.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
