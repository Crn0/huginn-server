import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";
import { authUserSchema } from "@/v1/lib/user-schema.js";

import type { getAuthUser } from "../service/user-service.js";

export const toAuthUserResponse = (user: Awaited<ReturnType<typeof getAuthUser>>) => {
  const profile = {
    ...user.profile,
    avatarUrl: transformProfileAvatar(user.profile!.avatar),
    bannerUrl: transformProfileBanner(user.profile!.banner),
  };

  const parsedUser = authUserSchema.safeParse({
    ...user,
    profile,
    avatarUrl: user.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ?? null,
  });

  if (!parsedUser.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUser.data;
};
