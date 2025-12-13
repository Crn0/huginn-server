import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { isDemoUser } from "./utils.js";

import type { UserById } from "../service/user-service.js";
import type { AuthUser } from "@/v1/types/user.types.js";

export const userPolicy = {
  delete: (user: UserById) => {
    if (isDemoUser(user)) {
      throw new ForbiddenError("Demo user cannot delete their account");
    }
  },
  tweet: {
    getLikes: (user: AuthUser, targetUser: { username: string }) => {
      if (user.username !== targetUser.username) {
        throw new ForbiddenError("You can only view your own tweet likes.");
      }
    },
  },
  following: {
    followUser: (user: { id: string }, targetUser: { id: string }) => {
      if (user.id === targetUser.id) {
        throw new ForbiddenError("You cannot follow yourself");
      }
    },
    unFollowUser: (user: { id: string }, targetUser: { id: string }) => {
      if (user.id === targetUser.id) {
        throw new ForbiddenError("You cannot un-follow yourself");
      }
    },
  },
};
