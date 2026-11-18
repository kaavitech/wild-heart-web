import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarHeart,
  FileBarChart,
  Handshake,
  Megaphone,
  PackageOpen,
  School,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { PROGRAMS } from "@/lib/programs-data";
import { MEDIA_CLIPPING_COUNT, MEDIA_OUTLETS } from "@/lib/media-data";
import { CONTACT, REGISTRATION } from "@/lib/site-config";

// Partnership content for brands and CSR teams, shown on the Contact page (/contact#partner).

const WAYS = [
  {
    icon: School,
    title: "Sponsor a school program",
    text: "Fund JeevanDhara sessions or nature walks for a set of schools, and help us reach more children every term.",
  },
  {
    icon: Users,
    title: "Employee volunteering",
    text: "Bring your team to a forest clean-up, a Sunday nature walk or a plantation morning. We plan the day and handle safety.",
  },
  {
    icon: CalendarHeart,
    title: "Event partnership",
    text: "Co-host a Nisarg Baithak talk, Run Walk Clean drive or a Wildlife Week campaign with your brand alongside ours.",
  },
  {
    icon: PackageOpen,
    title: "In-kind support",
    text: "Books for the Nature Library, field kits, printing, transport for school trips, or design and media help.",
  },
  {
    icon: Megaphone,
    title: "Cause campaigns",
    text: "Build a campaign with us around trees, wildlife or clean forests that your customers can join.",
  },
  {
    icon: Handshake,
    title: "Long-term CSR partner",
    text: "Adopt a program for a year, with a shared plan, milestones and regular reports to your CSR committee.",
  },
] as const;

const WHAT_YOU_GET = [
  {
    icon: FileBarChart,
    title: "Clear reporting",
    text: "Photos, attendance numbers and a short impact note after every activity, and a summary at the end of the term.",
  },
  {
    icon: Megaphone,
    title: "Visibility, done right",
    text: "Your logo on event material, our website and social posts, credited in our media outreach.",
  },
  {
    icon: BadgeCheck,
    title: "A registered partner",
    text: `12A registered (${REGISTRATION.section12A.number}) and 80G approved (${REGISTRATION.section80G.number}), working with the Forest Department and Zilla Parishad.`,
  },
] as const;

const STEPS = [
  "Tell us what your team cares about and your budget or timeline.",
  "We suggest a program, schools or sites, and a simple plan with costs.",
  "We run it together, and you get photos, numbers and a report.",
];

export const PARTNER_MAIL_SUBJECT = encodeURIComponent("Partnership enquiry: [your company]");
export const PARTNER_MAIL_BODY = encodeURIComponent(
  "Hi Wild Agile team,\n\nCompany:\nContact person and role:\nPhone:\nWhat we'd like to support:\nTimeline / budget (if known):\n\nThanks!",
);

export function PartnerSections() {
  const programs = PROGRAMS.filter((p) => p.status !== "Upcoming");
  return (
    <>
      <section id="partner" className="scroll-mt-32 pb-4">
        <div className="container-x">
          <SectionTitle
            eyebrow="Partner With Us"
            title={<>Grow a greener generation, together.</>}
            subtitle="We work with brands, companies and CSR teams who want their support to reach children, schools and forests directly, and to see what it achieves."
          />
          <div className="mt-10" />
          <div className="grid gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-3">
            {[
              { n: String(PROGRAMS.length), label: "nature programs for children and families" },
              { n: String(MEDIA_CLIPPING_COUNT), label: `news reports in ${MEDIA_OUTLETS.length} publications` },
              { n: "12A · 80G", label: "registered with the Income Tax Department" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-4xl text-[var(--gold)]">{s.n}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <SectionTitle eyebrow="Ways to partner" title={<>Pick what fits your brand.</>} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.06}>
                <div className="card h-full">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary">
                    <w.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 heading-card text-primary">{w.title}</h3>
                  <p className="copy-card mt-2">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <h2 className="heading-section text-primary">Programs you can support</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {programs.map((p) => (
              <Link
                key={p.slug}
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group card-media"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.cover}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="heading-card-sm text-primary">{p.name}</div>
                  <p className="copy-card mt-1">{p.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="What partners get" title={<>Impact you can see.</>} />
            <div className="mt-8 space-y-6">
              {WHAT_YOU_GET.map((g) => (
                <div key={g.title} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-[var(--shadow-card)]">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="heading-card-sm text-primary">{g.title}</h3>
                    <p className="copy-card mt-1">{g.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="eyebrow">How it works</div>
            <ol className="mt-6 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-body pt-1.5">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-border pt-6 text-sm">
              <div className="font-semibold text-primary">Talk to us</div>
              <a href={`mailto:${CONTACT.email}?subject=${PARTNER_MAIL_SUBJECT}&body=${PARTNER_MAIL_BODY}`} className="mt-1 block text-secondary hover:underline">
                {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref} className="mt-1 block text-secondary hover:underline">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
