import { createFileRoute } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import bankQR from "@/assets/wildAgileBankQR.jpg";
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

const WHATSAPP_URL = "https://wa.me/919970175544";

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
                        src={bankQR}
                        alt="IndusInd Bank UPI QR code for Wild Agile Foundation"
                        className="h-auto w-48 rounded-2xl sm:w-52 border border-white/15 bg-white object-contain p-1.5"
                      />
                      <figcaption className="mt-2 text-center text-xs font-medium text-primary-foreground/70">
                        Scan to pay
                        <span className="mt-0.5 block select-all font-semibold">UPI ID: pos.5385721@indus</span>
                      </figcaption>
                    </figure>
                  </div>
                </div>


                <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:flex-row sm:items-center">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <img
                      src={whatsappQR}
                      alt="WhatsApp QR code to share your payment screenshot"
                      className="h-28 w-28 rounded-xl bg-white object-contain p-1.5"
                    />
                  </a>
                  <p className="text-center text-sm leading-relaxed text-primary-foreground/85 sm:text-left">
                    <span className="block font-semibold text-white">Share your transaction details on WhatsApp</span>
                    Scan this QR code, or{" "}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline-offset-4 hover:underline">
                      tap here to open WhatsApp
                    </a>
                    , and send us a screenshot after you pay. You can also email your transaction details to{" "}
                    <a href="mailto:hello@wildagilefoundation.org" className="font-medium text-white underline-offset-4 hover:underline">
                      hello@wildagilefoundation.org
                    </a>{" "}
                    for acknowledgment.
                  </p>
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
