import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import {
  createTweetOptions,
  replyTweetOptions,
  deleteTweetOptions,
  getTweetOptions,
  getReplyOptions,
} from "./tweet-options.js";
import { toCreateTweet } from "../mapper/to-create-tweet.js";
import { toReplyTweet } from "../mapper/to-reply-tweet.js";

import type {
  CreateTweet,
  GetTweetsOption,
  PatchTweet,
  ReplyTweet,
  TweetPaginationOption,
} from "../types/repository.types.js";

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

export const replyTweet = async (data: ReplyTweet) => {
  const { error, data: createdTweet } = await tryCatch(
    prisma.tweet.create({
      ...replyTweetOptions,
      data: {
        ...toReplyTweet(data),
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdTweet;
};

export const getTweetById = async (id: string) => {
  const { error, data: tweet } = await tryCatch(
    prisma.tweet.findUnique({
      ...getTweetOptions,
      where: { id, deletedAt: null },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return tweet;
};

export const getTweetsByAuthorId = async (authorId: string, option?: TweetPaginationOption) => {
  const { error, data: tweets } = await tryCatch(
    prisma.tweet.findMany({
      ...getTweetOptions,
      ...option,
      where: { author: { id: authorId }, replyToPk: null },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return tweets;
};

export const getRepliesByAuthorId = async (authorId: string, option?: TweetPaginationOption) => {
  const { error, data: replies } = await tryCatch(
    prisma.tweet.findMany({
      ...getReplyOptions,
      ...option,
      where: { author: { id: authorId }, replyToPk: { not: null } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return replies;
};

export const getTweets = async (option?: GetTweetsOption) => {
  const { error, data: tweets } = await tryCatch(
    prisma.tweet.findMany({
      ...getTweetOptions,
      ...option,
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return tweets;
};

export const getTweetsCount = async (where: GetTweetsOption["where"] = { deletedAt: null }) => {
  const { error, data: count } = await tryCatch(prisma.tweet.count({ where }), dbErrorHandler);

  if (error) throw error;

  return count;
};

export const getTweetsCountByAuthorId = async (authorId: string) => {
  const { error, data: count } = await tryCatch(
    prisma.tweet.count({ where: { author: { id: authorId }, deletedAt: null, replyToPk: null } }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};

export const patchTweetById = async (id: string, data: PatchTweet) => {
  const { error, data: updatedTweet } = await tryCatch(
    prisma.tweet.update({
      ...createTweetOptions,
      data,
      where: { id },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedTweet;
};

export const deleteTweetById = async (id: string) => {
  const { error, data: tweet } = await tryCatch(
    prisma.tweet.delete({
      ...deleteTweetOptions,
      where: { id },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return tweet;
};

export const deleteTweetsByAuthorId = async (authorId: string) => {
  const { error, data } = await tryCatch(
    prisma.tweet.deleteMany({
      where: { author: { id: authorId } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return data.count;
};
