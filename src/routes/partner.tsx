import { createFileRoute, redirect } from "@tanstack/react-router";

// The partnership content now lives on the Contact page. Keep this URL working for old links.
export const Route = createFileRoute("/partner")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", hash: "partner", statusCode: 301 });
  },
});
