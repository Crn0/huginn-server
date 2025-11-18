import * as followRepository from "../repository/follow.js";
import { toPrismaPagination } from "@/v1/lib/prisma-pagination.js";
import type { FollowUsersQueryParam } from "../schema/follow.js";
import type { GetFollowOption } from "../types/repository.types.js";
import { buildQueryParam } from "@/v1/lib/build-query-param.js";

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

export const getFollowByUsernamePagination = async (
  username: string,
  query: FollowUsersQueryParam
) => {
  const { before, after, scope } = query;

  const { direction, ...rest } = toPrismaPagination({ before, after, pageSize: FOLLOW_PAGE_SIZE });

  const options = { ...rest, where: {} } as GetFollowOption;
  // get followers
  if (scope === "followers") {
    options.where = { following: { some: { username } } };
  }
  // get followed users
  else if (scope === "following") {
    options.where = { followedBy: { some: { username } } };
  }

  const [res, total] = await Promise.all([
    followRepository.getUserFollowByUsername(username, options),
    followRepository.getFollowCountByUsername(username, options.where),
  ]);

  const followUsers =
    direction === "backward" ? res.slice(-FOLLOW_PAGE_SIZE) : res.slice(0, FOLLOW_PAGE_SIZE);

  const reversedFollowUsers = followUsers.toReversed();

  const hasMore = res.length > FOLLOW_PAGE_SIZE;

  const nextCursor = followUsers.at?.(-1)?.id;
  const prevCursor = followUsers.at?.(0)?.id;

  const queryParam = buildQueryParam({ scope });

  const normalizedNextHref = normalizeHref(
    res,
    `/follow?after=${nextCursor}${queryParam ? `&${queryParam}` : ""}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    res,
    `/follow?before=${prevCursor}${queryParam ? `&${queryParam}` : ""}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: reversedFollowUsers,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};
