import * as oidcRepository from "../repository/oidc-account.js";
import type { CreateUserOIDCAccount } from "../../types/user.types.js";

export const upsertUserOIDCAccount = async (DTO: CreateUserOIDCAccount) =>
  oidcRepository.upsertUserOIDCAccount(DTO);

export const getUserOIDCAccountByPkAndSub = async (providerPk: number, sub: string) =>
  oidcRepository.getUserOIDCAccountByPkAndSub(providerPk, sub);
