import type { Prisma } from "@/generated/prisma/index.js";
import type { CreateTweet } from "../types/repository.types.js";

type MappedData = Omit<Prisma.TweetCreateWithoutReplyToInput, "replies">;

export const toCreateTweet = ({ authorId, content, medias }: CreateTweet) => {
  const data: MappedData = {
    content,
    author: {
      connect: {
        id: authorId,
      },
    },
    medias: {
      connect: medias.map((media) => ({ id: media.id })),
    },
  };

  return Object.freeze(data);
};
