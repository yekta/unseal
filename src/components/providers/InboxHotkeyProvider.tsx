import { LinkPropsOptions, useRouter } from "@tanstack/react-router";
import { TEmail } from "@ts/email";
import { useHotkeys } from "@ts/hooks/useHotkeys";
import React from "react";

export default function HotkeyProvider({
  children,
  prevLink,
  nextLink,
  fromLink,
}: {
  children: React.ReactNode;
  email: TEmail;
  prevLink?: LinkPropsOptions;
  nextLink?: LinkPropsOptions;
  fromLink: LinkPropsOptions;
}) {
  const router = useRouter();
  useHotkeys([
    {
      hotkey: "esc",
      callback: () =>
        router.navigate({ to: fromLink.to, params: fromLink.params }),
    },
    {
      hotkey: ["left", "up"],
      callback: () => {
        router.navigate({
          to: prevLink.to,
          params: prevLink.params,
          search: prevLink.search,
        });
      },
      options: { enabled: prevLink !== undefined },
    },
    {
      hotkey: ["right", "down"],
      callback: () => {
        router.navigate({
          to: nextLink.to,
          params: nextLink.params,
          search: nextLink.search,
        });
      },
      options: { enabled: nextLink !== undefined },
    },
  ]);
  return children;
}
