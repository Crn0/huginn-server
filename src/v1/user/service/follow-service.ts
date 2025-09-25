import * as followRepository from "../repository/follow.js";
import { toPrismaPagination, type PaginationCursor } from "@/v1/lib/prisma-pagination.js";

const FOLLOW_PAGE_SIZE = 20 as const;

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const followUserById = async (userId: string, followId: string) =>
  followRepository.followUserById(userId, followId);

export const followUsersById = async (userId: string, followIds: string[]) =>
  followRepository.followUsersById(userId, followIds);

export const unFollowUserById = async (userId: string, unFollowId: string) =>
  followRepository.unFollowUserById(userId, unFollowId);

export const getFollowersCountById = async (userId: string) =>
  followRepository.getFollowersCountById(userId);

export const getFollowingCountById = async (userId: string) =>
  followRepository.getFollowingCountById(userId);

export const getUserFollowCountById = async (userId: string) => {
  const followingCount = await followRepository.getFollowersCountById(userId);
  const followersCount = await followRepository.getFollowingCountById(userId);

  return Object.freeze({ followingCount, followersCount });
};

export const getFollowersByIdPagination = async (id: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: FOLLOW_PAGE_SIZE });

  const options = {
    ...rest,
  } as const;

  const [res, total] = await Promise.all([
    followRepository.getUserFollowersById(id, options),
    followRepository.getFollowersCountById(id),
  ]);

  const followers =
    direction === "backward" ? res.slice(-FOLLOW_PAGE_SIZE) : res.slice(0, FOLLOW_PAGE_SIZE);

  const reversedFollowers = followers.toReversed();

  const hasMore = res.length > FOLLOW_PAGE_SIZE;

  const nextCursor = followers.at?.(-1)?.id;
  const prevCursor = followers.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    res,
    `/followers?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    res,
    `/followers?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    followers: reversedFollowers,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};

export const getFollowingByIdPagination = async (id: string, cursor: PaginationCursor) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: FOLLOW_PAGE_SIZE });

  const options = {
    ...rest,
  } as const;

  const [res, total] = await Promise.all([
    followRepository.getUserFollowingById(id, options),
    followRepository.getFollowingCountById(id),
  ]);

  const followers =
    direction === "backward" ? res.slice(-FOLLOW_PAGE_SIZE) : res.slice(0, FOLLOW_PAGE_SIZE);

  const reversedFollowing = followers.toReversed();

  const hasMore = res.length > FOLLOW_PAGE_SIZE;

  const nextCursor = followers.at?.(-1)?.id;
  const prevCursor = followers.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    res,
    `/following?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    res,
    `/following?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    following: reversedFollowing,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};
