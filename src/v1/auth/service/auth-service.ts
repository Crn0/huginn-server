import argon2 from "argon2";

import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { generateUsername } from "@/v1/lib/generate-username.js";
import { generateDisplayName } from "@/v1/lib/generate-display-name.js";
import { userSchema } from "@/v1/lib/user-schema.js";
import { getUserByEmail, isUsernameAvailable } from "@/v1/user/service/user-service.js";
import { getAuthProviderByKey } from "@/v1/auth-provider/service/auth-provider-service.js";
import {
  getUserOIDCAccountByPkAndSub,
  upsertUserOIDCAccount,
} from "@/v1/user/oidc-account/service/oidc-account.js";

import type { AuthenticateGoogle } from "../types/auth.types.js";
import type { CreateUserOIDCAccount } from "@/v1/user/types/user.types.js";

const debug = createDebug("auth-service");
const INVALID_CREDENTIALS = "Invalid credentials." as const;
const MAX_USERNAME_RETRY = 20 as const;

export const authenticateLocal = async (email: string, password: string) => {
  const user = await getUserByEmail(email, { shouldThrow: false });

  if (!user || !user.password) {
    throw new AuthenticationError(INVALID_CREDENTIALS);
  }

  const passwordMatch = await argon2.verify(user.password, password);

  if (!passwordMatch) {
    throw new AuthenticationError(INVALID_CREDENTIALS);
  }

  const parsedUser = userSchema.safeParse(user);

  if (!parsedUser.success) {
    debug("user validation failed", parsedUser.error.issues);

    throw new InternalServerError("Internal Server Error");
  }

  return parsedUser.data;
};

export const authenticateGoogle = async (DTO: AuthenticateGoogle) => {
  const provider = await getAuthProviderByKey(DTO.provider);

  if (!provider) {
    throw new NotFoundError("Auth Provider not found.");
  }

  if (!provider.isActive) {
    throw new ForbiddenError("Auth provider is currently disabled.");
  }

  let username: string;
  const userOIDC = await getUserOIDCAccountByPkAndSub(provider.primaryKey, DTO.sub);

  if (userOIDC) {
    username = userOIDC.user.username;
  } else {
    let retry = 0;

    while (true) {
      if (retry >= MAX_USERNAME_RETRY) {
        debug(
          `Failed to generate unique username for ${DTO.email} after ${MAX_USERNAME_RETRY} retries`
        );

        throw new ForbiddenError("Something went wrong");
      }

      const candidate = generateUsername(DTO.firstName, DTO.lastName);
      retry += 1;

      if (await isUsernameAvailable(candidate)) {
        username = candidate;
        break;
      }
    }
  }

  const displayName = generateDisplayName(DTO.firstName, DTO.lastName);

  const data = {
    ...DTO,
    username,
    displayName,
    providerPk: provider.primaryKey,
    accountLevel: "USER",
  } satisfies CreateUserOIDCAccount;

  const user = await upsertUserOIDCAccount(data);

  return user;
};
