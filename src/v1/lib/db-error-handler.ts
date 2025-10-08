import { Prisma } from "@/generated/prisma/index.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { BadRequestError } from "@/lib/errors/bad-request-error.js";

const prismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === "P2023") {
    return new BadRequestError("Invalid cursor");
  }

  if (error.code === "P2025") {
    const model = error?.meta?.['modelName']

    return model === "User" ? new NotFoundError("User not found.") : error
  }

  return error;
};

export const dbErrorHandler = <T extends Error>(error: T) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaError(error);
  }

  return error;
};
