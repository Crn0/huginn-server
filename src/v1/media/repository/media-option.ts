import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    tweets: {
      select: { id: true },
    },
  },
} satisfies Prisma.MediaDefaultArgs;

export const getMediaOptions = {
  include: {
    ...baseOptions.include,
  },
} satisfies Prisma.MediaDefaultArgs;
