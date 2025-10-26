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

export const followUserByUsername = async (id: string, followUsername: string) =>
  followRepository.followUserByUsername(id, followUsername);

export const followUsersByUsername = async (id: string, followUsernames: string[]) =>
  followRepository.followUsersByUsername(id, followUsernames);

export const unFollowUserById = async (userId: string, unfollowUsername: string) =>
  followRepository.unFollowUserById(userId, unfollowUsername);

export const getFollowersCountByUsername = async (username: string) =>
  followRepository.getFollowersCountByUsername(username);

export const getFollowingCountByUsername = async (username: string) =>
  followRepository.getFollowingCountByUsername(username);

export const getUserFollowCountByUsername = async (username: string) => {
  const followingCount = await followRepository.getFollowersCountByUsername(username);
  const followersCount = await followRepository.getFollowingCountByUsername(username);

  return Object.freeze({ followingCount, followersCount });
};

export const getFollowersByUsernamePagination = async (
  username: string,
  cursor: PaginationCursor
) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: FOLLOW_PAGE_SIZE });

  const options = {
    ...rest,
  } as const;

  const [res, total] = await Promise.all([
    followRepository.getUserFollowersByUsername(username, options),
    followRepository.getFollowersCountByUsername(username),
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

export const getFollowingByUsernamePagination = async (
  username: string,
  cursor: PaginationCursor
) => {
  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: FOLLOW_PAGE_SIZE });

  const options = {
    ...rest,
  } as const;

  const [res, total] = await Promise.all([
    followRepository.getUserFollowingByUsername(username, options),
    followRepository.getFollowingCountByUsername(username),
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
