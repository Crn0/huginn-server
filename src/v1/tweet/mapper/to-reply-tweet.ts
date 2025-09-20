import type { Prisma } from "@/generated/prisma/index.js";
import type { ReplyTweet } from "../types/repository.types.js";

type MappedData = Prisma.TweetCreateInput;

export const toReplyTweet = ({ authorId, replyTo, content, medias }: ReplyTweet) => {
  const data: MappedData = {
    content,
    author: {
      connect: {
        id: authorId,
      },
    },
    replyTo: {
      connect: {
        id: replyTo,
      },
    },
    medias: {
      connect: medias.map((media) => ({ id: media.id })),
    },
  };

  return Object.freeze(data);
};
