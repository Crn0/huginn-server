import { ForbiddenError } from "@/lib/errors/forbidden-error.js";

import type { UserById } from "../../service/user-service.js";

export const oidcPolicy = {
  delete: (user: UserById) => {
    if (!user.password && user.openIds.length === 1) {
      throw new ForbiddenError(
        "You must set a password before unlinking your only auth provider."
      );
    }
  },
} as const;
