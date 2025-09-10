import { ApiError } from "./api-error.js";
import { AuthenticationError } from "./auth-error.js";
import { BadRequestError } from "./bad-request-error.js";
import { ConflictError } from "./conflict-error.js";
import { ForbiddenError } from "./forbidden-error.js";
import { InternalServerError } from "./internal-server-error.js";
import { NotFoundError } from "./notfound-error.js";
import { ValidationError } from "./validation-error.js";

import type { Request, Response, NextFunction } from "express";

type AppError =
  | ApiError
  | AuthenticationError
  | BadRequestError
  | ConflictError
  | ForbiddenError
  | InternalServerError
  | NotFoundError
  | ValidationError;

const formatError = <T extends { code: string; message: string }>(error: T) => ({
  code: error.code,
  message: error.message,
});

export const routeErrorHandler = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  switch (error.kind) {
    case "AUTHENTICATION_ERROR":
    case "BAD_REQUEST_ERROR":
    case "FORBIDDEN_ERROR":
    case "INTERNAL_SERVER_ERROR":
    case "NOT_FOUND_ERROR": {
      res.status(error.status).json(formatError(error));
      break;
    }

    case "CONFLICT_ERROR": {
      res.status(error.status).json({
        ...formatError(error),
        field: error.field,
      });
      break;
    }

    case "VALIDATION_ERROR": {
      res.status(error.status).json({ ...formatError(error), issues: error.issues });
      break;
    }

    default: {
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
      });
    }
  }
};
