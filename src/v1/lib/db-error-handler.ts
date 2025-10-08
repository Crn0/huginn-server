import { Prisma } from "@/generated/prisma/index.js";
import { BadRequestError } from "@/lib/errors/bad-request-error.js";

import type { ErrorInstance } from "../types/errors.js";

type ErrorCode = "P2002" | "P2023" | "P2025";

export function dbErrorHandler<T extends Error>(
  error: T,
  code: ErrorCode,
  newError: ErrorInstance
): ErrorInstance;
export function dbErrorHandler<T extends Error>(error: T): T;
export function dbErrorHandler<T extends Error>(
  error: T,
  code?: ErrorCode,
  newError?: ErrorInstance
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === code) return newError;

    if (error.code === "P2023") {
      return new BadRequestError("Invalid cursor");
    }
  }

  return error;
};
