import z from "zod";

export type TweetId = z.infer<typeof tweetIdSchema>;

export const tweetIdSchema = z.object({
  tweetId: z.uuidv7({ error: "Invalid tweet ID" }),
});
