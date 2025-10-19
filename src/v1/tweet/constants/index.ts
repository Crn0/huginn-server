export type SupportedFile = (typeof SUPPORTED_FILE_TYPES)[number];

export const SUPPORTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
] as const;

export const MAX_MEDIA = 5 as const;
export const MAX_FILE_SIZE = 10_000_000 as const; // 10mb

export const MAX_CONTENT_LENGTH = 1000 as const;
