import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { PRIVACY_POLICY, POLICY_UPDATED } from "@/lib/policies";
import { pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy",
      description: "How Wild Agile Foundation collects, uses and protects personal information from donors, volunteers, schools and visitors.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PolicyPage eyebrow="Legal" title="Privacy Policy" updated={POLICY_UPDATED} body={PRIVACY_POLICY} />;
}
