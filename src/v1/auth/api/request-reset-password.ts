import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getUserByEmail } from "@/v1/user/repository/user.js";
import { sendMailPasswordReset } from "../mailer/mailer.js";
import { generateActionToken } from "@/v1/lib/jwt.js";

import type { Request, Response } from "express";

const ACCESS_TOKEN_EXP = 120 as const;

export const requestResetPassword = async (req: Request, res: Response) => {
  const email = req.body.email as string;

  const { data: user } = await tryCatch(getUserByEmail(email));

  if (user) {
    const token = generateActionToken(user.id, { username: user.username }, ACCESS_TOKEN_EXP);

    sendMailPasswordReset(user, token);
  }

  return res.sendStatus(NO_CONTENT);
};
