"use client";

import React, { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function TitleBar() {
  const [appWindow, setAppWindow] = useState<WebviewWindow | undefined>(
    undefined
  );

  interface TNavbarItem {
    label: string;
    pathname: string;
  }

  const navbarItems = [
    {
      label: "All Inboxes",
      pathname: "/",
    },
    {
      label: "Unread",
      pathname: "/unread",
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

  return (
    <nav
      data-tauri-drag-region
      className="w-full flex items-center justify-between bg-c-bg z-[9999] border-b-2 border-c-bg-secondary overflow-hidden relative"
    >
      <div className="w-40 flex items-center justify-start py-3 px-3 gap-[8px]">
        <button
          className="w-[13px] h-[13px] rounded-full bg-c-macos-red"
          onClick={() => appWindow?.close()}
        ></button>
        <button
          className="w-[13px] h-[13px] rounded-full bg-c-macos-orange"
          onClick={() => appWindow?.minimize()}
        ></button>
        <button
          className="w-[13px] h-[13px] rounded-full bg-c-macos-green"
          onClick={() => appWindow?.maximize()}
        ></button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {navbarItems.map((item: TNavbarItem) => {
          const isActive = pathname === item.pathname;
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
                    className="absolute bottom-0 left-0 h-full bg-c-bg-highlight rounded-lg -z-10"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 0.15,
                      ease: "circOut",
                    }}
                  />
                )}
                <p
                  className={`px-4 py-2 font-medium transition duration-150 ${
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
      <div className="w-40"></div>
    </nav>
  );
}
