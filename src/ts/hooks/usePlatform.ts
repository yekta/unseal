import { useOnMount } from "@ts/hooks/useOnMount";
import { useState } from "react";

export type TPlatform = "macos" | "windows" | "other";

export const usePlatform = () => {
  const [platform, setPlatform] = useState<TPlatform>("other");

  useOnMount(() => {
    const rawPlatform = window.electronAPI?.platform;
    setPlatform(
      rawPlatform === "darwin"
        ? "macos"
        : rawPlatform === "win32"
        ? "windows"
        : "other"
    );
  });

  return platform;
};
