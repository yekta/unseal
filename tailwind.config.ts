import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: "200ms",
      0: "0ms",
      100: "100ms",
      200: "200ms",
      300: "300ms",
      400: "400ms",
      500: "500ms",
    },
    extend: {
      colors: {
        "c-bg": "rgb(var(--c-bg)/<alpha-value>)",
        "c-bg-secondary": "rgb(var(--c-bg-secondary)/<alpha-value>)",
        "c-bg-highlight": "rgb(var(--c-bg-highlight)/<alpha-value>)",
        "c-on-bg": "rgb(var(--c-on-bg)/<alpha-value>)",
        "c-icon-red": "rgb(var(--c-icon-red)/<alpha-value>)",
        "c-icon-lime": "rgb(var(--c-icon-lime)/<alpha-value>)",
        "c-icon-lightblue": "rgb(var(--c-icon-lightblue)/<alpha-value>)",
        "c-icon-yellow": "rgb(var(--c-icon-yellow)/<alpha-value>)",
        "c-notification-blue": "rgb(var(--c-notification-blue)/<alpha-value>)",
        "c-macos-red": "rgb(var(--c-macos-red)/<alpha-value>)",
        "c-macos-orange": "rgb(var(--c-macos-orange)/<alpha-value>)",
        "c-macos-green": "rgb(var(--c-macos-green)/<alpha-value>)",
      },
      opacity: {
        15: "0.15",
        85: "0.85",
      },
      spacing: {
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        1.25: "0.3125rem",
        1.75: "0.4375rem",
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
