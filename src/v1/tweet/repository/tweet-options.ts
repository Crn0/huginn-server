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
  },
} as const;

export const createTweetOptions = {
  ...baseOptions,
} satisfies Prisma.TweetDefaultArgs;
