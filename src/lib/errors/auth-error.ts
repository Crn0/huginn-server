import { CustomError, type CustomErrorOptions } from "./custom-error.js";

export type AuthenticationErrorOptions = Omit<
  CustomErrorOptions,
  "status" | "code" | "isOperational"
>;

export class AuthenticationError extends CustomError<"AUTHENTICATION_ERROR"> {
  readonly kind: "AUTHENTICATION_ERROR" = "AUTHENTICATION_ERROR" as const;

  constructor(message: string, ops?: AuthenticationErrorOptions) {
    super(message, {
      ...ops,
      code: "AUTHENTICATION_ERROR",
      status: 401,
      isOperational: false,
    });
  }
}
