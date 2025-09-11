import { OK } from "@/v1/constants/http-status.js";
import { patchUsernameById } from "../service/user-service.js";

import type { Request, Response } from "express";

export const patchUsername = async (req: Request, res: Response) => {
  const updatedUser = await patchUsernameById(req.user!.id, req.body.username);

  return res.status(OK).json({
    id: updatedUser.id,
    username: updatedUser.username,
  });
};
