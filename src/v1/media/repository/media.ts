import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getMediaOptions } from "./media-option.js";

import type { CreateMedias } from "../types/repository.types.js";

export const createMedias = async (medias: CreateMedias) => {
  const { error, data: createdMedias } = await tryCatch(
    prisma.media.createManyAndReturn({ data: medias }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdMedias;
};

export const getMediasByTweetId = async (tweetId: string) => {
  const { error, data: medias } = await tryCatch(
    prisma.media.findMany({ ...getMediaOptions, where: { tweets: { some: { id: tweetId } } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return medias;
};

export const deleteMediasByIds = async (ids: string[]) => {
  const { error, data: result } = await tryCatch(
    prisma.media.deleteMany({ where: { id: { in: ids } } }),
    dbErrorHandler
  );

  if (error) throw error;

  return result;
};
