"use client";

import { TEmail } from "@ts/email";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const accountId = getAccountIdFromPathname(pathname);
  useHotkeys("esc", () => router.push(from));
  useHotkeys(["arrowLeft", "arrowUp"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index <= 0) return;
    const nextId = emails[index - 1].id;
    router.push(
      `${getPathnameWithAccount(
        `/inbox/${nextId}`,
        accountId
      )}?from=${encodeURIComponent(from)}`
    );
  });
  useHotkeys(["arrowRight", "arrowDown"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index >= emails.length - 1) return;
    const nextId = emails[index + 1].id;
    router.push(
      `${getPathnameWithAccount(
        `/inbox/${nextId}`,
        accountId
      )}?from=${encodeURIComponent(from)}`
    );
  });
  return children;
}
