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

const rootSearchSchema = z.object({
  from: z.string().optional(),
});
type RootSearch = z.infer<typeof rootSearchSchema>;
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
const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/account/$accountId",
  component: (r) => AccountPage({ accountId: r.useParams().accountId }),
});

const accountUnreadRoute = new Route({
  getParentRoute: () => accountRoute,
  path: "/account/$accountId/view/unread",
  component: (r) => AccountUnreadPage({ accountId: r.useParams().accountId }),
});

const accountStarredRoute = new Route({
  getParentRoute: () => accountRoute,
  path: "/account/$accountId/view/starred",
  component: (r) => AccountStarredPage({ accountId: r.useParams().accountId }),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  unreadRoute,
  starredRoute,
  accountRoute.addChildren([accountUnreadRoute, accountStarredRoute]),
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
