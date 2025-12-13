import { OK } from "@/v1/constants/http-status.js";
import { getUserNotificationsPagination } from "@/v1/notification/service/index.js";
import { toUserNotificationsResponse } from "../mapper/to-user-notifications-response.js";

import type { Request, Response } from "express";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getNotifications = async (req: Request, res: Response) => {
  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getUserNotificationsPagination(req.user!.id, { cursor });

  return res.status(OK).json({ ...toUserNotificationsResponse(pagination, { id: req.user!.id }) });
};
