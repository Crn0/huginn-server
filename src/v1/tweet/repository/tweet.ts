import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { createTweetOptions } from "./tweet-options.js";
import { toCreateTweet } from "../mapper/to-create-tweet.js";

import type { CreateTweet } from "../types/repository.types.js";

export const createTweet = async (data: CreateTweet) => {
  const { error, data: createdTweet } = await tryCatch(
    prisma.tweet.create({
      ...createTweetOptions,
      data: {
        ...toCreateTweet(data),
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdTweet;
};
