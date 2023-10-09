import { useState, useEffect } from "react";

export type TPlatform = "macos" | "windows" | "other";

export const usePlatform = () => {
  const [platform, setPlatform] = useState<TPlatform>("other");

  useEffect(() => {
    // @ts-ignore
    let _platform = window?.electronAPI?.platform;
    _platform =
      _platform === "darwin"
        ? "macos"
        : _platform === "win32"
        ? "windows"
        : "other";
    if (platform !== _platform) setPlatform(_platform);
  }, []);

  return platform;
};
