import type { Prisma } from "@/generated/prisma/index.js";

type UserProfileMediaType = "GIF" | "IMAGE";

export type GetFollowersOption = Omit<
  Prisma.User$followedByArgs,
  "where" | "include" | "select" | "omit"
>;

export type GetFollowingOption = Omit<
  Prisma.User$followingArgs,
  "where" | "include" | "select" | "omit"
>;

export interface UserProfileMedia {
  id: string;
  type: UserProfileMediaType;
  filePath: string;
  url: string;
  bytes: number;
}

export interface PatchUserProfile {
  displayName?: string | undefined;
  bio?: string | undefined;
  birthday?: InstanceType<typeof Date> | undefined;
  location?: string | undefined;
  website?: string | undefined;
  avatar?: UserProfileMedia | undefined;
  banner?: UserProfileMedia | undefined;
}
