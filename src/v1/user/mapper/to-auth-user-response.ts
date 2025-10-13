import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileMedia } from "./transform-profile-media.js";
import { authUserSchema } from "@/v1/lib/user-schema.js";

import type { getAuthUser } from "../service/user-service.js";

export const toAuthUserResponse = (user: Awaited<ReturnType<typeof getAuthUser>>) => {
  const profile = {
    ...user.profile,
    avatar: transformProfileMedia(user.profile?.avatar ?? null),
    banner: transformProfileMedia(user.profile?.banner ?? null),
  };

  const parsedUser = authUserSchema.safeParse({
    ...user,
    profile,
  });

  if (!parsedUser.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUser.data;
};
