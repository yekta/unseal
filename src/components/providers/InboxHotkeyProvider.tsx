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
      callback: () => router.navigate({ ...fromLink }),
    },
    {
      hotkey: ["left", "up"],
      callback: () => {
        router.navigate({ ...prevLink });
      },
      options: { enabled: prevLink !== undefined },
    },
    {
      hotkey: ["right", "down"],
      callback: () => {
        router.navigate({ ...nextLink });
      },
      options: { enabled: nextLink !== undefined },
    },
  ]);
  return children;
}
