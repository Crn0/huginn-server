import z from "zod";

import { profileMediaSchema } from "@/v1/lib/user-schema.js";
import { SUPPORTED_FILE_TYPES } from "@/v1/tweet/constants/index.js";
import { paginationSchema } from "@/v1/lib/pagination-schema.js";

export type TweetVideoVariant = z.infer<typeof tweetVideoVariantSchema>;

export type TweetImageVariant = z.infer<typeof tweetImageVariantSchema>;

export type TweetVideo = z.infer<typeof tweetVideoSchema>;

export type tweetImage = z.infer<typeof tweetImageSchema>;

export type TweetAuthor = z.infer<typeof authorSchema>;

export type UserTweet = z.infer<typeof userTweetSchema>;

export type UserTweets = UserTweet[];

export type UserTweetPagination = z.infer<typeof userTweetsPaginationSchema>;

export const TWEET_IMAGE_FORMAT_TYPES = SUPPORTED_FILE_TYPES.filter(
  (fileType) => fileType !== "video/mp4"
);

export const tweetMediaType = z.enum(["IMAGE", "GIF", "VIDEO"]);

export const tweetImageFormats = z.enum(TWEET_IMAGE_FORMAT_TYPES);

export const authorSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string(),
    avatar: profileMediaSchema.nullable(),
    banner: profileMediaSchema.nullable(),
  }),
});

export const tweetVideoVariantSchema = z.object({
  bitRate: z.coerce.number(),
  contentType: z.literal("video/mp4"),
  url: z.url(),
});

export const tweetImageVariantSchema = z.object({
  height: z.coerce.number(),
  width: z.coerce.number(),
  contentType: tweetImageFormats,
  url: z.url(),
});

export const tweetVideoSchema = z.object({
  previewUrl: z.url(),
  type: z.literal("VIDEO"),
  height: z.coerce.number(),
  width: z.coerce.number(),
  variants: z.array(tweetVideoVariantSchema),
  tweet: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
});

export const tweetImageSchema = z.object({
  url: z.url(),
  type: z.enum(["IMAGE", "GIF"]),
  variants: z.array(tweetImageVariantSchema),
  tweet: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
});

export const tweetMedia = z.discriminatedUnion("type", [tweetVideoSchema, tweetImageSchema]);

export const userTweetSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  content: z.string().nullable(),
  author: authorSchema,
  media: z.array(tweetMedia),
  replyTo: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
  replies: z.array(z.object({ id: z.uuidv7({ error: "Invalid ID" }) })),
  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  updatedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
  deletedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
});

export const userTweetsSchema = z.array(userTweetSchema);

export const userTweetsPaginationSchema = paginationSchema.extend({ tweets: userTweetsSchema });
