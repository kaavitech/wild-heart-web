import { createFileRoute } from "@tanstack/react-router";
import bg from "@/assets/newsletter-bg.jpg";
import { Reveal } from "@/components/site/Reveal";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/newsletter")({
  head: () =>
    pageHead({
      title: "Newsletter",
      description:
        "Stay connected with nature. Receive stories, wildlife updates, events and volunteer opportunities from Wild Agile Foundation.",
      path: "/newsletter",
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
            <h1 className="mt-4 heading-page">Stay Connected With Nature</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/85">
              Receive inspiring stories, wildlife updates, upcoming events and volunteer opportunities, sent gently, never more than twice a month.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <NewsletterForm variant="page" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
