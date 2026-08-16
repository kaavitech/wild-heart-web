import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { proxiedInstagramImageUrl } from "@/lib/instagram-image";

type InstagramReelProps = {
  url: string;
  title?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
};

function toEmbedUrl(url: string) {
  const clean = url.replace(/\?.*$/, "").replace(/\/?$/, "");
  return `${clean}/embed/?autoplay=1&hidecaption=1`;
}

function hasDirectThumbnail(thumbnailUrl?: string) {
  return !!thumbnailUrl && !thumbnailUrl.includes("/media/?size=l");
}

function toDisplayThumbnail(thumbnailUrl: string) {
  return proxiedInstagramImageUrl(thumbnailUrl);
}

async function fetchThumbnail(url: string, direct?: string) {
  if (hasDirectThumbnail(direct)) return direct!;

  const res = await fetch(`/api/instagram-thumbnail?url=${encodeURIComponent(url)}`);
  if (!res.ok) return "";

  const data = (await res.json()) as { thumbnailUrl?: string };
  return data.thumbnailUrl ?? "";
}

function loadInstagramEmbedScript() {
  if (document.querySelector('script[src*="instagram.com/embed.js"]')) return;

  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);
}

export function InstagramReel({
  url,
  title = "Instagram reel",
  thumbnailUrl,
}: InstagramReelProps) {
  const [playing, setPlaying] = useState(false);
  const [resolvedThumb, setResolvedThumb] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (hasDirectThumbnail(thumbnailUrl)) {
      setResolvedThumb(toDisplayThumbnail(thumbnailUrl!));
      return;
    }

    fetchThumbnail(url, thumbnailUrl)
      .then((thumb) => {
        if (!cancelled && thumb) {
          setResolvedThumb(toDisplayThumbnail(thumb));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url, thumbnailUrl]);

  useEffect(() => {
    if (playing) loadInstagramEmbedScript();
  }, [playing]);

  if (playing) {
    return (
      <iframe
        src={toEmbedUrl(url)}
        title={title}
        className="h-full w-full border-0 bg-black"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        setPlaying(true);
      }}
      className="group/play relative block h-full w-full overflow-hidden bg-primary/10"
      aria-label={`Play ${title}`}
    >
      {resolvedThumb ? (
        <img
          src={resolvedThumb}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span aria-hidden className="absolute inset-0 animate-pulse bg-primary/5" />
      )}
      <span className="absolute inset-0 bg-black/10 transition-colors group-hover/play:bg-black/25" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform group-hover/play:scale-105">
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      </span>
    </button>
  );
}
