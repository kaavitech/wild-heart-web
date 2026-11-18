import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { CONTACT, pageHead } from "@/lib/site-config";
import { PartnersStrip } from "@/components/site/PartnersStrip";
import {
  PARTNER_MAIL_BODY,
  PARTNER_MAIL_SUBJECT,
  PartnerSections,
} from "@/components/site/PartnerSections";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact and Partner With Us",
      description:
        "Reach Wild Agile Foundation in Nagpur by email, phone or WhatsApp. Brands and CSR teams: sponsor school programs, employee volunteering, events and more.",
      path: "/contact",
    }),
  component: ContactPage,
});

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Best for detailed questions and documents.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
    note: "Call us, or leave a message if we are in the field.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: CONTACT.whatsappUrl,
    note: "Quickest for questions about walks and events.",
    external: true,
  },
] as const;

const REASONS = [
  {
    title: "Schools",
    text: "Want a JeevanDhara session or a nature walk for your students? Tell us your school, grades and preferred dates.",
  },
  {
    title: "Volunteers",
    text: "Share what you enjoy doing (teaching, photography, design, field work) and when you are free.",
  },
  {
    title: "Partners and CSR",
    text: "We work with government departments, schools and companies. Write to us to plan a program together.",
  },
];

function ContactPage() {
  return (
    <>
      <section className="relative pt-40 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle level="page"
            eyebrow="Contact & Partnerships"
            title={<>Let&apos;s work together for nature.</>}
            subtitle="Schools, parents, volunteers, brands, CSR teams and donors: we'd love to hear from you."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=${PARTNER_MAIL_SUBJECT}&body=${PARTNER_MAIL_BODY}`}
                className="btn-primary"
              >
                Partnership enquiry <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#partner" className="btn-gold">
                Ways to partner
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                {...("external" in c ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card group flex h-full flex-col transition-transform hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <c.icon className="h-6 w-6" />
                </div>
                <div className="eyebrow mt-5">{c.label}</div>
                <div className="mt-2 font-display text-lg font-semibold tracking-tight text-primary tabular-nums [overflow-wrap:anywhere] group-hover:underline">
                  {c.value}
                </div>
                <p className="copy-card mt-2">{c.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <PartnersStrip className="pt-4" />

      <PartnerSections />

      <section className="pb-16 pt-8">
        <div className="container-x">
          <h2 className="heading-section text-primary">What to include in your message</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {REASONS.map((r) => (
              <div key={r.title} className="card">
                <h3 className="heading-card text-primary">{r.title}</h3>
                <p className="copy-card mt-2">{r.text}</p>
              </div>
            ))}
          </div>
          <p className="text-body mt-8 text-sm">
            Want to donate? See bank and UPI details on the{" "}
            <Link to="/join" className="font-semibold text-secondary hover:underline">
              Donate page
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-3xl bg-primary p-8 text-primary-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[var(--gold)]" />
                <div className="eyebrow-light">Office</div>
              </div>
              <address className="mt-4 font-serif text-2xl not-italic leading-snug">
                Wild Agile Foundation
                <br />
                {CONTACT.address.line1}
                <br />
                {CONTACT.address.line2}
                <br />
                {CONTACT.address.region}
              </address>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-flex"
              >
                Open in Google Maps
              </a>
              <p className="mt-6 text-sm text-primary-foreground/75">
                Most of our work happens outdoors, so please message us before you visit.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3">
            <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-border bg-muted">
              <iframe
                title="Map showing Wild Agile Foundation, Swavalambi Nagar, Nagpur"
                src={CONTACT.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
