"use client";

import { TEmailLineProps } from "@components/EmailLine/EmailLine";
import { emails } from "@ts/email";
import { useRouter } from "next/navigation";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function HotkeyProvider({
  children,
  email,
}: {
  children: React.ReactNode;
  email: TEmailLineProps;
}) {
  const router = useRouter();
  useHotkeys("esc", () => router.push("/"));
  useHotkeys(["arrowLeft", "arrowUp"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index <= 0) return;
    const nextId = emails[index - 1].id;
    router.push(`/inbox/${nextId}`);
  });
  useHotkeys(["arrowRight", "arrowDown"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index >= emails.length - 1) return;
    const nextId = emails[index + 1].id;
    router.push(`/inbox/${nextId}`);
  });
  return <>{children}</>;
}
