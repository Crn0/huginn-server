import path from "node:path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { env } from "@/configs/env.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { testDeleteUserLoginForm } from "testing/seed.js";
import { deleteFolder } from "@/v1/storage/cloudinary-service.js";
import { getUserByEmail } from "@/v1/user/service/user-service.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testDeleteUserLoginForm);

  accessToken = login.body.token;

  const testFile = path.join(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "assets",
    "test_avatar.png"
  );

  await userRequest
    .patch("/api/v1/users/me/profile")
    .set("Authorization", `Bearer ${accessToken}`)
    .attach("avatar", testFile);

  await userRequest
    .post("/api/v1/tweets")
    .set("Authorization", `Bearer ${accessToken}`)
    .field("content", "test tweet :)")
    .attach("medias", testFile);

  return async () => {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    await tryCatch(deleteFolder(mediaFolder));
  };
});

describe("DELETE /api/v1/users/me", () => {
  const url = "/api/v1/users/me" as const;

  describe("Success cases", () => {
    it("returns a status 204 (NO_CONTENT)", async () => {
      const user = await getUserByEmail(testDeleteUserLoginForm.email);

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);

      const avatarFolder = `${env.CLOUDINARY_ROOT_FOLDER}/avatars/${user?.id}`;

      await tryCatch(deleteFolder(avatarFolder));
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not found error when the user does not exist", async () => {
        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND", message: "User not found." });
      });
    });
  });
});
