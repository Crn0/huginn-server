export const oidcOptions = {
  include: {
    create: {
      user: { select: { id: true, username: true } },
    },
    get: {
      user: {
        include: {
          profile: true,
          openIds: {
            include: {
              provider: true,
            },
          },
        },
      },
    },
  },
} as const;
