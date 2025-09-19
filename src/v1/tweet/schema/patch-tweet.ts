import z from "zod";

import { MAX_CONTENT_LENGTH } from "../constants/index.js";

export type PatchTweetDTO = z.infer<typeof createTweetSchema>;

export const createTweetSchema = z.object({
  content: z
    .string()
    .trim()
    .max(MAX_CONTENT_LENGTH, {
      error: `Content must contain at most ${MAX_CONTENT_LENGTH} characters.`,
    }),
});
