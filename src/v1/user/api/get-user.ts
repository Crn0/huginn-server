import { OK } from "@/v1/constants/http-status.js";
import { getUserById } from "../service/user-service.js";
import { toUserResponse } from "../mapper/to-user-response.js";

import type { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params["userId"] as string;

  const user = await getUserById(userId);

  return res.status(OK).json({ ...toUserResponse(user) });
};
