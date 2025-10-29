import { getMediaUrl } from "@/v1/storage/cloudinary-service.js";

import type { Media } from "@/generated/prisma/index.js";

export const transformProfileAvatar = (media: Media | null) => {
  if (!media) return null;

  return getMediaUrl(media.filePath, [
    { width: 256, height: 256, crop: "thumb", gravity: "face" },
    { radius: "max" },
    { quality: "auto:best", fetch_format: "webp" },
  ]);
};

export const transformProfileBanner = (media: Media | null) => {
  if (!media) return null;

  return getMediaUrl(media.filePath, [
    { width: 1500, height: 500, gravity: "center", crop: "fill" },
    { quality: "auto:best", fetch_format: "webp" },
  ]);
};
