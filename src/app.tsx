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
const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);
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
