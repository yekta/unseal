export const getPathnameWithAccount = (
  baseRoute: string,
  accountId: string | undefined
) => {
  if (!accountId) return baseRoute;
  return `/account/${accountId}${baseRoute === "/" ? "" : baseRoute}`;
};
