import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getUsersPagination } from "../service/user-service.js";
import { toUsersResponse } from "../mapper/to-users-response.js";

import type { Request, Response } from "express";
import type { UserQuery } from "@/v1/lib/user-schema.js";

export const getUsers = async (req: Request, res: Response) => {
  const query: UserQuery = res.locals["query"];

  const filter = {
    by: query.by,
  } as const;

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const { error, data: pagination } = await tryCatch(getUsersPagination({ cursor, filter }));

  if (error) throw error;

  return res.status(OK).json({ ...toUsersResponse(pagination, req.user) });
};
