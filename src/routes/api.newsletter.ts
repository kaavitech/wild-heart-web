import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, SITE_URL } from "@/lib/site-config";

/**
 * Newsletter signup with double opt-in, through Brevo (free up to 300 emails a day).
 *
 * Set these as secrets on the Cloudflare Worker (Settings > Variables and Secrets):
 *   BREVO_API_KEY         API key from Brevo > SMTP & API > API keys
 *   BREVO_LIST_ID         numeric id of the "Website newsletter" list
 *   BREVO_DOI_TEMPLATE_ID numeric id of the Brevo "double opt-in" confirmation template
 * Until they are set, the form tells visitors to email the foundation instead.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readEnv(name: string): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.[name]?.trim() || undefined;
}

function json(status: number, message: string) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

export const Route = createFileRoute("/api/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { email?: unknown; website?: unknown };
        try {
          body = await request.json();
        } catch {
          return json(400, "Please enter a valid email address.");
        }

        // Honeypot field: bots fill it, people never see it.
        if (typeof body.website === "string" && body.website.length > 0) {
          return json(200, "Almost done. Please check your inbox to confirm.");
        }

        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        if (!EMAIL_RE.test(email) || email.length > 254) {
          return json(400, "Please enter a valid email address.");
        }

        const apiKey = readEnv("BREVO_API_KEY");
        const listId = Number(readEnv("BREVO_LIST_ID"));
        const templateId = Number(readEnv("BREVO_DOI_TEMPLATE_ID"));
        if (!apiKey || !listId || !templateId) {
          return json(
            503,
            `Signups open soon. Until then, email ${CONTACT.email} and we'll add you.`,
          );
        }

        const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            includeListIds: [listId],
            templateId,
            redirectionUrl: `${SITE_URL}/newsletter?confirmed=1`,
          }),
        });

        if (res.ok) {
          return json(200, "Almost done. Please check your inbox and tap the link to confirm.");
        }

        const detail = (await res.json().catch(() => ({}))) as { code?: string };
        if (detail.code === "duplicate_parameter") {
          return json(200, "You're already on the list. Thank you!");
        }
        console.error("Brevo signup failed", res.status, detail);
        return json(502, `Could not subscribe right now. Please email ${CONTACT.email}.`);
      },
    },
  },
});
