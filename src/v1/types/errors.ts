import type { ApiError } from "@/lib/errors/api-error.js";
import type { AuthenticationError } from "@/lib/errors/auth-error.js";
import type { BadRequestError } from "@/lib/errors/bad-request-error.js";
import type { ConflictError } from "@/lib/errors/conflict-error.js";
import type { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import type { InternalServerError } from "@/lib/errors/internal-server-error.js";
import type { NotFoundError } from "@/lib/errors/notfound-error.js";
import type { ValidationError } from "@/lib/errors/validation-error.js";

export type ErrorInstance =
  | InstanceType<typeof ApiError>
  | InstanceType<typeof AuthenticationError>
  | InstanceType<typeof ConflictError>
  | InstanceType<typeof ForbiddenError>
  | InstanceType<typeof InternalServerError>
  | InstanceType<typeof NotFoundError>
  | InstanceType<typeof ValidationError>
  | InstanceType<typeof BadRequestError>;
