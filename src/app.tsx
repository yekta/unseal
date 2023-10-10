import ReactDOM from "react-dom/client";

import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
} from "@tanstack/react-router";
import { z } from "zod";
import HomePage from "@app/page";
import SettingsPage from "@app/settings/page";
import UnreadPage from "@app/view/unread/page";
import StarredPage from "@app/view/starred/page";
import AccountPage from "@app/account/[accountId]/page";
import AccountUnreadPage from "@app/account/[accountId]/view/unread/page";
import AccountStarredPage from "@app/account/[accountId]/view/starred/page";
import InboxPage from "@app/inbox/[emailId]/page";
import AccountInboxPage from "@app/account/[accountId]/inbox/[emailId]/page";
import SignInPage from "@app/sign-in/page";
import RootLayout from "@app/layout";
import AppLayout from "@app/layout-app";
import LayoutEmpty from "@app/layout-empty";

const rootSearchSchema = z.object({
  from: z.string().optional(),
});

const rootRoute = new RootRoute({
  component: RootLayout,
  validateSearch: rootSearchSchema,
});

const appLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: AppLayout,
  id: "app-layout",
});

const emptyLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: LayoutEmpty,
  id: "empty-layout",
});

const indexRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: HomePage,
});

const unreadRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/view/unread",
  component: UnreadPage,
});

const starredRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/view/starred",
  component: StarredPage,
});

const inboxRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/inbox/$emailId",
  component: InboxPage,
});

const settingsRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

const accountRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/account/$accountId",
  component: AccountPage,
});

const accountUnreadRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/account/$accountId/view/unread",
  component: AccountUnreadPage,
});

const accountStarredRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/account/$accountId/view/starred",
  component: AccountStarredPage,
});

const accountInboxRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/account/$accountId/inbox/$emailId",
  component: AccountInboxPage,
});

const signInRoute = new Route({
  getParentRoute: () => emptyLayoutRoute,
  path: "/sign-in",
  component: SignInPage,
});

const routeTree = rootRoute.addChildren([
  appLayoutRoute,
  emptyLayoutRoute,
  indexRoute,
  unreadRoute,
  starredRoute,
  inboxRoute,
  accountRoute,
  accountUnreadRoute,
  accountStarredRoute,
  accountInboxRoute,
  settingsRoute,
  signInRoute,
]);
const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("react-app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
