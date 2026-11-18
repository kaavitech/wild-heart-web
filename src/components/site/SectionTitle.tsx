import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  subtitleClassName,
  level = "section",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  subtitleClassName?: string;
  /** "page" renders the page's h1 (use once, in the hero); "section" renders an h2. */
  level?: "page" | "section";
}) {
  const Heading = level === "page" ? "h1" : "h2";
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div className="eyebrow">{eyebrow}</div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading className={cn("mt-3 text-primary", level === "page" ? "heading-page" : "heading-section")}>
          {title}
        </Heading>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={cn("text-body mt-5", subtitleClassName)}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
