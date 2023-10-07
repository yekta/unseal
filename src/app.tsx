import ReactDOM from "react-dom/client";

import RootLayout from "@app/layout.tsx";
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

const rootSearchSchema = z.object({
  from: z.string().optional(),
});
const rootRoute = new RootRoute({
  component: RootLayout,
  validateSearch: rootSearchSchema,
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const unreadRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/view/unread",
  component: UnreadPage,
});
const starredRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/view/starred",
  component: StarredPage,
});
const inboxRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/inbox/$emailId",
  component: InboxPage,
});
const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/account/$accountId",
  component: AccountPage,
});

const accountUnreadRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/account/$accountId/view/unread",
  component: AccountUnreadPage,
});

const accountStarredRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/account/$accountId/view/starred",
  component: AccountStarredPage,
});

const accountInboxRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/account/$accountId/inbox/$emailId",
  component: AccountInboxPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  unreadRoute,
  starredRoute,
  inboxRoute,
  accountRoute.addChildren([
    accountUnreadRoute,
    accountStarredRoute,
    accountInboxRoute,
  ]),
  settingsRoute,
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
