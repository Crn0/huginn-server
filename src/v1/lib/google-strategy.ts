import z from "zod";
import { Strategy } from "passport-google-oauth20";
import { env } from "@/configs/env.js";
import { authenticateGoogle } from "@/v1/auth/service/auth-service.js";
import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { createDebug } from "./debug.js";

const debug = createDebug("passport-google-strategy");

interface BirthdayResponse {
  resourceName: string;
  etag: string;
  birthdays: {
    metadata: {
      primary: boolean;
      source: { type: string; id: string };
    };
    date: { year: number; month: number; day: number };
  }[];
}

const birthdaySchema = z
  .object({ year: z.number(), month: z.number(), day: z.number() })
  .transform(({ year, month, day }) => new Date(`${year}/${month}/${day}`));

const getBirthDay = async (accessToken: string) => {
  const response = await fetch(
    "https://people.googleapis.com/v1/people/me?personFields=birthdays",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    debug("Error fetching birthday:", response.status, await response.text());
    return null;
  }

  const responseData = (await response.json()) as BirthdayResponse;

  const birthday = responseData.birthdays[0]?.date;

  return birthdaySchema.safeParse(birthday)?.data ?? null;
};

export const createGoogleStrategy = () =>
  new Strategy(
    {
      clientID: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/user.birthday.read"],
      state: false,
    },
    async (accessToken, _refreshToken, profile, done) => {
      try {
        const { provider, photos, id: sub } = profile;

        const firstName = profile.name?.givenName as string;
        const lastName = profile.name?.familyName as string;

        const isEmailVerified = profile._json.email_verified;

        const email = profile._json.email;

        const avatarUrl = photos?.[0]?.value ?? null;

        if (!isEmailVerified || !email) {
          debug(`Failed to authenticate: { isEmailVerified: ${isEmailVerified}, email: ${email}}`);
          throw new ForbiddenError("Something went wrong");
        }

        const birthday = await getBirthDay(accessToken);

        const user = await authenticateGoogle({
          provider,
          sub,
          email,
          avatarUrl,
          firstName,
          lastName,
          accessToken,
          birthday,
        });

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  );
