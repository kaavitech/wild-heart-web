const ALLOWED_HOSTS = ["fbcdn.net", "cdninstagram.com", "instagram.com"];

export function isInstagramCdnUrl(url: string) {
  try {
    const host = new URL(url).hostname;
    return ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  } catch {
    return false;
  }
}

export function proxiedInstagramImageUrl(url: string) {
  if (!url || !isInstagramCdnUrl(url)) return url;
  return `/api/instagram-image?src=${encodeURIComponent(url)}`;
}
