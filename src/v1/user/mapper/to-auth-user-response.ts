import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";
import { authUserSchema } from "@/v1/lib/user-schema.js";

import type { getAuthUser } from "../service/user-service.js";

export const toAuthUserResponse = (user: Awaited<ReturnType<typeof getAuthUser>>) => {
  const profile = {
    ...user.profile,
    avatarUrl:
      transformProfileAvatar(user.profile!.avatar) ??
      user.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ??
      null,
    bannerUrl: transformProfileBanner(user.profile!.banner),
  };

  const parsedUser = authUserSchema.safeParse({
    ...user,
    profile,
    openIds: user.openIds.map(({ provider }) => ({ name: provider.name })) ?? [],
    avatarUrl: user.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ?? null,
  });

  if (!parsedUser.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUser.data;
};
