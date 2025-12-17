import path from "path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { generateEmail } from "@/v1/lib/generate-email.js";
import { generateDisplayName } from "@/v1/lib/generate-display-name.js";
import { generateId } from "@/v1/lib/generate-id.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { createMedia } from "@/v1/media/repository/media.js";
import { createTweet, deleteTweetById } from "@/v1/tweet/repository/tweet.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let username: string;
let nextCursor: string;
let prevCursor: string;

const userRequest = request(app);

beforeAll(async () => {
  const form = {
    email: generateEmail().toLowerCase(),
    displayName: generateDisplayName("username", "get.data"),
    password: "Crnocrno123",
    birthday: new Date(),
  } as const;

  const user = await createUser(form);

  const login = await userRequest.post("/api/v1/auth/login").send(form);

  const filePath = path.join(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "..",
    "assets",
    "test_avatar.png"
  );

  const mediaFiles = Array.from({ length: 40 }).map(
    () =>
      ({
        filePath,
        url: "http://example.com",
        type: "IMAGE",
        bytes: 20_000,
      }) as const
  );

  const media = await createMedia(mediaFiles, { uploaderId: user.id });

  const tweet = await createTweet({
    media,
    content: "test get media",
    authorId: user.id,
  });

  accessToken = login.body.token;

  username = user!.username;

  return async () => {
    await deleteTweetById(tweet.id);
    await deleteUserById(user.id);
  };
});

describe("GET /api/v1/users/me/media", () => {
  const baseUrl = "/api/v1/users" as const;

  describe("Success cases", () => {
    it("returns a list of media, total and the next and previous href", async () => {
      const url = `${baseUrl}/${username}/media` as const;

      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.data.length).toBe(20);

      nextCursor = res.body.nextCursor;
    });

    it("paginates results using 'after' cursor query param", async () => {
      const url = `${baseUrl}/${username}/media` as const;

      const res = await userRequest
        .get(`${url}?after=${nextCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: null,
        prevHref: expect.any(String),
        nextCursor: null,
        prevCursor: expect.any(String),
        total: expect.any(Number),
      });
      expect(res.body.data.length).toBe(20);

      prevCursor = res.body.prevCursor;
    });

    it("paginates results using 'before' cursor query param", async () => {
      const url = `${baseUrl}/${username}/media` as const;

      const res = await userRequest
        .get(`${url}?before=${prevCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.data.length).toBe(20);
    });

    it("returns empty media and null pagination fields for an invalid 'after' cursor", async () => {
      const url = `${baseUrl}/${username}/media` as const;

      const res = await userRequest
        .get(`${url}?after=${generateId()}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: null,
        prevHref: null,
        nextCursor: null,
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.data.length).toBe(0);
    });

    it("returns empty media and null pagination fields for an invalid 'before' cursor", async () => {
      const url = `${baseUrl}/${username}/media` as const;

      const res = await userRequest
        .get(`${url}?before=${generateId()}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: null,
        prevHref: null,
        nextCursor: null,
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.data.length).toBe(0);
    });
  });

  describe("Failure cases", () => {
    describe("Validation  errors", () => {
      it("returns a Validation error when the query param 'after' is invalid", async () => {
        const url = `${baseUrl}/${username}/media` as const;

        const res = await userRequest
          .get(`${url}?after=invalid-id`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "invalid_format",
              format: "uuid",
              pattern:
                "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
              path: ["after"],
              message: "Invalid cursor",
            },
          ],
        });
      });

      it("returns a Validation error when the query param 'before' is invalid", async () => {
        const url = `${baseUrl}/${username}/media` as const;

        const res = await userRequest
          .get(`${url}?before=invalid-id`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "invalid_format",
              format: "uuid",
              pattern:
                "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
              path: ["before"],
              message: "Invalid cursor",
            },
          ],
        });
      });
    });
  });
});
