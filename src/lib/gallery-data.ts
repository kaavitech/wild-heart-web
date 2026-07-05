const galleryModules = import.meta.glob("../assets/gallery/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export type GalleryImage = {
  id: string;
  src: string;
  category: string;
  filename: string;
};

function categoryFromPath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  const parts = normalized.split("/");
  const galleryIndex = parts.indexOf("gallery");
  return galleryIndex >= 0 ? (parts[galleryIndex + 1] ?? "Gallery") : "Gallery";
}

function filenameFromPath(path: string) {
  const normalized = path.replace(/\\/g, "/");
  return normalized.split("/").pop() ?? normalized;
}

function buildGalleryImages() {
  return Object.entries(galleryModules)
    .filter(([path]) => IMAGE_EXT.test(path))
    .map(([path, src]) => {
      const category = categoryFromPath(path);
      const filename = filenameFromPath(path);
      return {
        id: `${category}/${filename}`,
        src,
        category,
        filename,
      };
    })
    .sort((a, b) => {
      const categoryOrder = a.category.localeCompare(b.category);
      return categoryOrder !== 0 ? categoryOrder : a.filename.localeCompare(b.filename);
    });
}

export const GALLERY_IMAGES: GalleryImage[] = buildGalleryImages();

export const GALLERY_CATEGORIES = [
  "All",
  ...Array.from(new Set(GALLERY_IMAGES.map((image) => image.category))).sort((a, b) =>
    a.localeCompare(b),
  ),
];

export function getGalleryPreviewImages(perCategory = 2) {
  const byCategory = new Map<string, GalleryImage[]>();

  for (const image of GALLERY_IMAGES) {
    const existing = byCategory.get(image.category) ?? [];
    existing.push(image);
    byCategory.set(image.category, existing);
  }

  return Array.from(byCategory.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([, images]) => images.slice(0, perCategory));
}
