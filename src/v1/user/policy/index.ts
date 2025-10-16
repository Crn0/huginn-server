import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { isDemoUser } from "./utils.js";

import type { UserById } from "../service/user-service.js";

export const userPolicy = {
  delete: (user: UserById) => {
    if (isDemoUser(user)) {
      throw new ForbiddenError("Demo user cannot delete their account");
    }
  },
};
