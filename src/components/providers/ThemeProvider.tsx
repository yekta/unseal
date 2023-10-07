import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

type TSystemTheme = "dark" | "light";
type TTheme = TSystemTheme | "system";

export const defaultTheme: TTheme = "system";
export const themeAtom = atomWithStorage<TTheme>("theme", defaultTheme);
export const systemThemeAtom = atom<TSystemTheme>("light");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [systemTheme, setSystemTheme] = useAtom(systemThemeAtom);
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    const updateTheme = () => {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        if (systemTheme !== "dark") {
          setSystemTheme("dark");
        }
      } else {
        if (systemTheme !== "light") {
          setSystemTheme("light");
        }
      }
    };

    updateTheme();

    const darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSystemTheme("dark");
      } else {
        setSystemTheme("light");
      }
    };

    darkMatcher.addEventListener("change", handleChange);
    return () => {
      darkMatcher.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (theme === "light" || (theme === "system" && systemTheme === "light")) {
      if (document.documentElement.getAttribute("data-theme") !== "light") {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } else {
      if (document.documentElement.getAttribute("data-theme") !== "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }
  }, [theme, systemTheme]);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const systemTheme = useAtomValue(systemThemeAtom);
  return {
    theme,
    systemTheme,
    setTheme,
  };
}
