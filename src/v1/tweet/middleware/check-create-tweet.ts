import { ValidationError } from "@/lib/errors/validation-error.js";

import type { Request, Response, NextFunction } from "express";

export const checkCreateTweet = async (req: Request, _res: Response, next: NextFunction) => {
  const content: string | undefined = req.body.content;

  if (!content && !req.files?.length) {
    throw new ValidationError("Validation failed: 1 errors detected in body", [
      {
        code: "invalid_type",
        expected: "string",
        message: "Invalid input: expected string, received undefined",
        path: ["content"],
      },
    ]);
  }

  next();
};
