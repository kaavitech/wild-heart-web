import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/site/SectionTitle";

/**
 * Renders a policy written in a small subset of Markdown:
 *   ## Heading, ### Subheading, "- " bullets, "1. " numbered steps, blank-line paragraphs,
 *   **bold**, [label](/path) links, and {{TBC: note}} for facts still to confirm
 *   (shown highlighted so they are easy to spot before publishing).
 */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\{\{TBC:[^}]+\}\}|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("{{TBC:")) {
      return (
        <mark key={i} className="rounded bg-amber-100 px-1 text-amber-900" title="To confirm before publishing">
          [{p.slice(6, -2).trim()}]
        </mark>
      );
    }
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} to={href} className="font-medium text-secondary underline underline-offset-2">
          {label}
        </Link>
      ) : (
        <a key={i} href={href} className="font-medium text-secondary underline underline-offset-2">
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
}

function renderBody(source: string) {
  const blocks = source.trim().split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    if (lines[0].startsWith("## ")) {
      return (
        <h2 key={i} className="mt-12 heading-sub text-primary first:mt-0">
          {inline(lines[0].slice(3))}
        </h2>
      );
    }
    if (lines[0].startsWith("### ")) {
      return (
        <h3 key={i} className="mt-8 heading-card text-primary">
          {inline(lines[0].slice(4))}
        </h3>
      );
    }
    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i} className="mt-4 list-disc space-y-2 pl-6">
          {lines.map((l, j) => (
            <li key={j}>{inline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      return (
        <ol key={i} className="mt-4 list-decimal space-y-2 pl-6">
          {lines.map((l, j) => (
            <li key={j}>{inline(l.replace(/^\d+\.\s/, ""))}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={i} className="mt-4">
        {lines.map((l, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {inline(l)}
          </Fragment>
        ))}
      </p>
    );
  });
}

export function PolicyPage({
  eyebrow,
  title,
  updated,
  body,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  body: string;
}) {
  return (
    <>
      <section className="relative pt-40 pb-10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--gradient-leaf)]" />
        <div className="container-x">
          <SectionTitle level="page" eyebrow={eyebrow} title={title} subtitle={`Last updated: ${updated}`} />
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x">
          <article className="text-body max-w-3xl leading-relaxed">{renderBody(body)}</article>
          <nav aria-label="Other policies" className="mt-14 flex max-w-3xl flex-wrap gap-3 border-t border-border pt-6 text-sm">
            <Link to="/privacy" className="rounded-full border border-border px-4 py-2 hover:border-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="rounded-full border border-border px-4 py-2 hover:border-primary">
              Terms of Use
            </Link>
            <Link to="/child-safeguarding" className="rounded-full border border-border px-4 py-2 hover:border-primary">
              Child Safeguarding
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
