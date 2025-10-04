import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

import type { AuthUser } from "@/v1/types/user.types.js";

export type TweetPolicy = typeof tweetPolicy

export const tweetPolicy = {
  patch: (user: AuthUser, tweet: { author: { id: string } } | null) => {
    if (tweet === null) {
      throw new NotFoundError("Tweet not found.")
    }

    if (user.id !== tweet.author.id) {
      throw new ForbiddenError("Must be author to patch tweet.")
    }
  },
  delete: (user: AuthUser, tweet: { author: { id: string } } | null) => {
    if (tweet === null) {
      throw new NotFoundError("Tweet not found.")
    }

    if (user.id !== tweet.author.id) {
      throw new ForbiddenError("Must be author to delete tweet.")
    }
  },
} as const;
