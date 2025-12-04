import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

import { mutateRepostOption } from "./option.js";

import type { CreateRepost } from "./index.types.js";

export const createRepost = async (data: CreateRepost) => {
  const [tweet, user] = await Promise.all([
    prisma.tweet.findUnique({ where: { id: data.tweetId } }),
    prisma.user.findUnique({ where: { id: data.userId } }),
  ]);

  const tweetPk = tweet?.primaryKey;
  const userPk = user?.primaryKey;

  if (!tweetPk) throw new NotFoundError("Tweet does not exist");
  if (!userPk) throw new NotFoundError("User does not exist");

  const { error, data: repost } = await tryCatch(
    prisma.repost.create({
      ...mutateRepostOption,
      data: {
        tweetPk,
        userPk,
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return repost;
};

export const getRepost = async (tweetId: string, userId: string) => {
  const repost = await prisma.repost.findFirst({
    where: {
      tweet: { id: tweetId },
      user: { id: userId },
    },
  });

  return repost;
};

export const deleteRepost = async (data: CreateRepost) => {
  const [tweet, user] = await Promise.all([
    prisma.tweet.findUnique({ where: { id: data.tweetId } }),
    prisma.user.findUnique({ where: { id: data.userId } }),
  ]);

  const tweetPk = tweet?.primaryKey;
  const userPk = user?.primaryKey;

  if (!tweetPk) throw new NotFoundError("Tweet does not exist");
  if (!userPk) throw new NotFoundError("User does not exist");

  const { error, data: repost } = await tryCatch(
    prisma.repost.delete({
      ...mutateRepostOption,
      where: {
        tweetPk_userPk: {
          tweetPk,
          userPk,
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return repost;
};
