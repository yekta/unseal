"use client";

import React, { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { InboxIcon, EnvelopeIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [appWindow, setAppWindow] = useState<WebviewWindow | undefined>(
    undefined
  );

  interface TNavbarItem {
    label: string;
    pathname: string;
    Icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
  }

  const navbarItems: TNavbarItem[] = [
    {
      label: "All Inboxes",
      pathname: "/",
      Icon: InboxIcon,
    },
    {
      label: "Unread",
      pathname: "/unread",
      Icon: EnvelopeIcon,
    },
    {
      label: "Favorites",
      pathname: "/favorites",
      Icon: StarIcon,
    },
  ];

  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | undefined>(undefined);

  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  useEffect(() => {
    setupAppWindow();
  }, []);

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  const windowButtonClasses = "w-[13px] h-[13px] rounded-full";
  const windowButtonContainerClasses =
    "flex items-center justify-start py-3 px-3 gap-[8px]";

  return (
    <nav
      data-tauri-drag-region
      className="w-full flex items-center justify-between bg-c-bg z-[9999] border-b-2 border-c-bg-secondary overflow-hidden relative"
    >
      <div data-tauri-drag-region className={windowButtonContainerClasses}>
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
      <div
        data-tauri-drag-region
        className="flex-1 flex items-center justify-center"
      >
        <div className="flex items-center justify-center overflow-hidden relative z-0 rounded-xl">
          <div className="absolute left-0 top-0 w-full h-full p-1.5 pointer-events-none">
            {hoveredPath === undefined ||
              (!navbarItems.some((i) => i.pathname === hoveredPath) && (
                <motion.div
                  style={{
                    width: "100%",
                    opacity: 0,
                  }}
                  className="h-full bg-c-bg-highlight rounded-lg -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  transition={{
                    duration: 0.3,
                    ease: "circOut",
                  }}
                />
              ))}
          </div>
          {navbarItems.map((item: TNavbarItem) => {
            const isActive = pathname === item.pathname;
            const Icon = item.Icon;
            return (
              <Link
                onMouseOver={() => setHoveredPath(item.pathname)}
                onMouseLeave={() => setHoveredPath(pathname)}
                href={item.pathname}
                className="p-1.5 group cursor-default"
              >
                <div className="relative">
                  {item.pathname === hoveredPath && (
                    <motion.div
                      style={{
                        width: "100%",
                      }}
                      className="absolute bottom-0 left-0 h-full bg-c-bg-highlight rounded-lg -z-10 pointer-events-none"
                      layoutId="navbar"
                      aria-hidden="true"
                      transition={{
                        duration: 0.15,
                        ease: "circOut",
                      }}
                    />
                  )}
                  <div className="px-4 flex items-center justify-center gap-2">
                    <Icon
                      className={`w-5 h-5 transition -ml-0.25 ${
                        isActive ? "text-c-on-bg" : "text-c-on-bg/60"
                      }`}
                    />
                    <p
                      className={`py-2 font-medium transition duration-150 ${
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
      <div data-tauri-drag-region className={windowButtonContainerClasses}>
        <div className={windowButtonClasses}></div>
        <div className={windowButtonClasses}></div>
        <div className={windowButtonClasses}></div>
      </div>
    </nav>
  );
}
