import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    author: {
      select: {
        id: true,
        username: true,
        profile: { select: { displayName: true, avatar: true, banner: true } },
        following: {
          select: {
            id: true,
            username: true,
          },
        },
        followedBy: {
          select: {
            id: true,
            username: true,
          },
        },
        openIds: {
          select: {
            avatarUrl: true,
          },
        },
      },
    },
    replyTo: true,
    media: {
      include: {
        tweet: {
          select: {
            id: true,
          },
        },
      },
    },
    likes: { select: { user: { select: { id: true } } } },
    _count: { select: { replies: { where: {} }, repost: { where: {} },likes: { where: {} } } },
  },
} satisfies Prisma.TweetDefaultArgs;

export const createTweetOptions = {
  ...baseOptions,
} satisfies Prisma.TweetDefaultArgs;

export const replyTweetOptions = {
  include: {
    ...baseOptions.include,
    replyTo: { select: { id: true } },
  },
} satisfies Prisma.TweetDefaultArgs;

export const getTweetOptions = {
  include: {
    ...baseOptions.include,
    replyTo: {
      include: {
        ...baseOptions.include,
      },
    },
    repost: {
      include: {
        tweet: {
          include: {
            ...baseOptions.include,
             replyTo: {
              include: {
                ...baseOptions.include
              }
            },
          }
        },
        user: {
          select: {
            id: true
          }
        },
      }
    }
  },
} satisfies Prisma.TweetDefaultArgs;

export const getRepostOptions = {
include: {
        tweet: {
          include: {
            ...getTweetOptions.include,
          }
        },
        user: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                displayName: true,
              }
            }
          }
        },
      }
} satisfies Prisma.RepostDefaultArgs;

export const updateTweetOptions = {
  ...baseOptions,
} satisfies Prisma.TweetDefaultArgs;

export const deleteTweetOptions = {
  select: {
    id: true,
    author: { select: { id: true, username: true } },
  },
} satisfies Prisma.TweetDefaultArgs;
