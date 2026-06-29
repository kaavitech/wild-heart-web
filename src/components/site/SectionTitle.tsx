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
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  subtitleClassName?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-primary md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-muted-foreground md:text-lg",
              subtitleClassName,
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
