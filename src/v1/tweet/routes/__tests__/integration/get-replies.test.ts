import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { generateId } from "@/v1/lib/generate-id.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { createTweet } from "@/v1/tweet/service/tweet.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import {
  deleteTweetsByAuthorId,
  replyTweet,
} from "@/v1/tweet/repository/tweet.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let parentTweetId: string;
let nextCursor: string;
let prevCursor: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const form = {
    email: "getreplies.post@getreplies.com",
    displayName: "get.data",
    password: "Crnocrno123",
    birthday: new Date(),
  } as const;

  const user = await createUser(form);
  const [login, parentTweet] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(form),
    createTweet({ content: "parent_tweet", authorId: user.id, media: [] }),
  ]);

  await Promise.all(
    Array.from({ length: 40 }).map(async (_v, index) =>
      replyTweet({
        content: `test_tweet_reply_content_${(index += 1)}`,
        authorId: user.id,
        replyTo: parentTweet.id,
        media: [],
      })
    )
  );

  accessToken = login.body.token;
  parentTweetId = parentTweet.id;

  return async () => {
    await deleteTweetsByAuthorId(user.id);
    await deleteUserById(user.id);
  };
});

describe("GET /api/v1/tweets", () => {
  const baseUrl = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    describe("Pagination", () => {
      it("returns a list of replies, total and the next and previous href", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

        const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("nextHref");
        expect(res.body).toHaveProperty("prevHref");
        expect(res.body).toHaveProperty("nextCursor");
        expect(res.body).toHaveProperty("prevCursor");
        expect(res.body).toHaveProperty("total");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total === "number").toBe(true);
        expect(res.body.data.length).toBe(20);

        nextCursor = res.body.nextCursor;
      });

      it("paginates results using 'after' cursor query param", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

        const res = await userRequest
          .get(`${url}?after=${nextCursor}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("nextHref");
        expect(res.body).toHaveProperty("prevHref");
        expect(res.body).toHaveProperty("nextCursor");
        expect(res.body).toHaveProperty("prevCursor");
        expect(res.body).toHaveProperty("total");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total === "number").toBe(true);
        expect(res.body.data.length).toBe(20);

        prevCursor = res.body.prevCursor;
      });

      it("paginates results using 'before' cursor query param", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

        const res = await userRequest
          .get(`${url}?before=${prevCursor}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("nextHref");
        expect(res.body).toHaveProperty("prevHref");
        expect(res.body).toHaveProperty("nextCursor");
        expect(res.body).toHaveProperty("prevCursor");
        expect(res.body).toHaveProperty("total");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total === "number").toBe(true);
        expect(res.body.data.length).toBe(20);
      });

      it("returns empty tweets and null pagination fields for an invalid 'after' cursor", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

        const res = await userRequest
          .get(`${url}?after=${generateId()}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("nextHref");
        expect(res.body).toHaveProperty("prevHref");
        expect(res.body).toHaveProperty("nextCursor");
        expect(res.body).toHaveProperty("prevCursor");
        expect(res.body).toHaveProperty("total");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total === "number").toBe(true);
        expect(res.body.data.length).toBe(0);
      });

      it("returns empty tweets and null pagination fields for an invalid 'before' cursor", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

        const res = await userRequest
          .get(`${url}?before=${generateId()}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("nextHref");
        expect(res.body).toHaveProperty("prevHref");
        expect(res.body).toHaveProperty("nextCursor");
        expect(res.body).toHaveProperty("prevCursor");
        expect(res.body).toHaveProperty("total");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(typeof res.body.total === "number").toBe(true);
        expect(res.body.data.length).toBe(0);
      });
    });
  });

  describe("Failure cases", () => {
    describe("Validation  errors", () => {
      it("returns a Validation error when the tweetId is invalid", async () => {
        const url = `${baseUrl}/invalid-tweet-id/replies` as const;

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
              path: ["tweetId"],
              message: "Invalid tweet ID",
            },
          ],
        });
      });

      it("returns a Validation error when the query param 'after' is invalid", async () => {
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

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
        const url = `${baseUrl}/${parentTweetId}/replies` as const;

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
