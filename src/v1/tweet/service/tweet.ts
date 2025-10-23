import { env } from "@/configs/env.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import * as tweetRepository from "../repository/tweet.js";
import { toPrismaPagination } from "@/v1/lib/prisma-pagination.js";
import * as mediaService from "@/v1/media/service/media.js";

import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { CreateTweet, GetTweetsOption, ReplyTweet } from "../types/repository.types.js";
import type { ReplyTweetDTO } from "../schema/reply-tweet.js";
import type { PaginationCursor } from "@/v1/lib/prisma-pagination.js";
import type { PatchTweetDTO } from "../schema/patch-tweet.js";
import type { TweetFilter } from "@/v1/lib/tweet-schema.js";

const TWEETS_PAGE_SIZE = 20 as const;

const handleMediaUpload = async <T extends Partial<CreateTweet>>(
  data: T,
  media: CreateTweetDTO["media"],
  uploaderId: string
) => {
  if (media?.length) {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    const uploadedMedia = await mediaService.createMedia(mediaFolder, media, { uploaderId });

    data.media = uploadedMedia;
  }

  return data;
};

const buildFilter = (userId: string | undefined, option: GetTweetsOption, filter: TweetFilter) => {
  if (typeof option.where !== "object") {
    option.where = {};
  }

  if (typeof filter.s === "string") {
    option.where = {
      ...option.where,
      content: {
        contains: filter.s,
        mode: "insensitive",
      },
    };
  }

  if (userId && filter.w === "following") {
    option.where = {
      ...option.where,
      author: {
        id: { not: userId },
        followedBy: { every: { id: userId } },
      },
    };
  }

  return option;
};

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const createTweet = async (DTO: CreateTweetDTO) => {
  const data: CreateTweet = {
    authorId: DTO.authorId,
    content: DTO.content,
    media: [],
  };

  await handleMediaUpload(data, DTO.media, data.authorId);

  return tweetRepository.createTweet(data);
};

export const replyTweet = async (DTO: ReplyTweetDTO) => {
  const data: ReplyTweet = {
    authorId: DTO.authorId,
    replyTo: DTO.replyTo,
    content: DTO.content,
    media: [],
  };

  await handleMediaUpload(data, DTO.media, data.authorId);

  return tweetRepository.replyTweet(data);
};

export const getTweetById = async (id: string) => {
  const tweet = await tweetRepository.getTweetById(id);

  if (!tweet) {
    throw new NotFoundError("Tweet not found.");
  }

  return tweet;
};

export const getTweetsByAuthorUsername = async (username: string) =>
  tweetRepository.getTweetsByAuthorUsername(username);

export const getTweetsPagination = async (
  userId: string | undefined,
  query: { cursor: PaginationCursor; filter: TweetFilter }
) => {
  const { cursor, filter } = query;

  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = buildFilter(
    userId,
    {
      ...rest,
      orderBy: [
        {
          createdAt: "desc",
        } as const,
        { id: "desc" } as const,
      ],
      distinct: ["id" as const],
    },
    filter
  );

  const [res, total] = await Promise.all([
    tweetRepository.getTweets(options),
    tweetRepository.getTweetsCount(),
  ]);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = tweets.at?.(-1)?.id;
  const prevCursor = tweets.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    tweets,
    `/tweets?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    tweets,
    `/tweets?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: tweets,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: tweets.length > 0 ? total : 0,
  });
};

export const getRepliesPagination = async (
  tweetId: string,
  query: { cursor: PaginationCursor }
) => {
  const { cursor } = query;

  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    where: {
      replyTo: { id: tweetId },
    },
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
    distinct: ["id" as const],
  } satisfies GetTweetsOption;

  const [res, total] = await Promise.all([
    tweetRepository.getTweets(options),
    tweetRepository.getTweetsCount({ replyTo: { id: tweetId } }),
  ]);

  const replies =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = replies.at?.(-1)?.id;
  const prevCursor = replies.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    replies,
    `/replies?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    replies,
    `/replies?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: replies,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: replies.length > 0 ? total : 0,
  });
};

export const getTweetsByAuthorIdPagination = async (id: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  } satisfies GetTweetsOption;

  const [res, total] = await Promise.all([
    tweetRepository.getTweetsByAuthorId(id, options),
    tweetRepository.getTweetsCountByAuthorId(id),
  ]);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = tweets.at?.(-1)?.id;
  const prevCursor = tweets.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    tweets,
    `/tweets?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    tweets,
    `/tweets?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: tweets,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: tweets.length > 0 ? total : 0,
  });
};

export const getTweetsByAuthorUsernamePagination = async (
  username: string,
  cursor: PaginationCursor
) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  } satisfies GetTweetsOption;

  const [res, total] = await Promise.all([
    tweetRepository.getTweetsByAuthorUsername(username, options),
    tweetRepository.getTweetsCountByAuthorUsername(username),
  ]);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = tweets.at?.(-1)?.id;
  const prevCursor = tweets.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    tweets,
    `/tweets?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    tweets,
    `/tweets?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: tweets,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: tweets.length > 0 ? total : 0,
  });
};

export const getRepliesByAuthorIdPagination = async (
  authorId: string,
  cursor: PaginationCursor
) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  } as GetTweetsOption;

  const [res, total] = await Promise.all([
    tweetRepository.getRepliesByAuthorId(authorId, options),
    tweetRepository.getTweetsCount({
      author: { id: authorId },
      replyToPk: { not: null },
    }),
  ]);

  const replies =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = replies.at?.(-1)?.id;
  const prevCursor = replies.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    replies,
    `/replies?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    replies,
    `/replies?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: replies,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: replies.length > 0 ? total : 0,
  });
};

export const getLikedTweetsPaginationByUserId = async (
  userId: string,
  query: { cursor: PaginationCursor }
) => {
  const { cursor } = query;

  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    where: {
      likes: {
        every: {
          user: { id: userId },
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
    distinct: ["id" as const],
  } satisfies GetTweetsOption;

  const [res, total] = await Promise.all([
    tweetRepository.getTweets(options),
    tweetRepository.getTweetsCount({
      likes: {
        every: {
          user: { id: userId },
        },
      },
    }),
  ]);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = tweets.at?.(-1)?.id;
  const prevCursor = tweets.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    tweets,
    `/likes?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    tweets,
    `/likes?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: tweets,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};

export const patchTweetById = async (id: string, DTO: PatchTweetDTO) =>
  tweetRepository.patchTweetById(id, DTO);

export const deleteTweetById = async (id: string) => {
  const { count: mediaCount } = await mediaService.deleteMediaByTweetId(id);

  const tweet = await tweetRepository.deleteTweetById(id);

  return Object.freeze({ tweet, mediaCount });
};

export const deleteTweetsByAuthorId = async (authorId: string) => {
  await mediaService.deleteMediaByUploaderId(authorId);

  return tweetRepository.deleteTweetsByAuthorId(authorId);
};
