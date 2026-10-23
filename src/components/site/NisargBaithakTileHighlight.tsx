import { ArrowRight, Sparkles } from "lucide-react";
import { NISARG_BAITHAK_EVENT } from "@/lib/nisarg-baithak";
import { cn } from "@/lib/utils";

type NisargBaithakTileHighlightProps = {
  compact?: boolean;
  className?: string;
};

export function NisargBaithakTileHighlight({
  compact = false,
  className,
}: NisargBaithakTileHighlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col justify-between",
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          "mx-auto mt-2 inline-flex items-center gap-1 rounded-full border border-white/40 bg-[color-mix(in_oklab,var(--gold)_92%,white)] px-2.5 py-0.5 font-medium text-[color-mix(in_oklab,var(--primary)_88%,black)] shadow-md",
          compact ? "text-[10px]" : "mt-3 text-[11px] sm:text-xs",
        )}
      >
        <Sparkles className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
        {NISARG_BAITHAK_EVENT.sessionLabel}
      </span>

      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <span
          className={cn(
            "relative flex w-full items-center justify-center gap-1.5 border-t border-white/20 bg-primary/90 px-3 py-2 font-medium text-primary-foreground backdrop-blur-[2px] transition-transform duration-200 group-hover:translate-y-0 group-focus-visible:translate-y-0 group-hover/poster:translate-y-0",
            compact ? "text-[11px] py-2" : "text-xs sm:text-sm sm:py-2.5",
          )}
        >
          View event details
          <ArrowRight
            className={cn(
              "shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
              compact ? "h-3.5 w-3.5" : "h-4 w-4",
            )}
          />
        </span>
      </div>

      <span className="absolute inset-0 rounded-[inherit] ring-2 ring-[var(--gold)]/0 transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--gold)]/55 group-focus-visible:ring-[var(--gold)]/70 group-hover/poster:ring-[var(--gold)]/55" />
      <span className="absolute -inset-0.5 animate-pulse rounded-[inherit] ring-2 ring-[var(--gold)]/25 group-hover:ring-transparent group-hover/poster:ring-transparent" />
    </div>
  );
}
