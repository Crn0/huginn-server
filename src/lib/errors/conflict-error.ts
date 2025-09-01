import type z from "zod";
import { CustomError, type CustomErrorOptions } from "./custom-error.js";

export type ConflictErrorOptions = Omit<CustomErrorOptions, "status" | "code">;

export class ConflictError extends CustomError<"CONFLICT_ERROR"> {
  readonly kind: "CONFLICT_ERROR" = "CONFLICT_ERROR" as const;
  private _field: z.core.$ZodIssue;

  constructor(
    message: string,
    field: z.core.$ZodIssue,
    ops?: ConflictErrorOptions
  ) {
    super(message, {
      ...ops,
      code: "CONFLICT_ERROR",
      status: 409,
      isOperational:
        typeof ops?.isOperational === "boolean" ? ops.isOperational : true,
    });

    this._field = field;
  }

  get field() {
    return this._field;
  }
}
