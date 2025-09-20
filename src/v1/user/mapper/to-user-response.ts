import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileMedia } from "./transform-profile-media.js";
import { userSchema } from "@/v1/lib/user-schema.js";

import type { GetUserBy } from "../types/user.types.js";

export const toUserResponse = (user: GetUserBy) => {
  const profile = {
    ...user.profile,
    avatar: transformProfileMedia(user.profile?.avatar ?? null),
    banner: transformProfileMedia(user.profile?.banner ?? null),
  };

  const parsedUser = userSchema.safeParse({
    ...user,
    profile,
  });

  if (!parsedUser.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUser.data;
};
