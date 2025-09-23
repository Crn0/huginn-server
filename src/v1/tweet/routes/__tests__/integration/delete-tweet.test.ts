import path from "path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { env } from "@/configs/env.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { generateId } from "@/v1/lib/generate-id.js";
import { testUserLoginForm } from "testing/seed.js";
import { deleteFolder } from "@/v1/storage/cloudinary-service.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

  accessToken = login.body.token;

  return async () => {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    await tryCatch(deleteFolder(mediaFolder));
  };
});

describe("DELETE /api/v1/tweets", () => {
  const baseUrl = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    const form = {
      content: "test tweet",
      medias: [path.join(import.meta.dirname, "..", "..", "..", "..", "assets", "test_avatar.png")],
    } as const;

    it("returns status 204", async () => {
      const createdTweet = await userRequest
        .post(baseUrl)
        .set("Authorization", `Bearer ${accessToken}`)
        .field("content", form.content)
        .attach("medias", form.medias[0]);

      const tweetId = createdTweet.body.id;

      const url = `${baseUrl}/${tweetId}`;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns not_found error when the tweet does not exist", async () => {
        const url = `${baseUrl}/${generateId()}`;

        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
      });
    });

    describe("Validation errors", () => {
      it("returns a validation error when tweetId is invalid", async () => {
        const url = `${baseUrl}/invalid-tweet-id`;

        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              code: "invalid_format",
              path: ["tweetId"],
              message: "Invalid tweet ID",
            },
          ],
        });
      });
    });
  });
});
