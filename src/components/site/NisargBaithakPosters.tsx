import { NISARG_BAITHAK_IMAGES } from "@/lib/nisarg-baithak";
import { NisargBaithakTileHighlight } from "@/components/site/NisargBaithakTileHighlight";
import { cn } from "@/lib/utils";

type NisargBaithakPostersProps = {
  variant?: "hero" | "dialog";
  className?: string;
  showClickHint?: boolean;
  clickHintCompact?: boolean;
};

export function NisargBaithakPosters({
  variant = "hero",
  className,
  showClickHint = false,
  clickHintCompact = false,
}: NisargBaithakPostersProps) {
  const single = NISARG_BAITHAK_IMAGES.length === 1;
  const staggerSecond =
    variant === "hero"
      ? "translate-y-6 sm:translate-y-8 md:translate-y-10"
      : "translate-y-4 sm:translate-y-6 md:translate-y-8";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        single ? "p-2 sm:p-3" : "gap-3 sm:gap-4 md:gap-5",
        className,
      )}
    >
      {NISARG_BAITHAK_IMAGES.map(({ src, alt }, index) => (
        <div
          key={src}
          className={cn(
            "relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/50 bg-white shadow-[0_16px_48px_-16px_rgba(46,94,78,0.35)] ring-1 ring-black/[0.04]",
            showClickHint && "group/poster transition-transform duration-300 group-hover/poster:scale-[1.02]",
            single
              ? "w-full max-w-[min(100%,19rem)] sm:max-w-[22rem]"
              : cn(
                  "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.625rem)]",
                  index === 1 && staggerSecond,
                ),
          )}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
            fetchPriority={variant === "hero" && index === 0 ? "high" : "auto"}
          />
          {showClickHint && index === 0 && (
            <NisargBaithakTileHighlight compact={clickHintCompact} />
          )}
        </div>
      ))}
    </div>
  );
}
