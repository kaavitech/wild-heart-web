import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import kaavixLogo from "@/assets/kaavix-logo-square.png";
import { SOCIAL_LINKS } from "@/components/site/SocialBrandIcons";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { CONTACT, REGISTRATION } from "@/lib/site-config";

const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/media", label: "In the Media" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/join", label: "Donate" },
  { to: "/contact", label: "Contact & Partner" },
] as const;

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/child-safeguarding", label: "Child Safeguarding" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--gold)]/15 blur-3xl" />

      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
              <img src={logo} alt="" className="h-12 w-12 object-contain p-1" />
            </div>
            <div>
              <div className="font-serif text-2xl leading-tight">Wild Agile Foundation</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
                Building Environment Conscious Generation
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Connecting children with forests, rivers, and wildlife, because every child who meets nature
            grows into someone who protects it.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Wild Agile Foundation on ${label}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/95 p-2.5 transition hover:bg-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/80 hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/80">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <a href={CONTACT.phoneHref} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {CONTACT.address.line1}
                <br />
                {CONTACT.address.line2}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Newsletter
          </h4>
          <p className="mt-5 text-sm text-primary-foreground/80">
            Stories from the field, delivered gently.
          </p>
          <NewsletterForm variant="footer" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-primary-foreground/60 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5" /> © {new Date().getFullYear()} Wild Agile Foundation. All rights reserved.
            </div>
            <div>
              12A reg. {REGISTRATION.section12A.number} · 80G reg. {REGISTRATION.section80G.number}
            </div>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
          {/* Kaavix II credit: square logo on the left, as tall as the three lines of text beside it (50% then +25%, Parag 2026-11-18). */}
          <div className="flex items-stretch gap-[7.5px]">
            <span className="relative h-[2.109rem] w-[2.109rem] shrink-0 self-center">
              <img
                src={kaavixLogo}
                alt="Kaavix II logo"
                className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
              />
            </span>
            <div className="flex flex-col justify-center gap-[2.5px] leading-none">
              <span className="text-[7.5px]">Website by</span>
              <span className="font-display text-[10px] font-semibold tracking-wide text-white">
                KaaviX ii Pvt. Ltd.
              </span>
              <span className="font-display text-[6.25px] tracking-wide text-white/80">
                neXtTech Meets Innovative Intelligence
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

