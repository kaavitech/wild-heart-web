import { NisargBaithakPosters } from "@/components/site/NisargBaithakPosters";
import { NisargBaithakTileHighlight } from "@/components/site/NisargBaithakTileHighlight";
import { NISARG_BAITHAK_IMAGES } from "@/lib/nisarg-baithak";
import { cn } from "@/lib/utils";

type NisargBaithakPosterTileProps = {
  variant: "hero" | "floating";
  onClick: () => void;
  className?: string;
};

export function NisargBaithakPosterTile({
  variant,
  onClick,
  className,
}: NisargBaithakPosterTileProps) {
  const thumbnail = NISARG_BAITHAK_IMAGES[0];

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="View Nisarg Baithak event details"
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_16px_40px_-8px_rgba(46,94,78,0.6)] ring-4 ring-background transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/40",
          "h-[20.25rem] w-[15rem] sm:h-[23.25rem] sm:w-[17.25rem] animate-float-b",
          className,
        )}
      >
        <img
          src={thumbnail.src}
          alt={thumbnail.alt}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <NisargBaithakTileHighlight compact />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View Nisarg Baithak event details"
      className={cn(
        "group/tile relative h-full w-full cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]/45",
        className,
      )}
    >
      <NisargBaithakPosters variant="hero" showClickHint />
    </button>
  );
}
