import z from "zod";

import { MAX_CONTENT_LENGTH } from "../constants/index.js";

import type { TweetMedia } from "../types/tweet.types.js";

export type ReplyTweetDTO = z.infer<typeof replyTweetSchema> & {
  replyTo: string;
  authorId: string;
  medias: TweetMedia[];
};

export const replyTweetSchema = z.object({
  content: z
    .string()
    .trim()
    .max(MAX_CONTENT_LENGTH, {
      error: `Content must contain at most ${MAX_CONTENT_LENGTH} characters.`,
    }),
});
