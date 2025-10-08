import { prisma } from "@/db/client/prisma.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { LIKE_CONFLICT } from "@/v1/constants/error-codes.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { createLikeOptions, unlikeOptions } from "./like-options.js";

export const likeTweet = async (userId: string, tweetId: string) => {
  const [user, tweet] = await prisma.$transaction([
    prisma.user.findUnique({ where: { id: userId }, select: { primaryKey: true } }),
    prisma.tweet.findUnique({ where: { id: tweetId }, select: { primaryKey: true } }),
  ]);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (!tweet) {
    throw new NotFoundError("Tweet not found.");
  }

  const { error, data: like } = await tryCatch(
    prisma.like.create({
      ...createLikeOptions,
      data: { userPk: user.primaryKey, tweetPk: tweet.primaryKey },
    }),
    (e) =>
      dbErrorHandler(
        e,
        "P2002",
        new ConflictError("Unique constraint violation", {
          entity: "like",
          code: LIKE_CONFLICT,
          message: "Tweet has already been liked.",
        })
      )
  );

  if (error) throw error;

  return like;
};

export const unlikeTweet = async (userId: string, tweetId: string) => {
  const [user, tweet] = await prisma.$transaction([
    prisma.user.findUnique({ where: { id: userId }, select: { primaryKey: true } }),
    prisma.tweet.findUnique({ where: { id: tweetId }, select: { primaryKey: true } }),
  ]);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (!tweet) {
    throw new NotFoundError("Tweet not found.");
  }

  const { error, data: unlike } = await tryCatch(
    prisma.like.delete({
      ...unlikeOptions,
      where: { userPk_tweetPk: { userPk: user.primaryKey, tweetPk: tweet.primaryKey } },
    }),
    (e) => dbErrorHandler(e, "P2025", new NotFoundError("You haven't liked this tweet."))
  );

  if (error) throw error;

  return unlike;
};
