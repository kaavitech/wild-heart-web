export type GalleryImage = {
  id: string;
  src: string;
  thumbSrc: string;
  category: string;
  filename: string;
};

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
const THUMB_EXT = /\.thumb\.webp$/i;

function categoryFromPath(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");
  const parts = normalized.split("/");
  const galleryIndex = parts.indexOf("gallery");
  return galleryIndex >= 0 ? (parts[galleryIndex + 1] ?? "Gallery") : "Gallery";
}

function filenameFromPath(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized.split("/").pop() ?? normalized;
}

function thumbPathFor(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized.replace(/\.(jpe?g|png)$/i, ".thumb.webp");
}

function buildGalleryImages(
  modules: Record<string, string>,
  thumbModules: Record<string, string>,
): GalleryImage[] {
  return Object.entries(modules)
    .filter(([filePath]) => IMAGE_EXT.test(filePath) && !THUMB_EXT.test(filePath))
    .map(([filePath, src]) => {
      const category = categoryFromPath(filePath);
      const filename = filenameFromPath(filePath);
      const thumbKey = thumbPathFor(filePath);
      return {
        id: `${category}/${filename}`,
        src,
        thumbSrc: thumbModules[thumbKey] ?? src,
        category,
        filename,
      };
    })
    .sort((a, b) => {
      const categoryOrder = a.category.localeCompare(b.category);
      return categoryOrder !== 0 ? categoryOrder : a.filename.localeCompare(b.filename);
    });
}

export function getGalleryCategories(images: GalleryImage[]) {
  return [
    "All",
    ...Array.from(new Set(images.map((image) => image.category))).sort((a, b) =>
      a.localeCompare(b),
    ),
  ];
}

export function getGalleryPreviewImages(images: GalleryImage[], perCategory = 2) {
  const byCategory = new Map<string, GalleryImage[]>();

  for (const image of images) {
    const existing = byCategory.get(image.category) ?? [];
    existing.push(image);
    byCategory.set(image.category, existing);
  }

  return Array.from(byCategory.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([, categoryImages]) => categoryImages.slice(0, perCategory));
}

/** Full-resolution gallery — only import from the gallery route. */
export function loadGalleryImages() {
  const modules = import.meta.glob("../assets/gallery/**/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const thumbModules = import.meta.glob("../assets/gallery/**/*.thumb.webp", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const images = buildGalleryImages(modules, thumbModules);
  return {
    images,
    categories: getGalleryCategories(images),
  };
}

function loadAllGalleryThumbs(): GalleryImage[] {
  const thumbModules = import.meta.glob("../assets/gallery/**/*.thumb.webp", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  return Object.entries(thumbModules)
    .map(([filePath, thumbSrc]) => {
      const category = categoryFromPath(filePath);
      const filename = filenameFromPath(filePath).replace(".thumb.webp", "");
      return {
        id: `${category}/${filename}`,
        src: thumbSrc,
        thumbSrc,
        category,
        filename,
      };
    })
    .sort((a, b) => {
      const categoryOrder = a.category.localeCompare(b.category);
      return categoryOrder !== 0 ? categoryOrder : a.filename.localeCompare(b.filename);
    });
}

/** Thumbnails only — safe for the homepage preview. */
export function loadGalleryPreviewImages(perCategory = 2) {
  return getGalleryPreviewImages(loadAllGalleryThumbs(), perCategory);
}

/** Thumbnails for a single gallery folder (e.g. program past-walks). */
export function loadGalleryThumbsByCategory(category: string, limit?: number) {
  const images = loadAllGalleryThumbs().filter(
    (image) => image.category.toLowerCase() === category.toLowerCase(),
  );
  return typeof limit === "number" ? images.slice(0, limit) : images;
}
