"use client";

import { TEmail } from "@ts/email";
import { useRouter } from "next/navigation";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function HotkeyProvider({
  children,
  emails,
  email,
  from,
}: {
  children: React.ReactNode;
  emails: TEmail[];
  email: TEmail;
  from: string;
}) {
  const router = useRouter();
  useHotkeys("esc", () => router.push(from));
  useHotkeys(["arrowLeft", "arrowUp"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index <= 0) return;
    const nextId = emails[index - 1].id;
    router.push(`/inbox/${nextId}?from=${encodeURIComponent(from)}`);
  });
  useHotkeys(["arrowRight", "arrowDown"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index >= emails.length - 1) return;
    const nextId = emails[index + 1].id;
    router.push(`/inbox/${nextId}?from=${encodeURIComponent(from)}`);
  });
  return <>{children}</>;
}
