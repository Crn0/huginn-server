import { OK } from "@/v1/constants/http-status.js";
import { getTweetsByAuthorIdPagination } from "@/v1/tweet/service/tweet.js";
import { toUserTweetsResponse } from "../mapper/to-user-tweets-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getUserTweets =
  (endpoint: "me" | "userId") =>
  async (req: RequestWithPagination<{ userId: string }>, res: Response) => {
    const userId = (endpoint === "me" ? req.user?.id : req.params["userId"]) as string;

    const query: PaginationQuery = res.locals["query"];

    const cursor = {
      before: query.before,
      after: query.after,
    } as const;

    const pagination = await getTweetsByAuthorIdPagination(userId, cursor);

    return res.status(OK).json({ ...toUserTweetsResponse(pagination) });
  };
