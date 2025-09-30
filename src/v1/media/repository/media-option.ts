import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    tweet: {
      select: { id: true },
    },
  },
} satisfies Prisma.MediaDefaultArgs;

export const getMediaOptions = {
  include: {
    ...baseOptions.include,
  },
} satisfies Prisma.MediaDefaultArgs;

export const getMediaByUploaderOptions = {
  include: {
    ...baseOptions.include,
    uploader: {
      select: {
        username: true,
        profile: {
          select: {
            displayName: true,
            avatar: true,
            banner: true,
          },
        },
      },
    },
  },
} satisfies Prisma.MediaDefaultArgs;
