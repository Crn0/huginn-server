import type { Prisma } from "@/generated/prisma/index.js";
import type { CreateTweet } from "../types/repository.types.js";

type MappedData = Omit<Prisma.TweetCreateWithoutReplyToInput, "replies">;

export const toCreateTweet = ({ authorId, content, media }: CreateTweet) => {
  const data: MappedData = {
    content,
    author: {
      connect: {
        id: authorId,
      },
    },
    media: {
      connect: media.map(({ id }) => ({ id })),
    },
  };

  return Object.freeze(data);
};
