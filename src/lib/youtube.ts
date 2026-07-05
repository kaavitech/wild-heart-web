export function extractVideoId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/,
  );
  return match?.[1] ?? "";
}

export function toWatchUrl(url: string) {
  const id = extractVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

export function toEmbedUrl(url: string, autoplay = false) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
    playsinline: "1",
    rel: "0",
  });
  return `https://www.youtube.com/embed/${extractVideoId(url)}?${params}`;
}

export type YouTubeMeta = {
  title: string;
  author: string;
  description: string;
  thumbnailUrl: string;
};

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetaDescription(html: string) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return match?.[1] ? decodeHtmlEntities(match[1]) : "";
}

export async function fetchYouTubeMeta(url: string): Promise<YouTubeMeta> {
  const watchUrl = toWatchUrl(url);
  const oembedRes = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`,
  );

  if (!oembedRes.ok) {
    throw new Error("Failed to fetch YouTube metadata");
  }

  const oembed = (await oembedRes.json()) as {
    title: string;
    author_name: string;
    thumbnail_url: string;
  };

  let description = "";
  try {
    const pageRes = await fetch(watchUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; WildAgileBot/1.0)" },
    });
    if (pageRes.ok) {
      description = extractMetaDescription(await pageRes.text());
    }
  } catch {
    // Fall back to channel name when page metadata is unavailable.
  }

  return {
    title: oembed.title,
    author: oembed.author_name,
    description: description || `By ${oembed.author_name}`,
    thumbnailUrl: oembed.thumbnail_url,
  };
}
