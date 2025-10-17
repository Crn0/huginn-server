import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { deleteOIDCAccount as del } from "../oidc-account/service/oidc-account.js";

import type { Request, Response } from "express";

const debug = createDebug("middleware:deleteOIDCAccount");

export const deleteOIDCAccount = (provider: "google") => async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const { error, data } = await tryCatch(del(userId, provider));

  if (error) throw error;

  debug("deleted oidcAccount:", data);

  return res.sendStatus(NO_CONTENT);
};
