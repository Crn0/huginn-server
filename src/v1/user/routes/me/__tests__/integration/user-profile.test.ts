import path from "node:path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { env } from "@/configs/env.js";
import { testUserLoginForm } from "testing/seed.js";
import { deleteFolder } from "@/v1/storage/cloudinary-service.js";
import { app } from "v1/__mocks__/server.js";
import { getUserByEmail } from "@/v1/user/service/user-service.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

  accessToken = login.body.token;

  return async () => {
    const user = await getUserByEmail(testUserLoginForm.email);

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/avatars/${user?.id}`;

    await deleteFolder(mediaFolder);
  };
});

describe("PATCH /api/v1/users/me/profile", () => {
  const url = "/api/v1/users/me/profile" as const;

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

  const form = {
    displayName: "krno.Krno",
    bio: "hello world",
    birthday: new Date(),
    location: "foo land",
    website: "https://example.com",
  } as const;

  const invalidForm = {
    displayName: Array.from({ length: 40 }, () => "Crno").join(""),
    bio: Array.from({ length: 101 }, () => "hello world!").join(""),
    birthday: "25-04-1999",
    location: Array.from({ length: 40 }, () => "foo land").join(""),
    website: "https//:example.com",
  } as const;

  describe("Success cases", () => {
    it("returns an id and username when user profile is updated is updated", async () => {
      const res = await userRequest
        .patch(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .field("bio", form.bio)
        .field("birthday", form.birthday.toISOString())
        .field("location", form.location)
        .field("website", form.website)
        .attach("avatar", testFile)
        .attach("banner", testFile);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: expect.any(String), username: expect.any(String) });
    });
  });

  describe("Failure cases", () => {
    describe("Validation errors", () => {
      const scenarios = [
        {
          scenario: "displayName is invalid",
          payload: { ...form, displayName: invalidForm.displayName },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                origin: "string",
                code: "too_big",
                maximum: 36,
                inclusive: true,
                path: ["displayName"],
                message: "Use no more than 36 characters for the 'display name'",
              },
            ],
          },
        },
        {
          scenario: "bio is invalid",
          payload: { ...form, bio: invalidForm.bio },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                origin: "string",
                code: "too_big",
                maximum: 160,
                inclusive: true,
                path: ["bio"],
                message: "Bio must be at most 160 characters",
              },
            ],
          },
        },
        {
          scenario: "birthday is invalid",
          payload: { ...form, birthday: invalidForm.birthday },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                code: "invalid_type",
                path: ["birthday"],
                message: "Invalid input: expected date, received Date",
              },
            ],
          },
        },
        {
          scenario: "location is invalid",
          payload: { ...form, location: invalidForm.location },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                code: "too_big",
                path: ["location"],
                message: "Location must be at most 30 characters",
              },
            ],
          },
        },
        {
          scenario: "website is invalid",
          payload: { ...form, website: invalidForm.website },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                code: "invalid_format",
                format: "url",
                path: ["website"],
                message: "Invalid URL",
              },
            ],
          },
        },
      ] as const;

      it.each(scenarios)(
        "returns a validation error when $scenario",
        async ({ payload, responseBody }) => {
          const res = await userRequest
            .patch(url)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          expect(res.status).toBe(422);
          expect(res.body).toMatchObject(responseBody);
        }
      );
    });
  });
});
