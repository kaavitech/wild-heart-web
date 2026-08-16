import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight, Landmark } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import whatsappQR from "@/assets/whatsappQR.jpeg";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — Wild Agile Foundation" },
      { name: "description", content: "Volunteer, partner, or donate to support nature programs for children." },
      { property: "og:title", content: "Join Wild Agile Foundation" },
      { property: "og:description", content: "Volunteer, partner, donate." },
    ],
  }),
  component: JoinPage,
});

type Tab = "volunteer" | "partner" | "csr";

const BANK_DETAILS = [
  { label: "Account Name", value: "Wild Agile Foundation" },
  { label: "Bank", value: "IndusInd Bank Ltd" },
  { label: "Account Number", value: "254330300925" },
  { label: "IFSC", value: "INDB0002173" },
];

function JoinPage() {
  const [tab, setTab] = useState<Tab>("volunteer");

  return (
    <>
      <section className="relative pt-40 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Join the Movement"
            title={<>Choose how you'll walk with us.</>}
            subtitle="There's a path here for every kind of supporter — from weekend volunteers to long-term partners."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: forms */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-10">
              <div className="flex flex-wrap gap-2">
                {([
                  { key: "volunteer", label: "Volunteer", icon: Users },
                  { key: "partner", label: "Partner", icon: Briefcase },
                  { key: "csr", label: "CSR", icon: Briefcase },
                ] as const).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                      tab === t.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground/70 hover:bg-primary/10"
                    }`}
                  >
                    <t.icon className="h-3.5 w-3.5" /> {t.label}
                  </button>
                ))}
              </div>

              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-8">
                {tab === "volunteer" && <VolunteerForm />}
                {tab === "partner" && <PartnerForm />}
                {tab === "csr" && <CsrForm />}
              </motion.div>
            </div>
          </Reveal>

          {/* Right: Donate CTA */}
          <Reveal dir="right">
            <div className="relative h-full overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-[var(--shadow-card)]">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative">
                <div className="eyebrow-light">Donate</div>
                <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-primary-foreground md:text-5xl lg:text-6xl">
                  Plant a season of change.
                </h2>
                <p className="text-body mt-4 text-primary-foreground/85">
                  Your contribution funds buses for school trips, native saplings, field guides, and educator stipends. 100% goes to the field.
                </p>

                <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary-foreground">Donate via Bank Transfer</h3>
                  </div>
                  <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <dl className="flex-1 space-y-4">
                      {BANK_DETAILS.map((row) => (
                        <div key={row.label}>
                          <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                            {row.label}
                          </dt>
                          <dd className="mt-1 text-base leading-relaxed tracking-wide text-primary-foreground md:text-lg">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <figure className="shrink-0 self-center sm:self-start">
                      <img
                        src={whatsappQR}
                        alt="Scan to pay via UPI / WhatsApp"
                        className="h-40 w-40 rounded-2xl border border-white/15 bg-white object-contain p-2"
                      />
                      <figcaption className="mt-2 text-center text-xs font-medium text-primary-foreground/70">
                        Scan to pay
                      </figcaption>
                    </figure>
                  </div>
                </div>

                <div className="mt-6 text-sm leading-relaxed text-primary-foreground/75">
                  After contributing, please email your transaction details to{" "}
                  <a href="mailto:hello@wildagilefoundation.org" className="font-medium text-white hover:underline">
                    hello@wildagilefoundation.org
                  </a>{" "}
                  for acknowledgment. All donations are eligible for tax benefits under Section 80G of the Income Tax Act.
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-sm text-primary-foreground/75">
                  Prefer to talk first? Write to <span className="text-white">hello@wildagilefoundation.org</span>.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? "col-span-full block" : "block"}>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">{label}</div>
      {children}
    </label>
  );
}

function VolunteerForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3 className="font-serif text-3xl text-primary">Volunteer With Us</h3>
      <p className="mt-2 text-sm text-muted-foreground">Tell us a little about yourself.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name"><input className="field" required /></Field>
        <Field label="Email"><input className="field" type="email" required /></Field>
        <Field label="City"><input className="field" /></Field>
        <Field label="Skills / interests"><input className="field" placeholder="e.g. teaching, photography" /></Field>
        <Field label="Why do you want to volunteer?" full><textarea rows={4} className="field" /></Field>
      </div>
      <button className="btn-primary mt-6" type="submit">Submit Application <ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}

function PartnerForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3 className="font-serif text-3xl text-primary">Become a Partner</h3>
      <p className="mt-2 text-sm text-muted-foreground">Schools, NGOs, brands, and communities welcome.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Organization"><input className="field" required /></Field>
        <Field label="Contact person"><input className="field" required /></Field>
        <Field label="Email"><input className="field" type="email" required /></Field>
        <Field label="Partnership type"><input className="field" placeholder="School / NGO / Brand" /></Field>
        <Field label="What would you like to explore?" full><textarea rows={4} className="field" /></Field>
      </div>
      <button className="btn-primary mt-6" type="submit">Start Conversation <ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}

function CsrForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3 className="font-serif text-3xl text-primary">CSR Collaboration</h3>
      <p className="mt-2 text-sm text-muted-foreground">Align your CSR with impact you can visit.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Company name"><input className="field" required /></Field>
        <Field label="Contact person"><input className="field" required /></Field>
        <Field label="Email"><input className="field" type="email" required /></Field>
        <Field label="Approximate CSR budget"><input className="field" /></Field>
        <Field label="Focus areas" full><textarea rows={4} className="field" placeholder="e.g. education, biodiversity, water" /></Field>
      </div>
      <button className="btn-primary mt-6" type="submit">Submit Enquiry <ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}
