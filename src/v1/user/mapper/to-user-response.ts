import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";
import { userSchema } from "@/v1/lib/user-schema.js";

import { NotFoundError } from "@/lib/errors/notfound-error.js";
import type { UserByUsername } from "../service/user-service.js";

export const toUserResponse = (user: UserByUsername) => {
  if (!user) {
    throw new NotFoundError("User not found,");
  }

  const profile = {
    ...user.profile,
    avatarUrl: transformProfileAvatar(user.profile?.avatar ?? null),
    bannerUrl: transformProfileBanner(user.profile?.banner ?? null),
  };

  const parsedUser = userSchema.safeParse({
    ...user,
    avatarUrl: user.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ?? null,
    profile,
  });

  if (!parsedUser.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUser.data;
};
