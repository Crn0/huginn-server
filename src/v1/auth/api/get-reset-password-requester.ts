import { OK } from "@/v1/constants/http-status.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getUserById } from "@/v1/user/repository/user.js";

import type { Request, Response } from "express";

export const getRequester = async (req: Request, res: Response) => {
  const id = req.user!.id;

  const { error, data: user } = await tryCatch(getUserById(id));

  if (error) throw error;

  if (!user) throw new NotFoundError("User does not exist");

  return res.status(OK).json({
    id: user.id,
  });
};
