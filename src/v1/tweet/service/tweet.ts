import { env } from "@/configs/env.js";
import * as tweetRepository from "../repository/tweet.js";
import { toPrismaPagination } from "@/v1/lib/prisma-pagination.js";
import { createMedia, deleteMediaByTweetId } from "@/v1/media/service/media.js";

import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { CreateTweet, ReplyTweet } from "../types/repository.types.js";
import type { ReplyTweetDTO } from "../schema/reply-tweet.js";
import type { PaginationCursor } from "@/v1/lib/prisma-pagination.js";
import type { PatchTweetDTO } from "../schema/patch-tweet.js";

const TWEETS_PAGE_SIZE = 20 as const;

const handleMediaUpload = async <T extends Partial<CreateTweet>>(
  data: T,
  media: CreateTweetDTO["media"]
) => {
  if (media?.length) {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    const uploadedMedia = await createMedia(mediaFolder, media);

    data.media = uploadedMedia;
  }

  return data;
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

  await handleMediaUpload(data, DTO.media);

  return tweetRepository.createTweet(data);
};

export const replyTweet = async (DTO: ReplyTweetDTO) => {
  const data: ReplyTweet = {
    authorId: DTO.authorId,
    replyTo: DTO.replyTo,
    content: DTO.content,
    media: [],
  };

  await handleMediaUpload(data, DTO.media);

  return tweetRepository.replyTweet(data);
};

export const getTweetById = async (id: string) => tweetRepository.getTweetById(id);

export const getTweetsByAuthorId = async (authorId: string) =>
  tweetRepository.getTweetsByAuthorId(authorId);

export const getTweetsByAuthorIdPagination = async (authorId: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  };

  const [res, total] = await Promise.all([
    tweetRepository.getTweetsByAuthorId(authorId, options),
    tweetRepository.getTweetsCountByAuthorId(authorId),
  ]);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextCursor = tweets.at?.(-1)?.id;
  const prevCursor = tweets.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    res,
    `/tweets?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    res,
    `/tweets?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    tweets,
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
  const { count: mediaCount } = await deleteMediaByTweetId(id);

  const tweet = await tweetRepository.deleteTweetById(id);

  return Object.freeze({ tweet, mediaCount });
};

export const deleteTweetsByAuthorId = async (authorId: string) => {
  const tweets = await getTweetsByAuthorId(authorId);

  await Promise.all(tweets.map(async (tweet) => deleteMediaByTweetId(tweet.id)));

  return tweetRepository.deleteTweetsByAuthorId(authorId);
};
