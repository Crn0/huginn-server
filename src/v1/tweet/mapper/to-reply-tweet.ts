import type { Prisma } from "@/generated/prisma/index.js";
import type { ReplyTweet } from "../types/repository.types.js";

type MappedData = Prisma.TweetCreateInput;

export const toReplyTweet = ({ authorId, replyTo, content, media }: ReplyTweet) => {
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
    media: {
      connect: media.map(({id}) => ({ id })),
    },
  };

  return Object.freeze(data);
};
