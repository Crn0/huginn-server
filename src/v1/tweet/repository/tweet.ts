import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import {
  createTweetOptions,
  replyTweetOptions,
  deleteTweetOptions,
  getTweetOptions,
  getRepostOptions,
} from "./tweet-options.js";
import { toCreateTweet } from "../mapper/to-create-tweet.js";
import { toReplyTweet } from "../mapper/to-reply-tweet.js";

import type {
  CreateTweet,
  GetTweetReplyOption,
  GetTweetsOption,
  PatchTweet,
  ReplyTweet,
} from "../types/repository.types.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

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
      where: { id },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return tweet;
};

export const getTweets = async (option?: GetTweetsOption) => {
  const { error, data: tweets } = await tryCatch(
    prisma.tweet.findMany({
      include: {
        ...getTweetOptions.include,
      },
      ...option,
    }),
    dbErrorHandler
  );

  if (error) throw error;

  const repost = (
    await prisma.repost.findMany({
      where: {
        tweet: { id: { in: tweets?.map(({ id }) => id) } },
      },
      include: {
        ...getRepostOptions.include,
      },
    })
  ).map((r) => ({
    ...r.tweet,
    repostAt: r.createdAt,
    repostId: r.id,
    reposter: r.user,
  })) as ((typeof tweets)[0] & {
    repostId: string;
    reposter: {
      id: string;
      username: string;
      profile: {
        displayName: string | null;
      };
    };
    repostAt: Date;
  })[];

  const isRepost = (tweet: unknown): tweet is (typeof repost)[number] => {
    return typeof (tweet as (typeof repost)[number]).repostId !== "undefined";
  };

  return [...tweets, ...repost].sort((a, b) => {
    if (isRepost(a) && isRepost(b)) {
      return b.repostAt.getTime() - a.repostAt.getTime();
    }

    if (!isRepost(a) && isRepost(b)) {
      return b.repostAt.getTime() - a.createdAt.getTime();
    }

    if (isRepost(a) && !isRepost(b)) {
      return b.createdAt.getTime() - a.repostAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

export const getTweetReplies = async (tweetId: string, option?: GetTweetReplyOption) => {
  const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });

  if (!tweet) throw new NotFoundError("Tweet not found.");

  const [{ error: repliesError, data: replies }, { error: countError, data: count }] =
    await Promise.all([
      tryCatch(
        prisma.tweet.findMany({
          ...option,
          include: {
            ...getTweetOptions.include,
            replies: {
              where: { author: { primaryKey: tweet.authorPk } },
              include: {
                ...getTweetOptions.include,
              },
            },
          },
          where: {
            replyTo: { id: tweetId },
          },
        })
      ),
      tryCatch(prisma.tweet.count({ where: { replyTo: { id: tweetId } } })),
    ]);

  if (repliesError || countError) throw repliesError || countError;

  return { replies, count };
};

export const getTweetsCount = async (where: GetTweetsOption["where"] = {}) => {
  const [
    { error: tweetCountError, data: tweetCount },
    { error: repostCountError, data: repostCount },
  ] = await Promise.all([
    tryCatch(prisma.tweet.count({ where }), dbErrorHandler),
    tryCatch(
      prisma.repost.count({
        where: {
          tweet: {
            ...where,
          },
        },
      }),
      dbErrorHandler
    ),
  ]);

  if (tweetCountError || repostCountError) throw tweetCountError || repostCountError;

  const count = tweetCount + repostCount;

  return count;
};

export const getTweetsCountByAuthorId = async (id: string) => {
  const { error, data: count } = await tryCatch(
    prisma.tweet.count({
      where: {
        author: { id: id },
        replyToPk: null,
      },
    }),
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
