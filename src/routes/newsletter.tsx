import { createFileRoute } from "@tanstack/react-router";
import { Mail, ArrowRight } from "lucide-react";
import bg from "@/assets/newsletter-bg.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — Wild Agile Foundation" },
      { name: "description", content: "Stay connected with nature. Receive inspiring stories, wildlife updates, events and volunteer opportunities." },
      { property: "og:title", content: "Stay Connected With Nature" },
      { property: "og:description", content: "Subscribe to the Wild Agile Foundation newsletter." },
    ],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-40 pb-24">
      <img src={bg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/80 via-primary/65 to-primary/85" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center text-white">
          <Reveal>
            <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">Newsletter</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">Stay Connected With Nature</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/85">
              Receive inspiring stories, wildlife updates, upcoming events and volunteer opportunities — sent gently, never more than twice a month.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/30 bg-white/10 py-3 pl-11 pr-4 text-white placeholder:text-white/55 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
                />
              </div>
              <button className="btn-gold" type="submit">Subscribe <ArrowRight className="h-4 w-4" /></button>
            </form>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/55">No spam. Unsubscribe anytime.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
