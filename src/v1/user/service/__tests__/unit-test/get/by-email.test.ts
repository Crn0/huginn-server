import { describe, it, expect, vi, afterEach } from "vitest";

import { NotFoundError } from "@/lib/errors/notfound-error.js";
import * as userRepository from "@/v1/user/repository/user.js";
import { getUserByEmail } from "v1/user/service/user-service.js";

vi.mock(
  import("@/v1/user/repository/user.js"),
  async () => import("../__mocks__/user-repository.js")
);

const mockedRepo = vi.mocked(userRepository);

afterEach(() => {
  vi.clearAllMocks();
});

describe("getUserByEmail", () => {
  it("should return a user when found by email", async () => {
    const user = await getUserByEmail("example@gmail.com");

    expect(user).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });

  it("should return null when 'shouldThrow' is set to false", async () => {
    mockedRepo.getUserByEmail.mockResolvedValueOnce(null);

    const user = await getUserByEmail("example@gmail.com", { shouldThrow: false });

    expect(user).toBeNull();
  });

  it("should throw NotFoundError when no user exists for the given email", async () => {
    mockedRepo.getUserByEmail.mockResolvedValueOnce(null);

    await expect(getUserByEmail("nobody@gmail.com")).rejects.toBeInstanceOf(NotFoundError);
  });
});
