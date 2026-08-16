import type { InstagramReel } from "./instagram.ts";
import { reelTitle } from "./instagram.ts";
import { INSTAGRAM_REELS_FALLBACK } from "./instagram-fallback.ts";

export type FieldYouTubeVideo = {
  url: string;
  category: string;
  autoplay?: boolean;
  isShort?: boolean;
};

export type FieldInstagramReel = {
  url: string;
  category: string;
  caption?: string;
  title?: string;
};

export const FIELD_YOUTUBE_VIDEOS: FieldYouTubeVideo[] = [
  {
    url: "https://youtu.be/96q3KHK9KEE",
    category: "Field Story",
    autoplay: true,
  },
  {
    url: "https://youtube.com/shorts/0ry854elCAA",
    category: "Conservation",
    isShort: true,
  },
];

const FALLBACK_BY_SHORTCODE = new Map(
  INSTAGRAM_REELS_FALLBACK.map((reel) => [reel.shortcode, reel]),
);

export const FIELD_INSTAGRAM_REELS: FieldInstagramReel[] = [
  {
    url: "https://www.instagram.com/p/DcF4yNjCbOS/",
    category: "Field Notes",
  },
  {
    url: "https://www.instagram.com/reel/DaPkJFWsuXN/",
    category: "Field Notes",
    caption:
      "Nature is not protected by passion alone—it is protected by understanding.",
    title: "Nature is not protected by passion alone—it is protected by understanding.",
  },
  {
    url: "https://www.instagram.com/reel/DbU7zgsMzI8/",
    category: "Field Notes",
  },
  {
    url: "https://www.instagram.com/reel/Db-AUQnJ5uQ/",
    category: "Field Notes",
  },
  {
    url: "https://www.instagram.com/reel/DbkStDuMcsi/",
    category: "Field Notes",
  },
];

function shortcodeFromInstagramUrl(url: string) {
  return url.match(/instagram\.com\/(?:reel|p|tv)\/([^/?]+)/i)?.[1] ?? "";
}

export function fieldInstagramReelFromUrl(
  entry: FieldInstagramReel,
  author = "Wild Agile Foundation",
): InstagramReel {
  const shortcode = shortcodeFromInstagramUrl(entry.url);
  const normalizedUrl = entry.url.split("?")[0].replace(/\/?$/, "/");
  const fallback = FALLBACK_BY_SHORTCODE.get(shortcode);
  const caption = entry.caption ?? fallback?.caption ?? "";
  const title = entry.title ?? fallback?.title ?? reelTitle(caption);

  return {
    shortcode,
    url: normalizedUrl,
    caption,
    title: title || entry.category,
    thumbnailUrl: "",
    videoUrl: "",
    author: fallback?.author ?? author,
  };
}

export function getFieldInstagramReels() {
  return FIELD_INSTAGRAM_REELS.map(fieldInstagramReelFromUrl);
}
