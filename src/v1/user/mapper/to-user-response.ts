import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileMedia } from "./transform-profile-media.js";
import { userSchema } from "@/v1/lib/user-schema.js";

import type { getUserById } from "../repository/user.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

export const toUserResponse = (user: Awaited<ReturnType<typeof getUserById>>) => {
  if (!user) {
    throw new NotFoundError("User not found,");
  }

  const profile = {
    ...user.profile,
    avatar: transformProfileMedia(user.profile?.avatar ?? null),
    banner: transformProfileMedia(user.profile?.banner ?? null),
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
