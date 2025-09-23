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

export const createMedias = async (folderPath: string, mediaFiles: MediaFiles) => {
  const uploadResponse = await Promise.allSettled(
    mediaFiles.map((file) =>
      storage.uploadMedia(folderPath, file.path, { resource_type: getResourceType(file.mimetype) })
    )
  );

  const uploadedMedias = uploadResponse
    .filter((res) => res.status === "fulfilled")
    .map(({ value: file }) =>
      Object.freeze({
        filePath: file.public_id,
        type: getMediaType(file.format),
        url: file.secure_url,
        bytes: file.bytes,
      })
    );

  return mediaRepository.createMedias(uploadedMedias);
};

export const getMediasByTweetId = async (tweetId: string) =>
  mediaRepository.getMediasByTweetId(tweetId);

export const deleteMediasByTweetId = async (tweetId: string) => {
  const medias = await mediaRepository.getMediasByTweetId(tweetId);

  const mediasToDelete = medias.filter((m) => m.tweets.length === 1);

  if (!mediasToDelete.length) return { count: 0 };

  await Promise.all(mediasToDelete.map((m) => storage.deleteMedia(m.filePath)));

  const idsToDelete = mediasToDelete.map((m) => m.id);

  return mediaRepository.deleteMediasByIds(idsToDelete);
};
