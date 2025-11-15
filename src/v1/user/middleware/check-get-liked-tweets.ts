import { userPolicy } from "../policy/index.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getUserById } from "../service/user-service.js";

import type { Request, Response, NextFunction } from "express";
import type { UserTweetFilter } from "@/v1/lib/tweet-schema.js";

export const checkGetLikedTweets = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;
  const username = req.params["username"] as string;

  const query: UserTweetFilter = res.locals["query"];

  if (query.scope === "likes") {
    const user = await getUserById(userId);

    const { error } = tryCatch(() => userPolicy.tweet.getLikes(user, { username }));

    if (error) throw error;
  }

  return next();
};
