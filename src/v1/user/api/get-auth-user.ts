import { OK } from "@/v1/constants/http-status.js";
import { getAuthUser as authUser } from "../service/user-service.js";
import { toAuthUserResponse } from "../mapper/to-auth-user-response.js";

import type { Request, Response } from "express";

export const getAuthUser = async (req: Request, res: Response) => {
  const user = await authUser(req.user!.id);

  return res.status(OK).json({ ...toAuthUserResponse(user) });
};
