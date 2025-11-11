import z from "zod";

import { SUPPORTED_FILE_TYPES } from "@/v1/tweet/constants/index.js";
import { paginationSchema, paginationQuerySchema } from "@/v1/lib/pagination-schema.js";

export const tweetWhereFilter = ["following"] as const;

export const MAX_CONTENT_FILTER_LENGTH = 1024 as const;

export type TweetId = z.infer<typeof tweetIdSchema>;

export type TweetFilter = z.infer<typeof tweetQueryFilterSchema>;

export type TweetVideoVariant = z.infer<typeof tweetVideoVariantSchema>;

export type TweetImageVariant = z.infer<typeof tweetImageVariantSchema>;

export type TweetVideo = z.infer<typeof tweetVideoSchema>;

export type tweetImage = z.infer<typeof tweetImageSchema>;

export type TweetAuthor = z.infer<typeof authorSchema>;

export type Tweet = z.infer<typeof tweetSchema>;

export type Tweets = Tweet[];

export type TweetPagination = z.infer<typeof tweetsPaginationSchema>;

export type TweetQuery = z.infer<typeof tweetQuerySchema>;

export const TWEET_IMAGE_FORMAT_TYPES = SUPPORTED_FILE_TYPES.filter(
  (fileType) => fileType !== "video/mp4"
);

export const tweetIdSchema = z.object({
  tweetId: z.uuidv7({ error: "Invalid tweet ID" }),
});

export const tweetQueryFilterSchema = z.object({
  s: z.string({ error: "Invalid query" }).max(MAX_CONTENT_FILTER_LENGTH).optional(),
  w: z.enum(tweetWhereFilter).optional(),
});

export const tweetMediaType = z.enum(["IMAGE", "GIF", "VIDEO"]);

export const tweetImageFormats = z.enum(TWEET_IMAGE_FORMAT_TYPES);

export const authorSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string(),
    avatarUrl: z.url().nullable(),
    bannerUrl: z.url().nullable(),
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
  url: z.url(),
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

export const tweetSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  content: z.string().nullable(),
  author: authorSchema,
  media: z.array(tweetMedia),
  replyTo: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  updatedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
  _count: z.object({ replies: z.coerce.number(), likes: z.coerce.number() }),
});

export const tweetReply = tweetSchema.extend({ replyTo: tweetSchema });

export const tweetsSchema = z.array(tweetSchema);

export const tweetRepliesSchema = z.array(tweetReply);

export const tweetsPaginationSchema = paginationSchema.extend({ data: tweetsSchema });

export const tweetRepliesPaginationSchema = paginationSchema.extend({ data: tweetRepliesSchema });

export const tweetMediaPaginationSchema = paginationSchema.extend({ media: z.array(tweetMedia) });

export const tweetQuerySchema = z.intersection(paginationQuerySchema, tweetQueryFilterSchema);
