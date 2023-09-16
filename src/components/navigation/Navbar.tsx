"use client";

import React, { useEffect, useMemo, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { InboxIcon, EnvelopeIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  InboxIcon as InboxIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import ComposeButtonWithModal from "@components/Compose/ComposeButtonWithModal";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { TIconColor, TIconType, accounts } from "@ts/email";
import EmailIcon from "@components/EmailLine/EmailIcon";

export default function Navbar() {
  const [appWindow, setAppWindow] = useState<WebviewWindow | undefined>(
    undefined
  );

  interface TNavbarItem {
    label: string;
    pathname: string;
    iconType: TIconType;
    iconColor: TIconColor;
  }

  const pathname = usePathname();

  const accountId = getAccountIdFromPathname(pathname);
  const navbarItems: TNavbarItem[] = [
    {
      label: accountId ? "Inbox" : "All Inboxes",
      pathname: getPathnameWithAccount("/", accountId),
      iconType: "inbox",
      iconColor: "on-bg",
    },
    {
      label: "Unread",
      pathname: getPathnameWithAccount("/view/unread", accountId),
      iconType: "unread",
      iconColor: "on-bg",
    },
    {
      label: "Favorites",
      pathname: getPathnameWithAccount("/view/favorites", accountId),
      iconType: "favorites",
      iconColor: "on-bg",
    },
  ];

  const [lastHoveredPath, setLastHoveredPath] = useState<string | undefined>(
    undefined
  );
  const [navbarItemAreaHovered, setNavbarItemAreaHovered] = useState(false);

  useEffect(() => {
    setLastHoveredPath(pathname);
  }, [pathname]);

  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  useEffect(() => {
    setupAppWindow();
  }, []);

  const windowButtonClasses = "w-[13px] h-[13px] rounded-full";
  const windowButtonContainerClasses =
    "flex items-center justify-start py-3 px-3 gap-[8px]";

  return (
    <nav
      data-tauri-drag-region
      className="w-full flex items-stretch justify-start lg:justify-between bg-c-bg z-[100] border-b-2 border-c-bg-secondary overflow-hidden relative"
    >
      <div
        data-tauri-drag-region
        className="flex items-center justify-start lg:w-64"
      >
        <div className={windowButtonContainerClasses}>
          <button
            className={`${windowButtonClasses} bg-c-macos-red`}
            onClick={() => appWindow?.close()}
          ></button>
          <button
            className={`${windowButtonClasses} bg-c-macos-orange`}
            onClick={() => appWindow?.minimize()}
          ></button>
          <button
            className={`${windowButtonClasses} bg-c-macos-green`}
            onClick={() => appWindow?.maximize()}
          ></button>
        </div>
        <div className="p-1.5">
          <ComposeButtonWithModal />
        </div>
      </div>
      <div data-tauri-drag-region className="lg:flex-1 flex justify-center">
        <div
          onMouseOver={() => setNavbarItemAreaHovered(true)}
          onMouseLeave={() => setNavbarItemAreaHovered(false)}
          className="flex justify-center overflow-hidden relative z-0 rounded-xl"
        >
          <div className="absolute left-0 top-0 w-full h-full p-1.5 pointer-events-none">
            {lastHoveredPath === undefined ||
              (!navbarItems.some((i) => i.pathname === lastHoveredPath) && (
                <motion.div
                  style={{
                    width: "100%",
                    opacity: 0,
                  }}
                  className="h-full bg-c-bg-highlight rounded-lg -z-10"
                  layoutId="navbar-highlight"
                  aria-hidden="true"
                  transition={{
                    duration: 0.3,
                    ease: "circOut",
                  }}
                />
              ))}
          </div>
          {navbarItems.map((item, index) => {
            const isActive = pathname === item.pathname;
            return (
              <Link
                key={`nav-link-${index}`}
                onMouseOver={() => setLastHoveredPath(item.pathname)}
                onMouseLeave={() => setLastHoveredPath(pathname)}
                href={item.pathname}
                className="px-px py-1.5 self-stretch group cursor-default flex flex-row"
              >
                <div className="relative flex items-center justify-center">
                  {item.pathname === lastHoveredPath && (
                    <motion.div
                      style={{
                        width: "100%",
                      }}
                      className={`absolute bottom-0 left-0 h-full rounded-lg -z-10 pointer-events-none ${
                        navbarItemAreaHovered
                          ? "bg-c-bg-highlight-hover"
                          : "bg-c-bg-highlight"
                      }`}
                      layoutId="navbar-highlight"
                      aria-hidden="true"
                      transition={{
                        duration: 0.15,
                        ease: "circOut",
                      }}
                    ></motion.div>
                  )}
                  <div className="px-4 py-2 flex items-center justify-center gap-2">
                    <EmailIcon
                      type={item.iconType}
                      color={item.iconColor}
                      isActive={isActive}
                      fadeOnPassive
                    />
                    <p
                      className={`hidden lg:block font-medium transition duration-150 ${
                        isActive ? "text-c-on-bg" : "text-c-on-bg/60"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        data-tauri-drag-region
        className="hidden lg:flex w-64 items-center justify-end"
      ></div>
    </nav>
  );
}
