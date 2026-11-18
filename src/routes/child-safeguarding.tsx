import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { CHILD_SAFEGUARDING, POLICY_UPDATED } from "@/lib/policies";
import { pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/child-safeguarding")({
  head: () =>
    pageHead({
      title: "Child Safeguarding and Photo Consent Policy",
      description: "How Wild Agile Foundation keeps children safe at programs, and how we take and use photos of children.",
      path: "/child-safeguarding",
    }),
  component: ChildSafeguardingPage,
});

function ChildSafeguardingPage() {
  return <PolicyPage eyebrow="Safeguarding" title="Child Safeguarding and Photo Consent Policy" updated={POLICY_UPDATED} body={CHILD_SAFEGUARDING} />;
}
