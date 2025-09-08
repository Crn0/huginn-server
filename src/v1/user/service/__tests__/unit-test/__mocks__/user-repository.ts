import { vi } from "vitest";
import { generateEmail } from "@/v1/lib/generate-email.js";
import { generateId } from "@/v1/lib/generate-id.js";

import type { CreateUser } from "@/v1/user/types/user.types.js";

type GetUserReturnType = Promise<ReturnType<typeof generateUser> | null>;

const generateUser = (email?: string) => ({
  email: email ?? generateEmail(),
  primaryKey: 1,
  id: generateId(),
  username: "john.doe",
  password: null,
  accountLevel: "USER" as const,
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
  profile: null,
  openIds: [],
});

export const createUser = vi.fn(async (data: CreateUser) => ({
  id: generateId(),
  username: data.username,
}));

export const getUserByEmail = vi.fn(
  async (email: string): GetUserReturnType => generateUser(email)
);
export const getUserById = vi.fn(async (_id: string): GetUserReturnType => generateUser());

export const isEmailAvailable = vi.fn(async (_email: string) => true);

export const isUsernameAvailable = vi.fn(async (_username: string) => true);
