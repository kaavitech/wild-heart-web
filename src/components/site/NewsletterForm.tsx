import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, NEWSLETTER_ENABLED } from "@/lib/site-config";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Newsletter signup used in the footer and on /newsletter.
 * Posts to /api/newsletter, which adds the address to the mailing list
 * and sends a confirmation email (double opt-in).
 */
export function NewsletterForm({ variant = "footer" }: { variant?: "footer" | "page" }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: real people leave this empty
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("done");
      setMessage(data.message || "Almost done. Please check your inbox to confirm.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.message
          ? err.message
          : `Could not subscribe right now. Please email ${CONTACT.email}.`,
      );
    }
  }

  const isPage = variant === "page";

  if (!NEWSLETTER_ENABLED) {
    return (
      <div className={cn(isPage ? "mx-auto mt-10 max-w-md text-center" : "mt-4")}>
        <span
          className={cn(
            "inline-flex items-center rounded-full border border-[var(--gold)]/60 bg-white/10 font-semibold text-[var(--gold)]",
            isPage ? "px-6 py-3 text-base" : "px-4 py-2 text-sm",
          )}
        >
          Coming soon...
        </span>
      </div>
    );
  }

  return (
    <div className={cn(isPage && "mx-auto mt-10 max-w-md")}>
      <form onSubmit={onSubmit} className={cn("flex gap-2", isPage ? "flex-col gap-3 sm:flex-row" : "mt-4")}>
        <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
          Email address
        </label>
        <div className="relative min-w-0 flex-1">
          {isPage && (
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          )}
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={cn(
              "w-full rounded-full border text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60",
              isPage
                ? "border-white/30 bg-white/10 py-3 pl-11 pr-4 backdrop-blur"
                : "border-white/15 bg-white/5 px-4 py-3",
            )}
          />
        </div>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />
        <button className="btn-gold" type="submit" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Subscribe
          {isPage && status !== "sending" ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 text-xs",
          status === "error" ? "text-[var(--gold)]" : "text-white/70",
          !message && "sr-only",
        )}
      >
        {message}
      </p>
      <p className={cn("mt-2 text-[11px] text-white/55", isPage && "text-center")}>
        We send a confirmation email first. Unsubscribe anytime. See our{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-white">
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}
