import * as storage from "@/v1/storage/cloudinary-service.js";

import * as mediaRepository from "../repository/media.js";
import { toPrismaPagination, type PaginationCursor } from "@/v1/lib/prisma-pagination.js";

import type { MediaFiles, SupportedFile } from "../types/service.types.js";

const MEDIA_PAGE_SIZE = 20 as const;

const getMediaType = (format: string) => {
  if (format === "mp4") return "VIDEO";
  if (format === "gif") return "GIF";

  return "IMAGE";
};

const getResourceType = (format: SupportedFile) => {
  if (format === "video/mp4") return "video";

  return "image";
};

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const createMedia = async (
  folderPath: string,
  mediaFiles: MediaFiles,
  options?: { uploaderId: string }
) => {
  const uploadResponse = await Promise.allSettled(
    mediaFiles.map((file) =>
      storage.uploadMedia(folderPath, file.path, {
        resource_type: getResourceType(file.mimetype),
        tags: options?.uploaderId ? [options.uploaderId] : undefined,
      })
    )
  );

  const uploadedMedia = uploadResponse
    .filter((res) => res.status === "fulfilled")
    .map(({ value: file }) =>
      Object.freeze({
        filePath: file.public_id,
        type: getMediaType(file.format),
        url: file.secure_url,
        bytes: file.bytes,
      })
    );

  return mediaRepository.createMedia(uploadedMedia, options);
};

export const getMediaByTweetId = async (tweetId: string) =>
  mediaRepository.getMediaByTweetId(tweetId);

export const getMediaCountByUploaderId = async (uploaderId: string) => mediaRepository.getMediaCountByUploaderId(uploaderId);

export const getMediaByUploaderIdPagination = async (uploaderId: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: MEDIA_PAGE_SIZE });

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  };

  const [res, total] = await Promise.all([
    mediaRepository.getMediaByUploaderId(uploaderId, options),
    mediaRepository.getMediaCountByUploaderId(uploaderId),
  ]);

  const media =
    direction === "backward" ? res.slice(-MEDIA_PAGE_SIZE) : res.slice(0, MEDIA_PAGE_SIZE);

  const hasMore = res.length > MEDIA_PAGE_SIZE;

  const nextCursor = media.at?.(-1)?.id;
  const prevCursor = media.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    res,
    `/media?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    res,
    `/media?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    media,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};


export const deleteMediaByTweetId = async (tweetId: string) => {
  const media = await mediaRepository.getMediaByTweetId(tweetId);

  if (!media.length) return { count: 0 };

  await Promise.all(media.map((m) => storage.deleteMedia(m.filePath)));

  const idsToDelete = media.map((m) => m.id);

  return mediaRepository.deleteMediaByIds(idsToDelete);
};
