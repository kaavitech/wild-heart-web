import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Landmark } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import cert12A from "@/assets/certificates/12A-form-10AC.webp";
import cert80G from "@/assets/certificates/80G-form-10AC.webp";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import bankQR from "@/assets/wildAgileBankQR.jpg";
import whatsappQR from "@/assets/whatsappQR.jpeg";
import { CONTACT, REGISTRATION, pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/join")({
  head: () =>
    pageHead({
      title: "Donate",
      description:
        "Donate to Wild Agile Foundation by bank transfer or UPI. 80G registered (AAATW8598FF20261). Support nature programs for children in Nagpur.",
      path: "/join",
    }),
  component: JoinPage,
});

const WHATSAPP_URL = CONTACT.whatsappUrl;

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
          <SectionTitle level="page"
            eyebrow="Donate"
            title={<>Plant a season of change.</>}
            subtitle="Your contribution funds buses for school trips, native saplings, field guides, and educator stipends."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10 shadow-[var(--shadow-card)]">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative">
                <div className="eyebrow-light">Donate</div>
                <h2 className="mt-3 heading-section text-primary-foreground">
                  Donate via Bank Transfer
                </h2>
                <p className="text-body mt-4 max-w-3xl text-primary-foreground/85">
                  100% goes to the field. Donations qualify for a tax deduction under Section 80G of the Income
                  Tax Act. Share your name, PAN and address with your payment details so we can send your 80G
                  receipt.
                </p>

                {/* Two halves: registrations with certificate images on the left, payment details on the right. */}
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="grid grid-cols-2 content-start gap-x-4 gap-y-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm sm:gap-x-5 sm:p-6">
                  <CertificateCard
                    label="80G registration"
                    number={REGISTRATION.section80G.number}
                    note={`Provisional approval, ${REGISTRATION.section80G.validity}`}
                    image={cert80G}
                    title="80G approval: Form No. 10AC"
                  />
                  <CertificateCard
                    label="12A registration"
                    number={REGISTRATION.section12A.number}
                    note={`Provisional registration, ${REGISTRATION.section12A.validity}`}
                    image={cert12A}
                    title="12A registration: Form No. 10AC"
                  />
                  <div className="col-span-2 text-xs text-primary-foreground/65">
                    PAN {REGISTRATION.pan}. Tax rules change, so please check with your own adviser.
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <h3 className="heading-card text-primary-foreground">Bank Details</h3>
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
                        className="h-auto w-44 rounded-2xl border border-white/15 bg-white object-contain p-1.5"
                      />
                      <figcaption className="mt-2 text-center text-xs font-medium text-primary-foreground/70">
                        Scan to pay
                        <span className="mt-0.5 block select-all font-semibold">UPI ID: pos.5385721@indus</span>
                      </figcaption>
                    </figure>
                  </div>
                </div>


                <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:flex-row sm:items-center">
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
                    , and send us a screenshot after you pay, with your name, PAN and address for the 80G
                    receipt. You can also email your transaction details to{" "}
                    <a href="mailto:wildagile.foundation@gmail.com" className="font-medium text-white underline-offset-4 hover:underline">
                    wildagile.foundation@gmail.com
                    </a>{" "}
                    for acknowledgment.
                  </p>
                </div>
                </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-sm text-primary-foreground/75">
                  Prefer to talk first? Write to{" "}
                  <a href="mailto:wildagile.foundation@gmail.com" className="text-white hover:underline">
                    wildagile.foundation@gmail.com
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

/** One registration: number + a thumbnail of the Income Tax order that opens full size. */
function CertificateCard({
  label,
  number,
  note,
  image,
  title,
}: {
  label: string;
  number: string;
  note: string;
  image: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
        {label}
      </div>
      <div className="mt-1 text-xs font-semibold text-white sm:text-sm sm:tracking-wide">{number}</div>
      <div className="mb-3 text-xs text-primary-foreground/65">{note}</div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mt-auto block overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-white/30 transition hover:ring-2 hover:ring-gold"
        aria-label={`View ${title} full size`}
      >
        <img
          src={image}
          alt={`${title}, issued to Wild Agile Foundation`}
          className="aspect-[1240/1755] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-primary/85 py-2 text-xs font-medium text-white opacity-90 transition group-hover:opacity-100">
          <FileCheck2 className="h-3.5 w-3.5 shrink-0" />
          <span className="sm:hidden">View</span>
          <span className="hidden sm:inline">View full certificate</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92dvh] max-w-[min(94vw,46rem)] overflow-y-auto p-3 sm:p-4">
          <DialogTitle className="pr-8 font-serif text-lg text-primary">{title}</DialogTitle>
          <DialogDescription className="text-xs">
            Issued by the Income Tax Department to Wild Agile Foundation. Street address hidden for privacy.
          </DialogDescription>
          <img src={image} alt={`${title}, issued to Wild Agile Foundation`} className="w-full rounded-md border" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
