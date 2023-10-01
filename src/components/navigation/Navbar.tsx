"use client";

import React, { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ComposeButtonWithModal from "@components/Compose/ComposeButtonWithModal";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { TIconColor, TIconType } from "@ts/email";
import EmailIcon from "@components/EmailList/EmailLine/EmailIcon";
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import { Bars4Icon } from "@heroicons/react/24/outline";

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

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

  const windowButtonClasses = "w-[13px] h-[13px] rounded-full";
  const windowButtonContainerClasses =
    "flex items-center justify-start py-3 px-3 gap-[8px]";

  useEffect(() => {
    setupAppWindow();
  }, []);

  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  return (
    <nav
      data-tauri-drag-region
      className="w-full flex items-stretch justify-start lg:justify-between bg-c-bg z-[100] border-b-2 border-c-bg-secondary overflow-hidden relative"
    >
      <div
        data-tauri-drag-region
        className="flex items-stretch justify-start lg:w-64"
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
        <button
          id="sidebar-toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="py-1.5 px-0.75 flex cursor-default group"
        >
          <div className="p-1 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover">
            <Bars4Icon
              className={`text-c-on-bg w-8 h-8 transform transition ${
                isSidebarOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <div data-tauri-drag-region className="lg:flex-1 flex justify-center">
        <div className="flex justify-center overflow-hidden relative z-0 rounded-xl">
          {navbarItems.map((item, index) => {
            const isActive = pathname === item.pathname;
            return (
              <Link
                key={`nav-link-${index}`}
                href={item.pathname}
                className="py-1.5 px-0.75 self-stretch group cursor-default flex flex-row"
              >
                <div
                  className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg ${
                    isActive
                      ? "bg-c-bg-highlight"
                      : "group-hover:bg-c-bg-highlight-hover"
                  }`}
                >
                  <EmailIcon
                    type={item.iconType}
                    color={item.iconColor}
                    isActive={isActive}
                    fadeOnPassive="normal"
                  />
                  <p
                    className={`hidden lg:block font-medium transition duration-150 ${
                      isActive ? "text-c-on-bg" : "text-c-on-bg/60"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        data-tauri-drag-region
        className="flex flex-1 lg:flex-none w-64 items-center justify-end px-0.5"
      >
        <ComposeButtonWithModal />
      </div>
    </nav>
  );
}
