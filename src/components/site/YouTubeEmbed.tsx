import { toEmbedUrl } from "@/lib/youtube";

type YouTubeEmbedProps = {
  url: string;
  title?: string;
  autoplay?: boolean;
  isShort?: boolean;
};

export function YouTubeEmbed({
  url,
  title = "YouTube video",
  autoplay = false,
  isShort = false,
}: YouTubeEmbedProps) {
  return (
    <iframe
      src={toEmbedUrl(url, autoplay)}
      title={title}
      className={`h-full w-full border-0 ${isShort ? "min-h-[420px]" : ""}`}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      loading="lazy"
    />
  );
}
