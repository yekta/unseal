"use client";

import React, { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";

export default function TitleBar() {
  const [appWindow, setAppWindow] = useState<WebviewWindow | undefined>(
    undefined
  );

  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  useEffect(() => {
    setupAppWindow();
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="w-full flex items-center justify-start py-3 px-3 gap-[8px] bg-c-bg z-[9999]"
    >
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
  );
}
