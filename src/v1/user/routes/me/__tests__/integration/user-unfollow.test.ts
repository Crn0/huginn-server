import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { testUserLoginForm } from "testing/seed.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let followUsername: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const [login, user] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(testUserLoginForm),
    createUser({
      email: "userunfllow.post@following.com",
      displayName: "user.post.following",
      password: "Crnocrno123",
      birthday: new Date(),
    }),
  ]);

  accessToken = login.body.token;

  followUsername = user.username;

  return async () => {
    await deleteUserById(user.id);
  };
});

describe("DELETE /api/v1/users/me/following/:followUsername", () => {
  const baseUrl = "/api/v1/users/me/following" as const;

  describe("Success cases", () => {
    it("returns 204 when a user successfully unfollows another user", async () => {
      const url = `${baseUrl}/${followUsername}`;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });

    it("returns 204 even if the user is not currently followed", async () => {
      const url = `${baseUrl}/${followUsername}` as const;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });
});
