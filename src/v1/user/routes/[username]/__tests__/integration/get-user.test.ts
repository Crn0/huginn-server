import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { testUserLoginForm } from "testing/seed.js";
import { userSchema } from "@/v1/lib/user-schema.js";
import { app } from "v1/__mocks__/server.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { generateId } from "@/v1/lib/generate-id.js";

const userRequest = request.agent(app);

let accessToken: string;
let username: string;

beforeAll(async () => {
  const [login, user] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(testUserLoginForm),
    createUser({
      email: "get.username@example.com",
      displayName: "get.username",
      password: "get.username",
      birthday: new Date(),
    }),
  ]);

  accessToken = login.body.token;

  username = user.username;

  return async () => {
    await deleteUserById(user.id);
  };
});

describe("GET /api/v1/users/:username", () => {
  const baseUrl = "/api/v1/users";

  describe("Success cases", () => {
    it("returns a user object", async () => {
      const url = `${baseUrl}/${username}` as const;

      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);

      const parsedUser = userSchema.safeParse(res.body);

      expect(parsedUser.success).toBe(true);
    });
  });

  describe("Failure cases", () => {
    describe("Not_found errors", () => {
      it("returns a not_found error when the user is not found", async () => {
        const url = `${baseUrl}/${generateId()}` as const;

        const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND", message: "User not found." });
      });
    });
  });
});
