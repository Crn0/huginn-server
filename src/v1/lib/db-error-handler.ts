import { Prisma } from "@/generated/prisma/index.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { USERNAME_CONFLICT } from "../constants/error-codes.js";

const prismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === "P2002") {
    return new ConflictError("Unique constraint violation", {
      path: ["username"],
      code: USERNAME_CONFLICT,
      message: "Username has already been taken.",
    });
  }

  if (error.code === "P2025") {
    return new NotFoundError("User not found.");
  }

  return error;
};

export const dbErrorHandler = <T extends Error>(error: T) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
  return  prismaError(error);
  }

  return error;
};
