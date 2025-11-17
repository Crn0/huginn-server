export const buildQueryParam = <T extends Record<string, string | number | undefined | null>>(
  param: T | undefined | null
) => {
  const search = new URLSearchParams();

  Object.entries(param ?? {}).forEach(([key, value]) => {
    if (value) {
      search.set(key, String(value));
    }
  });

  return search.toString();
};
