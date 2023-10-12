import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

type TSystemTheme = "dark" | "light";
type TTheme = TSystemTheme | "system";

export const defaultTheme: TTheme = "system";
export const themeAtom = atomWithStorage<TTheme>("theme", defaultTheme);
export const systemThemeAtom = atom<TSystemTheme>("light");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setSystemTheme = useSetAtom(systemThemeAtom);
  const theme = useAtomValue(themeAtom);

  const setSystemThemeAndDocumentAttributes = (systemTheme: TSystemTheme) => {
    setSystemTheme(systemTheme);
    setDocumentAttributes(theme, systemTheme);
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setSystemThemeAndDocumentAttributes("dark");
    } else {
      setSystemThemeAndDocumentAttributes("light");
    }

    const darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSystemThemeAndDocumentAttributes("dark");
      } else {
        setSystemThemeAndDocumentAttributes("light");
      }
    };

    darkMatcher.addEventListener("change", handleChange);
    return () => {
      darkMatcher.removeEventListener("change", handleChange);
    };
  }, []);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const systemTheme = useAtomValue(systemThemeAtom);

  const setThemeAndDocumentAttributes = (theme: TTheme) => {
    setTheme(theme);
    setDocumentAttributes(theme, systemTheme);
  };

  return {
    theme,
    systemTheme,
    setTheme: setThemeAndDocumentAttributes,
  };
}

function setDocumentAttributes(theme: TTheme, systemTheme: TSystemTheme) {
  if (theme === "light" || (theme === "system" && systemTheme === "light")) {
    if (document.documentElement.getAttribute("data-theme") !== "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } else {
    if (document.documentElement.getAttribute("data-theme") !== "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }
}
