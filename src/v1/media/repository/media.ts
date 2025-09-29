import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getMediaOptions } from "./media-option.js";

import type { CreateMedia } from "../types/repository.types.js";

export const createMedia = async (media: CreateMedia) => {
  const { error, data: createdMedia } = await tryCatch(
    prisma.media.createManyAndReturn({ data: media }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdMedia;
};

export const getMediaByTweetId = async (tweetId: string) => {
  const { error, data: media } = await tryCatch(
    prisma.media.findMany({ ...getMediaOptions, where: { tweets: { id: tweetId } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return media;
};

export const deleteMediaByIds = async (ids: string[]) => {
  const { error, data: result } = await tryCatch(
    prisma.media.deleteMany({ where: { id: { in: ids } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return result;
};
