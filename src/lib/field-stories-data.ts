export type FieldYouTubeVideo = {
  url: string;
  category: string;
  autoplay?: boolean;
  isShort?: boolean;
};

export type FieldInstagramReel = {
  url: string;
  category: string;
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

export const FIELD_INSTAGRAM_REELS: FieldInstagramReel[] = [
  {
    url: "https://www.instagram.com/reel/DaPkJFWsuXN/",
    category: "Field Notes",
  },
  {
    url: "https://www.instagram.com/reel/DH-9R0tR4ai/",
    category: "Community",
  },
];
