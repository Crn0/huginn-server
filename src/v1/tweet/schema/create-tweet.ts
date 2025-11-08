import z from "zod";

import { MAX_CONTENT_LENGTH } from "../constants/index.js";

import type { TweetMedia } from "../types/tweet.types.js";

export type CreateTweetDTO = z.infer<typeof createTweetSchema> & {
  authorId: string;
  media: TweetMedia[];
};

export const createTweetSchema = z.object({
  content: z
    .string()
    .trim()
    .max(MAX_CONTENT_LENGTH, {
      error: `Content must contain at most ${MAX_CONTENT_LENGTH} characters.`,
    })
    .nullish()
    .default(null),
});
