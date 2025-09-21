import path from "path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { env } from "@/configs/env.js";
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

    await deleteFolder(mediaFolder);
  };
});

describe("POST /api/v1/tweets", () => {
  const url = "/api/v1/tweets" as const;

  const form = {
    content: "test tweet",
    medias: [
      path.join(import.meta.dirname, "..", "..", "..", "..", "assets", "test_avatar.png"),
    ],
  } as const;

  const invalidForm = {
    content: Array.from({ length: 100 }, () => "test tweets").join(" "),
  } as const;

  describe("Success cases", () => {
    it("returns an id and content", async () => {
      const res = await userRequest
        .post(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .field("content", form.content)
        .attach("medias", form.medias[0]);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: expect.any(String),
        content: expect.any(String),
      });
    });
  });

  describe("Failure cases", () => {
    describe("Validation errors", () => {
      it("returns a validation error when content is invalid", async () => {
        const res = await userRequest
          .post(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidForm);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "too_big",
              maximum: 1000,
              inclusive: true,
              path: ["content"],
              message: "Content must contain at most 1000 characters.",
            },
          ],
        });
      });
    });
  });
});
