import { OK } from "@/v1/constants/http-status.js";
import { getUserByUsername } from "../service/user-service.js";
import { toUserResponse } from "../mapper/to-user-response.js";

import type { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const username = req.params["username"] as string;

  const user = await getUserByUsername(username);

  return res.status(OK).json({ ...toUserResponse(user) });
};
