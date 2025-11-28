import z from "zod";

import { SUPPORTED_FILE_TYPES } from "@/v1/tweet/constants/index.js";
import { paginationSchema, paginationQuerySchema } from "@/v1/lib/pagination-schema.js";

export const tweetWhereFilter = ["all", "following"] as const;

export const userTweetQueryParams = ["posts", "replies", "likes"] as const;

export const MAX_CONTENT_FILTER_LENGTH = 1024 as const;

export type TweetId = z.infer<typeof tweetIdSchema>;

export type TweetFilter = z.infer<typeof tweetQueryFilterSchema>;

export type UserTweetFilter = z.infer<typeof userTweetQueryFilterSchema>;

export type TweetVideoVariant = z.infer<typeof tweetVideoVariantSchema>;

export type TweetImageVariant = z.infer<typeof tweetImageVariantSchema>;

export type TweetVideo = z.infer<typeof tweetVideoSchema>;

export type tweetImage = z.infer<typeof tweetImageSchema>;

export type TweetAuthor = z.infer<typeof authorSchema>;

export type Tweet = z.infer<typeof tweetSchema>;

export type Tweets = Tweet[];

export type TweetPagination = z.infer<typeof tweetsPaginationSchema>;

export type ReplyPagination = z.infer<typeof repliesPaginationSchema>;

export type TweetQuery = z.infer<typeof tweetQuerySchema>;

export type UserTweetQuery = z.infer<typeof userTweetQuerySchema>;

export const TWEET_IMAGE_FORMAT_TYPES = SUPPORTED_FILE_TYPES.filter(
  (fileType) => fileType !== "video/mp4"
);

export const tweetIdSchema = z.object({
  tweetId: z.uuidv7({ error: "Invalid tweet ID" }),
});

export const tweetQueryFilterSchema = z.object({
  search: z.string({ error: "Invalid query" }).max(MAX_CONTENT_FILTER_LENGTH).optional(),
  scope: z.enum(tweetWhereFilter).optional(),
});

export const userTweetQueryFilterSchema = z.object({
  scope: z.enum(userTweetQueryParams).optional().default("posts"),
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
  followed: z.boolean().default(false),
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
  id: z.uuidv7({ error: "Invalid ID" }),
  url: z.url(),
  type: z.literal("VIDEO"),
  height: z.coerce.number(),
  width: z.coerce.number(),
  variants: z.array(tweetVideoVariantSchema),
  tweet: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
  createdAt: z.date().transform((d) => d.toISOString()),
});

export const tweetImageSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  url: z.url(),
  type: z.enum(["IMAGE", "GIF"]),
  variants: z.array(tweetImageVariantSchema),
  tweet: z.object({ id: z.uuidv7({ error: "Invalid ID" }) }).nullable(),
  createdAt: z.date().transform((d) => d.toISOString()),
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
  liked: z.boolean().default(false),
  _count: z.object({ replies: z.coerce.number(), likes: z.coerce.number() }),
});

export const tweetsSchema = z.array(tweetSchema);

export const replySchema = tweetSchema.extend({
  replies: z.array(
    z.object({
      id: z.uuidv7({ error: "Invalid ID" }),
      content: z.string().nullable(),
      author: authorSchema,
      media: z.array(tweetMedia),
      replyTo: z.object({
        id: z.uuidv7({ error: "Invalid ID" }),
      }),
      createdAt: z.coerce.date().transform((d) => d.toISOString()),
      updatedAt: z.coerce
        .date()
        .transform((d) => d.toISOString())
        .nullable(),
      liked: z.boolean().default(false),
      _count: z.object({ replies: z.coerce.number(), likes: z.coerce.number() }),
    })
  ),
});

export const repliesSchema = z.array(replySchema);

export const tweetsPaginationSchema = paginationSchema.extend({ data: tweetsSchema });

export const repliesPaginationSchema = paginationSchema.extend({ data: repliesSchema });

export const tweetMediaPaginationSchema = paginationSchema.extend({ data: z.array(tweetMedia) });

export const tweetQuerySchema = z.intersection(paginationQuerySchema, tweetQueryFilterSchema);

export const userTweetQuerySchema = z.intersection(
  paginationQuerySchema,
  userTweetQueryFilterSchema
);
