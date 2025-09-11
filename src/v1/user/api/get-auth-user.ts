import { OK } from "@/v1/constants/http-status.js";
import { getUserById } from "../service/user-service.js";
import { toUserResponse } from "../mapper/to-user-response.js";

import type { Request, Response } from "express";

export const getAuthUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.user!.id);

  return res.status(OK).json({ ...toUserResponse(user) });
};
