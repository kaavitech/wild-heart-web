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
  return `${url.replace(/\?.*$/, "").replace(/\/?$/, "")}/embed`;
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

export function InstagramReel({
  url,
  title = "Instagram reel",
  thumbnailUrl,
  videoUrl,
}: InstagramReelProps) {
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
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

  if (playing && videoUrl && !videoFailed) {
    return (
      <video
        src={videoUrl}
        poster={resolvedThumb || proxiedInstagramImageUrl(thumbnailUrl ?? "")}
        controls
        playsInline
        autoPlay
        preload="metadata"
        title={title}
        className="h-full w-full bg-black object-cover"
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (playing) {
    return (
      <iframe
        src={toEmbedUrl(url)}
        title={title}
        className="h-full w-full border-0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
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
