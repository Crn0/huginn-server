import { describe, expect, it, vi, afterEach } from "vitest";

import * as userRepository from "@/v1/user/repository/user.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";

vi.mock(
  import("@/v1/user/repository/user.js"),
  async () => import("../__mocks__/user-repository.js")
);

const mockedRepo = vi.mocked(userRepository);

afterEach(() => {
  vi.resetAllMocks();
});

describe("createUser", () => {
  const DTO = {
    email: "john.doet@gmail.com",
    displayName: "john.doe",
    password: "12345",
    birthday: new Date("1999-04-25"),
  };

  it("should create a user and return id and username", async () => {
    const user = await createUser(DTO);

    expect(user).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });

  it("should throw ConflictError if email is already taken", async () => {
    mockedRepo.isEmailAvailable.mockResolvedValueOnce(false);

    await expect(createUser(DTO)).rejects.toBeInstanceOf(ConflictError);
  });
});
