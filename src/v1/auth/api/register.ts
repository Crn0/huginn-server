import { OK } from "@/v1/constants/http-status.js";
import { createUser } from "@/v1/user/service/user-service.js";

import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  return res.status(OK).json({
    id: user.id,
    username: user.username,
  });
};
