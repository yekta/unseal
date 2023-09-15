export const getAccountIdFromPathname = (pathname: string) => {
  return pathname.startsWith("/account/") ? pathname.split("/")[2] : undefined;
};
