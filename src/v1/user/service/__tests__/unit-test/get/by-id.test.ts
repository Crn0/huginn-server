import { describe, it, expect, vi, afterEach } from "vitest";

import { NotFoundError } from "@/lib/errors/notfound-error.js";
import * as userRepository from "@/v1/user/repository/user.js";
import { generateId } from "@/v1/lib/generate-id.js";
import { getUserById } from "v1/user/service/user-service.js";

vi.mock(import("@/v1/user/repository/user.js"), async () => import("../__mocks__/user-repository.js"));

const mockedRepo = vi.mocked(userRepository )

afterEach(() => {
  vi.clearAllMocks();
});

describe("getUserById", () => {
  it("should return a user when found by email", async () => {
    const user = await getUserById(generateId());

    expect(user).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });

  it("should throw NotFoundError when no user exists for the given email", async () => {
    mockedRepo.getUserById.mockResolvedValueOnce(null);

    await expect(getUserById(generateId())).rejects.toBeInstanceOf(NotFoundError);
  });
});
