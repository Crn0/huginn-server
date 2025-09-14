import fs from "fs/promises";

import { createDebug } from "@/v1/lib/debug.js";
import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { OK } from "@/v1/constants/http-status.js";
import { patchUserProfileById } from "../service/user-service.js";

import type { Request, Response } from "express";
import type { PatchUserProfileDTO } from "../schema/patch-user-profile.js";

const debug = createDebug("middleware:patchUserProfile");

export const patchUserProfile = async (req: Request, res: Response) => {
  const reqFiles = req.files;

  if (Array.isArray(reqFiles)) {
    debug("reqFiles is type of Array", reqFiles);

    throw new InternalServerError("Something went wrong. Try again later.");
  }

  const files = reqFiles ?? {};

  const DTO: PatchUserProfileDTO = {
    ...req.body,
    avatar: files["avatar"]?.[0] ?? null,
    banner: files["banner"]?.[0] ?? null,
  };

  const { error, data: updatedUser } = await tryCatch(patchUserProfileById(req.user!.id, DTO));

  const tempFiles = [DTO.avatar, DTO.banner].filter(Boolean);

  if (tempFiles.length) {
    await Promise.all(tempFiles.map(async (file) => fs.unlink(file.path)));
  }

  if (error) throw error;

  return res.status(OK).json({
    id: updatedUser?.id,
    username: updatedUser?.username,
  });
};
