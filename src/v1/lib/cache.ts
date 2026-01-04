import NodeCache from "node-cache";

import { tryCatch } from "./try-catch.js";

export type NameSpace =
  | "user:list"
  | "user:detail"
  | "user:auth"
  | "user:follow"
  | "user:tweets"
  | "user:media"
  | "user:replies"
  | "tweet:detail"
  | "tweet:list"
  | `tweet:${string}:replies`
  | "notification";

export const cache = new NodeCache();

export const getCacheKey = (namespace: NameSpace, id: string, ...args: string[]) => {
  let key = `${namespace}:${id}`;

  args.forEach((v) => {
    key = `${key}:${v}`;
  });

  return key;
};

export const get = <T = unknown>(namespace: NameSpace, id: string): T | null => {
  const key = getCacheKey(namespace, id);
  const data = cache.get(key) as string;

  if (!data) return null;

  const { error, data: cached } = tryCatch(() => JSON.parse(data));

  if (error) throw error;

  return cached;
};

export const getByNamespace = (namespace: NameSpace, id?: string) => {
  const keys = cache.keys().filter((key) => key.startsWith(`${namespace}:${!id ? "" : id}`));

  return cache.mget(keys);
};

export const set = <T = unknown>(namespace: NameSpace, id: string, value: T, ttl = 60) => {
  const key = getCacheKey(namespace, id);
  const json = JSON.stringify(value);

  return cache.set(key, json, ttl);
};

export const update = <T = unknown>(key: string, value: T) => {
  const json = JSON.stringify(value);

  return cache.set(key, json);
};

export const del = (namespace: NameSpace, id: string) => {
  const key = getCacheKey(namespace, id);

  return cache.del(key);
};

export const delNamespace = (namespace: NameSpace, id?: string) => {
  const keysToDelete = cache
    .keys()
    .filter((key) => key.startsWith(`${namespace}:${!id ? "" : id}`));

  return keysToDelete.length ? cache.del(keysToDelete) : 0;
};
