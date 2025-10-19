import path from "node:path";
import fs from "node:fs/promises";

import { ValidationError } from "@/lib/errors/validation-error.js";
import { BadRequestError } from "@/lib/errors/bad-request-error.js";
import { MAX_FILE_SIZE, MAX_MEDIA } from "../constants/index.js";
import { initMulter } from "@/v1/lib/multer.js";

import type { Request, Response, NextFunction } from "express";

const tempPath = path.join(import.meta.dirname, "..", "..", "..", "temp");

const IMAGE_ERROR_MESSAGE = "Max image size is 10MB." as const;
const VIDEO_ERROR_MESSAGE = "Max video size is 100MB." as const;

const IMAGE_SIZE = MAX_FILE_SIZE;
const VIDEO_SIZE = MAX_FILE_SIZE * 10;

const multer = initMulter({
  path: tempPath,
  fileType: "png|jpg|jpeg|gif|webp|mp4",
});

export const tweetMediaProcessor = (req: Request, res: Response, next: NextFunction) =>
  multer.uploader.array("media", MAX_MEDIA)(req, res, async (err) => {
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

export const handleTweetMedia = async (req: Request, _res: Response, next: NextFunction) => {
  const files = req.files;

  if (Array.isArray(files)) {
    await Promise.all(
      files.map(async (file, index, _files) => {
        if (file.size > IMAGE_SIZE || file.size > VIDEO_SIZE) {
          const ext = path.extname(file.originalname).toLowerCase();

          const maximum = ext === ".mp4" ? VIDEO_SIZE : IMAGE_SIZE;
          const message = ext === ".mp4" ? VIDEO_ERROR_MESSAGE : IMAGE_ERROR_MESSAGE;

          await Promise.allSettled(_files.map((f) => fs.unlink(f.path)));

          return next(
            new ValidationError("Validation failed: 1 errors detected in body", [
              {
                code: "too_big",
                origin: "file",
                maximum: maximum,
                message: message,
                path: ["media", index],
              },
            ])
          );
        }
      })
    );
  }

  return next();
};
