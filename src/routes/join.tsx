import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import whatsappQR from "@/assets/whatsappQR.jpeg";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — Wild Agile Foundation" },
      { name: "description", content: "Donate to support nature programs for children." },
      { property: "og:title", content: "Join Wild Agile Foundation" },
      { property: "og:description", content: "Donate and support our field programs." },
    ],
  }),
  component: JoinPage,
});

const BANK_DETAILS = [
  { label: "Account Name", value: "Wild Agile Foundation" },
  { label: "Bank", value: "IndusInd Bank Ltd" },
  { label: "Account Number", value: "254330300925" },
  { label: "IFSC", value: "INDB0002173" },
];

function JoinPage() {
  return (
    <>
      <section className="relative pt-40 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Join the Movement"
            title={<>Plant a season of change.</>}
            subtitle="Your contribution funds buses for school trips, native saplings, field guides, and educator stipends."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x mx-auto max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-[var(--shadow-card)]">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative">
                <div className="eyebrow-light">Donate</div>
                <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-primary-foreground md:text-5xl">
                  Donate via Bank Transfer
                </h2>
                <p className="text-body mt-4 text-primary-foreground/85">
                  100% goes to the field. All donations are eligible for tax benefits under Section 80G of the Income Tax Act.
                </p>

                <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary-foreground">Bank Details</h3>
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
                  for acknowledgment.
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-sm text-primary-foreground/75">
                  Prefer to talk first? Write to{" "}
                  <a href="mailto:hello@wildagilefoundation.org" className="text-white hover:underline">
                    hello@wildagilefoundation.org
                  </a>
                  .
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
