import { LinkPropsOptions } from "@tanstack/react-router";

export const getPathnameWithAccount = (
  baseRoute: LinkPropsOptions["to"],
  accountId: string | undefined
): { to: LinkPropsOptions["to"]; params: LinkPropsOptions["params"] } => {
  if (!accountId)
    return {
      to: baseRoute,
      params: {},
    };
  const params = { accountId };
  if (baseRoute === "/account/$accountId/view/unread") {
    return {
      to: "/account/$accountId/view/unread",
      params,
    };
  }
  if (baseRoute === "/account/$accountId/view/starred") {
    return {
      to: "/account/$accountId/view/starred",
      params,
    };
  }
  return {
    to: "/account/$accountId",
    params,
  };
};
