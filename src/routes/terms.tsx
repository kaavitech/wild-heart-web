import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { TERMS, POLICY_UPDATED } from "@/lib/policies";
import { pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use and Donation Terms",
      description: "The terms for using the Wild Agile Foundation website and donating to the foundation.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return <PolicyPage eyebrow="Legal" title="Terms of Use and Donation Terms" updated={POLICY_UPDATED} body={TERMS} />;
}
