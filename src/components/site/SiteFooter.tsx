import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Leaf } from "lucide-react";
import logo from "@/assets/wild-agile-logo.jpg.asset.json";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--gold)]/15 blur-3xl" />

      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
              <img src={logo.url} alt="" className="h-12 w-12 object-cover" />
            </div>
            <div>
              <div className="font-serif text-2xl leading-tight">Wild Agile Foundation</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
                Building Environment Conscious Generation
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Connecting children with forests, rivers, and wildlife — because every child who meets nature
            grows into someone who protects it.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/about", label: "About" },
              { to: "/projects", label: "Projects" },
              { to: "/team", label: "Team" },
              { to: "/gallery", label: "Gallery" },
              { to: "/join", label: "Join Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/80 hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Newsletter
          </h4>
          <p className="mt-5 text-sm text-primary-foreground/80">
            Stories from the field, delivered gently.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
            />
            <button className="btn-gold">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" /> © {new Date().getFullYear()} Wild Agile Foundation. All rights reserved.
          </div>
          <div>Crafted with care for the wild.</div>
        </div>
      </div>
    </footer>
  );
}
