import { uploadMedia } from "@/v1/storage/cloudinary-service.js";

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
      uploadMedia(folderPath, file.path, { resource_type: getResourceType(file.mimetype) })
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
