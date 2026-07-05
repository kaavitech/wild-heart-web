const IG_APP_ID = "936619743392459";
const IG_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export type InstagramReel = {
  shortcode: string;
  url: string;
  caption: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  author: string;
};

type IgCaptionEdge = { node?: { text?: string } };
type IgTimelineNode = {
  shortcode?: string;
  code?: string;
  product_type?: string;
  media_type?: number;
  is_video?: boolean;
  display_url?: string;
  video_url?: string;
  edge_media_to_caption?: { edges?: IgCaptionEdge[] };
  caption?: { text?: string } | null;
  image_versions2?: { candidates?: { url?: string }[] };
  video_versions?: { url?: string }[];
};

type IgTimelineEdge = { node?: IgTimelineNode };

type IgProfileUser = {
  id?: string;
  username?: string;
  full_name?: string;
  edge_owner_to_timeline_media?: {
    count?: number;
    edges?: IgTimelineEdge[];
  };
};

type IgProfileResponse = {
  data?: { user?: IgProfileUser };
};

function igHeaders(referer = "https://www.instagram.com/") {
  return {
    "User-Agent": IG_USER_AGENT,
    "X-IG-App-ID": IG_APP_ID,
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: referer,
    Origin: "https://www.instagram.com",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
  };
}

function reelTitle(caption: string) {
  const line = caption.split("\n").find((part) => part.trim())?.trim() ?? "";
  if (!line) return "Instagram reel";
  return line.length > 90 ? `${line.slice(0, 87)}…` : line;
}

function captionFromNode(node: IgTimelineNode) {
  return (
    node.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() ??
    node.caption?.text?.trim() ??
    ""
  );
}

function mapTimelineReel(node: IgTimelineNode, author: string): InstagramReel | null {
  const shortcode = node.shortcode ?? node.code;
  const videoUrl = node.video_url ?? node.video_versions?.[0]?.url;
  const thumbnailUrl = node.display_url ?? node.image_versions2?.candidates?.[0]?.url;

  if (!shortcode || !videoUrl || !thumbnailUrl) return null;

  const caption = captionFromNode(node);

  return {
    shortcode,
    url: `https://www.instagram.com/reel/${shortcode}/`,
    caption,
    title: reelTitle(caption),
    thumbnailUrl,
    videoUrl,
    author,
  };
}

function isTimelineReel(node: IgTimelineNode) {
  return node.product_type === "clips" || !!node.is_video || node.media_type === 2;
}

function collectTimelineReels(
  edges: IgTimelineEdge[] | undefined,
  author: string,
  seen: Set<string>,
  reels: InstagramReel[],
) {
  for (const edge of edges ?? []) {
    const node = edge.node;
    if (!node || !isTimelineReel(node)) continue;

    const reel = mapTimelineReel(node, author);
    if (!reel || seen.has(reel.shortcode)) continue;

    seen.add(reel.shortcode);
    reels.push(reel);
  }
}

async function fetchProfile(username: string) {
  const res = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    { headers: igHeaders(`https://www.instagram.com/${username}/`) },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Instagram profile");
  }

  const data = (await res.json()) as IgProfileResponse;
  const user = data.data?.user;

  if (!user?.id) {
    throw new Error("Instagram profile not found");
  }

  return {
    id: user.id,
    username: user.username ?? username,
    author: user.full_name || user.username || username,
    timeline: user.edge_owner_to_timeline_media,
  };
}

export async function fetchInstagramReels(username: string): Promise<InstagramReel[]> {
  const profile = await fetchProfile(username);
  const reels: InstagramReel[] = [];
  const seen = new Set<string>();

  collectTimelineReels(profile.timeline?.edges, profile.author, seen, reels);

  return reels;
}

export function extractReelShortcode(url: string) {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  return match?.[1] ?? "";
}

export async function fetchProfileThumbnailMap(username: string) {
  const profile = await fetchProfile(username);
  const map = new Map<string, string>();

  for (const edge of profile.timeline?.edges ?? []) {
    const node = edge.node;
    const shortcode = node?.shortcode ?? node?.code;
    const thumbnailUrl = node?.display_url ?? node?.image_versions2?.candidates?.[0]?.url;
    if (shortcode && thumbnailUrl) map.set(shortcode, thumbnailUrl);
  }

  return map;
}

export async function enrichReelThumbnails(
  reels: InstagramReel[],
  username: string,
): Promise<InstagramReel[]> {
  if (reels.every((reel) => reel.thumbnailUrl)) return reels;

  try {
    const thumbnails = await fetchProfileThumbnailMap(username);
    return reels.map((reel) => ({
      ...reel,
      thumbnailUrl: reel.thumbnailUrl || thumbnails.get(reel.shortcode) || "",
    }));
  } catch {
    return reels;
  }
}
