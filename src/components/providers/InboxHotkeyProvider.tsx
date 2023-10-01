"use client";

import { TEmail } from "@ts/email";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Key } from "ts-key-enum";

export default function HotkeyProvider({
  children,
  email,
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
  const pathname = usePathname();
  const accountId = getAccountIdFromPathname(pathname);
  useHotkeys(Key.Escape, () => router.push(from));
  useHotkeys(
    [Key.ArrowLeft, Key.ArrowUp],
    () => {
      router.push(`${prevEmailPathname}?from=${encodeURIComponent(from)}`);
    },
    { enabled: prevEmailPathname !== undefined }
  );
  useHotkeys(
    [Key.ArrowRight, Key.ArrowDown],
    () => {
      if (!email) return;
      router.push(`${nextEmailPathname}?from=${encodeURIComponent(from)}`);
    },
    { enabled: nextEmailPathname !== undefined }
  );
  return children;
}
