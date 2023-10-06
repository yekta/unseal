"use client";

import { useRouter } from "@tanstack/react-router";
import { TEmail } from "@ts/email";
import { useHotkeys } from "@ts/hooks/useHotkeys";
import React from "react";

export default function HotkeyProvider({
  children,
  prevEmailPathname,
  nextEmailPathname,
  from,
}: {
  children: React.ReactNode;
  email: TEmail;
  prevEmailPathname?: string;
  nextEmailPathname?: string;
  from: string;
}) {
  const router = useRouter();
  useHotkeys([
    {
      hotkey: "esc",
      callback: () => router.navigate({ to: from }),
    },
    {
      hotkey: ["left", "up"],
      callback: () => {
        router.navigate({
          to: `${prevEmailPathname}?from=${encodeURIComponent(from)}`,
        });
      },
      options: { enabled: prevEmailPathname !== undefined },
    },
    {
      hotkey: ["right", "down"],
      callback: () => {
        router.navigate({
          to: `${nextEmailPathname}?from=${encodeURIComponent(from)}`,
        });
      },
      options: { enabled: nextEmailPathname !== undefined },
    },
  ]);
  return children;
}
