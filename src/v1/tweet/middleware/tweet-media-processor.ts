import path from "node:path";

import { ValidationError } from "@/lib/errors/validation-error.js";
import { BadRequestError } from "@/lib/errors/bad-request-error.js";
import { MAX_FILE_SIZE, MAX_MEDIA } from "../constants/index.js";
import { initMulter } from "@/v1/lib/multer.js";

import type { Request, Response, NextFunction } from "express";

const tempPath = path.join(import.meta.dirname, "..", "..", "..", "temp");

const multer = initMulter({
  path: tempPath,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileType: "png|jpg|jpeg|gif|webp",
});

export const tweetMediaProcessor = (req: Request, res: Response, next: NextFunction) =>
  multer.uploader.array("media", MAX_MEDIAS)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      const code = err.code;
      const field = err.field as string;

      if (code === "LIMIT_FILE_COUNT") {
        return next(
          new ValidationError("Validation failed: 1 errors detected in body", [
            {
              code: "custom",
              message: "No more than 1 file are allowed.",
              path: [field],
            },
          ])
        );
      }

      if (code === "LIMIT_UNEXPECTED_FILE") {
        return next(new BadRequestError(`Invalid field: ${field}`));
      }

      if (code === "LIMIT_FILE_SIZE") {
        next(
          new ValidationError("Validation failed: 1 errors detected in body", [
            {
              code: "too_big",
              origin: "file",
              maximum: MAX_FILE_SIZE,
              message: "Max file size is 10MB.",
              path: [field],
            },
          ])
        );
      }

      return next(err);
    }

    if (err) {
      return next(err);
    }

    return next();
  });
