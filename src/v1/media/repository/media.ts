import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";

import type { CreateMedias } from "../types/repository.types.js";

export const createMedias = async (medias: CreateMedias) => {
  const { error, data: createdMedias } = await tryCatch(
    prisma.media.createManyAndReturn({ data: medias }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdMedias;
};
