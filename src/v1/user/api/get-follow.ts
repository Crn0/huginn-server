import { OK } from "@/v1/constants/http-status.js";
import { getFollowByUsernamePagination } from "../service/follow-service.js";
import { toFollowResponse } from "../mapper/to-follow-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { FollowUsersQueryParam } from "../schema/follow.js";

export const getUserFollows = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const username = req.params["username"] as string;

  const query: FollowUsersQueryParam = res.locals["query"];


  const pagination = await getFollowByUsernamePagination(username, query);

  return res.status(OK).json({ ...toFollowResponse(pagination, req.user!, query.scope) });
};
