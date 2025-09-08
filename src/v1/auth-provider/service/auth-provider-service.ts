import * as authProvideRepository from "../repository/auth-provider-repository.js";

export const createAuthProvider = async (key: string, name: string) =>
  authProvideRepository.createAuthProvider(key, name);

export const getAuthProviderByKey = async (key: string) =>
  authProvideRepository.getAuthProviderByKey(key);
