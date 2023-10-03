"use client";

import { TEmail } from "@ts/email";
import { useHotkeys } from "@ts/hooks/useHotkeys";
import { useRouter } from "next/navigation";
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
      callback: () => router.push(from),
    },
    {
      hotkey: ["left", "up"],
      callback: () => {
        router.push(`${prevEmailPathname}?from=${encodeURIComponent(from)}`);
      },
      options: { enabled: prevEmailPathname !== undefined },
    },
    {
      hotkey: ["right", "down"],
      callback: () => {
        router.push(`${nextEmailPathname}?from=${encodeURIComponent(from)}`);
      },
      options: { enabled: nextEmailPathname !== undefined },
    },
  ]);
  return children;
}
