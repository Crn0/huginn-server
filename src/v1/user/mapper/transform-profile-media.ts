import { getMediaUrl } from "@/v1/storage/cloudinary-service.js";

import type { Media } from "@/generated/prisma/index.js";
import type { MediaSize } from "@/v1/lib/user-schema.js";

export const transformProfileMedia = (media: Media | null) => {
  if (!media) return null;

  const small = {
    url: getMediaUrl(media.filePath, [
      { width: 64, height: 64, crop: "thumb", gravity: "face" },
      { radius: "max" },
      { quality: "auto:low", fetch_format: "webp" },
    ]),
    w: 64,
    h: 64,
  } satisfies MediaSize;

  const medium = {
    url: getMediaUrl(media.filePath, [
      { width: 128, height: 128, crop: "thumb", gravity: "face" },
      { radius: "max" },
      { quality: "auto:good", fetch_format: "webp" },
    ]),
    w: 128,
    h: 128,
  } satisfies MediaSize;

  const large = {
    url: getMediaUrl(media.filePath, [
      { width: 256, height: 256, crop: "thumb", gravity: "face" },
      { radius: "max" },
      { quality: "auto:best", fetch_format: "webp" },
    ]),
    w: 256,
    h: 256,
  } satisfies MediaSize;

  return Object.freeze({ ...media, sizes: { small, medium, large } });
};
