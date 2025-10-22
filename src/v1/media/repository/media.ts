import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getMediaOptions, getMediaByUploaderOptions } from "./media-option.js";

import type { CreateMedia, GetMediaOption } from "../types/repository.types.js";

export const createMedia = async (media: CreateMedia, options?: { uploaderId: string }) => {
  let uploaderPk: number | undefined;

  const uploaderId = options?.uploaderId;

  if (uploaderId) {
    const uploader = await prisma.user.findUnique({
      where: { id: uploaderId },
      select: { primaryKey: true },
    });

    uploaderPk = uploader?.primaryKey;
  }

  const { error, data: createdMedia } = await tryCatch(
    prisma.media.createManyAndReturn({
      data: media.map((m) => (uploaderPk ? { ...m, uploaderPk } : { ...m })),
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdMedia;
};

export const getMediaByTweetId = async (tweetId: string) => {
  const { error, data: media } = await tryCatch(
    prisma.media.findMany({ ...getMediaOptions, where: { tweet: { id: tweetId } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return media;
};

export const getMediaByUploaderId = async (id: string, option: GetMediaOption) => {
  const { error, data: media } = await tryCatch(
    prisma.media.findMany({
      ...getMediaByUploaderOptions,
      ...option,
      where: { uploader: { id } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return media;
};

export const getMediaByUploaderUsername = async (username: string, option: GetMediaOption) => {
  const { error, data: media } = await tryCatch(
    prisma.media.findMany({
      ...getMediaByUploaderOptions,
      ...option,
      where: { uploader: { username } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return media;
};

export const getMediaCountByUploaderId = async (id: string) => {
  const { error, data: count } = await tryCatch(
    prisma.media.count({
      where: { uploader: { id } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};

export const getMediaCountByUploaderUsername = async (username: string) => {
  const { error, data: count } = await tryCatch(
    prisma.media.count({
      where: { uploader: { username } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};

export const deleteMediaByIds = async (ids: string[]) => {
  const { error, data: result } = await tryCatch(
    prisma.media.deleteMany({ where: { id: { in: ids } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return result;
};

export const deleteMediaByUploaderId = async (uploaderId: string) => {
  const { error, data: result } = await tryCatch(
    prisma.media.deleteMany({ where: { uploader: { id: uploaderId } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return result;
};
