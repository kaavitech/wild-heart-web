import type { InstagramReel } from "./instagram.ts";

export type InstagramReelSeed = Pick<
  InstagramReel,
  "shortcode" | "url" | "caption" | "title" | "author"
>;

export const INSTAGRAM_USERNAME = "wildagile_foundation";

export const INSTAGRAM_REELS_FALLBACK: InstagramReelSeed[] = [
  {
    shortcode: "DH-nn5SJXQD",
    url: "https://www.instagram.com/reel/DH-nn5SJXQD/",
    caption:
      "How special a Tiger is to me!\n\n#wildagile #wildagile_foundation #wildlife #prafuldeshmukh",
    title: "How special a Tiger is to me!",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DRHuiWVCPlg",
    url: "https://www.instagram.com/reel/DRHuiWVCPlg/",
    caption: "CHANGEMAKERS CONCLAVE 2025 @ IIM Nagpur",
    title: "CHANGEMAKERS CONCLAVE 2025 @ IIM Nagpur",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DH-9R0tR4ai",
    url: "https://www.instagram.com/reel/DH-9R0tR4ai/",
    caption:
      "Exploring, Educating, and Elevating Nature Awareness!\n\nA brief about who we are? what we do? and what we want to do?",
    title: "Exploring, Educating, and Elevating Nature Awareness!",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DaPkJFWsuXN",
    url: "https://www.instagram.com/reel/DaPkJFWsuXN/",
    caption:
      "Nature is not protected by passion alone—it is protected by understanding.",
    title: "Nature is not protected by passion alone—it is protected by understanding.",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DZy_ZHdJLao",
    url: "https://www.instagram.com/reel/DZy_ZHdJLao/",
    caption:
      "At Wild Agile Foundation, we believe that awareness is the first step towards conservation.",
    title: "At Wild Agile Foundation, we believe that awareness is the first step towards conservation.",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DZWVTYxyBIU",
    url: "https://www.instagram.com/reel/DZWVTYxyBIU/",
    caption: "Kashvi k Kaarname\nOur First Nature Walk",
    title: "Kashvi k Kaarname",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DZRgdnQqqvk",
    url: "https://www.instagram.com/reel/DZRgdnQqqvk/",
    caption: "Kashvi k Kaarname\nOur Little Responsible Forest Cleaners",
    title: "Kashvi k Kaarname",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DZRYwHgy3Br",
    url: "https://www.instagram.com/reel/DZRYwHgy3Br/",
    caption: "Kashvi k Kaarname\nOur Little Responsible Forest Cleaners",
    title: "Kashvi k Kaarname",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DZPaVPdyu8k",
    url: "https://www.instagram.com/reel/DZPaVPdyu8k/",
    caption: "Kashvi k Kaarname\nSmall Contribution On World Environment Day",
    title: "Kashvi k Kaarname",
    author: "WildAgile Foundation",
  },
  {
    shortcode: "DYo_2V1pLns",
    url: "https://www.instagram.com/reel/DYo_2V1pLns/",
    caption: "A walk that turned into a learning experience",
    title: "A walk that turned into a learning experience",
    author: "WildAgile Foundation",
  },
];

export function toInstagramReels(seeds: InstagramReelSeed[]): InstagramReel[] {
  return seeds.map((reel) => ({
    ...reel,
    thumbnailUrl: "",
    videoUrl: "",
  }));
}

export function getFallbackInstagramReels() {
  return toInstagramReels(INSTAGRAM_REELS_FALLBACK);
}
