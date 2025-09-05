import { CustomError, type CustomErrorOptions } from "./custom-error.js";

export type StorageErrorOptions = Omit<CustomErrorOptions, "status" | "code" | "isOperational">;

export class StorageError extends CustomError<"Storage_Error"> {
  readonly kind: "Storage_Error" = "Storage_Error" as const;

  constructor(message: string, status: number, ops?: StorageErrorOptions) {
    super(message, {
      ...ops,
      status,
      code: "Storage_Error",
      isOperational: true,
    });
  }
}
