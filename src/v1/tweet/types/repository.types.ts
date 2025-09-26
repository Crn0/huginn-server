import type { Prisma } from "@/generated/prisma/index.js";

export type TweetMediaType = "VIDEO" | "GIF" | "IMAGE";

export type TweetPaginationOption = Pick<
  Prisma.TweetFindManyArgs,
  "cursor" | "orderBy" | "skip" | "take"
>;

export type GetTweetsOption = Prisma.TweetFindManyArgs;

export interface TweetMedia {
  type: TweetMediaType;
  filePath: string;
  url: string;
  bytes: number;
}

export interface CreateTweet {
  authorId: string;
  content: string | null;
  media: { id: string }[];
}

export interface ReplyTweet extends CreateTweet {
  replyTo: string;
}

export interface PatchTweet {
  content: string;
}
