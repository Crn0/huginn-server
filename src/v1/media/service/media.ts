import * as storage from "@/v1/storage/cloudinary-service.js";

import * as mediaRepository from "../repository/media.js";

import type { MediaFiles, SupportedFile } from "../types/service.types.js";

const getMediaType = (format: string) => {
  if (format === "mp4") return "VIDEO";
  if (format === "gif") return "GIF";

  return "IMAGE";
};

const getResourceType = (format: SupportedFile) => {
  if (format === "video/mp4") return "video";

  return "image";
};

export const createMedia = async (folderPath: string, mediaFiles: MediaFiles, options?: { uploaderId: string }) => {
  const uploadResponse = await Promise.allSettled(
    mediaFiles.map((file) =>
      storage.uploadMedia(folderPath, file.path, { resource_type: getResourceType(file.mimetype) })
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

export const deleteMediaByTweetId = async (tweetId: string) => {
  const media = await mediaRepository.getMediaByTweetId(tweetId);

  const mediaToDelete = media.filter((m) => m.tweets.length === 1);

  if (!mediaToDelete.length) return { count: 0 };

  await Promise.all(mediaToDelete.map((m) => storage.deleteMedia(m.filePath)));

  const idsToDelete = mediaToDelete.map((m) => m.id);

  return mediaRepository.deleteMediaByIds(idsToDelete);
};
