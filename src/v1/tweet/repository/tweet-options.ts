import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    author: {
      select: {
        id: true,
        username: true,
        profile: { select: { displayName: true, avatar: true, banner: true } },
      },
    },
    medias: true,
  },
} as const;

export const createTweetOptions = {
  ...baseOptions,
} satisfies Prisma.TweetDefaultArgs;

export const replyTweetOptions = {
  include: {
    ...baseOptions.include,
    replyTo: { select: { id: true } },
  },
} satisfies Prisma.TweetDefaultArgs;

export const getTweetOptions = {
  include: {
    ...baseOptions.include,
    replies: { select: { id: true } },
  },
} satisfies Prisma.TweetDefaultArgs;

export const updateTweetOptions = {
  ...baseOptions,
} satisfies Prisma.TweetDefaultArgs;

export const deleteTweetOptions = {
  select: {
    id: true,
    author: { select: { id: true, username: true } },
  },
} satisfies Prisma.TweetDefaultArgs;
