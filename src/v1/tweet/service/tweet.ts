import { env } from "@/configs/env.js";
import * as tweetRepository from "../repository/tweet.js";
import { toPrismaPagination } from "@/v1/lib/prisma-pagination.js";
import { createMedias } from "@/v1/media/service/media.js";

import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { CreateTweet, ReplyTweet } from "../types/repository.types.js";
import type { ReplyTweetDTO } from "../schema/reply-tweet.js";
import type { PaginationCursor } from "@/v1/lib/prisma-pagination.js";

const TWEETS_PAGE_SIZE = 20 as const;

const handleMediasUpload = async <T extends Partial<CreateTweet>>(
  data: T,
  medias: CreateTweetDTO["medias"]
) => {
  if (medias.length) {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    const uploadedMedias = await createMedias(mediaFolder, medias);

    data.medias = uploadedMedias;
  }

  return data;
};

export const createTweet = async (DTO: CreateTweetDTO) => {
  const data: CreateTweet = {
    authorId: DTO.authorId,
    content: DTO.content,
    medias: [],
  };

  await handleMediasUpload(data, DTO.medias);

  return tweetRepository.createTweet(data);
};

export const replyTweet = async (DTO: ReplyTweetDTO) => {
  const data: ReplyTweet = {
    authorId: DTO.authorId,
    replyTo: DTO.replyTo,
    content: DTO.content,
    medias: [],
  };

  await handleMediasUpload(data, DTO.medias);

  return tweetRepository.replyTweet(data);
};

export const getTweetById = async (id: string) => tweetRepository.getTweetById(id);

export const getTweetsByAuthorId = async (authorId: string) => tweetRepository.getTweetsByAuthorId(authorId);
;

export const getTweetsByAuthorIdPagination = async (authorId: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: TWEETS_PAGE_SIZE });

  const options = {
    ...rest,
  } as const;

  const res = await tweetRepository.getTweetsByAuthorId(authorId, options);

  const tweets =
    direction === "backward" ? res.slice(-TWEETS_PAGE_SIZE) : res.slice(0, TWEETS_PAGE_SIZE);

  const reversedTweets = tweets.toReversed();

  const hasMore = res.length > TWEETS_PAGE_SIZE;

  const nextHref =
    direction === "backward" || hasMore ? `/tweets?after=${tweets.at?.(-1)?.id}` : null;

  const prevHref =
    direction === "forward" || (direction === "backward" && hasMore)
      ? `/tweets?before=${tweets.at?.(0)?.id}`
      : null;

  return Object.freeze({
    tweets: reversedTweets,
    nextHref,
    prevHref,
  });
};
